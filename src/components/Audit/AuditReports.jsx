"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  FiFileText, FiEye, FiCheckCircle, FiArrowRight, FiShield, 
  FiAward, FiCalendar, FiDownload, FiX, FiTrendingUp, FiPieChart,
  FiPhone, FiMail, FiAlertCircle, FiCopy, FiCheck
} from 'react-icons/fi';
import { FaRegFilePdf, FaCertificate, FaShieldAlt, FaChartLine, FaFileInvoice } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AuditReports = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });
  }, []);

  // State for verification popup
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    documentType: 'Audit Report',
    name: '',
    email: '',
    phoneNumber: '',
    country: 'India',
    state: '',
    district: '',
  });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [accessLogData, setAccessLogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  
  // State for report modal
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [reportToView, setReportToView] = useState(null);
  
  // State for documents from backend
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [documentsError, setDocumentsError] = useState(null);
  const [activeTab, setActiveTab] = useState('monthly');

  // Indian states and districts data
  const indiaData = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"]
  };

  const countries = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "UAE", "Singapore", "Other"];

  // Fetch documents from backend API by document type
  const fetchDocuments = async () => {
    setLoadingDocuments(true);
    setDocumentsError(null);
    
    try {
      // Fetch documents with type 'Audit Report' or similar
      const response = await fetch('http://localhost:3000/api/documents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('API Response from /api/documents:', data);
      
      if (data.success && data.data && data.data.data) {
        // Filter documents for Audit Reports (documentType includes 'Audit' or category is 'Audit Report')
        let filteredDocs = data.data.data.filter(doc => 
          doc.documentType === 'Audit Report' || 
          doc.documentType === 'Audit' ||
          doc.category === 'Audit Report' ||
          doc.documentType?.toLowerCase().includes('audit') ||
          doc.name?.toLowerCase().includes('audit') ||
          doc.name?.toLowerCase().includes('report')
        );
        
        // If no audit-specific docs, try to get all docs as fallback
        if (filteredDocs.length === 0) {
          filteredDocs = data.data.data;
        }
        
        // Transform backend data to frontend format with period categorization
        const transformedDocuments = filteredDocs.map(doc => {
          // Determine period type based on document name or year
          let period = doc.year?.toString() || new Date(doc.createdAt).getFullYear().toString();
          let type = 'monthly';
          let highlights = [];
          
          if (doc.name?.toLowerCase().includes('quarterly') || doc.description?.toLowerCase().includes('quarterly')) {
            type = 'quarterly';
            highlights = ['Projects: Data Pending', 'Beneficiaries: Data Pending', 'Fund Utilization: Pending'];
          } else if (doc.name?.toLowerCase().includes('half') || doc.description?.toLowerCase().includes('Half-Yearly')) {
            type = 'halfYearly';
            highlights = ['Total Projects: Data Pending', 'Total Beneficiaries: Data Pending', 'Funds Utilized: Pending'];
          } else if (doc.name?.toLowerCase().includes('annual') || doc.name?.toLowerCase().includes('yearly') || doc.description?.toLowerCase().includes('annual')) {
            type = 'yearly';
            highlights = ['Total Projects: Data Pending', 'Total Beneficiaries: Data Pending', 'Total Funds: Pending', 'CSR Partners: Pending'];
          } else {
            type = 'monthly';
            highlights = ['Revenue: Data Pending', 'Expenses: Data Pending', 'Surplus: Data Pending'];
          }
          
          return {
            id: doc.id,
            period: period,
            title: doc.name,
            description: doc.description || `${doc.documentType} Report for ${period}`,
            imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
            highlights: highlights,
            documentType: doc.documentType,
            type: type,
            documentPath: doc.documentPath,
            year: doc.year,
            createdAt: doc.createdAt,
            status: doc.status
          };
        });
        
        console.log('Transformed audit documents:', transformedDocuments);
        setDocuments(transformedDocuments);
      } else {
        console.error('Failed to fetch documents:', data);
        setDocumentsError('No audit reports found');
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setDocumentsError('Failed to load audit reports. Please try again later.');
      setDocuments([]);
    } finally {
      setLoadingDocuments(false);
    }
  };

  // Helper function to get file size
  const getFileSize = (path) => {
    if (!path) return 'N/A';
    const ext = path.split('.').pop()?.toLowerCase();
    const sizes = {
      'pdf': '245 KB',
      'doc': '189 KB', 
      'docx': '178 KB',
      'jpg': '156 KB',
      'png': '134 KB',
      'jpeg': '156 KB'
    };
    return sizes[ext] || '145 KB';
  };

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Check if user is already verified from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('msrs_verified_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const verifiedTime = new Date(user.verificationTimestamp);
      const now = new Date();
      const hoursDiff = (now - verifiedTime) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setUserData(user);
        setIsVerified(true);
      } else {
        localStorage.removeItem('msrs_verified_user');
      }
    }
    
    // Check URL params for showVerification
    const showVerification = searchParams.get('showVerification');
    if (showVerification === 'true') {
      setShowVerificationPopup(true);
    }
    
    // Fetch documents on component mount
    fetchDocuments();
  }, [searchParams]);

  // Create Access Log and get OTP from response
  const generateOTP = async () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.country === 'India' && (!formData.state || !formData.district)) {
      setError('Please select state and district');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const requestData = {
        documentType: formData.documentType,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim() || null,
        country: formData.country,
        state: formData.country === 'India' ? formData.state : null,
        district: formData.country === 'India' ? formData.district : null,
      };

      console.log('Sending request to backend:', requestData);

      const response = await fetch('http://localhost:3000/api/access-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Backend Response:', data);

      if (data.success) {
        setAccessLogData(data.data.accessLog);
        const receivedOtp = data.data.OTP;
        setGeneratedOtp(receivedOtp);
        setCountdown(60);
        setResendDisabled(true);
        setStep(2);
      } else {
        setError(data.message || 'Failed to generate OTP. Please try again.');
      }
    } catch (err) {
      console.error('Error creating access log:', err);
      setError('Failed to connect to server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP using backend API
  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const verificationData = {
        phoneNumber: formData.phoneNumber || formData.email,
        OTP: otp
      };

      console.log('Verifying OTP:', verificationData);

      const response = await fetch('http://localhost:3000/api/access-logs/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      const data = await response.json();
      console.log('Verification Response:', data);

      if (data.success && data.data.verified === true) {
        const userInfo = {
          ...formData,
          verifiedAt: new Date().toISOString(),
          userId: 'MSRS' + Date.now(),
          accessLogId: accessLogData?.id,
          otpVerified: true,
          verificationTimestamp: new Date().toISOString(),
          otpUsed: otp
        };
        
        localStorage.setItem('msrs_verified_user', JSON.stringify(userInfo));
        
        setUserData(userInfo);
        setIsVerified(true);
        setShowVerificationPopup(false);
        
        setStep(1);
        setOtp('');
        setGeneratedOtp('');
        setFormData({
          documentType: 'Audit Report',
          name: '',
          email: '',
          phoneNumber: '',
          country: 'India',
          state: '',
          district: '',
        });
        
        if (reportToView) {
          setSelectedReport({ ...reportToView, userData: userInfo });
          setShowModal(true);
          setReportToView(null);
        }
        
        alert('✅ OTP Verified Successfully! You can now view audit reports.');
      } else {
        setError('Invalid OTP. Please check and try again.');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (value) => {
    setFormData({ 
      ...formData, 
      country: value,
      state: '',
      district: ''
    });
  };

  const copyOtpToClipboard = () => {
    if (generatedOtp) {
      navigator.clipboard.writeText(generatedOtp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResendOTP = () => {
    if (!resendDisabled) {
      generateOTP();
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleViewReport = (report, type) => {
    setReportToView({ ...report, type });
    const storedUser = localStorage.getItem('msrs_verified_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const verifiedTime = new Date(user.verificationTimestamp);
      const now = new Date();
      const hoursDiff = (now - verifiedTime) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setSelectedReport({ ...report, userData: user, type });
        setShowModal(true);
        setReportToView(null);
      } else {
        localStorage.removeItem('msrs_verified_user');
        setIsVerified(false);
        setUserData(null);
        setShowVerificationPopup(true);
      }
    } else {
      setShowVerificationPopup(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
    setReportToView(null);
  };

  const closeVerificationPopup = () => {
    setShowVerificationPopup(false);
    setStep(1);
    setOtp('');
    setGeneratedOtp('');
    setError('');
    setReportToView(null);
    setFormData({
      documentType: 'Audit Report',
      name: '',
      email: '',
      phoneNumber: '',
      country: 'India',
      state: '',
      district: '',
    });
  };

  const clearVerification = () => {
    localStorage.removeItem('msrs_verified_user');
    setIsVerified(false);
    setUserData(null);
    alert('Verification cleared. Please verify again to view reports.');
  };

  const getDocumentUrl = (documentPath) => {
    if (!documentPath) return null;
    return `http://localhost:3000${documentPath}`;
  };

  // Get current reports based on active tab
  const getCurrentReports = () => {
    if (documents.length === 0) return [];
    
    switch(activeTab) {
      case 'monthly': return documents.filter(doc => doc.type === 'monthly');
      case 'quarterly': return documents.filter(doc => doc.type === 'quarterly');
      case 'halfYearly': return documents.filter(doc => doc.type === 'halfYearly');
      case 'yearly': return documents.filter(doc => doc.type === 'yearly');
      default: return documents.filter(doc => doc.type === 'monthly');
    }
  };

  // Get tab title
  const getTabTitle = () => {
    switch(activeTab) {
      case 'monthly': return 'Monthly Reports';
      case 'quarterly': return 'Quarterly Reports';
      case 'Half-Yearly': return 'Half-Yearly Reports';
      case 'yearly': return 'Yearly Reports';
      default: return 'Monthly Reports';
    }
  };

  // Get tab description
  const getTabDescription = () => {
    switch(activeTab) {
      case 'monthly': return 'Detailed monthly financial and activity reports';
      case 'quarterly': return 'Comprehensive quarterly performance analysis';
      case 'halfYearly': return 'Mid-year and year-end progress assessments';
      case 'yearly': return 'Annual comprehensive reports with financials and impact';
      default: return 'Detailed monthly financial and activity reports';
    }
  };

  const currentReports = getCurrentReports();

  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }

        .premium-gradient-text {
          background: linear-gradient(to right, #2C3E2B, #667A62, #8A9A87);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .report-card {
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          border: 1px solid #EAF6E3;
        }
        
        .report-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.12);
        }
        
        .stat-card {
          transition: all 0.4s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-card .stat-icon {
          transition: all 0.4s ease;
        }
        
        .stat-card:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .tab-button {
          transition: all 0.3s ease;
        }
        
        .tab-active {
          background: #667A62;
          color: white;
        }
        
        .tab-inactive {
          background: white;
          color: #4A5C46;
          border: 1px solid #EAF6E3;
        }
        
        .tab-inactive:hover {
          background: #EAF6E3;
        }
        
        .stagger-border {
          position: relative;
        }
        .stagger-border::after {
          content: '';
          position: absolute;
          top: 20px;
          left: 20px;
          right: -20px;
          bottom: -20px;
          border: 2px solid #667A62;
          z-index: -1;
          transition: all 0.5s ease;
        }
        .stagger-border:hover::after {
          top: 10px;
          left: 10px;
          right: -10px;
          bottom: -10px;
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
          50% { transform: translateY(-15px); }
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
        
        .report-watermark {
          position: relative;
          overflow: hidden;
        }
        
        .report-watermark::before {
          content: "VERIFIED";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 80px;
          font-weight: bold;
          color: rgba(102, 122, 98, 0.1);
          white-space: nowrap;
          pointer-events: none;
          z-index: 10;
        }
        
        .disable-select {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>

      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Audit Reports Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              TRANSPARENCY & ACCOUNTABILITY
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Reports Dashboard
          </h1>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Access our comprehensive monthly, quarterly, half-yearly, and yearly reports
          </p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* --- TAB NAVIGATION --- */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`tab-button px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded flex items-center gap-2 ${
                activeTab === 'monthly' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <FiCalendar size={14} />
              Monthly
            </button>
            <button
              onClick={() => setActiveTab('quarterly')}
              className={`tab-button px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded flex items-center gap-2 ${
                activeTab === 'quarterly' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <FiTrendingUp size={14} />
              Quarterly
            </button>
            <button
              onClick={() => setActiveTab('halfYearly')}
              className={`tab-button px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded flex items-center gap-2 ${
                activeTab === 'halfYearly' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <FiPieChart size={14} />
              Half-Yearly
            </button>
            <button
              onClick={() => setActiveTab('yearly')}
              className={`tab-button px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded flex items-center gap-2 ${
                activeTab === 'yearly' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <FaChartLine size={14} />
              Yearly
            </button>
          </div>
          
          {/* Verification Status Badge */}
          {isVerified && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 text-xs rounded-full">
                <FiCheckCircle size={12} />
                Verified User: {userData?.name}
                <button 
                  onClick={clearVerification}
                  className="ml-2 text-[10px] text-red-600 hover:text-red-800"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- REPORTS SECTION --- */}
      <section className="py-12 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mb-3">
              {getTabTitle()}
            </h2>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto mb-4"></div>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              {getTabDescription()}
            </p>
          </div>
          
          {loadingDocuments ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#667A62]"></div>
            </div>
          ) : documentsError ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-sm">{documentsError}</p>
              <button 
                onClick={fetchDocuments}
                className="mt-4 px-4 py-2 bg-[#667A62] text-white text-xs rounded hover:bg-[#4A5C46]"
              >
                Retry
              </button>
            </div>
          ) : currentReports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No {getTabTitle().toLowerCase()} found in the database.</p>
              <p className="text-xs text-gray-400 mt-2">Please add audit reports using the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentReports.map((report, index) => (
                <div 
                  key={report.id || index} 
                  className="report-card bg-white p-5 rounded-lg flex flex-col h-full"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#EAF6E3] flex items-center justify-center rounded flex-shrink-0">
                      <FiFileText className="text-[#667A62] text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#2C3E2B] text-sm truncate">{report.title}</h3>
                      <p className="text-[9px] text-gray-500">{report.period}</p>
                      <p className="text-[10px] text-gray-600 mt-1 line-clamp-2">{report.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F7F9F5] p-2 rounded mb-3 flex-1">
                    <p className="text-[9px] font-semibold text-[#667A62] mb-1">Key Highlights:</p>
                    <div className="flex flex-wrap gap-1">
                      {report.highlights.map((highlight, i) => (
                        <span key={i} className="text-[8px] bg-white px-1.5 py-0.5 text-gray-600 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleViewReport(report, activeTab)}
                    className="w-full px-3 py-1.5 bg-[#667A62] text-white text-[10px] font-semibold hover:bg-[#4A5C46] transition-all flex items-center justify-center gap-1 rounded"
                  >
                    <FiEye size={12} /> View Report
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- TRANSPARENCY SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
                OUR COMMITMENT
              </span>
              <div className="w-16 h-0.5 bg-[#667A62] mb-5"></div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mb-4">
                Commitment to Transparency
              </h2>
              <p className="text-[#4A5C46] text-sm leading-relaxed mb-6">
                We believe in complete transparency and accountability. All our financial records 
                and activity reports are regularly updated and made available for public access.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#667A62] text-sm" />
                  <span className="text-xs text-[#4A5C46]">Regular Monthly Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#667A62] text-sm" />
                  <span className="text-xs text-[#4A5C46]">Quarterly Performance Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#667A62] text-sm" />
                  <span className="text-xs text-[#4A5C46]">Half-Yearly Impact Assessments</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#667A62] text-sm" />
                  <span className="text-xs text-[#4A5C46]">Annual Comprehensive Reports</span>
                </div>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="stagger-border">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
                  alt="Transparency"
                  className="w-full h-[350px] object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-[#6F8770] px-8 md:px-12 py-10 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Need More Information?
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                For detailed queries or to request specific reports, please contact our documentation team.
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

      {/* --- REPORT MODAL --- */}
      {showModal && selectedReport && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content bg-white max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-lg" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#2C3E2B] p-4 text-white sticky top-0 z-20 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiFileText className="text-xl" />
                  <div>
                    <h3 className="font-serif text-base font-bold">
                      {selectedReport.type === 'monthly' ? 'Monthly Report' : 
                       selectedReport.type === 'quarterly' ? 'Quarterly Report' :
                       selectedReport.type === 'Half-Yearly' ? 'Half-Yearly Report' : 'Yearly Report'}
                    </h3>
                    <p className="text-[9px] text-white/70">{selectedReport.title}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="w-7 h-7 bg-white/10 flex items-center justify-center rounded hover:bg-white/20 transition">
                  <FiX size={14} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="report-watermark disable-select relative bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-[#667A62] rounded-lg overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#667A62]"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#667A62]"></div>
                </div>
                
                <div className="bg-[#667A62] text-white p-3 text-center">
                  <h2 className="font-serif text-xl font-bold">MSRS FOUNDATION</h2>
                  <p className="text-[9px] text-white/80">{selectedReport.title}</p>
                </div>
                
                <div className="p-6 text-center">
                  <div className="mb-4">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/1903/1903664.png" 
                      alt="Seal" 
                      className="w-16 h-16 mx-auto opacity-80"
                    />
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-3">This report is verified for</p>
                  
                  <h3 className="font-serif text-xl font-bold text-[#2C3E2B] mb-2 border-b-2 border-[#667A62] inline-block pb-1">
                    {selectedReport.userData?.name || userData?.name || 'Verified User'}
                  </h3>
                  
                  <p className="text-gray-600 text-xs mt-4 mb-3">Report Details:</p>
                  
                  <div className="bg-white p-3 mb-4 shadow-sm border border-gray-200 rounded">
                    <p className="font-bold text-[#667A62] text-sm">{selectedReport.title}</p>
                    <p className="text-[9px] text-gray-500">{selectedReport.description}</p>
                    <p className="text-[8px] text-gray-400 mt-1">Period: {selectedReport.period}</p>
                  </div>
                  
                  <div className="my-4 border border-gray-200 overflow-hidden rounded bg-gray-100 min-h-[200px] flex items-center justify-center p-4">
                    {selectedReport.documentPath ? (
                      <div className="text-center">
                        <FaRegFilePdf className="text-6xl text-[#667A62] mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-3">Document is available for download</p>
                        <a 
                          href={getDocumentUrl(selectedReport.documentPath)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#667A62] text-white text-xs rounded hover:bg-[#4A5C46] transition"
                        >
                          <FiDownload size={12} /> Download Report
                        </a>
                      </div>
                    ) : (
                      <div className="text-center">
                        <img 
                          src={selectedReport.imageUrl || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"}
                          alt={selectedReport.title}
                          className="w-full h-auto max-h-[300px] object-cover rounded"
                          draggable="false"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs text-left mt-4 p-3 bg-gray-50 rounded">
                    <div>
                      <span className="text-gray-500">Report Number:</span>
                      <p className="font-semibold text-[9px] break-all">{selectedReport.id?.substring(0, 8) || Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Date of Issue:</span>
                      <p className="font-semibold text-[9px]">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <p className="font-semibold text-[9px]">
                        {selectedReport.userData?.country === 'India' 
                          ? `${selectedReport.userData?.state || 'N/A'}, ${selectedReport.userData?.district || 'N/A'}, India`
                          : selectedReport.userData?.country || 'India'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-semibold text-[9px] break-all">{selectedReport.userData?.email || userData?.email}</p>
                    </div>
                  </div>
                  
                  {selectedReport.highlights && (
                    <div className="mt-3 p-2 bg-blue-50 rounded">
                      <p className="text-[8px] font-semibold text-blue-700 mb-1">Key Highlights:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {selectedReport.highlights.map((highlight, i) => (
                          <span key={i} className="text-[7px] bg-white px-1.5 py-0.5 text-gray-600 rounded">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-center">
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-[7px] text-gray-500 rounded">
                      QR Code
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-4">
                    <p className="text-center text-[7px] text-gray-400">
                      This is a digitally verified report. For verification, scan the QR code.
                    </p>
                    <p className="text-center text-[7px] text-gray-400 mt-0.5">
                      *Screenshots are disabled for security purposes*
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#2C3E2B] text-white p-2 text-center text-[7px]">
                  <p>Authorized Signature</p>
                  <p className="mt-0.5">MSRS Foundation - Government Registered</p>
                </div>
              </div>
              
              <div className="mt-5">
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 bg-[#667A62] text-white text-xs font-semibold hover:bg-[#4A5C46] transition flex items-center justify-center gap-2 rounded"
                >
                  <FiX size={12} /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- VERIFICATION POPUP --- */}
      {showVerificationPopup && !isVerified && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-white w-full max-w-md rounded-lg overflow-hidden shadow-2xl animate-[scaleUp_0.3s_ease]">
            <div className="bg-gradient-to-r from-[#2C3E2B] to-[#4A5C46] p-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiShield size={20} />
                  <h3 className="font-serif text-lg font-semibold">
                    {step === 1 ? 'Identity Verification' : 'OTP Verification'}
                  </h3>
                </div>
                <button 
                  onClick={closeVerificationPopup} 
                  className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200"
                >
                  <FiX size={16} />
                </button>
              </div>
              <p className="text-[11px] text-white/70 mt-1">
                {step === 1 ? 'Please provide your details for verification' : 'Enter the OTP to verify your identity'}
              </p>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 flex items-start gap-2">
                  <FiAlertCircle className="text-red-500 text-sm mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}
              
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-5 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <FiShield className="text-blue-600 text-sm flex-shrink-0" />
                    <p className="text-[10px] text-blue-800 leading-relaxed">
                      Government verified reports require identity confirmation via OTP on your registered email. Your information is secure and encrypted.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide block mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-[#667A62] focus:ring-1 focus:ring-[#667A62] outline-none transition" 
                        placeholder="Enter your full name" 
                      />
                    </div>
                    
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide block mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-[#667A62] focus:ring-1 focus:ring-[#667A62] outline-none transition" 
                        placeholder="you@example.com" 
                      />
                      <p className="text-[8px] text-gray-400 mt-1">OTP will be sent to this email address</p>
                    </div>
                    
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide block mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        value={formData.phoneNumber} 
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-[#667A62] focus:ring-1 focus:ring-[#667A62] outline-none transition" 
                        placeholder="Optional" 
                      />
                    </div>
                    
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide block mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select 
                        value={formData.country} 
                        onChange={(e) => handleCountryChange(e.target.value)} 
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:border-[#667A62] focus:ring-1 focus:ring-[#667A62] outline-none transition"
                      >
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    
                    {formData.country === 'India' && (
                      <>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide block mb-1">
                            State <span className="text-red-500">*</span>
                          </label>
                          <select 
                            value={formData.state} 
                            onChange={(e) => setFormData({...formData, state: e.target.value, district: ''})} 
                            className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:border-[#667A62] focus:ring-1 focus:ring-[#667A62] outline-none transition"
                          >
                            <option value="">Select State</option>
                            {Object.keys(indiaData).map(state => <option key={state} value={state}>{state}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide block mb-1">
                            District <span className="text-red-500">*</span>
                          </label>
                          <select 
                            value={formData.district} 
                            onChange={(e) => setFormData({...formData, district: e.target.value})} 
                            className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:border-[#667A62] focus:ring-1 focus:ring-[#667A62] outline-none transition" 
                            disabled={!formData.state}
                          >
                            <option value="">Select District</option>
                            {formData.state && indiaData[formData.state]?.map(district => <option key={district} value={district}>{district}</option>)}
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <button 
                    onClick={generateOTP} 
                    disabled={loading || !formData.name || !formData.email || (formData.country === 'India' && (!formData.state || !formData.district))} 
                    className="w-full mt-6 py-2.5 bg-gradient-to-r from-[#667A62] to-[#4A5C46] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating OTP...
                      </span>
                    ) : 'Generate OTP'}
                  </button>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiMail className="text-green-600 text-2xl" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium">OTP Generated Successfully!</p>
                    <p className="text-xs text-gray-500 mt-1">We've generated the OTP for</p>
                    <p className="text-sm font-semibold text-[#2C3E2B] mt-1">{formData.email}</p>
                    
                    {generatedOtp && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                        <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wide mb-2">Your One-Time Password</p>
                        <div className="flex items-center justify-center gap-3">
                          <p className="text-3xl font-bold tracking-wider text-[#2C3E2B] font-mono">{generatedOtp}</p>
                          <button 
                            onClick={copyOtpToClipboard}
                            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition shadow-sm"
                            title="Copy OTP"
                          >
                            {copied ? <FiCheck className="text-green-600" size={16} /> : <FiCopy size={16} />}
                          </button>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-2">Please enter this OTP to verify your identity</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide block mb-2">
                      Enter OTP <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={otp} 
                      onChange={handleOtpChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest font-mono focus:border-[#667A62] focus:ring-2 focus:ring-[#667A62] outline-none transition" 
                      placeholder="000000" 
                      maxLength={6}
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={() => {
                        setStep(1);
                        setError('');
                        setOtp('');
                      }} 
                      className="flex-1 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button 
                      onClick={verifyOTP} 
                      disabled={loading || otp.length !== 6}
                      className="flex-1 py-2.5 bg-gradient-to-r from-[#667A62] to-[#4A5C46] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </span>
                      ) : 'Verify OTP'}
                    </button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button 
                      onClick={handleResendOTP}
                      disabled={resendDisabled}
                      className="text-xs text-[#667A62] hover:text-[#4A5C46] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              )}
              
              <p className="text-[8px] text-gray-400 text-center mt-5 pt-3 border-t border-gray-100">
                Your information is encrypted and secure. We do not share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditReports;