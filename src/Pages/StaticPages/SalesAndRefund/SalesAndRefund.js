import React from "react";
import "./SalesAndRefund.css";
import NavigationButtons from "../../../Template/NavigationButtons/NavigationButtons";

const SalesAndRefund = () => {
  return (
    <div className="sales-refund-page" style={{ position: 'relative' }}>
      <NavigationButtons />

      <div className="sales-refund-container">
        <h1>Sales and Refunds</h1>

        <div className="sales-refund-content">
          <h2>PRICING, FEES, AND PAYMENT TERMS</h2>

          <p className="para-intro">
            <strong>(a)</strong> VS reserves the right to charge you for the different Services you may avail and/or
            for any other facilities you may opt for, from time to time, on or via the Platform.
          </p>

          <p className="para-intro">
            <strong>(b)</strong> Charges and Fees in respect of Services:
          </p>

          <ul className="para-intro">
            <li>
              <strong>(i)</strong> In respect of Services that you seek to avail through the Platform, you shall be
              required to pay Service Professionals the amount indicated at the time of booking as
              well as amounts towards (a) any additional Services you may avail, (b) out of pocket
              expenses incurred by the Service Professional, and (c) expenses arising out of the
              purchase of goods required or utilised for the performance of the Service <strong>(“Charges”)</strong>.
              In addition to the Charges payable to Service Professionals, VS reserves the right to
              charge you a convenience fee for facilitating the booking and transferring payments to
              the Service Professional (this fee is referred to as <strong>“Fees”</strong>). You acknowledge that the
              final bill you receive may include additional charges, including without limitation, a safety
              fee, warranty fee, insurance fee, or Service Professional welfare fee.
            </li>
            <li>
              <strong>(ii)</strong> VS shall notify you of the applicable Charges, Fees, and payment methods at the
              time of booking. Generally, you may make payments for Services through credit cards,
              debit cards, net banking, wallets, UPI or cash upon completion of the Service. We have
              the right to modify and otherwise restrict the modes of payment available to you. You
              acknowledge that certain payment methods such as cash upon completion may not
              always be available to you as a payment method. For the avoidance of doubt, in the
              event you pay through the method of ‘cash upon completion’, you acknowledge that you
              will be required to pay both Charges and Fees to the Service Professional.
            </li>
            <li>
              <strong>(iii)</strong> The Charges and Fees may be payable at the time of making a booking, or upon the
              completion of the Service, as specified by VS.
            </li>
            <li>
              <strong>(iv)</strong> For the avoidance of doubt, please note that the Charges are payable to Service
              Professionals, and VS acts as a limited collection agent on behalf of such Service
              Professionals to collect and transfer amounts due to them.
            </li>
            <li>
              <strong>(v)</strong> Taxes: All Charges and Fees are subject to applicable taxes.
            </li>
            <li>
              <strong>(vi)</strong> VS reserves the right to reasonably amend the Charges and Fees at any time at its
              sole discretion. A change in Fees shall not impact any bookings that have been
              confirmed before the publication of the revised Fees on the Platform.
            </li>
            <li>
              <strong>(vii)</strong> Charges and Fees that you pay are final and non-refundable, unless otherwise
              determined by VS or required by the applicable laws. Under certain laws, you may be
              entitled to a refund or other remedies for a failure in the provision of the Services.
            </li>
            <li>
              <strong>(viii)</strong> You acknowledge and agree that Charges and Fees applicable in certain
              geographical areas may increase substantially during times of high demand. VS will use
              reasonable efforts to inform you of the Charges and Fees that may apply. However, by
              using the Services, you will be responsible for the Charges and Fees incurred under
              your Account regardless of your awareness of such Charges or Fees.
            </li>
          </ul>

          <p className="para-intro">
            <strong>(c) Payment Processors:</strong> We may use a third-party payment processor <strong>(“Payment
            Processor”)</strong> to bill you through your selected mode of payment. The processing of
            payments will be subject to the terms and policies of such Payment Processor in
            addition to these Terms. We shall not be liable for any error of the Payment Processor.
          </p>

          <p className="para-intro">
            In the event of any unsuccessful payment, the money debited shall be credited in
            accordance with the terms of the Payment Processor.
          </p>

          <p className="para-intro">
            <strong>(d) Cancellation:</strong> You may elect to cancel your request for services from a Service
            Professional at any time prior to such Service Professional’s arrival, in which case you
            may be charged a cancellation fee in accordance with VS’s cancellation policy. VS
            reserves the right to charge you, or otherwise deduct applicable taxes in respect of such
            cancellation fee.
          </p>

          <p className="para-intro">
            <strong>(e) Subscriptions:</strong> VS may from time to time offer subscription packages (howsoever
            named) for monetary consideration. The packages shall provide Customers with
            additional benefits, which may include the ability to avail discounted Services. You
            agree that subscription packages (howsoever named) shall be subject to additional
            terms and conditions. You acknowledge that such subscription packages will be subject
            to additional terms and conditions that will be deemed to be an integral part of these
            Terms.
          </p>

          <p className="para-intro">
            <strong>(f)</strong> VS does not designate any portion of your payment as a tip or gratuity to the Service
            Professional. Any representation by VS to the effect that tipping is “voluntary”, “not
            required”, and/or “included” in the payments you make for Services is not intended to
            suggest that VS provides any additional payments to Service Professionals. You
            understand and agree that while you are free to provide additional payment as a gratuity
            to any Service Professional who provides you with Services, you are under no
            obligation to do so. Gratuities are voluntary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesAndRefund;
