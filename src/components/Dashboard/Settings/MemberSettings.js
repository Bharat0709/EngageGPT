import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Skeleton,
  message,
  Switch,
  Input,
  Button,
  Select,
  Divider,
  Tag,
  ColorPicker,
  InputNumber,
} from 'antd';
import {
  FiArrowLeft,
  FiSave,
  FiPlusCircle,
  FiXCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import {
  getMemberDetails,
  updateMemberSettings,
  updateFeedFilterSettings,
  getFeedFilterSettings,
  disconnectLinkedIn,
} from '../../../network/Members';

const { Option } = Select;

const MemberSettings = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savingPostSettings, setSavingPostSettings] = useState(false);
  const [savingFeedFilters, setSavingFeedFilters] = useState(false);
  const [memberData, setMemberData] = useState(null);
  const [view, setView] = useState('postsaving');

  // Form state for post saving preferences
  const [postSettings, setPostSettings] = useState({
    enabled: true,
    enableCustomKeywords: false,
    keywords: ['hiring'],
    excludeKeywords: [],
    saveAllPosts: false,
    maxPostsPerDay: 100,
    minCharCount: 50,
    postTypes: ['all'],
    autoTagPosts: false,
    customCategories: [],
    autoDetectEmailAddresses: true,
    autoDetectFormLinks: true,
    saveFrequency: 'realtime',
  });

  // Feed filter settings
  const [feedFilterSettings, setFeedFilterSettings] = useState({
    enabled: false,
    hideKeywords: [],
  });
  const [newHideKeyword, setNewHideKeyword] = useState('');

  // State for custom category inputs
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryKeywords, setNewCategoryKeywords] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3498db');
  const [newKeyword, setNewKeyword] = useState('');
  const [newExcludeKeyword, setNewExcludeKeyword] = useState('');

  const handleViewToggle = (viewName) => {
    setView(viewName);
  };

  useEffect(() => {
    const fetchMemberData = async () => {
      setLoading(true);
      try {
        // Get general member data
        const data = await getMemberDetails(memberId);
        setMemberData(data);

        // Initialize form state with member data
        if (data.postSavingPreferences) {
          setPostSettings(data.postSavingPreferences);
        }

        // Try to fetch feed filter settings from the dedicated endpoint
        try {
          const feedFilterData = await getFeedFilterSettings(memberId);
          if (feedFilterData && feedFilterData.feedFilterSettings) {
            setFeedFilterSettings(feedFilterData.feedFilterSettings);
          } else if (data.feedFilterSettings) {
            // Fallback to data from getMemberDetails if dedicated endpoint fails
            setFeedFilterSettings(data.feedFilterSettings);
          }
        } catch (filterError) {
          // Fallback to data from getMemberDetails
          if (data.feedFilterSettings) {
            setFeedFilterSettings(data.feedFilterSettings);
          }
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        message.error('Failed to fetch member data');
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

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

  const handleDisconnectLinkedIn = async () => {
    try {
      await disconnectLinkedIn(memberId);
      // Update the memberData to reflect disconnection
      setMemberData({
        ...memberData,
        isLinkedinConnected: false,
      });
      message.success('LinkedIn account disconnected successfully');
    } catch (error) {
      message.error('Failed to disconnect LinkedIn account');
    }
  };

  const handleSaveFeedFilters = async () => {
    setSavingFeedFilters(true);
    try {
      // Use the dedicated feed filter API
      await updateFeedFilterSettings(memberId, feedFilterSettings);
      message.success('Feed filter settings saved successfully');
    } catch (error) {
      message.error('Failed to save feed filter settings');
    } finally {
      setSavingFeedFilters(false);
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

  const handleAddCategory = () => {
    if (newCategoryName) {
      const keywordsArray = newCategoryKeywords
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      if (keywordsArray.length === 0) {
        message.warning('Please add at least one keyword for the category');
        return;
      }

      const newCategory = {
        name: newCategoryName,
        keywords: keywordsArray,
        color: newCategoryColor,
      };

      setPostSettings({
        ...postSettings,
        customCategories: [...postSettings.customCategories, newCategory],
      });

      // Reset inputs
      setNewCategoryName('');
      setNewCategoryKeywords('');
      setNewCategoryColor('#3498db');
    }
  };

  const handleRemoveCategory = (categoryName) => {
    setPostSettings({
      ...postSettings,
      customCategories: postSettings.customCategories.filter(
        (cat) => cat.name !== categoryName,
      ),
    });
  };

  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const handleAddHideKeyword = () => {
    if (
      newHideKeyword &&
      !feedFilterSettings.hideKeywords.includes(newHideKeyword)
    ) {
      setFeedFilterSettings({
        ...feedFilterSettings,
        hideKeywords: [...feedFilterSettings.hideKeywords, newHideKeyword],
      });
      setNewHideKeyword('');
    } else if (feedFilterSettings.hideKeywords.includes(newHideKeyword)) {
      message.warning('Keyword already exists');
    }
  };

  const handleRemoveHideKeyword = (keyword) => {
    setFeedFilterSettings({
      ...feedFilterSettings,
      hideKeywords: feedFilterSettings.hideKeywords.filter(
        (k) => k !== keyword,
      ),
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full rounded-xl scrollbar-hide overflow-auto overflow-y-scroll mx-auto lg:p-6 p-4 bg-[#f3f4f6] shadow-md">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton.Button
              active
              style={{ width: 32, height: 32 }}
              shape="circle"
            />
            <Skeleton.Input active style={{ width: 200, height: 32 }} />
          </div>
        </div>

        {/* Member info card skeleton */}
        <div className="mb-6 bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Skeleton.Avatar active size={64} shape="circle" />
          <div className="flex flex-col flex-1">
            <Skeleton.Input
              active
              style={{ width: 200, height: 24, marginBottom: 8 }}
            />
            <Skeleton.Input
              active
              style={{ width: 150, height: 16, marginBottom: 12 }}
            />
            <div className="flex gap-2">
              <Skeleton.Button active style={{ width: 80, height: 24 }} />
              <Skeleton.Button active style={{ width: 80, height: 24 }} />
              <Skeleton.Button active style={{ width: 150, height: 24 }} />
            </div>
          </div>
        </div>

        {/* Custom tab skeleton */}
        <div className="bg-white rounded-xl p-4">
          {/* Custom tab navigation skeleton */}
          <div className="flex bg-gray-50 rounded-xl p-3 gap-4 mb-4">
            <Skeleton.Button active style={{ width: 100, height: 24 }} />
            <Skeleton.Button active style={{ width: 100, height: 24 }} />
          </div>

          {/* Tab content skeleton */}
          <div className="p-2">
            <Skeleton.Input
              active
              style={{ width: 200, height: 24, marginBottom: 16 }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton.Input active style={{ width: 150, height: 16 }} />
                <Skeleton.Input active style={{ width: '100%', height: 40 }} />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton.Input active style={{ width: 150, height: 16 }} />
                <Skeleton.Input active style={{ width: '100%', height: 40 }} />
              </div>
            </div>

            <Skeleton.Input
              active
              style={{
                width: '100%',
                height: 1,
                marginBottom: 24,
                marginTop: 24,
              }}
            />

            <div className="flex justify-between">
              <Skeleton.Input active style={{ width: 200, height: 24 }} />
              <Skeleton.Button active style={{ width: 100, height: 40 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl scrollbar-hide overflow-auto overflow-y-scroll mx-auto lg:p-6 p-4 bg-[#f3f4f6] shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft size={20} />
          </button>
          <h2 className="text-2xl text-semibold m-0">Member Settings</h2>
        </div>
      </div>

      <div className="mb-2 bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <img
          src={memberData?.profilePicture}
          alt={memberData?.name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {memberData?.name}
              </h3>
              <p className="text-sm text-gray-600">{memberData?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <p className="p-1 px-3 rounded-md text-xs bg-gray-50">
              {memberData?.plan} Plan
            </p>
            <p className="p-1 px-3 rounded-md text-xs bg-gray-50">
              {memberData?.credits} Credits Available
            </p>
            <p className="p-1 px-3 rounded-md text-xs bg-gray-50">
              {memberData?.totalCreditsUsed} Credits Used
            </p>
            <p className="p-1 px-3 rounded-md text-xs bg-gray-50">
              Timezone: {memberData?.timeZone}
            </p>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <p className="p-1 px-3 rounded-md text-xs bg-gray-50">
                Member since:{' '}
                {new Date(memberData?.accountCreatedAt).toLocaleDateString()}
              </p>
              <p className="p-1 px-3 rounded-md text-xs bg-gray-50">
                Last active:{' '}
                {new Date(memberData?.lastActive).toLocaleDateString()}
              </p>
              {memberData?.writingPersona && (
                <p className="p-1 px-3 rounded-md text-xs bg-gray-50">
                  Writing Persona: {memberData?.writingPersona}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-gray-50 rounded-xl p-3 text-sm justify-start gap-4 items-center mt-4 mb-2">
        <button
          onClick={() => handleViewToggle('postsaving')}
          className={`${
            view === 'postsaving' ? 'text-black font-semibold' : 'text-gray-600'
          }`}
        >
          Post Saving Settings
        </button>

        <button
          onClick={() => handleViewToggle('feedfilters')}
          className={`${
            view === 'feedfilters'
              ? 'text-black font-semibold'
              : 'text-gray-600'
          }`}
        >
          Feed Filters
        </button>
        <button
          onClick={() => handleViewToggle('linkedin')}
          className={`${
            view === 'linkedin' ? 'text-black font-semibold' : 'text-gray-600'
          }`}
        >
          LinkedIn Integration
        </button>
      </div>

      {/* Custom tabs implementation */}
      <div className="bg-white rounded-xl p-4">
        {view === 'postsaving' && (
          <div className="p-2">
            <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold m-0">
                  LinkedIn Post Saver
                </h3>
                <p className="text-sm text-gray-500 m-0">
                  Automatically save posts from your LinkedIn feed
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Switch
                  checked={postSettings.enabled}
                  onChange={(checked) => {
                    setPostSettings({ ...postSettings, enabled: checked });
                  }}
                />
                <Button
                  type="primary"
                  onClick={handleSavePostSettings}
                  loading={savingPostSettings}
                  className="global-button-primary rounded-md flex items-center gap-2 ml-4"
                >
                  <FiSave size={16} />
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
                        min={10}
                        max={500}
                        value={postSettings.minCharCount}
                        onChange={(value) =>
                          setPostSettings({
                            ...postSettings,
                            minCharCount: value,
                          })
                        }
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Only save posts with at least this many characters
                      </p>
                    </div>
                    {/* 
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Maximum Posts Per Day
                      </label>
                      <InputNumber
                        min={10}
                        max={1000}
                        value={postSettings.maxPostsPerDay}
                        onChange={(value) =>
                          setPostSettings({
                            ...postSettings,
                            maxPostsPerDay: value,
                          })
                        }
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Limit the number of posts saved daily
                      </p>
                    </div> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Post Types
                      </label>
                      <Select
                        mode="multiple"
                        value={postSettings.postTypes}
                        onChange={(value) =>
                          setPostSettings({
                            ...postSettings,
                            postTypes: value,
                          })
                        }
                        className="w-full"
                      >
                        <Option value="all">All Types</Option>
                        <Option value="text">Text Only</Option>
                        <Option value="image">Images</Option>
                        <Option value="video">Videos</Option>
                        <Option value="document">Documents</Option>
                        <Option value="link">Links</Option>
                        <Option value="poll">Polls</Option>
                      </Select>
                    </div> */}

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

                  {/* <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm font-medium m-0">Save All Posts</p>
                      <p className="text-xs text-gray-500 m-0">
                        Save all posts without keyword filtering
                      </p>
                    </div>
                    <Switch
                      checked={postSettings.saveAllPosts}
                      onChange={(checked) => {
                        setPostSettings({
                          ...postSettings,
                          saveAllPosts: checked,
                        });
                      }}
                    />
                  </div> */}
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
                            className="global-button-primary rounded-sm"
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
                            onChange={(e) =>
                              setNewExcludeKeyword(e.target.value)
                            }
                            onPressEnter={handleAddExcludeKeyword}
                          />
                          <Button
                            onClick={handleAddExcludeKeyword}
                            type="primary"
                            className="global-button-primary rounded-sm"
                          >
                            <FiPlusCircle />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {postSettings.excludeKeywords.map(
                            (keyword, index) => (
                              <Tag
                                key={index}
                                closable
                                color="red"
                                onClose={() =>
                                  handleRemoveExcludeKeyword(keyword)
                                }
                                className="text-sm py-1"
                              >
                                {keyword}
                              </Tag>
                            ),
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mb-6">
                  {/* <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-md font-semibold m-0">
                        Auto-Categorization
                      </h4>
                      <p className="text-sm text-gray-500 m-0">
                        Automatically categorize posts based on content
                      </p>
                    </div>
                    <Switch
                      checked={postSettings.autoTagPosts}
                      onChange={(checked) => {
                        setPostSettings({
                          ...postSettings,
                          autoTagPosts: checked,
                        });
                      }}
                    />
                  </div> */}

                  {postSettings.autoTagPosts && (
                    <>
                      <h5 className="text-sm font-medium mb-3">
                        Custom Categories
                      </h5>

                      <div className="grid grid-cols-1 gap-4 mb-4">
                        {postSettings.customCategories.map(
                          (category, index) => (
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
                                    onClick={() =>
                                      handleRemoveCategory(category.name)
                                    }
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
                          ),
                        )}
                      </div>

                      <div className="border rounded-lg p-3">
                        <h5 className="text-sm font-medium mb-2">
                          Add New Category
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <Input
                            placeholder="Category name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                          />
                          <Input
                            placeholder="Keywords (comma separated)"
                            value={newCategoryKeywords}
                            onChange={(e) =>
                              setNewCategoryKeywords(e.target.value)
                            }
                          />
                          <ColorPicker
                            value={newCategoryColor}
                            onChange={(color) =>
                              setNewCategoryColor(color.toHexString())
                            }
                          />
                        </div>
                        <Button
                          onClick={handleAddCategory}
                          type="primary"
                          className="global-button-primary"
                        >
                          Add Category
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <Divider />

                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3">
                    Contact Detection
                  </h4>
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
        )}

        {view === 'linkedin' && (
          <div className="p-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold m-0">
                  LinkedIn Connection
                </h3>
                <p className="text-sm text-gray-500 m-0">
                  Manage LinkedIn account integration
                </p>
              </div>
            </div>

            {memberData?.isLinkedinConnected ? (
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3">
                  Account Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium m-0">Followers</p>
                    <p className="text-xl font-semibold">
                      {memberData?.followersCount.toLocaleString()}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium m-0">Connections</p>
                    <p className="text-xl font-semibold">
                      {memberData?.connectionsCount.toLocaleString()}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium m-0">Profile Views</p>
                    <p className="text-xl font-semibold">
                      {memberData?.profileViews.toLocaleString()}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium m-0">
                      Search Appearances
                    </p>
                    <p className="text-xl font-semibold">
                      {memberData?.searchAppearances.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Last Synced</p>
                  <p className="text-sm text-gray-600">
                    {memberData?.lastSyncedAt
                      ? new Date(memberData.lastSyncedAt).toLocaleString()
                      : 'Never'}
                  </p>
                </div>

                <button
                  className="bg-red-600 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] border border-black rounded-none px-6 py-2 text-sm font-medium flex items-center gap-2"
                  onClick={handleDisconnectLinkedIn}
                >
                  Disconnect LinkedIn
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 border rounded-lg">
                <FiAlertCircle size={48} className="text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">
                  LinkedIn Not Connected
                </p>
                <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
                  Connect LinkedIn to automatically save posts and access
                  analytics features
                </p>
                <button
                  onClick={handleConnectLinkedIn}
                  className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#00000"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Connect LinkedIn Account
                </button>
              </div>
            )}
          </div>
        )}

        {view === 'feedfilters' && (
          <div className="p-2">
            <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold m-0">
                  LinkedIn Feed Filters
                </h3>
                <p className="text-sm text-gray-500 m-0">
                  Hide unwanted posts from your LinkedIn feed
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Switch
                  checked={feedFilterSettings.enabled}
                  onChange={(checked) => {
                    setFeedFilterSettings({
                      ...feedFilterSettings,
                      enabled: checked,
                    });
                  }}
                />
                <Button
                  type="primary"
                  onClick={handleSaveFeedFilters}
                  loading={savingFeedFilters}
                  className="global-button-primary rounded-md flex items-center gap-2 ml-4"
                >
                  <FiSave size={16} />
                  Save Feed Filters
                </Button>
              </div>
            </div>

            {feedFilterSettings.enabled && (
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3">Keywords to Hide</h4>

                <p className="text-sm text-gray-600 mb-4">
                  Posts containing these keywords will be hidden from your
                  LinkedIn feed.
                </p>

                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add keyword to hide"
                    value={newHideKeyword}
                    onChange={(e) => setNewHideKeyword(e.target.value)}
                    onPressEnter={handleAddHideKeyword}
                  />
                  <Button
                    onClick={handleAddHideKeyword}
                    type="primary"
                    className="global-button-primary rounded-sm"
                  >
                    <FiPlusCircle />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {feedFilterSettings.hideKeywords.length > 0 ? (
                    feedFilterSettings.hideKeywords.map((keyword, index) => (
                      <Tag
                        key={index}
                        closable
                        color="red"
                        onClose={() => handleRemoveHideKeyword(keyword)}
                        className="text-sm py-1"
                      >
                        {keyword}
                      </Tag>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No keywords added yet. Add keywords above to hide posts
                      containing them.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSettings;
