import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark py-10 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 font-sans">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Refund Policy
          </h1>
          <h2 className="text-xl text-color1 uppercase font-medium">
            The Pilates Room
          </h2>
        </div>

        <div className=" shadow-sm rounded-lg p-6 md:p-8">
          <div className="mb-8">
            <p className="text-gray-100 mb-6">
              At The Pilates Room, we are committed to providing high-quality
              services and a consistent experience to all our members. To ensure
              fairness and clarity, we follow a strict no-refund policy:
            </p>
          </div>

          {/* 1. General Policy */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              1. General Policy
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                All membership plans, passes, and sessions are{" "}
                <strong>non-refundable</strong> and{" "}
                <strong>non-transferable</strong> once purchased.
              </li>
              <li>
                Payments made for memberships, Discovery Sessions, or packages
                cannot be refunded under any circumstances.
              </li>
            </ul>
          </section>

          {/* 2. Discovery Sessions */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              2. Discovery Sessions
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                Discovery Sessions are paid trial sessions and are strictly{" "}
                <strong>non-refundable</strong> once booked.
              </li>
              <li>
                They must be used within <strong>15 days</strong> of purchase.
              </li>
              <li>
                If cancelled as per the cancellation policy, rescheduling is
                allowed within the validity period, but no refund will be
                issued.
              </li>
            </ul>
          </section>

          {/* 3. No Refunds Will Be Provided For */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              3. No Refunds Will Be Provided For
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                Non-usage of purchased sessions within the validity period.
              </li>
              <li>
                Late cancellations or no-shows (as per our cancellation policy).
              </li>
              <li>
                Change of mind, personal schedule conflicts, relocation, or any
                other personal circumstances.
              </li>
            </ul>
          </section>

          {/* 4. Payment & Processing */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              4. Payment & Processing
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                All payments are <strong>final</strong>.
              </li>
              <li>
                Refunds, adjustments, or transfers are{" "}
                <strong>not available</strong> once a purchase has been made.
              </li>
            </ul>
          </section>

          {/* <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
