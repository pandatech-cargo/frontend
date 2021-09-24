import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './style.scss';

export function PdPageSpinner(props) {
  const { className = '' } = props;

  return (
    <div className={`page-spinner ${className}`}>
      <Spin size="large" indicator={<LoadingOutlined />} />
    </div>
  );
}
