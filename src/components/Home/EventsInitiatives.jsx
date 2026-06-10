"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiClock } from 'react-icons/fi';
import ApiService from '@/services/ApiService';

const EventsInitiatives = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLatestEvents();
  }, []);

  const fetchLatestEvents = async () => {
    try {
      setLoading(true);
      const response = await ApiService.get('/events');
      const allEvents = response.data?.data || [];
      
      // Sort by date (newest first) and take only latest 4
      const sortedEvents = [...allEvents].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      
      const latestEvents = sortedEvents.slice(0, 4);
      setEvents(latestEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Format date helper
  const formatEventDate = (dateString) => {
    if (!dateString) return { date: 'TBD', month: 'TBD' };
    const date = new Date(dateString);
    return {
      date: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
    };
  };

  const handleViewAllEvents = () => {
    router.push('/events');
  };

  const handleRegisterClick = (event, e) => {
    e.stopPropagation();
    router.push('/get-involved/volunteer');
  };

  if (loading) {
    return (
      <section className="py-16 bg-white font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#667A62] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchLatestEvents}
              className="mt-4 text-[#667A62] hover:underline"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="mb-12 text-center">
          <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
            UPCOMING EVENTS
          </span>

          <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>

          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-sm">
            Join us in our mission to create lasting change through these impactful events and initiatives
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No upcoming events at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {events.map((event, index) => {
              const { date, month } = formatEventDate(event.date);
              return (
                <div
                  key={event.id}
                  className="group flex flex-col md:flex-row items-center bg-white rounded-[40px] shadow-md border border-[#EAF6E3] p-2 pr-6 hover:shadow-xl transition-all duration-300 hover:border-[#667A62]/30"
                >

                  <div className="relative flex-shrink-0">
                    <div className="w-full md:w-56 h-36 rounded-[30px] overflow-hidden">
                      <img
                        src={event.image ? `http://localhost:3000${event.image}` : "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800"}
                        alt={event.eventName || event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800";
                        }}
                      />
                    </div>

                    <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-[#2C3E2B] rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg border-2 border-white">
                      <span className="text-2xl font-bold text-white leading-none">
                        {date}
                      </span>

                      <span className="text-[10px] font-bold text-[#667A62] uppercase tracking-tighter">
                        {month}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow mt-4 md:mt-0 md:ml-14 text-center md:text-left">
                    <h3 className="text-xl font-bold text-[#2C3E2B] mb-2">
                      {event.eventName}
                    </h3>

                    <p className="text-gray-500 text-sm mb-2 hidden md:block">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-2 text-[#667A62] text-sm">
                      <FiClock className="w-4 h-4" />

                      <span className="font-medium text-gray-600">
                        {event.time || "Time TBD"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={(e) => handleRegisterClick(event, e)}
                      className="bg-[#EAF6E3] hover:bg-[#2C3E2B] text-[#2C3E2B] hover:text-white px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Register Now
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={handleViewAllEvents}
            className="border-2 border-[#2C3E2B] text-[#2C3E2B] hover:bg-[#2C3E2B] hover:text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300"
          >
            View All Events
          </button>
        </div>

      </div>
    </section>
  );
};

export default EventsInitiatives;