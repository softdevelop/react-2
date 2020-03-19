import React from "react";
import ResultsContext from "./ResultsContext";
import { v4 as uuid } from "uuid";

import { cacheState, parseCachedState } from '../../../utils/cache';
import { Result } from "../../../api";

const reducerKey = "ResultsProvider_Reducer";
const initState = parseCachedState(reducerKey) || {
  byId: {},
  allIds: [],
  appState: {
    isOpenModal: false,
    modalType: "add",
    resultEditting: {}
  }
};

function ResultReducer(state, action) {
  switch (action.type) {
    case "OPEN_RESULT_MODAL": {
      return {
        ...state,
        appState: {
          ...state.appState,
          isOpenModal: true,
          modalType: action.payload.type,
          resultEditting: state.byId[action.payload.id]
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

    case "ADD_NEW_RESULT": {
      const result = {
        ...action.payload
      };

      return {
        ...state,
        byId: {
          ...state.byId,
          [result._id]: result
        },
        allIds: state.allIds.concat([result._id])
      };
    }

    case "EDIT_RESULT": {
      const result = action.payload;
      result.Findings = JSON.parse(result.Findings)
      return {
        ...state,
        byId: {
          ...state.byId,
          [result._id]: result
        }
      };
    }

    case "DELETE_RESULT": {
      return {
        ...state,
        allIds: state.allIds.filter(id => id !== action.payload)
      };
    }

    case "GET_RESULTS": {
      let byId = action.payload.reduce((result, item)=>{
        return {
          ...result,
          [item._id]: item
        }
      },{})
      return {
        ...state,
        allIds: action.payload.map(item=>item._id),
        byId
      }
    }

    default:
      return state;
  }
}

function ResultsProvider(props) {
  const [resultsReducer, dispatch] = React.useReducer(ResultReducer, initState);

  const onAddRecord = React.useCallback(() => {
    dispatch({
      type: "OPEN_RESULT_MODAL",
      payload: {
        type: "add"
      }
    });
  }, [dispatch]);

  const onEditResult = React.useCallback(
    id => {
      dispatch({
        type: "OPEN_RESULT_MODAL",
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

  const addNewResult = React.useCallback(
    result => {
      Result.actions.add.request({}, { data: result})
      .then(response => {
        dispatch({
          type: "ADD_NEW_RESULT",
          payload: response.data.data
        });
      })
      .catch(err => {
      });
    },
    [dispatch]
  );

  const editResult = React.useCallback(
    result => {
      let id = result._id;
      Result.actions.edit.request({id}, { data: result})
      .then(response => {
        dispatch({
          type: "EDIT_RESULT",
          payload: result
        });
      })
      .catch(err => {
      });
     
    },
    [dispatch]
  );

  const deleteResult = React.useCallback(
    id => {
      Result.actions.delete.request({id})
        .then(response => {
          dispatch({
            type: "DELETE_RESULT",
            payload: id
          });
        })
        .catch(err => {
      });
    },
    [dispatch]
  );

  const contextValue = React.useMemo(
    () => ({
      ...resultsReducer,
      onAddRecord,
      onCloseModal,
      addNewResult,
      onEditResult,
      editResult,
      deleteResult
    }),
    [resultsReducer, onAddRecord]
  );

  React.useEffect(() => {
    cacheState(reducerKey)(resultsReducer);
  }, [resultsReducer])

  React.useEffect(() => {
    // mount
    Result.actions.get.request()
      .then(response => {
        dispatch({
          type: "GET_RESULTS",
          payload: response.data.data
        });
      })
      .catch(err => {
    });
    // return () => {
    //   // unmount
    // }
  }, [])

  return (
    <ResultsContext.Provider value={contextValue}>
      {props.children}
    </ResultsContext.Provider>
  );
}

export default ResultsProvider;
