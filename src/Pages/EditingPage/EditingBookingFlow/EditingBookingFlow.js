import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEditingPlans, addToCart, getMyCart, updateCartQuantity } from '../../../utils/APIs/editingApis';
import { toast } from 'react-toastify';
import './EditingBookingFlow.css';
import PackageSkeleton from './Skeleton';

const EditingBookingFlow = () => {
    // Quantities
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState([]);
    const [packages, setPackages] = useState([]);
    const [allPlans, setAllPlans] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [plansLoading, setPlansLoading] = useState(false);
    const [cart, setCart] = useState({ items: [], totalAmount: 0 });
    const [cartLoading, setCartLoading] = useState(false);
    const [addingToCartId, setAddingToCartId] = useState(null);
    const [updatingItemId, setUpdatingItemId] = useState(null);

    // 0. Fetch Cart
    const fetchCartData = async () => {
        setCartLoading(true);
        try {
            const response = await getMyCart();
            if (response.data.success) {
                setCart(response.data.data || { items: [], totalAmount: 0 });
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setCartLoading(false);
        }
    };

    // 1. Initial Fetch to get all quantities
    useEffect(() => {
        const fetchInitialList = async () => {
            try {
                const response = await getEditingPlans();
                if (response.data.success) {
                    const plansResult = response.data.plans || response.data.plansDetails || [];


                    // Derive unique quantities list
                    const uniqueQtys = [...new Set(plansResult.map(p => p.numberOfVideos))]
                        .sort((a, b) => a - b)
                        .map(qty => {
                            const plansForQty = plansResult.filter(p => p.numberOfVideos === qty);
                            return {
                                id: qty,
                                title: `${qty} Videos`,
                                subtitle: plansForQty[0]?.subtitle || 'Standard Quality',
                                startingPrice: Math.min(...plansForQty.map(p => p.price))
                            };
                        });


                    setAllPlans(plansResult);
                    setQuantities(uniqueQtys);
                    if (uniqueQtys.length > 0) {
                        setSelectedQuantity(uniqueQtys[0].id);
                    }
                }
            } catch (error) {
                console.error("Error fetching initial plans:", error);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchInitialList();
        fetchCartData();
    }, []);
    console.log("packages", packages);
    // 2. Secondary Fetch when selectedQuantity changes
    useEffect(() => {
        if (!selectedQuantity) return;

        const fetchDetailedPlans = async () => {
            setPlansLoading(true);
            try {
                const response = await getEditingPlans(selectedQuantity);
                if (response.data.success) {
                    const detailedPlans = response.data.plans || response.data.plansDetails || [];
                    setPackages(detailedPlans);
                }
            } catch (error) {
                console.error("Error fetching detailed plans:", error);
            } finally {
                setPlansLoading(false);
            }
        };
        fetchDetailedPlans();
    }, [selectedQuantity]);

    const handleSelectQuantity = (qty) => {
        setSelectedQuantity(qty);
    };

    const handleAddPackage = async (pkg) => {
        setAddingToCartId(pkg._id);
        try {
            const response = await addToCart(pkg._id, 1);

            if (response.data.success) {
                toast.success(`${pkg.planName || 'Plan'} added to cart!`);
                fetchCartData(); // Sync with backend
            } else {
                toast.error(response.data.message || "Failed to add to cart");
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            const errorMsg = error.response?.data?.message || "Please login to add items to cart";
            toast.error(errorMsg);
        } finally {
            setAddingToCartId(null);
        }
    };

    const handleQuantityUpdate = async (item, action) => {
        // Attempt to find the original plan _id to send to the backend.
        // We look in allPlans (summary) and packages (currently viewing) to find a match.
        // We match by name and price to distinguish between Standard and Premium.
        const searchPool = [...allPlans, ...packages];

        const originalPackage = searchPool.find(pkg => {
            const pkgName = (pkg.planName || 'Standard').toLowerCase().trim();
            const itemName = (item.name || '').toLowerCase().trim();
            const pkgPrice = Number(pkg.price);
            const itemPrice = Number(item.price);

            return pkgName === itemName && pkgPrice === itemPrice;
        });

        // Use the ID from the matched package, or fall back to editingPlanId if present in the item,
        // or finally the item._id itself.
        const planId = originalPackage?._id || item.editingPlanId || item._id;

        console.log("Updating quantity for Plan:", {
            name: item.name,
            resolvedPlanId: planId,
            foundInPool: !!originalPackage
        });

        setUpdatingItemId(`${item._id}-${action}`);
        try {
            const response = await updateCartQuantity(planId, 1, action);
            if (response.data.success) {
                fetchCartData(); // Sync with backend
            } else {
                toast.error(response.data.message || `Failed to ${action} quantity`);
            }
        } catch (error) {
            console.error(`Error ${action} quantity:`, error);
            toast.error(error.response?.data?.message || `Error updating quantity`);
        } finally {
            setUpdatingItemId(null);
        }
    };

    const handleIncreaseQuantity = (item) => {
        handleQuantityUpdate(item, 'increase');
    };

    const handleRemovePackage = (item) => {
        handleQuantityUpdate(item, 'decrease');
    };

    const cartItems = cart?.items || [];
    const totalPrice = cart?.totalAmount || 0;

    return (
        <div className="ebf-container">
            {initialLoading ? (
                <div className="ebf-loading">Loading Plans...</div>
            ) : (
                <>
                    <h2 className="ebf-section-title">Select Video Quantity</h2>
                    <div className="ebf-quantities-grid">
                        {quantities.map(qty => (
                            <div
                                key={qty.id}
                                className={`ebf-quantity-card ${selectedQuantity === qty.id ? 'selected' : ''}`}
                                onClick={() => handleSelectQuantity(qty.id)}
                            >
                                <h3 className="ebf-qty-title">{qty.title}</h3>
                                <p className="ebf-qty-subtitle">{qty.subtitle}</p>
                                <div className="ebf-qty-price-btn">
                                    Starting at ₹ {qty.startingPrice.toLocaleString('en-IN')}/-
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="ebf-section-title">Choose Your Package</h2>
                    <div className="ebf-packages-container">
                        <div className="ebf-packages-grid">
                            {plansLoading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <PackageSkeleton key={i} />
                                ))
                            ) : (
                                packages.map(pkg => (
                                    <div key={pkg._id} className={`ebf-package-card ${pkg.planCategory === 'premium' ? 'premium-card' : ''}`}>
                                        <div className="ebf-package-header">
                                            <h3 className="ebf-package-title">{(pkg.planName || 'Standard').toUpperCase()}</h3>
                                            <div className="ebf-package-price">
                                                ₹{pkg.price.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                        <ul className="ebf-package-features">
                                            {(pkg.features || []).map((feature, index) => (
                                                <li key={index}>
                                                    <span className="ebf-check-icon">✔</span> {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="ebf-package-footer">
                                            <button
                                                className="ebf-add-btn"
                                                onClick={() => handleAddPackage(pkg)}
                                                disabled={addingToCartId === pkg._id}
                                            >
                                                {addingToCartId === pkg._id ? 'Adding...' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="ebf-cart-container">
                            <div className="ebf-cart">
                                <div className="ebf-cart-header">
                                    <span className="ebf-cart-icon">🛒</span>
                                    <h3>Cart</h3>
                                </div>
                                <div className="ebf-cart-items">
                                    {cartLoading ? (
                                        <div className="ebf-loading-small">Loading Cart...</div>
                                    ) : cartItems.length === 0 ? (
                                        <div className="ebf-cart-empty">Your cart is empty.<br />Add a package to start.</div>
                                    ) : (
                                        cartItems.map(item => (
                                            <div key={item._id} className="ebf-cart-item">
                                                <div className="ebf-cart-item-name">
                                                    {item.name}
                                                    {item.category && <span className="ebf-item-cat"> ({item.category})</span>}
                                                </div>
                                                <div className="ebf-cart-item-controls">
                                                    <button
                                                        className="ebf-qty-btn"
                                                        onClick={() => handleRemovePackage(item)}
                                                        disabled={updatingItemId === `${item._id}-decrease`}
                                                    >
                                                        {updatingItemId === `${item._id}-decrease` ? "..." : "-"}
                                                    </button>
                                                    <span className="ebf-qty-val">{item.quantity}</span>
                                                    <button
                                                        className="ebf-qty-btn"
                                                        onClick={() => handleIncreaseQuantity(item)}
                                                        disabled={updatingItemId === `${item._id}-increase`}
                                                    >
                                                        {updatingItemId === `${item._id}-increase` ? "..." : "+"}
                                                    </button>
                                                </div>
                                                <div className="ebf-cart-item-price">₹ {(item.price * item.quantity).toLocaleString('en-IN')}</div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="ebf-cart-total-box">
                                    <div className="ebf-cart-total-price">
                                        ₹ {totalPrice.toLocaleString('en-IN')}
                                    </div>
                                    <button className="ebf-view-cart-btn" onClick={() => navigate('/view-cart')}>View Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EditingBookingFlow;
