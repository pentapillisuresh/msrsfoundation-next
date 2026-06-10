"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowRight,
  FiSend,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiYoutube
} from 'react-icons/fi';

import { FaWhatsapp } from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';

import ApiService from '@/services/ApiService';

const GetInTouch = () => {

  useEffect(() => {

    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });

  }, []);

  // FORM STATE
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitSuccess, setSubmitSuccess] =
    useState(false);

  const [submitError, setSubmitError] =
    useState('');

  const [openFaq, setOpenFaq] =
    useState(null);

  // HANDLE CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setIsSubmitting(true);

    setSubmitError('');

    try {

      const payload = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        subject: formData.subject,
        contactMethod: formData.contactMethod,
        message: formData.message,
        phoneNumber: formData.phoneNumber
      };

      const response =
        await ApiService.post(
          '/messages/create',
          payload
        );

      console.log(
        'Message Response:',
        response
      );

      setSubmitSuccess(true);

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        subject: '',
        message: '',
        contactMethod: 'email'
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {

      console.error(error);

      setSubmitError(
        error?.message ||
        'Failed to send message'
      );

    } finally {

      setIsSubmitting(false);

    }
  };

  // FAQ TOGGLE
  const toggleFaq = (index) => {

    setOpenFaq(
      openFaq === index
        ? null
        : index
    );
  };

  // CONTACT INFO
  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: 'Visit Our Office',
      details: [
        'MSRS Foundation',
        'Chinnamushidivada',
        'Visakhapatnam, Andhra Pradesh - 530045'
      ],
    },
    {
      icon: <FiPhone />,
      title: 'Call Us',
      details: [
        '+91 XXXXX XXXXX',
        '+91 XXXXX XXXXX (For CSR)'
      ],
    },
    {
      icon: <FiMail />,
      title: 'Email Us',
      details: [
        'msrsfoundation2025@gmail.com',
        'csr@msrsfoundation.org'
      ],
    },
    {
      icon: <FiClock />,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 2:00 PM'
      ],
    }
  ];

  // FAQS
  const faqs = [
    {
      question: 'How can I donate to MSRS Foundation?',
      answer:
        'You can donate online through our secure payment gateway.'
    },
    {
      question: 'How do I become a CSR partner?',
      answer:
        'Please fill out the contact form with CSR Partnership subject.'
    },
    {
      question: 'Can I volunteer with MSRS Foundation?',
      answer:
        'Yes! We welcome volunteers for various programs.'
    }
  ];

  return (

    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">

      <style jsx global>{`

        .contact-card {
          transition: all 0.5s ease;
        }

        .contact-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.12);
        }

        .form-input {
          transition: all 0.3s ease;
          border: 1px solid #E5E7EB;
        }

        .form-input:focus {
          outline: none;
          border-color: #667A62;
          box-shadow: 0 0 0 3px rgba(102,122,98,0.1);
        }

      `}</style>

      {/* HERO */}

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0">

          <img
            src="/images/contact.avif"
            className="w-full h-full object-cover"
            alt="Contact Hero"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />

        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">

          <h1 className="text-white text-3xl md:text-5xl mb-4 font-serif">

            Get in Touch

          </h1>

          <p className="text-white/80 max-w-2xl mx-auto">

            We’re here to answer your questions and welcome your support.

          </p>

        </div>

      </section>

      {/* CONTACT SECTION */}

      <section className="py-24 bg-[#F7F9F5]">

        <div className="container mx-auto px-6 max-w-7xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT */}

            <div>

              <div data-aos="fade-up">

                <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">

                  CONNECT WITH US

                </span>

                <div className="w-16 h-0.5 bg-[#667A62] mb-5"></div>

                <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E2B] mb-5 leading-tight">

                  We'd Love to Hear From You

                </h2>

              </div>

              <div className="space-y-5">

                {contactInfo.map((info, index) => (

                  <div
                    key={index}
                    className="contact-card bg-white p-6 flex gap-5 shadow-sm"
                  >

                    <div className="w-12 h-12 bg-[#EAF6E3] flex items-center justify-center flex-shrink-0">

                      <div className="text-xl text-[#667A62]">

                        {info.icon}

                      </div>

                    </div>

                    <div>

                      <h3 className="font-bold text-[#2C3E2B] text-base mb-1">

                        {info.title}

                      </h3>

                      {info.details.map((detail, i) => (

                        <p
                          key={i}
                          className="text-[#4A5C46] text-sm"
                        >

                          {detail}

                        </p>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <div className="bg-white p-8 shadow-lg">

                <div className="mb-6">

                  <h3 className="font-serif text-2xl font-bold text-[#2C3E2B] mb-2">

                    Send Us a Message

                  </h3>

                </div>

                {/* SUCCESS */}

                {submitSuccess && (

                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500">

                    <p className="text-green-700 text-sm font-semibold">

                      Message Sent Successfully!

                    </p>

                  </div>

                )}

                {/* ERROR */}

                {submitError && (

                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500">

                    <p className="text-red-700 text-sm">

                      {submitError}

                    </p>

                  </div>

                )}

                {/* FORM */}

                <form onSubmit={handleSubmit}>

                  <div className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-3 bg-gray-50 text-sm"
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-3 bg-gray-50 text-sm"
                      />

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-3 bg-gray-50 text-sm"
                      />

                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-3 bg-gray-50 text-sm"
                      />

                    </div>

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input w-full px-4 py-3 bg-gray-50 text-sm"
                      required
                    >

                      <option value="">
                        Select Subject *
                      </option>

                      <option>
                        General Inquiry
                      </option>

                      <option>
                        Donation Support
                      </option>

                      <option>
                        CSR Partnership
                      </option>

                      <option>
                        Volunteer / Internship
                      </option>

                    </select>

                    <textarea
                      name="message"
                      placeholder="Your Message *"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input w-full px-4 py-3 bg-gray-50 text-sm"
                    ></textarea>

                    {/* CONTACT METHOD */}

                    <div>

                      <label className="block mb-2 font-semibold text-[#2C3E2B] text-xs uppercase tracking-wide">

                        Preferred Contact Method

                      </label>

                      <select
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-3 bg-gray-50 text-sm"
                      >

                        <option value="email">
                          Email
                        </option>

                        <option value="phone">
                          Phone
                        </option>

                        <option value="whatsapp">
                          WhatsApp
                        </option>

                        <option value="any">
                          Any
                        </option>

                      </select>

                    </div>

                    {/* BUTTON */}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#667A62] text-white font-semibold text-sm hover:bg-[#4A5C46] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >

                      {isSubmitting ? (
                        <>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FiSend size={14} />
                        </>
                      )}

                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

          {/* FAQ */}

          <div className="mt-24">

            <div className="text-center mb-12">

              <h2 className="font-serif text-3xl text-[#2C3E2B]">

                Frequently Asked Questions

              </h2>

            </div>

            <div className="space-y-3">

              {faqs.map((faq, index) => (

                <div
                  key={index}
                  className="bg-white overflow-hidden"
                >

                  <button
                    onClick={() =>
                      toggleFaq(index)
                    }
                    className="w-full px-5 py-4 flex justify-between items-center text-left"
                  >

                    <span className="font-semibold text-[#2C3E2B] text-sm">

                      {faq.question}

                    </span>

                    {openFaq === index ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}

                  </button>

                  {openFaq === index && (

                    <div className="px-5 pb-4">

                      <p className="text-[#4A5C46] text-sm">

                        {faq.answer}

                      </p>

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default GetInTouch;