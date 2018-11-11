import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Admin from './course/Admin';
import Create from './course/Create';
import Search from './course/Search';
import View from './course/View';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact={true} component={Search} />
          <Route path="/course/:courseAbbreviation/create" component={Create} />
          <Route path="/course/:courseAbbreviation/view" component={View} />
          <Route path="/course/:courseAbbreviation/admin" component={Admin} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
