/* eslint-disable no-unused-vars */
import { useState } from 'react';

import {
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from 'antd';

import { PdButton, PdHeader } from 'components';

import './style.scss';

const { Content } = Layout;
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
  const Action = () => (
    <Select placeholder="Select Action">
      <Option value="allocate_shipment">Allocate Shipment</Option>
      <Option value="update_status">Update Status</Option>
    </Select>
  );

  const dataSource = [
    {
      destination: 'Malaysia',
      loadingDate: Date.now(),
      name: 'hzd',
      origin: 'Jakarta',
      shipment: 'DO-111',
      status: 'completed',
    },
  ];
  const column = [
    {
      key: '',
      title: 'Shipment',
      dataIndex: 'shipment',
    },
    {
      key: '',
      title: "Driver's Name",
      dataIndex: 'name',
    },
    {
      key: '',
      title: 'Origin',
      dataIndex: 'origin',
    },
    {
      key: '',
      title: 'Destination',
      dataIndex: 'destination',
    },
    {
      key: '',
      title: 'Loading Date',
      dataIndex: 'loadingDate',
    },
    {
      key: '',
      title: 'Status',
      dataIndex: 'status',
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

  return (
    <Layout className="pd-cms-shipment">
      <PdHeader
        ghost={false}
        onBack={history.goBack}
        title="Shipment"
        extra={
          <Title className="pd-margin-right-2xl" level={5}>
            Shipper
          </Title>
        }
      />
      <Content className="pd-cms-shipment-content">
        {/* Filter Section */}
        <Row>
          <Col lg={12}>
            <Search
              enterButton="Search"
              placeholder="Search..."
              size="medium"
            />
          </Col>
          <Col lg={{ span: 4, offset: 8 }}>
            <PdButton
              type="primary"
              full
              onClick={setShowModal.bind(this, true)}>
              Add Shipment
            </PdButton>
          </Col>
        </Row>

        {/* Table Section */}
        <Row className="pd-margin-top-lg">
          <Col lg={24}>
            <Table dataSource={dataSource} columns={column} />
          </Col>
        </Row>
      </Content>

      {/* Modal Section */}
      {showModal && (
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
      )}
    </Layout>
  );
}
