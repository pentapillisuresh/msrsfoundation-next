// app/schedule-meeting/page.js (or app/meeting/page.js)
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FiCalendar, FiClock, FiMapPin, FiUsers, FiHeart, FiArrowRight, FiX, 
  FiCheckCircle, FiBriefcase, FiMail, FiPhone, FiUser, FiFileText, 
  FiGlobe, FiDollarSign, FiTarget, FiMessageSquare, FiSend, FiAward,
  FiShield, FiStar, FiTrendingUp, FiHome, FiBookOpen, FiRefreshCw, FiVideo,
  FiPlus, FiCheck, FiArrowLeft, FiAlertCircle
} from 'react-icons/fi';
import { FaBuilding, FaHandsHelping, FaRegSmile, FaChartLine, FaRegCalendarAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ApiService from '@/services/ApiService';

const ScheduleMeeting = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInterest, setOtherInterest] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Track completed sections for progress steps
  const [completedSections, setCompletedSections] = useState({
    companyDetails: false,
    contactInfo: false,
    csrInterests: false,
    fundingIntent: false,
    schedule: false,
    confirm: false
  });

  // Updated formData with exact backend keys
  const [formData, setFormData] = useState({
    companyName: '',
    cinNumber: '',
    industryType: '',
    url: '',
    csrRegistrationNumber: '',
    panNumber: '',
    budgetRequired: '',
    csrAlignment: '',
    applicantName: '',
    role: '',
    email: '',
    mobileNumber: '',
    address: '',
    csrInterests: [],
    proposedCsrBudget: '',
    preferredProjectType: '',
    preferredProjectLocation: '',
    timelineForCsrActivity: '',
    preferredMeetingMode: '',
    preferredDate: '',
    preferredTime: '',
    alternateDateTime: '',
    purposeOfMeeting: '',
    specificRequirements: '',
    declaration: false
  });

  const [errors, setErrors] = useState({});

  const csrInterestsList = [
    { name: 'education', label: 'Education Development', icon: <FiBookOpen />, color: 'bg-blue-100 text-blue-600' },
    { name: 'healthcare', label: 'Healthcare & Medical Support', icon: <FiHeart />, color: 'bg-red-100 text-red-600' },
    { name: 'rural_development', label: 'Rural Development', icon: <FaBuilding />, color: 'bg-green-100 text-green-600' },
    { name: 'women_empowerment', label: 'Women Empowerment', icon: <FiUsers />, color: 'bg-pink-100 text-pink-600' },
    { name: 'environmental', label: 'Environmental Sustainability', icon: <FiGlobe />, color: 'bg-teal-100 text-teal-600' },
    { name: 'skill_development', label: 'Skill Development', icon: <FiTrendingUp />, color: 'bg-purple-100 text-purple-600' },
    { name: 'disaster_relief', label: 'Disaster Relief', icon: <FiShield />, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'spiritual', label: 'Spiritual & Cultural Programs', icon: <FiStar />, color: 'bg-indigo-100 text-indigo-600' }
  ];

  const industryTypes = [
    'Banking & Finance', 'Information Technology', 'Manufacturing', 
    'Healthcare', 'Education', 'Real Estate', 'Retail', 'Telecom',
    'Energy & Power', 'Infrastructure', 'Pharmaceuticals', 'Other'
  ];

  const csrAlignments = [
    'Education Support',
    'Healthcare Initiatives',
    'Rural Development',
    'Women Empowerment',
    'Skill Development',
    'Environmental Sustainability',
    'Disaster Relief',
    'Other'
  ];

  const projectTypes = [
    'Ongoing Projects Collaboration',
    'New Project Partnership',
    'Sponsorship-Based Initiative',
    'Impact Investment',
    'Employee Engagement Program'
  ];

  const timelines = [
    'Immediate (0–3 Months)',
    'Short Term (3–6 Months)',
    'Medium Term (6–12 Months)',
    'Long Term (1-3 Years)',
    'Ongoing Partnership'
  ];

  const meetingModes = [
    { value: 'online', label: 'Online (Zoom / Google Meet)', icon: <FiVideo /> },
    { value: 'offline', label: 'Offline (Visit Our Office)', icon: <FiHome /> },
    { value: 'hybrid', label: 'Hybrid (Both Options)', icon: <FiRefreshCw /> }
  ];

  // Update section completion status based on form data
  useEffect(() => {
    const newCompletedSections = {
      companyDetails: !!(formData.companyName && formData.industryType && formData.csrRegistrationNumber && formData.panNumber),
      contactInfo: !!(formData.applicantName && formData.role && formData.email && formData.mobileNumber && formData.address),
      csrInterests: formData.csrInterests.length > 0,
      fundingIntent: !!(formData.proposedCsrBudget && formData.preferredProjectType && formData.preferredProjectLocation && formData.timelineForCsrActivity),
      schedule: !!(formData.preferredMeetingMode && formData.preferredDate && formData.preferredTime && formData.purposeOfMeeting),
      confirm: formData.declaration === true
    };
    setCompletedSections(newCompletedSections);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'declaration') {
        setFormData({ ...formData, declaration: checked });
      } else if (name === 'csrInterests') {
        const interests = [...formData.csrInterests];
        if (checked) {
          interests.push(value);
        } else {
          const index = interests.indexOf(value);
          if (index > -1) interests.splice(index, 1);
        }
        setFormData({ ...formData, csrInterests: interests });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  const handleAddOtherInterest = () => {
    if (otherInterest.trim() && !formData.csrInterests.includes(otherInterest.trim())) {
      setFormData({
        ...formData,
        csrInterests: [...formData.csrInterests, otherInterest.trim()]
      });
      setOtherInterest('');
      setShowOtherInput(false);
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData({
      ...formData,
      csrInterests: formData.csrInterests.filter(interest => interest !== interestToRemove)
    });
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.industryType) newErrors.industryType = 'Industry type is required';
      if (!formData.csrRegistrationNumber) newErrors.csrRegistrationNumber = 'CSR registration number is required';
      if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
    }
    
    if (currentStep === 1) {
      if (!formData.applicantName) newErrors.applicantName = 'Contact person name is required';
      if (!formData.role) newErrors.role = 'Designation is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
      else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Mobile number must be 10 digits';
      if (!formData.address) newErrors.address = 'Office address is required';
    }
    
    if (currentStep === 2) {
      if (formData.csrInterests.length === 0) newErrors.csrInterests = 'Please select at least one CSR interest';
    }
    
    if (currentStep === 3) {
      if (!formData.proposedCsrBudget) newErrors.proposedCsrBudget = 'Proposed budget is required';
      if (!formData.preferredProjectType) newErrors.preferredProjectType = 'Project type is required';
      if (!formData.preferredProjectLocation) newErrors.preferredProjectLocation = 'Project location is required';
      if (!formData.timelineForCsrActivity) newErrors.timelineForCsrActivity = 'Timeline is required';
    }
    
    if (currentStep === 4) {
      if (!formData.preferredMeetingMode) newErrors.preferredMeetingMode = 'Meeting mode is required';
      if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
      if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
      if (!formData.purposeOfMeeting) newErrors.purposeOfMeeting = 'Purpose of meeting is required';
    }
    
    if (currentStep === 5) {
      if (!formData.declaration) newErrors.declaration = 'Please accept the declaration';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // API Integration for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      
      try {
        // Prepare data with exact backend keys
        const meetingData = {
          companyName: formData.companyName,
          cinNumber: formData.cinNumber,
          industryType: formData.industryType,
          url: formData.url,
          csrRegistrationNumber: formData.csrRegistrationNumber,
          panNumber: formData.panNumber,
          budgetRequired: parseFloat(formData.budgetRequired) || 0,
          csrAlignment: formData.csrAlignment,
          applicantName: formData.applicantName,
          role: formData.role,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          address: formData.address,
          csrInterests: formData.csrInterests,
          proposedCsrBudget: parseFloat(formData.proposedCsrBudget) || 0,
          preferredProjectType: formData.preferredProjectType,
          preferredProjectLocation: formData.preferredProjectLocation,
          timelineForCsrActivity: formData.timelineForCsrActivity,
          preferredMeetingMode: formData.preferredMeetingMode,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          alternateDateTime: formData.alternateDateTime,
          purposeOfMeeting: formData.purposeOfMeeting,
          specificRequirements: formData.specificRequirements
        };
        
        console.log('Submitting meeting data:', meetingData);
        
        // Make API call to meetings endpoint
        const response = await ApiService.post('/meetings', meetingData);
        
        console.log('API Response:', response);
        
        // Success handling
        setIsSubmitting(false);
        setShowSuccessPopup(true);
        setSubmitError('');
        
        // Reset form
        setFormData({
          companyName: '',
          cinNumber: '',
          industryType: '',
          url: '',
          csrRegistrationNumber: '',
          panNumber: '',
          budgetRequired: '',
          csrAlignment: '',
          applicantName: '',
          role: '',
          email: '',
          mobileNumber: '',
          address: '',
          csrInterests: [],
          proposedCsrBudget: '',
          preferredProjectType: '',
          preferredProjectLocation: '',
          timelineForCsrActivity: '',
          preferredMeetingMode: '',
          preferredDate: '',
          preferredTime: '',
          alternateDateTime: '',
          purposeOfMeeting: '',
          specificRequirements: '',
          declaration: false
        });
        
        setCurrentStep(0);
        
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        
      } catch (error) {
        console.error('Submission Error:', error);
        setIsSubmitting(false);
        setSubmitError(error.message || 'Failed to submit meeting request. Please try again.');
        
        // Auto clear error after 5 seconds
        setTimeout(() => setSubmitError(''), 5000);
      }
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  const steps = [
    { key: 'companyDetails', title: 'Company Details', description: 'Basic information about your organization', icon: <FaBuilding /> },
    { key: 'contactInfo', title: 'Contact Person Details', description: 'Information about the primary contact person', icon: <FiUser /> },
    { key: 'csrInterests', title: 'CSR Interest Details', description: 'Select the areas you wish to support', icon: <FaHandsHelping /> },
    { key: 'fundingIntent', title: 'Funding Intent', description: 'Details about your funding and project preferences', icon: <FiDollarSign /> },
    { key: 'schedule', title: 'Meeting Schedule', description: 'Select your preferred meeting date and time', icon: <FiCalendar /> },
    { key: 'confirm', title: 'Additional Information', description: 'Share more details about your expectations', icon: <FiMessageSquare /> }
  ];

  const scrollToStep = (index) => {
    setCurrentStep(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper function to get display label for CSR interest
  const getInterestLabel = (interestValue) => {
    const found = csrInterestsList.find(i => i.name === interestValue);
    return found ? found.label : interestValue;
  };

  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }

        .form-input {
          transition: all 0.3s ease;
          border: 1px solid #E5E7EB;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #667A62;
          box-shadow: 0 0 0 3px rgba(102, 122, 98, 0.1);
        }
        
        .interest-chip {
          transition: all 0.3s ease;
        }
        
        .interest-chip:hover {
          transform: translateY(-2px);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          animation: scaleUp 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .success-checkmark {
          animation: checkmark 0.5s ease-in-out forwards;
        }
        
        @keyframes checkmark {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .btn-glow:hover {
          box-shadow: 0 0 25px rgba(102, 122, 98, 0.5);
        }
        
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-zoom { animation: subtle-zoom 20s infinite alternate linear; }
        
        .selected-interest-tag {
          transition: all 0.3s ease;
        }
        
        .selected-interest-tag:hover {
          transform: translateX(3px);
        }
        
        /* Sticky Progress Styles */
        .progress-sticky {
          position: sticky;
          top: 20px;
          z-index: 40;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-radius: 16px;
        }
        
        .progress-step {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .progress-step:hover {
          transform: translateY(-2px);
        }
        
        .step-number {
          transition: all 0.3s ease;
        }
        
        .step-number.completed {
          background-color: #667A62;
          border-color: #667A62;
          color: white;
        }
        
        .step-number.active {
          border-color: #667A62;
          background-color: #EAF6E3;
          color: #667A62;
          transform: scale(1.1);
        }
        
        .step-line {
          transition: all 0.5s ease;
        }
        
        .step-line.completed {
          background-color: #667A62;
        }
        
        @keyframes checkPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .check-animation {
          animation: checkPulse 0.5s ease-in-out;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .step-transition-enter {
          opacity: 0;
          transform: translateX(20px);
        }
        .step-transition-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 300ms, transform 300ms;
        }
        .step-transition-exit {
          opacity: 1;
          transform: translateX(0);
        }
        .step-transition-exit-active {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 300ms, transform 300ms;
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
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Schedule Meeting Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5">
              <FiBriefcase className="text-[#667A62] text-sm" />
              <span className="text-[10px] font-semibold text-white tracking-wider">Corporate Social Responsibility</span>
            </div>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Schedule a Meeting
          </h1>
          <div className="flex justify-center gap-2 mb-5" data-aos="fade-up" data-aos-delay="250">
            <div className="w-12 h-0.5 bg-[#667A62]"></div>
            <div className="w-6 h-0.5 bg-[#667A62]"></div>
            <div className="w-3 h-0.5 bg-[#667A62]"></div>
          </div>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Let's Build Impact Together. Schedule a discussion with our team to explore CSR collaborations, 
            funding opportunities, and project alignment.
          </p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="py-16 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Error Message */}
          {submitError && (
            <div className="error-message mb-4 p-3 bg-red-50 border-l-4 border-red-500 flex items-center gap-2 rounded">
              <FiAlertCircle className="text-red-500 text-base" />
              <div>
                <p className="text-red-800 font-semibold text-xs">Submission Failed</p>
                <p className="text-red-600 text-xs">{submitError}</p>
              </div>
            </div>
          )}

          {/* Sticky Progress Steps */}
          <div className="progress-sticky mb-8 p-4 bg-white" data-aos="fade-down">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div 
                    className="progress-step flex flex-col items-center relative z-10 group"
                    onClick={() => scrollToStep(idx)}
                  >
                    <div 
                      className={`
                        step-number w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300
                        ${completedSections[step.key] 
                          ? 'completed bg-[#667A62] border-[#667A62] text-white' 
                          : currentStep === idx
                          ? 'active border-[#667A62] bg-[#EAF6E3] text-[#667A62]'
                          : 'border-gray-300 bg-white text-gray-400 group-hover:border-[#667A62] group-hover:text-[#667A62]'
                        }
                      `}
                    >
                      {completedSections[step.key] ? (
                        <FiCheck className="check-animation" size={16} />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className={`text-[9px] mt-1 hidden md:block text-center transition-colors ${
                      currentStep === idx ? 'text-[#667A62] font-semibold' : 'text-gray-500 group-hover:text-[#667A62]'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 step-line ${
                      completedSections[step.key] ? 'completed bg-[#667A62]' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[#EAF6E3] overflow-hidden rounded-lg shadow-lg">
            {/* Step Content */}
            <div className="p-6 md:p-8">
              {/* Step Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAF6E3]">
                <div className="w-12 h-12 bg-[#EAF6E3] flex items-center justify-center rounded-full">
                  <span className="text-[#667A62] text-xl">{steps[currentStep].icon}</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2C3E2B]">{steps[currentStep].title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{steps[currentStep].description}</p>
                </div>
                {completedSections[steps[currentStep].key] && currentStep !== steps.length - 1 && (
                  <div className="ml-auto">
                    <FiCheckCircle className="text-[#667A62] text-xl" />
                  </div>
                )}
              </div>

              {/* Step 0: Company Details */}
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.companyName ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter your company name"
                    />
                    {errors.companyName && <p className="text-red-500 text-[9px] mt-1">{errors.companyName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">CIN Number</label>
                    <input
                      type="text"
                      name="cinNumber"
                      value={formData.cinNumber}
                      onChange={handleChange}
                      className="form-input w-full p-3 text-sm border-gray-200"
                      placeholder="Enter CIN number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Industry Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.industryType ? 'border-red-500' : 'border-gray-200'}`}
                    >
                      <option value="">Select Industry Type</option>
                      {industryTypes.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.industryType && <p className="text-red-500 text-[9px] mt-1">{errors.industryType}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">Website URL</label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      className="form-input w-full p-3 text-sm border-gray-200"
                      placeholder="https://www.example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      CSR Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="csrRegistrationNumber"
                      value={formData.csrRegistrationNumber}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.csrRegistrationNumber ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter CSR registration number"
                    />
                    {errors.csrRegistrationNumber && <p className="text-red-500 text-[9px] mt-1">{errors.csrRegistrationNumber}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.panNumber ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter PAN number"
                    />
                    {errors.panNumber && <p className="text-red-500 text-[9px] mt-1">{errors.panNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Budget Required (₹)
                    </label>
                    <input
                      type="number"
                      name="budgetRequired"
                      value={formData.budgetRequired}
                      onChange={handleChange}
                      className="form-input w-full p-3 text-sm border-gray-200"
                      placeholder="Enter budget required"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      CSR Alignment
                    </label>
                    <select
                      name="csrAlignment"
                      value={formData.csrAlignment}
                      onChange={handleChange}
                      className="form-input w-full p-3 text-sm border-gray-200"
                    >
                      <option value="">Select CSR Alignment</option>
                      {csrAlignments.map((alignment, idx) => (
                        <option key={idx} value={alignment}>{alignment}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 1: Contact Person Details */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.applicantName ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter full name"
                    />
                    {errors.applicantName && <p className="text-red-500 text-[9px] mt-1">{errors.applicantName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Designation / Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.role ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter your designation"
                    />
                    {errors.role && <p className="text-red-500 text-[9px] mt-1">{errors.role}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Official Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter official email"
                    />
                    {errors.email && <p className="text-red-500 text-[9px] mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.mobileNumber ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter 10-digit mobile number"
                    />
                    {errors.mobileNumber && <p className="text-red-500 text-[9px] mt-1">{errors.mobileNumber}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Office Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className={`form-input w-full p-3 text-sm ${errors.address ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter complete office address"
                    />
                    {errors.address && <p className="text-red-500 text-[9px] mt-1">{errors.address}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: CSR Interest Details */}
              {currentStep === 2 && (
                <div>
                  {/* Selected Interests Display */}
                  {formData.csrInterests.length > 0 && (
                    <div className="mb-5">
                      <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-2 uppercase tracking-wider">Selected Interests:</label>
                      <div className="flex flex-wrap gap-2">
                        {formData.csrInterests.map((interest, idx) => (
                          <span key={idx} className="selected-interest-tag inline-flex items-center gap-1 px-3 py-1.5 bg-[#EAF6E3] text-[#667A62] rounded text-xs">
                            {getInterestLabel(interest)}
                            <button type="button" onClick={() => handleRemoveInterest(interest)} className="hover:text-red-500 ml-1">
                              <FiX size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-3 uppercase tracking-wider">
                      Area of CSR Interest <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {csrInterestsList.map((interest, idx) => (
                        <label key={idx} className="interest-chip flex items-center gap-3 p-3 border border-gray-200 cursor-pointer hover:border-[#667A62] transition-all rounded">
                          <input
                            type="checkbox"
                            name="csrInterests"
                            value={interest.name}
                            checked={formData.csrInterests.includes(interest.name)}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-300 text-[#667A62] focus:ring-[#667A62]"
                          />
                          <div className={`w-8 h-8 ${interest.color} rounded-full flex items-center justify-center text-base`}>
                            {interest.icon}
                          </div>
                          <span className="text-sm font-medium text-[#2C3E2B]">{interest.label}</span>
                        </label>
                      ))}
                      
                      {/* Other Option - Checkbox */}
                      <label className="interest-chip flex items-center gap-3 p-3 border border-gray-200 cursor-pointer hover:border-[#667A62] transition-all rounded">
                        <input
                          type="checkbox"
                          checked={showOtherInput}
                          onChange={(e) => {
                            setShowOtherInput(e.target.checked);
                            if (!e.target.checked) {
                              setOtherInterest('');
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#667A62] focus:ring-[#667A62]"
                        />
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-base">
                          <FiPlus className="text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-[#2C3E2B]">Other (Please specify)</span>
                      </label>
                    </div>
                    
                    {/* Other Interest Input Field */}
                    {showOtherInput && (
                      <div className="mt-4 flex gap-3">
                        <input
                          type="text"
                          value={otherInterest}
                          onChange={(e) => setOtherInterest(e.target.value)}
                          placeholder="Enter your specific area of interest..."
                          className="flex-1 form-input p-3 text-sm border-gray-200 rounded"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={handleAddOtherInterest}
                          className="px-5 py-2 bg-[#667A62] text-white text-sm font-semibold hover:bg-[#4A5C46] transition-all rounded"
                        >
                          Add
                        </button>
                      </div>
                    )}
                    
                    {errors.csrInterests && <p className="text-red-500 text-[9px] mt-2">{errors.csrInterests}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Funding Intent */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Proposed CSR Budget (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="proposedCsrBudget"
                      value={formData.proposedCsrBudget}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.proposedCsrBudget ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter proposed budget"
                    />
                    {errors.proposedCsrBudget && <p className="text-red-500 text-[9px] mt-1">{errors.proposedCsrBudget}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Preferred Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="preferredProjectType"
                      value={formData.preferredProjectType}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.preferredProjectType ? 'border-red-500' : 'border-gray-200'}`}
                    >
                      <option value="">Select Project Type</option>
                      {projectTypes.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.preferredProjectType && <p className="text-red-500 text-[9px] mt-1">{errors.preferredProjectType}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Preferred Project Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="preferredProjectLocation"
                      value={formData.preferredProjectLocation}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.preferredProjectLocation ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter preferred location"
                    />
                    {errors.preferredProjectLocation && <p className="text-red-500 text-[9px] mt-1">{errors.preferredProjectLocation}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                      Timeline for CSR Activity <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="timelineForCsrActivity"
                      value={formData.timelineForCsrActivity}
                      onChange={handleChange}
                      className={`form-input w-full p-3 text-sm ${errors.timelineForCsrActivity ? 'border-red-500' : 'border-gray-200'}`}
                    >
                      <option value="">Select Timeline</option>
                      {timelines.map((timeline, idx) => (
                        <option key={idx} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                    {errors.timelineForCsrActivity && <p className="text-red-500 text-[9px] mt-1">{errors.timelineForCsrActivity}</p>}
                  </div>
                </div>
              )}

              {/* Step 4: Meeting Schedule */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-2 uppercase tracking-wider">
                      Preferred Meeting Mode <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-3">
                      {meetingModes.map((mode, idx) => (
                        <label key={idx} className="flex-1 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredMeetingMode"
                            value={mode.value}
                            checked={formData.preferredMeetingMode === mode.value}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className={`p-3 border rounded-lg text-center transition-all ${formData.preferredMeetingMode === mode.value ? 'border-[#667A62] bg-[#EAF6E3]' : 'border-gray-200 hover:border-[#667A62]'}`}>
                            <span className="text-2xl block mb-1">{mode.icon}</span>
                            <span className="text-xs font-medium">{mode.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.preferredMeetingMode && <p className="text-red-500 text-[9px] mt-1">{errors.preferredMeetingMode}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`form-input w-full p-3 text-sm ${errors.preferredDate ? 'border-red-500' : 'border-gray-200'}`}
                      />
                      {errors.preferredDate && <p className="text-red-500 text-[9px] mt-1">{errors.preferredDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                        Preferred Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`form-input w-full p-3 text-sm ${errors.preferredTime ? 'border-red-500' : 'border-gray-200'}`}
                      />
                      {errors.preferredTime && <p className="text-red-500 text-[9px] mt-1">{errors.preferredTime}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">Alternate Date & Time</label>
                      <input
                        type="text"
                        name="alternateDateTime"
                        value={formData.alternateDateTime}
                        onChange={handleChange}
                        className="form-input w-full p-3 text-sm border-gray-200"
                        placeholder="e.g., July 25, 2024 at 3:00 PM"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">
                        Purpose of Meeting <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="purposeOfMeeting"
                        value={formData.purposeOfMeeting}
                        onChange={handleChange}
                        rows="3"
                        className={`form-input w-full p-3 text-sm ${errors.purposeOfMeeting ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Please describe the purpose of this meeting"
                      />
                      {errors.purposeOfMeeting && <p className="text-red-500 text-[9px] mt-1">{errors.purposeOfMeeting}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Additional Information & Declaration */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C3E2B] mb-1 uppercase tracking-wider">Specific Requirements / Expectations</label>
                    <textarea
                      name="specificRequirements"
                      value={formData.specificRequirements}
                      onChange={handleChange}
                      rows="4"
                      className="form-input w-full p-3 text-sm border-gray-200"
                      placeholder="Any specific requirements or expectations from the meeting"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="declaration"
                        checked={formData.declaration}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-[#667A62] focus:ring-[#667A62] mt-0.5"
                      />
                      <span className="text-sm text-gray-600">
                        We confirm that the above information is accurate and we are interested in collaborating with 
                        Maha Shree Rudra Samsthanam Foundation under CSR initiatives.
                      </span>
                    </label>
                    {errors.declaration && <p className="text-red-500 text-[9px] mt-2">{errors.declaration}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="p-6 bg-[#F7F9F5] border-t border-[#EAF6E3] flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className={`px-6 py-2.5 font-semibold text-sm transition-all flex items-center gap-2 ${
                  currentStep === 0 
                    ? 'invisible' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#667A62] hover:text-[#667A62]'
                }`}
                disabled={currentStep === 0}
              >
                <FiArrowLeft size={14} /> Previous
              </button>
              
              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-[#667A62] text-white font-semibold text-sm hover:bg-[#4A5C46] transition-all flex items-center gap-2 btn-glow disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Submitting... <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                  ) : (
                    <>Submit Meeting Request <FiSend size={14} /></>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#667A62] text-white font-semibold text-sm hover:bg-[#4A5C46] transition-all flex items-center gap-2"
                >
                  Next <FiArrowRight size={14} />
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-[#6F8770] px-8 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-6 rounded-lg">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Need Help With Your CSR Strategy?
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Our team is here to assist you with any questions about CSR partnerships and funding opportunities.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <Link 
                href="/contact"
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-md hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                Contact Us 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="modal-overlay" onClick={closePopup}>
          <div className="modal-content bg-white max-w-md w-full mx-4 p-6 text-center rounded-lg" onClick={(e) => e.stopPropagation()}>
            <div className="success-checkmark mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FiCheckCircle className="text-green-500 text-3xl" />
              </div>
            </div>
            
            <h2 className="font-serif text-xl font-bold text-[#2C3E2B] mb-2">Meeting Request Submitted!</h2>
            
            <div className="bg-[#F7F9F5] p-3 mb-4 rounded">
              <p className="text-[#667A62] font-semibold text-sm mb-1">✨ We'll Contact You Within 24 Hours ✨</p>
              <p className="text-[10px] text-gray-500">
                Our team will review your request and reach out to confirm the meeting schedule.
              </p>
            </div>
            
            <div className="text-left space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[11px]">
                <FiMail className="text-[#667A62] text-sm" />
                <span className="text-gray-500">Confirmation email will be sent to: <strong>{formData.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <FiPhone className="text-[#667A62] text-sm" />
                <span className="text-gray-500">We'll call you on: <strong>{formData.mobileNumber}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <FiCalendar className="text-[#667A62] text-sm" />
                <span className="text-gray-500">Meeting requested for: <strong>{formData.preferredDate} at {formData.preferredTime}</strong></span>
              </div>
            </div>
            
            <button
              onClick={closePopup}
              className="w-full py-2.5 bg-[#667A62] text-white text-sm font-semibold hover:bg-[#4A5C46] transition-all flex items-center justify-center gap-2 rounded"
            >
              <FiCheckCircle size={14} /> Got it, Thank You!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeeting;