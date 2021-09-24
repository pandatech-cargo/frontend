import { Form, Layout, Radio, Row, Space } from 'antd';

import logo from 'assets/kargo-logo-dark.png';
import { PdButton } from 'components';
import { useMemo } from 'react';

import { errHandler } from 'utils';

import './style.scss';

const { Content } = Layout;

export function Login({ history }) {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 24 },
  };

  function handleLogin({ role }) {
    localStorage.setItem('role', role);
    if (role === 'transporter') history.push('/transporter');
    else if (role === 'shipment') history.push('/shipment');
  }

  function handleOnFinishFailed(errorInfo) {
    errHandler({}, errorInfo);
  }

  const ROLES = useMemo(() => {
    return [
      {
        role: 'transporter',
        label: 'Transporter',
      },
      {
        role: 'shipment',
        label: 'Shipment',
      },
    ];
  }, []);

  return (
    <Content className="pd-login">
      <Row
        className="logo-container pd-margin-bottom-lg"
        type="flex"
        align="middle"
        justify="center">
        <img
          alt="Company Logo"
          className="pd-header-logo"
          height={50}
          src={logo}
          width={150}
        />
      </Row>
      <Row type="flex" align="middle" justify="center">
        <Form
          {...formItemLayout}
          className="login-form"
          // layout="vertical"
          name="login-form"
          onFinish={handleLogin}
          onFinishFailed={handleOnFinishFailed}>
          <Form.Item label="Role" name="role">
            <Radio.Group>
              <Space direction="vertical">
                {ROLES.map(({ role, label }) => (
                  <Radio key={role} value={role} name="role">
                    {label}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="pd-align-center" {...buttonItemLayout}>
            <PdButton type="primary" htmlType="submit">
              Log In
            </PdButton>
          </Form.Item>
        </Form>
      </Row>
    </Content>
  );
}

// export const LoginPageForm = Form.create({ name: 'login' })(Login);
