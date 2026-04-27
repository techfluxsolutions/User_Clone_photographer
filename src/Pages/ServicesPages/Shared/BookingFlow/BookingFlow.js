import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingFlow.css';

const BookingFlow = ({ pricing }) => {
    const navigate = useNavigate();
    const [selectedPlanId, setSelectedPlanId] = useState(pricing.plans[0].id);
    const [cart, setCart] = useState({});

    const handleSelectPlan = (planId) => {
        setSelectedPlanId(planId);
    };

    const handleAddMember = (member) => {
        const cartItemId = `${member.id}-${selectedPlanId}`;
        const itemPlan = pricing.plans.find(p => p.id === selectedPlanId);
        const itemPrice = member.prices ? member.prices[selectedPlanId] : member.price;

        setCart(prevCart => {
            const currentQuantity = prevCart[cartItemId]?.quantity || 0;
            return {
                ...prevCart,
                [cartItemId]: {
                    ...member,
                    cartItemId: cartItemId,
                    planId: selectedPlanId,
                    planDuration: itemPlan.duration,
                    price: itemPrice,
                    quantity: currentQuantity + 1
                }
            };
        });
    };

    const handleIncreaseQuantity = (cartItemId) => {
        setCart(prevCart => ({
            ...prevCart,
            [cartItemId]: {
                ...prevCart[cartItemId],
                quantity: prevCart[cartItemId].quantity + 1
            }
        }));
    };

    const handleRemoveMember = (cartItemId) => {
        setCart(prevCart => {
            const currentQuantity = prevCart[cartItemId]?.quantity || 0;
            if (currentQuantity <= 1) {
                const newCart = { ...prevCart };
                delete newCart[cartItemId];
                return newCart;
            }
            return {
                ...prevCart,
                [cartItemId]: {
                    ...prevCart[cartItemId],
                    quantity: currentQuantity - 1
                }
            };
        });
    };

    const cartItems = Object.values(cart);

    // Group cart items by plan
    const groupedCartItems = cartItems.reduce((acc, item) => {
        if (!acc[item.planId]) {
            acc[item.planId] = {
                duration: item.planDuration,
                items: []
            };
        }
        acc[item.planId].items.push(item);
        return acc;
    }, {});

    // Calculate total price: sum(cart items price * quantity)
    // We no longer add a base plan price, as the plan just dictates the rate of the members
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="bf-container">
            <h2 className="bf-section-title">Select Your Duration</h2>
            <div className="bf-plans-grid">
                {pricing.plans.map(plan => (
                    <div
                        key={plan.id}
                        className={`bf-plan-card ${selectedPlanId === plan.id ? 'selected' : ''}`}
                        onClick={() => handleSelectPlan(plan.id)}
                    >
                        <h3 className="bf-plan-duration">{plan.duration}</h3>
                        <p className="bf-plan-subtitle">{plan.subtitle}</p>
                        <div className="bf-plan-price-btn">
                            Starting at ₹ {plan.price.toLocaleString('en-IN')}/-
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="bf-section-title">Build Your Own Team</h2>
            <div className="bf-content-wrapper">
                <div className="bf-team-list">
                    {pricing.teamMembers.map(member => (
                        <div key={member.id} className="bf-team-member">
                            <div className="bf-member-info">
                                <h3 className="bf-member-title">
                                    {member.title}
                                    {member.subtitle && <span className="bf-member-subtitle"> {member.subtitle}</span>}
                                </h3>
                                <ul className="bf-member-features">
                                    {member.features.map((feature, index) => (
                                        <li key={index}>• {feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bf-member-actionBox">
                                <div className="bf-member-image-wrapper">
                                    <img
                                        src={`/asset/ServicePages/HourlyPages/${member.image}`}
                                        alt={member.title}
                                        className="bf-member-image"
                                    />
                                    <button
                                        className="bf-add-btn"
                                        onClick={() => handleAddMember(member)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bf-cart-container">
                    <div className="bf-cart">
                        <div className="bf-cart-header">
                            <span className="bf-cart-icon">🛒</span>
                            <h3>Cart</h3>
                        </div>
                        <div className="bf-cart-items">
                            {/* Grouped Team members in cart */}
                            {cartItems.length === 0 ? (
                                <div className="bf-cart-empty">Your team is empty.<br />Add members to start.</div>
                            ) : (
                                Object.keys(groupedCartItems).map(planId => (
                                    <div key={planId} className="bf-cart-group">
                                        <h4 className="bf-cart-group-title">{groupedCartItems[planId].duration}</h4>
                                        <div className="bf-cart-group-items">
                                            {groupedCartItems[planId].items.map(item => (
                                                <div key={item.cartItemId} className="bf-cart-item">
                                                    <div className="bf-cart-item-name">{item.title}</div>
                                                    <div className="bf-cart-item-controls">
                                                        <button className="bf-qty-btn" onClick={() => handleRemoveMember(item.cartItemId)}>-</button>
                                                        <span className="bf-qty-val">{item.quantity}</span>
                                                        <button className="bf-qty-btn" onClick={() => handleIncreaseQuantity(item.cartItemId)}>+</button>
                                                    </div>
                                                    <div className="bf-cart-item-price">₹ {(item.price * item.quantity).toLocaleString('en-IN')}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="bf-cart-total-box">
                            <div className="bf-cart-total-price">
                                ₹ {totalPrice.toLocaleString('en-IN')}
                            </div>
                            <button className="bf-view-cart-btn" onClick={() => navigate('/view-cart')}>View Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingFlow;
