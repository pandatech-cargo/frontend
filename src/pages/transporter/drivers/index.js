import { useState, useMemo, useCallback } from 'react';
import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { PdButton } from 'components';

const mockData = [
  {
    id: 1,
    name: 'Jack',
    phone: '+6283929934',
    create: '2 August 2021',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Zack',
    phone: '+62839232423',
    create: '10 August 2021',
    status: 'Inactive',
  },
];

const { Search } = Input;

export function DriversTable() {
  const [data] = useState(mockData);

  function handleChange({ id, key }) {
    if (key === 'detail') {
      // open detail modal
    } else {
      console.log(`/drivers/${id}/${key}`);
    }
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
        title: 'Driver Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: (_, { id, name }) => (
          <Link to={`/transporter/drivers/${id}`}>{name}</Link>
        ),
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
        sorter: true,
      },
      {
        title: 'Created At',
        dataIndex: 'create',
        key: 'create',
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
          <Row gutter={8} justify="end">
            <Col span={6}>
              <PdButton type="primary" block>
                Add New Driver
              </PdButton>
            </Col>
            <Col span={6}>
              <Search onChange={handleSearch} />
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
