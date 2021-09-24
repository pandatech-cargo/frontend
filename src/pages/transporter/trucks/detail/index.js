import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';

const mockData = {
  id: 1,
  license: 'D 1234 ABC',
  truck: 'Semi',
  plate: 'Black',
  year: '2021',
  status: 'active',
};

export function TruckDetail() {
  const { id } = useParams();

  return (
    <>
      <Row justify="center">
        <Col span={20}>
          {id}
          <Row justify="space-between">
            <Col span={11}>
              <Row>
                <Col>License Plate: {mockData.license}</Col>
              </Row>
              <Row>
                <Col>Truck Type: {mockData.truck}</Col>
              </Row>
              <Row>
                <Col>Plate Type: {mockData.plate}</Col>
              </Row>
              <Row>
                <Col>Production Year: {mockData.year}</Col>
              </Row>
              <Row>
                <Col>Status: {mockData.status}</Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <Col>STNK: </Col>
              </Row>
              <Row>
                <Col>KIR: </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
