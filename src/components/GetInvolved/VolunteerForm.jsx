// Complete corrected VolunteerForm component with working custom area input and date availability

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiUsers, FiClock, FiHeart, FiAward, FiCheckCircle, FiSend, 
  FiUser, FiBriefcase, FiBookOpen, FiTrendingUp, FiArrowRight, 
  FiStar, FiThumbsUp, FiSmile, FiTarget, FiCalendar, FiMapPin,
  FiPlus, FiX, FiEdit2, FiAlertCircle
} from 'react-icons/fi';
import { FaHandsHelping, FaQuoteLeft, FaChalkboardTeacher, FaFemale, FaTree } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ApiService from '@/services/ApiService';

const VolunteerForm = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '',
    occupation: '',
    gender: '',
    dob: '',
    address: '',
    phoneNumber: '',
    maritalStatus: '',
    applicationType: '',
    mode: '',
    customerArea: '',
    availableStartDate: '',
    availableEndDate: '',
    availableStartTime: '',
    availableEndTime: '',
    motivation: '',
    feedbackSuggestion: '',
    preferences: [],
    declaration: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showCustomAreaInput, setShowCustomAreaInput] = useState(false);
  const [customAreaValue, setCustomAreaValue] = useState('');
  const [dateErrors, setDateErrors] = useState({
    startDate: '',
    endDate: ''
  });

  const educationQualifications = [
    { value: "No Formal Education", label: "No Formal Education" },
    { value: "Primary School (Class 1-5)", label: "Primary School (Class 1-5)" },
    { value: "Middle School (Class 6-8)", label: "Middle School (Class 6-8)" },
    { value: "High School (Class 9-10)", label: "High School (Class 9-10)" },
    { value: "Higher Secondary (Class 11-12)", label: "Higher Secondary (Class 11-12)" },
    { value: "Diploma / Polytechnic", label: "Diploma / Polytechnic" },
    { value: "ITI / Vocational Training", label: "ITI / Vocational Training" },
    { value: "Bachelor of Arts (BA)", label: "Bachelor of Arts (BA)" },
    { value: "Bachelor of Science (BSc)", label: "Bachelor of Science (BSc)" },
    { value: "Bachelor of Commerce (BCom)", label: "Bachelor of Commerce (BCom)" },
    { value: "Bachelor of Engineering (BE/BTech)", label: "Bachelor of Engineering (BE/BTech)" },
    { value: "Bachelor of Technology (BTech)", label: "Bachelor of Technology (BTech)" },
    { value: "Bachelor of Education (BEd)", label: "Bachelor of Education (BEd)" },
    { value: "Bachelor of Laws (LLB)", label: "Bachelor of Laws (LLB)" },
    { value: "Bachelor of Pharmacy (BPharm)", label: "Bachelor of Pharmacy (BPharm)" },
    { value: "Bachelor of Physiotherapy (BPT)", label: "Bachelor of Physiotherapy (BPT)" },
    { value: "Bachelor of Architecture (BArch)", label: "Bachelor of Architecture (BArch)" },
    { value: "Bachelor of Business Administration (BBA)", label: "Bachelor of Business Administration (BBA)" },
    { value: "Bachelor of Computer Applications (BCA)", label: "Bachelor of Computer Applications (BCA)" },
    { value: "Bachelor of Social Work (BSW)", label: "Bachelor of Social Work (BSW)" },
    { value: "Master of Arts (MA)", label: "Master of Arts (MA)" },
    { value: "Master of Science (MSc)", label: "Master of Science (MSc)" },
    { value: "Master of Commerce (MCom)", label: "Master of Commerce (MCom)" },
    { value: "Master of Engineering (ME/MTech)", label: "Master of Engineering (ME/MTech)" },
    { value: "Master of Business Administration (MBA)", label: "Master of Business Administration (MBA)" },
    { value: "Master of Computer Applications (MCA)", label: "Master of Computer Applications (MCA)" },
    { value: "Master of Education (MEd)", label: "Master of Education (MEd)" },
    { value: "Master of Laws (LLM)", label: "Master of Laws (LLM)" },
    { value: "Master of Social Work (MSW)", label: "Master of Social Work (MSW)" },
    { value: "Doctoral Degree (PhD)", label: "Doctoral Degree (PhD)" },
    { value: "Post-Doctoral Fellowship", label: "Post-Doctoral Fellowship" },
    { value: "Professional Certification", label: "Professional Certification" },
    { value: "Other Qualification", label: "Other Qualification" }
  ];

  // EXACT ENUM VALUES from your backend
  const areasList = [
    { value: 'projects', label: 'Projects & Initiatives' },
    { value: 'social_service', label: 'Social Service' },
    { value: 'educational_support', label: 'Educational Support' },
    { value: 'events', label: 'Events & Programs' },
    { value: 'medical_camps', label: 'Medical Camps & Healthcare' }
  ];

  const benefits = [
    { icon: <FaHandsHelping />, title: "Make an Impact", description: "Directly contribute to social change and see the results" },
    { icon: <FiUsers />, title: "Build Network", description: "Connect with like-minded people and expand your network" },
    { icon: <FiAward />, title: "Get Certified", description: "Receive certificate and recognition for your service" },
    { icon: <FiTrendingUp />, title: "Grow Skills", description: "Develop new skills and gain valuable experience" }
  ];

  const testimonials = [
    { name: "Anjali Sharma", role: "Education Volunteer", text: "Volunteering with MSRS Foundation has been life-changing. The smile on children's faces is priceless.", duration: "2 years" },
    { name: "Rahul Verma", role: "Healthcare Volunteer", text: "The organization's transparency and impact measurement is exceptional. Proud to be part of this mission.", duration: "1.5 years" },
    { name: "Priya Mehta", role: "Intern", text: "The internship program gave me real-world experience and mentorship. Highly recommended!", duration: "6 months" }
  ];

  // Get today's date in YYYY-MM-DD format for min date attribute
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'declaration') {
        setFormData({ ...formData, [name]: checked });
      } else if (name === 'preferences') {
        const preferences = [...formData.preferences];
        if (checked) {
          preferences.push(value);
        } else {
          const index = preferences.indexOf(value);
          if (index > -1) preferences.splice(index, 1);
        }
        setFormData({ ...formData, preferences: preferences });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Validate dates when they change
      if (name === 'availableStartDate') {
        validateStartDate(value, formData.availableEndDate);
      } else if (name === 'availableEndDate') {
        validateEndDate(formData.availableStartDate, value);
      }
    }
  };

  const validateStartDate = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(startDate);
    
    if (selectedDate < today) {
      setDateErrors(prev => ({ ...prev, startDate: 'Start date cannot be in the past' }));
      return false;
    } else {
      setDateErrors(prev => ({ ...prev, startDate: '' }));
    }
    
    if (endDate && selectedDate > new Date(endDate)) {
      setDateErrors(prev => ({ ...prev, startDate: 'Start date cannot be after end date' }));
      return false;
    }
    
    return true;
  };

  const validateEndDate = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(endDate);
    
    if (selectedDate < today) {
      setDateErrors(prev => ({ ...prev, endDate: 'End date cannot be in the past' }));
      return false;
    } else {
      setDateErrors(prev => ({ ...prev, endDate: '' }));
    }
    
    if (startDate && selectedDate < new Date(startDate)) {
      setDateErrors(prev => ({ ...prev, endDate: 'End date cannot be before start date' }));
      return false;
    }
    
    return true;
  };

  const handleCustomAreaAdd = () => {
    if (customAreaValue.trim()) {
      // Add 'others' to preferences
      if (!formData.preferences.includes('others')) {
        setFormData({
          ...formData,
          preferences: [...formData.preferences, 'others']
        });
      }
      // Close the input section and clear the input
      setShowCustomAreaInput(false);
      // Optionally, you can store the custom area value in localStorage or a separate field
      // For now, we'll clear it
      setCustomAreaValue('');
    }
  };

  const handleRemoveArea = (areaToRemove) => {
    setFormData({
      ...formData,
      preferences: formData.preferences.filter(area => area !== areaToRemove)
    });
  };

  // Get display label for preference
  const getPreferenceLabel = (prefValue) => {
    const found = areasList.find(area => area.value === prefValue);
    if (found) return found.label;
    if (prefValue === 'others') return 'Others (Custom Area)';
    return prefValue.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // API Integration for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    // Validation
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      setSubmitError('Please fill in all required fields');
      return;
    }
    
    if (formData.preferences.length === 0) {
      setSubmitError('Please select at least one area of interest');
      return;
    }
    
    if (!formData.declaration) {
      setSubmitError('Please accept the declaration');
      return;
    }
    
    // Date validation
    if (formData.availableStartDate && !validateStartDate(formData.availableStartDate, formData.availableEndDate)) {
      setSubmitError('Please check the start date');
      return;
    }
    
    if (formData.availableEndDate && !validateEndDate(formData.availableStartDate, formData.availableEndDate)) {
      setSubmitError('Please check the end date');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Combine date and time for backend if needed
      const availableStartDateTime = formData.availableStartDate && formData.availableStartTime 
        ? `${formData.availableStartDate}T${formData.availableStartTime}` 
        : null;
      const availableEndDateTime = formData.availableEndDate && formData.availableEndTime 
        ? `${formData.availableEndDate}T${formData.availableEndTime}` 
        : null;
      
      // Prepare data matching the exact API format with ENUM values
      const volunteerData = {
        name: formData.name,
        email: formData.email,
        qualification: formData.qualification,
        occupation: formData.occupation,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        maritalStatus: formData.maritalStatus,
        applicationType: formData.applicationType,
        mode: formData.mode,
        customerArea: formData.customerArea || formData.address || '',
        availableStartDateTime: availableStartDateTime,
        availableEndDateTime: availableEndDateTime,
        availableStartDate: formData.availableStartDate,
        availableEndDate: formData.availableEndDate,
        availableStartTime: formData.availableStartTime || "09:00:00",
        availableEndTime: formData.availableEndTime || "18:00:00",
        motivation: formData.motivation,
        feedbackSuggestion: formData.feedbackSuggestion,
        preferences: formData.preferences
      };
      
      console.log('Submitting data:', volunteerData);
      
      // Make API call
      const response = await ApiService.post('/volunteers', volunteerData);
      
      console.log('API Response:', response);
      
      // Success handling
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitError('');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        qualification: '',
        occupation: '',
        gender: '',
        dob: '',
        address: '',
        phoneNumber: '',
        maritalStatus: '',
        applicationType: '',
        mode: '',
        customerArea: '',
        availableStartDate: '',
        availableEndDate: '',
        availableStartTime: '',
        availableEndTime: '',
        motivation: '',
        feedbackSuggestion: '',
        preferences: [],
        declaration: false
      });
      setCustomAreaValue('');
      setShowCustomAreaInput(false);
      setDateErrors({ startDate: '', endDate: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Submission Error:', error);
      setIsSubmitting(false);
      setSubmitError(error.message || 'Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }

        .benefit-card, .testimonial-card {
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          position: relative;
          overflow: hidden;
        }
        
        .benefit-card:hover, .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.12);
        }
        
        .benefit-card:hover .icon-wrapper {
          background-color: #667A62;
        }
        
        .benefit-card:hover .icon-wrapper svg {
          color: white;
        }
        
        .form-input {
          transition: all 0.3s ease;
          border: 1px solid #E5E7EB;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #667A62;
          box-shadow: 0 0 0 3px rgba(102, 122, 98, 0.1);
        }
        
        .interest-tag {
          transition: all 0.3s ease;
        }
        
        .interest-tag:hover {
          transform: translateX(3px);
        }
        
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-zoom { animation: subtle-zoom 20s infinite alternate linear; }
        
        .btn-submit {
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        
        .btn-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .btn-submit:hover::before {
          left: 100%;
        }
        
        .success-message {
          animation: slideIn 0.5s ease forwards;
        }
        
        .error-message {
          animation: slideIn 0.5s ease forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/volu.avif" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Volunteer Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              BE THE CHANGE
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Join Our Mission
          </h1>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Your Time. Their Future. - Engage with us through volunteering and internships
          </p>
          <div data-aos="fade-up" data-aos-delay="500">
            <a href="#application-form" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md">
              Apply Now <FiArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-24 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT SIDE - Content */}
            <div className="space-y-8">
              <div data-aos="fade-right">
                <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
                  WHY VOLUNTEER WITH US
                </span>
                <div className="w-16 h-0.5 bg-[#667A62] mb-5"></div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mb-4 leading-tight">
                  Make a Real Difference
                </h2>
                <p className="text-[#4A5C46] text-sm leading-relaxed">
                  Join our passionate community of volunteers and contribute to meaningful social change. 
                  Your skills, time, and energy can transform lives and communities.
                </p>
              </div>

              {/* Benefits - 2x2 Grid */}
              <div className="grid grid-cols-2 gap-5">
                {benefits.map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="benefit-card bg-white p-4 shadow-sm border border-[#EAF6E3]"
                    data-aos="fade-right"
                    data-aos-delay={idx * 100}
                  >
                    <div className="icon-wrapper w-10 h-10 bg-[#EAF6E3] flex items-center justify-center mb-3 transition-colors duration-300">
                      <div className="text-lg text-[#667A62] transition-colors duration-300">{benefit.icon}</div>
                    </div>
                    <h3 className="font-bold text-[#2C3E2B] text-sm mb-1">{benefit.title}</h3>
                    <p className="text-[#4A5C46] text-xs leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div data-aos="fade-right" data-aos-delay="200">
                <h3 className="font-bold text-[#2C3E2B] text-base mb-4 flex items-center gap-2">
                  <FiStar className="text-[#667A62]" size={14} /> What Volunteers Say
                </h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, idx) => (
                    <div key={idx} className="testimonial-card bg-white p-4 border border-[#EAF6E3] relative">
                      <FaQuoteLeft className="absolute text-[#EAF6E3] text-2xl opacity-50" style={{ bottom: 10, right: 10 }} />
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[#667A62] flex items-center justify-center text-white font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2C3E2B] text-sm">{testimonial.name}</h4>
                          <p className="text-xs text-[#667A62]">{testimonial.role} • {testimonial.duration}</p>
                        </div>
                      </div>
                      <p className="text-[#4A5C46] text-xs italic leading-relaxed">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Numbers */}
              <div className="bg-white p-4 border border-[#EAF6E3]" data-aos="fade-right" data-aos-delay="300">
                <h3 className="font-bold text-[#2C3E2B] text-sm mb-3 flex items-center gap-2">
                  <FiTarget className="text-[#667A62]" size={14} /> Our Impact
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#667A62]">50+</div>
                    <div className="text-xs text-[#4A5C46]">Programs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#667A62]">15</div>
                    <div className="text-xs text-[#4A5C46]">States</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#667A62]">10K+</div>
                    <div className="text-xs text-[#4A5C46]">Lives</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Application Form */}
            <div id="application-form" data-aos="fade-left">
              <div className="bg-white p-6 shadow-lg border border-[#EAF6E3]">
                <div className="text-center mb-5">
                  <span className="inline-block px-4 py-1 mb-2 text-[9px] font-bold tracking-[0.2em] text-[#667A62] uppercase bg-[#EAF6E3] rounded-full">
                    Start Your Journey
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#2C3E2B]">Apply Now</h3>
                  <p className="text-[#4A5C46] text-xs mt-1">Fill out the form to begin your journey</p>
                  <div className="w-12 h-0.5 bg-[#667A62] mx-auto mt-3"></div>
                </div>

                {submitSuccess && (
                  <div className="success-message mb-4 p-3 bg-green-50 border-l-4 border-green-500 flex items-center gap-2">
                    <FiCheckCircle className="text-green-500 text-base" />
                    <div>
                      <p className="text-green-800 font-semibold text-xs">Application Submitted Successfully!</p>
                      <p className="text-green-600 text-xs">We'll contact you within 48 hours.</p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="error-message mb-4 p-3 bg-red-50 border-l-4 border-red-500 flex items-center gap-2">
                    <FiAlertCircle className="text-red-500 text-base" />
                    <div>
                      <p className="text-red-800 font-semibold text-xs">Submission Failed</p>
                      <p className="text-red-600 text-xs">{submitError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#2C3E2B] mb-3 pb-1 border-b border-[#667A62] flex items-center gap-2">
                      <FiUser size={12} className="text-[#667A62]" /> Personal Information
                    </h4>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Full Name *" 
                        required 
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.name} 
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="date" 
                          name="dob" 
                          required
                          className="form-input px-3 py-2 bg-gray-50 text-sm" 
                          onChange={handleChange} 
                          value={formData.dob} 
                        />
                        <select 
                          name="gender" 
                          className="form-input px-3 py-2 bg-gray-50 text-sm" 
                          onChange={handleChange} 
                          value={formData.gender}
                          required
                        >
                          <option value="">Gender *</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <input 
                        type="tel" 
                        name="phoneNumber" 
                        placeholder="Phone Number *" 
                        required 
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.phoneNumber} 
                      />
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address *" 
                        required 
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.email} 
                      />
                      <input 
                        type="text" 
                        name="address" 
                        placeholder="Address *" 
                        required 
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.address} 
                      />
                      <select 
                        name="maritalStatus" 
                        className="form-input px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.maritalStatus}
                      >
                        <option value="">Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>
                  </div>

                  {/* Application Type */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#2C3E2B] mb-3 pb-1 border-b border-[#667A62] flex items-center gap-2">
                      <FiBriefcase size={12} className="text-[#667A62]" /> Application Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <select 
                        name="applicationType" 
                        className="form-input px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.applicationType}
                        required
                      >
                        <option value="">Apply As *</option>
                        <option value="fulltime">Full-time Volunteer</option>
                        <option value="parttime">Part-time Volunteer</option>
                        <option value="intern">Intern</option>
                      </select>
                      <select 
                        name="mode" 
                        className="form-input px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.mode}
                        required
                      >
                        <option value="">Mode *</option>
                        <option value="online">Online</option>
                        <option value="offline">On-site</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  {/* Availability Dates and Times - UPDATED WITH CALENDAR */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#2C3E2B] mb-3 pb-1 border-b border-[#667A62] flex items-center gap-2">
                      <FiCalendar size={12} className="text-[#667A62]" /> Availability Schedule
                    </h4>
                    <div className="space-y-3">
                      {/* Start Date */}
                      <div>
                        <label className="block text-xs font-medium text-[#4A5C46] mb-1">Start Date *</label>
                        <input 
                          type="date" 
                          name="availableStartDate" 
                          min={getTodayDate()}
                          className={`form-input w-full px-3 py-2 bg-gray-50 text-sm ${dateErrors.startDate ? 'border-red-500' : ''}`}
                          onChange={handleChange} 
                          value={formData.availableStartDate}
                          required
                        />
                        {dateErrors.startDate && (
                          <p className="text-red-500 text-xs mt-1">{dateErrors.startDate}</p>
                        )}
                      </div>

                      {/* Start Time */}
                      <div>
                        <label className="block text-xs font-medium text-[#4A5C46] mb-1">Start Time *</label>
                        <input 
                          type="time" 
                          name="availableStartTime" 
                          className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                          onChange={handleChange} 
                          value={formData.availableStartTime}
                          required
                        />
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block text-xs font-medium text-[#4A5C46] mb-1">End Date *</label>
                        <input 
                          type="date" 
                          name="availableEndDate" 
                          min={formData.availableStartDate || getTodayDate()}
                          className={`form-input w-full px-3 py-2 bg-gray-50 text-sm ${dateErrors.endDate ? 'border-red-500' : ''}`}
                          onChange={handleChange} 
                          value={formData.availableEndDate}
                          required
                        />
                        {dateErrors.endDate && (
                          <p className="text-red-500 text-xs mt-1">{dateErrors.endDate}</p>
                        )}
                      </div>

                      {/* End Time */}
                      <div>
                        <label className="block text-xs font-medium text-[#4A5C46] mb-1">End Time *</label>
                        <input 
                          type="time" 
                          name="availableEndTime" 
                          className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                          onChange={handleChange} 
                          value={formData.availableEndTime}
                          required
                        />
                      </div>

                      <p className="text-xs text-[#667A62] italic mt-1">
                        <FiCalendar className="inline mr-1" size={10} />
                        Please select your available date range and preferred time slots
                      </p>
                    </div>
                  </div>

                  {/* Customer Area */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#2C3E2B] mb-3 pb-1 border-b border-[#667A62] flex items-center gap-2">
                      <FiMapPin size={12} className="text-[#667A62]" /> Service Area
                    </h4>
                    <input 
                      type="text" 
                      name="customerArea" 
                      placeholder="Preferred Service Location / Area" 
                      className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                      onChange={handleChange} 
                      value={formData.customerArea} 
                    />
                  </div>

                  {/* Areas of Interest (Preferences) - With Working Input Field */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#2C3E2B] mb-3 pb-1 border-b border-[#667A62] flex items-center gap-2">
                      <FiTarget size={12} className="text-[#667A62]" /> Areas of Interest
                    </h4>
                    
                    {formData.preferences.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {formData.preferences.map((pref, idx) => (
                          <span key={idx} className="interest-tag inline-flex items-center gap-1 px-2 py-1 bg-[#EAF6E3] text-[#667A62] rounded text-xs">
                            {getPreferenceLabel(pref)}
                            <button type="button" onClick={() => handleRemoveArea(pref)} className="hover:text-red-500">
                              <FiX size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 mb-2">
                      {areasList.map((area, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="preferences" 
                            value={area.value} 
                            onChange={handleChange} 
                            checked={formData.preferences.includes(area.value)}
                            className="w-3 h-3 text-[#667A62] rounded" 
                          />
                          <span className="text-xs text-[#4A5C46]">{area.label}</span>
                        </label>
                      ))}
                    </div>
                    
                    {!showCustomAreaInput ? (
                      <button
                        type="button"
                        onClick={() => setShowCustomAreaInput(true)}
                        className="w-full mt-2 py-1.5 border border-dashed border-[#667A62] text-[#667A62] text-xs font-semibold hover:bg-[#EAF6E3] transition-all flex items-center justify-center gap-1"
                      >
                        <FiPlus size={10} /> Add Custom Area
                      </button>
                    ) : (
                      <div className="mt-2 space-y-2">
                        <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                          <p className="font-semibold">Custom Area:</p>
                          <p>Please specify your area of interest below. It will be saved as "Others" and you can provide more details in the Motivation section.</p>
                        </div>
                        <input
                          type="text"
                          value={customAreaValue}
                          onChange={(e) => setCustomAreaValue(e.target.value)}
                          placeholder="Enter your custom area (e.g., Environmental Protection, Animal Welfare, etc.)"
                          className="w-full form-input px-3 py-2 bg-gray-50 text-sm"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleCustomAreaAdd}
                            className="flex-1 px-3 py-1.5 bg-[#667A62] text-white text-xs font-semibold hover:bg-[#4A5C46] transition-all"
                          >
                            Add Custom Area
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCustomAreaInput(false);
                              setCustomAreaValue('');
                            }}
                            className="px-3 py-1.5 border border-gray-300 text-xs font-semibold hover:bg-gray-100 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Qualification & Occupation */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#2C3E2B] mb-3 pb-1 border-b border-[#667A62] flex items-center gap-2">
                      <FiBookOpen size={12} className="text-[#667A62]" /> Qualification & Occupation
                    </h4>
                    <div className="space-y-3">
                      <select 
                        name="qualification" 
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.qualification}
                        required
                      >
                        <option value="">Educational Qualification *</option>
                        {educationQualifications.map((qual, idx) => (
                          <option key={idx} value={qual.value}>{qual.label}</option>
                        ))}
                      </select>
                      <input 
                        type="text" 
                        name="occupation" 
                        placeholder="Current Occupation / Profession *" 
                        required
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.occupation} 
                      />
                    </div>
                  </div>

                  {/* Motivation & Feedback */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#2C3E2B] mb-3 pb-1 border-b border-[#667A62] flex items-center gap-2">
                      <FiHeart size={12} className="text-[#667A62]" /> Your Voice
                    </h4>
                    <div className="space-y-3">
                      <textarea 
                        name="motivation" 
                        placeholder="Why do you want to join us? (Tell us your story) * 
If you added a custom area, please specify the details here." 
                        rows="3" 
                        required 
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.motivation}
                      ></textarea>
                      <textarea 
                        name="feedbackSuggestion" 
                        placeholder="Any feedback or suggestions for us?" 
                        rows="2" 
                        className="form-input w-full px-3 py-2 bg-gray-50 text-sm" 
                        onChange={handleChange} 
                        value={formData.feedbackSuggestion}
                      ></textarea>
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="mb-5 p-3 bg-[#EAF6E3]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="declaration" 
                        onChange={handleChange} 
                        checked={formData.declaration}
                        className="w-3 h-3 rounded text-[#667A62]" 
                        required
                      />
                      <span className="text-[10px] text-[#4A5C46]">I hereby declare that the information provided is true and correct and I agree to abide by the rules and values of the Foundation.</span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-submit w-full py-2.5 bg-[#667A62] text-white font-semibold text-sm hover:bg-[#4A5C46] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Submitting... <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                    ) : (
                      <>Submit Application <FiSend size={12} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-[#6F8770] px-8 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Ready to Make a Difference?
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Join our team of dedicated volunteers and be part of something meaningful.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <a 
                href="#application-form"
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                Apply Now 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerForm;