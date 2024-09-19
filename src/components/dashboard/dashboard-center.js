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

  return showCenterContainer ? (
    <CenterEditCreateContainer
      userId={userId}
      handleCenterCreated={handleCenterCreated}
      handleEditCenter={handleEditCenter}
      centerToEdit={centerToEdit}
      handleBack={handleBack} />
  ) : (
    <CentersContainer
      centersData={centersData}
      updateCenterData={updateCenterData}
      handleEditCenter={handleEditCenter}
      handleChangeStatusCenter={handleChangeStatusCenter}
    />
  );
};

export default DashboardCenter;