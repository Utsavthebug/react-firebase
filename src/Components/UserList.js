import React, { Component } from "react";
import { UserContext } from "../context/UserContext";

export default class UserList extends Component {
  render() {
    return (
      <div>
        <h1>content</h1>
        <UserContext.Consumer>
          {(ctx) => ctx[0].map((data) => <li key={data.id}>{data.name}</li>)}
        </UserContext.Consumer>
      </div>
    );
  }
}
