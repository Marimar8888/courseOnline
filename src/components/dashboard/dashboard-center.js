import React from 'react';

import CenterEditCreateContainer from '../centers/center-edit-create-container';
import CentersContainer from '../centers/centers-container';

const DashboardCenter = ({
  centersData,
  updateCenterData,
  userId,
  showCenterContainer,
  handleCenterCreated,
  handleEditCenter,
  centerToEdit,
  handleBack,
  handleChangeStatusCenter
}) => {
  if (showCenterContainer && !centerToEdit) {
    return (
      <CenterEditCreateContainer
        userId={userId}
        handleCenterCreated={handleCenterCreated}
        handleBack={handleBack}
      />
    );
  } else if (showCenterContainer && centerToEdit) {
    return (
      <CenterEditCreateContainer
        userId={userId}
        handleEditCenter={handleEditCenter}
        centerToEdit={centerToEdit}
        handleBack={handleBack}
        updateCenterData = {updateCenterData}
      />
    );
  } else {
    return (
      <div className="dashboard-content-all-dates">
        <CentersContainer
          centersData={centersData}
          updateCenterData={updateCenterData}
          handleEditCenter={handleEditCenter}
          handleChangeStatusCenter={handleChangeStatusCenter}
        />
      </div>
    );
  }
};

export default DashboardCenter;