import React from "react";

const RefundPolicy = () => {
  return (
    <div className="p-8 text-[#000b69] bg-[#f7f7f7] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <p className="mb-6">
        Thank you for shopping at{" "}
        <a
          href="https://shivani7516.graphy.com"
          className="underline text-blue-600"
        >
          shivani7516.graphy.com
        </a>
      </p>

      <ul className="list-disc pl-6 space-y-4 mb-10">
        <li>Non-tangible irrevocable goods ("Digital products")</li>
        <li>
          We do not issue refunds for non-tangible irrevocable goods ("digital
          products") once the order is confirmed and the product is sent.
        </li>
        <li>
          We recommend contacting us for assistance if you experience any issues
          receiving or downloading our products. Contact us for any issues:
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Contact us for any issues:</h2>
      <p>
        If you have any questions about our Returns and Refunds Policy, please
        contact us at:
        <br />
        <a
          href="mailto:shivanikher100@gmail.com"
          className="text-blue-600 underline"
        >
          shivanikher100@gmail.com
        </a>
      </p>
    </div>
  );
};

export default RefundPolicy;
