import React from "react";
import PropTypes from "prop-types";

import ResultsContext from "../context/ResultsContext";
import ReactJson from 'react-json-view'
import "./ResultsTable.scss";

function ResultsTable(props) {
  const { byId, allIds, onAddRecord, onEditResult, deleteResult } = React.useContext(
    ResultsContext
  );

  const onClickEditResult = id => () => {
    onEditResult(id);
  };

  const onClickDeleteResult = id => () => {
    deleteResult(id);
  };

  return (
    <div>
      <div className="add-record">
        <button onClick={onAddRecord}>Add record</button>
      </div>
      <div className="results-table">
        <h4 className="title">Results</h4>
        <table id="results">
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>RepositoryName</th>
              <th>Findings</th>
              <th>QueuedAt</th>
              <th>ScanningAt</th>
              <th>FinishedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allIds.map(id => (
              <tr key={id}>
                <td>{byId[id]._id}</td>
                <td>{byId[id].Status}</td>
                <td>{byId[id].RepositoryName}</td>
                <td>
                  <ReactJson collapsed src={(byId[id].Findings)} />
                </td>
                <td>{byId[id].QueuedAt}</td>
                <td>{byId[id].ScanningAt}</td>
                <td>{byId[id].FinishedAt}</td>
                <td>
                  <button id="edit" onClick={onClickEditResult(id)}>Edit</button>
                  <button id="delete" onClick={onClickDeleteResult(id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ResultsTable.propTypes = {};

ResultsTable.defaultProps = {};

export default ResultsTable;
