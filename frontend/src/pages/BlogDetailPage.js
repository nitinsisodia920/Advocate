import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaClock, FaFolder, FaArrowLeft } from 'react-icons/fa';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`${API}/blog/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="loading-indicator">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="article-not-found">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">Article Not Found</h2>
          <Link to="/blog" className="cta-btn cta-btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="blog-detail-page" className="pt-20">
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-navy dark:text-white hover:text-gold mb-6"
              data-testid="back-to-blog-link"
            >
              <FaArrowLeft className="mr-2" />
              Back to Legal Awareness
            </Link>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="blog-category">
                  <FaFolder className="inline mr-1" />
                  {article.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <FaClock className="mr-1" />
                  {article.read_time} min read
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(article.published_date)}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-navy dark:text-white mb-4" data-testid="article-title">
                {article.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 italic" data-testid="article-excerpt">
                {article.excerpt}
              </p>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">By {article.author}</p>
              </div>

              <div className="prose dark:prose-invert max-w-none" data-testid="article-content">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {article.content}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Disclaimer:</strong> This article is for informational purposes only and does not 
                    constitute legal advice. For specific legal guidance, please consult with a qualified legal professional.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;