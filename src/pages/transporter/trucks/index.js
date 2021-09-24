import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { PdButton } from 'components';
import Transporter from 'api/transporter';

const { Option } = Select;
const { Search } = Input;

export function TrucksTable() {
  const [data, setData] = useState([]);

  async function dispatch() {
    const { data } = await Transporter.getAllTrucks();
    setData(data.data);
  }

  useEffect(() => {
    dispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleChange({ id, key }) {
    if (key === 'detail') {
      // open detail modal
    } else {
      await Transporter.updateTruckStatus(id, key);
      dispatch();
    }
  }

  function handleFilter(e) {
    console.log(e);
  }

  function handleSearch(value) {
    console.log(value);
  }

  function handleTableChange(pagination, _, sorter) {
    const { columnKey, order } = sorter || {};
    console.log(columnKey, order, pagination);
    // sorter: key, ascend/decend
  }

  const action = useCallback(({ id, status }) => {
    const menu = (
      <Menu onClick={({ key }) => handleChange({ id, key })}>
        <Menu.Item key="detail">Change Detail</Menu.Item>
        {status === 'active' ? (
          <Menu.Item key="deactivate">Deactivate Unit</Menu.Item>
        ) : (
          <Menu.Item key="activate">Activate Unit</Menu.Item>
        )}
      </Menu>
    );

    return (
      <Dropdown key={id} overlay={menu}>
        <Button>
          Update <DownOutlined />
        </Button>
      </Dropdown>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        title: 'License Number',
        key: 'license_number',
        sorter: true,
        render: ({ id, license_number }) => (
          <Link to={`/transporter/trucks/${id}`}>{license_number}</Link>
        ),
      },
      {
        title: 'Truck Type',
        dataIndex: 'truck_type',
        key: 'truck_type',
        sorter: true,
      },
      {
        title: 'Plate Type',
        dataIndex: 'license_type',
        key: 'license_type',
        sorter: true,
      },
      {
        title: 'Production Year',
        dataIndex: 'production_year',
        key: 'production_year',
        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
      },
      {
        title: 'Action',
        key: 'action',
        render: action,
      },
    ],
    [action]
  );

  return (
    <Row justify="center">
      <Col span={20}>
        <Space className="pd-space" direction="vertical" size="large">
          <Row justify="space-between">
            <Col span={6}>
              <Select placeholder="Truck Type" onChange={handleFilter}>
                <Option value="tronton">Tronton</Option>
                <Option value="container">Container</Option>
                <Option value="cde">CDE</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Row justify="end" gutter={8}>
                <Col span={12}>
                  <PdButton type="primary" block>
                    Add New Unit
                  </PdButton>
                </Col>
                <Col span={12}>
                  <Search onChange={handleSearch} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            onChange={handleTableChange}
            rowKey="id"
          />
        </Space>
      </Col>
    </Row>
  );
}
