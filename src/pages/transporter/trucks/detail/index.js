import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Transporter from 'api/transporter';

export function TruckDetail() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function dispatch(id) {
      const { data } = await Transporter.getTruck(id);
      console.log(data);
      setData(data.data);
    }
    dispatch(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={20}>
          <Row justify="space-between">
            <Col span={11}>
              <Row>
                <Col>License Plate: {data?.license_number}</Col>
              </Row>
              <Row>
                <Col>Truck Type: {data?.truck_type}</Col>
              </Row>
              <Row>
                <Col>Plate Type: {data?.license_type}</Col>
              </Row>
              <Row>
                <Col>Production Year: {data?.production_year}</Col>
              </Row>
              <Row>
                <Col>Status: {data?.status}</Col>
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
