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



// get testimonials
export async function getLandingPageTestimonial() {
  return withAuthorization(async () => {
    return axiosInstance.get(`/api/users/getThreeRatings`);
  });
}




