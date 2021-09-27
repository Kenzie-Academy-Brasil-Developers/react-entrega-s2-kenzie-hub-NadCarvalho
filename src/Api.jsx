import axios from "axios";

const api = (token) => axios.create({
  baseURL: "https://kenziehub.herokuapp.com/",
  headers: { 'Authorization': 'Bearer ' + token }
});

export const loginUserRequest = (loginForm) => api().post('sessions', loginForm);
export const createUserRequest = (userForm) => api().post('users', userForm);
export const getUserInfoRequest = (userId) => api().get(`users/${userId}`);
export const addTechUserRequest = (techForm, userToken) => api(userToken).post('users/techs', techForm);
export const removeTechUserRequest = (techId, userToken) => api(userToken).delete(`users/techs/${techId}`);

export default api;