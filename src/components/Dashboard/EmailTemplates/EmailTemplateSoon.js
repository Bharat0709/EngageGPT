import React, { useState } from 'react';
import { FaEnvelope, FaClock, FaBell } from 'react-icons/fa';
import { message } from 'antd';
import { sendHelpMail } from '../../../network/Organization';
import { motion } from 'framer-motion';

const EmailTemplatesComingSoon = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Features list
  const upcomingFeatures = [
    {
      title: 'Customizable Templates',
      description:
        'Create and save personalized email templates for different purposes',
      icon: <FaEnvelope className="text-sky-500" size={24} />,
    },
    {
      title: 'Scheduled Sending',
      description: 'Schedule your emails to be sent at the perfect time',
      icon: <FaClock className="text-sky-500" size={24} />,
    },
    {
      title: 'Automated Email Sending',
      description: 'Automate your email campaigns with our powerful tools',
      icon: <FaBell className="text-sky-500" size={24} />,
    },
  ];

  // Notify me form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      message.info('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      // Using the sendHelpMail function but with a specially formatted message
      // that indicates this is a notification request for the email feature
      await sendHelpMail(`EMAIL_NOTIFICATION_REQUEST: ${email}`);

      message.success(
        "Thanks! We'll notify you when Email Templates launches.",
      );
      setEmail('');
    } catch (error) {
      message.error(
        'Failed to submit your notification request. Please try again later.',
      );
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 mb-8 p-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-sky-100 rounded-full p-5">
              <FaEnvelope size={20} className="text-sky-600" />
            </div>
          </div>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            Mailing Feature Coming Soon
          </p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're working hard to bring you mailing features. Stay tuned!
          </p>
        </motion.div>
        {/* Features section */}
        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
            What to Expect
          </h2>
          <div className="grid md:grid-cols-3 gap-2">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notification signup */}
        <motion.div
          variants={itemVariants}
          className="bg-sky-900 rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Be the First to Know</h3>
          <p className="mb-6 max-w-xl mx-auto">
            Get notified when Email Templates launches. We'll send you an update
            as soon as it's ready.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-gray-900"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className={`px-6 py-3 mx-auto rounded-lg font-medium transition-colors ${
                loading
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-white text-sky-900 hover:bg-gray-100'
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Notify Me'}
            </button>
          </form>
        </motion.div>

        {/* Estimated arrival */}
        <motion.div
          variants={itemVariants}
          className="mt-4 mb-8 text-center text-gray-600"
        >
          <p>
            Estimated arrival: <span className="font-semibold">July 2025</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailTemplatesComingSoon;
