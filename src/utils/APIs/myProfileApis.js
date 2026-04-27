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



export async function GetProfile() {
  return withAuthorization(async () => {
  const response = await axiosInstance.get("/api/users/me");
  return response;
  });
}




export async function editProfile(formData) {
  return withAuthorization(async () => {
    const response = await axiosInstance.put(
      "/api/users/me",
      formData
    );
    return response;
  });
}



// export async function GetProfile(params) {
//   const response = await axiosInstanceNoAuth.get("/api/users/me", {
//     params,
//   });
//   return response;
// }
