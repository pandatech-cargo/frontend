import { useEffect } from 'react';

import { Layout, PageHeader } from 'antd';

import './style.scss';

const { Content } = Layout;

export function DragAndDrop() {
  useEffect(() => {}, []);

  return (
    <Layout className="drag-and-drop">
      <PageHeader
        ghost={false}
        onBack={history.goBack}
        style={{
          // TODO: isolate this into component, then style there with scss
          borderBottom: '1px solid rgb(235, 237, 240)',
        }}
        title="DnD"
        subTitle="using table with a fairly complex interaction"
      />
      <Content className="form-submission-content">Work in progress</Content>
    </Layout>
  );
}
