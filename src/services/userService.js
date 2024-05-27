import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

const getAllUser = (inputId) => {
    return axios.get('/api/get-all-users?id=ALL');
}

const createNewUserService = (data) => {
    console.log('check data from service :', data)
    return axios.post('/api/signup', data )
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {data: {id: userId}});
}

const editUserService = (inputData)=>{
    return axios.put('/api/edit-user', inputData);
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?type=${limit}`);
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data )
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
export { handleLoginApi, getAllUser, 
    createNewUserService, deleteUserService ,
    editUserService,getAllCodeService, getTopDoctorHomeService,getAllDoctors
    ,saveDetailDoctorService,getDetailInforDoctor};