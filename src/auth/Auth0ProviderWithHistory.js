import { useHistory } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();
  const { isAuthenticated } = useAuth0();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={isAuthenticated ? "/dashboard" : window.location.origin}
      onRedirectCallback={onRedirectCallback}
      //   audience={`https://${domain}/api/v2/`}
      //   scope="read:current_user api:admin"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
