import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import 'babel-polyfill';
import 'normalize.css/normalize.css';
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import CourseAdmin from './views/CourseAdmin';
import CourseOfficeHours from './views/CourseOfficeHours';
import CourseSearch from './views/CourseSearch';
import CreateCourseForm from './views/CreateCourseForm';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" exact={true} component={CourseSearch} />
          <Route
            path="/course/create/"
            component={CreateCourseForm}
          />
          <Route
            path="/course/officeHours/:courseId"
            component={CourseOfficeHours}
          />
          <Route
            path="/course/admin/:courseId"
            component={CourseAdmin}
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
