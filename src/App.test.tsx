// tslint:disable-next-line:no-var-requires
// Window.fetch = require('node-fetch');
// global.AbortController = require('abort-controller');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('Entire app renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
