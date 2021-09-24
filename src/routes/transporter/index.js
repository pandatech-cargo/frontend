import { Switch, Route } from 'react-router-dom';
import { Header } from 'components/transporter/header';
import { TrucksTable } from 'pages/transporter/trucks';
import { DriversTable } from 'pages/transporter/drivers';

export function TransporterRoute() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/transporter/trucks" component={TrucksTable} />
        <Route exact path="/transporter/drivers" component={DriversTable} />
      </Switch>
    </>
  );
}
