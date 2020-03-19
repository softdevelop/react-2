import React from "react";

import ResultsContext from "../context/ResultsContext";
import ResultModalTab from "./ResultModalTab";

import "./ResultModal.scss";

const status = ['Queued', 'In Progress', 'Success', 'Failure']
const tabs = [
  {
    label: "Status",
    input: {
      name: "Status",
      type: "select",
      placeholder: "Status"
    }
  },
  {
    label: "RepositoryName",
    input: {
      name: "RepositoryName",
      type: "text",
      placeholder: "RepositoryName"
    }
  },
  {
    label: "Findings",
    input: {
      name: "Findings",
      type: "text",
      placeholder: "Findings"
    }
  },
  {
    label: "QueuedAt",
    input: {
      name: "QueuedAt",
      type: "text",
      placeholder: "QueuedAt"
    }
  },,
  {
    label: "ScanningAt",
    input: {
      name: "ScanningAt",
      type: "text",
      placeholder: "ScanningAt"
    }
  },
  {
    label: "FinishedAt",
    input: {
      name: "FinishedAt",
      type: "text",
      placeholder: "FinishedAt"
    }
  }
];

function ResultModal() {
  const formRef = React.useRef();
  const viewedTabs = React.useRef(false);
  const [tab, setTab] = React.useState(0);

  const { appState, addNewResult, editResult, onCloseModal } = React.useContext(ResultsContext);
  const [formValues, setFormValues] = React.useState(
    appState.modalType === "add"
      ? {
          Status: status[0],
          RepositoryName: "",
          Findings: "",
          QueuedAt: (new Date()).getTime(),
          ScanningAt: (new Date()).getTime(),
          FinishedAt: (new Date()).getTime()
        }
      : appState.resultEditting
  );

  const input = React.useMemo(() => tabs[tab].input, [tab]);
  const handleChangeTab = index => () => {
    setTab(index);
  };

  const onChangeInput = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const onCancelModal = () => {
    onCloseModal();
    setTab(0);
    setFormValues({
      Status: status[0],
          RepositoryName: "",
          Findings: "",
          QueuedAt: (new Date()).getTime(),
          ScanningAt: (new Date()).getTime(),
          FinishedAt: (new Date()).getTime()
    });
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (formValues.Status 
      && formValues.RepositoryName 
      && formValues.Findings
      && formValues.QueuedAt
      && formValues.ScanningAt
      && formValues.FinishedAt
      ) {
      if (appState.modalType === 'edit') {
        editResult(formValues)
      }
      if (appState.modalType === 'add') {
        addNewResult(formValues)
      }

      onCancelModal();
    } else {
      if (!formValues.Status ) {
        setTab(0);
      } else if (!formValues.RepositoryName ) {
        setTab(1);
      } else if (!formValues.Findings) {
        setTab(2);
      } else if (!formValues.QueuedAt) {
        setTab(3);
      } else if (!formValues.ScanningAt) {
        setTab(4);
      } else if (!formValues.FinishedAt) {
        setTab(5);
      }
      viewedTabs.current = true;
    }
  };

  React.useEffect(() => {
    if (appState.modalType === 'edit' && appState.isOpenModal) {
      setFormValues(appState.resultEditting);
    }
  }, [appState.isOpenModal, appState.modalType, appState.resultEditting]);

  // validate tab has empty field
  React.useEffect(() => {
    if (viewedTabs.current) {
      formRef.current.reportValidity();
      viewedTabs.current = false;
    }
  }, [tab])

  return (
    <div className="result-modal">
      <div
        id="myModal"
        className={`modal modal-${appState.isOpenModal ? "open" : "close"}`}
      >
        <div className="modal-content">
          <div className="modal-btnclose">
            <span type="button" onClick={onCancelModal} className="close">
              &times;
            </span>
          </div>
          <form ref={formRef} onSubmit={onSubmitForm}>
            <ResultModalTab
              tabs={tabs}
              currentTab={tab}
              onChangeTab={handleChangeTab}
            />
            <div className="field">
              {
                input.name === 'Status' ? 
                <select onChange={onChangeInput} name={input.name} value={formValues[input.name]}>
                  {
                    status.map(item=>{
                    return <option key={item} value={item}>{item}</option>
                    })
                  }
                </select> : 
                <input
                  value={(typeof formValues[input.name] === 'object')?JSON.stringify(formValues[input.name]):formValues[input.name]}
                  name={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                  onChange={onChangeInput}
                  required
                />
              }
            </div>
            <div className="control">
              <button type="submit" className="btn control-ok">
                {
                  appState.modalType === 'edit' ? 'Save' : 'Add'
                }
              </button>
              <button type="button" onClick={onCancelModal} className="btn control-nok">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
