import React from "react";
import { withRouter, Link } from 'react-router-dom';

import './ResultForm.scss';

import ResultsContext from "../context/ResultsContext";

const status = ['Queued', 'In Progress', 'Success', 'Failure']

const timeStamp = {
  'Queued': 'QueuedAt', 
  'In Progress': 'ScanningAt', 
  'Success': 'FinishedAt', 
  'Failure': 'FinishedAt'
};

function ResultForm(props){
  const formRef = React.useRef();
  const { appState, addNewResult, editResult, onCloseModal, onEditResult, allIds } = React.useContext(ResultsContext);
  const [formValues, setFormValues] = React.useState(
    appState.modalType === "add"
      ? {
          Status: status[0],
          RepositoryName: "",
          Findings: '',
          FindingsStr: '',
          TimeStamp: (new Date()).getTime()
        }
      : {
        ...appState.resultEditting,
        TimeStamp: appState.resultEditting && appState.resultEditting[timeStamp[appState.resultEditting.Status]],
        FindingsStr: appState.resultEditting && JSON.stringify(appState.resultEditting.Findings)
      }
  );

  React.useEffect(() => {
    if(allIds.length>0 && props.match.params && props.match.params.id) {
      onEditResult(props.match.params.id)
    }
  }, [allIds])

  React.useEffect(() => {
    if(appState.resultEditting && props.match.params && props.match.params.id){
      setFormValues({
        ...appState.resultEditting,
        TimeStamp: appState.resultEditting && appState.resultEditting[timeStamp[appState.resultEditting.Status]],
        FindingsStr: appState.resultEditting && JSON.stringify(appState.resultEditting.Findings)

      })
    }
  }, [appState.resultEditting])
  
  const onSubmitForm = e => {
    e.preventDefault();
    if (formValues.Status 
      && formValues.RepositoryName 
      && formValues.FindingsStr
      && formValues.TimeStamp
      ) {
      if (appState.modalType === 'edit') {
        let data = {...formValues};
        delete data.QueuedAt;
        delete data.ScanningAt;
        delete data.FinishedAt;
        data[timeStamp[data.Status]] = data.TimeStamp;
        delete data.TimeStamp;
        data.Findings = data.FindingsStr;
        delete data.FindingsStr;
        editResult(data, ()=>{
          props.history.push('/results');
        })
      }
      if (appState.modalType === 'add') {
        let data = {...formValues};
        delete data.QueuedAt;
        delete data.ScanningAt;
        delete data.FinishedAt;
        data[timeStamp[data.Status]] = data.TimeStamp;
        delete data.TimeStamp;
        data.Findings = data.FindingsStr;
        delete data.FindingsStr;
        addNewResult(data, ()=>{
          props.history.push('/results');
        })
      }
    }
  };

  const onChangeInput = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="result-form">
      <form ref={formRef} onSubmit={onSubmitForm}>
        <div className="form-item">
          <label>Status</label>
          <select 
            onChange={onChangeInput} 
            value={formValues.Status}
            name="Status"
          >
            {
              status.map(item=>{
              return <option key={item} value={item}>{item}</option>
              })
            }
          </select>
        </div>
        <div className="form-item">
          <label>RepositoryName</label>
          <input type="text" name="RepositoryName" onChange={onChangeInput} required value={formValues.RepositoryName}/>
        </div>
        <div className="form-item">
          <label>Findings</label>
          <textarea 
            onChange={onChangeInput} 
            name="FindingsStr"
            required
            value={formValues.FindingsStr}
          >
          </textarea>
        </div>
        <div className="form-item">
          <label>{timeStamp[formValues.Status]}</label>
          <input type="text" name="TimeStamp" onChange={onChangeInput} required value={formValues.TimeStamp}/>
        </div>
        <div className="form-action">
          <Link to="/results"><button id="cancel" >Cancel</button></Link>
          <button id="save" type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(ResultForm);