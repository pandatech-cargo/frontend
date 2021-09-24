import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { Layout } from 'antd';

import { MainProvider } from 'contexts';

import { DragAndDrop, FormSubmission, Home, Login, Shipment } from 'pages';

import { TransporterRoute } from 'routes/transporter';

import {
  AuthenticatedGuardRoute,
  NotAuthenticatedGuardRoute,
  PdSidebar,
  TransporterGuardRoute,
} from 'components';

import 'config/antd.less';
import 'App.scss';

// Page Management
const authRoutesList = [
  { path: '/', component: Home, exact: true },
  { path: '/shipment', component: Shipment, exact: true },
  { path: '/examples/form-submission', component: FormSubmission, exact: true },
  { path: '/examples/dnd', component: DragAndDrop, exact: true },
];

const nonAuthRoutesList = [{ path: '/login', component: Login, exact: true }];

// Weird that we mix UI and routes
function DashboardRoutes() {
  return (
    <Switch>
      <Layout className="pd-cms">
        <PdSidebar />
        {authRoutesList.map((route, idx) => (
          <AuthenticatedGuardRoute key={idx} {...route} />
        ))}
      </Layout>
    </Switch>
  );
}

// TODO: 404 page
// TODO: ErrorBoundary

function App() {
  return (
    <MainProvider>
      <Router>
        <Switch>
          <TransporterGuardRoute
            path="/transporter"
            component={TransporterRoute}
          />
          <Layout className="pd-cms">
            {nonAuthRoutesList.map((route, idx) => (
              <NotAuthenticatedGuardRoute key={idx} {...route} />
            ))}
            <AuthenticatedGuardRoute path="/" component={DashboardRoutes} />
          </Layout>
        </Switch>
      </Router>
    </MainProvider>
  );
}

export default App;
