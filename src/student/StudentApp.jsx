import React, { useState, useEffect } from 'react';
import { ChevronRight, Layout, FileText, CheckCircle, Plus, Users, MessageSquare, PlayCircle, MessageCircle, Clock, BookOpen, TrendingUp, Award, Star, Link, Globe, Trash2, Trophy, Target, Flame, Medal, ArrowLeft, Pause, Play, ThumbsUp, ThumbsDown, Highlighter, StickyNote, Send, Eye, CheckCircle2 } from 'lucide-react';
import { ConversationBar } from '@/components/ui/conversation-bar';

const StudentApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isLearning, setIsLearning] = useState(false);
  const [myCourses, setMyCourses] = useState([1, 2]);
  const [extensionLinks, setExtensionLinks] = useState([
    { id: 1, url: 'https://arxiv.org/paper/123', title: 'ML Research Paper' },
    { id: 2, url: 'https://medium.com/ai-tutorial', title: 'AI Tutorial Blog' }
  ]);
  const [newLink, setNewLink] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(null);
  
  // Session state management
  const [sessionState, setSessionState] = useState('active'); // 'active' | 'paused' | 'completed'
  const [sessionDuration, setSessionDuration] = useState(0); // seconds
  const [visitedSlides, setVisitedSlides] = useState([0]); // slide indices visited
  const [completedSlides, setCompletedSlides] = useState([]); // slide indices completed
  
  // Interaction states
  const [highlightMode, setHighlightMode] = useState(false);
  const [annotationMode, setAnnotationMode] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [highlights, setHighlights] = useState([]);
  
  // Agent state - for Q&A Modal
  const [qaModalOpen, setQaModalOpen] = useState(false);
  const [agentMessages, setAgentMessages] = useState([]);
  const [agentInputText, setAgentInputText] = useState('');
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentOnline, setAgentOnline] = useState(false);

  const heroSlides = [
    { title: "The World's First Conversational Video Platform", subtitle: "Don't watch videos any more, have a conversation.", bgGradient: "from-blue-600 to-blue-800" },
    { title: "Learn Through Interactive AI Agents", subtitle: "Personalized learning paths designed for your success.", bgGradient: "from-purple-600 to-purple-800" },
    { title: "Master Any Subject with AI Tutors", subtitle: "Get instant help, practice problems, and real-time feedback.", bgGradient: "from-green-600 to-green-800" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Session timer
  useEffect(() => {
    let interval;
    if (selectedModule && sessionState === 'active') {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedModule, sessionState]);

  const modules = [
    { id: 1, title: 'Cellular Respiration', subject: 'Biology', instructor: 'Dr. Smith', slides: 6, duration: '8:30', students: 1234, rating: 4.8, color: 'from-blue-500 to-blue-600', progress: 75, category: 'Science' },
    { id: 2, title: 'Ancient Rome Timeline', subject: 'History', instructor: 'Prof. Johnson', slides: 8, duration: '12:15', students: 892, rating: 4.6, color: 'from-purple-500 to-purple-600', progress: 40, category: 'History' },
    { id: 3, title: 'Linear Algebra Basics', subject: 'Mathematics', instructor: 'Dr. Lee', slides: 10, duration: '15:45', students: 2341, rating: 4.9, color: 'from-green-500 to-green-600', progress: 0, category: 'Math' },
    { id: 4, title: 'Web Development Intro', subject: 'Computer Science', instructor: 'Prof. Chen', slides: 12, duration: '18:20', students: 3456, rating: 4.7, color: 'from-orange-500 to-orange-600', progress: 0, category: 'CS' },
    { id: 5, title: 'Photosynthesis Deep Dive', subject: 'Biology', instructor: 'Dr. Williams', slides: 7, duration: '10:00', students: 1567, rating: 4.5, color: 'from-teal-500 to-teal-600', progress: 0, category: 'Science' },
    { id: 6, title: 'World War II Analysis', subject: 'History', instructor: 'Prof. Davis', slides: 9, duration: '14:30', students: 987, rating: 4.8, color: 'from-red-500 to-red-600', progress: 0, category: 'History' },
    { id: 7, title: 'Calculus Fundamentals', subject: 'Mathematics', instructor: 'Dr. Martinez', slides: 11, duration: '16:00', students: 2876, rating: 4.6, color: 'from-indigo-500 to-indigo-600', progress: 0, category: 'Math' },
    { id: 8, title: 'Python for Beginners', subject: 'Computer Science', instructor: 'Prof. Garcia', slides: 15, duration: '20:00', students: 4567, rating: 4.9, color: 'from-yellow-500 to-yellow-600', progress: 0, category: 'CS' },
  ];

  const achievements = [
    { id: 1, title: 'First Steps', desc: 'Complete your first course', icon: Trophy, unlocked: true, color: 'from-yellow-400 to-yellow-600' },
    { id: 2, title: 'Quick Learner', desc: 'Complete 5 courses', icon: Flame, unlocked: true, color: 'from-orange-400 to-red-500' },
    { id: 3, title: 'Knowledge Seeker', desc: 'Study for 10 hours', icon: BookOpen, unlocked: false, color: 'from-blue-400 to-blue-600' },
    { id: 4, title: 'Perfect Score', desc: 'Get 100% on a quiz', icon: Target, unlocked: false, color: 'from-green-400 to-green-600' },
    { id: 5, title: 'Marathon Runner', desc: 'Study 7 days in a row', icon: Medal, unlocked: false, color: 'from-purple-400 to-purple-600' },
  ];

  const progressData = { totalHours: 24, coursesCompleted: 3, currentStreak: 5, longestStreak: 12 };

  const addToMyCourses = (e, id) => { 
    e.stopPropagation(); 
    if (!myCourses.includes(id)) {
      setMyCourses([...myCourses, id]);
      setAddedAnimation(id);
      setTimeout(() => setAddedAnimation(null), 1000);
    }
  };
  
  const removeFromMyCourses = (e, id) => { 
    e.stopPropagation(); 
    setMyCourses(myCourses.filter(c => c !== id)); 
  };
  
  const addLink = () => { 
    if (newLink.trim()) { 
      setExtensionLinks([...extensionLinks, { id: Date.now(), url: newLink, title: newLink.substring(0, 30) + '...' }]); 
      setNewLink(''); 
    } 
  };
  
  const removeLink = (id) => setExtensionLinks(extensionLinks.filter(l => l.id !== id));

  // Session control functions
  const toggleSessionState = () => {
    setSessionState(prev => prev === 'active' ? 'paused' : 'active');
  };

  const completeSession = () => {
    setSessionState('completed');
    alert(`Session completed! Study time: ${formatDuration(sessionDuration)}`);
  };

  const markSlideComplete = (slideIndex) => {
    if (!completedSlides.includes(slideIndex)) {
      setCompletedSlides([...completedSlides, slideIndex]);
    }
  };

  const visitSlide = (slideIndex) => {
    if (!visitedSlides.includes(slideIndex)) {
      setVisitedSlides([...visitedSlides, slideIndex]);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Interaction functions
  const addHighlight = (text) => {
    setHighlights([...highlights, { id: Date.now(), text, timestamp: new Date() }]);
    setHighlightMode(false);
  };

  const addAnnotation = (text) => {
    setAnnotations([...annotations, { id: Date.now(), text, timestamp: new Date() }]);
    setAnnotationMode(false);
  };

  // Agent functions for Q&A Modal
  const sendAgentMessage = () => {
    if (!agentInputText.trim()) return;
    
    const userMessage = { role: 'user', content: agentInputText, timestamp: new Date() };
    setAgentMessages([...agentMessages, userMessage]);
    setAgentInputText('');
    setAgentLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        role: 'assistant',
        content: "Great question! In cellular respiration, ATP is produced through three main stages: Glycolysis (2 ATP), the Krebs Cycle (2 ATP), and the Electron Transport Chain (34 ATP). The ETC produces the most ATP by using the electrons from NADH and FADH2.",
        timestamp: new Date(),
        messageId: Date.now()
      };
      setAgentMessages(prev => [...prev, agentResponse]);
      setAgentLoading(false);
    }, 1500);
  };

  const rateAgentResponse = (messageId, helpful) => {
    console.log(`Rated message ${messageId} as ${helpful ? 'helpful' : 'not helpful'}`);
    alert(helpful ? '👍 Thanks for your feedback!' : '👎 We\'ll improve our responses');
  };

  // Agent Chat View Component (with ConversationBar)
  const AgentChatView = ({ module, onExit }) => {
    const [messages, setMessages] = useState([
      {
        source: 'ai',
        message: `Hi! I'm your AI tutor for "${module.title}". I'm here to help you learn about ${module.subject}. Feel free to ask me any questions!`,
        timestamp: new Date()
      }
    ]);
    const [agentConnected, setAgentConnected] = useState(false);
    const AGENT_ID = "agent_1301kayr8fdneh8agzn2vx0hfra0";

    const handleMessage = (msg) => {
      setMessages(prev => [...prev, {
        source: msg.source,
        message: msg.message,
        timestamp: new Date()
      }]);
    };

    return (
      <div className="h-screen flex flex-col bg-white">
        <style>{styles}</style>

        {/* Header with Session Controls */}
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shadow-sm">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Courses</span>
          </button>
          
          {/* Session Status Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
              <Clock size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">{formatDuration(sessionDuration)}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-900">
                {completedSlides.length}/{module.slides} Completed
              </span>
            </div>
            
            <button
              onClick={toggleSessionState}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                sessionState === 'active'
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {sessionState === 'active' ? (
                <>
                  <Pause size={16} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} />
                  Resume
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${agentConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600">
              {agentConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-12">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Start learning with your AI tutor!</p>
                <p className="text-sm">Click the phone icon below to connect and start the conversation.</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.source === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.source === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow-md border border-gray-200'
                }`}>
                  <div className="flex items-start gap-2">
                    {msg.source === 'ai' && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                        AI
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.source === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                        {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Bar */}
        <div className="border-t border-gray-200 bg-white">
          <ConversationBar
            agentId={AGENT_ID}
            onMessage={handleMessage}
            onConnect={() => {
              setAgentConnected(true);
              console.log('✅ Agent connected to:', AGENT_ID);
            }}
            onDisconnect={() => {
              setAgentConnected(false);
              console.log('❌ Agent disconnected');
            }}
            onError={(error) => {
              console.error('❌ Agent error:', error);
              setMessages(prev => [...prev, {
                source: 'ai',
                message: `Error: ${error.message}. Please try reconnecting.`,
                timestamp: new Date()
              }]);
            }}
          />
        </div>
      </div>
    );
  };

  // Q&A Agent Modal Component (for quick questions without full learning mode)
  const QAAgentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">AI Learning Assistant</h2>
                {agentOnline ? (
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
              <p className="text-xs text-gray-500">{selectedModule?.title}</p>
            </div>
          </div>
          <button onClick={() => setQaModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
            <Plus size={20} className="rotate-45" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {agentMessages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
              <p>Ask me anything about this lesson!</p>
            </div>
          )}
          {agentMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${msg.role === 'user' ? '' : 'space-y-2'}`}>
                <div className={`p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                {msg.role === 'assistant' && msg.messageId && (
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-xs text-gray-500">Was this helpful?</span>
                    <button
                      onClick={() => rateAgentResponse(msg.messageId, true)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Helpful"
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button
                      onClick={() => rateAgentResponse(msg.messageId, false)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Not helpful"
                    >
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {agentLoading && (
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
              value={agentInputText}
              onChange={(e) => setAgentInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendAgentMessage())}
              placeholder={agentOnline ? "Ask a question..." : "Agent is offline"}
              disabled={!agentOnline}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
            />
            <button
              onClick={sendAgentMessage}
              disabled={!agentInputText.trim() || agentLoading || !agentOnline}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send • AI-powered by ElevenLabs</p>
        </div>
      </div>
    </div>
  );

  const styles = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out; }
    .animate-scale-in { animation: scaleIn 0.3s ease-out; }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  `;

  // If in learning mode, show agent chat view with ConversationBar
  if (isLearning && selectedModule) {
    return (
      <AgentChatView
        module={selectedModule}
        onExit={() => {
          setIsLearning(false);
        }}
      />
    );
  }

  // Module detail view (before entering learning mode)
  if (selectedModule) {
    const progressPercentage = Math.round((completedSlides.length / selectedModule.slides) * 100);
    
    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        <style>{styles}</style>
        
        {/* Header with Session Controls */}
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white flex-shrink-0">
          <button onClick={() => setSelectedModule(null)} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Courses</span>
          </button>
          
          {/* Session Status Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
              <Clock size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">{formatDuration(sessionDuration)}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-900">
                {completedSlides.length}/{selectedModule.slides} Completed
              </span>
            </div>
            
            <button
              onClick={toggleSessionState}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                sessionState === 'active'
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {sessionState === 'active' ? (
                <>
                  <Pause size={16} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} />
                  Resume
                </>
              )}
            </button>
            
            {completedSlides.length === selectedModule.slides && (
              <button
                onClick={completeSession}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Finish Session
              </button>
            )}
          </div>
          
          <div className="text-xl font-extrabold text-blue-600">AI LEARNING</div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center p-6 overflow-hidden relative">
            {/* Interaction Toolbar */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => setHighlightMode(!highlightMode)}
                className={`p-2 rounded-lg transition-all ${
                  highlightMode
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                title="Highlight text"
              >
                <Highlighter size={20} />
              </button>
              <button
                onClick={() => setAnnotationMode(!annotationMode)}
                className={`p-2 rounded-lg transition-all ${
                  annotationMode
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                title="Add annotation"
              >
                <StickyNote size={20} />
              </button>
              <button
                onClick={() => setQaModalOpen(true)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all relative"
                title="Ask AI Assistant"
              >
                <MessageCircle size={20} />
                {agentOnline && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>
            </div>

            <div className="text-center text-white max-w-xl animate-fade-in-up">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${selectedModule.color} flex items-center justify-center shadow-2xl`}>
                <BookOpen size={48} />
              </div>
              <h1 className="text-3xl font-bold mb-2">{selectedModule.title}</h1>
              <p className="text-lg text-gray-300 mb-4">{selectedModule.subject} - {selectedModule.instructor}</p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">{progressPercentage}% Complete</p>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                {/* 修复：将 'flexitems-center' 改为 'flex items-center' */}
                <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full"> 
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{selectedModule.rating}</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
                  <Users className="w-4 h-4" />
                  <span>{selectedModule.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
                  <Eye className="w-4 h-4" />
                  <span>{visitedSlides.length}/{selectedModule.slides} Visited</span>
                </div>
              </div>
              
              {highlightMode && (
                <div className="mb-4 p-3 bg-yellow-500 text-gray-900 rounded-lg animate-pulse">
                  📝 Highlight mode active - Select text to highlight
                </div>
              )}
              
              {annotationMode && (
                <div className="mb-4 p-3 bg-purple-500 text-white rounded-lg animate-pulse">
                  ✏️ Annotation mode active - Click to add notes
                </div>
              )}
              
              <button
                onClick={() => {
                  visitSlide(0);
                  setIsLearning(true);
                }}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all duration-300"
              >
                {selectedModule.progress > 0 ? 'Continue Learning' : 'Start Tutorial'}
              </button>
            </div>
          </div>

          {/* Sidebar - Course Content */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden flex-shrink-0">
            <div className="p-4 border-b border-gray-200 flex-shrink-0 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Course Content</h2>
              <p className="text-xs text-gray-500 mt-1">
                {visitedSlides.length} visited • {completedSlides.length} completed
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {Array.from({ length: selectedModule.slides }).map((_, i) => {
                  const isVisited = visitedSlides.includes(i);
                  const isCompleted = completedSlides.includes(i);
                  
                  return (
                    <div
                      key={i}
                      onClick={() => visitSlide(i)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        isCompleted
                          ? 'border-green-500 bg-green-50'
                          : isVisited
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-500'
                              : isVisited
                              ? 'bg-blue-500'
                              : 'bg-gray-100'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle size={14} className="text-white" />
                            ) : (
                              <PlayCircle size={14} className={isVisited ? 'text-white' : 'text-gray-600'} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">Slide {i + 1}</p>
                            <p className="text-xs text-gray-500">~2 min</p>
                          </div>
                        </div>
                        {!isCompleted && isVisited && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markSlideComplete(i);
                            }}
                            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            Mark Done
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Annotations & Highlights Panel */}
            {(highlights.length > 0 || annotations.length > 0) && (
              <div className="border-t border-gray-200 p-4 bg-gray-50 max-h-48 overflow-y-auto">
                <h3 className="text-sm font-bold text-gray-900 mb-2">My Notes</h3>
                {highlights.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Highlights ({highlights.length})</p>
                    {highlights.slice(0, 2).map(h => (
                      <div key={h.id} className="text-xs bg-yellow-50 border border-yellow-200 rounded p-2 mb-1">
                        {h.text}
                      </div>
                    ))}
                  </div>
                )}
                {annotations.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Annotations ({annotations.length})</p>
                    {annotations.slice(0, 2).map(a => (
                      <div key={a.id} className="text-xs bg-purple-50 border border-purple-200 rounded p-2 mb-1">
                        {a.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {qaModalOpen && <QAAgentModal />}
      </div>
    );
  }
  
  // Home/Course listing view
  const renderContent = () => {
    if (activeTab === 'courses') {
      const myModules = modules.filter(m => myCourses.includes(m.id));
      return (
        <div className="p-6 bg-gray-100 overflow-y-auto h-full animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses ({myModules.length})</h2>
          {myModules.length === 0 ? <p className="text-gray-500">No courses added yet.</p> : (
            <div className="grid grid-cols-4 gap-5">
              {myModules.map((module) => (
                <div key={module.id} onClick={() => setSelectedModule(module)} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer group border border-gray-200 transition-all duration-300">
                  <div className={`h-32 bg-gradient-to-br ${module.color} relative`}> {/* 修复模板字符串引号 */}
                    <div className="absolute inset-0 flex items-center justify-center"><h3 className="text-xl font-bold text-white">{module.subject}</h3></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl"><PlayCircle size={24} className="text-gray-900" /></div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{module.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{module.instructor}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">{module.progress > 0 ? 'Continue' : 'Start'}</button>
                      <button onClick={(e) => removeFromMyCourses(e, module.id)} className="px-2 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (activeTab === 'progress') {
      return (
        <div className="p-6 bg-gray-100 overflow-y-auto h-full animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Progress</h2>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"><p className="text-3xl font-bold text-blue-600">{progressData.totalHours}h</p><p className="text-sm text-gray-500">Total Study Time</p></div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"><p className="text-3xl font-bold text-green-600">{progressData.coursesCompleted}</p><p className="text-sm text-gray-500">Courses Completed</p></div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"><p className="text-3xl font-bold text-orange-600">{progressData.currentStreak}</p><p className="text-sm text-gray-500">Current Streak</p></div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"><p className="text-3xl font-bold text-purple-600">{progressData.longestStreak}</p><p className="text-sm text-gray-500">Longest Streak</p></div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Activity</h3>
          <div className="bg-white p-4 rounded-xl shadow-md flex items-end gap-2 h-40">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => (
              <div key={d} className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="w-full bg-blue-500 rounded-t group-hover:bg-blue-600 transition-all duration-300" style={{height: [60,80,40,90,70,30,50][i] + '%'}} />
                <span className="text-xs text-gray-500 mt-1">{d}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'achievements') {
      return (
        <div className="p-6 bg-gray-100 overflow-y-auto h-full animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((a) => (
              <div key={a.id} className={`p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${a.unlocked ? 'bg-white' : 'bg-gray-200 opacity-60'}`}>
                <div className={`w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center ${!a.unlocked && 'grayscale'} shadow-lg`}>
                  <a.icon size={28} className="text-white" />
                </div>
                <h4 className="font-bold text-center text-gray-900">{a.title}</h4>
                <p className="text-xs text-center text-gray-500">{a.desc}</p>
                {a.unlocked && <p className="text-xs text-center text-green-600 mt-1 font-medium">Unlocked</p>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'extension') {
      return (
        <div className="p-6 bg-gray-100 overflow-y-auto h-full animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Web Extension</h2>
          <div className="bg-white p-4 rounded-xl shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-bold text-gray-900 mb-3">Add Website Link</h3>
            <div className="flex gap-2">
              <input value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="Paste URL here..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
              <button onClick={addLink} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">Add</button>
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-3">Saved Links ({extensionLinks.length})</h3>
          <div className="space-y-2">
            {extensionLinks.map((link) => (
              <div key={link.id} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-blue-600" />
                  <div><p className="font-medium text-sm text-gray-900">{link.title}</p><p className="text-xs text-gray-500">{link.url}</p></div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">Learn with AI</button>
                  <button onClick={() => removeLink(link.id)} className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-3xl px-4">
                  <p className="text-xs tracking-widest mb-2 opacity-80 font-medium">AI LEARNING PLATFORM</p>
                  <h1 className="text-2xl font-bold mb-2">{slide.title}</h1>
                  <p className="text-sm text-white/90">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'}`} />))}
          </div>
        </div>
        <div className="flex-1 p-5 bg-gray-100 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Featured Courses</h2>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer">
              <option>All Categories</option><option>Science</option><option>Math</option><option>History</option><option>CS</option>
            </select>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {modules.map((module) => (
              <div key={module.id} onClick={() => setSelectedModule(module)} className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer group border border-gray-200 transition-all duration-300 ${addedAnimation === module.id ? 'ring-2 ring-green-500' : ''}`}>
                <div className={`h-28 bg-gradient-to-br ${module.color} relative overflow-hidden`}>
                  <MessageCircle className="w-10 h-10 text-white/20 absolute top-3 right-3" />
                  <div className="absolute inset-0 flex items-center justify-center"><h3 className="text-lg font-bold text-white">{module.subject}</h3></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <PlayCircle size={22} className="text-gray-900" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1 flex-wrap">
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">{module.category}</span>
                    {myCourses.includes(module.id) && <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Added</span>}
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs mb-0.5 truncate">{module.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{module.instructor}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /><span>{module.rating}</span></div>
                    <div className="flex items-center gap-0.5"><Users className="w-3 h-3" /><span>{module.students >= 1000 ? (module.students/1000).toFixed(1)+'k' : module.students}</span></div>
                    <div className="flex items-center gap-0.5"><Clock className="w-3 h-3" /><span>{module.duration}</span></div>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex-1 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">Start</button>
                    {!myCourses.includes(module.id) ? (
                      <button onClick={(e) => addToMyCourses(e, module.id)} className="px-2 py-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all"><Plus size={14} /></button>
                    ) : (
                      <button className="px-2 py-1.5 text-xs text-green-600 border border-green-200 rounded-lg bg-green-50"><CheckCircle size={14} /></button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  // Main JSX return for StudentApp
  return (
    <div className="h-screen bg-white flex overflow-hidden">
      <style>{styles}</style>
      <div className="w-20 border-r border-gray-200 flex flex-col items-center py-4 space-y-4 bg-gray-50 flex-shrink-0">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer">
          <FileText size={16} />
        </div>
        <nav className="flex-1 flex flex-col items-center space-y-3 mt-4">
          {[{ icon: Layout, label: 'Home', id: 'home' }, { icon: BookOpen, label: 'Courses', id: 'courses' }, { icon: TrendingUp, label: 'Progress', id: 'progress' }, { icon: Award, label: 'Achieve', id: 'achievements' }, { icon: Link, label: 'Extension', id: 'extension' }].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${activeTab === item.id ? 'text-blue-600 bg-blue-50 shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}> {/* 修复模板字符串引号 */}
              <item.icon size={18} /><span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-5 bg-white flex-shrink-0">
          <div className="text-xl font-extrabold text-blue-600">AI LEARNING</div>
          <div className="flex-1 max-w-lg mx-6">
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search courses..." className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-all"><Plus size={14} />Create</button>
        </header>
        <div className="flex-1 flex flex-col overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentApp; // <--- 顶层导出