import React from 'react';
import { Icons } from '@utils/constantData/icons';

const McpInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: 'Open Configuration',
      desc: 'Open the Claude Desktop configuration file on your computer.',
      macPath:
        '~/Library/Application Support/Claude/claude_desktop_config.json',
      winPath: '%APPDATA%\\Claude\\claude_desktop_config.json',
    },
    {
      title: 'Paste Configuration',
      desc: 'Copy the JSON snippet from the dashboard and paste it into the "mcpServers" section of the file.',
    },
    {
      title: 'Restart Claude',
      desc: 'Fully quit and restart the Claude Desktop app to activate the server.',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white geist w-full max-w-2xl max-w-md lg:max-h-md h-fit overflow-y-scroll scrollbar-hide w-11/12 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl ovo-regular p-0 m-0 font-bold text-gray-900 flex items-center gap-2">
            <Icons.Info className="text-blue-600" size={24} />
            Setup Claude Desktop MCP
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <Icons.Cross size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                  {step.macPath && (
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          macOS Path
                        </span>
                        <code className="bg-gray-100 px-3 py-1.5 rounded-lg text-xs text-gray-600 font-mono block">
                          {step.macPath}
                        </code>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Windows Path
                        </span>
                        <code className="bg-gray-100 px-3 py-1.5 rounded-lg text-xs text-gray-600 font-mono block">
                          {step.winPath}
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default McpInfoModal;
