import { updateMemberSettings } from '../../../../network/Members';
import {
  message,
  Switch,
  Button,
  Input,
  Select,
  Tag,
  Divider,
  InputNumber,
} from 'antd';
import { FiPlusCircle, FiXCircle } from 'react-icons/fi';
import { useState } from 'react';
const { Option } = Select;

function PostSavingSettings({ memberId, postSettings, setPostSettings }) {
  const [savingPostSettings, setSavingPostSettings] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newExcludeKeyword, setNewExcludeKeyword] = useState('');

  const handleSavePostSettings = async () => {
    setSavingPostSettings(true);
    try {
      await updateMemberSettings(memberId, {
        postSavingPreferences: postSettings,
      });
      message.success('Post settings saved successfully');
    } catch (error) {
      message.error('Failed to save post settings');
    } finally {
      setSavingPostSettings(false);
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword && !postSettings.keywords.includes(newKeyword)) {
      setPostSettings({
        ...postSettings,
        keywords: [...postSettings.keywords, newKeyword],
      });
      setNewKeyword('');
    } else if (postSettings.keywords.includes(newKeyword)) {
      message.warning('Keyword already exists');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setPostSettings({
      ...postSettings,
      keywords: postSettings.keywords.filter((k) => k !== keyword),
    });
  };

  const handleAddExcludeKeyword = () => {
    if (
      newExcludeKeyword &&
      !postSettings.excludeKeywords.includes(newExcludeKeyword)
    ) {
      setPostSettings({
        ...postSettings,
        excludeKeywords: [...postSettings.excludeKeywords, newExcludeKeyword],
      });
      setNewExcludeKeyword('');
    } else if (postSettings.excludeKeywords.includes(newExcludeKeyword)) {
      message.warning('Excluded keyword already exists');
    }
  };

  const handleRemoveExcludeKeyword = (keyword) => {
    setPostSettings({
      ...postSettings,
      excludeKeywords: postSettings.excludeKeywords.filter(
        (k) => k !== keyword,
      ),
    });
  };

  const handleRemoveCategory = (categoryName) => {
    setPostSettings({
      ...postSettings,
      customCategories: postSettings.customCategories.filter(
        (cat) => cat.name !== categoryName,
      ),
    });
  };

  return (
    <div className="p-2">
      <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold m-0">LinkedIn Post Saver</h3>
          <p className="text-sm text-gray-500 m-0">
            Automatically save posts from your LinkedIn feed
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Switch
            checked={postSettings.enabled}
            className="bg-[#0c4a6e] rounded-full"
            onChange={(checked) => {
              setPostSettings({ ...postSettings, enabled: checked });
            }}
          />
          <Button
            type="primary"
            onClick={handleSavePostSettings}
            loading={savingPostSettings}
            className="global-button-primary hover:bg-slate-900 rounded-lg bg-[#0c4a6e] flex items-center gap-2 ml-4"
          >
            Save Post Settings
          </Button>
        </div>
      </div>

      {postSettings.enabled && (
        <>
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3">Basic Settings</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Minimum Character Count
                </label>
                <InputNumber
                  min={0}
                  value={postSettings.minCharCount}
                  onChange={(value) => {
                    setPostSettings({
                      ...postSettings,
                      minCharCount: value || 0,
                    });
                  }}
                  placeholder="Enter minimum character count"
                  style={{ width: '100%' }}
                />
                <p className="text-xs text-gray-500">
                  Only save posts with at least this many characters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Save Frequency
                </label>
                <Select
                  value={postSettings.saveFrequency}
                  onChange={(value) =>
                    setPostSettings({
                      ...postSettings,
                      saveFrequency: value,
                    })
                  }
                  className="w-full"
                >
                  <Option value="realtime">
                    Real-time while scrolling on browser
                  </Option>
                  {/* <Option value="hourly">Hourly</Option>
                        <Option value="daily">Daily</Option> */}
                </Select>
                <p className="text-xs text-gray-500">
                  How often to check for new posts
                </p>
              </div>
            </div>
          </div>

          <Divider />

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-md font-semibold m-0">
                  Keyword Filtering (Save posts with these keywords)
                </h4>
                <p className="text-sm text-gray-500 m-0">
                  Enable custom keywords to save posts
                </p>
              </div>
              <Switch
                className="bg-[#0c4a6e] rounded-full"
                checked={postSettings.enableCustomKeywords}
                onChange={(checked) => {
                  setPostSettings({
                    ...postSettings,
                    enableCustomKeywords: checked,
                  });
                }}
              />
            </div>

            {postSettings.enableCustomKeywords && (
              <>
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Include Posts with These Keywords (Example: 'hiring' ,
                    'apply now ' etc.)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add keyword"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onPressEnter={handleAddKeyword}
                    />
                    <Button
                      onClick={handleAddKeyword}
                      type="primary"
                      className="global-button-primary rounded-lg"
                    >
                      <FiPlusCircle />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {postSettings.keywords.map((keyword, index) => (
                      <Tag
                        key={index}
                        closable
                        onClose={() => handleRemoveKeyword(keyword)}
                        className="text-sm py-1"
                      >
                        {keyword}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Exclude Posts with These Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add exclude keyword"
                      value={newExcludeKeyword}
                      onChange={(e) => setNewExcludeKeyword(e.target.value)}
                      onPressEnter={handleAddExcludeKeyword}
                    />
                    <Button
                      onClick={handleAddExcludeKeyword}
                      type="primary"
                      className="global-button-primary rounded-lg"
                    >
                      <FiPlusCircle />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {postSettings.excludeKeywords.map((keyword, index) => (
                      <Tag
                        key={index}
                        closable
                        color="red"
                        onClose={() => handleRemoveExcludeKeyword(keyword)}
                        className="text-sm py-1"
                      >
                        {keyword}
                      </Tag>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mb-6">
            {postSettings.autoTagPosts && (
              <>
                <h5 className="text-sm font-medium mb-3">Custom Categories</h5>

                <div className="grid grid-cols-1 gap-4 mb-4">
                  {postSettings.customCategories.map((category, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 flex flex-col gap-2"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: category.color,
                            }}
                          ></div>
                          <h6 className="text-sm font-semibold m-0">
                            {category.name}
                          </h6>
                        </div>
                        {index > 0 && (
                          <button
                            onClick={() => handleRemoveCategory(category.name)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiXCircle size={16} />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {category.keywords.map((keyword, idx) => (
                          <Tag key={idx} className="text-xs">
                            {keyword}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <Divider />

          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3">Contact Detection</h4>
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm font-medium m-0">
                  Auto-Detect Email Addresses
                </p>
                <p className="text-xs text-gray-500 m-0">
                  Extract email addresses from posts
                </p>
              </div>
              <Switch
                className="bg-[#0c4a6e] rounded-full"
                checked={postSettings.autoDetectEmailAddresses}
                onChange={(checked) => {
                  setPostSettings({
                    ...postSettings,
                    autoDetectEmailAddresses: checked,
                  });
                }}
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium m-0">
                  Auto-Detect Form Links
                </p>
                <p className="text-xs text-gray-500 m-0">
                  Extract application/form links from posts
                </p>
              </div>
              <Switch
                className="bg-[#0c4a6e] rounded-full"
                checked={postSettings.autoDetectFormLinks}
                onChange={(checked) => {
                  setPostSettings({
                    ...postSettings,
                    autoDetectFormLinks: checked,
                  });
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PostSavingSettings;
