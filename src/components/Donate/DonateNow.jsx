"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiBook, FiHeart, FiUser, FiMail, FiPhone, FiHome, FiMessageSquare, 
  FiShield, FiLock, FiChevronRight, FiChevronDown, FiAlertTriangle, 
  FiDroplet, FiAward, FiCalendar, FiArrowRight, FiCheckCircle, FiX,
  FiTool, FiGlobe, FiSun, FiBriefcase, FiStar, FiWind, FiRefreshCw,
  FiArrowLeft, FiCheck
} from 'react-icons/fi';
import { 
  FaAppleAlt, FaHospitalUser, FaYinYang, FaFemale, FaTree, FaDonate, 
  FaUniversity, FaPaw, FaHandHoldingHeart, FaChild, FaSeedling, FaRegSmile,
  FaWater, FaUsers, FaLandmark, FaHandsHelping, FaRupeeSign
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DonateNow = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  // --- Base URL Configuration ---
  const BASE_URL = 'http://localhost:3000/api';

  // --- Step Management ---
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  // --- State Management ---
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState("Sponsor a Child's Education");
  const [citizenship, setCitizenship] = useState('Indian Citizen');
  const [donationType, setDonationType] = useState('Once');
  const [amount, setAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [request80G, setRequest80G] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  // Captcha State
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaValue, setCaptchaValue] = useState(0);
  
  const [donorDetails, setDonorDetails] = useState({
    name: '', email: '', phone: '', address: '', pan: '', dob: ''
  });

  // Razorpay keys from environment variables
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_SvvOkzajMe9lbG';

  // Map frontend categories to backend cause names
  const getCauseFromCategory = (categoryId, subCategoryName) => {
    const categoryMap = {
      1: "Food & Nutrition",
      2: "CSR Initiatives",
      3: "Disaster Relief",
      4: "Education Support",
      5: "Environment",
      6: "General Fund",
      7: "Goshala Seva",
      8: "Healthcare",
      9: "Infrastructure",
      10: "Rural Development",
      11: "Spiritual & Culture",
      12: "Women & Child",
      13: "Youth Development",
      14: "Sanitation",
      15: "Drinking Water",
      16: "Senior Citizens",
      17: "Livelihood",
      18: "Social Awareness"
    };
    return categoryMap[categoryId] || "Education Support";
  };

  // Map frontend citizenship to backend format
  const getCitizenshipForBackend = (citizenType) => {
    const map = {
      'Indian Citizen': 'Indian',
      'NRI': 'NRI',
      'Foreign National': 'Foreign'
    };
    return map[citizenType] || 'Indian';
  };

  // Map frontend donation type to backend format
  const getDonationTypeForBackend = (type) => {
    return type === 'Once' ? 'once' : 'monthly';
  };

  const generateCaptcha = () => {
    const randomNum1 = Math.floor(Math.random() * 10) + 1;
    const randomNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(randomNum1);
    setNum2(randomNum2);
    setCaptchaValue(randomNum1 + randomNum2);
    setCaptchaInput('');
    setCaptchaError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedSubCategory) {
      setCompletedSteps(prev => ({ ...prev, step1: true }));
    }
    if ((amount > 0 || customAmount) && donationType && citizenship) {
      setCompletedSteps(prev => ({ ...prev, step2: true }));
    }
    if (donorDetails.name && donorDetails.email) {
      setCompletedSteps(prev => ({ ...prev, step3: true }));
    }
  }, [selectedCategory, selectedSubCategory, amount, customAmount, donationType, citizenship, donorDetails.name, donorDetails.email]);

  const donationCategories = [
    { id: 1, title: "Food & Nutrition", icon: <FaAppleAlt />, impact: "₹1,000 feeds 50 people", subCategories: [
        { name: "Daily Meals for Needy", impact: "₹500 feeds 25" },
        { name: "Festival Annadanam Sponsorship", impact: "₹10,000/feast" },
        { name: "Midday Meal Programs", impact: "₹2,000/month" },
        { name: "Emergency Food Relief", impact: "₹5,000/kit" },
        { name: "Nutrition for Malnourished Children", impact: "₹3,000/child" },
        { name: "Maternal Nutrition Support", impact: "₹2,500/month" }
    ]},
    { id: 2, title: "CSR Initiatives", icon: <FiBriefcase />, impact: "Custom impact reports", subCategories: [
        { name: "Corporate Social Responsibility Projects", impact: "Custom" },
        { name: "Adopt a Village / School", impact: "Long-term" },
        { name: "Employee Engagement Programs", impact: "Volunteering" },
        { name: "Long-term Partnership Projects", impact: "Sustainable" },
        { name: "CSR Tax Benefits Documentation", impact: "Annual Report" },
        { name: "Impact Assessment Reports", impact: "Quarterly" }
    ]},
    { id: 3, title: "Disaster Relief", icon: <FiAlertTriangle />, impact: "₹2,000 for emergency kit", subCategories: [
        { name: "Flood / Cyclone Relief", impact: "₹20,000/family" },
        { name: "Earthquake Response", impact: "₹50,000" },
        { name: "Emergency Response Fund", impact: "₹50,000" },
        { name: "Rehabilitation Support", impact: "₹30,000" },
        { name: "Crisis Food & Shelter", impact: "₹5,000" },
        { name: "Medical Emergency Response Teams", impact: "₹25,000" }
    ]},
    { id: 4, title: "Education Support", icon: <FiBook />, impact: "₹5,000 supports 1 child for 3 months", subCategories: [
        { name: "Sponsor a Child's Education", impact: "₹3,000/month" },
        { name: "School Infrastructure Development", impact: "₹50,000 setup" },
        { name: "Books, Uniforms & Materials", impact: "₹1,500/student" },
        { name: "Digital Learning & Smart Classes", impact: "₹25,000 setup" },
        { name: "Merit & Need-Based Scholarships", impact: "₹10,000/year" },
        { name: "Vocational Training Programs", impact: "₹15,000/course" }
    ]},
    { id: 5, title: "Environment", icon: <FiDroplet />, impact: "₹500 plants a tree", subCategories: [
        { name: "Tree Plantation Drives", impact: "₹5,000/100 trees" },
        { name: "Water Conservation Projects", impact: "₹25,000" },
        { name: "Clean India Initiatives", impact: "₹10,000" },
        { name: "Sustainable Development Programs", impact: "₹30,000" },
        { name: "Plastic Waste Management", impact: "₹15,000" },
        { name: "Renewable Energy Projects", impact: "₹50,000" }
    ]},
    { id: 6, title: "General Fund", icon: <FaDonate />, impact: "100% to critical needs", subCategories: [
        { name: "Support Any Ongoing Initiative", impact: "Flexible" },
        { name: "Flexible Fund Allocation", impact: "Urgent Needs" },
        { name: "Operational & Administrative Support", impact: "Smooth Operations" },
        { name: "Emergency General Assistance", impact: "Immediate" },
        { name: "Unforeseen Crisis Support", impact: "As Needed" }
    ]},
    { id: 7, title: "Goshala Seva", icon: <FaPaw />, impact: "₹1,000 feeds a cow/month", subCategories: [
        { name: "Cow Feeding Seva", impact: "₹500/month" },
        { name: "Goshala Maintenance", impact: "₹10,000" },
        { name: "Medical Care for Cows", impact: "₹2,000" },
        { name: "Rescue & Protection", impact: "₹5,000" },
        { name: "Adopt a Cow Program", impact: "₹1,500/month" },
        { name: "Animal Shelter Support", impact: "₹7,500" }
    ]},
    { id: 8, title: "Healthcare", icon: <FaHospitalUser />, impact: "₹2,000 supports a camp", subCategories: [
        { name: "Free Medical Camps", impact: "₹10,000/camp" },
        { name: "Medicines for the Poor", impact: "₹1,000/patient" },
        { name: "Support for Surgeries", impact: "₹25,000/surgery" },
        { name: "Health Awareness Programs", impact: "₹5,000/program" },
        { name: "Mental Health Support", impact: "₹3,000/session" },
        { name: "Preventive Health Checkups", impact: "₹2,000/person" }
    ]},
    { id: 9, title: "Infrastructure", icon: <FiHome />, impact: "₹1,00,000 builds a classroom", subCategories: [
        { name: "School & Classroom Construction", impact: "₹2,00,000" },
        { name: "Hospital & Medical Facility Setup", impact: "₹5,00,000" },
        { name: "Ashramam & Spiritual Center Development", impact: "₹3,00,000" },
        { name: "Drinking Water Infrastructure", impact: "₹50,000" },
        { name: "Community Halls & Public Utility", impact: "₹1,50,000" },
        { name: "Road & Pathway Development", impact: "₹75,000" }
    ]},
    { id: 10, title: "Rural Development", icon: <FaTree />, impact: "₹10,000 for village development", subCategories: [
        { name: "Village Development Projects", impact: "₹50,000" },
        { name: "Clean Water Initiatives", impact: "₹30,000/tank" },
        { name: "Sanitation & Hygiene Programs", impact: "₹15,000/toilet" },
        { name: "Skill Development for Youth", impact: "₹20,000" },
        { name: "Farmers Support Programs", impact: "₹25,000" },
        { name: "Rural Entrepreneurship", impact: "₹35,000" }
    ]},
    { id: 11, title: "Spiritual & Culture", icon: <FaYinYang />, impact: "₹5,000 sponsors a puja", subCategories: [
        { name: "Temple Development & Maintenance", impact: "₹25,000" },
        { name: "Vedic & Spiritual Programs", impact: "₹10,000" },
        { name: "Yagnas, Pujas & Ritual Sponsorship", impact: "₹5,000" },
        { name: "Preservation of Indian Culture", impact: "₹15,000" },
        { name: "Moral & Ethical Value Education", impact: "₹7,500" },
        { name: "Spiritual Retreats & Camps", impact: "₹20,000" }
    ]},
    { id: 12, title: "Women & Child", icon: <FaFemale />, impact: "₹3,000 for livelihood", subCategories: [
        { name: "Women Empowerment Programs", impact: "₹10,000" },
        { name: "Child Protection & Care", impact: "₹5,000/child" },
        { name: "Nutrition Programs", impact: "₹2,000/month" },
        { name: "Support for Orphaned Children", impact: "₹4,000/month" },
        { name: "Self-Help Groups for Women", impact: "₹15,000" },
        { name: "Girl Child Education Support", impact: "₹3,000/year" }
    ]},
    { id: 13, title: "Youth Development", icon: <FaUsers />, impact: "₹5,000 trains a youth", subCategories: [
        { name: "Youth Leadership Programs", impact: "₹10,000" },
        { name: "Career Counseling", impact: "₹2,000/session" },
        { name: "Job Placement Assistance", impact: "₹5,000" },
        { name: "Entrepreneurship Development", impact: "₹15,000" },
        { name: "Soft Skills Training", impact: "₹3,000" },
        { name: "Internship Opportunities", impact: "₹7,500" }
    ]},
    { id: 14, title: "Sanitation", icon: <FiWind />, impact: "₹10,000 for toilets", subCategories: [
        { name: "Swachh Bharat Initiatives", impact: "₹10,000" },
        { name: "Community Toilet Construction", impact: "₹50,000" },
        { name: "Hygiene Awareness Drives", impact: "₹5,000" },
        { name: "Waste Segregation Programs", impact: "₹8,000" },
        { name: "Public Health Workshops", impact: "₹3,000" },
        { name: "Sanitary Pad Distribution", impact: "₹2,000/100" }
    ]},
    { id: 15, title: "Drinking Water", icon: <FaWater />, impact: "₹25,000 for RO plant", subCategories: [
        { name: "Borewell & Handpump Installation", impact: "₹30,000" },
        { name: "Water Purification Systems", impact: "₹20,000" },
        { name: "RO Water Plants", impact: "₹50,000" },
        { name: "Emergency Water Supply", impact: "₹5,000" },
        { name: "Water Tank Construction", impact: "₹25,000" },
        { name: "Basic Necessities Kits", impact: "₹2,000/kit" }
    ]},
    { id: 16, title: "Senior Citizens", icon: <FaHandHoldingHeart />, impact: "₹2,000 supports an elder", subCategories: [
        { name: "Elderly Care Programs", impact: "₹5,000" },
        { name: "Old Age Home Support", impact: "₹10,000" },
        { name: "Medical Assistance for Seniors", impact: "₹3,000" },
        { name: "Daily Needs Support", impact: "₹2,000/month" },
        { name: "Companionship Programs", impact: "₹1,500" },
        { name: "Pension Facilitation", impact: "₹500" }
    ]},
    { id: 17, title: "Livelihood", icon: <FiTool />, impact: "₹10,000 for skill training", subCategories: [
        { name: "Skill Training Programs", impact: "₹10,000" },
        { name: "Micro-Enterprise Support", impact: "₹15,000" },
        { name: "Tool & Equipment Distribution", impact: "₹5,000" },
        { name: "Business Mentorship", impact: "₹3,000" },
        { name: "Market Linkage Support", impact: "₹7,500" },
        { name: "Financial Literacy Workshops", impact: "₹2,000" }
    ]},
    { id: 18, title: "Social Awareness", icon: <FiGlobe />, impact: "₹5,000 for campaigns", subCategories: [
        { name: "Legal Awareness Camps", impact: "₹8,000" },
        { name: "Road Safety Campaigns", impact: "₹10,000" },
        { name: "Anti-Drug Drives", impact: "₹12,000" },
        { name: "Voter Awareness Programs", impact: "₹5,000" },
        { name: "Digital Literacy Campaigns", impact: "₹7,000" },
        { name: "Community Outreach Programs", impact: "₹15,000" }
    ]}
  ];

  const amountOptions = [1000, 2000, 5000, 10000, 15000, 25000, 50000, 100000];
  const currentCat = donationCategories.find(c => c.id === selectedCategory);

  const handleInputChange = (e) => {
    setDonorDetails({ ...donorDetails, [e.target.name]: e.target.value });
  };

  const validateCaptcha = () => {
    const userAnswer = parseInt(captchaInput);
    if (userAnswer === captchaValue) {
      setCaptchaError('');
      return true;
    } else {
      setCaptchaError('Incorrect captcha answer. Please try again.');
      return false;
    }
  };

  const validateStep = () => {
    if (currentStep === 1) {
      return selectedCategory && selectedSubCategory;
    }
    if (currentStep === 2) {
      return (amount > 0 || customAmount) && donationType && citizenship;
    }
    if (currentStep === 3) {
      return donorDetails.name && donorDetails.email;
    }
    if (currentStep === 4) {
      return agreeTerms && validateCaptcha();
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert('Please complete all required fields in this step before proceeding.');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize Razorpay payment
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (orderData) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPaymentError('Failed to load payment gateway. Please try again.');
      return false;
    }

    const options = {
      key: razorpayKeyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'MSRS Foundation',
      description: `Donation for ${orderData.cause}`,
      order_id: orderData.orderId,
      handler: async (response) => {
        try {
          const verifyRes = await fetch(`${BASE_URL}/donations/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donationId: orderData.donationId
            })
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.status === 'success') {
            setShowSuccessPopup(true);
            setIsProcessing(false);
            resetForm();
          } else {
            setPaymentError('Payment verification failed. Please contact support.');
            setIsProcessing(false);
          }
        } catch (error) {
          console.error('Verification error:', error);
          setPaymentError('Payment verification failed. Please contact support.');
          setIsProcessing(false);
        }
      },
      prefill: {
        name: donorDetails.name,
        email: donorDetails.email,
        contact: donorDetails.phone || ''
      },
      theme: {
        color: '#667A62'
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          setPaymentError('Payment was cancelled.');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    return true;
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedCategory(1);
    setSelectedSubCategory("Sponsor a Child's Education");
    setCitizenship('Indian Citizen');
    setDonationType('Once');
    setAmount(5000);
    setCustomAmount('');
    setRequest80G(false);
    setAgreeTerms(false);
    setDonorDetails({
      name: '', email: '', phone: '', address: '', pan: '', dob: ''
    });
    generateCaptcha();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCaptcha()) {
      return;
    }
    
    if (!agreeTerms) {
      alert('Please accept the Terms & Conditions to proceed with your donation.');
      return;
    }
    
    if (!donorDetails.name || !donorDetails.email) {
      alert('Please fill in your name and email address.');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    const finalAmount = Number(amount) || Number(customAmount);
    if (finalAmount <= 0) {
      alert('Please enter a valid donation amount.');
      setIsProcessing(false);
      return;
    }

    const cause = getCauseFromCategory(selectedCategory, selectedSubCategory);
    const backendCitizenship = getCitizenshipForBackend(citizenship);
    const backendDonationType = getDonationTypeForBackend(donationType);

    try {
      const response = await fetch(`${BASE_URL}/donations/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          citizenship: backendCitizenship,
          donationType: backendDonationType,
          cause: cause,
          description: selectedSubCategory,
          donationAmount: finalAmount,
          donerName: donorDetails.name,
          donerEmail: donorDetails.email,
          donerPhoneNumber: donorDetails.phone || '',
          panCard: donorDetails.pan || ''
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const paymentInitiated = await initiatePayment({
          orderId: data.data.orderId,
          amount: data.data.amount,
          currency: data.data.currency,
          cause: cause,
          donationId: data.data.donation.id
        });

        if (!paymentInitiated) {
          setIsProcessing(false);
        }
      } else {
        setPaymentError(data.message || 'Failed to create donation. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Donation error:', error);
      setPaymentError('Network error. Please check your connection and try again.');
      setIsProcessing(false);
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    resetForm();
  };

  const steps = [
    { number: 1, title: 'Choose Cause', icon: <FaHandHoldingHeart /> },
    { number: 2, title: 'Donation Details', icon: <FaRupeeSign /> },
    { number: 3, title: 'Personal Info', icon: <FiUser /> },
    { number: 4, title: 'Confirm & Pay', icon: <FiShield /> }
  ];

  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }

        .active-tab { 
          border-bottom: 2px solid #667A62; 
          background-color: white; 
          color: #2C3E2B !important; 
        }
        
        .tab-btn { 
          transition: all 0.3s ease; 
          min-width: 110px;
          flex-shrink: 0;
        }
        
        .subcat-card { 
          border: 1px solid #EAF6E3; 
          transition: all 0.3s ease; 
          border-radius: 16px;
        }
        
        .subcat-card:hover { 
          border-color: #667A62; 
          background: #EAF6E3; 
        }
        
        .subcat-selected { 
          border-color: #667A62; 
          background: #EAF6E3; 
        }
        
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-zoom { animation: subtle-zoom 20s infinite alternate linear; }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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

        .tabs-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        
        .tabs-scrollbar::-webkit-scrollbar-track {
          background: #EAF6E3;
          border-radius: 10px;
        }
        
        .tabs-scrollbar::-webkit-scrollbar-thumb {
          background: #667A62;
          border-radius: 10px;
        }
        
        .tabs-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4A5C46;
        }
        
        .step-content {
          animation: fadeInUp 0.5s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .success-checkmark {
          animation: checkmark 0.5s ease-in-out forwards;
        }
        
        @keyframes checkmark {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/donationbanner.png" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Donate Now Hero"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              MAKE A DIFFERENCE
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Online Donations
          </h1>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Support MSRS Foundation Initiatives - Your contribution can transform lives and create lasting impact
          </p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL PROGRESS BAR - STICKY WITH CONNECTING LINES */}
      <div className="sticky top-0 z-40 bg-white shadow-sm py-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center relative z-10">
                  <div 
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${currentStep > step.number 
                        ? 'bg-[#667A62] text-white' 
                        : currentStep === step.number 
                        ? 'bg-[#667A62] text-white ring-4 ring-[#667A62]/20' 
                        : 'bg-gray-100 text-gray-400'
                      }
                    `}
                  >
                    {currentStep > step.number ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      <span className="text-base font-bold">{step.number}</span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-semibold ${
                      currentStep >= step.number ? 'text-[#667A62]' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                
                {idx < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 rounded-full transition-all duration-500 ${
                      currentStep > step.number ? 'bg-[#667A62]' : 'bg-gray-200'
                    }`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN DONATION FORM */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              
              {/* STEP 1: Choose Cause */}
              {currentStep === 1 && (
                <div className="step-content space-y-6">
                  <div className="bg-white border border-[#EAF6E3] rounded-2xl overflow-hidden shadow-sm">
                    <div className="tabs-scrollbar overflow-x-auto overflow-y-hidden">
                      <div className="flex">
                        {donationCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setSelectedSubCategory(cat.subCategories[0].name);
                            }}
                            className={`tab-btn flex flex-col items-center justify-center p-4 gap-1 text-gray-500 transition-all ${selectedCategory === cat.id ? 'active-tab font-bold' : 'hover:bg-[#F7F9F5]'}`}
                          >
                            <span className="text-xl">{cat.icon}</span>
                            <span className="text-[9px] uppercase font-bold text-center leading-tight whitespace-nowrap">{cat.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#EAF6E3] shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#2C3E2B] mb-4">Select Specific Cause</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {currentCat.subCategories.map((sub, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedSubCategory(sub.name)}
                          className={`subcat-card p-3 text-left flex flex-col gap-0.5 rounded-xl transition-all ${selectedSubCategory === sub.name ? 'subcat-selected' : ''}`}
                        >
                          <span className="text-xs font-bold text-[#2C3E2B]">{sub.name}</span>
                          <span className="text-[9px] text-[#667A62] italic">{sub.impact}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#EAF6E3] to-[#F7F9F5] p-4 rounded-2xl border border-[#667A62]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#667A62] rounded-full flex items-center justify-center">
                        <FiStar className="text-white text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2C3E2B]">Your Impact</p>
                        <p className="text-sm text-[#667A62] font-serif">
                          {currentCat.subCategories.find(s => s.name === selectedSubCategory)?.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Donation Details */}
              {currentStep === 2 && (
                <div className="step-content space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#EAF6E3] shadow-sm">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Citizenship</h4>
                        <div className="flex flex-col gap-2">
                          {['Indian Citizen', 'NRI', 'Foreign National'].map(type => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer p-2 border border-transparent hover:bg-[#F7F9F5] rounded-xl transition-all">
                              <input type="radio" name="citizen" checked={citizenship === type} onChange={() => setCitizenship(type)} className="w-3.5 h-3.5 accent-[#667A62]" />
                              <span className="text-xs font-semibold">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Donation Type</h4>
                        <div className="flex gap-3">
                          {['Once', 'Monthly'].map(type => (
                            <button 
                              key={type}
                              type="button"
                              onClick={() => setDonationType(type)}
                              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${donationType === type ? 'bg-[#667A62] text-white' : 'bg-white text-gray-600 border border-[#EAF6E3] hover:border-[#667A62]'}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#EAF6E3] shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#2C3E2B] mb-1">Donation Amount</h3>
                    <p className="text-[9px] text-gray-400 mb-5 uppercase tracking-wider">Help us reach our goals</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                      {amountOptions.map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {setAmount(amt); setCustomAmount('');}}
                          className={`py-2 text-xs font-bold rounded-xl transition-all ${amount === amt ? 'bg-[#667A62] text-white' : 'border border-[#EAF6E3] text-gray-500 bg-white hover:border-[#667A62]'}`}
                        >
                          ₹{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667A62] font-bold text-base">₹</span>
                      <input 
                        type="number" 
                        placeholder="Enter Other Amount" 
                        className="w-full pl-8 pr-3 py-2 border border-dashed border-gray-300 focus:border-[#667A62] focus:outline-none bg-white rounded-xl transition-all text-sm"
                        value={customAmount}
                        onChange={(e) => {setCustomAmount(e.target.value); setAmount(0);}}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Personal Info */}
              {currentStep === 3 && (
                <div className="step-content space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#EAF6E3] shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#2C3E2B] mb-5">Personal Details</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Full Name *</label>
                        <input name="name" onChange={handleInputChange} type="text" className="w-full border-b py-1.5 outline-none focus:border-[#667A62] bg-transparent text-sm" placeholder="Full Name" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Email Address *</label>
                        <input name="email" onChange={handleInputChange} type="email" className="w-full border-b py-1.5 outline-none focus:border-[#667A62] bg-transparent text-sm" placeholder="Email Address" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Phone Number</label>
                        <input name="phone" onChange={handleInputChange} type="tel" className="w-full border-b py-1.5 outline-none focus:border-[#667A62] bg-transparent text-sm" placeholder="Phone Number" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase">PAN Card (For Tax Receipt)</label>
                        <input name="pan" onChange={handleInputChange} type="text" className="w-full border-b py-1.5 outline-none focus:border-[#667A62] bg-transparent uppercase text-sm" placeholder="PAN Card" />
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#F7F9F5] rounded-xl border border-[#EAF6E3]">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="80g" checked={request80G} onChange={(e) => setRequest80G(e.target.checked)} className="w-4 h-4 accent-[#667A62] cursor-pointer" />
                        <label htmlFor="80g" className="text-xs font-semibold text-[#2C3E2B]">I require an 80G Tax Exemption Certificate</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Confirm & Pay */}
              {currentStep === 4 && (
                <div className="step-content space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#EAF6E3] shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#2C3E2B] mb-4">Review Your Donation</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500">Cause:</span>
                        <span className="text-xs font-semibold text-[#2C3E2B]">{selectedSubCategory}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500">Donation Type:</span>
                        <span className="text-xs font-semibold text-[#2C3E2B]">{donationType}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500">Amount:</span>
                        <span className="text-xs font-semibold text-[#2C3E2B]">₹{(Number(amount) || Number(customAmount)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500">Name:</span>
                        <span className="text-xs font-semibold text-[#2C3E2B]">{donorDetails.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500">Email:</span>
                        <span className="text-xs font-semibold text-[#2C3E2B]">{donorDetails.email}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-xs text-gray-500">80G Certificate:</span>
                        <span className="text-xs font-semibold text-[#2C3E2B]">{request80G ? 'Yes' : 'No'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#F7F9F5] rounded-xl border border-[#EAF6E3]">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-[#667A62] to-[#4A5C46] px-4 py-2 rounded-lg shadow-sm">
                          <span className="text-white font-bold text-base tracking-wider">
                            {num1} + {num2} = ?
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                          title="Refresh Captcha"
                        >
                          <FiRefreshCw size={14} className="text-[#667A62]" />
                        </button>
                        <input 
                          type="text" 
                          value={captchaInput}
                          onChange={(e) => {
                            setCaptchaInput(e.target.value);
                            setCaptchaError('');
                          }}
                          className={`w-16 border-b outline-none text-center text-xs font-bold text-[#667A62] py-1.5 ${captchaError ? 'border-red-500' : 'border-gray-300 focus:border-[#667A62]'}`} 
                          maxLength="2"
                          placeholder="?"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="agreeTermsStep4" 
                          checked={agreeTerms} 
                          onChange={(e) => setAgreeTerms(e.target.checked)} 
                          className="w-4 h-4 accent-[#667A62] cursor-pointer" 
                        />
                        <label htmlFor="agreeTermsStep4" className="text-[9px] text-gray-500">
                          I agree to the{' '}
                          <button 
                            type="button"
                            onClick={() => setShowTermsModal(true)}
                            className="text-[#667A62] font-semibold underline"
                          >
                            Terms & Conditions
                          </button>
                        </label>
                      </div>
                    </div>
                    {captchaError && (
                      <p className="text-red-500 text-[9px] text-center">{captchaError}</p>
                    )}
                    {paymentError && (
                      <p className="text-red-500 text-xs text-center mt-2">{paymentError}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white border border-[#EAF6E3] rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-[#667A62] to-[#4A5C46] p-5 text-white text-center">
                    <FaHandHoldingHeart className="text-3xl mx-auto mb-3 floating-element" />
                    <h4 className="font-serif text-xl font-bold">Your Contribution</h4>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Cause</p>
                      <p className="text-xs font-bold text-[#2C3E2B] leading-tight">{selectedSubCategory}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Frequency</p>
                      <p className="text-xs font-bold text-[#667A62] uppercase tracking-tighter">{donationType} Donation</p>
                    </div>
                    
                    <div className="pt-3 border-t border-[#EAF6E3]">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-gray-500">Amount</span>
                        <span className="text-2xl font-bold text-[#2C3E2B]">₹{(Number(amount) || Number(customAmount)).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-2">
                      <div className="flex items-center gap-1 text-[8px] font-bold text-gray-400">
                        <FiLock /> 256-BIT SECURE PAYMENT
                      </div>
                      <div className="flex gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PP" className="h-3" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/Visa_2021.svg" alt="Visa" className="h-3" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/MasterCard_logo.svg" alt="MasterCard" className="h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F7F9F5] p-5 rounded-2xl border border-[#EAF6E3]">
                  <div className="flex gap-3">
                    <FiAward className="text-[#667A62] text-2xl shrink-0" />
                    <div>
                      <h5 className="font-serif font-bold text-[#2C3E2B] text-sm">Tax Benefits</h5>
                      <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                        MSRS Foundation is a registered Section 8 NGO. All donations are tax-exempt under Section 80G.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-xl hover:border-[#667A62] hover:text-[#667A62] transition-all flex items-center gap-2"
              >
                <FiArrowLeft size={14} /> Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-2.5 bg-[#667A62] text-white font-semibold text-sm rounded-xl hover:bg-[#4A5C46] transition-all flex items-center gap-2"
              >
                Next Step <FiArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isProcessing}
                className={`ml-auto px-8 py-2.5 bg-gradient-to-r from-[#667A62] to-[#4A5C46] text-white font-semibold text-sm rounded-xl hover:shadow-lg transition-all flex items-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiShield size={14} /> Complete Donation
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* CTA SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-[#6F8770] to-[#5A6E5B] px-8 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-6 rounded-2xl">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Need Help With Your Donation?
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Our team is here to assist you with any questions about the donation process.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <Link 
                href="/contact"
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-xl hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                Contact Us 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content bg-white max-w-2xl w-full mx-4 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#2C3E2B] to-[#1a2619] p-4 text-white flex items-center justify-between sticky top-0">
              <div className="flex items-center gap-2">
                <FiShield className="text-xl" />
                <h3 className="font-serif text-lg font-bold">Terms & Conditions</h3>
              </div>
              <button 
                onClick={() => setShowTermsModal(false)} 
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <FiX size={16} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">1. General Agreement</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  By making a donation to MSRS Foundation, you agree to the terms and conditions outlined below. 
                  These terms govern your use of our donation services and your relationship with our organization.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">2. Donations Are Voluntary</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All donations are made voluntarily. Once a donation is submitted, it is considered final and 
                  non-refundable unless otherwise stated under local laws or specific agreements.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">3. Use of Funds</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your donation will be used to support our mission, programs, and operations. While we strive to 
                  honor donor preferences, we reserve the right to allocate funds where they are most needed.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">4. Tax Deductibility</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Donations may be tax-deductible depending on your country's tax laws. We will provide a receipt, 
                  but it is your responsibility to consult a tax professional for proper filing.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">5. Privacy and Data Security</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We are committed to protecting your personal information. Your data will only be used for processing 
                  your donation, communication, and complying with legal obligations. We do not sell or share your 
                  information with third parties.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">6. Recurring Donations</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If you choose to make a recurring donation, you authorize us to charge your chosen payment method 
                  on a scheduled basis. You may cancel or update your recurring donation at any time by contacting us.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">7. Modifications</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We may update these terms from time to time. Continued use of our donation platform after changes 
                  implies acceptance of the new terms.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#2C3E2B] text-base mb-2">8. Contact Us</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If you have any questions about your donation or these terms, please contact us at:<br />
                  Email: msrsfoundation2025@gmail.com<br />
                  Phone: +91 XXXXX XXXXX<br />
                  Address: Visakhapatnam, Andhra Pradesh, India
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-[#F7F9F5] border-t border-[#EAF6E3]">
              <button 
                onClick={() => setShowTermsModal(false)}
                className="w-full py-2.5 bg-[#667A62] text-white text-sm font-semibold rounded-xl hover:bg-[#4A5C46] transition-all flex items-center justify-center gap-2"
              >
                <FiCheckCircle size={14} /> I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="modal-overlay" onClick={closePopup}>
          <div className="modal-content bg-white max-w-md w-full mx-4 p-6 text-center rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="success-checkmark mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FiCheckCircle className="text-green-500 text-3xl" />
              </div>
            </div>
            
            <h2 className="font-serif text-xl font-bold text-[#2C3E2B] mb-2">Thank You for Your Donation!</h2>
            
            <div className="bg-[#F7F9F5] p-3 mb-4 rounded-xl">
              <p className="text-[#667A62] font-semibold text-sm mb-1">✨ You're Making a Difference! ✨</p>
              <p className="text-[10px] text-gray-500">
                Your contribution will help transform lives. A confirmation email has been sent to your inbox.
              </p>
            </div>
            
            <div className="text-left space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[11px]">
                <FiMail className="text-[#667A62] text-sm" />
                <span className="text-gray-500">Receipt sent to: <strong>{donorDetails.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <FiAward className="text-[#667A62] text-sm" />
                <span className="text-gray-500">80G Certificate will be sent within 7 days</span>
              </div>
            </div>
            
            <button
              onClick={closePopup}
              className="w-full py-2.5 bg-[#667A62] text-white text-sm font-semibold rounded-xl hover:bg-[#4A5C46] transition-all flex items-center justify-center gap-2"
            >
              <FiCheckCircle size={14} /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateNow;