import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Download } from 'lucide-react';

const CUJTemplate = () => {
  const [journey, setJourney] = useState({
    title: '',
    description: '',
    userPersona: '',
    goal: '',
    platform: 'iOS',
    steps: [
      {
        id: 1,
        stepNumber: 1,
        action: '',
        screen: '',
        userInput: '',
        systemResponse: '',
        expectedOutcome: '',
        painPoints: '',
        notes: ''
      }
    ]
  });

  const [expandedSteps, setExpandedSteps] = useState(new Set([1]));

  const updateJourneyField = (field, value) => {
    setJourney(prev => ({ ...prev, [field]: value }));
  };

  const addStep = () => {
    const newId = Math.max(...journey.steps.map(s => s.id), 0) + 1;
    setJourney(prev => ({
      ...prev,
      steps: [...prev.steps, {
        id: newId,
        stepNumber: prev.steps.length + 1,
        action: '',
        screen: '',
        userInput: '',
        systemResponse: '',
        expectedOutcome: '',
        painPoints: '',
        notes: ''
      }]
    }));
    setExpandedSteps(prev => new Set([...prev, newId]));
  };

  const removeStep = (id) => {
    if (journey.steps.length === 1) return;
    setJourney(prev => ({
      ...prev,
      steps: prev.steps
        .filter(s => s.id !== id)
        .map((s, idx) => ({ ...s, stepNumber: idx + 1 }))
    }));
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const updateStep = (id, field, value) => {
    setJourney(prev => ({
      ...prev,
      steps: prev.steps.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      )
    }));
  };

  const toggleStep = (id) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const exportToMarkdown = () => {
    let markdown = `# ${journey.title || 'Customer User Journey'}\n\n`;
    markdown += `**Description:** ${journey.description}\n\n`;
    markdown += `**User Persona:** ${journey.userPersona}\n\n`;
    markdown += `**Goal:** ${journey.goal}\n\n`;
    markdown += `**Platform:** ${journey.platform}\n\n`;
    markdown += `---\n\n`;
    
    journey.steps.forEach(step => {
      markdown += `## Step ${step.stepNumber}: ${step.action || 'Untitled Step'}\n\n`;
      markdown += `**Screen:** ${step.screen}\n\n`;
      markdown += `**User Input:** ${step.userInput}\n\n`;
      markdown += `**System Response:** ${step.systemResponse}\n\n`;
      markdown += `**Expected Outcome:** ${step.expectedOutcome}\n\n`;
      if (step.painPoints) markdown += `**Pain Points:** ${step.painPoints}\n\n`;
      if (step.notes) markdown += `**Notes:** ${step.notes}\n\n`;
      markdown += `---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${journey.title || 'cuj'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Mobile App CUJ Template</h1>
            <button
              onClick={exportToMarkdown}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download size={20} />
              Export
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Journey Title *
              </label>
              <input
                type="text"
                value={journey.title}
                onChange={(e) => updateJourneyField('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., User Onboarding Flow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={journey.description}
                onChange={(e) => updateJourneyField('description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="Brief overview of this user journey"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Persona
                </label>
                <input
                  type="text"
                  value={journey.userPersona}
                  onChange={(e) => updateJourneyField('userPersona', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., New User"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={journey.platform}
                  onChange={(e) => updateJourneyField('platform', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="iOS">iOS</option>
                  <option value="Android">Android</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Goal
                </label>
                <input
                  type="text"
                  value={journey.goal}
                  onChange={(e) => updateJourneyField('goal', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Complete signup"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Journey Steps</h2>
            <button
              onClick={addStep}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} />
              Add Step
            </button>
          </div>

          {journey.steps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div
                onClick={() => toggleStep(step.id)}
                className="flex items-center justify-between p-4 bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                <h3 className="text-lg font-semibold">
                  Step {step.stepNumber}: {step.action || 'Untitled Step'}
                </h3>
                <div className="flex items-center gap-2">
                  {journey.steps.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStep(step.id);
                      }}
                      className="p-1 hover:bg-indigo-800 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  {expandedSteps.has(step.id) ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>

              {expandedSteps.has(step.id) && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Action / Step Title *
                    </label>
                    <input
                      type="text"
                      value={step.action}
                      onChange={(e) => updateStep(step.id, 'action', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., User taps 'Sign Up' button"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Screen / View
                    </label>
                    <input
                      type="text"
                      value={step.screen}
                      onChange={(e) => updateStep(step.id, 'screen', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Home Screen, Registration Form"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Input
                    </label>
                    <textarea
                      value={step.userInput}
                      onChange={(e) => updateStep(step.id, 'userInput', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows="2"
                      placeholder="What does the user provide or do?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      System Response
                    </label>
                    <textarea
                      value={step.systemResponse}
                      onChange={(e) => updateStep(step.id, 'systemResponse', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows="2"
                      placeholder="How does the app respond?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Outcome
                    </label>
                    <textarea
                      value={step.expectedOutcome}
                      onChange={(e) => updateStep(step.id, 'expectedOutcome', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows="2"
                      placeholder="What should happen successfully?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pain Points / Edge Cases
                    </label>
                    <textarea
                      value={step.painPoints}
                      onChange={(e) => updateStep(step.id, 'painPoints', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows="2"
                      placeholder="Potential issues, errors, or user frustrations"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={step.notes}
                      onChange={(e) => updateStep(step.id, 'notes', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows="2"
                      placeholder="Additional context, dependencies, or considerations"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CUJTemplate;