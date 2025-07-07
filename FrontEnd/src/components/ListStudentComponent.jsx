import React, { useEffect, useState } from 'react';
import { deleteStudent, listStudents } from '../services/StudentServices';
import { useNavigate } from 'react-router-dom';

const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudent();
    }, []); // Added [] to prevent infinite loop

    function getStudent() {
        listStudents()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const navigator = useNavigate();

    function addNewStudent() {
        navigator("/add-student");
    }

    function updateStudent(id) {
        navigator(`/edit-student/${id}`);
    }

    function removeStudent(id) {
        deleteStudent(id)
            .then(() => {
                getStudent();
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4 fw-bold text-primary'>📋 Student List</h2>
            <div className='d-flex justify-content-end mb-3'>
                <button
                    type='button'
                    className='btn btn-outline-primary fw-semibold shadow-sm'
                    onClick={addNewStudent}
                >
                    ➕ Add Student
                </button>
            </div>

            <div className='table-responsive shadow rounded'>
                <table className='table table-hover table-bordered align-middle'>
                    <thead className='table-dark text-center'>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email ID</th>
                            <th>Department</th>
                            <th>Course Fee</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.department}</td>
                                    <td>₹{student.courseFee}</td>
                                    <td>
                                        <button
                                            className='btn btn-sm btn-outline-info fw-medium'
                                            onClick={() => updateStudent(student.id)}
                                        >
                                            ✏️ Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-sm btn-outline-danger fw-medium'
                                            onClick={() => removeStudent(student.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className='text-muted text-center p-4'>
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListStudentComponent;
