"use client";

import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle, FiShield, FiPhone, FiMail, FiMapPin, FiGlobe } from 'react-icons/fi';
import { FaCertificate, FaUser, FaRegFlag } from 'react-icons/fa';

const VerificationPopup = ({ onClose, onSuccess, isOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    isIndian: true,
    countryName: '',
    state: '',
    district: '',
    otp: '',
    isOtpVerified: false
  });
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch states when country changes (for non-Indian users)
  useEffect(() => {
    if (!formData.isIndian && formData.countryName) {
      fetchStatesByCountry(formData.countryName);
    } else if (formData.isIndian) {
      // Reset states when switching to Indian citizen
      setStates([]);
      setDistricts([]);
      setFormData(prev => ({ ...prev, state: '', district: '' }));
    }
  }, [formData.countryName, formData.isIndian]);

  // Fetch districts ONLY for Indian users when state changes
  useEffect(() => {
    if (formData.isIndian && formData.state) {
      fetchDistrictsByState(formData.state);
    } else if (!formData.isIndian) {
      // Clear districts for non-Indian users
      setDistricts([]);
      setFormData(prev => ({ ...prev, district: '' }));
    }
  }, [formData.state, formData.isIndian]);

  // Fetch countries using REST Countries API
  const fetchCountries = async () => {
    setLoadingCountries(true);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
      const data = await response.json();
      const sortedCountries = data
        .map(country => country.name.common)
        .sort();
      setCountries(sortedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setCountries(['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'China', 'Brazil', 'South Africa']);
    } finally {
      setLoadingCountries(false);
    }
  };

  // Fetch states for a specific country (for non-Indian users)
  const fetchStatesByCountry = async (countryName) => {
    setLoadingStates(true);
    setFormData(prev => ({ ...prev, state: '', district: '' }));
    setDistricts([]); // Clear districts for non-Indian users
    
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: countryName }),
      });
      
      const data = await response.json();
      
      if (data.data && data.data.states) {
        const stateList = data.data.states.map(state => state.name);
        setStates(stateList);
      } else {
        setStates([]);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    } finally {
      setLoadingStates(false);
    }
  };

  // Fetch districts ONLY for Indian states
  const fetchDistrictsByState = async (stateName) => {
    setLoadingDistricts(true);
    setFormData(prev => ({ ...prev, district: '' }));
    
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          country: 'India',
          state: stateName 
        }),
      });
      
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        setDistricts(data.data);
      } else {
        const localDistricts = getLocalDistricts(stateName);
        setDistricts(localDistricts);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
      const localDistricts = getLocalDistricts(stateName);
      setDistricts(localDistricts);
    } finally {
      setLoadingDistricts(false);
    }
  };

  // Local fallback data for Indian districts
  const getLocalDistricts = (stateName) => {
    const indiaDistricts = {
      "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Anantapur", "Tirupati", "Kakinada"],
      "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Shimoga"],
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode"],
      "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "Shahdara", "Dwarka"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"],
      "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Meerut", "Ghaziabad", "Noida"],
      "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Darjeeling", "Kharagpur", "Malda"],
      "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara"],
      "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur"]
    };
    return indiaDistricts[stateName] || [];
  };

  // Fetch Indian states from API
  const fetchIndianStates = async () => {
    setLoadingStates(true);
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: 'India' }),
      });
      
      const data = await response.json();
      
      if (data.data && data.data.states) {
        const stateList = data.data.states.map(state => state.name);
        setStates(stateList);
      } else {
        setStates([
          "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu", "Delhi",
          "Gujarat", "Uttar Pradesh", "West Bengal", "Rajasthan", "Kerala",
          "Bihar", "Madhya Pradesh", "Punjab", "Haryana", "Telangana"
        ]);
      }
    } catch (error) {
      console.error('Error fetching Indian states:', error);
      setStates([
        "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu", "Delhi",
        "Gujarat", "Uttar Pradesh", "West Bengal", "Rajasthan", "Kerala"
      ]);
    } finally {
      setLoadingStates(false);
    }
  };

  // When Indian citizen is selected, fetch states
  useEffect(() => {
    if (formData.isIndian) {
      fetchIndianStates();
    } else {
      setStates([]);
      setDistricts([]);
      setFormData(prev => ({ ...prev, state: '', district: '' }));
    }
  }, [formData.isIndian]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendOtp = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    alert(`Your OTP is: ${otp}\n(This is a demo - in production, this would be sent via SMS to ${formData.phone})`);
  };

  const verifyOtp = () => {
    if (formData.otp === generatedOtp) {
      setFormData(prev => ({ ...prev, isOtpVerified: true }));
      alert('OTP verified successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!formData.isIndian && !formData.countryName) {
      alert('Please enter your country name');
      return;
    }
    
    if (formData.isIndian && (!formData.state || !formData.district)) {
      alert('Please select state and district');
      return;
    }
    
    if (!formData.isOtpVerified) {
      alert('Please verify your phone number with OTP');
      return;
    }
    
    const userData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      isIndian: formData.isIndian,
      countryName: formData.countryName,
      state: formData.state,
      district: formData.district,
      verifiedAt: new Date().toISOString()
    };
    
    localStorage.setItem('msrs_verified_user', JSON.stringify(userData));
    onSuccess(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[1000] flex items-center justify-center animate-fadeIn p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleUp">
        <div className="bg-gradient-to-r from-[#667A62] to-[#4A5C46] p-5 text-white sticky top-0 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <FaCertificate className="text-2xl" />
            <div>
              <h3 className="text-lg font-bold">Verify Your Identity</h3>
              <p className="text-xs opacity-90">Please complete verification to view reports</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
            <FiX size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
              <FaUser className="inline mr-2 text-[#667A62]" size={14} />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
              <FiPhone className="inline mr-2 text-[#667A62]" size={14} />
              Phone Number *
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
              {!formData.isOtpVerified && (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="px-4 py-2 bg-[#667A62] text-white rounded-lg hover:bg-[#4A5C46] transition text-sm font-semibold whitespace-nowrap"
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>
          
          {!formData.isOtpVerified && generatedOtp && (
            <div>
              <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">Enter OTP</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
          
          {formData.isOtpVerified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
              <p className="text-green-600 text-sm font-semibold">✓ Phone number verified successfully!</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
              <FiMail className="inline mr-2 text-[#667A62]" size={14} />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
              <FaRegFlag className="inline mr-2 text-[#667A62]" size={14} />
              Are you an Indian citizen? *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isIndian"
                  value="true"
                  checked={formData.isIndian === true}
                  onChange={() => setFormData(prev => ({ ...prev, isIndian: true, countryName: '', state: '', district: '' }))}
                  className="w-4 h-4 text-[#667A62] cursor-pointer"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isIndian"
                  value="false"
                  checked={formData.isIndian === false}
                  onChange={() => setFormData(prev => ({ ...prev, isIndian: false, state: '', district: '' }))}
                  className="w-4 h-4 text-[#667A62] cursor-pointer"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>
          
          {!formData.isIndian && (
            <>
              <div>
                <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
                  <FiGlobe className="inline mr-2 text-[#667A62]" size={14} />
                  Country *
                </label>
                <select
                  name="countryName"
                  value={formData.countryName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
                  required={!formData.isIndian}
                  disabled={loadingCountries}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {loadingCountries && <p className="text-xs text-gray-500 mt-1">Loading countries...</p>}
              </div>
              
              {formData.countryName && (
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
                    <FiMapPin className="inline mr-2 text-[#667A62]" size={14} />
                    State/Province *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
                    required={!formData.isIndian}
                    disabled={loadingStates}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {loadingStates && <p className="text-xs text-gray-500 mt-1">Loading states...</p>}
                </div>
              )}
            </>
          )}
          
          {formData.isIndian && (
            <>
              <div>
                <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
                  <FiMapPin className="inline mr-2 text-[#667A62]" size={14} />
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
                  required={formData.isIndian}
                  disabled={loadingStates}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {loadingStates && <p className="text-xs text-gray-500 mt-1">Loading states...</p>}
              </div>
              
              {formData.state && (
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E2B] mb-2">
                    <FiMapPin className="inline mr-2 text-[#667A62]" size={14} />
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667A62]"
                    required={formData.isIndian}
                    disabled={loadingDistricts}
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  {loadingDistricts && <p className="text-xs text-gray-500 mt-1">Loading districts...</p>}
                </div>
              )}
            </>
          )}
          
          <button
            type="submit"
            disabled={!formData.isOtpVerified}
            className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              formData.isOtpVerified
                ? 'bg-[#667A62] text-white hover:bg-[#4A5C46] transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiCheckCircle size={18} /> Verify & Access Reports
          </button>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <FiShield className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-800">Verification Benefits:</span>
            </div>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>✓ One-time verification only</li>
              <li>✓ Secure access to all reports</li>
              <li>✓ Your data is stored locally for convenience</li>
              <li>✓ No need to verify again on next visit</li>
            </ul>
          </div>
        </form>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease; }
        .animate-scaleUp { animation: scaleUp 0.3s ease; }
      `}</style>
    </div>
  );
};

export default VerificationPopup;