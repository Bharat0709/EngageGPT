import React from 'react';
import { Icons } from '@utils/constantData/icons';

const LeadGenerationHeader = ({ currentStep, stepCompletion }) => {
  const steps = [
    {
      number: 1,
      title: 'Lead Settings',
      description: 'Configure how leads are identified and saved',
      icon: Icons.Filter,
    },
    {
      number: 2,
      title: 'Summary',
      description: 'Your professional profile and background',
      icon: Icons.User,
    },
    {
      number: 3,
      title: 'Goals',
      description: 'Define your lead generation objectives',
      icon: Icons.Target,
    },
    {
      number: 4,
      title: 'Requirements',
      description: 'Detailed custom requirements and preferences',
      icon: Icons.Document,
    },
    {
      number: 5,
      title: 'Automation',
      description: 'Configure automated outreach settings',
      icon: Icons.Settings,
    },
  ];

  const getStepStatus = (stepNumber) => {
    if (currentStep === stepNumber) return 'current';
    if (stepCompletion[stepNumber]) return 'completed';
    if (stepNumber < currentStep) return 'visited';
    return 'upcoming';
  };

  const getStepStyles = (status) => {
    const baseClasses =
      'relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer';

    switch (status) {
      case 'current':
        return `${baseClasses} bg-purple-600 text-white ring-4 ring-gray-200 shadow-lg scale-110`;
      case 'completed':
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700`;
      case 'visited':
        return `${baseClasses} bg-gray-100 text-black hover:bg-gray-200`;
      case 'upcoming':
        return `${baseClasses} bg-gray-200 text-gray-500 cursor-not-allowed`;
      default:
        return `${baseClasses} bg-gray-200 text-gray-500`;
    }
  };

  const getConnectorStyles = (index) => {
    const isCompleted = stepCompletion[index + 1];
    const isCurrent = currentStep >= index + 2;

    if (isCompleted || (isCurrent && stepCompletion[index + 2])) {
      return 'h-1 bg-green-500';
    } else if (currentStep > index + 1) {
      return 'h-1 bg-blue-300';
    } else {
      return 'h-1 bg-gray-300';
    }
  };

  const canNavigateToStep = (stepNumber) => {
    // Allow navigation to current step and any previously visited steps
    return stepNumber <= currentStep || stepCompletion[stepNumber];
  };

  return (
    <div className="bg-white p-2 rounded-2xl">
      <div className="max-w-7xl flex flex-col justify-center items-center mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center flex-col gap-3 justify-between py-4">
          <div className="flex items-center w-full space-x-4">
            <div>
              <h1 className="text-2xl ovo-regular w-full text-center m-0 p-0  font-bold text-gray-900">
                Lead Generation Setup
              </h1>
              <p className="text-sm  text-center m-0 p-0 text-gray-600">
                Configure your AI-powered lead generation workflow
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="pb-6 mt-4 mb-8 self-center w-full max-w-3xl">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-row ">
                {/* Step Circle */}
                <div className="flex flex-col items-center relative">
                  <button
                    className={getStepStyles(getStepStatus(step.number))}
                    disabled={!canNavigateToStep(step.number)}
                    title={`${step.title}: ${step.description}`}
                  >
                    {stepCompletion[step.number] ? (
                      <Icons.Check className="w-5 h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </button>

                  {/* Step Label */}
                  <div className="absolute top-12 text-center min-w-max">
                    <div
                      className={`text-sm mt-1 font-medium ${
                        getStepStatus(step.number) === 'current'
                          ? 'text-black'
                          : getStepStatus(step.number) === 'completed'
                            ? 'text-green-600'
                            : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 px-4">
                    <div className={getConnectorStyles(index)}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerationHeader;
