"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiHeart, FiArrowRight, FiX, FiShare2, FiBell, FiStar, FiAward, FiCheckCircle } from 'react-icons/fi';
import { FaUserPlus, FaHandsHelping } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ApiService from '@/services/ApiService';

const EventsInitiatives = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-back',
    });

    fetchCategories();
    fetchEvents();
  }, []);

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const response = await ApiService.get("/categories?categoryRelated=event");
      setCategories(response.data || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // FETCH EVENTS
  const fetchEvents = async (categoryId = "") => {
    try {
      setLoading(true);
      let url = "/events";
      if (categoryId && categoryId !== "all") {
        url += `?categoryId=${categoryId}`;
      }
      const response = await ApiService.get(url);
      const eventsData = response.data?.data || [];
      setEvents(eventsData);
      
      // Set upcoming events (first 3 events for sidebar)
      setUpcomingEvents(eventsData.slice(0, 3));
    } catch (error) {
      console.log("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // CATEGORY CHANGE
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    fetchEvents(categoryId);
  };

  // VIEW EVENT
  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return { day: "TBD", month: "" };
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase()
    };
  };

  return (
    <div className="bg-[#FCFDFB] font-sans selection:bg-[#667A62] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }
        
        .event-card { 
          transition: all 0.3s ease; 
          height: 160px; 
        }
        .event-card:hover { 
          transform: translateX(8px); 
          box-shadow: 0 10px 25px rgba(44, 62, 43, 0.08); 
        }
        .line-clamp-1 { 
          display: -webkit-box; 
          -webkit-line-clamp: 1; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        }
        .line-clamp-2 { 
          display: -webkit-box; 
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        }
        
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-zoom { 
          animation: subtle-zoom 20s infinite alternate linear; 
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .category-tab {
          transition: all 0.3s ease;
        }
        .category-tab:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* Premium Banner Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070" 
            className="w-full h-full object-cover animate-zoom" 
            alt="Events Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              JOIN OUR JOURNEY
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Events & Initiatives
          </h1>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto mb-6 font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Discover transformative experiences through our spiritual events, wellness programs, and community initiatives.
            Join us on a journey of growth and connection.
          </p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
              UPCOMING PROGRAMS
            </span>
            <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2B] mt-4 mb-3">
              Featured Events
            </h2>
            <p className="text-[#4A5C46] text-sm max-w-2xl mx-auto">
              Join us in these transformative spiritual journeys
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`category-tab px-5 py-2 text-sm font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-[#667A62] text-white"
                  : "bg-white border border-gray-200 text-[#2C3E2B] hover:border-[#667A62]"
              }`}
            >
              All Events
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`category-tab px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-[#667A62] text-white"
                    : "bg-white border border-gray-200 text-[#2C3E2B] hover:border-[#667A62]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* LEFT SIDE: Events Cards */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="text-center py-20 col-span-full">
                  <div className="inline-block w-8 h-8 border-4 border-[#667A62] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-20 col-span-full">
                  <p className="text-gray-500">No events found</p>
                </div>
              ) : (
                events.map((event, index) => {
                  const dateObj = formatDate(event.date);
                  return (
                    <div 
                      key={event.id} 
                      className="event-card flex bg-white border border-[#EAF6E3] overflow-hidden"
                      data-aos="fade-right"
                      data-aos-delay={index * 100}
                    >
                      {/* Image Thumbnail */}
                      <div className="w-40 md:w-52 h-full flex-shrink-0 relative">
                        <img 
                          src={event.image ? `http://localhost:3000${event.image}` : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"} 
                          alt={event.eventName} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-2 left-2 bg-[#667A62] text-white text-[8px] font-bold px-2 py-0.5 uppercase">
                          {event.Category?.name || "Event"}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif font-bold text-[#2C3E2B] text-lg line-clamp-1">
                              {event.eventName}
                            </h4>
                            <div className="text-right ml-2">
                              <span className="text-[#667A62] font-bold text-sm block">{dateObj.day}</span>
                              <span className="text-gray-400 text-[9px] block leading-none">{dateObj.month}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-1 mb-2">
                            <div className="flex items-center text-gray-400 text-[10px]">
                              <FiClock className="mr-1" size={10} /> {event.time || "TBD"}
                            </div>
                            <div className="flex items-center text-gray-400 text-[10px]">
                              <FiMapPin className="mr-1" size={10} /> {event.location || "Virtual"}
                            </div>
                          </div>
                          
                          <p className="text-[#4A5C46] text-xs line-clamp-2 leading-relaxed mb-2">
                            {event.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#667A62]" 
                                style={{ width: `${Math.min((event.registeredCount || 0) / (event.capacity || 100) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-400">{event.registeredCount || 0} joined</span>
                          </div>
                          <button 
                            onClick={() => handleViewEvent(event)}
                            className="text-[#667A62] text-[11px] font-bold flex items-center gap-1 hover:text-[#2C3E2B] transition-colors"
                          >
                            DETAILS <FiArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* RIGHT SIDE: Sidebar */}
            <div className="space-y-6">
              {/* Volunteer Card */}
              <div className="bg-[#2C3E2B] p-6 text-white shadow-xl" data-aos="fade-left">
                <FaHandsHelping className="text-[#667A62] text-3xl mb-4" />
                <h3 className="font-serif text-xl mb-2">Want to lead?</h3>
                <p className="text-white/60 text-xs mb-5 leading-relaxed">
                  Join MSRS Foundation as a coordinator and help us organize impactful community events.
                </p>
                <Link href="/volunteer">
                  <button className="w-full bg-[#667A62] text-white py-2 text-xs font-bold hover:bg-[#7a8f76] transition-all flex items-center justify-center gap-2">
                    <FaUserPlus /> JOIN THE TEAM
                  </button>
                </Link>
              </div>

              {/* Upcoming Events List */}
              <div className="bg-white p-5 border border-[#EAF6E3]" data-aos="fade-left" data-aos-delay="100">
                <h4 className="text-[#2C3E2B] font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FiBell className="text-[#667A62]" /> Next in Calendar
                </h4>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 3).map((event, i) => {
                    const dateObj = formatDate(event.date);
                    return (
                      <div key={i} className="flex items-center gap-3 group cursor-pointer" onClick={() => handleViewEvent(event)}>
                        <div className="bg-[#F7F9F5] p-2 text-center min-w-[45px] border border-transparent group-hover:border-[#667A62] transition-all">
                          <div className="text-[10px] font-bold text-[#2C3E2B]">{dateObj.day}</div>
                          <div className="text-[8px] text-gray-400">{dateObj.month}</div>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#2C3E2B] line-clamp-1">{event.eventName}</p>
                          <p className="text-[9px] text-gray-400">{event.time || "TBD"}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Why Attend Card */}
              <div className="bg-white p-5 border border-[#EAF6E3]" data-aos="fade-left" data-aos-delay="200">
                <h4 className="font-bold text-[#2C3E2B] text-sm mb-3 flex items-center gap-2">
                  <FiHeart className="text-[#667A62]" size={14} />
                  Why Attend?
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#667A62] text-[10px] mt-0.5" />
                    <p className="text-[10px] text-[#4A5C46]">Transformative spiritual experiences</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#667A62] text-[10px] mt-0.5" />
                    <p className="text-[10px] text-[#4A5C46]">Learn from renowned teachers</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#667A62] text-[10px] mt-0.5" />
                    <p className="text-[10px] text-[#4A5C46]">Connect with like-minded community</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-[#6F8770] px-8 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-6" data-aos="fade-up">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Don't Miss Out on Upcoming Events
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Subscribe to stay updated about our latest events and spiritual gatherings.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <button 
                onClick={() => {
                  const email = prompt("Please enter your email address to subscribe:");
                  if (email && email.includes('@')) {
                    alert("Thank you for subscribing! You'll receive updates about our events.");
                  } else if (email) {
                    alert("Please enter a valid email address.");
                  }
                }}
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm hover:bg-[#667A62] hover:text-white transition-all shadow-md"
              >
                Subscribe Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </button>
              <Link href="/contact" className="px-5 py-2.5 border border-white text-white font-semibold text-sm hover:bg-white hover:text-[#2C3E2B] transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" 
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white max-w-xl w-full overflow-hidden max-h-[90vh] overflow-y-auto" 
            onClick={e => e.stopPropagation()}
          >
            <div className="h-48 relative">
              <img 
                src={selectedEvent.image ? `http://localhost:3000${selectedEvent.image}` : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"} 
                className="w-full h-full object-cover" 
                alt={selectedEvent.eventName} 
              />
              <button 
                onClick={() => setShowModal(false)} 
                className="absolute top-4 right-4 text-white bg-black/20 p-2 rounded-full hover:bg-black/40 transition-all"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="p-6">
              <h2 className="font-serif text-2xl text-[#2C3E2B] mb-2">{selectedEvent.eventName}</h2>
              <div className="flex flex-wrap gap-4 text-gray-500 text-xs mb-4">
                <span className="flex items-center gap-1">
                  <FiCalendar size={12} /> {selectedEvent.date || "Date TBD"}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock size={12} /> {selectedEvent.time || "Time TBD"}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin size={12} /> {selectedEvent.location || "Location TBD"}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{selectedEvent.description}</p>
              
              {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-[10px] uppercase text-gray-400 mb-2">Schedule</h4>
                  <ul className="text-xs space-y-1 text-gray-600">
                    {selectedEvent.agenda.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-[10px] uppercase text-gray-400 mb-2">Speakers</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.speakers.map((speaker, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-0.5 text-[10px] rounded">
                        {speaker}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Link href="/volunteer">
                <button className="w-full bg-[#667A62] text-white py-3 font-bold text-sm tracking-widest hover:bg-[#2C3E2B] transition-all">
                  REGISTER NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsInitiatives;