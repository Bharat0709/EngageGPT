import { useState } from 'react';
import { Icons } from '@utils/constantData/icons';
import { Select, Tag, Input } from 'antd';
import { categoryOptions } from '../../SavePostUtils/EditPostUtils/Constants';
import Button from '@components/Common/Button';

const { Option } = Select;

const CategoryTagsForm = ({
  postData,
  setPostData,
  tagInput,
  setTagInput,
  errors = {},
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
    console.log('Updating field:', field, 'with value:', value);
    console.log(postData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
      setPostData({
        ...postData,
        tags: [...postData.tags, tagInput.trim().toUpperCase()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center justify-between p-4  bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-b border-gray-100 cursor-pointer group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-green-200 transition-colors">
            <Icons.Tag className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Organization & Classification
            </h3>
            <p className="text-xs mb-0 text-gray-600">
              Category, budget, and tags management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
              <Icons.Alert className="text-red-500" size={14} />
              <span className="text-xs font-medium text-red-600">
                {Object.keys(errors).length} error
                {Object.keys(errors).length > 1 ? 's' : ''}
              </span>
            </div>
          )}
          <button className="p-2 hover:bg-white/60 rounded-full transition-colors">
            <Icons.Down
              className={`text-gray-500 transition-transform duration-200 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
              size={20}
            />
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        } overflow-hidden`}
      >
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.Tag size={16} className="text-purple-600" />
                Category
              </label>
              <Select
                value={postData.category}
                onChange={(value) => handleInputChange('category', value)}
                size="large"
                className="w-full !hover:border-black !focus:border-black"
                placeholder="Select category"
              >
                {categoryOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icons.DollarSign size={16} className="text-green-600" />
                Budget Range
              </label>
              <Input
                value={postData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="e.g., $5,000 - $10,000"
                size="large"
                className="rounded-xl border-gray-300 hover:border-black focus:border-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm w-full justify-between font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <Icons.Tag size={16} className="text-blue-600" />
                <span>Tags</span>
              </div>{' '}
              <span className="text-gray-500 text-xs"> Max Length 15</span>
            </label>
            <Input
              value={tagInput}
              maxLength={15}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
              placeholder="Add tag and press Enter..."
              size="middle"
              className="rounded-xl !py-1 border-gray-300 !hover:border-black !focus:border-black"
              suffix={
                <Button
                  theme="dark"
                  buttonText="Add"
                  icon={<Icons.Plus className="text-white" size={16} />}
                  onClick={handleAddTag}
                  className="!px-3 !py-1 -mr-2"
                  onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
                />
              }
            />
            <div className="flex flex-wrap gap-1 mt-3">
              {(postData.tags || []).map((tag, index) => (
                <Tag
                  key={index}
                  className="!text-black rounded-full px-4 flex flex-row gap-2  !border-gray-600 py-1 !bg-gray-50 hover:bg-gray-200 transition-colors"
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  color="blue"
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTagsForm;
