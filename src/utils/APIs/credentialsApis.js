import { authorizeMe, axiosInstance, axiosInstanceNoAuth } from "./commonHeadApiLogic";


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

// export async function LoginAPI(data) {
//   return withAuthorization(async () => {
//     const response = await axiosInstanceNoAuth.post("/user/user_login_check", data);
//     return response;
//   });
// }


export async function LoginAPI(data) {
  // return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/api/auth/login", data, {
  })
    return response;
  // });
}

export async function VerifyOTP(data) {
  // return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/api/auth/verify", data, {
  })
    return response;
  // });
}

// export async function forgotPasswordAPI(data) {
//   return withAuthorization(async () => {
//     const response = await axiosInstanceNoAuth.post("/user/user_Forgot_Password_check_api", data);
//     return response;
//   });
// }

export async function createNewAccountAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/create_an_account", data);
    return response;
  });
}

export async function updateProfileAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/user/account_update_", data);
    return response;
  });
}

export async function updatePasswordAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/account_update_pass_reset", data);
    return response;
  });
}



export async function getTokenAPI(token) {

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axiosInstanceNoAuth.post(
    "/api/auth/getToken",
    {
      token: token,
    }
  );

  return response;
}

export async function dashboardDataAPI() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get("/user/get_dashboard_data_api");
    return response;
  });
}


