import * as React from 'react'
import {Jumbotron} from 'react-bootstrap';

/**
 * The main page of the SPA.
 *
 * @returns the tsx to be rendered
 */
const Page = () => {
  return (
    <Jumbotron><h1>Hello world!</h1><p>Testing changes.</p></Jumbotron>
  );
};

export {Page};
