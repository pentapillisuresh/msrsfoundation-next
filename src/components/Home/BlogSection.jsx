'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowRight, Clock, TrendingUp, BookOpen } from 'lucide-react';
import ApiService from '@/services/ApiService';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await ApiService.getBlogs({
        status: 'published',
        limit: 3
      });
      
      if (response.success) {
        setBlogs(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
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

  if (loading) {
    return (
      <section className="py-16 bg-white font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#667A62] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="text-xs tracking-[5px] text-[#667A62] font-semibold mb-3 inline-block">
            LATEST BLOGS
          </span>
          <div className="w-16 h-0.5 bg-[#667A62] mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-sm">
            Stories, updates, and insights from our foundation
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link 
              href={`/blog/${blog.id}`} 
              key={blog.id}
              className="group bg-white rounded-2xl shadow-md border border-[#EAF6E3] overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#667A62]/30"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                {blog.image ? (
                  <img 
                    src={`http://localhost:3000${blog.image}`} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#2C3E2B' }}>
                    <span className="text-white text-lg font-semibold">MSRS Foundation</span>
                  </div>
                )}
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                    <span className="text-xs font-semibold text-[#2C3E2B]">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                {/* Author and Views */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span>{blog.views || 0} views</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-[#2C3E2B] mb-2 line-clamp-2 group-hover:text-[#667A62] transition-colors">
                  {blog.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {blog.content?.substring(0, 100)}...
                </p>
                
                {/* Read More Link */}
                <div className="flex items-center justify-between pt-3 border-t border-[#EAF6E3]">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#667A62] group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{Math.ceil(blog.content?.length / 1000) || 2} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="border-2 border-[#2C3E2B] text-[#2C3E2B] hover:bg-[#2C3E2B] hover:text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2"
          >
            View All Blogs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;