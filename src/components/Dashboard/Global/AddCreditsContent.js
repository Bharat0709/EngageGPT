export const creditsModalContent = (
  <div className="space-y-4">
    <p className="text-sm text-gray-600">
      Get more EngageGPT credits by following these simple steps:
    </p>

    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-semibold text-blue-800 mb-2">
        Step 1: Visit Chrome Extension
      </h4>
      <p className="text-sm text-blue-700 mb-2">Visit our Chrome Extension:</p>
      <a
        href="https://chromewebstore.google.com/detail/engagegpt-ai-for-linkedin/ldhdipkofibjleihomflebfklhadikio?hl=en-GB&authuser=1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
      >
        🔗 Chrome Extension Link
      </a>
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="font-semibold text-green-800 mb-2">
        Step 2: Leave a Review
      </h4>
      <p className="text-sm text-green-700">
        Share your experience by leaving a review and rating on the Chrome Web
        Store. Your feedback helps us improve and reach more users!
      </p>
    </div>

    <div className="bg-yellow-50 p-4 rounded-lg">
      <h4 className="font-semibold text-yellow-800 mb-2">
        Step 3: Get Credits
      </h4>
      <p className="text-sm text-yellow-700">
        Once your review and rating are verified, credits will be added to your
        account within 24 hours of the review submission.
      </p>
    </div>

    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
      <h4 className="font-semibold text-red-800 mb-2">⚠️ Important Note</h4>
      <p className="text-sm text-red-700">
        Deleting your review may cause the removal of the added credits from
        your account.
      </p>
    </div>
  </div>
);
