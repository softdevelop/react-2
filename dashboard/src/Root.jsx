import React from 'react';

// modules
import { UsersProvider, UsersTable, UserModal } from './modules/users';

import { ResultsProvider, ResultsTable, ResultModal } from './modules/results';

import './Root.scss';

function Root() {
  return (
    <div className="root-app">
      <ResultsProvider>
        <ResultsTable />
        <ResultModal />
      </ResultsProvider>
    </div>
  )
}

export default Root;
