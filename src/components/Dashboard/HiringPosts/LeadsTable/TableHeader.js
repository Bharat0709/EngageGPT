const { Icons } = require('@utils/constantData/icons');

const TableHeader = ({ postsLength, searchTerm, setSearchTerm }) => {
  return (
    <div className="px-4 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-md italic text-gray-500">
            {postsLength} leads
          </span>
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full border-gray-300 text-xs w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
