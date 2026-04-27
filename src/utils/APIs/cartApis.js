import { authorizeMe, axiosInstance } from "./commonHeadApiLogic";

const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe();
    return await apiFunction(...args);
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

/**
 * Get the current user's active cart
 */
export async function getMyCart() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get("/api/users/cart/my-cart");
    return response;
  });
}

/**
 * Add an item to the cart
 * @param {Object} data { editingPlanId, quantity, packageId, quantityId, title, price }
 */
export async function addToCart(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/api/users/cart/add", data);
    return response;
  });
}

/**
 * Update quantity of an item in the cart
 * @param {Object} data { editingPlanId, planName, action: 'increase' | 'decrease' }
 */
export async function updateQuantity(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/api/users/cart/updateQuantity", data);
    return response;
  });
}

/**
 * Apply a coupon code to the cart
 * @param {string} couponCode 
 */
export async function applyCoupon(couponCode) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/api/users/cart/apply-coupon", { couponCode });
    return response;
  });
}

/**
 * Update the tip amount
 * @param {number} tip 
 */
export async function updateTip(tip) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/api/users/cart/update-tip", { tip });
    return response;
  });
}

/**
 * Update booking details (address, instructions, etc.)
 * @param {Object} details { date, timeSlot, address, specialInstructions }
 */
export async function updateBookingDetails(details) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/api/users/cart/update-booking-details", details);
    return response;
  });
}

/**
 * Get all editing plans from the database
 */
export async function getEditingPlans() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get("/api/users/editing-plans");
    return response;
  });
}

