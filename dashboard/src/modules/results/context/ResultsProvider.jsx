import React from "react";
import ResultsContext from "./ResultsContext";
import { cacheState, parseCachedState } from '../../../utils/cache';
import { Result } from "../../../api";

const reducerKey = "ResultsProvider_Reducer";
const initState = parseCachedState(reducerKey) || {
  byId: {},
  allIds: [],
  appState: {
    isOpenModal: false,
    modalType: "add",
    resultEditting: {},
    resultViewing: null
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
          resultEditting: state.byId[action.payload.id],
          resultViewing: null
        }
      };
    }

    case "CLOSE_MODAL": {
      return {
        ...state,
        appState: {
          ...state.appState,
          isOpenModal: false,
          resultViewing: null
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
        },
        appState: {
          isOpenModal: false,
          modalType: "add",
          resultEditting: {},
          resultViewing: null
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

    case 'GET_RESULT_BY_ID': {
      return {
        ...state,
        appState: {
          ...state.appState,
          resultViewing: action.payload
        }
      };
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
    (result, cb) => {
      Result.actions.add.request({}, { data: result})
      .then(response => {
        dispatch({
          type: "ADD_NEW_RESULT",
          payload: response.data.data
        });
        cb()
      })
      .catch(err => {
      });
    },
    [dispatch]
  );

  const getResultById = React.useCallback(
    (id, cb) => {
      Result.actions.getById.request({id})
      .then(response => {
        dispatch({
          type: "GET_RESULT_BY_ID",
          payload: response.data.data
        });
        cb()
      })
      .catch(err => {
      });
    },
    [dispatch]
  );

  const editResult = React.useCallback(
    (result, cb) => {
      let id = result._id;
      let data = result;
      if(typeof data.Findings === 'object')
      data.Findings = JSON.stringify(data.Findings)
      Result.actions.edit.request({id}, { data })
      .then(response => {
        dispatch({
          type: "EDIT_RESULT",
          payload: result
        });
        cb();
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
      getResultById,
      deleteResult
    }),
    [resultsReducer, onAddRecord]
  );

  React.useEffect(() => {
    cacheState(reducerKey)(resultsReducer);
  }, [resultsReducer])
  React.useEffect(() => {
    Result.actions.get.request()
      .then(response => {
        dispatch({
          type: "GET_RESULTS",
          payload: response.data.data
        });
      })
      .catch(err => {
    });
  }, [])

  return (
    <ResultsContext.Provider value={contextValue}>
      {props.children}
    </ResultsContext.Provider>
  );
}

export default ResultsProvider;
