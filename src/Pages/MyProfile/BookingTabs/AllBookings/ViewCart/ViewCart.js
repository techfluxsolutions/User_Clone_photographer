import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewCart.css';
import {
    FaTag, FaUser, FaRegCalendarAlt, FaRegClock,
    FaArrowLeft, FaAngleRight
} from 'react-icons/fa';
import { MdOutlineSecurity } from "react-icons/md";
import { getMyCart } from '../../../../../utils/APIs/editingApis';
import Loader from '../../../../../Template/Loader/Loader';
import BookingDateTimePicker from './BookingDateTimePicker.js';
import LocationPickerMap from "../../../../PersonalizedQuotePage/LocationPikerMap/LocationPikerMap";

const ViewCart = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPicker, setShowPicker] = useState(false);
    const [bookingDate, setBookingDate] = useState('April 25, 2024');
    const [timeSlot, setTimeSlot] = useState('10:00 AM – 12:00 PM');
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [addressData, setAddressData] = useState({
        location: "",
        lat: "",
        lng: "",
        flatOrHouseNo: "",
        streetName: "",
        city: "",
        state: "",
        postalCode: "",
    });

    const isAddressSelected = !!addressData.location;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const res = await getMyCart();
                if (res?.data?.success) {
                    setCartData(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);
    console.log(cartData);
    const user = cartData?.userId || {};
    const items = cartData?.items || [];
    // Amount with GST
    const totalAmount = cartData?.finalAmount || 0;

    const handlePickerSet = (date, time) => {
        setBookingDate(date);
        setTimeSlot(time);
        setShowPicker(false);
    };

    const handleLocationSelect = (data) => {
        setAddressData({
            location: data.location || "",
            lat: data.lat || "",
            lng: data.lng || "",
            streetName: data.streetName || "",
            city: data.city || "",
            state: data.state || "",
            postalCode: data.postalCode || "",
        });
    };

    return (
        <>
            {loading && <Loader />}
            {showPicker && (
                <BookingDateTimePicker
                    onCancel={() => setShowPicker(false)}
                    onSet={handlePickerSet}
                    initialStartDate={bookingDate}
                />
            )}
            <div className="view-cart-container">
            {/* Top Savings Banner */}
            <div className="vc-savings-banner">
                <FaTag className="vc-tag-icon" />
                <span>Saving ₹6800 on this booking</span>
            </div>

            <div className="vc-header-row">
                <button className="vc-back-btn" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>
                <h1 className="vc-page-title">View Cart</h1>
            </div>

                <div className="vc-content-wrapper">
                    {/* Left Column */}
                    <div className="vc-left-column">

                        {/* User & Booking Details */}
                        <h2 className="vc-section-heading">USER & BOOKING DETAILS</h2>
                        <div className="vc-card vc-user-booking-card">
                            <div className="vc-ub-top-section">
                                <div className="vc-ub-user-box">
                                    <div className="vc-ub-user-header">
                                        <div className="vc-user-avatar-placeholder">
                                            <FaUser className="vc-ub-user-icon" />
                                        </div>
                                        <h3>{user.username || 'User'}</h3>
                                    </div>
                                    <p className="vc-ub-email">Number: {user.mobileNumber || 'N/A'}</p>
                                </div>
                                <div className="vc-ub-info-box" style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setShowPicker(true)}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <h3 style={{ margin: 0 }}>Select the Date and Time</h3>
                                        <span style={{ fontSize: '12px', color: '#4A3326', fontWeight: '600', textDecoration: 'underline' }}>Edit</span>
                                    </div>
                                    <div className="vc-ub-info-row">
                                        <FaRegCalendarAlt className="vc-ub-icon" />
                                        <span>{bookingDate}</span>
                                    </div>
                                    <div className="vc-ub-info-row">
                                        <FaRegClock className="vc-ub-icon" />
                                        <span>{timeSlot}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="vc-ub-divider"></div>

                            <div className="vc-ub-bottom-section">
                                <div className="full-width-row">
                                    <div
                                        className={`accordion-header ${isAddressOpen ? "open" : ""}`}
                                        onClick={() => setIsAddressOpen(!isAddressOpen)}
                                    >
                                        <span>Event Address & Location</span>
                                        <span className="arrow">{isAddressOpen ? "▲" : "▼"}</span>
                                    </div>

                                    <div className={`accordion-body ${isAddressOpen ? "show" : ""}`}>
                                        {isAddressOpen && (
                                            <div className="inner-grid">
                                                {/* 🗺️ MAP */}
                                                <div className="vc-map-wrapper">
                                                    <LocationPickerMap onSelect={handleLocationSelect} isOpen={isAddressOpen} />
                                                </div>

                                                {/* Address Inputs */}
                                                <div className="vc-address-inputs">
                                                    <div className="vc-input-group full-width">
                                                        <label>Full Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control budget-input"
                                                            placeholder="Search or select on map"
                                                            value={addressData.location}
                                                            onChange={(e) => setAddressData({ ...addressData, location: e.target.value })}
                                                            disabled={isAddressSelected}
                                                        />
                                                    </div>

                                                    <div className="vc-input-row">
                                                        <div className="vc-input-group">
                                                            <label>Flat / House No.</label>
                                                            <input
                                                                type="text"
                                                                className="form-control budget-input"
                                                                placeholder="House No."
                                                                value={addressData.flatOrHouseNo || ""}
                                                                onChange={(e) => setAddressData({ ...addressData, flatOrHouseNo: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="vc-input-group">
                                                            <label>Street</label>
                                                            <input
                                                                type="text"
                                                                className="form-control budget-input"
                                                                placeholder="Street"
                                                                value={addressData.streetName}
                                                                readOnly
                                                                disabled={isAddressSelected}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="vc-input-row">
                                                        <div className="vc-input-group">
                                                            <label>City</label>
                                                            <input
                                                                type="text"
                                                                className="form-control budget-input"
                                                                placeholder="City"
                                                                value={addressData.city}
                                                                readOnly
                                                                disabled={isAddressSelected}
                                                            />
                                                        </div>
                                                        <div className="vc-input-group">
                                                            <label>State</label>
                                                            <input
                                                                type="text"
                                                                className="form-control budget-input"
                                                                placeholder="State"
                                                                value={addressData.state}
                                                                readOnly
                                                                disabled={isAddressSelected}
                                                            />
                                                        </div>
                                                        <div className="vc-input-group">
                                                            <label>Postal Code</label>
                                                            <input
                                                                type="text"
                                                                className="form-control budget-input"
                                                                placeholder="Zip"
                                                                value={addressData.postalCode}
                                                                readOnly
                                                                disabled={isAddressSelected}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* hidden lat/lng */}
                                                <input type="hidden" value={addressData.lat} />
                                                <input type="hidden" value={addressData.lng} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <input
                                type="text"
                                className="vc-special-instructions"
                                placeholder="Add any special instructions (optional)"
                            />
                        </div>

                        {/* Payment Method Left */}
                        <h2 className="vc-section-heading mt-4">Payment Method</h2>
                        <div className="vc-card vc-payment-card-left">
                            <div className="vc-payment-options">
                                <label className={`vc-payment-option ${paymentMethod === 'online' ? 'active' : ''}`}>
                                    <div className="vc-payment-option-header">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            checked={paymentMethod === 'online'}
                                            onChange={() => setPaymentMethod('online')}
                                        />
                                        <span>Online Payment</span>
                                        <FaAngleRight className="vc-payment-arrow" />
                                    </div>
                                    {paymentMethod === 'online' && (
                                        <div className="vc-payment-logos">
                                            <span className="vc-pay-type">UPI</span>
                                            <span className="vc-pay-type">Credit / Debit Cards</span>
                                            <span className="vc-pay-type">Wallets</span>
                                            <span className="vc-pay-type">EMI</span>
                                        </div>
                                    )}
                                </label>

                                <label className={`vc-payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                                    <div className="vc-payment-option-header">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                        />
                                        <span>Cash on Delivery</span>
                                    </div>
                                </label>

                                <label className={`vc-payment-option ${paymentMethod === 'pay_later' ? 'active' : ''}`}>
                                    <div className="vc-payment-option-header">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            checked={paymentMethod === 'pay_later'}
                                            onChange={() => setPaymentMethod('pay_later')}
                                        />
                                        <span>Pay Later</span>
                                        <FaAngleRight className="vc-payment-arrow" />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="vc-right-column">

                        {/* Cart Details */}
                        <div className="vc-card vc-cart-details-card">
                            <h3 className="vc-sidebar-title">Cart Details</h3>
                            {items.length > 0 ? items.map((item, index) => (
                                <div className="vc-cart-item-box" key={item._id || index}>
                                    <div className="vc-cart-item-header">
                                        <span className="vc-cart-item-title">{item.name}</span>
                                        <div className="vc-cart-qty">
                                            <button>-</button>
                                            <span>{item.quantity}</span>
                                            <button>+</button>
                                        </div>
                                    </div>
                                    <div className="vc-cart-item-pricing">
                                        <span className="vc-cart-item-duration">{item.category} | ₹{item.price.toLocaleString()}</span>
                                        {/* These are static as requested or just for visual consistency */}
                                        <div className="vc-cart-item-savings">
                                            <span className="vc-saving-val">Saving ₹0</span>
                                            <span className="vc-old-price">₹{item.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="vc-cart-item-box">
                                    <p>Your cart is empty</p>
                                </div>
                            )}

                            <div className="vc-coupon-box">
                                <input type="text" placeholder="Apply Coupon" className="vc-coupon-input" />
                                <button className="vc-coupon-btn">Apply</button>
                            </div>
                            <a href="#offers" className="vc-view-offers">View all offers &gt;</a>
                        </div>

                        {/* Payment Summary */}
                        <div className="vc-card vc-payment-summary-card">
                            <h3 className="vc-sidebar-title">Payment Summary</h3>
                            <div className="vc-summary-row">
                                <span>Subtotal</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="vc-summary-row">
                                <span>Discount</span>
                                <span>-₹0</span>
                            </div>
                            <div className="vc-summary-row">
                                <span>Convenience Fee</span>
                                <span>₹0</span>
                            </div>
                            <div className="vc-summary-row">
                                <span>Taxes</span>
                                <span>₹0</span>
                            </div>
                            <div className="vc-summary-row">
                                <span>GST</span>
                                <span>18%</span>
                            </div>
                            <div className="vc-summary-divider"></div>
                            <div className="vc-summary-total">
                                <span className="vc-summary-total-label">Final Payable Amount</span>
                                <span className="vc-summary-total-price">₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Payment Method Right */}
                        <div className="vc-card vc-payment-method-right-card">
                            <h3 className="vc-sidebar-title">Payment Method</h3>
                            <div className="vc-protection-badge">
                                <MdOutlineSecurity className="vc-protection-icon" />
                                <span>100% Payment Protection</span>
                            </div>

                            <button className="vc-proceed-btn">
                                Proceed to Pay ₹{totalAmount.toLocaleString()}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCart;
