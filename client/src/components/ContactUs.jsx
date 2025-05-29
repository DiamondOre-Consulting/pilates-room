import { contactUs } from "@/Redux/Slices/contactSlice";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    topic: "",
  });

  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const topicMap = {
    "/": "contactUs",
    "/class-schedule": "contactUs",
    "/private-session": "privateClass",
    "/teacher-training": "teacherTraining",
    "/teacher-single-training/:id": "teacherTraining"
  };

  useEffect(() => {
    const currentPath = location.pathname;

    let topic = "contactUs"; // default

    if (currentPath === "/") topic = "contactUs";
    else if (currentPath === "/class-schedule") topic = "contactUs";
    else if (currentPath === "/private-session") topic = "privateClass";
    else if (currentPath === "/teacher-training") topic = "teacherTraining";
    else if (currentPath.startsWith("/teacher-single-training")) topic = "teacherTraining";

    setFormData((prev) => ({ ...prev, topic }));
  }, [location]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await dispatch(contactUs(formData));
    setLoading(false);
    if (response?.payload?.success) {
      setPopupVisible(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        topic: formData.topic,
      });

      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-light relative">
      <div className="py-10 md:max-w-4xl mx-auto px-4 md:px-0">
        <div className="max-w-xl mx-auto">
          <h1 className="text-center text-3xl md:text-5xl uppercase text-dark">
            Let's keep in touch
          </h1>
          <p className="mt-4 text-dark text-base md:text-xl text-center">
            Receive the latest news, updates, offers and goings on from Exhale
            Pilates. Don’t worry, we will never pass on your details to someone
            else. Simply subscribe below.
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <input
            className="py-4 px-2 w-full border-gray-100 bg-white"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="py-4 px-2 w-full border-gray-100 bg-white"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputStyle={{ width: "100%" }}
            placeholder="Phone Number (optional)"
          />
          <textarea
            className="py-4 px-2 w-full border-gray-100 bg-white"
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-black cursor-pointer flex justify-center items-center text-white w-full px-4 py-2 mx-auto rounded-md"
            disabled={loading}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>


      {popupVisible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-fade">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-md font-semibold">
              Thank you for reaching out! We'll get back to you shortly.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactUs;
