import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link to="/transporter/shipment">Shipment</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/transporter/trucks"> Trucks</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/transporter/drivers">Drivers</Link>
      </Menu.Item>
    </Menu>
  );
}
