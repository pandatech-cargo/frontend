/**
 * TODO: there's currently no syncronization between the highlighted menu with the pathname
 * if a user refresh a page, the menu highlight is gone
 */
import { Menu, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const { Title } = Typography;

const menuOptions = [
  {
    type: 'SubMenu',
    name: 'Examples',
    children: [
      // TODO: probably better to store the pathname in a constant so it sync better with the routers
      {
        type: 'Menu',
        name: 'Form Submission',
        link: '/examples/form-submission',
      },
      { type: 'Menu', name: 'Drag and drop table', link: '/examples/dnd' },
    ],
  },
];

function renderMenu(opt, parent = '') {
  const { name = '', link = '', type = 'Menu', children = [] } = opt;

  if (type === 'Menu') {
    return (
      <Item key={`${parent}${name}`}>
        <Link to={link}>{name}</Link>
      </Item>
    );
  } else {
    return (
      <SubMenu key={name} title={<span>{name}</span>}>
        {children.map((opt) => renderMenu(opt, `${name}-`))}
      </SubMenu>
    );
  }
}

export function PdSidebar() {
  async function handleLogout() {
    const cms_token = localStorage.getItem('cms_token');

    if (cms_token) {
      localStorage.removeItem('cms_token');
      localStorage.removeItem('current_admin');
      localStorage.removeItem('role');
    }
  }

  return (
    <Sider width="300" className="pd-cms-sidebar">
      <div className="wrapper">
        <div className="menu">
          <Title level={3}>
            <Link to={'/'}>Dashboard</Link>
          </Title>
          <Menu mode="inline">{menuOptions.map((opt) => renderMenu(opt))}</Menu>
        </div>
        <div className="user-badge">
          <Title level={4} onClick={handleLogout}>
            <Link to={'/login'}>Logout</Link>
          </Title>
        </div>
      </div>
    </Sider>
  );
}
