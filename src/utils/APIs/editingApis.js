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
 * Fetch editing plans.
 * If numberOfVideos is provided, fetches specific plans for that quantity.
 * If not provided, fetches all available plans summary.
 */
export async function getEditingPlans(numberOfVideos) {
  return withAuthorization(async () => {
    const url = numberOfVideos 
      ? `/api/users/getplanBynumberOfVideos/${numberOfVideos}`
      : "/api/users/getplanBynumberOfVideos/";
    const response = await axiosInstance.get(url);
    return response;
  });
}

/**
 * Add an editing plan to the cart.
 * @param {string} editingPlanId - The ID of the editing plan.
 * @param {number} quantity - The quantity to add.
 */
export async function addToCart(editingPlanId, quantity = 1) {
  return withAuthorization(async () => {
    const url = "/api/users/cart/add";
    const payload = { editingPlanId, quantity };
    const response = await axiosInstance.post(url, payload);
    return response;
  });
}

/**
 * Fetch the user's current cart.
 */
export async function getMyCart() {
  return withAuthorization(async () => {
    const url = "/api/users/get-mycart";
    const response = await axiosInstance.get(url);
    return response;
  });
}

/**
 * Update the quantity of an item in the cart.
 * @param {string} editingPlanId - The ID of the editing plan.
 * @param {number} quantity - The quantity to adjust (usually 1).
 * @param {string} action - 'increase' or 'decrease'.
 */
export async function updateCartQuantity(editingPlanId, quantity, action) {
  console.log("API CALL - updateCartQuantity:", { editingPlanId, quantity, action });
  return withAuthorization(async () => {
    const url = "/api/users/cart/updateQuantity";
    const payload = { editingPlanId, quantity, action };
    const response = await axiosInstance.post(url, payload);
    return response;
  });
}
