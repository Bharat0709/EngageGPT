import { useState, useEffect } from 'react';
import { fetchOrganizationData } from '@services/Organization';
import { submitSurvey } from '@services/Members';
import { useNotifications } from '@components/Common/Notification';
import Crying from '@assets/images/Crying.png';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';

const FeedbackSurvey = () => {
  const message = useNotifications();
  const [formData, setFormData] = useState({
    usability: '',
    missingFeatures: '',
    performance: '',
    overallSatisfaction: '',
    reason: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOrganizationData();
        setUserData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        message.error('Organization details not found');
      }
    };

    fetchAndSetUserData();
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await submitSurvey(formData);
      message.success('Thank you for your feedback!');
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full m-4 bg-white rounded-lg p-6">
        <div className="flex lg:flex-row flex-col items-center gap-3 justify-between">
          <div className="flex flex-col gap-3 self-start">
            <a
              href="https://www.engagpgt.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={EngageGPTLogo}
                alt="EngageGPT Logo"
                className="h-16 w-auto"
              />
            </a>
            <p className="text-gray-600 lg:text-left text-center mb-6">
              We're sorry to see you go. Please help us improve by sharing your
              thoughts about our extension.
            </p>
          </div>
          <img className="h-20 w-20 mb-4" src={Crying} alt="crying" />
        </div>

        <div className="flex lg:flex-row flex-col gap-3 items-center  justify-between my-3 mb-6 text-center">
          <p className="text-gray-600 ">Uninstalled by mistake?</p>
          <a
            href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 shadow-md py-2 text-sm global-button-primary text-white rounded-lg 0focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Again
          </a>
        </div>
        <h1 className="text-xl font-bold text-gray-800 text-center mb-4">
          We Value Your Feedback!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usability */}
          <div>
            <label
              htmlFor="usability"
              className="block text-sm font-medium text-gray-700"
            >
              How easy was it to use our extension?
            </label>
            <select
              id="usability"
              name="usability"
              value={formData.usability}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-400 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="very_easy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="neutral">Neutral</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>

          {/* Missing Features */}
          <div>
            <label
              htmlFor="missingFeatures"
              className="block text-sm font-medium text-gray-700"
            >
              Were any features missing that you needed?
            </label>
            <textarea
              id="missingFeatures"
              name="missingFeatures"
              value={formData.missingFeatures}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe the features you wished for..."
              className="mt-1 p-2 block w-full rounded-md border-gray-400 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Performance */}
          <div>
            <label
              htmlFor="performance"
              className="block text-sm font-medium text-gray-700"
            >
              How was the performance of the extension?
            </label>
            <select
              id="performance"
              name="performance"
              value={formData.performance}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 rounded-md border-gray-400 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          {/* Overall Satisfaction */}
          <div>
            <label
              htmlFor="overallSatisfaction"
              className="block p-2 text-sm font-medium text-gray-700"
            >
              How satisfied were you overall?
            </label>
            <select
              id="overallSatisfaction"
              name="overallSatisfaction"
              value={formData.overallSatisfaction}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 rounded-md border-gray-400 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="very_satisfied">Very Satisfied</option>
              <option value="satisfied">Satisfied</option>
              <option value="neutral">Neutral</option>
              <option value="unsatisfied">Unsatisfied</option>
            </select>
          </div>

          {/* Reason for Uninstall */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              What was the primary reason for uninstalling?
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              value={formData.reason}
              onChange={handleInputChange}
              rows={3}
              placeholder="Let us know what went wrong..."
              className="mt-1 block w-full rounded-md p-2 border-gray-400 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Would you like to leave your email for follow-up?
            </label>
            <input
              type="email"
              id="email"
              disabled={!userData}
              name="email"
              value={userData?.email}
              onChange={handleInputChange}
              placeholder="Your email address (optional)"
              className="mt-2 block p-2 w-full rounded-md border-gray-400 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 global-button-primary text-sm rounded-lg w-full text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSurvey;
