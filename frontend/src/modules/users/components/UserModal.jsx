import React from "react";

import UsersContext from "../context/UsersContext";
import UserModalTab from "./UserModalTab";

import "./UserModal.scss";

const tabs = [
  {
    label: "Name",
    input: {
      name: "name",
      type: "text",
      placeholder: "Name"
    }
  },
  {
    label: "Email",
    input: {
      name: "email",
      type: "text",
      placeholder: "Email"
    }
  },
  {
    label: "Phone",
    input: {
      name: "phone",
      type: "number",
      placeholder: "Phone"
    }
  }
];

function UserModal() {
  const formRef = React.useRef();
  const viewedTabs = React.useRef(false);
  const [tab, setTab] = React.useState(0);

  const { appState, addNewUser, editUser, onCloseModal } = React.useContext(UsersContext);
  const [formValues, setFormValues] = React.useState(
    appState.modalType === "add"
      ? {
          name: "",
          email: "",
          phone: ""
        }
      : appState.userEditting
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
      name: "",
      email: "",
      phone: ""
    });
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (formValues.name && formValues.email && formValues.phone) {
      if (appState.modalType === 'edit') {
        editUser(formValues)
      }
      if (appState.modalType === 'add') {
        addNewUser(formValues)
      }

      onCancelModal();
    } else {
      if (!formValues.name) {
        setTab(0);
      } else if (!formValues.email) {
        setTab(1);
      } else if (!formValues.phone) {
        setTab(2);
      }
      viewedTabs.current = true;
    }
  };

  React.useEffect(() => {
    if (appState.modalType === 'edit' && appState.isOpenModal) {
      setFormValues(appState.userEditting);
    }
  }, [appState.isOpenModal, appState.modalType, appState.userEditting]);

  // validate tab has empty field
  React.useEffect(() => {
    if (viewedTabs.current) {
      formRef.current.reportValidity();
      viewedTabs.current = false;
    }
  }, [tab])

  return (
    <div className="user-modal">
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
            <UserModalTab
              tabs={tabs}
              currentTab={tab}
              onChangeTab={handleChangeTab}
            />
            <div className="field">
              <input
                value={formValues[input.name]}
                name={input.name}
                placeholder={input.placeholder}
                type={input.type}
                onChange={onChangeInput}
                required
              />
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

export default UserModal;
