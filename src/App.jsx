import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import FileUpload from './components/FileUpload';
import PersonalCard from './components/PersonalCard';
import InfoForm from './components/InfoForm';
import ErrorBoundary from './components/ErrorBoundary';
import DemoShowcase from './components/DemoShowcase';
import { generateCardFilename } from './lib/utils';

const AppContent = () => {
  const [cardData, setCardData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showDemo, setShowDemo] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  const handleFileUpload = (file, content) => {
    setCurrentStep(2);
    const mockData = parseContent(content);
    setCardData(mockData);
  };

  const handleManualInput = (data) => {
    setCardData(data);
    setCurrentStep(3);
  };

  const parseContent = (content) => {
    return {
      name: "示例用户",
      location: "北京，中国",
      tags: ["产品经理", "技术爱好者", "创业者"],
      keyFocus: "专注于AI技术在产品中的应用，探索人机交互的新可能性",
      highlights: [
        "主导开发了3款月活百万级产品",
        "获得2023年度最佳产品奖",
        "技术博客拥有10万+关注者"
      ],
      expertise: [
        {
          name: "产品设计",
          description: "从0到1构建产品架构，深度理解用户需求"
        },
        {
          name: "AI应用",
          description: "将大语言模型应用于实际业务场景"
        },
        {
          name: "团队管理",
          description: "带领10人团队高效协作，持续交付价值"
        },
        {
          name: "数据分析",
          description: "用数据驱动产品决策，提升用户体验"
        }
      ],
      hobbies: ["📚 阅读", "🏃 跑步", "🎸 吉他", "✈️ 旅行"],
      motto: "持续学习，创造价值"
    };
  };

  const handleExportPNG = async () => {
    if (!cardRef.current || !cardData) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: Math.max(2, window.devicePixelRatio || 1),
        backgroundColor: '#fff',
        style: {
          // Add some padding to prevent clipping of shadows
          padding: '20px',
          boxSizing: 'content-box',
        },
      });

      const link = document.createElement('a');
      link.download = generateCardFilename(cardData.name);
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export PNG:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const steps = [
    { id: 1, name: "上传信息", description: "上传您的简历或自我介绍" },
    { id: 2, name: "编辑信息", description: "确认并编辑名片信息" },
    { id: 3, name: "生成名片", description: "预览并下载您的名片" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            个人名片生成器
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            基于Claude Sonnet 4优化的智能名片生成工具，让您的个人品牌更加专业
          </p>

          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setShowDemo(false)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                !showDemo
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-gray-200/50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>创建名片</span>
              </span>
            </button>
            <button
              onClick={() => setShowDemo(true)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                showDemo
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-gray-200/50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>功能演示</span>
              </span>
            </button>
          </div>
        </header>

        {!showDemo && (
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 ${
                        currentStep >= step.id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                      }`}>
                        {currentStep > step.id ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="mt-3 text-center">
                        <p className={`text-sm font-semibold ${
                          currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {step.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 max-w-20">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                        currentStep > step.id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                          : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {showDemo ? (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <DemoShowcase />
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                {currentStep === 1 && (
                  <FileUpload onFileUpload={handleFileUpload} />
                )}

                {currentStep === 2 && (
                  <InfoForm
                    initialData={cardData}
                    onSubmit={handleManualInput}
                    onBack={() => setCurrentStep(1)}
                  />
                )}

                {currentStep === 3 && cardData && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <PersonalCard ref={cardRef} data={cardData} />
                    </div>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                          </svg>
                          <span>返回编辑</span>
                        </span>
                      </button>
                      <button
                        onClick={handleExportPNG}
                        disabled={isExporting}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          {isExporting ? (
                            <>
                              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <span>导出中...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>下载名片</span>
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
