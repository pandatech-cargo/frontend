/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import {
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Layout,
  Modal,
  Menu,
  Row,
  Select,
  Table,
  Typography,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { PdButton, PdFormModal, PdHeader, PdNavbar } from 'components';

import CityApi from 'api/city';
import ShipmentApi from 'api/shipment';

import { DATE_FORMAT, errHandler } from 'utils';

import './style.scss';

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export function Shipment() {
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shipmentList, setShipmentList] = useState([]);
  const [shipmentForm] = Form.useForm();
  const [assignForm] = Form.useForm();

  const [showModalShipment, setShowModalShipment] = useState(false);
  const [showModalAssign, setShowModalAssign] = useState(false);

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const menu = () => (
    <Menu onClick={handleAction}>
      <Menu.Item key="allocate_shipment">Allocate Shipment</Menu.Item>
      <Menu.Item key="update_status">Update Status</Menu.Item>
    </Menu>
  );

  const Action = () => (
    <Dropdown overlay={menu} trigger={['click']}>
      <PdButton ghost type="primary">
        Action <DownOutlined />
      </PdButton>
    </Dropdown>
  );

  const dataSource = [
    {
      destination: 'Malaysia',
      loadingDate: Date.now(),
      name: 'hzd',
      origin: 'Jakarta',
      shipment: 'DO-111',
      status: 'completed',
      license: 'B 11111 C',
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
      title: 'License',
      dataIndex: 'license',
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

  function handleAction({ key } = {}) {
    if (key === 'allocate_shipment') setShowModalAssign(true);
  }

  function handleCloseModal() {
    setShowModalAssign(false);
    setShowModalShipment(false);
  }

  async function fetchShipments() {
    setLoading(true);
    try {
      const {
        data: { data = [] },
      } = await ShipmentApi.getShipmentList();
      setShipmentList(data);
    } catch (error) {
      errHandler(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitShipment(values) {
    try {
      await ShipmentApi.createShipment({ shipment: values });
      fetchShipments();
      handleCloseModal();
    } catch (error) {
      errHandler(error);
    }
  }

  function handleSubmitAssign(values) {
    //   write code here
    console.log({ values });
  }

  async function fetchCities() {
    try {
      const { data } = await CityApi.getCityList();
      console.log({ data });
    } catch (error) {
      errHandler(error);
    }
  }

  useEffect(() => {
    fetchCities();
    fetchShipments();
  }, []);

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
      <PdNavbar />
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
              onClick={setShowModalShipment.bind(this, true)}>
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

      {/* Modal Shipment Section */}
      {showModalShipment && (
        <Modal
          form={shipmentForm}
          onCancel={handleCloseModal}
          onOk={shipmentForm.submit}
          open={showModalShipment}
          title="Add Shipment"
          visible={showModalShipment}>
          <Row type="flex" justify="center">
            <Form form={shipmentForm} onFinish={handleSubmitShipment}>
              <Form.Item
                label="Origin"
                name="origin"
                {...formItemLayout}
                rules={[
                  { required: true, message: 'Please choose the origin' },
                ]}>
                <Select showSearch placeholder="Select origin">
                  {cityList.map(({ id, name } = {}) => (
                    <Option key={id} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Destination"
                name="destination"
                rules={[
                  { required: true, message: 'Please choose the destination' },
                ]}
                {...formItemLayout}>
                <Select showSearch placeholder="Select destination">
                  {cityList.map(({ id, name } = {}) => (
                    <Option key={id} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Loading Date"
                name="loading_date"
                rules={[
                  { required: true, message: 'Please choose the loading date' },
                ]}
                {...formItemLayout}>
                <RangePicker format={DATE_FORMAT} />
              </Form.Item>
            </Form>
          </Row>
        </Modal>
      )}

      {/* Modal Assign Section */}
      {showModalAssign && (
        <Modal
          form={shipmentForm}
          onCancel={handleCloseModal}
          onOk={assignForm.submit}
          title="Assign Shipment"
          visible={showModalAssign}>
          <Row type="flex" justify="center">
            <Form form={assignForm} onFinish={handleSubmitAssign}>
              <Form.Item
                label="Transporter"
                name="transporter"
                {...formItemLayout}>
                <Select showSearch placeholder="Select transporter">
                  <Option value={1}>value 1</Option>
                </Select>
              </Form.Item>
            </Form>
          </Row>
        </Modal>
      )}
    </Layout>
  );
}
