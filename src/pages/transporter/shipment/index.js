/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { PdButton } from 'components';

import './style.scss';

const { Option } = Select;
const { Search } = Input;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export function Shipment() {
  const formItemLayout = {
    labelCol: { span: 8, offset: 2 },
    wrapperCol: { span: 15 },
  };
  const [showModal, setShowModal] = useState(false);

  function handleChange({ id, key }) {
    if (key === 'detail') {
      // open detail modal
    } else {
      console.log(`/trucks/${id}/${key}`);
    }
  }

  const Action = useCallback(({ id, status }) => {
    const menu = (
      <Menu onClick={({ key }) => handleChange({ id, key })}>
        <Menu.Item key="allocate">Allocate Shipment</Menu.Item>
        <Menu.Item key="update">Update Status</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown key={id} overlay={menu}>
        <Button>
          Update <DownOutlined />
        </Button>
      </Dropdown>
    );
  }, []);

  const dataSource = [
    {
      destination: 'Malaysia',
      license: 'D 1234 ABC',
      loadingDate: Date.now(),
      name: 'hzd',
      origin: 'Jakarta',
      shipment: 'DO-111',
      status: 'completed',
    },
  ];
  const column = [
    {
      key: 'shipment',
      title: 'Shipment',
      dataIndex: 'shipment',
      sorter: true,
    },
    {
      key: 'license',
      title: 'License',
      dataIndex: 'license',
      sorter: true,
    },
    {
      key: 'name',
      title: "Driver's Name",
      dataIndex: 'name',
      sorter: true,
    },
    {
      key: 'origin',
      title: 'Origin',
      dataIndex: 'origin',
      sorter: true,
    },
    {
      key: 'destination',
      title: 'Destination',
      dataIndex: 'destination',
      sorter: true,
    },
    {
      key: 'loadingDate',
      title: 'Loading Date',
      dataIndex: 'loadingDate',
      sorter: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
    },
    {
      key: '',
      title: 'Action',
      render: Action,
    },
  ];

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSubmit(values) {
    //   write code here
  }

  function handleSearch(value) {
    console.log(value);
  }

  function handleTableChange(pagination, _, sorter) {
    const { columnKey, order } = sorter || {};
    console.log(columnKey, order, pagination);
    // sorter: key, ascend/decend
  }

  return (
    <>
      <Row justify="center">
        <Col span={20}>
          <Space className="pd-space" direction="vertical" size="large">
            <Row gutter={8} justify="end">
              <Col span={6}>
                <PdButton
                  block
                  onClick={setShowModal.bind(this, true)}
                  type="primary">
                  Add Shipment
                </PdButton>
              </Col>
              <Col span={6}>
                <Search onChange={handleSearch} />
              </Col>
            </Row>
            <Table
              columns={column}
              dataSource={dataSource}
              onChange={handleTableChange}
              rowKey="id"
            />
          </Space>
        </Col>
      </Row>

      <Modal visible={showModal} onCancel={handleCloseModal} footer={null}>
        <Row type="flex" justify="center">
          <Title level={4}>Add Shipment</Title>
        </Row>
        <Row className="pd-margin-top-lg" type="flex" justify="center">
          <Form onFinish={handleSubmit}>
            <Form.Item label="Origin" name="origin" {...formItemLayout}>
              <Select placeholder="Select origin">
                <Option value={1}>value 1</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Destination"
              name="destination"
              {...formItemLayout}>
              <Select placeholder="Select destinationn">
                <Option value={10}>value 10</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Loading Date"
              name="loading_date"
              {...formItemLayout}>
              <RangePicker />
            </Form.Item>
            <Form.Item className="pd-align-center">
              <PdButton type="primary" htmlType="submit">
                Submit
              </PdButton>
            </Form.Item>
          </Form>
        </Row>
      </Modal>
    </>
  );
}
