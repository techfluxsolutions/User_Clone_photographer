// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import "./Chats.css";
// import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";
// import { updateQuoteStatus } from "../../../../../utils/APIs/bookingApis";
// import { getChatMessages, createChatConversation, sendMessageApi } from "../../../../../utils/APIs/chatApis";
// import { getAccessToken } from "../../../../../utils/APIs/commonHeadApiLogic";
// import SocketService from "../../../../../utils/socketService";
// import Loader from "../../../../../Template/Loader/Loader";
// import { VscSend } from "react-icons/vsc";

// const Chats = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { quoteId: paramQuoteId } = useParams();
//   const chatEndRef = useRef(null);
//   const [messages, setMessages] = useState([]);

//   // Resolve quoteId: URL Param -> Navigation State -> Session Storage (for refresh)
//   const [quoteId, setQuoteId] = useState(() => {
//     return paramQuoteId || location.state?.quoteId || localStorage.getItem("activeChatQuoteId");
//   });

//   // Persist quoteId to localStorage when it changes
//   useEffect(() => {
//     if (quoteId) {
//       localStorage.setItem("activeChatQuoteId", quoteId);
//     }
//   }, [quoteId]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState(null); // To determine 'right' or 'left' alignment
//   const [isTyping, setIsTyping] = useState(false);
//   const [typerName, setTyperName] = useState("");

//   /* =========================
//      INIT & SOCKET SETUP
//   ========================= */
//   useEffect(() => {
//     let isMounted = true; // Track if component is still mounted

//     if (!quoteId) {
//       navigate("/myProfile");
//       return;
//     }

//     // 1. Get User ID (Decoding token or from localStorage if you store user details there)
//     const token = getAccessToken();
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         setCurrentUserId(payload.id);
//       } catch (e) { console.error("Token decode error", e) }
//     }

//     // 2. Connect Socket (only if not already connected)
//     SocketService.connect();

//     // Small delay to ensure connection is established before joining
//     const joinTimeout = setTimeout(() => {
//       if (isMounted) {
//         SocketService.joinBookingChat(quoteId);
//       }
//     }, 100);

//     // 3. Initialize/Verify Conversation and Fetch History
//     const initializeChat = async () => {
//       try {
//         // Ensure conversation exists for this quoteId with admins
//         await createChatConversation(quoteId);
//         if (isMounted) {
//           fetchHistory();
//         }
//       } catch (err) {
//         console.error("Failed to initialize chat", err);
//       }
//     };

//     initializeChat();

//     // 4. Listeners
//     SocketService.onReceiveMessage((newMessage) => {
//       if (isMounted) {
//         setMessages((prev) => {
//           const exists = prev.some((m) => m._id === newMessage._id);
//           if (exists) return prev;
//           return [...prev, newMessage];
//         });
//       }
//     });

//     SocketService.onTyping(({ userId }) => {
//       if (isMounted) {
//         setIsTyping(true);
//       }
//     });

//     SocketService.onStopTyping(() => {
//       if (isMounted) {
//         setIsTyping(false);
//       }
//     });

//     return () => {
//       isMounted = false;
//       clearTimeout(joinTimeout);
//       // Don't disconnect on unmount - let the socket persist
//       // SocketService.disconnect();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [quoteId, navigate]);

//   const fetchHistory = async () => {
//     try {
//       const res = await getChatMessages(quoteId, { page: 1, limit: 100 });
//       if (res.data.success) {
//         setMessages(res.data.data); // API returns latest first, we reverse for chat order
//       }
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };

//   /* =========================
//      AUTO SCROLL
//   ========================= */
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);


//   /* =========================
//      SEND MESSAGE
//   ========================= */
//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const messageText = input;
//     setInput(""); // Clear input early

//     // Optimistic UI update
//     const tempId = Date.now().toString();
//     const tempMessage = {
//       _id: tempId,
//       message: messageText,
//       senderId: currentUserId,
//       createdAt: new Date().toISOString(),
//       isTemp: true,
//     };
//     setMessages((prev) => [...prev, tempMessage]);

//     try {
//       // Call REST API to send message
//       const res = await sendMessageApi(quoteId, messageText);

//       if (res.data.success) {
//         // Replace temp message with actual message from server
//         setMessages((prev) =>
//           prev.map((m) => (m._id === tempId ? res.data.data : m))
//         );
//         SocketService.sendStopTyping(quoteId);
//       }
//     } catch (err) {
//       console.error("Failed to send message", err);
//       // Remove temp message if failed
//       setMessages((prev) => prev.filter((m) => m._id !== tempId));
//     }
//   };

//   const handleTyping = (e) => {
//     setInput(e.target.value);
//     if (e.target.value.length > 0) {
//       SocketService.sendTyping(quoteId);
//     } else {
//       SocketService.sendStopTyping(quoteId);
//     }
//   };

//   /* =========================
//      PAYMENT ACTION
//   ========================= */
//   const handleConfirmPayment = async () => {
//     try {
//       setLoading(true);
//       await updateQuoteStatus(quoteId, {
//         quoteStatus: "upcommingBookings",
//       });
//       setShowModal(true);
//     } catch (error) {
//       console.error("Payment update failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/myProfile");
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="chat-wrapper">
//       <div className="chat-header">
//         <div className="chat-header-left">
//           <div className="brand">
//             <img
//                   src="./asset/Logo/WhiteLogo.png" // Placeholder or msg.senderId.avatar
//                   alt="logo"
//                   className="white-logo"
//                 /> 
//           </div>
//           <div className="admin-info">
//             <p className="admin-name mb-0">Admin</p>
//             <span className="admin-status">Online</span>
//           </div>
//         </div>
//         <div className="menu">⋮</div>
//       </div>

//       <div className="chat-body">
//         {messages.map((msg, index) => {
//           const isMyMessage = msg.senderId === currentUserId || (msg.senderId._id === currentUserId);
//           // Handle populated senderId object or raw ID string

//           return (
//             <div
//               key={msg._id || index}
//               className={`message-row ${isMyMessage ? "right" : "left"}`}
//             >
//               {!isMyMessage && (
//                 <img
//                   src="https://i.pravatar.cc/40?img=12" // Placeholder or msg.senderId.avatar
//                   alt="avatar"
//                   className="avatar"
//                 />
//               )}

//               <div className={`message-bubble ${isMyMessage ? "dark" : "light"}`}>
//                 {msg.message}
//                 <span className="time">
//                   {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//               </div>
//             </div>
//           );
//         })}

//         {isTyping && (
//           <div className="message-row left">
//             <div className="typing-indicator">Typing...</div>
//           </div>
//         )}

//         {/* Payment box (Optional logic: hide if already paid?) */}
//         <div className="payment-box">
//           <p className="payment-text">
//             Click below to proceed your payment.
//           </p>
//           <button
//             className="confirm-pay-btn"
//             onClick={handleConfirmPayment}
//           >
//             Pay Now
//           </button>
//         </div>

//         <div ref={chatEndRef} />
//       </div>

//       <div className="chat-input">
//         <div className="chat-input-inner">
//           <input
//             type="text"
//             placeholder="Start Typing..."
//             value={input}
//             onChange={handleTyping}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button
//             className={`send-btn ${input.trim() ? "active" : ""}`}
//             onClick={handleSend}
//             disabled={!input.trim()}
//           >
//             <VscSend />
//           </button>
//         </div>
//       </div>

//       <CommonMessageModal
//         show={showModal}
//         onClose={handleModalClose}
//         title="Payment Successful"
//         message="Your payment has been completed successfully."
//         buttonText="Okay"
//       />
//     </div>
//   );
// };

// export default Chats;




// proper working bhagya code

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Chats.css";
import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";
import { updateQuoteStatus } from "../../../../../utils/APIs/bookingApis";
import {
  getChatMessages,
  createChatConversation,
  sendMessageApi,
} from "../../../../../utils/APIs/chatApis";
import { getAccessToken } from "../../../../../utils/APIs/commonHeadApiLogic";
import SocketService from "../../../../../utils/socketService";
import Loader from "../../../../../Template/Loader/Loader";
import { VscSend } from "react-icons/vsc";

const Chats = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quoteId: paramQuoteId } = useParams();
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [showPaymentActions, setShowPaymentActions] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);




  useEffect(() => {
  const id = localStorage.getItem("client_id");
  if (id) setCurrentUserId(String(id));
}, []);


  const [quoteId, setQuoteId] = useState(() => {
    return (
      paramQuoteId ||
      location.state?.quoteId ||
      localStorage.getItem("activeChatQuoteId")
    );
  });

  /* =========================
     Persist quoteId
  ========================= */
  useEffect(() => {
    if (quoteId) {
      localStorage.setItem("activeChatQuoteId", quoteId);
    }
  }, [quoteId]);

  /* =========================
     INIT & SOCKET SETUP
  ========================= */
  useEffect(() => {
    let isMounted = true;

    if (!quoteId) {
      navigate("/myProfile");
      return;
    }

    const token = getAccessToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // setCurrentUserId(payload._id || payload.id);
        	
          // setCurrentUserId(localStorage.getItem("client_id"));
          
          setCurrentUserId(localStorage.getItem("client_id"))

        
      } catch (e) {
        console.error("Token decode error", e);
      }
    }

    SocketService.connect();

    const joinTimeout = setTimeout(() => {
      if (isMounted) {
        SocketService.joinBookingChat(quoteId);
      }
    }, 100);

    const initializeChat = async () => {
      try {
        await createChatConversation(quoteId);
        if (isMounted) fetchHistory();
      } catch (err) {
        console.error("Failed to initialize chat", err);
      }
    };

    initializeChat();

    SocketService.onReceiveMessage((newMessage) => {
      if (isMounted) {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === newMessage._id);
          if (exists) return prev;
          return [...prev, newMessage];
        });
      }
    });

    SocketService.onTyping(() => {
      if (isMounted) setIsTyping(true);
    });

    SocketService.onStopTyping(() => {
      if (isMounted) setIsTyping(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(joinTimeout);
    };
  }, [quoteId, navigate]);

  /* =========================
     FETCH HISTORY
  ========================= */
  const fetchHistory = async () => {
    try {
      const res = await getChatMessages(quoteId, { page: 1, limit: 100 });
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const handleSend = async () => {
    if (!input.trim()) return;

    const messageText = input;
    setInput("");

    const tempId = Date.now().toString();

    const tempMessage = {
      _id: tempId,
      message: messageText,
      senderId: currentUserId,
      createdAt: new Date().toISOString(),
      isMine: true, // ✅ FIX: ownership locked
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      const res = await sendMessageApi(quoteId, messageText);
      if (res.data.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m._id === tempId
              ? { ...res.data.data, isMine: true }
              : m
          )
        );
        SocketService.sendStopTyping(quoteId);
      }
    } catch (err) {
      console.error("Failed to send message", err);
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      SocketService.sendTyping(quoteId);
    } else {
      SocketService.sendStopTyping(quoteId);
    }
  };

  /* =========================
     PAYMENT
  ========================= */
  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      await updateQuoteStatus(quoteId, {
        quoteStatus: "upcommingBookings",
      });
      setShowModal(true);
    } catch (error) {
      console.error("Payment update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/myProfile");
  };

  if (loading) return <Loader />;

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="brand">
            <img
              src="./asset/Logo/WhiteLogo.png"
              alt="logo"
              className="white-logo"
            />
          </div>
          <div className="admin-info">
            <p className="admin-name mb-0">Admin</p>
            <span className="admin-status">Online</span>
          </div>
        </div>
        <div className="menu">⋮</div>
      </div>

      <div className="chat-body">
        {/* {messages.map((msg, index) => {
          const senderId =
            msg.senderId && typeof msg.senderId === "object"
              ? msg?.senderId?._id
              : msg.senderId;

            
               setCurrentUserId(localStorage.getItem("client_id"))

              //  if(senderId){
              //   senderId === currentUserId
              //  }
          const isMyMessage =
            msg.isMine === true || senderId === currentUserId;

          return (
            <div
              key={msg._id || index}
              className={`message-row ${isMyMessage ? "right" : "left"}`}
            >
              {!isMyMessage && (
                <img
                  src="./asset/Logo/brownLogo.png"
                  alt="avatar"
                  className="avatar"
                />
              )}

              <div
                className={`message-bubble ${
                  isMyMessage ? "dark" : "light"
                }`}
              >
                {msg.message}
                <span className="time">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })} */}

        {messages.map((msg, index) => {
  const senderId =
    msg.senderId && typeof msg.senderId === "object"
      ? msg.senderId._id
      : msg.senderId;

  const isMyMessage = senderId === currentUserId;

    console.log("senderId",senderId)
     console.log("currentUserId",localStorage.getItem("client_id"))
     console.log("isMyMessage",isMyMessage)

   

  return (
    <div
      key={msg._id || index}
      className={`message-row ${isMyMessage ? "right" : "left"}`}
    >
      {!isMyMessage && (
        <img
          src="./asset/Logo/brownLogo.png"
          alt="avatar"
          className="avatar"
        />
      )}

      <div
        className={`message-bubble ${
          isMyMessage ? "dark" : "light"
        }`}
      >
        {msg.message}
        <span className="time">
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
})}


        {isTyping && (
          <div className="message-row left">
            <div className="typing-indicator">Typing...</div>
          </div>
        )}

        <div className="chat-payment-box">
          <p className="chat-payment-title">Wedding Photography Service</p>
          <p className="chat-payment-subtitle">
            Full day coverage · Bangalore
          </p>

          <label className="chat-payment-radio-option">
            <input
              type="radio"
              name="chat-payment-price"
              checked={selectedPrice === 500}
              onChange={() => {
                setSelectedPrice(500);
                setShowPaymentActions(true);
              }}
            />
            <span className="chat-payment-radio-custom" />
            <span className="chat-payment-price-text">₹ 500</span>
          </label>

          {showPaymentActions && (
            <div className="chat-payment-actions">
              <button
                className="chat-payment-accept-btn"
                onClick={handleConfirmPayment}
              >
                Accept
              </button>
              <button
                className="chat-payment-reject-btn"
                onClick={() => {
                  setSelectedPrice(null);
                  setShowPaymentActions(false);
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <div className="chat-input-inner">
          <input
            type="text"
            placeholder="Start Typing..."
            value={input}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className={`send-btn ${input.trim() ? "active" : ""}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <VscSend />
          </button>
        </div>
      </div>

      <CommonMessageModal
        show={showModal}
        onClose={handleModalClose}
        title="Payment Successful"
        message="Your payment has been completed successfully."
        buttonText="Okay"
      />
    </div>
  );
};

export default Chats;



