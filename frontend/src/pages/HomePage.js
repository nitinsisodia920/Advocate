import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBalanceScale, FaGavel, FaBriefcase, FaUsers } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div data-testid="home-page">
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            data-testid="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Adv. Rajesh Kumar
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            data-testid="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Advocate, High Court
          </motion.p>
          <motion.p
            className="hero-tagline"
            data-testid="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Committed to providing professional legal guidance with integrity and dedication.
            Specializing in civil, criminal, corporate, and family law matters.
          </motion.p>
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="/contact" className="cta-btn cta-btn-primary" data-testid="request-appointment-btn">
              Request Appointment
            </Link>
            <Link to="/contact" className="cta-btn cta-btn-secondary" data-testid="contact-us-btn">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="section bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title" data-testid="practice-areas-title">Practice Areas</h2>
            <p className="section-subtitle">
              Comprehensive legal services across multiple practice areas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                icon: <FaGavel />,
                title: 'Criminal Law',
                desc: 'Legal representation in criminal matters with thorough case preparation.',
              },
              {
                icon: <FaBalanceScale />,
                title: 'Civil Law',
                desc: 'Handling civil disputes, property matters, and contractual issues.',
              },
              {
                icon: <FaBriefcase />,
                title: 'Corporate Law',
                desc: 'Corporate compliance, contracts, and business legal matters.',
              },
              {
                icon: <FaUsers />,
                title: 'Family Law',
                desc: 'Family matters including matrimonial and custody cases.',
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                className="practice-card"
                data-testid={`practice-card-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="practice-icon">{area.icon}</div>
                <h3 className="practice-title">{area.title}</h3>
                <p className="practice-desc">{area.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/practice-areas" className="cta-btn cta-btn-primary" data-testid="view-all-areas-btn">
              View All Practice Areas
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title" data-testid="why-choose-title">Why Choose Our Services</h2>
            <p className="section-subtitle">
              Professional legal guidance based on experience and dedication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: 'Experience',
                desc: '10+ years of legal practice across multiple jurisdictions',
              },
              {
                title: 'Professional Approach',
                desc: 'Dedicated legal research and case preparation',
              },
              {
                title: 'Client Focus',
                desc: 'Understanding client needs and providing appropriate guidance',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                data-testid={`feature-card-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gold font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;