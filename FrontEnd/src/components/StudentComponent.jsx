import React, { useEffect, useState } from 'react';
import { createStudent, getStudent, updateStudent } from '../services/StudentServices';
import { useNavigate, useParams } from 'react-router-dom';

const StudentComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [courseFee, setCourseFee] = useState('');
    const [error, setError] = useState({ firstName: '', lastName: '', email: '', department: '', courseFee: '' });

    const navigator = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getStudent(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartment(response.data.department);
                setCourseFee(response.data.courseFee);
            });
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const errorCpy = { ...error };

        if (firstName.trim()) errorCpy.firstName = '';
        else {
            errorCpy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) errorCpy.lastName = '';
        else {
            errorCpy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) errorCpy.email = '';
        else {
            errorCpy.email = 'Email is required';
            valid = false;
        }

        if (department.trim()) errorCpy.department = '';
        else {
            errorCpy.department = 'Department Name is required';
            valid = false;
        }

        if (String(courseFee).trim()) errorCpy.courseFee = '';
        else {
            errorCpy.courseFee = 'Course Fee is required';
            valid = false;
        }

        setError(errorCpy);
        return valid;
    }

    function saveOrUpdateStudent(e) {
        e.preventDefault();
        if (validateForm()) {
            const student = { firstName, lastName, email, department, courseFee };
            if (id) {
                updateStudent(id, student)
                    .then(() => navigator('/student'))
                    .catch((error) => console.log(error));
            } else {
                createStudent(student)
                    .then(() => navigator('/student'))
                    .catch((error) => console.log(error));
            }
        }
    }

    const pageTitle = () => (
        <h3 className="text-center fw-bold text-primary mb-4">
            {id ? '✏️ Update Student' : '➕ Add Student'}
        </h3>
    );

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4 p-4">
                        {pageTitle()}
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label fw-semibold">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label fw-semibold">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label fw-semibold">Email ID</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error.email && <div className="invalid-feedback">{error.email}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label fw-semibold">Department</label>
                                <input
                                    type="text"
                                    placeholder="Enter Department"
                                    className={`form-control ${error.department ? 'is-invalid' : ''}`}
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                {error.department && <div className="invalid-feedback">{error.department}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label fw-semibold">Course Fee (₹)</label>
                                <input
                                    type="number"
                                    placeholder="Enter Course Fee"
                                    className={`form-control ${error.courseFee ? 'is-invalid' : ''}`}
                                    value={courseFee}
                                    onChange={(e) => setCourseFee(e.target.value)}
                                />
                                {error.courseFee && <div className="invalid-feedback">{error.courseFee}</div>}
                            </div>

                            <div className="text-center">
                                <button className="btn btn-primary w-100 fw-bold" onClick={saveOrUpdateStudent}>
                                    {id ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentComponent;
