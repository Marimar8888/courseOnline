import React from 'react';

import CourseContainer from "../../course/course-container"

//Recibe los props desde app.js
export default function Courses(props) {
  return (
    <div className="store-page-wrapper">
      <CourseContainer loggedInStatus={props.loggedInStatus}/>
    </div>
  )
}
