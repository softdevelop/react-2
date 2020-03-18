import React from "react";
import UsersContext from "./UsersContext";
import { v4 as uuid } from "uuid";

import { cacheState, parseCachedState } from '../../../utils/cache';

const reducerKey = "UsersProvider_Reducer";
const initState = parseCachedState(reducerKey) || {
  byId: {},
  allIds: [],
  appState: {
    isOpenModal: false,
    modalType: "add",
    userEditting: {}
  }
};

function UserReducer(state, action) {
  switch (action.type) {
    case "OPEN_USER_MODAL": {
      return {
        ...state,
        appState: {
          ...state.appState,
          isOpenModal: true,
          modalType: action.payload.type,
          userEditting: state.byId[action.payload.id]
        }
      };
    }

    case "CLOSE_MODAL": {
      return {
        ...state,
        appState: {
          ...state.appState,
          isOpenModal: false
        }
      };
    }

    case "ADD_NEW_USER": {
      const user = {
        ...action.payload,
        id: uuid()
      };

      return {
        ...state,
        byId: {
          ...state.byId,
          [user.id]: user
        },
        allIds: state.allIds.concat([user.id])
      };
    }

    case "EDIT_USER": {
      const user = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [user.id]: user
        }
      };
    }

    case "DELETE_USER": {
      return {
        ...state,
        allIds: state.allIds.filter(id => id !== action.payload)
      };
    }

    default:
      return state;
  }
}

function UsersProvider(props) {
  const [usersReducer, dispatch] = React.useReducer(UserReducer, initState);

  const onAddRecord = React.useCallback(() => {
    dispatch({
      type: "OPEN_USER_MODAL",
      payload: {
        type: "add"
      }
    });
  }, [dispatch]);

  const onEditUser = React.useCallback(
    id => {
      dispatch({
        type: "OPEN_USER_MODAL",
        payload: {
          type: "edit",
          id
        }
      });
    },
    [dispatch]
  );

  const onCloseModal = React.useCallback(() => {
    dispatch({
      type: "CLOSE_MODAL"
    });
  }, [dispatch]);

  const addNewUser = React.useCallback(
    user => {
      dispatch({
        type: "ADD_NEW_USER",
        payload: user
      });
    },
    [dispatch]
  );

  const editUser = React.useCallback(
    user => {
      dispatch({
        type: "EDIT_USER",
        payload: user
      });
    },
    [dispatch]
  );

  const deleteUser = React.useCallback(
    id => {
      dispatch({
        type: "DELETE_USER",
        payload: id
      });
    },
    [dispatch]
  );

  const contextValue = React.useMemo(
    () => ({
      ...usersReducer,
      onAddRecord,
      onCloseModal,
      addNewUser,
      onEditUser,
      editUser,
      deleteUser
    }),
    [usersReducer, onAddRecord]
  );

  React.useEffect(() => {
    cacheState(reducerKey)(usersReducer);
  }, [usersReducer])

  return (
    <UsersContext.Provider value={contextValue}>
      {props.children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
