/**
 * The entry point for the client code. Simply renders a Page component with React.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Page} from './scenes/Page';

import "bootstrap3/dist/css/bootstrap.min.css";

ReactDOM.render(<Page/>, document.getElementById("root"));
