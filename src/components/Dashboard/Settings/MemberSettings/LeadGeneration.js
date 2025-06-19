import React from 'react';
import { useState } from 'react';
import { updateLeadGenerationGoals } from '../../../../network/Members';
import { FiPlusCircle } from 'react-icons/fi';
import { message, Input, Button, Select, Divider, Tag } from 'antd';

function LeadGeneration({
  leadGenerationGoals,
  setLeadGenerationGoals,
  memberId,
}) {
  const { Option } = Select;
  const [newRole, setNewRole] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newServiceOffering, setNewServiceOffering] = useState('');
  const [savingLeadGeneration, setSavingLeadGeneration] = useState(false);

  const handleSaveLeadGeneration = async () => {
    setSavingLeadGeneration(true);
    try {
      await updateLeadGenerationGoals(memberId, {
        leadGenerationGoals: leadGenerationGoals,
      });
      message.success('Lead generation goals saved successfully');
    } catch (error) {
      message.error('Failed to save lead generation goals');
    } finally {
      setSavingLeadGeneration(false);
    }
  };

  const handleAddRole = () => {
    if (
      newRole &&
      !leadGenerationGoals.targetAudience.roles.includes(newRole)
    ) {
      setLeadGenerationGoals({
        ...leadGenerationGoals,
        targetAudience: {
          ...leadGenerationGoals.targetAudience,
          roles: [...leadGenerationGoals.targetAudience.roles, newRole],
        },
      });
      setNewRole('');
    } else if (leadGenerationGoals.targetAudience.roles.includes(newRole)) {
      message.warning('Role already exists');
    }
  };

  const handleRemoveRole = (role) => {
    setLeadGenerationGoals({
      ...leadGenerationGoals,
      targetAudience: {
        ...leadGenerationGoals.targetAudience,
        roles: leadGenerationGoals.targetAudience.roles.filter(
          (item) => item !== role,
        ),
      },
    });
  };

  const handleAddIndustry = () => {
    if (
      newIndustry &&
      !leadGenerationGoals.targetAudience.industries.includes(newIndustry)
    ) {
      setLeadGenerationGoals({
        ...leadGenerationGoals,
        targetAudience: {
          ...leadGenerationGoals.targetAudience,
          industries: [
            ...leadGenerationGoals.targetAudience.industries,
            newIndustry,
          ],
        },
      });
      setNewIndustry('');
    } else if (
      leadGenerationGoals.targetAudience.industries.includes(newIndustry)
    ) {
      message.warning('Industry already exists');
    }
  };

  const handleRemoveIndustry = (industry) => {
    setLeadGenerationGoals({
      ...leadGenerationGoals,
      targetAudience: {
        ...leadGenerationGoals.targetAudience,
        industries: leadGenerationGoals.targetAudience.industries.filter(
          (item) => item !== industry,
        ),
      },
    });
  };

  const handleAddServiceOffering = () => {
    if (
      newServiceOffering &&
      !leadGenerationGoals.serviceOfferings.includes(newServiceOffering)
    ) {
      setLeadGenerationGoals({
        ...leadGenerationGoals,
        serviceOfferings: [
          ...leadGenerationGoals.serviceOfferings,
          newServiceOffering,
        ],
      });
      setNewServiceOffering('');
    } else if (
      leadGenerationGoals.serviceOfferings.includes(newServiceOffering)
    ) {
      message.warning('Service offering already exists');
    }
  };

  const handleRemoveServiceOffering = (service) => {
    setLeadGenerationGoals({
      ...leadGenerationGoals,
      serviceOfferings: leadGenerationGoals.serviceOfferings.filter(
        (item) => item !== service,
      ),
    });
  };
  return (
    <div>
      {' '}
      <div className="p-2">
        <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold m-0">Lead Generation Goals</h3>
            <p className="text-sm text-gray-500 m-0">
              Define your networking and business objectives
            </p>
          </div>
          <Button
            type="primary"
            onClick={handleSaveLeadGeneration}
            loading={savingLeadGeneration}
            className="global-button-primary rounded-lg flex items-center gap-2"
          >
            Save Goals
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Primary Objective
            </label>
            <Select
              value={leadGenerationGoals.primaryObjective}
              onChange={(value) =>
                setLeadGenerationGoals({
                  ...leadGenerationGoals,
                  primaryObjective: value,
                })
              }
            >
              <Option value="job_search">Job Search</Option>
              <Option value="client_acquisition">Client Acquisition</Option>
              <Option value="partnership_building">Partnership Building</Option>
              <Option value="networking">Networking</Option>
              <Option value="brand_building">Brand Building</Option>
              <Option value="knowledge_sharing">Knowledge Sharing</Option>
              <Option value="recruitment">Recruitment</Option>
              <Option value="sales_prospecting">Sales Prospecting</Option>
              <Option value="investment_seeking">Investment Seeking</Option>
              <Option value="mentorship">Mentorship</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Business Type
            </label>
            <Select
              value={leadGenerationGoals.businessType}
              onChange={(value) =>
                setLeadGenerationGoals({
                  ...leadGenerationGoals,
                  businessType: value,
                })
              }
            >
              <Option value="b2b">B2B</Option>
              <Option value="b2c">B2C</Option>
              <Option value="b2b2c">B2B2C</Option>
              <Option value="freelancer">Freelancer</Option>
              <Option value="job_seeker">Job Seeker</Option>
              <Option value="entrepreneur">Entrepreneur</Option>
            </Select>
          </div>
        </div>

        <Divider />

        <h4 className="text-md font-semibold mb-4">Target Audience</h4>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Target Roles
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add target role (e.g., HR Manager, CTO, Marketing Director)"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onPressEnter={handleAddRole}
            />
            <Button
              onClick={handleAddRole}
              type="primary"
              className="global-button-primary rounded-lg"
            >
              <FiPlusCircle />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {leadGenerationGoals.targetAudience.roles.map((role, index) => (
              <Tag
                key={index}
                closable
                onClose={() => handleRemoveRole(role)}
                className="text-sm py-1"
              >
                {role}
              </Tag>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Target Industries
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add target industry (e.g., SaaS, E-commerce, FinTech)"
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              onPressEnter={handleAddIndustry}
            />
            <Button
              onClick={handleAddIndustry}
              type="primary"
              className="global-button-primary rounded-lg"
            >
              <FiPlusCircle />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {leadGenerationGoals.targetAudience.industries.map(
              (industry, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveIndustry(industry)}
                  className="text-sm py-1"
                >
                  {industry}
                </Tag>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Company Sizes
            </label>
            <Select
              mode="multiple"
              value={leadGenerationGoals.targetAudience.companySizes}
              onChange={(value) =>
                setLeadGenerationGoals({
                  ...leadGenerationGoals,
                  targetAudience: {
                    ...leadGenerationGoals.targetAudience,
                    companySizes: value,
                  },
                })
              }
              placeholder="Select company sizes"
            >
              <Option value="startup">Startup</Option>
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
              <Option value="enterprise">Enterprise</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Seniority Levels
            </label>
            <Select
              mode="multiple"
              value={leadGenerationGoals.targetAudience.seniority}
              onChange={(value) =>
                setLeadGenerationGoals({
                  ...leadGenerationGoals,
                  targetAudience: {
                    ...leadGenerationGoals.targetAudience,
                    seniority: value,
                  },
                })
              }
              placeholder="Select seniority levels"
            >
              <Option value="entry">Entry Level</Option>
              <Option value="junior">Junior</Option>
              <Option value="mid">Mid Level</Option>
              <Option value="senior">Senior</Option>
              <Option value="executive">Executive</Option>
              <Option value="founder">Founder</Option>
            </Select>
          </div>
        </div>

        <Divider />

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Service Offerings
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add service offering (e.g., Web Development, Digital Marketing, Consulting)"
              value={newServiceOffering}
              onChange={(e) => setNewServiceOffering(e.target.value)}
              onPressEnter={handleAddServiceOffering}
            />
            <Button
              onClick={handleAddServiceOffering}
              type="primary"
              className="global-button-primary rounded-lg"
            >
              <FiPlusCircle />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {leadGenerationGoals.serviceOfferings.map((service, index) => (
              <Tag
                key={index}
                closable
                onClose={() => handleRemoveServiceOffering(service)}
                className="text-sm py-1"
              >
                {service}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadGeneration;
