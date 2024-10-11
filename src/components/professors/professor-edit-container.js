import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DashboardBills from '../dashboard/dashboard-bills';
import { getEnrollmentsByProfessorId } from "../services/enrollment";
import { ActiveStudents, InactiveStudents } from "../services/student";
import ProfessorCentersTable from './professor-centers-table';
import ProfessorFormFields from '../forms/professor-form-fields';
import DashboardDatesProfessorForm from '../forms/dashboard-dates-professor-form';
import CenterEditCreateContainer from '../centers/center-edit-create-container';
import { updateProfessor } from '../services/professor';

class ProfessorEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professors_id: "",
      professors_user_id: this.props.userId || "",
      professors_first_name: "",
      professors_last_name: "",
      professors_email: "",
      professors_dni: "",
      professors_address: "",
      professors_city: "",
      professors_postal: "",
      professors_number_card: "",
      professors_exp_date: "",
      professors_cvc: "",
      courses: [],
      students: [],
      enrollments: [],
      activeStudents: [],
      centers: [],
      inactiveStudents: [],
      isButtonEnabled: false
    };
    this.initialState = { ...this.state };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.handleStudentsClick = this.handleStudentsClick.bind(this);
    this.handleCentersClick = this.handleCentersClick.bind(this);
    this.filterCoursesByEnrollmentStatus = this.filterCoursesByEnrollmentStatus.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
  }

  componentDidMount() {
    const { professorData } = this.props;
    const token = localStorage.getItem("token");
    if (professorData) {
      this.setState({
        ...professorData.professor,
        courses: professorData.courses.items || [],
        students: professorData.students || [],
        centers: professorData.study_centers || [],
        isButtonEnabled: false,
      });

      if (professorData.professor.professors_id) {
        getEnrollmentsByProfessorId(professorData.professor.professors_id, token)
          .then(enrollments => {
            if (enrollments) {
              this.setState({ enrollments });
            }
            if (enrollments.length > 0) {
              const activeStudents = ActiveStudents(enrollments);
              const inactiveStudents = InactiveStudents(enrollments);
              this.setState({ activeStudents, inactiveStudents });
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              console.log('No enrollments found for this professor.');
            } else {
              console.log("error getEnrollmentsByCourseId", error);
            }
          });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.professorData !== prevProps.professorData) {
      const { professorData } = this.props;
      if (professorData && professorData.professor) {
        this.setState({
          ...professorData.professor,
          courses: professorData.courses.items || [],
          students: professorData.students || [],
          centers: professorData.study_centers || [],
        });
      }
    }
  }

  filterCoursesByEnrollmentStatus = (courses, status) => {
    courses.filter(course => course.courses_active === status);
    return courses;
  };

  getAllCourses = (courses) => {
    return courses;
  };

  handleCoursesClick = (type) => {
    const { courses } = this.props.professorData;

    let filteredCourses = [];
    switch (type) {
      case 3:
        filteredCourses = courses.items || [];
        break;
      case 5:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses.items || [], true);
        break;
      case 6:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses.items || [], false);
        break;
      default:
        filteredCourses = [];
        break;
    }

    this.setState({ courses: filteredCourses }, () => {
      this.props.history.push({
        pathname: `/courses/p/${type}`,
        state: {
          courses: this.state.courses,
          professor: this.state.professors_id
        }
      });
    });
  }

  handleStudentsClick = (type) => {
    this.setState({ type }, () => {
      this.props.history.push({
        pathname: `/students/${type}`,
        professors_id: this.state.professors_user_id,
        professors_user_id: this.state.professors_user_id
      });
    });
  }

  handleCentersClick = (type) => {
    this.props.history.push(`/centers/${type}`);
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const professorId = this.state.professors_id;

    if (!professorId) {
      console.error('Professor ID is missing');
      return;
    }

    const professorData = {
      professors_id: this.state.professors_id,
      professors_user_id: this.state.professors_user_id,
      professors_first_name: this.state.professors_first_name,
      professors_last_name: this.state.professors_last_name,
      professors_email: this.state.professors_email,
      professors_dni: this.state.professors_dni,
      professors_address: this.state.professors_address,
      professors_city: this.state.professors_city,
      professors_postal: this.state.professors_postal,
      professors_number_card: this.state.professors_number_card,
      professors_exp_date: this.state.professors_exp_date,
      professors_cvc: this.state.professors_cvc,
    };

    updateProfessor(professorData, this.initialState, token)
      .then(response => {
        this.setState({
          ...response.data,
          isButtonEnabled: false,
        });
        this.initialState = { ...this.state };

        if (this.props.updateDashboarProfessorData) {
          this.props.updateDashboarProfessorData(this.state.professors_id);
        }
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isButtonEnabled: true,
    });
  };

  render() {
    const { professorData, showCenterContainer } = this.props;

    if (!professorData) {
      return <p>Cargando datos del profesor...</p>
    }
    const coursesList = professorData.courses.items || [];
    const totalCourses = professorData.courses.total;
    const coursesInactive = coursesList.filter(course => course.courses_active === false).length;
    const coursesActive = totalCourses - coursesInactive;
    const activeStudentsNumber = this.state.activeStudents ? this.state.activeStudents.length : 0;
    const inactiveStudentsNumber = this.state.inactiveStudents ? this.state.inactiveStudents.length : 0;
    const totalStudents = activeStudentsNumber + inactiveStudentsNumber || 0;


    return showCenterContainer ? (
      <CenterEditCreateContainer
        handleCenterCreated={this.props.handleCenterCreated}
        handleEditCenter={this.props.handleEditCenter}
        centerToEdit={this.props.centerToEdit}
        handleBack={this.props.handleBack}
      />
    ) : (

      <div className="dashboard-content-all-dates">
        <ProfessorFormFields
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
        />
        <DashboardDatesProfessorForm
          handleCoursesClick={this.handleCoursesClick}
          handleStudentsClick={this.handleStudentsClick}
          coursesActive={coursesActive}
          coursesInactive={coursesInactive}
          totalCourses={totalCourses}
          activeStudentsNumber={activeStudentsNumber}
          inactiveStudentsNumber={inactiveStudentsNumber}
          totalStudents={totalStudents}
        />
        <div className="dashboard-entity-tables-wrapper">
          <div className="dashboard-table-dates-title">
            <h3>Centros de trabajo</h3>
          </div>
          <ProfessorCentersTable centers={this.state.centers} />
          <div className="dashboard-table-dates-title">
            <h3>Facturas</h3>
            <DashboardBills enrollments={this.state.enrollments} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfessorEditContainer);
