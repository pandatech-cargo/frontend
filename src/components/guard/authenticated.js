import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PdNavbar } from 'components';

export function AuthenticatedGuardRoute(props) {
  const { component: WrapperComponent, path, ...rest } = props;

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return localStorage.getItem('cms_token') ? (
          <WrapperComponent {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

export function TransporterGuardRoute(props) {
  const { component: WrapperComponent, path, ...rest } = props;

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return localStorage.getItem('role') === 'transporter' ? (
          <>
            <PdNavbar />
            <WrapperComponent {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

AuthenticatedGuardRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};
