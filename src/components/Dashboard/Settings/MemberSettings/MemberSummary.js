import React from 'react';
import { updateMemberSummary } from '../../../../network/Members';
import { useState } from 'react';
import { Button, Input, Select, Tag, Divider, message } from 'antd';
import { FiPlusCircle } from 'react-icons/fi';
const { Option } = Select;

function MemberSummary({
  professionalProfile,
  setProfessionalProfile,
  memberId,
}) {
  const [savingSummary, setSavingSummary] = useState(false);
  const [newFunctionalArea, setNewFunctionalArea] = useState('');

  const handleAddFunctionalArea = () => {
    if (
      newFunctionalArea &&
      !professionalProfile.functionalArea.includes(newFunctionalArea)
    ) {
      setProfessionalProfile({
        ...professionalProfile,
        functionalArea: [
          ...professionalProfile.functionalArea,
          newFunctionalArea,
        ],
      });
      setNewFunctionalArea('');
    } else if (professionalProfile.functionalArea.includes(newFunctionalArea)) {
      message.warning('Functional area already exists');
    }
  };

  const handleRemoveFunctionalArea = (area) => {
    setProfessionalProfile({
      ...professionalProfile,
      functionalArea: professionalProfile.functionalArea.filter(
        (item) => item !== area,
      ),
    });
  };

  const handleSaveSummary = async () => {
    setSavingSummary(true);
    try {
      await updateMemberSummary(memberId, {
        professionalProfile: professionalProfile,
      });
      message.success('Professional profile saved successfully');
    } catch (error) {
      message.error('Failed to save professional profile');
    } finally {
      setSavingSummary(false);
    }
  };
  return (
    <div>
      {' '}
      <div className="p-2">
        <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold m-0">Professional Summary</h3>
            <p className="text-sm text-gray-500 m-0">
              Update your professional profile information
            </p>
          </div>
          <Button
            type="primary"
            onClick={handleSaveSummary}
            loading={savingSummary}
            className="global-button-primary rounded-lg flex items-center gap-2"
          >
            Save Summary
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Current Role
            </label>
            <Input
              placeholder="e.g., Software Developer, Digital Marketer"
              value={professionalProfile.currentRole}
              onChange={(e) =>
                setProfessionalProfile({
                  ...professionalProfile,
                  currentRole: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Industry
            </label>
            <Input
              placeholder="e.g., Technology, Healthcare, Finance"
              value={professionalProfile.industry}
              onChange={(e) =>
                setProfessionalProfile({
                  ...professionalProfile,
                  industry: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Profile Description
          </label>
          <Input.TextArea
            rows={4}
            placeholder="Brief description of your professional background..."
            value={professionalProfile.profileDescription}
            onChange={(e) =>
              setProfessionalProfile({
                ...professionalProfile,
                profileDescription: e.target.value,
              })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Experience Level
            </label>
            <Select
              value={professionalProfile.experienceLevel}
              onChange={(value) =>
                setProfessionalProfile({
                  ...professionalProfile,
                  experienceLevel: value,
                })
              }
            >
              <Option value="entry">Entry Level</Option>
              <Option value="junior">Junior</Option>
              <Option value="mid">Mid Level</Option>
              <Option value="senior">Senior</Option>
              <Option value="executive">Executive</Option>
              <Option value="student">Student</Option>
              <Option value="fresher">Fresher</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Company Size
            </label>
            <Select
              value={professionalProfile.companySize}
              onChange={(value) =>
                setProfessionalProfile({
                  ...professionalProfile,
                  companySize: value,
                })
              }
            >
              <Option value="startup">Startup</Option>
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
              <Option value="enterprise">Enterprise</Option>
              <Option value="freelancer">Freelancer</Option>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Functional Areas
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add functional area (e.g., Marketing, Sales, Development)"
              value={newFunctionalArea}
              onChange={(e) => setNewFunctionalArea(e.target.value)}
              onPressEnter={handleAddFunctionalArea}
            />
            <Button
              onClick={handleAddFunctionalArea}
              type="primary"
              className="global-button-primary rounded-lg"
            >
              <FiPlusCircle />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {professionalProfile.functionalArea.map((area, index) => (
              <Tag
                key={index}
                closable
                onClose={() => handleRemoveFunctionalArea(area)}
                className="text-sm py-1"
              >
                {area}
              </Tag>
            ))}
          </div>
        </div>

        <Divider />

        <h4 className="text-md font-semibold mb-4">Location Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">City</label>
            <Input
              placeholder="Enter city"
              value={professionalProfile.location.city}
              onChange={(e) =>
                setProfessionalProfile({
                  ...professionalProfile,
                  location: {
                    ...professionalProfile.location,
                    city: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Country</label>
            <Input
              placeholder="Enter country"
              value={professionalProfile.location.country}
              onChange={(e) =>
                setProfessionalProfile({
                  ...professionalProfile,
                  location: {
                    ...professionalProfile.location,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Work Mode
            </label>
            <Select
              value={professionalProfile.location.workMode}
              onChange={(value) =>
                setProfessionalProfile({
                  ...professionalProfile,
                  location: {
                    ...professionalProfile.location,
                    workMode: value,
                  },
                })
              }
            >
              <Option value="remote">Remote</Option>
              <Option value="onsite">Onsite</Option>
              <Option value="hybrid">Hybrid</Option>
              <Option value="flexible">Flexible</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberSummary;
