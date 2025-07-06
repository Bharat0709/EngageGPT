import { message, Switch, Input, Button, Tag } from 'antd';
import { Icons } from '@utils/constantData/icons';
import { updateFeedFilterSettings } from '@services/Members';
import { useState } from 'react';

function FeedFilter({ feedFilterSettings, setFeedFilterSettings, memberId }) {
  const [newHideKeyword, setNewHideKeyword] = useState('');
  const [savingFeedFilters, setSavingFeedFilters] = useState(false);

  const handleSaveFeedFilters = async () => {
    setSavingFeedFilters(true);
    try {
      await updateFeedFilterSettings(memberId, feedFilterSettings);
      message.success('Feed filter settings saved successfully');
    } catch (error) {
      message.error('Failed to save feed filter settings');
    } finally {
      setSavingFeedFilters(false);
    }
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
  
  return (
    <div>
      {' '}
      <div className="p-2">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold m-0">LinkedIn Feed Filters</h3>
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
              className="bg-[#0c4a6e] rounded-full"
            />
            <Button
              type="primary"
              onClick={handleSaveFeedFilters}
              loading={savingFeedFilters}
              className="global-button-primary rounded-lg flex items-center gap-2 ml-4"
            >
              Save Feed Filters
            </Button>
          </div>
        </div>

        {feedFilterSettings.enabled && (
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3">Keywords to Hide</h4>

            <p className="text-sm text-gray-600 mb-4">
              Posts containing these keywords will be hidden from your LinkedIn
              feed.
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
                className="global-button-primary rounded-lg"
              >
                <Icons.Plus />
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
    </div>
  );
}

export default FeedFilter;
