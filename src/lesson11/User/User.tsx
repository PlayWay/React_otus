import React from "react";
import { UsersResponseType } from "../helper";
import s from "./User.module.scss";

type UserProps = UsersResponseType;

class User extends React.PureComponent<UserProps, any> {
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3 data-testid="user-name">{this.props.name}</h3>
        <ul className={s.list}>
          <li data-testid="user-phone">Phone: {this.props.phone}</li>
          <li data-testid="user-email">Email: {this.props.email}</li>
          <li data-testid="user-website">Website: {this.props.website}</li>
        </ul>
      </div>
    );
  }
}

export default User;
