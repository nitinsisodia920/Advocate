import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const timeline = [
    { year: '2014', title: 'Bar Council Enrollment', desc: 'Enrolled as an Advocate with Bar Council Registration No. BCI/2014/12345' },
    { year: '2011', title: 'LL.B. Degree', desc: 'Bachelor of Laws from National Law University' },
    { year: '2016', title: 'High Court Practice', desc: 'Started practice in High Court' },
    { year: '2020', title: 'Specialized Practice', desc: 'Expanded practice areas to include corporate and family law' },
  ];

  return (
    <div data-testid="about-page" className="pt-20">
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title" data-testid="about-title">About Adv. Rajesh Kumar</h1>
            <p className="section-subtitle">
              Professional legal practice with dedication to justice
            </p>
          </motion.div>

          <motion.div
            className="mt-12 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-navy dark:text-white mb-4" data-testid="professional-background-title">
                Professional Background
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I am an advocate enrolled with the Bar Council of India (Registration No. BCI/2014/12345) 
                with over 10 years of experience in legal practice. My practice encompasses various areas 
                of law including criminal law, civil law, corporate law, and family law.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Throughout my career, I have focused on providing professional legal guidance to clients 
                while maintaining the highest standards of legal ethics and professional conduct as mandated 
                by the Bar Council of India.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-navy dark:text-white mb-4" data-testid="education-title">
                Education & Qualifications
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Bachelor of Laws (LL.B.) - National Law University</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Bar Council of India Enrollment - 2014</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>High Court Practice Certificate</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title" data-testid="professional-journey-title">Professional Journey</h2>
            <p className="section-subtitle">
              A timeline of key milestones in legal practice
            </p>
          </motion.div>

          <div className="timeline mt-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                data-testid={`timeline-item-${index}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <span className="text-gold font-bold text-lg">{item.year}</span>
                  <h3 className="text-xl font-semibold text-navy dark:text-white mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
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
            <h2 className="text-3xl font-bold mb-4" data-testid="approach-title">Professional Approach</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              My approach to legal practice is centered on thorough research, detailed case preparation, 
              and maintaining professional ethics. I believe in providing clear legal guidance and 
              working diligently on each matter entrusted to me. As per Bar Council regulations, 
              I maintain complete transparency and do not make any claims regarding success rates or outcomes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;