import axios from "axios";
const REST_API_BASE_URL_GET = "http://localhost:8080/get";
const REST_API_BASE_URL_POST = "http://localhost:8080/post";
const REST_API_BASE_URL_PUT = "http://localhost:8080/put";
const REST_API_BASE_URL_DELETE = "http://localhost:8080/delete"
export const listStudents = () => axios.get(REST_API_BASE_URL_GET);
export const createStudent = (student) => axios.post(REST_API_BASE_URL_POST ,student);
export const getStudent = (studentId) => axios.get(REST_API_BASE_URL_GET+'/'+studentId)
export const updateStudent = (studentId, student) => axios.put(REST_API_BASE_URL_PUT+'/'+studentId,student);
export const deleteStudent = (studentId) => axios.delete(REST_API_BASE_URL_DELETE+'/'+studentId);