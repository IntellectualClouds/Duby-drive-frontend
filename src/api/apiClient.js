import { create } from "apisauce";
const baseURL = process.env.REACT_APP_BASE_URL;
const apiClient = create({
  baseURL: baseURL,
});
const authToken = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
if (authToken) apiClient.setHeader("authorization", `Bearer ${authToken}`);




function setAuthToken(token) {
  apiClient.setHeader("authorization", `Bearer ${token}`);
}





export {  setAuthToken };
export default apiClient