import React from 'react';
import BookingFlow from '../../Shared/BookingFlow/BookingFlow';

const HourlyBookingFlow = () => {
    const standardPricing = {
        plans: [
            { id: '1', duration: '0-3 Hours', subtitle: 'Short & Focused Sessions', price: 3999 },
            { id: '2', duration: '5 Hours', subtitle: 'Balanced & Versatile Shoot', price: 5999 },
            { id: '3', duration: '8 Hours', subtitle: 'Full Day Coverage', price: 8999 },
        ],
        teamMembers: [
            { id: 'photographer', title: 'Photographer', image: 'Add1.png', features: ['Trained Photographer', 'Unlimited Photographs', 'All Raw files & Photographs', 'Digital Cloud Based Delivery (JPEG Format)', 'Express Delivery (1-2 Days)'], prices: { '1': 3999, '2': 5999, '3': 8999 } },
            { id: 'videographer', title: 'Videographer', image: 'Add2.png', features: ['Trained Videographer', 'Unlimited Videos and Clips', 'All Raw Data delivered', 'Digital Cloud Based Delivery', 'Express Delivery (2-3 Days)'], prices: { '1': 4999, '2': 6999, '3': 9999 } },
            { id: 'lighting', title: 'Lighting Setup', image: 'Add3.png', features: ['Professional Cinematographer', 'Unlimited Videos and Clips', 'All Raw Data delivered', 'Digital Cloud Based Delivery', 'Express Delivery (2-3 Days)'], prices: { '1': 1999, '2': 2999, '3': 3999 } },
            { id: 'editing', title: 'Editing', subtitle: '(per reel upto 60sec)', image: 'Add4.png', features: ['Professional trimming and clean cuts', 'Background music integration', 'Basic color correction', 'Text overlay (titles, caption, names)', 'Final export in HD (1080p)', '2 minor revision rounds'], prices: { '1': 1199, '2': 1199, '3': 1199 } },
        ]
    };

    return <BookingFlow pricing={standardPricing} />;
};

export default HourlyBookingFlow;
