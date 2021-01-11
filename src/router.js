import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Main} from './containers/Main';

export class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="*" component={() => <div className="NotFound">Not found</div>}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}