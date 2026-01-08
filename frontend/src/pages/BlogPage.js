import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaClock, FaFolder } from 'react-icons/fa';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching blog articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div data-testid="blog-page" className="pt-20">
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title" data-testid="blog-title">Legal Awareness</h1>
            <p className="section-subtitle">
              Informational articles on various legal topics for general awareness
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12" data-testid="loading-indicator">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link to={`/blog/${article.id}`} data-testid={`blog-card-${index}`}>
                    <div className="blog-card h-full">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="blog-category">
                            <FaFolder className="inline mr-1" />
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <FaClock className="mr-1" />
                            {article.read_time} min read
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-navy dark:text-white mb-3 line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{article.author}</span>
                          <span>{formatDate(article.published_date)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && articles.length === 0 && (
            <div className="text-center py-12" data-testid="no-articles">
              <p className="text-gray-600 dark:text-gray-400">No articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-navy dark:text-white mb-4" data-testid="disclaimer-title">
              Informational Purpose Only
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The articles published here are for general informational and educational purposes only. 
              They do not constitute legal advice and should not be relied upon as such. For specific 
              legal guidance related to your situation, please consult with a qualified legal professional. 
              This content does not create any attorney-client relationship.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;