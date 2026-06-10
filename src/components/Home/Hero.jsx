"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const banners = [
    {
      id: 1,
      image: '/images/p.png',
      title: 'MSRS Foundation stands as a symbol of integrity, impact, and unwavering commitment to society.',
      subtitle: 'Under the distinguished leadership Director.',
      description: 'MSRS Foundation stands as a symbol of integrity, impact, and unwavering commitment to society.',
      layout: 'left'
    },
    {
      id: 2,
      image: '/images/banner5.jpg',
      title: 'National Building',
      subtitle: 'Stronger Nation, Brighter Future',
      description: "Contributing to India's growth story",
      layout: 'center'
    },
    {
      id: 3,
      image: '/images/banner8.jpg',
      title: 'Education & Empowerment',
      subtitle: 'Shaping Future Leaders',
      description: 'Quality education for every child',
      layout: 'center'
    },
    {
      id: 4,
      image: '/images/banner7.jpg',
      title: 'Environmental, Social, and Governance & Infrastructure & Yoga',
      subtitle: 'Sustainable Development & Wellness',
      description: 'Environmental Social Governance | Infrastructure Development | Holistic Wellness',
      layout: 'center'
    },
    {
      id: 5,
      image: '/images/banner6.jpg',
      title: 'Social Drives & Health Care',
      subtitle: 'Caring for Communities',
      description: 'Free health camps | Blood donation drives | Mental wellness programs',
      layout: 'center'
    },
    {
      id: 6,
      image: '/images/hands.jpg',
      title: 'Trust & CSR Partnership',
      subtitle: 'Collaborating for Sustainable Impact',
      description: 'Join hands with us for meaningful change',
      layout: 'center'
    },
  ];

  const handlePrev = useCallback(() => {
    if (swiperInstance && !isAnimating) {
      setIsAnimating(true);
      swiperInstance.slidePrev();
      setTimeout(() => setIsAnimating(false), 1300);
    }
  }, [swiperInstance, isAnimating]);

  const handleNext = useCallback(() => {
    if (swiperInstance && !isAnimating) {
      setIsAnimating(true);
      swiperInstance.slideNext();
      setTimeout(() => setIsAnimating(false), 1300);
    }
  }, [swiperInstance, isAnimating]);

  useEffect(() => {
    if (swiperInstance) {
      const handleSlideChange = () => {
        setActiveIndex(swiperInstance.realIndex);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1300);
      };
      swiperInstance.on('slideChange', handleSlideChange);
      return () => {
        swiperInstance.off('slideChange', handleSlideChange);
      };
    }
  }, [swiperInstance]);

  useEffect(() => {
    if (swiperInstance) {
      const progressBar = document.querySelector('.hero-progress-bar-fill');
      if (progressBar) {
        const updateProgress = () => {
          const progress = (swiperInstance.realIndex + 1) / banners.length * 100;
          progressBar.style.width = `${progress}%`;
        };
        updateProgress();
        swiperInstance.on('slideChange', updateProgress);
        return () => swiperInstance.off('slideChange', updateProgress);
      }
    }
  }, [swiperInstance, banners.length]);

  const renderImageAnimation = (banner, idx) => {
    const isActive = activeIndex === idx;
    const isFirstSlide = idx === 0;
    return (
      <div className="blur-scale-container">
        <div
          className={`blur-scale-bg ${isActive ? 'animate-blur-scale-in' : 'animate-blur-scale-out'} ${isFirstSlide ? 'first-slide-bg' : ''}`}
          style={{
            backgroundImage: `url(${banner.image})`,
          }}
        />
      </div>
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

        .hero-title {
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-family: 'Cormorant Garamond', serif !important;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-family: 'Playfair Display', serif !important;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        /* ========== BLUR SCALE ANIMATION (UNIFIED FOR ALL SLIDES) ========== */
        .blur-scale-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .blur-scale-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          will-change: transform, filter, opacity;
        }

        /* Move first slide image to the right */
        .first-slide-bg {
          background-position: 65% center !important;
        }

        .animate-blur-scale-in {
          animation: blurScaleIn 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-blur-scale-out {
          animation: blurScaleOut 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes blurScaleIn {
          0% {
            transform: scale(1.3);
            filter: blur(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            filter: blur(0);
            opacity: 1;
          }
        }

        @keyframes blurScaleOut {
          0% {
            transform: scale(1);
            filter: blur(0);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            filter: blur(20px);
            opacity: 0;
          }
        }

        /* Gradient Overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          pointer-events: none;
          z-index: 5;
        }

        /* Premium Text Reveal Animation - Slower */
        .hero-content {
          opacity: 0;
          animation: premiumReveal 1s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
          animation-delay: 0.4s;
        }

        @keyframes premiumReveal {
          0% {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* Staggered Text Animations - Slower */
        .category-tag {
          opacity: 0;
          animation: fadeSlideUp 0.7s ease forwards;
          animation-delay: 0.5s;
        }

        .hero-title {
          opacity: 0;
          animation: fadeSlideUp 0.8s ease forwards;
          animation-delay: 0.6s;
        }

        .hero-subtitle {
          opacity: 0;
          animation: fadeSlideUp 0.8s ease forwards;
          animation-delay: 0.8s;
        }

        .hero-description {
          opacity: 0;
          animation: fadeSlideUp 0.8s ease forwards;
          animation-delay: 1.0s;
        }

        .button-group {
          opacity: 0;
          animation: fadeSlideUp 0.8s ease forwards;
          animation-delay: 1.2s;
        }

        .founder-info {
          opacity: 0;
          animation: fadeSlideUp 0.8s ease forwards;
          animation-delay: 1.4s;
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Left aligned content for first slide */
        .left-aligned-content {
          text-align: left;
          max-width: 800px;
          margin-left: 0;
          margin-right: auto;
        }

        /* Quotation mark - only for first banner, directly above title */
        .quote-above-title {
          font-family: 'Playfair Display', serif !important;
          font-size: 3.5rem;
          color: #7A8E6B;
          line-height: 1;
          opacity: 0.8;
          display: block;
          margin-bottom: 0.5rem;
          text-align: left;
        }

        /* Founder Info Styles - Bottom Right */
        .founder-info {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          z-index: 20;
        }

        .founder-name-text {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
          letter-spacing: 0.5px;
          font-family: 'Mulish', sans-serif;
        }

        .founder-title-text {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          letter-spacing: 0.3px;
          font-family: 'Mulish', sans-serif;
        }

        /* Premium Buttons */
        .btn-primary {
          background: linear-gradient(135deg, #7A8E6B 0%, #5A6E4A 100%);
          color: white;
          padding: 0.9rem 2.4rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.03em;
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: inline-block;
          backdrop-filter: blur(4px);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #6B8060 0%, #4A5E3A 100%);
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.25);
        }

        .btn-outline {
          border: 2px solid rgba(255, 255, 255, 0.9);
          color: white;
          padding: 0.87rem 2.4rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.03em;
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          display: inline-block;
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        .btn-outline::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .btn-outline:hover::before {
          left: 100%;
        }

        .btn-outline:hover {
          background: white;
          color: #4A5E3A;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
        }

        /* Premium Navigation Buttons */
        .custom-swiper-button-prev,
        .custom-swiper-button-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          z-index: 20;
          color: white;
        }

        .custom-swiper-button-prev {
          left: 2.5rem;
        }

        .custom-swiper-button-next {
          right: 2.5rem;
        }

        .custom-swiper-button-prev:hover,
        .custom-swiper-button-next:hover {
          background: #7A8E6B;
          border-color: #7A8E6B;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
        }

        .custom-swiper-button-prev:active,
        .custom-swiper-button-next:active {
          transform: translateY(-50%) scale(0.95);
        }

        /* Progress Bar */
        .hero-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.15);
          z-index: 30;
          overflow: hidden;
        }

        .hero-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #7A8E6B, #A8C4A0);
          width: 0%;
          transition: width 0.1s linear;
        }

        .swiper-slide {
          overflow: hidden;
        }

        /* Ensure content stays above animations */
        .relative.z-10 {
          z-index: 15;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
          }
          .hero-description {
            font-size: 0.85rem !important;
          }
          .btn-primary, .btn-outline {
            padding: 0.7rem 1.6rem;
            font-size: 0.85rem;
          }
          .custom-swiper-button-prev,
          .custom-swiper-button-next {
            width: 40px;
            height: 40px;
          }
          .custom-swiper-button-prev {
            left: 1rem;
          }
          .custom-swiper-button-next {
            right: 1rem;
          }
          .first-slide-bg {
            background-position: 60% center !important;
          }
          .founder-name-text {
            font-size: 0.8rem;
          }
          .founder-title-text {
            font-size: 0.65rem;
          }
          .founder-info {
            bottom: 1rem;
            right: 1rem;
          }
          .quote-above-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .custom-swiper-button-prev,
          .custom-swiper-button-next {
            display: none;
          }
          .first-slide-bg {
            background-position: 55% center !important;
          }
          .quote-above-title {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Progress Bar */}
      <div className="hero-progress-bar">
        <div className="hero-progress-bar-fill" />
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        onSlideChangeTransitionStart={() => setIsAnimating(true)}
        onSlideChangeTransitionEnd={() => setIsAnimating(false)}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1200}
        className="h-full w-full"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full w-full">
              {/* Unified Blur Scale Animation for all slides */}
              {renderImageAnimation(banner, idx)}

              {/* Gradient Overlay */}
              <div className="hero-overlay" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
                {/* Main Content Area - Vertically centered */}
                <div className="flex-1 flex items-center justify-center">
                  <div className={`${banner.layout === 'left' ? 'left-aligned-content' : 'text-center max-w-4xl mx-auto w-full'} hero-content`}>
                    {/* Category Tag */}
                    <div className="category-tag inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase">
                      {idx === 0 && 'Featured Story'}
                      {idx === 1 && 'National Initiative'}
                      {idx === 2 && 'Education First'}
                      {idx === 3 && 'Sustainable Future'}
                      {idx === 4 && 'Community Care'}
                      {idx === 5 && 'Partnership'}
                    </div>

                    {/* Quotation mark - ONLY for first banner, directly above title */}
                    {idx === 0 && (
                      <div className="quote-above-title">“</div>
                    )}

                    {/* Title */}
                    <h1 className="hero-title text-white font-bold mb-4 leading-[1.2]">
                      {banner.title}
                    </h1>

                    {banner.subtitle && (
                      <h2 className="hero-subtitle text-white/95 text-xl md:text-2xl lg:text-2xl mb-4 tracking-wide">
                        {banner.subtitle}
                      </h2>
                    )}

                    <div className="button-group flex flex-wrap gap-5" style={{ justifyContent: banner.layout === 'left' ? 'flex-start' : 'center' }}>
                      {/* Donate Now */}
                      <Link
                        href="/donate"
                        className="relative group/btn inline-flex items-center justify-center overflow-hidden border-2 border-[#5C6F5C] bg-[#5C6F5C] text-white px-8 md:px-10 py-3 md:py-4 font-medium tracking-wider transition-all duration-500 rounded-full"
                      >
                        <span className="relative z-10 flex items-center space-x-3">
                          <span>Donate Now</span>
                          <svg
                            className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                        <span className="absolute top-0 left-0 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                        <span className="absolute top-0 left-1/2 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                        <span className="absolute bottom-0 left-1/4 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                        <span className="absolute bottom-0 left-3/4 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                      </Link>

                      {/* Partner With Us */}
                      <Link
                        href="/schedule-meeting"
                        className="relative group/btn inline-flex items-center justify-center overflow-hidden border-2 border-[#5C6F5C] text-[#ffffff] px-8 md:px-10 py-3 md:py-4 font-medium tracking-wider transition-all duration-500 hover:text-white rounded-full"
                      >
                        <span className="relative z-10 flex items-center space-x-3 transition-colors duration-500">
                          <span>Partner With Us</span>
                          <svg
                            className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                        <span className="absolute top-0 left-0 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                        <span className="absolute top-0 left-1/2 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                        <span className="absolute bottom-0 left-1/4 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                        <span className="absolute bottom-0 left-3/4 w-1/4 h-0 bg-[#5C6F5C] transition-all duration-500 group-hover/btn:h-full"></span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Area with Founder Info - Bottom Right corner */}
                {idx === 0 && (
                  <div className="founder-info">
                    <div className="text-center">
                      <div className="founder-name-text">Mr. Srinivasa Sai Kavali</div>
                      <div className="founder-title-text">Founder, Chairman & Managing Director</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        className="custom-swiper-button-prev"
        aria-label="Previous slide"
        onClick={handlePrev}
      >
        <FiChevronLeft size={24} strokeWidth={2.5} />
      </button>

      <button
        ref={nextRef}
        className="custom-swiper-button-next"
        aria-label="Next slide"
        onClick={handleNext}
      >
        <FiChevronRight size={24} strokeWidth={2.5} />
      </button>
    </section>
  );
};

export default Hero;