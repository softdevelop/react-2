import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";

import ResultsContext from "../context/ResultsContext";
import "./Findings.scss";

function ResultsTable(props) {
  const { getResultById, appState } = React.useContext(ResultsContext);
  const [findings, setFindings] = React.useState(appState.resultViewing ? appState.resultViewing.Findings : []);

  let id = props.match.params.id;
  
  React.useEffect(()=>{
    if(!appState.resultViewing){
      getResultById(id)
    }else{
      setFindings(appState.resultViewing.Findings)
    }
  }, [appState.resultViewing])

  React.useEffect(()=>{
    if(!appState.resultViewing){
      getResultById(id)
    }
  }, [appState.resultViewing])

  return (
    <div>
      <div className="add-record">
        <Link to="/results"><button>Back</button></Link>
      </div>
      <div className="results-table">
        <table id="results">
          <thead>
            <tr>
              <th>RuleId</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Path name</th>
            </tr>
          </thead>
          <tbody>
            {findings.map((finding, index) => (
              <tr key={index}>
                <td>{finding.ruleId}</td>
                <td>{finding.metadata.description}</td>
                <td>{finding.metadata.severity}</td>
                <td>{`${finding.location.path}:${finding.location.positions.begin.line}`}</td>
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

export default withRouter(ResultsTable);
