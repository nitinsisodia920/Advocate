import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBalanceScale } from 'react-icons/fa';

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hasSeenDisclaimer', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          data-testid="disclaimer-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
                  <FaBalanceScale className="text-gold text-4xl" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center text-navy dark:text-white mb-6" data-testid="disclaimer-title">
                Important Legal Notice
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  As per the rules of the <strong>Bar Council of India</strong>, advocates are not permitted 
                  to solicit work or advertise in any manner.
                </p>

                <p className="leading-relaxed">
                  This website is created solely for <strong>informational purposes</strong> and should not be 
                  construed as an advertisement or solicitation of any kind.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-4">
                  <p className="text-sm leading-relaxed">
                    The information provided on this website is for general informational purposes only and does 
                    not constitute legal advice. No attorney-client relationship is created by accessing this 
                    website or contacting through it.
                  </p>
                </div>

                <p className="leading-relaxed">
                  By proceeding to use this website, you acknowledge that:
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>You have read and understood this disclaimer</li>
                  <li>You are accessing this information of your own accord</li>
                  <li>You understand that no guarantee of outcome is provided</li>
                  <li>All professional services are provided in accordance with Bar Council regulations</li>
                </ul>
              </div>

              <button
                onClick={handleAccept}
                className="w-full mt-8 py-3 bg-navy hover:bg-navy/90 text-white font-semibold rounded-lg transition"
                data-testid="accept-disclaimer-btn"
              >
                I Understand and Accept
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;