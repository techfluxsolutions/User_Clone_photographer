import React from 'react';
import BookingFlow from '../../Shared/BookingFlow/BookingFlow';

const HourlyPremiumBookingFlow = () => {
    const premiumPricing = {
        plans: [
            { id: '1', duration: '0-3 Hours', subtitle: 'Short & Focused Sessions', price: 5999 },
            { id: '2', duration: '5 Hours', subtitle: 'Balanced & Versatile Shoot', price: 7999 },
            { id: '3', duration: '8 Hours', subtitle: 'Full Day Coverage', price: 10999 },
        ],
        teamMembers: [
            { id: 'photographer', title: 'Photographer', image: 'Add1.png', features: ['Premium Photographer', 'Unlimited Photographs', 'All Raw files & Photographs', 'Digital Cloud Based Delivery (JPEG Format)', 'Priority Delivery (1 Day)'], prices: { '1': 5999, '2': 7999, '3': 10999 } },
            { id: 'cinematographer', title: 'Cinematographer', image: 'Add2.png', features: ['Premium Cinematographer', 'Unlimited Videos and Clips', 'All Raw Data delivered', 'Digital Cloud Based Delivery', 'Priority Delivery (1-2 Days)'], prices: { '1': 6999, '2': 9999, '3': 12999 } },
            { id: 'lighting', title: 'Lighting Setup', image: 'Add3.png', features: ['Professional Cinematographer', 'Unlimited Videos and Clips', 'All Raw Data delivered', 'Digital Cloud Based Delivery', 'Priority Delivery (1-2 Days)'], prices: { '1': 2999, '2': 3999, '3': 4999 } },
            { id: 'editing', title: 'Editing', subtitle: '(per reel upto 60sec)', image: 'Add4.png', features: ['Advanced cinematic editing', 'Premium music integration', 'Advanced color grading', 'Text overlay (titles, caption, names)', 'Final export in 4K', 'Unlimited revision rounds'], prices: { '1': 1999, '2': 1999, '3': 1999 } },
        ]
    };

    return <BookingFlow pricing={premiumPricing} />;
};

export default HourlyPremiumBookingFlow;
