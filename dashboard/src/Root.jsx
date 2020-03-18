import React from 'react';

// modules
import { UsersProvider, UsersTable, UserModal } from './modules/users';

import './Root.scss';

function Root() {
  return (
    <div className="root-app">
      <UsersProvider>
        <UsersTable />
        <UserModal />
      </UsersProvider>
    </div>
  )
}

export default Root;
