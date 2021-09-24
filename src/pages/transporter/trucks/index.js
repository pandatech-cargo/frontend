import { useState, useMemo, useCallback } from 'react';
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

const mockData = [
  {
    id: 1,
    license: 'D 1234 ABC',
    truck: 'Container',
    plate: 'Black',
    year: '2021',
    status: 'Active',
  },
  {
    id: 2,
    license: 'D 2342 CBE',
    truck: 'Tronton',
    plate: 'Yellow',
    year: '2022',
    status: 'Inactive',
  },
];

const { Option } = Select;
const { Search } = Input;

export function TrucksTable() {
  const [data] = useState(mockData);

  function handleChange({ id, key }) {
    if (key === 'detail') {
      // open detail modal
    } else {
      console.log(`/trucks/${id}/${key}`);
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
        {status === 'Active' ? (
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
  }, []);

  const columns = useMemo(
    () => [
      {
        title: 'License Number',
        key: 'license',
        sorter: true,
        render: ({ id, license }) => (
          <Link to={`/transporter/trucks/${id}`}>{license}</Link>
        ),
      },
      {
        title: 'Truck Type',
        dataIndex: 'truck',
        key: 'truck',
        sorter: true,
      },
      {
        title: 'Plate Type',
        dataIndex: 'plate',
        key: 'plate',
        sorter: true,
      },
      {
        title: 'Production Year',
        dataIndex: 'year',
        key: 'year',
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
