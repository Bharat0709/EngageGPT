import React from 'react';
import { createPortal } from 'react-dom';
import {
  FiX,
  FiZap,
  FiMessageCircle,
  FiTarget,
  FiTrendingUp,
  FiMail,
  FiHelpCircle,
  FiShield,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CreditsConsumptionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    {
      name: 'AI Post Generation (Extension)',
      description: 'Generate tailored LinkedIn posts using Gemini',
      credits: 10,
      icon: FiZap,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'AI Content Generation (Website)',
      description:
        'Generate tailored LinkedIn posts using ChatGPT, Gemini, Grok, Perplexity',
      credits: 10,
      icon: FiZap,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Smart Replies (Extension)',
      description: 'Craft engaging replies to messages instantly.',
      credits: 5,
      icon: FiMessageCircle,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'New Conversation Message (Extension)',
      description: 'Craft engaging messages lie referral requests etc.',
      credits: 5,
      icon: FiMessageCircle,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'AI Comments (Extension)',
      description: 'Generate Engagging Comments using 4 different AI options',
      credits: 5,
      icon: FiTarget,
      color: 'from-green-500 to-emerald-500',
    },
      {
      name: 'HTML/Text Mailing feature (Coming Soon)',
      description: 'Send tailored emails to each lead',
      credits: 5,
      icon: FiZap,
      color: 'from-purple-500 to-pink-500',
    },
     {
      name: 'Leads Automation + Automated Email (Coming Soon)',
      description: 'Generates & Sends automated tailored emails to each lead',
      credits: 20,
      icon: FiZap,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const freeFeatures = [
    {
      name: 'Multi Profile Support',
      description: 'Add and Manage Multiple LinkedIn Profiles',
    },
    {
      name: 'Dashboard Access',
      description: 'Track credits and usage insights in one place.',
    },
    {
      name: 'Basic Analytics',
      description: 'View engagement stats and post performance.',
    },
    {
      name: 'Post Scheduling and Management',
      description: 'Schedule, Post Or Save Draft LinkedIn Posts ',
    },
    {
      name: 'Email Templates Managememt',
      description: 'Create, Save and Manage Leads related mails',
    },
    {
      name: 'Automated Leads Saving',
      description: 'Auto Saves leads while you scroll on linkedin',
    },
    {
      name: 'AI Email Generator',
      description: 'Create mail templates for you using Gemini',
    },
    {
      name: 'Custom Connection Note (Extension)',
      description: 'Custom notes for connection request',
    },
  ];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] scrollbar-hide flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-3xl scrollbar-hide max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="relative border-b border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <FiTrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 m-0">
                Credits Consumption Overview
              </h2>
              <p className="text-xs lg:text-sm text-gray-500 mt-0.5 m-0">
                Understand how your credits are used across features
              </p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Free Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">
              Free Features
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {freeFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  <p className="text-gray-900 m-0 p-0 font-medium text-base">
                    {feature.name}
                  </p>
                  <p className="text-sm m-0 p-0 text-gray-500 mt-1">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Credits-Based Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">
              Credits-Based Features
            </h3>
            <div className="space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md text-white`}
                      >
                        <Icon size={20} />
                      </div>

                      {/* Info */}
                      <div>
                        <p className="text-md font-semibold text-gray-900 m-0">
                          {feature.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5 m-0">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold m-0 p-0 text-gray-900">
                        {feature.credits} credits
                      </p>
                      <p className="text-xs m-0 p-0  text-gray-500 mt-0.5">
                        per use
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <FiShield size={14} />
            <p className="text-xs m-0">
              Secure platform • Transparent credit consumption
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(
    <AnimatePresence mode="wait">{modalContent}</AnimatePresence>,
    document.body,
  );
};

export default CreditsConsumptionModal;
