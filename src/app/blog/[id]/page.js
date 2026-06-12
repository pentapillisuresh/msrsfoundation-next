'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowLeft, Share2, Heart, Bookmark, Printer, Facebook, Twitter, Linkedin } from 'lucide-react';
import ApiService from '@/services/ApiService';

export default function BlogDetailsPage({ params }) {
  // Unwrap params using React.use()
  const { id } = React.use(params);
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getBlogById(id);
      
      if (response.success) {
        setBlog(response.data);
        
        // Increment views
        try {
          await ApiService.incrementBlogViews(id);
        } catch (viewError) {
          console.log('View count update failed');
        }
      } else {
        setError('Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Error loading blog');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.content?.substring(0, 100),
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block w-8 h-8 border-4 border-[#667A62] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">📖</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full transition-colors"
              style={{ backgroundColor: '#2C3E2B' }}
            >
              <ArrowLeft className="w-5 h-5" /> Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundColor: '#2C3E2B'
      }}>
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Back Button - Centered Vertically on the Left */}
        <div className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-10">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/90 backdrop-blur-sm rounded-full transition-all hover:bg-white shadow-lg text-sm md:text-base"
            style={{ color: '#2C3E2B' }}
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Back
          </Link>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white/90 text-sm md:text-base">
              <span className="flex items-center gap-1 md:gap-2">
                <User className="w-3 h-3 md:w-4 md:h-4" />
                {blog.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span className="flex items-center gap-1 md:gap-2">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span className="flex items-center gap-1 md:gap-2">
                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                {blog.views || 0} views
              </span>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content - Simple, no cards */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Blog Image */}
        {blog.image && (
          <div className="mb-12">
            <img 
              src={`http://localhost:3000${blog.image}`} 
              alt={blog.title}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content?.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1.5 text-xs rounded-full font-medium" style={{ backgroundColor: '#e8ece8', color: '#2C3E2B' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-gray-100"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
              <span className="text-sm">Like</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-gray-100"
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} style={{ color: saved ? '#2C3E2B' : '#6B7280' }} />
              <span className="text-sm">Save</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-gray-100"
            >
              <Share2 className="w-5 h-5 text-gray-500" />
              <span className="text-sm">Share</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-gray-100"
            >
              <Printer className="w-5 h-5 text-gray-500" />
              <span className="text-sm">Print</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-gray-500">Share on:</span>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Facebook className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Twitter className="w-4 h-4 text-blue-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Linkedin className="w-4 h-4 text-blue-700" />
          </button>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0" style={{ backgroundColor: '#2C3E2B' }}>
              {blog.author?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">Written by {blog.author}</h4>
              <p className="text-gray-500 text-sm">Published on {formatDate(blog.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 transition-colors hover:gap-3 text-sm font-medium rounded-full px-6 py-2 border border-[#2C3E2B]"
            style={{ color: '#2C3E2B' }}
          >
            <ArrowLeft className="w-4 h-4" /> Browse all articles
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </div>
  );
}