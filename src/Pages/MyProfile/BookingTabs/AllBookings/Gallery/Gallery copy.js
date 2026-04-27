// import React from "react";
// import { FaPlay } from "react-icons/fa";
// import "./Gallery.css";

// const Gallery = ({ bookingId }) => {
//     console.log("Gallery bookingId:", bookingId);
//   return (
//     <div className="container gallery-container">

//       {/* HEADER */}
//       <div className="gallery-header">
//         <div className="gallery-pending">7 Days Pending...</div>
//         <div className="gallery-actions">
//           <button className="gallery-btn outline">Store to Cloud</button>
//           <button className="gallery-btn">Download Zip</button>
//         </div>
//       </div>

//       {/* ROW 1 : TWO LARGE LANDSCAPE IMAGES */}
//       <div className="row gallery-row-gap">
//         <div className="col-md-6 col-12">
//           <div className="gallery-box">
//             <img src="https://picsum.photos/800/500?1" alt="Gallery 1" />
//           </div>
//         </div>
//         <div className="col-md-6 col-12">
//           <div className="gallery-box">
//             <img src="https://picsum.photos/800/500?2" alt="Gallery 2" />
//           </div>
//         </div>
//       </div>

//       {/* ROW 2 : THREE COLUMN GRID */}
//       <div className="row gallery-row-gap">

//         {/* COL 1 - 3 Images (Balanced Height) */}
//         <div className="col-md-4 col-12">
//           <div className="gallery-col">
//             {/* ITEM 1 - Video Style */}
//             <div className="gallery-box video-box">
//               <img src="https://picsum.photos/400/320?3" alt="Gallery 3" />
//               <div className="play-overlay">
//                 <FaPlay className="play-icon" />
//               </div>
//             </div>
//             {/* ITEM 2 */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/320?4" alt="Gallery 4" />
//             </div>
//             {/* ITEM 3 - Tall Vertical */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/520?5" alt="Gallery 5" />
//             </div>
//           </div>
//         </div>

//         {/* COL 2 - 3 Images (Balanced Height) */}
//         <div className="col-md-4 col-12">
//           <div className="gallery-col">
//             {/* ITEM 1 */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/380?6" alt="Gallery 6" />
//             </div>
//             {/* ITEM 2 */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/380?7" alt="Gallery 7" />
//             </div>
//             {/* ITEM 3 - Video Style */}
//             <div className="gallery-box video-box">
//               <img src="https://picsum.photos/400/400?8" alt="Gallery 8" />
//               <div className="play-overlay">
//                 <FaPlay className="play-icon" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* COL 3 - 4 Images (Balanced Height) */}
//         <div className="col-md-4 col-12">
//           <div className="gallery-col">
//             {/* ITEM 1 - Tall Vertical */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/560?9" alt="Gallery 9" />
//             </div>
//             {/* ITEM 2 */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/200?10" alt="Gallery 10" />
//             </div>
//             {/* ITEM 3 */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/200?11" alt="Gallery 11" />
//             </div>
//             {/* ITEM 4 */}
//             <div className="gallery-box">
//               <img src="https://picsum.photos/400/200?12" alt="Gallery 12" />
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Gallery;




// import React from 'react'

// const Gallery = () => {
//   return (
//     <div className='container'>
//       <div>here i want the 7 days pending, storage, download zip</div>

//       <div className='row'> 
//         {/* here want two images */}
//         <div className='col-md-6 col-12'></div>
//          <div className='col-md-6 col-12'></div>
//       </div>
//        <div className='row'>
//         <div className='col-md-4 col-12'>3 images where i want flex in column format where width & height is same for fisrt two iamgse but for 3rd img width same height sligtly large </div>
//          <div className='col-md-5 col-12'>3 images where i want flex in column format where width & height is same</div>
//          <div className='col-md-3 col-12'>3 images where i want flex in column format where width is same but for 1st height large and then 2 nd image height slightly small then 3 rd or slightly less</div>
//        </div>

//     </div>
//   )
// }

// export default Gallery



// corrected code
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaDownload, FaEye } from "react-icons/fa";
import "./Gallery.css";

import { getPhotoskeysbyid, getImagesUsingKeys } from "../../../../../utils/APIs/galleryApis";
import Loader from "../../../../../Template/Loader/Loader";

const LIMIT = 12;

const Gallery = ({ bookingId, photographerId }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    setGalleryData([]);
    setPage(1);
    setHasMore(true);
  }, [bookingId, photographerId]);

  useEffect(() => {
    fetchGallery(page);
  }, [page]);

  const fetchGallery = async (currentPage) => {
    try {
      setLoading(true);

      const response = await getPhotoskeysbyid(
        currentPage,
        LIMIT,
        bookingId,
        photographerId
      );

      if (response?.data?.success) {

        const keys = response?.data?.data || [];

        const images = await Promise.all(
          keys
            .filter((item) => item?.key)
            .map(async (item) => {

              const url = await getImagesUsingKeys(bookingId, item.key);

              return {
                id: item._id,
                key: item.key,
                url
              };
            })
        );

        setGalleryData((prev) => [...prev, ...images]);

        if (keys.length < LIMIT) {
          setHasMore(false);
        }
      }

    } catch (error) {
      console.error("Gallery API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const toggleSelect = (url) => {
    setSelectedItems((prev) =>
      prev.includes(url)
        ? prev.filter((item) => item !== url)
        : [...prev, url]
    );
  };

  const openPreview = (url) => {
    window.open(url, "_blank");
  };

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "gallery-file";
    link.click();
  };

  const downloadSelected = () => {
    selectedItems.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "gallery-file";
      link.click();
    });
  };

  const GalleryItem = ({ src, isVideo }) => (
    <div
      className={`gallery-box video-box ${
        selectedItems.includes(src) ? "selected" : ""
      }`}
    >
      <img src={src} alt="gallery" onClick={() => openPreview(src)} loading="lazy" />

      {isVideo && (
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
              downloadFile(src);
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
    </div>
  );

  return (
    <div className="container gallery-container">

      {/* HEADER */}
      <div className="gallery-header">

        <div className="gallery-left">
          <div className="gallery-pending">7 Days Pending...</div>

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
          <button className="gallery-btn outline">Store to Cloud</button>
          <button className="gallery-btn">Download Zip</button>
        </div>

      </div>

      {/* GRID */}
      <div className="row gallery-row-gap">

        {galleryData.map((item) => {

          const isVideo =
            item.key?.includes(".mp4") ||
            item.key?.includes(".mov") ||
            item.key?.includes(".webm");

          return (
            <div className="col-md-4 col-12" key={item.id}>
              <div className="gallery-col">
                <GalleryItem src={item.url} isVideo={isVideo} />
              </div>
            </div>
          );
        })}

      </div>

      {/* infinite scroll trigger */}
      {hasMore && (
        <div ref={loaderRef} style={{ textAlign: "center", padding: 20 }}>
          {loading && <Loader />}
        </div>
      )}

    </div>
  );
};

export default Gallery;