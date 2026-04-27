import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Chats.css";
import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";
import { getChatMessages, postConvertQuoteIntoBooking, sendMessageApi } from "../../../../../utils/APIs/chatApis";
import SocketService from "../../../../../utils/socketService";
import Loader from "../../../../../Template/Loader/Loader";
import { VscSend } from "react-icons/vsc";
import { getAccessToken } from "../../../../../utils/APIs/commonHeadApiLogic";
import PinnedPaymentCard from "./PinnedPaymentCard/PinnedPayentCard";
import { TfiArrowCircleLeft } from "react-icons/tfi";

const Chats = ({ bookingId,fromtab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quoteId, bookingId: routeBookingId } = useParams();
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [quotePinnedMessages, setQuotePinnedMessages] = useState(null)
  const [bookingPinnedMessages, setBookingPinnedMessages] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)
  /* =========================
     RESOLVE ACTIVE CHAT ID (BOOKING ID OR QUOTE ID)
  ========================= */
  const activeChatId =
    quoteId ||
    routeBookingId ||
    bookingId ||
    location.state?.quoteId ||
    localStorage.getItem("activeChatId");

  const isBookingChat = !!(routeBookingId || bookingId);

  const handleRejectClick = (msg) => {
    setSelectedMessage(msg)
    setShowRejectModal(true);
  };

  const formatDate = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================
     CURRENT USER
  ========================= */
  useEffect(() => {
    const id = localStorage.getItem("client_id");
    if (id) setCurrentUserId(String(id));

    const token = getAccessToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.id);
      } catch (e) {
        console.error("Token decode error", e);
      }
    }
  }, []);


  /* =========================
     FETCH CHAT HISTORY
  ========================= */
  const fetchHistory = useCallback(async () => {
    try {
      const res = await getChatMessages(activeChatId, { page: 1, limit: 100 });
      if (res.data.success) {
        console.log("PINNED--",)
        if (isBookingChat) {
          setBookingPinnedMessages(res?.data?.pinned);
        } else {
          setQuotePinnedMessages(res?.data?.pinned);
        }
        setMessages(res.data.data);

      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  }, [activeChatId, isBookingChat]);



  useEffect(() => {
    if (!activeChatId) {
      navigate("/myProfile");
      return;
    }

    localStorage.setItem("activeChatId", activeChatId);

    SocketService.connect();
    SocketService.joinBookingChat(activeChatId);

    fetchHistory();

    const onReceiveMessage = (newMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });
    };

    const onTyping = ({ userId }) => {
      if (userId !== currentUserId) setIsTyping(true);
    };

    const onStopTyping = ({ userId }) => {
      if (userId !== currentUserId) setIsTyping(false);
    };

    SocketService.onReceiveMessage(onReceiveMessage);
    SocketService.onTyping(onTyping);
    SocketService.onStopTyping(onStopTyping);

    return () => {
      SocketService.offReceiveMessage();
      SocketService.offTyping();
      SocketService.offStopTyping();
    };
  }, [activeChatId, currentUserId, navigate, fetchHistory]);


  const handleAcceptClick = async (msg) => {
    try {
      setLoading(true);
      const client_id = localStorage.getItem("client_id");
      const payload = {
        clientId: client_id,
        flatOrHouseNo: msg.flatOrHouseNo,
        streetName: msg.streetName,
        city: msg.city,
        state: msg.state,
        postalCode: msg.postalCode,
        totalAmount: msg.budget,
      };

      const res = await postConvertQuoteIntoBooking(msg.quoteId, payload);

      if (res?.data?.success) {

        const bookingId = res?.data?.data?._id;

        navigate("/payment-details", {
          state: {
            serviceCost: msg.budget,
            bookingId: bookingId,
          },
        });
      }

    } catch (error) {
      console.error("Convert quote failed", error);
    } finally {
      setLoading(false);
    }
  };


  /* =========================
     SEND MESSAGE
  ========================= */
  const handleSend = () => {
    if (!input.trim()) return;

    sendMessageApi(
      activeChatId,
      input,
      "text"
    );

    console.log("call end")
    setInput("");
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      SocketService.sendTyping(activeChatId);
    } else {
      SocketService.sendStopTyping(activeChatId);
    }
  };

  useEffect(() => {
  if (chatEndRef.current) {
    chatEndRef.current.scrollIntoView({
      behavior: "smooth"
    });
  }
}, [messages, isTyping]);

const handleBack = () => {
  navigate(-1);
};

  if (loading) return <Loader />;

  return (
    <div className="chat-wrapper">
       {(fromtab !== true)&&(<div className="booking-header">
            <button className="back-btn" onClick={handleBack}>
              {/* ← Back */}
               <TfiArrowCircleLeft /> 
            </button>
          </div>)}
      <div className="chat-header">
        <div className="chat-header-left">
          <img src="/asset/Logo/WhiteLogo.png" alt="logo" />
          <div>
            <p>Admin</p>
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="chat-container">

        <PinnedPaymentCard
          pinned={isBookingChat ? bookingPinnedMessages : quotePinnedMessages}
          type={isBookingChat ? "booking" : "quote"}
          formatDate={formatDate}
        />

      </div>
      <div className="chat-body">
        {messages.map((msg, index) => {
          const senderId =
            msg.senderId && typeof msg.senderId === "object"
              ? msg.senderId._id
              : msg.senderId;

          const isMe = senderId === currentUserId;

          return (
            <div
              key={msg._id || index}
              className={`message-row ${isMe ? "right" : "left"}`}
            >
              {!isMe && (
                <div className="chat-avatar">
                  <img
                    src="/asset/Logo/brownLogo.png"
                    alt="Admin"
                  />
                </div>
              )}
              {/* ================= TEXT MESSAGE ================= */}
              {msg.messageType === "text" && (
                <div className={`message-bubble ${isMe ? "dark" : "light"}`}>
                  {msg.message}
                  <span className="time">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              )}

              {/* ================= PAYMENT CARD ================= */}
              {msg.messageType === "paymentCard" && (
                <div className="text-content">
                  <div className={`payment-card 
                    ${isMe ? "my-card" : "their-card"} 
                    ${msg?.isRejected ? "card-disabled" : ""}
                  `}>

                    {/* Header */}
                    <div className="payment-card-header">
                      <div className="header-content">
                        <div className="brand-section">
                          <div className="brand-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
                                fill="currentColor" opacity="0.9" />
                            </svg>
                          </div>
                          <div className="brand-text">
                            <span className="card-subtitle-chat">Event Proposal</span>
                            <span className="card-title-chat">Budget Summary</span>
                          </div>
                        </div>
                        <div className="amount-section-chat">
                          <div className="amount-wrapper-chat">
                            <span className="currency">₹</span>
                            <span className="card-amount">{msg.budget}</span>
                          </div>
                          <span className="amount-label-chat">Total Budget</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Separator */}
                    <div className="card-separator">
                      <div className="separator-line"></div>
                      <div className="separator-dot"></div>
                    </div>

                    {/* Body */}
                    <div className="payment-card-body">
                      {/* Dates */}
                      <div className="info-section">
                        <div className="section-header">
                          <div className="section-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 6h14v2H5V6zm7 7h5v5h-5z"
                                fill="currentColor" opacity="0.8" />
                            </svg>
                          </div>
                          <span className="section-title">Event Schedule</span>
                        </div>
                        <div className="section-content">
                          <div className="date-range">
                            <div className="date-item">
                              <span className="date-label">From</span>
                              <span className="date-value">{formatDate(msg.startDate)}</span>
                            </div>
                            <div className="arrow-icon">→</div>
                            <div className="date-item">
                              <span className="date-label">To</span>
                              <span className="date-value">{formatDate(msg.endDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="info-section">
                        <div className="section-header">
                          <div className="section-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                fill="currentColor" opacity="0.8" />
                            </svg>
                          </div>
                          <span className="section-title">Location</span>
                        </div>
                        <div className="section-content">
                          <div className="location-text">{msg.flatOrHouseNo}</div>
                        </div>
                        <div className="section-content">
                          <div className="location-text">{msg.streetName}</div>
                        </div>
                        <div className="section-content">
                          <div className="location-text">{msg.city}</div>
                        </div>
                        <div className="section-content">
                          <div className="location-text">{msg.state}</div>
                        </div>
                        <div className="section-content">
                          <div className="location-text">{msg.postalCode}</div>
                        </div>
                      </div>


                      {/* Notes (optional) */}
                      {msg.message && (
                        <div className="note-section">
                          <div className="note-header">
                            <div className="note-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                                  fill="currentColor" opacity="0.8" />
                              </svg>
                            </div>
                            <span className="note-title">Special Notes</span>
                          </div>
                          <div className="note-content">
                            <p className="note-text">"{msg.message}"</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="payment-card-footer">
                      <div className="footer-content-chat">
                        <div className="timestamp">
                          <span className="time-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                                fill="currentColor" opacity="0.7" />
                            </svg>
                          </span>
                          <span className="time-text">
                            {msg.createdAt ? formatTime(msg.createdAt) : 'Just now'}
                          </span>
                        </div>
                        <div className="status-indicator">
                          <div className="status-dot"></div>
                          {msg?.isRejected ? "Rejected" : "Receive"}
                        </div>
                      </div>

                      <div className="status-indicator-payment">
                       <button
  className="Accept-chat-payment-btn"
  onClick={() => handleAcceptClick(msg)}
  disabled={msg?.isRejected}
>
  Accept
</button>

<button
  className="Reject-chat-payment-btn"
  onClick={() => handleRejectClick(msg)}
  disabled={msg?.isRejected}
>
  Reject
</button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="message-row left">
            <div className="typing-indicator">Typing...</div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <div className="chat-input-inner">
          <input
            value={input}
            onChange={handleTyping}
            placeholder="Start typing..."
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
        show={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        messageId={selectedMessage}
        fetchHistory={fetchHistory}
        // message="It's completely okay. Whenever you feel comfortable or ready, you can accept this proposal."
        message="Are you sure you want to reject this quote?"
        buttonText="Okay"
      />
    </div>
  );
};

export default Chats;
