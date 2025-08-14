import ContactUs from "@/components/ContactUs";
import React, { useEffect } from "react";

const ContactUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 mx-auto">
      <ContactUs />

      <div className="mt-16 grid grid-cols-1  max-w-7xl mx-auto md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Faridabad Studio
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.8278394294034!2d77.3280731!3d28.394267400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddcd9124b6df%3A0x314f6245c40802ca!2sThe%20Pilates%20Room!5e0!3m2!1sen!2sin!4v1755155820111!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Gurugram Studio Location"
          ></iframe>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Gurugram Studio
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.7587164905053!2d77.0927789!3d28.456688999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d192567fd9111%3A0x5e103aa5b50118fe!2sThe%20Pilates%20Room-India%E2%80%99s%20premier%20classical%20Pilates%20brand!5e0!3m2!1sen!2sin!4v1755155867105!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Delhi Studio Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
