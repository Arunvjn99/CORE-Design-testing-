import React, { Component, Fragment } from "react";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import HeaderProfileDropdown from "../HeaderProfileDropdown";

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
      logout: false,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.given_name,
      roleName: user?.role,
    });
  }

  render() {
    const { isAuthenticated, userName, roleName } = this.state;
    const { permissions } = this.props;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath, permissions);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true },
      };
      return this.authenticatedView(
        userName,
        roleName,
        profilePath,
        logoutPath,
        permissions
      );
    }
  }

  authenticatedView(userName, roleName, profilePath, logoutPath, permissions) {
    return (
      <Fragment>
        <HeaderProfileDropdown
          profileName={userName}
          role={roleName}
          permissions={permissions}
        />
      </Fragment>
    );
  }

  anonymousView(registerPath, loginPath, permissions) {
    return (
      <Fragment>
        <HeaderProfileDropdown
          profileName={"User"}
          role={"Admin"}
          permissions={permissions}
        />
      </Fragment>
    );
  }
}
