import { useState } from 'react';
import { Table, Select } from 'antd';

const mockData = [
  {
    name: 'Jack',
    phone: '+6283929934',
    create: '2 August 2021',
    status: 'active',
  },
];

const { Option } = Select;

export function DriversTable() {
  const [data] = useState(mockData);

  function handleChange(e) {
    console.log(e);
  }

  const columns = [
    {
      title: 'Driver Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Created At',
      dataIndex: 'create',
      key: 'create',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Status',
      key: 'status',
      render: () => (
        <Select defaultValue="update" onChange={handleChange}>
          <Option value="update">Update</Option>
          <Option value="delete">Delete</Option>
        </Select>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
