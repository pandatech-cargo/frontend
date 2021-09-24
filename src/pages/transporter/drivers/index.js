import { useState, useMemo, useCallback, useEffect } from 'react';
import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { PdButton } from 'components';
import Transporter from 'api/transporter';

const { Search } = Input;

export function DriversTable() {
  const [data, setData] = useState([]);

  async function dispatch() {
    const { data } = await Transporter.getAllDrivers();
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
      await Transporter.updateDriverStatus(id, key);
      dispatch();
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
        dataIndex: 'phone_number',
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
