import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#00354C] px-6 py-38 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-center mb-8">
          Welcome to <br />
          <span className="text-[#00354C] font-bold">The Pilates Room</span>
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-gray-700">
          Exhale is one of India&apos;s most well-known and loved Pilates brands.
          Dedicated to teaching Classical Pilates — the true works of Joseph Pilates, called Contrology.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-gray-700">
          We’re a haven for the Pilates novice all the way through to the fitness
          enthusiast, professional athlete, and everyone in between. We’re the place
          Pilates teachers learn their craft because they know they’re learning from
          the very best. We’re where people discover how great Pilates makes you feel,
          and a community where everyone at every level is championed.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-gray-700">
          We are <strong>Exhale</strong>. We can’t wait to meet you.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Privacy & Data Protection</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          At Exhale, we value your privacy. All personal information collected during bookings or newsletter subscriptions is stored securely and will never be shared with third parties without your consent. We are committed to safeguarding the confidentiality of our clients.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Cookies & Analytics</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          We use cookies to improve your browsing experience and to analyze website traffic. This helps us enhance the way our community interacts with our content. By continuing to use our site, you accept our use of cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">User Rights</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          You have the right to request access to, correction, or deletion of any personal data we hold about you. To exercise any of these rights, please contact our support team at privacy@exhalepilates.in.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Information</h2>
        <p className="text-md leading-relaxed mb-4 text-gray-700">
          For questions or concerns about this Privacy Policy, you can reach us at:
        </p>
        <ul className="list-disc list-inside text-md text-gray-700">
          <li>Email: support@exhalepilates.in</li>
          <li>Phone: +91 98765 43210</li>
          <li>Address: The Pilates Room, Mumbai, India</li>
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

export default PrivacyPolicy;
