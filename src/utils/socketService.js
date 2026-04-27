import { io } from "socket.io-client";
import { decryptData } from "./CRYPTO/cryptoFunction";

const SOCKET_URL = (
  process.env.REACT_APP_PHOTOGRAPHER_USER_WEBSITE_BASE_API_URL ||
  process.env.REACT_APP_API_URL ||
  ""
).trim();

class SocketService {
  socket = null;
  //
  connect() {
    let token = localStorage.getItem("PhotographerUserToken");

    if (!token) {
      console.error("❌ Socket: No token found");
      return;
    }

    // decrypt if needed
    try {
      if (token.split(".").length !== 3) {
        token = decryptData(token);
      }
    } catch (e) {
      console.warn("Token decrypt failed, using raw token");
    }

    token = token.replace(/^Bearer\s+/i, "").replace(/^"(.*)"$/, "$1").trim();

    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket.id);
    });

    this.socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  /* =====================
     CHAT
  ===================== */
  joinBookingChat(bookingId) {
    this.socket?.emit("join_booking_chat", { bookingId });
  }

  sendMessage(payload) {
    this.socket?.emit("send_message", payload);
  }

  /* =====================
     LISTENERS
  ===================== */
  onReceiveMessage(cb) {
    this.socket?.off("receive_message");
    this.socket?.on("receive_message", cb);
  }

  onTyping(cb) {
    this.socket?.off("typing");
    this.socket?.on("typing", cb);
  }

  onStopTyping(cb) {
    this.socket?.off("stop_typing");
    this.socket?.on("stop_typing", cb);
  }

  /* =====================
     EMITS
  ===================== */
  sendTyping(bookingId) {
    this.socket?.emit("typing", { bookingId });
  }

  sendStopTyping(bookingId) {
    this.socket?.emit("stop_typing", { bookingId });
  }

  /* =====================
     CLEANUP (FIXES YOUR ERROR)
  ===================== */
  offReceiveMessage() {
    this.socket?.off("receive_message");
  }

  offTyping() {
    this.socket?.off("typing");
  }

  offStopTyping() {
    this.socket?.off("stop_typing");
  }
}

const socketService = new SocketService();
export default socketService;