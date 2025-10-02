import React, { useState } from 'react';
import { Icons } from '@utils/constantData/icons';

const LeadGenerationGuide = ({ currentStep = 1 }) => {
  const [expandedStep, setExpandedStep] = useState(currentStep);

  const steps = [
    {
      id: 1,
      title: 'Define Lead Goals',
      icon: Icons.Target,
      status:
        currentStep > 1
          ? 'completed'
          : currentStep === 1
          ? 'active'
          : 'upcoming',
      description: 'Set your objectives and target audience',
      details: [
        'Define your primary objective (networking, sales, partnerships)',
        'Select your business type (B2B, B2C, freelancer)',
        'Specify target roles and industries',
        'Choose company sizes and seniority levels',
        'List your service offerings',
      ],
      benefit: 'Creates a focused strategy for identifying qualified leads',
    },
    {
      id: 2,
      title: 'Configure Automation',
      icon: Icons.Settings,
      status:
        currentStep > 2
          ? 'completed'
          : currentStep === 2
          ? 'active'
          : 'upcoming',
      description: 'Set up automated lead processing',
      details: [
        'Enable or disable automation features',
        'Choose automation type (semi or full)',
        'Select execution mode (real-time, scheduled, manual)',
        'Configure scheduling and frequency',
        'Set timezone and working hours',
      ],
      benefit:
        'Automates lead discovery and engagement based on your preferences',
    },
    {
      id: 3,
      title: 'Add Requirements',
      icon: Icons.Document,
      status:
        currentStep > 3
          ? 'completed'
          : currentStep === 3
          ? 'active'
          : 'upcoming',
      description: 'Specify custom requirements and preferences',
      details: [
        'Add detailed targeting criteria',
        'Specify messaging preferences',
        'Include industry-specific requirements',
        'Set quality and compliance standards',
        'Add any special instructions',
      ],
      benefit: 'Ensures leads match your exact specifications and standards',
    },
    {
      id: 4,
      title: 'Process Leads',
      icon: Icons.Zap,
      status: 'upcoming',
      description: 'AI-powered lead processing begins',
      details: [
        "Real-time: Leads processed instantly as they're discovered",
        'Scheduled: Batch processing at set intervals',
        'Manual: Review and approve each lead manually',
        'AI analyzes and scores lead quality',
        'Automated outreach based on your templates',
      ],
      benefit:
        'Continuous lead flow with intelligent processing and engagement',
    },
  ];

  const automationModes = [
    {
      mode: 'Real-time',
      icon: Icons.Zap,
      description: 'Instant lead processing and engagement',
      features: [
        'Immediate lead discovery',
        'Instant quality scoring',
        'Automated outreach',
        '24/7 processing',
      ],
    },
    {
      mode: 'Scheduled',
      icon: Icons.Clock,
      description: 'Batch processing at scheduled intervals',
      features: [
        'Scheduled discovery',
        'Batch analysis',
        'Controlled outreach',
        'Time-optimized',
      ],
    },
    {
      mode: 'Manual',
      icon: Icons.Users,
      description: 'Human-reviewed lead processing',
      features: [
        'Manual approval',
        'Quality control',
        'Custom messaging',
        'Full oversight',
      ],
    },
  ];

  const getStepStatus = (step) => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'active':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-600';
    }
  };

  const getIconStatus = (step) => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'active':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 overflow-y-scroll scrollbar-hide">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-3">
          <Icons.Mail className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Lead Generation Guide
        </h3>
        <p className="text-sm text-gray-600">
          AI-powered autonomous lead management system
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isExpanded = expandedStep === step.id;

          return (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
              )}

              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${getStepStatus(
                  step,
                )}`}
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getIconStatus(
                      step,
                    )}`}
                  >
                    {step.status === 'completed' ? (
                      <Icons.CheckCircle className="w-4 h-4" />
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                    <p className="text-xs opacity-80">{step.description}</p>

                    {isExpanded && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs font-medium opacity-90">
                          What you'll configure:
                        </div>
                        <ul className="space-y-1">
                          {step.details.map((detail, i) => (
                            <li
                              key={i}
                              className="text-xs opacity-75 flex items-start gap-1"
                            >
                              <span className="w-1 h-1 bg-current rounded-full mt-1.5 flex-shrink-0"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 p-2 bg-white/50 rounded-lg">
                          <div className="text-xs font-medium mb-1">
                            Benefit:
                          </div>
                          <div className="text-xs opacity-75">
                            {step.benefit}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Automation Modes Info */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-semibold text-sm text-gray-900 mb-3">
          Automation Modes
        </h4>
        <div className="space-y-3">
          {automationModes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <div key={mode.mode} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-sm text-gray-900">
                    {mode.mode}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{mode.description}</p>
                <div className="grid grid-cols-2 gap-1">
                  {mode.features.map((feature, i) => (
                    <div
                      key={i}
                      className="text-xs text-gray-500 flex items-center gap-1"
                    >
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Processing Info */}
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Icons.Zap className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-sm text-gray-900">
            AI-Powered Processing
          </span>
        </div>
        <p className="text-xs text-gray-700 mb-3">
          EngageGPT analyzes and processes leads using advanced AI to ensure
          quality and relevance.
        </p>
        <div className="space-y-1">
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            Intelligent lead scoring and qualification
          </div>
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            Personalized outreach message generation
          </div>
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            Automated follow-up and engagement tracking
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerationGuide;
