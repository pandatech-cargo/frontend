import { useState } from 'react';
import { Table, Select } from 'antd';

const mockData = [
  {
    license: 'D 1234 ABC',
    truck: 'Semi',
    plate: 'Black',
    year: '2021',
    status: 'active',
  },
];

const { Option } = Select;

export function TrucksTable() {
  const [data] = useState(mockData);

  function handleChange(e) {
    console.log(e);
  }

  const columns = [
    {
      title: 'License Number',
      dataIndex: 'license',
      key: 'license',
    },
    {
      title: 'Truck Type',
      dataIndex: 'truck',
      key: 'truck',
    },
    {
      title: 'Plate Type',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Production Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Status',
      key: 'status',
      render: (text) => (
        <Select value={text.status} onChange={handleChange}>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
