/* eslint-disable no-unused-vars */
import { Col, Input, Layout, Row, Select, Table, Typography } from 'antd';

import { PdButton, PdHeader } from 'components';

import './style.scss';

const { Content } = Layout;
const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;

export function Shipment() {
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
            <PdButton type="primary" full>
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
    </Layout>
  );
}
