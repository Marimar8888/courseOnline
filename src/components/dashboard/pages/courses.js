import React from 'react';

import CourseContainer from "../../course/course-container"

//Recibe los props desde app.js
export default function Courses(props) {
  return (
    <div className="collection-page-wrapper">
      <CourseContainer loggedInStatus={props.loggedInStatus} editingPermision={props.editingPermision}/>
    </div>
  )
}
