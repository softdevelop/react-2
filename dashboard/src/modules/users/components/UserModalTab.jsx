import React from "react";

import "./UserModalTab.scss";

function UserModalTab({ tabs, currentTab, onChangeTab }) {
  return (
    <div className="user-modal-tab">
      {tabs.map((tab, index) => (
        <button
          type="button"
          className={`tab ${currentTab === index ? "tab-active" : ""}`}
          key={index}
          onClick={onChangeTab(index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default UserModalTab;
