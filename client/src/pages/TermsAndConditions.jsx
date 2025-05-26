import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#00354C] px-6 py-32 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-center mb-8">
          Terms & Conditions <br />
          <span className="text-[#00354C] font-bold">The Pilates Room</span>
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-gray-700">
          Welcome to Exhale — one of India’s most beloved Pilates brands. By using our website, services, and facilities, you agree to abide by the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Use of Services</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          All classes, programs, and services are for personal use only. Unauthorized commercial use of our services, videos, or techniques is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Booking & Cancellation</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          All bookings are subject to availability and confirmation. Cancellations must be made at least 24 hours in advance to avoid being charged. No-shows will not be refunded or rescheduled.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Liability Waiver</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          By participating in our classes, you acknowledge that you are physically able and waive any liability against Exhale Pilates, its staff, or instructors for any injuries sustained during participation.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Intellectual Property</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          All content, branding, and training material provided by Exhale is the intellectual property of the company and cannot be copied, redistributed, or republished without written permission.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Changes to Terms</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          Exhale reserves the right to modify or update these terms at any time. Continued use of our services constitutes acceptance of any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Contact</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          For any questions regarding our terms and conditions, contact us at:
        </p>
        <ul className="list-disc list-inside text-md text-gray-700">
          <li>Email: support@exhalepilates.in</li>
          <li>Phone: +91 98765 43210</li>
        </ul>

        <div className="mt-12 border-t pt-6 text-sm text-gray-500 text-center">
          <p>
            © {new Date().getFullYear()} Exhale Pilates. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
