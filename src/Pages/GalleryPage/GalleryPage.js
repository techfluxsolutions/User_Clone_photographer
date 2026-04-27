import React from "react";
import "./GalleryPage.css";

const GalleryPage = () => {
    return (
        <div className="container gallery-page-container">

            {/* HEADER */}
            <div className="gallery-page-header">
                <h1 className="gallery-page-title">Our Portfolio</h1>
                <p className="gallery-page-subtitle">A glimpse into our visual storytelling</p>
            </div>

            {/* ROW 1 : Wedding & Fashion Highlights */}
            <div className="row gallery-row-gap gallery-row-1">
                <div className="col-md-6 col-12">
                    <div className="gallery-box">
                        {/* Wedding 1 */}
                        <img src="/asset/ServicePages/Wedding/Gallery/Wedding1.png" alt="Wedding 1" />
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="gallery-box">
                        {/* Fashion 1 - Using first available large image */}
                        <img src="/asset/ServicePages/Fashion/Gallery/Fashion1.png" alt="Fashion 1" />
                    </div>
                </div>
            </div>

            {/* ROW 2 : THREE COLUMN GRID (Mixed Services) */}
            <div className="row gallery-row-gap">

                {/* COL 1 - Automobile & Wedding */}
                <div className="col-md-4 col-12">
                    <div className="gallery-col">
                        <div className="gallery-box">
                            {/* Automobile 1 */}
                            <img src="/asset/ServicePages/Automotive/Gallery/Automobile1.png" alt="Automobile 1" />
                        </div>
                        <div className="gallery-box">
                            {/* Wedding 4 */}
                            <img src="/asset/ServicePages/Wedding/Gallery/Wedding4.png" alt="Wedding 4" />
                        </div>
                        <div className="gallery-box">
                            {/* Wedding 2 */}
                            <img src="/asset/ServicePages/Wedding/Gallery/Wedding2.png" alt="Wedding 2" />
                        </div>
                    </div>
                </div>

                {/* COL 2 - Fashion & Automobile */}
                <div className="col-md-4 col-12">
                    <div className="gallery-col">
                        <div className="gallery-box">
                            {/* Fashion 4 */}
                            <img src="/asset/ServicePages/Fashion/Gallery/Fashion4.png" alt="Fashion 4" />
                        </div>
                        <div className="gallery-box">
                            {/* Automobile 4 */}
                            <img src="/asset/ServicePages/Automotive/Gallery/Automobile4.png" alt="Automobile 4" />
                        </div>
                        <div className="gallery-box">
                            {/* Automobile 2 */}
                            <img src="/asset/ServicePages/Automotive/Gallery/Automobile2.png" alt="Automobile 2" />
                        </div>
                    </div>
                </div>

                {/* COL 3 - Mix */}
                <div className="col-md-4 col-12">
                    <div className="gallery-col">
                        <div className="gallery-box">
                            {/* Wedding 5 */}
                            <img src="/asset/ServicePages/Wedding/Gallery/Wedding5.png" alt="Wedding 5" />
                        </div>
                        <div className="gallery-box">
                            {/* Fashion 2 */}
                            <img src="/asset/ServicePages/Fashion/Gallery/Fashion2.png" alt="Fashion 2" />
                        </div>
                        <div className="gallery-box">
                            {/* Automobile 3 */}
                            <img src="/asset/ServicePages/Automotive/Gallery/Automobile3.png" alt="Automobile 3" />
                        </div>
                        <div className="gallery-box">
                            {/* Fashion 3 */}
                            <img src="/asset/ServicePages/Fashion/Gallery/Fashion3.png" alt="Fashion 3" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GalleryPage;
