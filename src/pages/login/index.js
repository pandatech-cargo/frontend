import { Form, Layout, Radio, Row } from 'antd';

import logo from 'assets/kargo-logo-dark.png';
import { PdButton } from 'components';
import { useMemo } from 'react';

import { errHandler } from 'utils';

import './style.scss';

const { Content } = Layout;

export function Login({ history }) {
  

  function handleLogin({role}) {
    localStorage.setItem("role", role);
    localStorage.setItem("cms_token", '123');
    history.push('/');
  }

  function handleOnFinishFailed(errorInfo) {
    errHandler({}, errorInfo)
  }

  const ROLES = useMemo(() => {
    return [
      {
        role: 'transporter',
        label: 'Transporter'
      },
      {
        role: 'shipper',
        label: 'Shipper'
      }
    ]
  }, [])

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
          className="login-form"
          name="login-form"
          onFinish={handleLogin}
          onFinishFailed={handleOnFinishFailed}
          >
          <Form.Item
            label="Role"
            name="role">
            <Radio.Group>
              {ROLES.map(({role, label}) => (
                <Radio key={role} value={role} name="role">{label}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item className="pd-align-center">
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
