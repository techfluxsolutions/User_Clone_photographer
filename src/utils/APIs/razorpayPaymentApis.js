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

// ✅ Create Razorpay Order
// Create Razorpay Order
export async function createRazorpayOrder(payload) {
  return withAuthorization(async () => {
    return axiosInstance.post(
      "/api/users/payment/create-order",
      payload
    );
  });
}

// Verify Razorpay Payment
export async function verifyRazorpayPayment(payload) {
  return withAuthorization(async () => {
    return axiosInstance.post(
      "/api/users/payment/verify",
      payload
    );
  });
}

// createRazorpayImagePlanOrder
export async function createRazorpayImagePlanOrder(payload) {
  return withAuthorization(async () => {
    return axiosInstance.post(
      "/api/users/cloud-plans/create-order",
      payload
    );
  });
}

export async function verifyRazorpaymagePlanPayment(payload) {
  return withAuthorization(async () => {
    return axiosInstance.post(
      "/api/users/cloud-plans/verify",
      payload
    );
  });
}