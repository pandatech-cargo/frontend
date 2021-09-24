import { Col, Layout, Row } from 'antd';
import { useHistory } from 'react-router';
import { PdButton } from 'components';

import logo from 'assets/logo-light.png';

const { Header } = Layout;

export const PdNavbar = () => {
  const history = useHistory();
  async function handleLogout() {
    const role = localStorage.getItem('role');

    if (role) {
      localStorage.removeItem('role');
      history.push('/');
    }
  }

  return (
    <Header>
      <Row type="flex" justify="space-between">
        <Col>
          <img
            alt="Company Logo"
            className="pd-header-logo"
            height={50}
            src={logo}
            width={150}
          />
        </Col>
        <Col>
          <PdButton type="primary" onClick={handleLogout}>
            Logout
          </PdButton>
        </Col>
      </Row>
    </Header>
  );
};
