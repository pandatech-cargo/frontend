import { Switch, Route } from 'react-router-dom';
import { Space } from 'antd';

import { Header } from 'components/transporter/header';
import { TrucksTable } from 'pages/transporter/trucks';
import { DriversTable } from 'pages/transporter/drivers';
import { TruckDetail } from 'pages/transporter/trucks/detail';
import { DriverDetail } from 'pages/transporter/drivers/detail';
import { Shipment } from 'pages/transporter/shipment';

export function TransporterRoute() {
  return (
    <Space className="pd-space" direction="vertical" size="large">
      <Header />
      <Switch>
        <Route exact path="/transporter/trucks" component={TrucksTable} />
        <Route exact path="/transporter/drivers" component={DriversTable} />
        <Route exact path="/transporter/shipment" component={Shipment} />
        <Route exact path="/transporter/trucks/:id" component={TruckDetail} />
        <Route exact path="/transporter/drivers/:id" component={DriverDetail} />
      </Switch>
    </Space>
  );
}
