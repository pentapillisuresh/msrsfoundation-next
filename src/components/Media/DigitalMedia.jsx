"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiYoutube,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiPlay,
  FiImage,
  FiUser,
  FiArrowRight,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiCalendar,
  FiEye,
  FiThumbsUp,
  FiLinkedin,
  FiTrendingUp,
  FiAward,
  FiGlobe,
  FiClock,
  FiCamera,
  FiFilm,
  FiGrid,
  FiDownload,
  FiExternalLink,
  FiBell,
  FiStar,
  FiCheckCircle,
  FiBarChart2,
  FiSmile,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiZoomIn,
  FiAlertCircle
} from "react-icons/fi";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

import ApiService from "@/services/ApiService";

const DigitalMedia = () => {

  const BACKEND_URL = "http://localhost:3000";

  const [activeMedia, setActiveMedia] = useState("videos");
  const [activeCategory, setActiveCategory] = useState("all");
  const [photoCategory, setPhotoCategory] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoErrors, setVideoErrors] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: "ease-out-back",
    });
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await ApiService.get("/media");
      const mediaData = response?.data?.data || [];

      console.log("Fetched Media Data:", mediaData);

      const videos = mediaData
        .filter((item) => item.mediaType === "video")
        .map((item, index) => {
          // Fix the file path - remove duplicate 'uploads' if present
          let filePath = item.file;
          if (filePath.startsWith('uploads/')) {
            filePath = '/' + filePath;
          } else if (!filePath.startsWith('/')) {
            filePath = '/' + filePath;
          }
          
          const videoUrl = `${BACKEND_URL}${filePath}`;
          console.log(`Video URL for ${item.name}:`, videoUrl);
          
          return {
            id: item.id || index,
            title: item.name,
            category: item.Category?.name || "Videos",
            description: item.description,
            videoUrl: videoUrl,
            filePath: filePath,
            duration: "3:20",
            views: Math.floor(Math.random() * 5000) + 1000,
            date: new Date(item.createdAt).toLocaleDateString(),
            status: item.status
          };
        });

      const photos = mediaData
        .filter((item) => item.mediaType === "image")
        .map((item, index) => {
          // Fix the file path for images
          let filePath = item.file;
          if (filePath.startsWith('uploads/')) {
            filePath = '/' + filePath;
          } else if (!filePath.startsWith('/')) {
            filePath = '/' + filePath;
          }
          
          const imageUrl = `${BACKEND_URL}${filePath}`;
          console.log(`Image URL for ${item.name}:`, imageUrl);
          
          return {
            id: item.id || index,
            title: item.name,
            category: item.Category?.name || "Gallery",
            image: imageUrl,
            description: item.description,
            location: "India",
            date: new Date(item.createdAt).toLocaleDateString(),
            status: item.status
          };
        });

      setAllVideos(videos);
      setAllPhotos(photos);
    } catch (error) {
      console.log("Media Fetch Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoError = (videoId, videoUrl) => {
    console.error(`Video failed to load: ${videoId}`, videoUrl);
    setVideoErrors(prev => ({ ...prev, [videoId]: true }));
  };

  const videoCategories = ["all", ...new Set(allVideos.map((item) => item.category))];
  const photoCategories = ["all", ...new Set(allPhotos.map((item) => item.category))];

  const getFilteredVideos = () => {
    if (activeCategory === "all") return allVideos;
    return allVideos.filter((video) => video.category === activeCategory);
  };

  const getFilteredPhotos = () => {
    if (photoCategory === "all") return allPhotos;
    return allPhotos.filter((photo) => photo.category === photoCategory);
  };

  const filteredVideos = getFilteredVideos();
  const filteredPhotos = getFilteredPhotos();
  const displayedVideos = filteredVideos.slice(0, visibleItems);
  const displayedPhotos = filteredPhotos.slice(0, visiblePhotos);
  const hasMore = visibleItems < filteredVideos.length;
  const hasMorePhotos = visiblePhotos < filteredPhotos.length;

  const loadMore = () => setVisibleItems((prev) => prev + 6);
  const loadLess = () => setVisibleItems(6);
  const loadMorePhotos = () => setVisiblePhotos((prev) => prev + 6);
  const loadLessPhotos = () => setVisiblePhotos(6);

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPhoto(null);
    document.body.style.overflow = "auto";
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  const getCategoryCount = (category) => {
    if (category === "all") return allVideos.length;
    return allVideos.filter((v) => v.category === category).length;
  };

  const getPhotoCategoryCount = (category) => {
    if (category === "all") return allPhotos.length;
    return allPhotos.filter((p) => p.category === category).length;
  };

  const formatViews = (views) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="bg-[#FCFDFB] overflow-x-hidden selection:bg-[#667A62] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Mulish', sans-serif; }
        
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-zoom { animation: subtle-zoom 20s infinite alternate linear; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease forwards; }
        
        .media-card {
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .media-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(44, 62, 43, 0.12);
        }
        
        .category-tab {
          transition: all 0.3s ease;
        }
        .category-tab:hover {
          transform: translateY(-2px);
        }
        
        .modal-overlay {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2070"
            className="w-full h-full object-cover animate-zoom"
            alt="Digital Media"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2619]/90 via-[#2C3E2B]/70 to-[#FCFDFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <span className="inline-block px-6 py-1.5 mb-5 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
              MSRS FOUNDATION
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-serif" data-aos="fade-up" data-aos-delay="200">
            Digital Media
          </h1>
          <div className="flex justify-center gap-2 mb-5" data-aos="fade-up" data-aos-delay="250">
            <div className="w-12 h-0.5 bg-[#667A62]"></div>
            <div className="w-6 h-0.5 bg-[#667A62]"></div>
            <div className="w-3 h-0.5 bg-[#667A62]"></div>
          </div>
          <p className="text-white/80 font-sans text-base max-w-2xl mx-auto font-light tracking-wide" data-aos="fade-up" data-aos-delay="400">
            Stories that Inspire Action - Explore our journey through videos and photos
          </p>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* MEDIA SECTION */}
      <section className="py-20 bg-[#F7F9F5]">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* TABS */}
          <div className="flex justify-center gap-4 mb-12" data-aos="fade-up">
            <button
              onClick={() => setActiveMedia("videos")}
              className={`group flex items-center gap-2 px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                activeMedia === "videos"
                  ? "bg-[#667A62] text-white shadow-lg"
                  : "bg-white text-[#2C3E2B] hover:bg-[#EAF6E3]"
              }`}
            >
              <FiFilm size={16} />
              Videos ({allVideos.length})
            </button>
            <button
              onClick={() => setActiveMedia("photos")}
              className={`group flex items-center gap-2 px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                activeMedia === "photos"
                  ? "bg-[#667A62] text-white shadow-lg"
                  : "bg-white text-[#2C3E2B] hover:bg-[#EAF6E3]"
              }`}
            >
              <FiImage size={16} />
              Photos ({allPhotos.length})
            </button>
          </div>

          {/* VIDEOS SECTION */}
          {activeMedia === "videos" && (
            <>
              {/* Video Categories */}
              {videoCategories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up" data-aos-delay="100">
                  {videoCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setVisibleItems(6);
                      }}
                      className={`category-tab px-5 py-2 text-xs font-semibold rounded-full transition-all ${
                        activeCategory === category
                          ? "bg-[#667A62] text-white shadow-md"
                          : "bg-white text-[#4A5C46] hover:bg-[#EAF6E3]"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)} ({getCategoryCount(category)})
                    </button>
                  ))}
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-[#667A62] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-[#667A62]">Loading videos...</p>
                </div>
              )}

              {/* No Videos Message */}
              {!loading && allVideos.length === 0 && (
                <div className="text-center py-20">
                  <FiFilm className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2C3E2B] mb-2">No Videos Yet</h3>
                  <p className="text-gray-500">Check back later for inspiring videos from our foundation.</p>
                </div>
              )}

              {/* Videos Grid */}
              {!loading && allVideos.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedVideos.map((video, index) => (
                      <div
                        key={video.id}
                        className="media-card bg-white rounded-xl overflow-hidden shadow-md cursor-pointer group"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        onClick={() => !videoErrors[video.id] && openVideoModal(video)}
                      >
                        <div className="relative h-56 overflow-hidden bg-gray-900">
                          {!videoErrors[video.id] ? (
                            <video
                              src={video.videoUrl}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              muted
                              onError={() => handleVideoError(video.id, video.videoUrl)}
                              preload="metadata"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                              <FiAlertCircle className="text-white text-4xl mb-2" />
                              <p className="text-white text-xs text-center px-4">Video failed to load</p>
                              <p className="text-gray-400 text-[10px] mt-1 truncate px-4">{video.filePath}</p>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300">
                              <FiPlay className="text-[#667A62] text-2xl ml-1" />
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-[10px] font-semibold">
                            {video.duration}
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-[10px] flex items-center gap-1">
                            <FiEye size={10} /> {formatViews(video.views)}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-[#2C3E2B] text-base mb-2 line-clamp-1">
                            {video.title}
                          </h3>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-[#667A62] font-semibold uppercase tracking-wider">
                              {video.category}
                            </span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                              <FiCalendar size={10} /> {video.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More / Show Less */}
                  {filteredVideos.length > 6 && (
                    <div className="text-center mt-12">
                      {hasMore ? (
                        <button
                          onClick={loadMore}
                          className="group flex items-center gap-2 mx-auto px-8 py-3 bg-[#667A62] text-white font-semibold text-sm rounded-lg hover:bg-[#4A5C46] transition-all duration-300 shadow-md"
                        >
                          Load More Videos
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                        </button>
                      ) : (
                        <button
                          onClick={loadLess}
                          className="px-8 py-3 border-2 border-[#667A62] text-[#667A62] font-semibold text-sm rounded-lg hover:bg-[#667A62] hover:text-white transition-all duration-300"
                        >
                          Show Less
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* PHOTOS SECTION */}
          {activeMedia === "photos" && (
            <>
              {/* Photo Categories */}
              {photoCategories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up" data-aos-delay="100">
                  {photoCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setPhotoCategory(category);
                        setVisiblePhotos(6);
                      }}
                      className={`category-tab px-5 py-2 text-xs font-semibold rounded-full transition-all ${
                        photoCategory === category
                          ? "bg-[#667A62] text-white shadow-md"
                          : "bg-white text-[#4A5C46] hover:bg-[#EAF6E3]"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)} ({getPhotoCategoryCount(category)})
                    </button>
                  ))}
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-[#667A62] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-[#667A62]">Loading photos...</p>
                </div>
              )}

              {/* No Photos Message */}
              {!loading && allPhotos.length === 0 && (
                <div className="text-center py-20">
                  <FiImage className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2C3E2B] mb-2">No Photos Yet</h3>
                  <p className="text-gray-500">Check back later for photos from our events and activities.</p>
                </div>
              )}

              {/* Photos Grid */}
              {!loading && allPhotos.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedPhotos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className="media-card bg-white rounded-xl overflow-hidden shadow-md cursor-pointer group"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        onClick={() => openPhotoModal(photo)}
                      >
                        <div className="relative h-64 overflow-hidden bg-gray-200">
                          <img
                            src={photo.image}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              console.error(`Image failed to load: ${photo.image}`);
                              e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300">
                              <FiZoomIn className="text-[#667A62] text-xl" />
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                            <FiCamera className="text-white text-[10px]" />
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-[#2C3E2B] text-sm mb-1 line-clamp-1">
                            {photo.title}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] text-[#667A62] font-semibold uppercase tracking-wider">
                              {photo.category}
                            </span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                              <FiCalendar size={10} /> {photo.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More / Show Less */}
                  {filteredPhotos.length > 6 && (
                    <div className="text-center mt-12">
                      {hasMorePhotos ? (
                        <button
                          onClick={loadMorePhotos}
                          className="group flex items-center gap-2 mx-auto px-8 py-3 bg-[#667A62] text-white font-semibold text-sm rounded-lg hover:bg-[#4A5C46] transition-all duration-300 shadow-md"
                        >
                          Load More Photos
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                        </button>
                      ) : (
                        <button
                          onClick={loadLessPhotos}
                          className="px-8 py-3 border-2 border-[#667A62] text-[#667A62] font-semibold text-sm rounded-lg hover:bg-[#667A62] hover:text-white transition-all duration-300"
                        >
                          Show Less
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* PHOTO MODAL */}
      {showModal && selectedPhoto && (
        <div
          className="modal-overlay fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          <div
            className="bg-white max-w-5xl w-full max-h-[90vh] overflow-auto rounded-xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="relative bg-gray-900 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[60vh] object-contain"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                  }}
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl font-bold text-[#2C3E2B] mb-2">
                  {selectedPhoto.title}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs text-[#667A62] font-semibold flex items-center gap-1">
                    <FiCalendar size={12} /> {selectedPhoto.date}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FiCamera size={12} /> {selectedPhoto.category}
                  </span>
                </div>
                {selectedPhoto.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {selectedPhoto.description}
                  </p>
                )}
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-[#667A62] text-white text-sm font-semibold rounded-lg hover:bg-[#4A5C46] transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {showVideoModal && selectedVideo && (
        <div
          className="modal-overlay fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeVideoModal}
        >
          <div
            className="bg-black max-w-5xl w-full rounded-xl overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <video
                src={selectedVideo.videoUrl}
                className="w-full max-h-[70vh]"
                controls
                autoPlay
                playsInline
                onError={(e) => {
                  console.error("Video modal error:", selectedVideo.videoUrl);
                  alert("Failed to load video. Please check if the file exists on the server.");
                }}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-6 bg-white">
              <h2 className="font-serif text-xl font-bold text-[#2C3E2B] mb-2">
                {selectedVideo.title}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#667A62] font-semibold">
                  {selectedVideo.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FiEye size={12} /> {formatViews(selectedVideo.views)} views
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FiCalendar size={12} /> {selectedVideo.date}
                </span>
              </div>
              {selectedVideo.description && (
                <p className="text-sm text-gray-600 mt-3">
                  {selectedVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-[#6F8770] to-[#8A9A87] px-8 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-6 rounded-2xl shadow-lg">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-3">
                Stay Connected With Us
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Follow us on social media for latest updates and inspiring stories
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-lg hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                <FaYoutube size={16} className="text-red-600 group-hover:text-white" />
                Subscribe
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#2C3E2B] font-semibold text-sm rounded-lg hover:bg-[#667A62] hover:text-white transition-all duration-300 shadow-md"
              >
                <FaInstagram size={16} className="text-pink-600 group-hover:text-white" />
                Follow
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMedia;