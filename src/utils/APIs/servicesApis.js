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

export async function getAllServices() {
  return withAuthorization(async () => {
  const response = await axiosInstance.get("api/users/servicename");
  return response;
  });
}

export async function getServiceById(serviceId) {
  return withAuthorization(async () => {
    const response = await axiosInstance.get(
      `/api/users/services/${serviceId}`
    );
    return response;
  });
}
