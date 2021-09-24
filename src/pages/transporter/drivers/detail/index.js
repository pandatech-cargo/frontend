import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';

const mockData = {
  name: 'Jack',
  phone: '+6283929934',
  create: '2 August 2021',
  status: 'active',
};

export function DriverDetail() {
  const { id } = useParams();

  return (
    <>
      <Row justify="center">
        <Col span={20}>
          {id}
          <Row justify="space-between">
            <Col span={11}>
              <Row>
                <Col>Driver Name: {mockData.name}</Col>
              </Row>
              <Row>
                <Col>Phone Number: {mockData.phone}</Col>
              </Row>
              <Row>
                <Col>Created At: {mockData.create}</Col>
              </Row>
              <Row>
                <Col>Status: {mockData.status}</Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <Col>ID Card: </Col>
              </Row>
              <Row>
                <Col>Driver License: </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
