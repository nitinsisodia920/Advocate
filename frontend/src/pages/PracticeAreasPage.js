import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaBalanceScale, FaBriefcase, FaUsers, FaHome, FaFileContract } from 'react-icons/fa';

const PracticeAreasPage = () => {
  const practiceAreas = [
    {
      icon: <FaGavel />,
      title: 'Criminal Law',
      description: 'Legal representation in criminal matters including bail applications, trial proceedings, and appeals. Professional handling of criminal cases with thorough preparation and adherence to legal procedures.',
      areas: ['Bail Applications', 'Trial Court Proceedings', 'Criminal Appeals', 'Investigation Matters']
    },
    {
      icon: <FaBalanceScale />,
      title: 'Civil Law',
      description: 'Handling civil disputes, property matters, contractual issues, and civil litigation. Providing legal guidance on civil rights and civil procedure matters.',
      areas: ['Property Disputes', 'Contract Matters', 'Civil Suits', 'Recovery Cases']
    },
    {
      icon: <FaBriefcase />,
      title: 'Corporate Law',
      description: 'Corporate compliance, business contracts, company formation, and corporate litigation. Legal advisory services for business entities and commercial matters.',
      areas: ['Company Registration', 'Corporate Compliance', 'Business Contracts', 'Commercial Disputes']
    },
    {
      icon: <FaUsers />,
      title: 'Family Law',
      description: 'Family matters including matrimonial disputes, custody matters, maintenance cases, and domestic issues. Professional handling of sensitive family law matters.',
      areas: ['Matrimonial Matters', 'Custody Cases', 'Maintenance', 'Domestic Relations']
    },
    {
      icon: <FaHome />,
      title: 'Property Law',
      description: 'Property transactions, title verification, property disputes, and real estate matters. Legal assistance in property documentation and transfer.',
      areas: ['Title Verification', 'Property Disputes', 'Real Estate Transactions', 'Property Documentation']
    },
    {
      icon: <FaFileContract />,
      title: 'Contract Law',
      description: 'Drafting, reviewing, and advising on various types of contracts. Legal assistance in contractual disputes and enforcement matters.',
      areas: ['Contract Drafting', 'Contract Review', 'Breach of Contract', 'Contractual Disputes']
    },
  ];

  return (
    <div data-testid="practice-areas-page" className="pt-20">
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title" data-testid="main-title">Practice Areas</h1>
            <p className="section-subtitle">
              Comprehensive legal services across multiple areas of law
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={index}
                className="practice-card"
                data-testid={`practice-area-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="practice-icon text-4xl mb-4">{area.icon}</div>
                <h2 className="practice-title text-2xl mb-3">{area.title}</h2>
                <p className="practice-desc mb-4">{area.description}</p>
                <div className="mt-4">
                  <h3 className="font-semibold text-navy dark:text-white mb-2">Key Areas:</h3>
                  <ul className="space-y-1">
                    {area.areas.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy dark:bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4" data-testid="legal-notice-title">Legal Notice</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              As per the Bar Council of India Rules, advocates are not permitted to solicit work or advertise. 
              The information provided on this website is for general informational purposes only and does not 
              constitute legal advice. No advocate-client relationship is created by accessing this website or 
              contacting through it. All matters are handled in accordance with professional ethics and standards 
              set by the Bar Council of India.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreasPage;