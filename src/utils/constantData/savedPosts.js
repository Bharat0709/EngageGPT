import { goTo } from '@utils/navigator';

export const PostSavingGuide = ({ memberId }) => (
  <div className="w-full p-4 bg-white border border-gray-200 rounded-lg">
    <h3 className="text-lg font-semibold mb-3">
      Guide: How to Save LinkedIn Posts by Keywords
    </h3>

    <div className="mb-4">
      <h4 className="text-md font-medium mb-2">Setting Up Keywords</h4>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
        <li>
          <span className="font-medium">Add Keywords You Want:</span> Go to your
          settings page and enter keywords related to posts you want to save
          automatically.
        </li>
        <li>
          <span className="font-medium">Filter Unwanted Content:</span> In the
          feed filter section, add keywords for posts you don't want to see.
        </li>
      </ol>
    </div>

    <div className="mb-4">
      <h4 className="text-md font-medium mb-2">How to Collect Posts</h4>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
        <li>
          <span className="font-medium">Browse Your LinkedIn Feed:</span> Simply
          scroll through your regular LinkedIn feed. Posts containing your
          keywords will be saved automatically.
        </li>
        <li>
          <span className="font-medium">Search Specific Keywords:</span> Type
          your saved keywords in the LinkedIn search bar and browse through the
          results.
        </li>
        <li>
          <span className="font-medium">Check Keyword Settings:</span> Your
          saved keywords are visible in the right sidebar of your LinkedIn feed.
        </li>
      </ol>
    </div>

    <div className="mb-4">
      <h4 className="text-md font-medium mb-2">Troubleshooting</h4>
      <p className="text-sm text-gray-600">
        If posts aren't being saved, reload the LinkedIn page and continue
        scrolling after the page refreshes.
      </p>
    </div>

    <div className="flex justify-center mt-6">
      <button
        onClick={() => goTo(`/dashboard/member-settings/${memberId}`)}
        className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
      >
        Go to Post Saving Settings
      </button>
    </div>
  </div>
);

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
