import React from 'react'
import "./CancellationPolicy.css"
import NavigationButtons from '../../../Template/NavigationButtons/NavigationButtons'
const CancellationPolicy = () => {
  return (
  <div className="terms-page" style={{ position: 'relative' }}>
      <NavigationButtons />
      <div className="terms-container">
      
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Veroa Studioz – Refund &amp; Cancellation
Policy
      </h1>
        <div className="terms-content">

      <h2 className='cancelation-policy-h2'>1. Booking Confirmation</h2>
       <p className="para-intro">
        A booking request made through the Veroa Studioz platform strongwill be considered <strong>confirmed
        once the booking is accepted by Veroa Studioz and the shoot slot is reserved for the customer.</strong>
      </p>
       <p className="para-intro">
        An advance payment may be required to secure <strong>the scheduled date and allocate the service
        team, as communicated at the time of booking.</strong>
      </p>
       <p className="para-intro">
        Failure to complete the required payment within the specified time may result in the
        <strong>automatic release of the reserved slot.</strong>
      </p>

      <h2 className='cancelation-policy-h2'>2. Cancellation by Customer</h2>

      <h3 className='cancelation-policy-h3'>2.1 Cancellation within 24 hours of booking</h3>
       <p className="para-intro">
        If the customer cancels within <strong>24 hours of making the booking, a full refund of the
        advance amount</strong> will be issued, provided the shoot date is <strong>at least 48 hours away.</strong>
      </p>

      <h3 className='cancelation-policy-h3'>2.2 Cancellation 72 hours or more before the shoot</h3>
       <p className="para-intro">
        If cancellation is made <strong>72 hours or more before the scheduled shoot date</strong>, the customer
        will receive an <strong>80% refund of the advance amount</strong>.
      </p>
       <p className="para-intro">20% will be retained as <strong>administrative and scheduling charges</strong>.</p>

      <h3 className='cancelation-policy-h3'>2.3 Cancellation 48–72 hours before shoot</h3>
       <p className="para-intro">
        If cancellation is made <strong>between 48–72 hours before the shoot,
        50% of the advance payment will be refunded.</strong>
      </p>

      <h3 className='cancelation-policy-h3'>2.4 Cancellation within 48 hours of shoot</h3>
       <p className="para-intro">
        If cancellation is made <strong>within 48 hours of the scheduled shoot,
        no refund will be issued.</strong>
      </p>

       <p className="para-intro">This is due to:</p>
      <ul>
        <li className='cancelation-policy-li'>Photographer scheduling</li>
        <li className='cancelation-policy-li'>Resource allocation</li>
        <li className='cancelation-policy-li'>Loss of other potential bookings</li>
      </ul>

      <h2 className='cancelation-policy-h2'>3. Rescheduling Policy</h2>
       <p className="para-intro">Customers may request <strong>one rescheduling</strong> subject to availability.</p>

       <p className="para-intro"><strong>Conditions:</strong></p>
      <ul>
        <li className='cancelation-policy-li'>Request must be made  <strong>at least 48 hours before the shoot</strong></li>
        <li className='cancelation-policy-li'>Rescheduling is subject to <strong>team availability</strong></li>
        <li className='cancelation-policy-li'>Only <strong>one free reschedule</strong> is permitted</li>
      </ul>

       <p className="para-intro">
        If the new date is unavailable, the cancellation policy will apply.
      </p>

      <h2 className='cancelation-policy-h2'>4. Refund Processing Time</h2>
       <p className="para-intro">
        All eligible refunds will be processed within <strong>7–10 business days</strong>
        through the original payment method.
      </p>

      <h2 className='cancelation-policy-h2'>5. Cancellation by Veroa Studioz</h2>
       <p className="para-intro">
        In rare situations where Veroa Studioz must cancel a booking due to
        unforeseen circumstances such as:
      </p>

      <ul>
        <li className='cancelation-policy-li'>Photographer emergency</li>
        <li className='cancelation-policy-li'>Technical failure</li>
        <li className='cancelation-policy-li'>Force majeure events</li>
      </ul>

       <p className="para-intro">The customer will receive either:</p>
      <ul>
        <li className='cancelation-policy-li'>A <strong>full refund</strong>, or</li>
        <li className='cancelation-policy-li'>An option to <strong>reschedule at no additional cost</strong> </li>
      </ul>

      <h2 className='cancelation-policy-h2'>6. Quality Assurance</h2>
       <p className="para-intro">
        If the customer is dissatisfied with the delivered work,
        they may raise a complaint within 48 hours of delivery.
      </p>

       <p className="para-intro">Veroa Studioz may offer:</p>
      <ul>
        <li className='cancelation-policy-li'> <strong> Re-edits</strong></li>
        <li className='cancelation-policy-li'> <strong>Corrections</strong></li>
        <li className='cancelation-policy-li'> <strong>Partial service credit</strong></li>
      </ul>

       <p className="para-intro">
        Refunds after service completion are <strong>generally not applicable</strong> unless
        a significant service failure is determined by Veroa.
      </p>

      <h2 className='cancelation-policy-h2'>7. <strong>Non-Refundable</strong> Items</h2>
       <p className="para-intro">The following are non-refundable:</p>

      <ul>
        <li className='cancelation-policy-li'>Completed shoots</li>
        <li className='cancelation-policy-li'>Delivered digital files</li>
        <li className='cancelation-policy-li'>Editing services already performed</li>
        <li className='cancelation-policy-li'>Additional hours completed during the shoot</li>
      </ul>

      <h2 className='cancelation-policy-h2'>8. Force Majeure</h2>
       <p className="para-intro">
        Refunds may be adjusted in case of events beyond control including:
      </p>

      <ul>
        <li className='cancelation-policy-li'>Natural disasters</li>
        <li className='cancelation-policy-li'>Government restrictions</li>
        <li className='cancelation-policy-li'>Venue shutdowns</li>
      </ul>

       <p className="para-intro">Veroa may instead offer <strong>rescheduling options</strong>.</p>

      <h2 className='cancelation-policy-h2'>9. Contact for Refund Requests</h2>
       <p className="para-intro">
        Customers may contact:
      </p>

       <p className="para-intro">
        <strong>Email:</strong> hello@veroastudioz.com
        <br />
        <strong>Phone:</strong> +91 9650078418
      </p>
</div>
    </div>
     </div>
  )
}

export default CancellationPolicy