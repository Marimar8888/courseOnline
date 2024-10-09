import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import DashboardBills from '../dashboard/dashboard-bills';
import { getEnrollmentsByProfessorId } from "../services/enrollment";
import { ActiveStudents, InactiveStudents } from "../services/student";
import ProfessorCentersTable from './professor-centers-table';
import ProfessorFormFields from '../forms/professor-form-fields';
import DashboardDatesProfessor from '../forms/dashboard-dates-professor';

class ProfessorEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professors_id: "",
      professors_user_id: "",
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
            this.setState({ enrollments });

            const activeStudents = ActiveStudents(enrollments);
            const inactiveStudents = InactiveStudents(enrollments);

            this.setState({ activeStudents, inactiveStudents });
          })
          .catch(error => {
            console.log("error getEnrollmentsByCourseId", error);
          })
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
    const formData = this.buildForm();

    if (!professorId) {
      console.error('Professor ID is missing');
      return;
    }

    axios
      ({
        method: "patch",
        url: `${API_URL}/professor/${professorId}`,
        data: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.setState({
          ...response.data,
          isButtonEnabled: false,
        });

        this.initialState = { ...this.state };

        if (this.props.updateDashboarProfessorData) {
          this.props.updateDashboarProfessorData(this.state.professors_id);
        }
      })
      .catch(error => {
        console.log("error handleSubmit", error);
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isButtonEnabled: true,
    });
  };

  buildForm() {
    let professorFormData = new FormData();

    const fields = [
      "professors_first_name",
      "professors_last_name",
      "professors_email",
      "professors_dni",
      "professors_address",
      "professors_city",
      "professors_postal",
      "professors_number_card",
      "professors_exp_date",
      "professors_cvc"
    ];

    fields.forEach(field => {
      if (this.state[field] !== this.initialState[field]) {
        professorFormData.append(field, this.state[field]);
      }
    });

    return professorFormData;
  }

  render() {
    const { professorData } = this.props;

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

    return (
      <div className="dashboard-content-professor">
        <ProfessorFormFields
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
        />
        <div className="dashboard-dates">
          <div>
           <DashboardDatesProfessor
            handleCoursesClick={this.handleCoursesClick}
            handleStudentsClick={this.handleStudentsClick}
            coursesActive = {coursesActive}
            coursesInactive = {coursesInactive}
            totalCourses = {totalCourses}
            activeStudentsNumber = {activeStudentsNumber}
            inactiveStudentsNumber = {inactiveStudentsNumber}
            totalStudents = {totalStudents}
           />
          </div>
          <div className="dashboard-courses">
            <div className="dashboard-dates-title">
              <h3>Centros de trabajo</h3>
            </div>
            <ProfessorCentersTable centers={this.state.centers} />
          </div>
          <div className="dashboard-bills">
            <h3>Facturas</h3>
            <DashboardBills enrollments={this.state.enrollments} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfessorEditContainer);
