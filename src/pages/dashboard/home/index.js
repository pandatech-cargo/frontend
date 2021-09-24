import { useState } from 'react';
import { Col, Layout, Row } from 'antd';
import { PdButton, PdFormModal } from 'components';

export function Home() {
  const [openModal, setOpenModal] = useState(false)
  return (
  <Layout className="pd-cms-home">
    <Row className="pd-margin-top-md">
      <Col span={4}>
        <PdButton type="primary" size="small" onClick={() => setOpenModal(true)}>Open Form Modal</PdButton>
      </Col>
    </Row>
    <PdFormModal
      title = "Add"
      open={openModal}
      onCancel={() => setOpenModal(false)}
      onOk={() => {}}
      loading={false}
      className=""
    >asfas
    </PdFormModal>
  </Layout>
  )
}
