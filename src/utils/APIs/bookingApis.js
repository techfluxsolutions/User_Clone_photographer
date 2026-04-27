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



export async function postPersonalizedBudget(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/users/quotes",
      data, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  });
}

export async function getAllQuotes() {
  return withAuthorization(async () => {
  const response = await axiosInstance.get("/api/users/quotes");
  return response;
  });
}

// get Upcoming booking
export async function getAllUpcomingBookings() {
  return withAuthorization(async () => {
  const response = await axiosInstance.get("/api/users/bookings");
  return response;
  });
}

// get one Upcoming booking by id
export async function getOneUpcomingBookingById(bookingId) {
  return withAuthorization(async () => {
    return axiosInstance.get(`/api/users/bookings/${bookingId}`);
  });
}



export async function getAllPreviousBookings() {
  return withAuthorization(async () => {
  const response = await axiosInstance.get("api/users/getpreviousbookings");
  return response;
  });
}

export async function updateQuoteStatus(quoteId, params) {
  return withAuthorization(async () => {
    return axiosInstance.put(
      `/api/users/quotes/${quoteId}`,
      params
    );
  });
}


export async function getAllIncompleteBookings() {
  return withAuthorization(async () => {
  const response = await axiosInstance.get("/api/users/incompleteBookings");
  return response;
  });
}

export async function createBookingUsingPrice(Data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/api/users/bookings",Data);
    return response;
  });
}


export async function getBookingPrice(payload) {
  return withAuthorization(async () => {
    return axiosInstance.get(
      "/api/users/serviceprice",
      {
        params: payload
      }
    );
  });
}




// put api for payment
export async function putPaymentBooking(bookingId, payload) {
  return withAuthorization(async () => {
    return axiosInstance.put(
      `/api/users/updatePaymentStatusBooking/${bookingId}`,
      payload
    );
  });
}



// cancel booking
export async function putCancelBooking(bookingId, payload) {
  return withAuthorization(async () => {
    return axiosInstance.put(
      `api/users/servicebookings/${bookingId}`,
      payload
    );
  });
}

// Raise a Ticket
export async function createRaiseTicket(Data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/api/users/raiseTicket",Data);
    return response;
  });
}


// Get Raise a Ticket (Previous Tickets)
export async function getRaiseTicket(bookingId) {
  return withAuthorization(async () => {
    const response = await axiosInstance.get(
      `/api/users/getPreviousTickets/${bookingId}`
    );
    return response;
  });
}



// Post Rating & Feedbacks
export async function createRatingAndFeedbacks(data) {
  return withAuthorization(async () => {
    return axiosInstance.post(
      "/api/users/reviews",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
}

// get rating and feedback using booking id
export async function getRatingAndFeedbacks(bookingId) {
  return withAuthorization(async () => {
    return axiosInstance.get(
      `/api/users/reviews/${bookingId}`
    );
  });
}

// download invoice
export const downloadInvoiceAPI = (bookingId) => {
  return withAuthorization(() =>
    axiosInstance.get(`/api/admins/invoices/${bookingId}`, {
      responseType: "blob", // REQUIRED for PDF download
    })
  );
};


// export async function GetProfile(params) {
//   const response = await axiosInstanceNoAuth.get("/api/users/me", {
//     params,
//   });
//   return response;
// }


