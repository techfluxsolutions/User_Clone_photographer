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


export async function postSubscribers(data) {
  return withAuthorization(async () => {
  const response = await axiosInstance.post("/api/users/subscribe", data);
  return response;
  });
}

