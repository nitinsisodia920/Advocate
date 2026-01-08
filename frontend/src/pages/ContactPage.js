import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [activeForm, setActiveForm] = useState("contact");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      setSuccess(true);
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/appointments`, appointmentForm);
      setSuccess(true);
      setAppointmentForm({ name: "", email: "", phone: "", date: "", time: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting appointment request:", error);
      alert("Failed to submit appointment request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="section-title">Get in Touch</h1>
            <p className="section-subtitle">Reach out for legal consultation or to request an appointment</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-navy dark:text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gold text-2xl mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy dark:text-white mb-1">Office Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Legal Chambers,<br />High Court Road,<br />New Delhi - 110001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className="text-gold text-2xl mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy dark:text-white mb-1">Email</h3>
                      <a href="mailto:advocate@legalservices.com" className="text-gray-600 dark:text-gray-400 hover:text-gold">
                        advocate@legalservices.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className="text-gold text-2xl mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy dark:text-white mb-1">Phone</h3>
                      <a href="tel:+919876543210" className="text-gray-600 dark:text-gray-400 hover:text-gold">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-semibold text-navy dark:text-white mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Forms */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                <div className="flex gap-4 mb-6">
                  <button
                    disabled={loading}
                    onClick={() => setActiveForm("contact")}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                      activeForm === "contact" ? "bg-navy text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Contact Message
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => setActiveForm("appointment")}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                      activeForm === "appointment" ? "bg-navy text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Request Appointment
                  </button>
                </div>

                {success && (
                  <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 rounded-lg">
                    <p className="text-green-700 dark:text-green-300">
                      {activeForm === "contact"
                        ? "Your message has been sent successfully!"
                        : "Your appointment request has been submitted!"}
                    </p>
                  </div>
                )}

                {activeForm === "contact" ? (
                  <form onSubmit={handleContactSubmit}>
                    <input type="text" placeholder="Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required className="form-input mb-3" />
                    <input type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required className="form-input mb-3" />
                    <textarea placeholder="Message" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required className="form-textarea mb-3" />
                    <button type="submit" disabled={loading} className="submit-btn">{loading ? "Sending..." : "Send Message"}</button>
                  </form>
                ) : (
                  <form onSubmit={handleAppointmentSubmit}>
                    <input type="text" placeholder="Name" value={appointmentForm.name} onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })} required className="form-input mb-3" />
                    <input type="email" placeholder="Email" value={appointmentForm.email} onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })} required className="form-input mb-3" />
                    <input type="tel" placeholder="Phone" value={appointmentForm.phone} onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })} required className="form-input mb-3" />
                    <input type="date" value={appointmentForm.date} onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })} required className="form-input mb-3" />
                    <input type="time" value={appointmentForm.time} onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })} required className="form-input mb-3" />
                    <textarea placeholder="Message (optional)" value={appointmentForm.message} onChange={(e) => setAppointmentForm({ ...appointmentForm, message: e.target.value })} className="form-textarea mb-3" />
                    <button type="submit" disabled={loading} className="submit-btn">{loading ? "Submitting..." : "Request Appointment"}</button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
