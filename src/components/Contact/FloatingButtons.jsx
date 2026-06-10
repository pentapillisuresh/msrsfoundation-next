// components/Contact/FloatingContactButtons.jsx
"use client";

import React, { useState } from 'react';

const FloatingContactButtons = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  
  // Update these with your actual contact information
  const phoneNumber = '7981410226';
  const whatsappNumber = '7981410226';
  const emailAddress = 'contact@rudrasamsthanam.org';

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button with Popup */}
      <div className="relative">
        <button
          onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
          className="w-14 h-14  transition-all duration-300 flex items-center justify-center group"
          aria-label="WhatsApp us"
        >
          <img
            src="/images/whatsapp.png"
            alt="WhatsApp"
            className="w-12 h-12 group-hover:scale-110 transition-transform"
          />
        </button>
        
        {/* WhatsApp Chat Popup */}
        {isWhatsAppOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsWhatsAppOpen(false)}
            />
            
            {/* Popup */}
            <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up mb-2">
              {/* Header */}
              <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">MSRS Foundation</div>
                    <div className="text-xs text-green-200">Online | Typically replies instantly</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="text-white text-2xl hover:text-gray-200 transition w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              
              {/* Body */}
              <div 
                className="p-4 min-h-[120px]"
                style={{
                  backgroundImage: "url('https://www.transparenttextures.com/patterns/light-paper.png')",
                  backgroundColor: '#e5ddd5'
                }}
              >
                <div className="bg-white p-3 rounded-lg inline-block max-w-[85%] shadow-sm">
                  <p className="text-sm text-gray-800">
                    Hi 👋<br />
                    How can we help you today?
                  </p>
                </div>
              </div>
              
              {/* Footer */}
              <button
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] text-white py-3.5 font-semibold hover:bg-[#20b954] transition-colors flex items-center justify-center gap-2"
              >
                <span>Start Chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Call Button */}
      <button
        onClick={handleCall}
        className="w-12 h-12 hover:scale-110  transition-all duration-300 flex items-center justify-center group"
        aria-label="Call us"
      >
       <img src="/images/apple.png"/>
      </button>

      {/* Gmail Button */}
      <button
        onClick={handleEmail}
        className="w-12 h-12  transition-all duration-300 flex items-center justify-center group"
        aria-label="Email us"
      >
        <img src="/images/gmail2.png"/>
      </button>

      {/* Add custom animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FloatingContactButtons;