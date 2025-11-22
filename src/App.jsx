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
} from 'lucide-react';
import { VoiceButton } from "@/components/ui/voice-button"
import { LiveWaveform } from "@/components/ui/live-waveform"


// --- ElevenLabs 风格的 TagsInput 组件 ---
const TagsInput = ({ initialTags, label, required, placeholder }) => {
  const [tags, setTags] = useState(initialTags || []);
  const [inputValue, setInputValue] = useState('');

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.type === 'click' || e.type === 'blur') && inputValue.trim() !== '') {
      if (!tags.includes(inputValue.trim())) { // Avoid duplicates
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
            } hidden sm:block`}> {/* Hide on very small screens */}
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
// --- 更新：TemplatePreviewModal 组件（增加 Use Template 按钮）---
// --- TemplatePreviewModal 组件 (新增) ---
const TemplatePreviewModal = ({ onClose, template, onUseTemplate }) => {
    
    const handleUse = () => {
        onUseTemplate(template.title); // 调用 Step1Input 中传入的函数，并传入模板标题
        onClose(); // 关闭 Modal
    };

    return (
        // 关键：确保这个 fixed 容器能覆盖整个页面
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden transform scale-100">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <Layout className="w-5 h-5 mr-3 text-blue-600" />
                        Template Preview: {template.title}
                    </h2>
                    {/* 使用 rotate-45 模拟 X 关闭按钮 */}
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

                {/* 底部按钮栏 - 增加 Use Template 按钮 */}
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

// --- 更新：Step 1: 教师输入端 (增加模板列表和 Modal 逻辑) ---
const Step1Input = ({ onNext }) => {
    
    const [topicName, setTopicName] = useState('Introduction to Cellular Respiration');
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [knowledgeText, setKnowledgeText] = useState("The mitochondria...");

    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);    

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

    // Voice recording handler
    const handleVoiceToggle = () => {
        if (isRecording) {
            // Stop recording - this would trigger transcription
            setIsRecording(false);
            setIsProcessing(true);
            
            // Simulate processing (replace with actual ElevenLabs transcription)
            setTimeout(() => {
                setIsProcessing(false);
                // Transcribed text would be appended here
                setKnowledgeText(prev => prev + "\n\n[Transcribed voice note would appear here]");
            }, 2000);
        } else {
            setIsRecording(true);
        }
    };

    // Determine voice button state
    const voiceState = isProcessing ? "processing" : isRecording ? "recording" : "idle";

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-10 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Learning Module</h2>

            {/* 基础信息 */}
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

            {/* 必填 Concepts & Optional Tags */}
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

            {/* 模板展示区域 */}
            <div className="mb-10 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Layout className="w-5 h-5 mr-2 text-blue-600" />
                    Community Templates (Workbench)
                    <span className="text-sm font-medium text-gray-500 ml-4">(Click 'Preview' for a visual mock)</span>
                </h3>
                
                {/* 常见主题行 */}
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

            {/* 核心输入区域 - WITH VOICE FEATURE */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Knowledge Requirements (Natural Language) <span className="text-red-500">*</span>
                    </label>
                    {/* Voice Button - Top Right of Label */}
                    <VoiceButton 
                        state={voiceState}
                        onPress={handleVoiceToggle}
                        disabled={isProcessing}
                        trailing="Dictate Notes"
                    />
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
                
                {/* Live Waveform - Shows when recording */}
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

            {/* 底部按钮栏 */}
            <div className="flex justify-end pt-8 border-t border-gray-100">
                <div className="flex space-x-4">
                    <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
                        Save Draft
                    </button>
                    <button onClick={onNext} className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all flex items-center">
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
        </div>
    );
};

// --- Step 2: 大纲调整 (ElevenLabs 风格) ---
const Step2Outline = ({ onNext, onBack }) => {
    const initialOutlines = [
        { id: 1, title: 'Introduction & Basics', details: 'Defining key terms and concepts, the purpose of respiration.', type: 'core' },
        { id: 2, title: 'Glycolysis Mechanics', details: 'Where it happens, net gain, and the two key phases.', type: 'core' },
        { id: 3, title: 'The Krebs Cycle (Citric Acid Cycle)', details: 'Understanding the cycle\'s inputs and outputs within the mitochondrial matrix.', type: 'core' },
        { id: 4, title: 'Electron Transport Chain (ETC) & ATP Synthase', details: 'The final, highest ATP yield step and role of oxygen as the final electron acceptor.', type: 'core' },
        { id: 5, title: 'Aerobic vs. Anaerobic Respiration', details: 'Comparison of conditions, efficiency, and end products.', type: 'optional' },
    ];
    const [outlines, setOutlines] = useState(initialOutlines);

    const handleDelete = (id) => setOutlines(outlines.filter(o => o.id !== id));
    const handleAdd = () => {
        setOutlines([...outlines, { id: Date.now(), title: 'New Topic (Click to Edit)', details: 'Details about the new concept here.', type: 'custom' }]);
    };
    const handleEdit = (id, newTitle, newDetails) => {
        setOutlines(outlines.map(o => o.id === id ? { ...o, title: newTitle, details: newDetails } : o));
    };

    // Simple drag-and-drop reordering (for visual simulation)
    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("outlineId", id);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow drop
    };

    const handleDrop = (e, targetId) => {
        const draggedId = parseInt(e.dataTransfer.getData("outlineId"));
        const draggedItem = outlines.find(item => item.id === draggedId);
        const targetItem = outlines.find(item => item.id === targetId);

        if (draggedItem && targetItem) {
            const newOutlines = [...outlines];
            const draggedIndex = newOutlines.findIndex(item => item.id === draggedId);
            const targetIndex = newOutlines.findIndex(item => item.id === targetId);

            newOutlines.splice(draggedIndex, 1); // Remove dragged item
            newOutlines.splice(targetIndex, 0, draggedItem); // Insert at target position
            setOutlines(newOutlines);
        }
    };

    return (
        <div className="max-w-[95%] mx-auto h-[calc(100vh-140px)] flex gap-8 animate-fade-in-up">

            {/* 左侧：Mermaid Visual Mock */}
            <div className="w-5/12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                        <Settings className="w-4 h-4 mr-2 text-gray-500" />
                        High-Level Visual Outline (Mermaid.js)
                    </h3>
                    <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-medium">Auto-Generated</span>
                </div>
                <div className="flex-1 bg-slate-50 relative p-8 flex items-center justify-center text-gray-500 text-sm italic">
                    {/* Mock Mermaid Diagram - A more abstract representation */}
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

            {/* 右侧：列表调整 */}
            <div className="w-7/12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Study Path Outline (Detail Adjustment)</h3>
                        <p className="text-sm text-gray-500">Drag items using the grip icon to reorder. Edit titles or details directly.</p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-blue-200 flex items-center"
                    >
                        <Plus className="w-4 h-4 inline mr-2" /> Add Topic
                    </button>
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
                                <GripVertical className="text-gray-400 w-5 h-5 cursor-grab flex-shrink-0" /> {/* Drag Handle */}
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
                    <button onClick={onNext} className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all">Confirm & Generate Slides</button>
                </div>
            </div>
        </div>
    );
};

// --- Step 3: 幻灯片编辑与预览 (ElevenLabs 风格) ---
const SlideNavCard = ({ title, concept, active, onClick }) => (
    <div
        onClick={onClick}
        className={`p-4 rounded-lg border cursor-pointer flex items-center gap-3 transition-all duration-200
        ${active ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300 shadow-md' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
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

const Step3Slides = ({ onNext, onBack }) => {
    const initialSlides = [
        { id: 1, title: '1: Overview of Respiration', concept: 'Respiration basics & importance' },
        { id: 2, title: '2: Glycolysis Mechanics', concept: 'Glucose breakdown in cytoplasm' },
        { id: 3, title: '3: Krebs Cycle (Matrix)', concept: 'ATP, NADH, FADH2 production' },
        { id: 4, title: '4: ETC & Chemiosmosis', concept: 'Oxygen\'s role and ATP synthase' },
        { id: 5, title: '5: Aerobic vs. Anaerobic', concept: 'Key differences & applications' },
        { id: 6, title: '6: Summary & Quiz', concept: 'Recap and knowledge check' },
    ];
    const [slides, setSlides] = useState(initialSlides);
    const [activeSlideId, setActiveSlideId] = useState(2);
    const [bullets, setBullets] = useState(['Occurs in Cytoplasm', 'Anaerobic Process', 'Net 2 ATP produced']);

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
            concept: 'Click to edit concept' 
        }]);
        setActiveSlideId(newId); // 自动切换到新幻灯片
    };
    
    const handleDeleteSlide = (id) => {
        if (slides.length <= 1) return; // 至少保留一张
        const newSlides = slides.filter(s => s.id !== id);
        setSlides(newSlides);
        // 如果删除的是当前选中的，切换到第一张
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

    return (
        <div className="max-w-[95%] mx-auto flex gap-8 h-[calc(100vh-140px)] animate-fade-in-up">
            {/* Sidebar: Slide List */}
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
                                className={`p-4 rounded-lg border cursor-pointer flex items-center gap-3 transition-all duration-200
                                ${s.id === activeSlideId ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300 shadow-md' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
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

            {/* Main Editor Area */}
            <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex-1 mr-4">
                        <input
                            type="text"
                            value={slides.find(s => s.id === activeSlideId)?.title || ''}
                            onChange={(e) => {
                                const currentSlide = slides.find(s => s.id === activeSlideId);
                                if (currentSlide) {
                                    handleEditSlide(activeSlideId, e.target.value, currentSlide.concept);
                                }
                            }}
                            className="text-xl font-bold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full transition-colors"
                        />
                        <input
                            type="text"
                            value={slides.find(s => s.id === activeSlideId)?.concept || ''}
                            onChange={(e) => {
                                const currentSlide = slides.find(s => s.id === activeSlideId);
                                if (currentSlide) {
                                    handleEditSlide(activeSlideId, currentSlide.title, e.target.value);
                                }
                            }}
                            placeholder="Enter slide concept..."
                            className="text-sm text-gray-500 mt-1 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full transition-colors"
                        />
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors">Preview View</button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-colors">Save Slide</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 gap-10">
                    {/* Left: Content Inputs */}
                    <div className="space-y-8">
                        {/* 1. Key Bullet Points - 可动态添加 */}
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

                        {/* 2. Teacher Script */}
                        
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
                            <span className="text-sm font-medium text-gray-700">Slide Preview (Concept: Glycolysis)</span>
                            <MoreHorizontal size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>
                        <div className="flex-1 flex items-center justify-center p-8 bg-blue-50">
                            {/* Mock Visual Area */}
                            <div className="w-full h-full bg-white border border-dashed border-blue-300 rounded-lg flex items-center justify-center p-6 text-center text-blue-600 text-lg font-semibold">
                                

[Image of Glycolysis Pathway Flowchart]

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

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-between">
                    {/* Back Button - Fixed with whitespace-nowrap */}
                    <button 
                        onClick={onBack} 
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Outline
                    </button>
                    
                    <div className="flex space-x-4">
                        {/* Add New Slide Button */}
                        <button 
                            onClick={handleAddSlide}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap"
                        >
                            Add New Slide
                        </button>
                        
                        {/* Review & Generate Button - Fixed with whitespace-nowrap */}
                        <button 
                            onClick={onNext} 
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
const QAAgentModal = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm your Q&A Agent for the Cellular Respiration module. Ask me anything about Glycolysis, Krebs Cycle, or the Electron Transport Chain!" }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = () => {
        if (!inputText.trim()) return;
        
        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: inputText }]);
        setInputText('');
        setIsLoading(true);

        // Simulate AI response
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
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <MessageCircle size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Q&A Agent</h2>
                            <p className="text-xs text-gray-500">Cellular Respiration Module</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                        <Plus size={20} className="rotate-45" />
                    </button>
                </div>

                {/* Messages */}
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

                {/* Input */}
                <div className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a question about the lesson..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputText.trim() || isLoading}
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

// --- Step 4: 最终回顾与导出 ---
const Step4Review = ({ onBack }) => {
    const [qaModalOpen, setQaModalOpen] = useState(false);

    const outputs = [
        { icon: Download, title: "Export PowerPoint/PDF", details: "Download the complete deck optimized for accessibility.", color: "text-blue-600", action: () => alert('Export feature coming soon!') },
        { icon: Share2, title: "Share Learning Link", details: "Generate a student-facing link for the interactive module.", color: "text-green-600", action: () => alert('Share link copied!') },
        { icon: List, title: "View Agent Transcript", details: "Review the full generated teaching script for all slides.", color: "text-purple-600", action: () => alert('Opening transcript...') },
        { icon: MessageCircle, title: "Launch Q&A Agent", details: "Activate the AI Q&A bot for pre-review testing.", color: "text-orange-600", action: () => setQaModalOpen(true) },
    ];

    return (
        <div className="max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-lg border border-gray-100 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Module Generation Complete! 🎉</h2>
            <p className="text-lg text-gray-600 mb-10">
                "Introduction to Cellular Respiration" is ready. Review the summary and choose your next action.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* 1. Summary Card */}
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

                {/* 2. Visual Preview Mock */}
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

            {/* Actions Grid */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Next Steps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {outputs.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.action}
                        className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all text-left flex flex-col justify-start items-start"
                    >
                        <item.icon size={24} className={`${item.color} mb-3`} />
                        <h4 className="text-md font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.details}</p>
                    </button>
                ))}
            </div>

            <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
                <button onClick={onBack} className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 inline" />
                    Go Back to Editor
                </button>
            </div>

            {/* Q&A Agent Modal */}
            {qaModalOpen && <QAAgentModal onClose={() => setQaModalOpen(false)} />}
        </div>
    );
};


// --- 主应用结构 (App Component) ---
const App = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
        return <Step1Input onNext={handleNext} />;
      case 2:
        return <Step2Outline onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3Slides onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4Review onBack={handleBack} />;
      default:
        return <Step1Input onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航栏 / 标题 */}
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

      {/* 进度条 */}
      <Stepper currentStep={currentStep} onStepClick={handleStepClick} />

      {/* 内容区域 */}
      <main className="pb-12 px-4 sm:px-6 lg:px-8">
        {renderStep()}
      </main>
      
      {/* Tailwind CSS 动画样式 (需要添加到全局 CSS 或组件内) */}
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