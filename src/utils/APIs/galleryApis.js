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

  

export async function getPhotoskeysbyid(page, limit, bookingId = "", photographerId = "") {
  return withAuthorization(async () => {
    const response = await axiosInstance.get(
      `/api/users/datalinks?page=${page}&limit=${limit}&bookingId=${bookingId}&photographerId=${photographerId}`
    );
    return response;
  });
}




export async function getImagesUsingKeys(bookingId, key) {
  return withAuthorization(async () => {
    const response = await axiosInstance.get(
      `/api/users/stream/${bookingId}/*${key}`,
      {
        responseType: "blob",
      }
    );

    const blobUrl = URL.createObjectURL(response.data);
    return blobUrl;
  });
}


// new api
export async function getAllGalleryImages(page, limit, bookingId = "") {
  return withAuthorization(async () => {
    const response = await axiosInstance.get(
      `/api/users/getArrayImages/${bookingId}`,
      {
        params: {
          page,
          limit
        }
      }
    );
    return response;
  });
}

export async function downloadFullZip(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/users/downloadZip",
      payload,
      {
        responseType: "blob",
      }
    );
    return response;
  });
}

export async function downloadSelectedImages(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/users/downloadZiponFourtyPlus",
      payload,
      {
        responseType: "blob",
      }
    );
    return response;
  });
}

export async function downloadSingleImage(payload) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/users/downloadSingleFile",
      payload
    );
    return response;
  });
}

// /api/photographers/cloud-plans
export async function getUnlockGalleryImagesPlans() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get(
      `/api/users/cloud-plans`,
      {
        params: {
          // page,
          // limit
        }
      }
    );
    return response;
  });
}

