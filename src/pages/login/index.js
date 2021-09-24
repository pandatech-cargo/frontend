/* eslint-disable no-unused-vars */
import { Form, Input, Layout, Row } from 'antd';

import AuthenticationServices from 'api/authentication';

import logo from 'assets/svg/logo.svg';
import { PdButton } from 'components';

import { errHandler } from 'utils';

import './style.scss';

const { Content } = Layout;

export function Login({ history }) {
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const buttonItemLayout = null;

  async function handleLogin(payload) {
    try {
      // TODO: uncomment this when BE is ready (and remove localStorage.setItem), also edit the endpoint in api/authentication'
      //   await AuthenticationServices.login(payload);
      localStorage.setItem('cms_token', 123);
      history.push('/');
    } catch (err) {
      errHandler(err);
    }
  }

  function handleOnFinishFailed(errorInfo) {
    errHandler({}, errorInfo);
  }

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
          width={50}
        />
      </Row>
      <Row type="flex" align="middle" justify="center">
        <Form
          className="login-form"
          name="login-form"
          onFinish={handleLogin}
          onFinishFailed={handleOnFinishFailed}
          {...formItemLayout}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Form.Item className="pd-align-center" {...buttonItemLayout}>
            <PdButton type="primary" full={true} htmlType="submit">
              Log In
            </PdButton>
          </Form.Item>
        </Form>
      </Row>
    </Content>
  );
}

// export const LoginPageForm = Form.create({ name: 'login' })(Login);
