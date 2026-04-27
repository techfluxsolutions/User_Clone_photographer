import { authorizeMe, axiosInstance } from "./commonHeadApiLogic";


const withAuthorization = async (apiFunction, ...args) => {
  try {
    // ensure header is set (authorizeMe returns token or null)
    await authorizeMe();
    return await apiFunction(...args);
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};



export async function postContactUs(payload) {
  return withAuthorization(async () => {
    return axiosInstance.post(`/api/users/contact-us`, payload);
  });
}


export async function postJoinUs(payload) {
  return withAuthorization(async () => {
    return axiosInstance.post(`/api/users/partner-registration`, payload);
  });
}




