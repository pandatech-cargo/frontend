import { useMemo } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { PdButton } from 'components';

import cs from 'classnames';

import styles from './style.module.scss';

const { Option } = Select;

const formMock = [
  {
    type: 'textfield',
    key: 'license_number',
    label: 'License Number',
    value: 'B 2021 NEW',
  },
  {
    type: 'selection',
    key: 'license_type',
    label: 'License Type',
    value: 'Black',
    options: [
      {
        label: 'Black',
        value: 'Black',
      },
      {
        label: 'Yellow',
        value: 'Yellow',
      },
    ],
  },
  {
    type: 'selection',
    key: 'truck_type',
    label: 'Truck Type',
    value: 'Tronton',
    options: [
      {
        label: 'Tronton',
        value: 'Tronton',
      },
      {
        label: 'Container',
        value: 'Container',
      },
    ],
  },
  {
    type: 'textfield',
    key: 'production_year',
    label: 'Production Year',
    value: '2010',
  },
  {
    type: 'upload',
    key: 'stnk',
    label: 'STNK',
    value: '',
  },
  {
    type: 'upload',
    key: 'kir',
    label: 'KIR',
    value: '',
  },
];

/**
 * @param {string} className classname for the component
 * @param {boolean} loading to show spinner on button
 * @param {function} onCancel function to call when clicking cancel button
 * @param {function} onOk function to call when clicking ok button
 * @param {boolean} open to display the modal
 * @param {string} title the title of the modal
 * @param {array} formItems array of form items
 * @returns Ant Design Async Modal, see documentation https://ant.design/components/modal/
 */
export function PdFormModal({
  className,
  loading = false,
  onCancel,
  onOk,
  open = false,
  title = '',
  formItems = formMock,
  ...props
}) {
  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    return (formItems ?? []).map(({ key = '', value = '', options }) => {
      if (options?.length && !value) {
        return { [key]: options[0] };
      }
      return { [key]: value };
    });
  }, [formItems]);

  const onFinish = async (values) => {
    console.log('Success:', values);
    onOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const uploadHandler = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const render = ({ options = [], type = '' }) => {
    switch (type) {
      case 'textfield':
        return <Input />;
      case 'selection':
        return <Select options={options} />;
      case 'upload':
        return (
          <Upload
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76" //todo: ask be for url
            headers={{ authorization: 'authorization-text' }}
            onChange={uploadHandler}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        );
      default:
        return <></>;
    }
  };

  return (
    <Modal
      className={cs(styles.formModal, className)}
      onCancel={onCancel}
      okText="Submit"
      title={title}
      visible={open}
      footer={null}
      {...props}>
      <Form
        autoComplete="off"
        form={form}
        initialValues={initialValues}
        labelCol={{ span: 8 }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        wrapperCol={{ span: 14 }}>
        {formItems.map((item) => {
          const { label = '', key = '', value = '' } = item;
          return (
            <Form.Item label={label} key={key} name={key} initialValue={value}>
              {render(item)}
            </Form.Item>
          );
        })}
        <Form.Item>
          <PdButton
            disabled={loading}
            htmlType="submit"
            loading={loading}
            type="primary">
            Add
          </PdButton>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default { PdFormModal };
