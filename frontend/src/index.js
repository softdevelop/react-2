import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

import './assets/styles/style.sass';

ReactDOM.render(
  React.createElement(Root),
  document.getElementById('root'),
);

// Check if hot reloading is enable. If it is, changes won't reload the page.
// This is related to webpack-dev-server and works on development only.
if (module.hot) {
  module.hot.accept();
}
