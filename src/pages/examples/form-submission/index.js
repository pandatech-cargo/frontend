/* eslint-disable react/display-name */
import { useEffect } from 'react';

import {
  Col,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Layout,
  PageHeader,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Typography,
} from 'antd';

import logo from 'assets/svg/logo.svg';
import { PdButton } from 'components';

import './style.scss';

const { Content } = Layout;

export function FormSubmission() {
  useEffect(() => {}, []);

  const { Option } = Select;
  const { Title } = Typography;

  return (
    <Layout className="form-submission">
      <PageHeader
        ghost={false}
        onBack={history.goBack}
        style={{
          // TODO: isolate this into component, then style there with scss
          borderBottom: '1px solid rgb(235, 237, 240)',
        }}
        title="Form Submission"
        subTitle="example of form submission"
      />
      <Content className="form-submission-content">
        <Row justify="center" gutter={[8]} align="middle">
          <Col>
            <img width={40} height={40} src={logo} alt="Pandatech" />
          </Col>
          <Col>
            <Title style={{ marginBottom: 0 }} level={2}>
              Pandatech
            </Title>
          </Col>
        </Row>
        <Divider style={{ marginBottom: 60 }}>Form</Divider>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          {[
            {
              label: 'age',
              render: () => <InputNumber min={1} max={10} defaultValue={3} />,
            },
            { label: 'vaccinated', render: () => <Switch defaultChecked /> },
            { label: 'health bar', render: () => <Slider defaultValue={70} /> },
            {
              label: 'hospital',
              render: () => (
                <Select defaultValue="siloam">
                  {['Siloam', 'Pusat Pertamina', 'Hasan Sadikin'].map(
                    (hospitalName) => (
                      <Option
                        key={hospitalName}
                        value={hospitalName}>{`RS. ${hospitalName}`}</Option>
                    )
                  )}
                </Select>
              ),
            },
            { label: 'appointment', render: () => <DatePicker /> },
            {
              label: 'hospitalization period',
              render: () => <DatePicker.RangePicker />,
            },
            { label: 'rate', render: () => <Rate defaultValue={5} /> },
            {
              render: () => (
                <Space>
                  <PdButton type="primary" htmlType="submit">
                    Submit
                  </PdButton>
                  <PdButton>Cancel</PdButton>
                </Space>
              ),
              itemProps: { wrapperCol: { span: 8, offset: 8 } },
            },
          ].map(({ label, render: Component, itemProps }) => (
            <Form.Item {...itemProps} label={label} key={label}>
              <Component />
            </Form.Item>
          ))}
        </Form>
      </Content>
    </Layout>
  );
}
