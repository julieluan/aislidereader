import React, { useState } from 'react';
import {
  ChevronRight,
  Layout,
  FileText,
  CheckCircle,
  Plus,
  Settings,
  Users,
  Mic,
  ImageIcon,
  MessageSquare,
  ArrowLeft,
  MoreHorizontal,
  PlayCircle,
  Edit3,
  Trash2,
  Send,
  GripVertical,
  ClipboardList,
  Tag,
  Speaker,
  Download,
  Share2,
  List,
  MessageCircle,
  Clock,
  Check,
  Image,
  Archive,
  Eye,
  History,
} from 'lucide-react';
import { VoiceButton } from "@/components/ui/voice-button"
import { LiveWaveform } from "@/components/ui/live-waveform"

// --- ElevenLabs 风格的 TagsInput 组件 ---
const TagsInput = ({ initialTags, label, required, placeholder }) => {
  const [tags, setTags] = useState(initialTags || []);
  const [inputValue, setInputValue] = useState('');

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.type === 'click' || e.type === 'blur') && inputValue.trim() !== '') {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const Icon = label.includes('Required') ? ClipboardList : Tag;

  return (
    <div className="flex flex-col">
      <label className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        <Icon size={14} className="mr-2 text-blue-500" />
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap items-center p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all min-h-[48px]">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-blue-100 text-blue-800 rounded-full text-xs font-medium mr-2 mb-1 px-3 py-1.5 whitespace-nowrap">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTag}
          onBlur={addTag}
          placeholder={placeholder || "Add a tag and press Enter"}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-700 p-1"
        />
      </div>
    </div>
  );
};

// --- ElevenLabs 风格的 Stepper 组件 ---
const Stepper = ({ currentStep, onStepClick }) => {
  const steps = [
    { id: 1, name: 'Knowledge Input' },
    { id: 2, name: 'Outline Adjustment' },
    { id: 3, name: 'Slide Editor' },
    { id: 4, name: 'Review & Agent' },
  ];

  return (
    <div className="w-full bg-white shadow-sm py-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center cursor-pointer group"
            onClick={() => onStepClick(step.id)}
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-full text-base font-semibold transition-all duration-300 ${
              currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
            }`}>
              {step.id}
            </div>
            <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
              currentStep >= step.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'
            } hidden sm:block`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-[2px] mx-4 transition-colors duration-300 ${currentStep > step.id ? 'bg-blue-400' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 更新：TemplateCard 组件（增加 Preview 按钮）---
const TemplateCard = ({ title, features, scope, onSelect, onPreview, templateData }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between group h-full">
    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium self-start">{scope}</span>
    <h4 className="text-md font-bold text-gray-900 mt-3 mb-1">{title}</h4>
    <p className="text-xs text-gray-500 min-h-[40px] flex-grow">{features}</p>
    <div className="mt-4 flex space-x-2">
      <button
        onClick={(e) => { e.stopPropagation(); onPreview(templateData); }}
        className="flex-1 py-2 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Preview
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onSelect(title); }}
        className="flex-1 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Use
      </button>
    </div>
  </div>
);

// --- 新增：模板预览 Modal ---
const TemplatePreviewModal = ({ onClose, template, onUseTemplate }) => {
  const handleUse = () => {
    onUseTemplate(template.title);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden transform scale-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Layout className="w-5 h-5 mr-3 text-blue-600" />
            Template Preview: {template.title}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
            <Plus size={20} className="rotate-45" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">{template.scope} Style</span>
            <p className="text-sm text-gray-600">Key Features: **{template.features}**</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mock Module Interface</h3>
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center border-4 border-gray-300 shadow-inner">
            <p className="text-gray-500 italic text-center p-4">
              <br/>
              - **Visual Style:** {template.scope === 'Biology' ? 'Flowchart' : template.scope === 'History' ? 'Timeline' : 'Diagrams'} <br/>
              - **Accessibility Mode:** {template.features.split(', ')[1]}
            </p>
          </div>
          <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <h4 className="text-md font-bold text-gray-800 mb-2">Agent Tone Preview</h4>
            <p className="text-sm text-gray-600">
              "Hello! I'm the {template.title} learning agent. This template focuses on chunking complex information (ADHD mode) and visualizing relationships. Let's start with a quick quiz on the cell cycle!"
            </p>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end space-x-3">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Close Preview</button>
          <button
            onClick={handleUse}
            className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-md transition-colors flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 新增：Transcription History Modal ---
const TranscriptionHistoryModal = ({ onClose, transcriptions, onUseTranscription }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[600px] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-purple-50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <History className="w-5 h-5 mr-3 text-purple-600" />
            Recent Transcriptions
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
            <Plus size={20} className="rotate-45" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {transcriptions.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No recent transcriptions</p>
          ) : (
            transcriptions.map((trans) => (
              <div key={trans.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 line-clamp-2">{trans.text}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>Confidence: {trans.confidence}%</span>
                      <span>Duration: {trans.duration}s</span>
                      <span className="text-orange-600">⏰ Expires in {trans.expiresIn}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onUseTranscription(trans.text)}
                    className="ml-3 px-3 py-1.5 text-xs font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Use
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">Transcriptions are automatically deleted after 24 hours</p>
        </div>
      </div>
    </div>
  );
};

// --- 更新：Step 1 (增加课程状态和转录历史) ---
const Step1Input = ({ onNext, courseStatus, onStatusChange }) => {
  const [topicName, setTopicName] = useState('Introduction to Cellular Respiration');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [knowledgeText, setKnowledgeText] = useState("The mitochondria...");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [transcriptionHistoryOpen, setTranscriptionHistoryOpen] = useState(false);

  // Mock transcription history data
  const [transcriptions] = useState([
    { id: 1, text: "Cellular respiration is a metabolic process...", confidence: 95, duration: 45, expiresIn: "23h 15m" },
    { id: 2, text: "The Krebs cycle occurs in the mitochondrial matrix...", confidence: 88, duration: 32, expiresIn: "22h 40m" },
  ]);

  const templates = [
    { title: "Mitosis Masterclass", features: "Mermaid Flowchart, High Contrast Mode, 12 Q&A Triggers.", scope: "Biology" },
    { title: "Ancient Rome Timeline", features: "Interactive Timeline Visual, Dyslexia Font Enabled, 8 Q&A Triggers.", scope: "History" },
    { title: "Linear Algebra Intro", features: "Napkin AI Diagrams, ADHD Chunking Mode, Advanced Agent Tone.", scope: "Math" },
    { title: "Web Dev Fundamentals", features: "Code Snippet Support, Interactive Exercises, Project-Based.", scope: "Computer Science" },
  ];

  const commonTopics = ['Science - Basic', 'History - Timelines', 'Math - Diagrams', 'Language - Vocabulary'];

  const handleTemplateSelect = (title) => {
    setTopicName(title);
  }

  const handlePreview = (templateData) => {
    setSelectedTemplate(templateData);
    setPreviewModalOpen(true);
  }

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setKnowledgeText(prev => prev + "\n\n[Transcribed voice note would appear here]");
      }, 2000);
    } else {
      setIsRecording(true);
    }
  };

  const handleUseTranscription = (text) => {
    setKnowledgeText(prev => prev + "\n\n" + text);
    setTranscriptionHistoryOpen(false);
  };

  const voiceState = isProcessing ? "processing" : isRecording ? "recording" : "idle";

  const getStatusBadge = () => {
    const statusConfig = {
      'draft': { color: 'bg-gray-100 text-gray-700', icon: '📝', label: 'Draft' },
      'outline-generated': { color: 'bg-blue-100 text-blue-700', icon: '📋', label: 'Outline Generated' },
      'slides-generated': { color: 'bg-purple-100 text-purple-700', icon: '🎨', label: 'Slides Generated' },
      'agent-created': { color: 'bg-green-100 text-green-700', icon: '🤖', label: 'Agent Created' },
      'published': { color: 'bg-emerald-100 text-emerald-700', icon: '✅', label: 'Published' },
      'archived': { color: 'bg-orange-100 text-orange-700', icon: '📦', label: 'Archived' }
    };
    const config = statusConfig[courseStatus] || statusConfig['draft'];
    return (
      <span className={`px-3 py-1.5 ${config.color} text-sm rounded-full font-medium flex items-center gap-2`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-10 animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create New Learning Module</h2>
        {getStatusBadge()}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject / Topic Name</label>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="e.g. Introduction to Cellular Respiration"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience (Accessibility)</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option>ADHD Focused (Short segments, high interaction)</option>
            <option>Dyslexia Friendly (OpenDyslexic font, audio heavy)</option>
            <option>General</option>
            <option>Hearing Impaired (Visual heavy, auto-captions)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
        <TagsInput
          label="Required Concepts/Areas"
          initialTags={['Glycolysis', 'Krebs Cycle', 'ETC']}
          required={true}
          placeholder="Add required concepts"
        />
        <TagsInput
          label="Optional Input Areas (Keywords)"
          initialTags={['Anaerobic Respiration', 'ATP Production']}
          required={false}
          placeholder="Add optional keywords"
        />
      </div>
      <div className="mb-10 pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Layout className="w-5 h-5 mr-2 text-blue-600" />
          Community Templates (Workbench)
          <span className="text-sm font-medium text-gray-500 ml-4">(Click 'Preview' for a visual mock)</span>
        </h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="text-xs font-semibold text-gray-500 uppercase">Common Topics:</span>
          {commonTopics.map((topic, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-300 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors">
              {topic}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              {...template}
              templateData={template}
              onSelect={handleTemplateSelect}
              onPreview={handlePreview}
            />
          ))}
        </div>
      </div>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Knowledge Requirements (Natural Language) <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTranscriptionHistoryOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <History size={14} />
              History ({transcriptions.length})
            </button>
            <VoiceButton
              state={voiceState}
              onPress={handleVoiceToggle}
              disabled={isProcessing}
              trailing="Dictate Notes"
            />
          </div>
        </div>
        <div className="relative">
          <textarea
            rows={10}
            value={knowledgeText}
            onChange={(e) => setKnowledgeText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed transition-all"
            placeholder="Paste your lecture notes, textbook content, or rough ideas here. The AI will structure this for you..."
          />
          <div className="absolute bottom-3 right-4 text-xs text-gray-400">
            {isRecording ? "🎙️ Recording..." : isProcessing ? "⏳ Transcribing..." : "Natural Language Processing Enabled"}
          </div>
        </div>
        {(isRecording || isProcessing) && (
          <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} />
              <LiveWaveform
                active={isRecording}
                processing={isProcessing}
                className="flex-1 h-10"
                barColor={isRecording ? "#ef4444" : "#3b82f6"}
              />
              <span className="text-sm text-gray-600">
                {isRecording ? "Speak now..." : "Processing audio..."}
              </span>
            </div>
          </div>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Tip: You can paste messy notes or use the voice button to dictate; our agent will organize them.
        </p>
      </div>
      <div className="flex justify-end pt-8 border-t border-gray-100">
        <div className="flex space-x-4">
          <button
            onClick={() => onStatusChange('draft')}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
          >
            Save Draft
          </button>
          <button
            onClick={() => {
              onStatusChange('outline-generated');
              onNext();
            }}
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all flex items-center"
          >
            Generate Outline
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </button>
        </div>
      </div>
      {previewModalOpen && selectedTemplate && (
        <TemplatePreviewModal
          onClose={() => setPreviewModalOpen(false)}
          template={selectedTemplate}
          onUseTemplate={handleTemplateSelect}
        />
      )}
      {transcriptionHistoryOpen && (
        <TranscriptionHistoryModal
          onClose={() => setTranscriptionHistoryOpen(false)}
          transcriptions={transcriptions}
          onUseTranscription={handleUseTranscription}
        />
      )}
    </div>
  );
};
// --- 新增：Version History Modal ---
const VersionHistoryModal = ({ onClose, snapshots, onRestore }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[600px] flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <History className="w-5 h-5 mr-3 text-indigo-600" />
              Version History ({snapshots.length})
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
              <Plus size={20} className="rotate-45" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {snapshots.map((snap) => (
              <div key={snap.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        snap.type === 'auto-save' ? 'bg-blue-100 text-blue-700' :
                        snap.type === 'manual' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {snap.type === 'auto-save' ? '⏱️ Auto-save' :
                        snap.type === 'manual' ? '💾 Manual' : '🚀 Publish'}
                      </span>
                      <span className="text-xs text-gray-500">{snap.timestamp}</span>
                    </div>
                    {snap.description && (
                      <p className="text-sm text-gray-700 mt-1">{snap.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{snap.slideCount} slides</span>
                      <span>•</span>
                      <span>{snap.outlineNodes} outline nodes</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRestore(snap.id)}
                    className="ml-3 px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // --- 更新：Step 2 (增加版本历史) ---
  const Step2Outline = ({ onNext, onBack, courseStatus, onStatusChange }) => {
    const initialOutlines = [
      { id: 1, title: 'Introduction & Basics', details: 'Defining key terms and concepts, the purpose of respiration.', type: 'core' },
      { id: 2, title: 'Glycolysis Mechanics', details: 'Where it happens, net gain, and the two key phases.', type: 'core' },
      { id: 3, title: 'The Krebs Cycle (Citric Acid Cycle)', details: 'Understanding the cycle\'s inputs and outputs within the mitochondrial matrix.', type: 'core' },
      { id: 4, title: 'Electron Transport Chain (ETC) & ATP Synthase', details: 'The final, highest ATP yield step and role of oxygen as the final electron acceptor.', type: 'core' },
      { id: 5, title: 'Aerobic vs. Anaerobic Respiration', details: 'Comparison of conditions, efficiency, and end products.', type: 'optional' },
    ];
  
    const [outlines, setOutlines] = useState(initialOutlines);
    const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  
    // Mock snapshot data
    const [snapshots] = useState([
      { id: 1, type: 'auto-save', timestamp: '2 hours ago', slideCount: 0, outlineNodes: 5, description: 'Auto-saved outline structure' },
      { id: 2, type: 'manual', timestamp: '1 hour ago', slideCount: 0, outlineNodes: 5, description: 'Added comparison section' },
    ]);
  
    const handleDelete = (id) => setOutlines(outlines.filter(o => o.id !== id));
  
    const handleAdd = () => {
      setOutlines([...outlines, { id: Date.now(), title: 'New Topic (Click to Edit)', details: 'Details about the new concept here.', type: 'custom' }]);
    };
  
    const handleEdit = (id, newTitle, newDetails) => {
      setOutlines(outlines.map(o => o.id === id ? { ...o, title: newTitle, details: newDetails } : o));
    };
  
    const handleDragStart = (e, id) => {
      e.dataTransfer.setData("outlineId", id);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e, targetId) => {
      const draggedId = parseInt(e.dataTransfer.getData("outlineId"));
      const draggedItem = outlines.find(item => item.id === draggedId);
      const targetItem = outlines.find(item => item.id === targetId);
      if (draggedItem && targetItem) {
        const newOutlines = [...outlines];
        const draggedIndex = newOutlines.findIndex(item => item.id === draggedId);
        const targetIndex = newOutlines.findIndex(item => item.id === targetId);
        newOutlines.splice(draggedIndex, 1);
        newOutlines.splice(targetIndex, 0, draggedItem);
        setOutlines(newOutlines);
      }
    };
  
    const handleSaveCheckpoint = () => {
      alert('Checkpoint saved! (Manual snapshot created)');
    };
  
    const handleRestoreSnapshot = (snapshotId) => {
      alert(`Restoring snapshot ${snapshotId}...`);
      setVersionHistoryOpen(false);
    };
  
    return (
      <div className="max-w-[95%] mx-auto h-[calc(100vh-140px)] flex gap-8 animate-fade-in-up">
        <div className="w-5/12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center">
              <Settings className="w-4 h-4 mr-2 text-gray-500" />
              High-Level Visual Outline (Mermaid.js)
            </h3>
            <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-medium">Auto-Generated</span>
          </div>
          <div className="flex-1 bg-slate-50 relative p-8 flex items-center justify-center text-gray-500 text-sm italic">
            <div className="flex flex-col items-center space-y-10">
              <div className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md font-medium text-lg">Cellular Respiration</div>
              <div className="w-0.5 h-10 bg-blue-300"></div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {['Glycolysis', 'Krebs Cycle', 'ETC', 'Comparison'].map((text, i) => (
                  <div key={i} className="px-5 py-2.5 bg-white border border-blue-200 rounded-lg shadow-sm text-sm text-gray-800 hover:border-blue-500 transition-all">
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">Powered by Napkin.ai</div>
          </div>
        </div>
        <div className="w-7/12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Study Path Outline (Detail Adjustment)</h3>
              <p className="text-sm text-gray-500">Drag items using the grip icon to reorder. Edit titles or details directly.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVersionHistoryOpen(true)}
                className="text-indigo-600 text-sm font-medium hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors border border-indigo-200 flex items-center"
              >
                <History className="w-4 h-4 inline mr-2" /> History
              </button>
              <button
                onClick={handleSaveCheckpoint}
                className="text-green-600 text-sm font-medium hover:bg-green-50 px-4 py-2 rounded-lg transition-colors border border-green-200 flex items-center"
              >
                💾 Save
              </button>
              <button
                onClick={handleAdd}
                className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-blue-200 flex items-center"
              >
                <Plus className="w-4 h-4 inline mr-2" /> Add Topic
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {outlines.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.id)}
                className="group p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="text-gray-400 w-5 h-5 cursor-grab flex-shrink-0" />
                  <div className="flex-1">
                    <input
                      type="text"
                      className="text-md font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full p-0.5 -ml-0.5"
                      value={item.title}
                      onChange={(e) => handleEdit(item.id, e.target.value, item.details)}
                    />
                    <textarea
                      rows={2}
                      className="text-xs text-gray-600 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full p-0.5 -ml-0.5 resize-none"
                      value={item.details}
                      onChange={(e) => handleEdit(item.id, item.title, e.target.value)}
                    />
                    <div className="mt-2 flex gap-2">
                      <span className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                        item.type === 'core' ? 'bg-blue-100 text-blue-700' :
                        item.type === 'optional' ? 'bg-purple-100 text-purple-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Topic
                      </span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={() => handleDelete(item.id)} className="p-1 text-gray-500 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-gray-100 flex justify-end space-x-4">
            <button onClick={onBack} className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors shadow-sm">Back</button>
            <button
              onClick={() => {
                onStatusChange('slides-generated');
                onNext();
              }}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all"
            >
              Confirm & Generate Slides
            </button>
          </div>
        </div>
        {versionHistoryOpen && (
          <VersionHistoryModal
            onClose={() => setVersionHistoryOpen(false)}
            snapshots={snapshots}
            onRestore={handleRestoreSnapshot}
          />
        )}
      </div>
    );
  };
  
  // --- 更新：Step 3 (增加布局选择器和视觉辅助上传) ---
  const SlideNavCard = ({ title, concept, active, onClick }) => (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer flex items-center gap-3 transition-all duration-200 ${active ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300 shadow-md' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
    >
      <div className="w-10 h-8 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
        <ImageIcon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 truncate">{title}</div>
        <div className="text-xs text-gray-600 truncate mt-0.5">{concept}</div>
      </div>
    </div>
  );

  
const Step3Slides = ({ onNext, onBack, courseStatus, onStatusChange }) => {
    const initialSlides = [
      { id: 1, title: '1: Overview of Respiration', concept: 'Respiration basics & importance', layout: 'title', outlineNodeId: '1' },
      { id: 2, title: '2: Glycolysis Mechanics', concept: 'Glucose breakdown in cytoplasm', layout: 'content', outlineNodeId: '2' },
      { id: 3, title: '3: Krebs Cycle (Matrix)', concept: 'ATP, NADH, FADH2 production', layout: 'diagram', outlineNodeId: '3' },
      { id: 4, title: '4: ETC & Chemiosmosis', concept: 'Oxygen\'s role and ATP synthase', layout: 'two-column', outlineNodeId: '4' },
      { id: 5, title: '5: Aerobic vs. Anaerobic', concept: 'Key differences & applications', layout: 'content', outlineNodeId: '5' },
      { id: 6, title: '6: Summary & Quiz', concept: 'Recap and knowledge check', layout: 'full-image', outlineNodeId: null },
    ];
    const [slides, setSlides] = useState(initialSlides);
    const [activeSlideId, setActiveSlideId] = useState(2);
    const [bullets, setBullets] = useState(['Occurs in Cytoplasm', 'Anaerobic Process', 'Net 2 ATP produced']);
    const [currentLayout, setCurrentLayout] = useState('content');
    const [visualAids, setVisualAids] = useState([]);
  
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scriptText, setScriptText] = useState("Glycolysis is the metabolic pathway that converts glucose into pyruvate. This process occurs in the cytoplasm and results in a net gain of two ATP molecules. It is an anaerobic process, meaning it does not require oxygen.");
  
    const handleVoiceToggle = () => {
      if (isRecording) {
        setIsRecording(false);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setScriptText(prev => prev + "\n\n[Transcribed voice note]");
        }, 2000);
      } else {
        setIsRecording(true);
      }
    };
  
    const voiceState = isProcessing ? "processing" : isRecording ? "recording" : "idle";
  
    const handleAddSlide = () => {
      const newId = Date.now();
      const newSlideNumber = slides.length + 1;
      setSlides([...slides, {
        id: newId,
        title: `${newSlideNumber}: New Slide`,
        concept: 'Click to edit concept',
        layout: 'content',
        outlineNodeId: null
      }]);
      setActiveSlideId(newId);
    };
  
    const handleDeleteSlide = (id) => {
      if (slides.length <= 1) return;
      const newSlides = slides.filter(s => s.id !== id);
      setSlides(newSlides);
      if (activeSlideId === id) {
        setActiveSlideId(newSlides[0].id);
      }
    };
  
    const handleEditSlide = (id, newTitle, newConcept) => {
      setSlides(slides.map(s =>
        s.id === id ? { ...s, title: newTitle, concept: newConcept } : s
      ));
    };
  
    const handleDragStartSlide = (e, id) => {
      e.dataTransfer.setData("slideId", id);
    };
  
    const handleDragOverSlide = (e) => {
      e.preventDefault();
    };
  
    const handleDropSlide = (e, targetId) => {
      const draggedId = parseInt(e.dataTransfer.getData("slideId"));
      if (draggedId === targetId) return;
  
      const draggedSlide = slides.find(s => s.id === draggedId);
      const newSlides = slides.filter(s => s.id !== draggedId);
      const targetIndex = newSlides.findIndex(s => s.id === targetId);
      newSlides.splice(targetIndex, 0, draggedSlide);
      setSlides(newSlides);
    };
  
    const handleDragStartBullet = (e, index) => {
      e.dataTransfer.setData("bulletIndex", index);
    };
  
    const handleDragOverBullet = (e) => {
      e.preventDefault();
    };
  
    const handleDropBullet = (e, targetIndex) => {
      const draggedIndex = parseInt(e.dataTransfer.getData("bulletIndex"));
      if (draggedIndex === targetIndex) return;
  
      const newBullets = [...bullets];
      const [draggedItem] = newBullets.splice(draggedIndex, 1);
      newBullets.splice(targetIndex, 0, draggedItem);
      setBullets(newBullets);
    };
  
    const handleAddBullet = () => setBullets([...bullets, 'New Bullet Point']);
  
    const handleBulletChange = (index, value) => {
      const newBullets = [...bullets];
      newBullets[index] = value;
      setBullets(newBullets);
    };
  
    const handleRemoveBullet = (indexToRemove) => {
      setBullets(bullets.filter((_, index) => index !== indexToRemove));
    };
  
    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const newAids = files.map(file => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        name: file.name
      }));
      setVisualAids([...visualAids, ...newAids]);
    };
  
    const handleRemoveVisualAid = (id) => {
      setVisualAids(visualAids.filter(aid => aid.id !== id));
    };
  
    const getOutlineTitle = (nodeId) => {
      const outlineMap = {
        '1': 'Introduction & Basics',
        '2': 'Glycolysis Mechanics',
        '3': 'Krebs Cycle',
        '4': 'ETC & ATP Synthase',
        '5': 'Aerobic vs. Anaerobic'
      };
      return outlineMap[nodeId] || 'Unknown';
    };
  
    const activeSlide = slides.find(s => s.id === activeSlideId);
  
    return (
      <div className="max-w-[95%] mx-auto flex gap-8 h-[calc(100vh-140px)] animate-fade-in-up">
        <div className="w-72 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-800 text-lg">Slides Overview</span>
            <button
              onClick={handleAddSlide}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Add New Slide"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {slides.map((s) => (
              <div
                key={s.id}
                className="relative group"
                draggable
                onDragStart={(e) => handleDragStartSlide(e, s.id)}
                onDragOver={handleDragOverSlide}
                onDrop={(e) => handleDropSlide(e, s.id)}
              >
                <div
                  onClick={() => setActiveSlideId(s.id)}
                  className={`p-4 rounded-lg border cursor-pointer flex items-center gap-3 transition-all duration-200 ${s.id === activeSlideId ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300 shadow-md' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                >
                  <GripVertical className="w-4 h-4 text-gray-300 cursor-grab hover:text-gray-500 flex-shrink-0" />
                  <div className="w-8 h-6 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                    <ImageIcon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{s.title}</div>
                    <div className="text-xs text-gray-600 truncate">{s.concept}</div>
                  </div>
                </div>
                {slides.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteSlide(s.id); }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    title="Delete Slide"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
  
        <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex-1 mr-4">
              <input
                type="text"
                value={activeSlide?.title || ''}
                onChange={(e) => {
                  if (activeSlide) {
                    handleEditSlide(activeSlideId, e.target.value, activeSlide.concept);
                  }
                }}
                className="text-xl font-bold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full transition-colors"
              />
              <input
                type="text"
                value={activeSlide?.concept || ''}
                onChange={(e) => {
                  if (activeSlide) {
                    handleEditSlide(activeSlideId, activeSlide.title, e.target.value);
                  }
                }}
                placeholder="Enter slide concept..."
                className="text-sm text-gray-500 mt-1 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full transition-colors"
              />
              {activeSlide?.outlineNodeId && (
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                  📋 From: {getOutlineTitle(activeSlide.outlineNodeId)}
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors">Preview View</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-colors">Save Slide</button>
            </div>
          </div>
  
          <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 gap-10">
            <div className="space-y-8">
              {/* Layout Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Slide Layout</label>
                <div className="grid grid-cols-2 gap-2">
                  {['title', 'content', 'two-column', 'diagram'].map((layout) => (
                    <button
                      key={layout}
                      onClick={() => setCurrentLayout(layout)}
                      className={`p-3 border rounded-lg text-xs font-medium transition-all ${
                        currentLayout === layout
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {layout.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Visual Aids Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Visual Aids (Images/Diagrams)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="visual-aids-upload"
                  />
                  <label
                    htmlFor="visual-aids-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Image className="w-8 h-8 text-gray-400" />
                    <span className="text-xs text-gray-500">Click to upload images</span>
                  </label>
                </div>
                {visualAids.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {visualAids.map((aid) => (
                      <div key={aid.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <img src={aid.url} alt={aid.name} className="w-10 h-10 object-cover rounded" />
                          <span className="text-xs text-gray-700 truncate max-w-[150px]">{aid.name}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveVisualAid(aid.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
  
              {/* Key Bullet Points */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Key Bullet Points</label>
                <div className="space-y-3">
                  {bullets.map((bullet, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:shadow-sm transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStartBullet(e, index)}
                      onDragOver={handleDragOverBullet}
                      onDrop={(e) => handleDropBullet(e, index)}
                    >
                      <GripVertical className="w-4 h-4 text-gray-300 cursor-grab hover:text-gray-500 flex-shrink-0" />
                      <input
                        type="text"
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none focus:border-blue-500"
                        value={bullet}
                        onChange={(e) => handleBulletChange(index, e.target.value)}
                      />
                      <button onClick={() => handleRemoveBullet(index)} className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Remove Bullet"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={handleAddBullet} className="text-sm text-blue-600 font-medium mt-2 hover:underline flex items-center ml-1">
                    <Plus className="w-4 h-4 mr-2" /> Add New Bullet
                  </button>
                </div>
              </div>
  
              {/* Teacher Script */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Teacher Script / Content</label>
                  <VoiceButton
                    state={voiceState}
                    onPress={handleVoiceToggle}
                    disabled={isProcessing}
                    trailing="Dictate"
                  />
                </div>
                <div className="relative">
                  <textarea
                    rows={8}
                    value={scriptText}
                    onChange={(e) => setScriptText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Edit the detailed script for this slide..."
                  />
                  <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                    {isRecording ? "🎙️ Recording..." : isProcessing ? "⏳ Transcribing..." : ""}
                  </div>
                </div>
                {(isRecording || isProcessing) && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} />
                      <LiveWaveform active={isRecording} className="flex-1 h-8" barColor={isRecording ? "#ef4444" : "#3b82f6"} />
                      <span className="text-xs text-gray-600">{isRecording ? "Speak..." : "Processing..."}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
  
            {/* Right: Visual Preview */}
            <div className="relative border border-gray-300 rounded-xl overflow-hidden shadow-xl bg-white flex flex-col">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Slide Preview ({currentLayout})</span>
                <MoreHorizontal size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="flex-1 flex items-center justify-center p-8 bg-blue-50">
                <div className="w-full h-full bg-white border border-dashed border-blue-300 rounded-lg flex items-center justify-center p-6 text-center text-blue-600 text-lg font-semibold">
                  {visualAids.length > 0 ? (
                    <img src={visualAids[0].url} alt="Preview" className="max-w-full max-h-full object-contain" />
                  ) : (
                    "[Image of Glycolysis Pathway Flowchart]"
                  )}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <span className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full shadow-md flex items-center">
                  <Clock size={12} className="mr-1" /> 1:45 min
                </span>
                <button className="p-1 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-100 transition-colors">
                  <PlayCircle size={20} />
                </button>
              </div>
            </div>
          </div>
  
          <div className="p-6 border-t border-gray-100 flex justify-between">
            <button
              onClick={onBack}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Outline
            </button>
  
            <div className="flex space-x-4">
              <button
                onClick={handleAddSlide}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap"
              >
                Add New Slide
              </button>
  
              <button
                onClick={() => {
                  onStatusChange('agent-created');
                  onNext();
                }}
                className="flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all whitespace-nowrap"
              >
                Review & Generate Output
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Q&A Agent Modal 组件 ---
const QAAgentModal = ({ onClose, agentStatus }) => {
    const [messages, setMessages] = useState([
      { role: 'assistant', content: "Hi! I'm your Q&A Agent for the Cellular Respiration module. Ask me anything about Glycolysis, Krebs Cycle, or the Electron Transport Chain!" }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSend = () => {
      if (!inputText.trim()) return;
  
      setMessages(prev => [...prev, { role: 'user', content: inputText }]);
      setInputText('');
      setIsLoading(true);
  
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Great question! In cellular respiration, ATP is produced through three main stages: Glycolysis (2 ATP), the Krebs Cycle (2 ATP), and the Electron Transport Chain (34 ATP). The ETC produces the most ATP by using the electrons from NADH and FADH2."
        }]);
        setIsLoading(false);
      }, 1500);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">Q&A Agent</h2>
                  {agentStatus === 'active' ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Online
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      Offline
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Cellular Respiration Module</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
              <Plus size={20} className="rotate-45" />
            </button>
          </div>
  
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-bl-sm shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
  
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about the lesson..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                disabled={agentStatus !== 'active'}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading || agentStatus !== 'active'}
                className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send • Powered by ElevenLabs</p>
          </div>
        </div>
      </div>
    );
  };
  
  // --- Agent Stats Modal ---
  const AgentStatsModal = ({ onClose, agentData }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-3 text-blue-600" />
              Agent Performance Analytics
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
              <Plus size={20} className="rotate-45" />
            </button>
          </div>
  
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-2xl font-bold text-blue-600">{agentData.totalConversations}</p>
                <p className="text-xs text-gray-600 mt-1">Total Conversations</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-green-600">{agentData.totalInteractions}</p>
                <p className="text-xs text-gray-600 mt-1">Total Interactions</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">{agentData.avgResponseTime}</p>
                <p className="text-xs text-gray-600 mt-1">Avg Response Time</p>
              </div>
            </div>
  
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Agent Status</h3>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  agentData.status === 'active' ? 'bg-green-100 text-green-700' :
                  agentData.status === 'creating' ? 'bg-yellow-100 text-yellow-700' :
                  agentData.status === 'error' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {agentData.status.charAt(0).toUpperCase() + agentData.status.slice(1)}
                </div>
                {agentData.errorMessage && (
                  <span className="text-xs text-red-600">{agentData.errorMessage}</span>
                )}
              </div>
            </div>
  
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-2">Voice Configuration</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p>Voice ID: <span className="font-mono">{agentData.voiceId}</span></p>
                <p>Stability: {agentData.voiceSettings?.stability || 0.5}</p>
                <p>Similarity Boost: {agentData.voiceSettings?.similarity_boost || 0.75}</p>
              </div>
            </div>
          </div>
  
          <div className="p-4 border-t border-gray-100 flex justify-end">
            <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // --- 更新：Step 4 (增加发布控制和Agent统计) ---
  const Step4Review = ({ onBack, courseStatus, onStatusChange, isPublic, onPublicChange }) => {
    const [qaModalOpen, setQaModalOpen] = useState(false);
    const [agentStatsOpen, setAgentStatsOpen] = useState(false);
  
    // Mock agent data
    const agentData = {
      status: 'active',
      totalConversations: 156,
      totalInteractions: 842,
      avgResponseTime: '1.2s',
      voiceId: 'ElevenLabs-Voice-123',
      voiceSettings: {
        stability: 0.5,
        similarity_boost: 0.75
      },
      errorMessage: null
    };
  
    const outputs = [
      { icon: Download, title: "Export PowerPoint/PDF", details: "Download the complete deck optimized for accessibility.", color: "text-blue-600", action: () => alert('Export feature coming soon!') },
      { icon: Share2, title: "Share Learning Link", details: "Generate a student-facing link for the interactive module.", color: "text-green-600", action: () => alert('Share link copied!'), disabled: !isPublic },
      { icon: List, title: "View Agent Transcript", details: "Review the full generated teaching script for all slides.", color: "text-purple-600", action: () => alert('Opening transcript...') },
      { icon: MessageCircle, title: "Launch Q&A Agent", details: "Activate the AI Q&A bot for pre-review testing.", color: "text-orange-600", action: () => setQaModalOpen(true) },
    ];
  
    const handlePublish = () => {
      if (courseStatus === 'agent-created') {
        onStatusChange('published');
        onPublicChange(true);
        alert('Course published successfully!');
      }
    };
  
    const handleArchive = () => {
      onStatusChange('archived');
      alert('Course archived');
    };
  
    const canPublish = courseStatus === 'agent-created';
  
    return (
      <div className="max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-lg border border-gray-100 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Module Generation Complete! 🎉</h2>
        <p className="text-lg text-gray-600 mb-10">
          "Introduction to Cellular Respiration" is ready. Review the summary and choose your next action.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 col-span-2">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-3" /> Module Summary
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between border-b border-blue-100 pb-2">
                <span className="font-medium">Total Slides:</span>
                <span>6</span>
              </li>
              <li className="flex justify-between border-b border-blue-100 pb-2">
                <span className="font-medium">Total Time (Script):</span>
                <span>8 minutes 30 seconds</span>
              </li>
              <li className="flex justify-between border-b border-blue-100 pb-2">
                <span className="font-medium">Target Accessibility:</span>
                <span>ADHD Focused</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Concepts Covered:</span>
                <span className="text-right">Glycolysis, Krebs, ETC, Anaerobic</span>
              </li>
            </ul>
          </div>
  
          <div className="bg-gray-800 p-6 rounded-xl shadow-inner flex items-center justify-center">
            <div className="text-center text-white">
              <h4 className="text-lg font-semibold mb-2">Final Module Snapshot</h4>
              <div className="w-40 h-24 bg-gray-600 rounded-lg border-2 border-blue-400 flex items-center justify-center mx-auto mb-3">
                <ImageIcon size={30} className="text-gray-300" />
              </div>
              <p className="text-xs text-gray-400">Click a button below to launch or export.</p>
            </div>
          </div>
        </div>
  
        {/* Publish Controls */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-green-600" />
            Publishing Options
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => onPublicChange(e.target.checked)}
                disabled={courseStatus === 'published'}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">Make this course public</span>
                <p className="text-xs text-gray-600">Allow students to discover and enroll in this course</p>
              </div>
            </label>
  
            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePublish}
                disabled={!canPublish || courseStatus === 'published'}
                className="px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {courseStatus === 'published' ? 'Published' : 'Publish Course'}
              </button>
  
              {courseStatus === 'published' && (
                <button
                  onClick={handleArchive}
                  className="px-6 py-3 text-sm font-medium text-orange-700 bg-orange-100 border border-orange-300 rounded-lg hover:bg-orange-200 transition-all flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  Archive Course
                </button>
              )}
            </div>
  
            {!canPublish && courseStatus !== 'published' && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                ⚠️ Complete all steps and create an agent before publishing
              </p>
            )}
          </div>
        </div>
  
        {/* Agent Performance Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
              Agent Performance
            </h3>
            <button
              onClick={() => setAgentStatsOpen(true)}
              className="px-4 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors"
            >
              View Details
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-xl font-bold text-blue-600">{agentData.totalConversations}</p>
              <p className="text-xs text-gray-600 mt-1">Conversations</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-xl font-bold text-green-600">{agentData.totalInteractions}</p>
              <p className="text-xs text-gray-600 mt-1">Interactions</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-xl font-bold text-purple-600">{agentData.avgResponseTime}</p>
              <p className="text-xs text-gray-600 mt-1">Avg Response</p>
            </div>
          </div>
        </div>
  
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Next Steps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outputs.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              disabled={item.disabled}
              className={`p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all text-left flex flex-col justify-start items-start ${
                item.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <item.icon size={24} className={`${item.color} mb-3`} />
              <h4 className="text-md font-bold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.details}</p>
              {item.disabled && (
                <span className="mt-2 text-xs text-amber-600">⚠️ Make course public first</span>
              )}
            </button>
          ))}
        </div>
  
        <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
          <button onClick={onBack} className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Go Back to Editor
          </button>
        </div>
  
        {qaModalOpen && <QAAgentModal onClose={() => setQaModalOpen(false)} agentStatus={agentData.status} />}
        {agentStatsOpen && <AgentStatsModal onClose={() => setAgentStatsOpen(false)} agentData={agentData} />}
      </div>
    );
  };
// --- 主应用结构 (App Component) ---
const App = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [courseStatus, setCourseStatus] = useState('draft');
    const [isPublic, setIsPublic] = useState(false);

    const handleNext = () => {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleStepClick = (step) => {
      setCurrentStep(step);
    };

    const renderStep = () => {
      switch (currentStep) {
        case 1:
          return <Step1Input onNext={handleNext} courseStatus={courseStatus} onStatusChange={setCourseStatus} />;
        case 2:
          return <Step2Outline onNext={handleNext} onBack={handleBack} courseStatus={courseStatus} onStatusChange={setCourseStatus} />;
        case 3:
          return <Step3Slides onNext={handleNext} onBack={handleBack} courseStatus={courseStatus} onStatusChange={setCourseStatus} />;
        case 4:
          return <Step4Review onBack={handleBack} courseStatus={courseStatus} onStatusChange={setCourseStatus} isPublic={isPublic} onPublicChange={setIsPublic} />;
        default:
          return <Step1Input onNext={handleNext} courseStatus={courseStatus} onStatusChange={setCourseStatus} />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="text-2xl font-extrabold text-blue-600 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              AI Lesson Builder
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <Settings size={20} />
              </button>
              <button className="flex items-center text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                <Users size={16} className="mr-2" />
                My Team
              </button>
            </div>
          </div>
        </header>

        <Stepper currentStep={currentStep} onStepClick={handleStepClick} />

        <main className="pb-12 px-4 sm:px-6 lg:px-8">
          {renderStep()}
        </main>

        <style>{`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
          .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
          .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
        `}</style>
      </div>
    );
  };

  export default App;