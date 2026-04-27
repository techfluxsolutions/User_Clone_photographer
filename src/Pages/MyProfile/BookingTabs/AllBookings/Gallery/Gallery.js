import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaDownload, FaEye } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import "./Gallery.css";
import { FaLock } from "react-icons/fa";
import {
  downloadFullZip,
  downloadSelectedImages,
  downloadSingleImage,
  getAllGalleryImages,
} from "../../../../../utils/APIs/galleryApis";

import Loader from "../../../../../Template/Loader/Loader";
import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";
import UnlockImageModal from "./UnlockImageModal/UnlockImageModal";

const LIMIT = 33;
// const LIMIT = 2;

const Gallery = ({ bookingId, photographerId, clientId }) => {
  console.log("Client ID:", clientId);

  const [selectedItems, setSelectedItems] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [isBlur, setIsBlur] = useState(false)
  // full_Payment
  const [isFullPayment, setFullPayment] = useState(true)
  const [daysRemaining, setDaysRemaining] = useState(false)
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [zipLoading, setZipLoading] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const loaderRef = useRef(null);
  const isFetchingRef = useRef(false);

  const fetchGallery = useCallback(async (currentPage) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setLoading(true);

      const response = await getAllGalleryImages(
        currentPage,
        LIMIT,
        bookingId,
        photographerId
      );

      if (response?.data?.success) {
        const files = response?.data?.data || [];

        const images = files.map((item, index) => ({
          id: `${currentPage}-${index}`,
          key: item.key,
          url: item.imageUrl
        }));

        console.log("RESPONSE GALLERy", response?.data)
        setIsBlur(response?.data?.isblur)
        setFullPayment(response?.data?.full_payment)
        setDaysRemaining(response?.data?.remainingDays)

        setGalleryData((prev) =>
          currentPage === 1 ? images : [...prev, ...images]
        );

        setHasMore(response?.data?.pagination?.hasMore);
      }
    } catch (error) {
      console.error("Gallery API Error:", error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, photographerId, isBlur, daysRemaining]);

  /* ===============================
      DOWNLOAD full ZIP
  =============================== */

  const handleDownloadZip = async () => {
    try {
      setZipLoading(true);

      const payload = {
        bookingid: bookingId,
        clientId: clientId,
        photographerId: photographerId,
      };

      const response = await downloadFullZip(payload);

      // Convert response to blob
      const blob = new Blob([response.data], { type: "application/zip" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `booking-${bookingId}-files.zip`;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download Zip Error:", error);

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Download failed";

      setModalMessage(backendMessage);
      setShowMessageModal(true);
    } finally {
      setZipLoading(false);
    }
  };

  /* ===============================
      INITIAL LOAD
  =============================== */

  useEffect(() => {
    if (!photographerId) {
      setGalleryData([]);
      setSelectedItems([]);
      setHasMore(false);
      setPage(1);
      isFetchingRef.current = false;
      return;
    }

    setGalleryData([]);
    setSelectedItems([]);
    setHasMore(true);
    isFetchingRef.current = false;
    setPage(1);

    fetchGallery(1);
  }, [bookingId, photographerId, fetchGallery]);

  useEffect(() => {
    if (page === 1) return;
    if (!photographerId) return;

    fetchGallery(page);
  }, [page, photographerId, fetchGallery]);

  /* ===============================
      INFINITE SCROLL
  =============================== */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !isFetchingRef.current
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  /* ===============================
      IMAGE ACTIONS
  =============================== */

  const toggleSelect = (url) => {
    setSelectedItems((prev) =>
      prev.includes(url)
        ? prev.filter((item) => item !== url)
        : [...prev, url]
    );
  };

  const openPreview = (url) => window.open(url, "_blank");

  // single img downloade 
  const downloadFile = async (key) => {
    try {
      setZipLoading(true);

      const payload = {
        key: key,
        bookingId: bookingId,
      };

      const response = await downloadSingleImage(payload);

      // Convert response to blob
      const blob = new Blob([response.data]);

      // Create download link
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      // optional filename
      const fileName = key.split("/").pop() || "gallery-file";
      a.download = fileName;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Single Download Error:", error);

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to download file";

      setModalMessage(backendMessage);
      setShowMessageModal(true);

    } finally {
      setZipLoading(false);
    }
  };

  // slected file downloade
  const downloadSelected = async () => {
    try {
      setZipLoading(true);

      const selectedKeys = galleryData
        .filter((item) => selectedItems.includes(item.url))
        .map((item) => item.key);

      const payload = {
        bookingid: bookingId,
        keys: selectedKeys,
      };

      const response = await downloadSelectedImages(payload);

      const blob = new Blob([response.data], { type: "application/zip" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `selected-files-${bookingId}.zip`;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download Selected Error:", error);

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Download failed";

      setModalMessage(backendMessage);
      setShowMessageModal(true);
    } finally {
      setZipLoading(false);
    }
  };

  const isVideoKey = (key) =>
    /\.(mp4|webm|ogg|mov|mkv)$/i.test(key);



  const isImageKey = (key) =>
    /\.(jpg|jpeg|png|webp|gif|bmp|svg)$/i.test(key);


  const GalleryItem = ({ src, fileKey, isBlur }) => {
    const isVideo = isVideoKey(fileKey);
    const isImage = isImageKey(fileKey);

    return (
      <div
        className={`gallery-box video-box ${selectedItems.includes(src) ? "selected" : ""
          }`}
        style={{
          position: "relative"
        }}
      >
        {/* IMAGE */}
        {isImage && (
          <img
            src={src}
            alt="gallery"
            onClick={() => !isBlur && openPreview(src)}
            loading="lazy"
            style={{
              filter: isBlur ? "blur(12px)" : "none",
              pointerEvents: isBlur ? "none" : "auto"
            }}
          />
        )}

        {/* VIDEO */}
        {isVideo && !fileKey.endsWith(".mkv") && (
          <video
            src={src}
            muted
            autoPlay
            loop={false}
            playsInline
            className="gallery-video"
            style={{
              filter: isBlur ? "blur(12px)" : "none",
              pointerEvents: isBlur ? "none" : "auto"
            }}
            onClick={(e) => e.stopPropagation()}
            onLoadedMetadata={(e) => {
              e.target.currentTime = 0;
            }}
            onTimeUpdate={(e) => {
              if (e.target.currentTime >= 5) {
                e.target.currentTime = 0;
                e.target.play();
              }
            }}
          />
        )}

        {/* LOCK OVERLAY */}
        {isBlur && (
          <div className="blur-lock">
            <FaLock className="lock-icon m-2" />
            <span>Locked</span>
          </div>
        )}

        {/* Existing overlay & actions */}
        {!isBlur && (
          <>
            {isVideo && !fileKey.endsWith(".mkv") && (
              <div className="play-overlay">
                <FaPlay className="play-icon" />
              </div>
            )}

            <div className="gallery-hover">
              <div className="gallery-actions-hover">
                <button
                  className="gallery-hover-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadFile(fileKey);
                  }}
                >
                  <FaDownload />
                </button>

                <button
                  className="gallery-hover-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPreview(src);
                  }}
                >
                  <FaEye />
                </button>
              </div>

              <div className="gallery-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(src)}
                  onChange={() => toggleSelect(src)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  /* ===============================
        BUILD GRID
    =============================== */

  const buildRows = () => {
    const rows = [];
    const chunkSize = 11; // 2 + 9 layout pattern

    for (let start = 0; start < galleryData.length; start += chunkSize) {
      const chunk = galleryData.slice(start, start + chunkSize);

      /* ===== ROW 1 (2 items) ===== */
      const firstRow = chunk.slice(0, 2);

      if (firstRow.length) {
        rows.push(
          <div className="row gallery-row-gap" key={`row-top-${start}`}>
            {firstRow.map((item) => (
              <div className="col-md-6 col-12" key={item.id}>
                {/* <GalleryItem
                src={item.url}
                isVideo={isVideoKey(item.key)}
                fileKey={item.key}
              /> */}
                <GalleryItem
                  src={item.url}
                  fileKey={item.key}
                  isBlur={isBlur}
                />
              </div>
            ))}
          </div>
        );
      }

      /* ===== ROW 2 (3 columns grid) ===== */

      const grid = chunk.slice(2);

      const col1 = grid.slice(0, 3);
      const col2 = grid.slice(3, 6);
      const col3 = grid.slice(6, 9);

      if (grid.length) {
        rows.push(
          <div className="row gallery-row-gap" key={`row-grid-${start}`}>
            {[col1, col2, col3].map((col, index) =>
              col.length ? (
                <div className="col-md-4 col-12" key={index}>
                  <div className="gallery-col">
                    {col.map((item) => (
                      <GalleryItem
                        key={item.id}
                        src={item.url}
                        isVideo={isVideoKey(item.key)}
                        fileKey={item.key}
                        isBlur={isBlur}
                      />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        );
      }
    }

    return rows;
  };
  /* ===============================
      COMING SOON UI
  =============================== */

  if (!photographerId) {
    return (
      <div className="container gallery-container">
        <div className="gallery-coming-soon">
          <div className="gallery-coming-soon-icon">
            <FaImage />
          </div>

          <h3 className="gallery-coming-soon-title">
            Gallery Coming Soon
          </h3>

          <p className="gallery-coming-soon-subtitle">
            Photos will appear here once a photographer is assigned
            to this booking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container gallery-container">

      {zipLoading && <Loader />}

      {/* HEADER */}

      <div className="gallery-header">
        <div className="gallery-left">
          <div className="gallery-pending">{daysRemaining} days remaining..</div>

          {selectedItems.length > 0 && (
            <button
              className="download-selected-btn"
              onClick={downloadSelected}
            >
              Download Selected ({selectedItems.length})
            </button>
          )}
        </div>


        <div className="gallery-actions">
          {(isBlur === true && isFullPayment === true) && (
            <button
              className="gallery-btn"
              onClick={() => setShowUnlockModal(true)}
            >
              Unlock Image
            </button>
          )}
          <button className="gallery-btn outline">
            Store to Cloud
          </button>

          <button
            className="gallery-btn"
            onClick={handleDownloadZip}
            disabled={zipLoading || (isBlur === true && isFullPayment === false)}
          >
            {zipLoading ? "Preparing..." : "Download Zip"}
          </button>


        </div>
      </div>

      {/* GRID */}

      {buildRows()}

      {/* INFINITE SCROLL */}

      {hasMore && (
        <div
          ref={loaderRef}
          style={{ textAlign: "center", padding: 20 }}
        >
          {loading && <Loader />}
        </div>
      )}

      <UnlockImageModal
        show={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        bookingId={bookingId}              // pass correct bookingId
      // outstandingAmount={200}         // pass correct amount
      />

      {/* MESSAGE MODAL */}

      <CommonMessageModal
        show={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        message={modalMessage}
        buttonText="Okay"
      />
    </div>
  );
};

export default Gallery;