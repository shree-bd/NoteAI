import React, { useState } from 'react';
import { 
  SparklesIcon, 
  LightBulbIcon, 
  TagIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';
import toast from 'react-hot-toast';

const AiAssistant = ({ content, title, onApplySuggestion }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  const getAiSuggestions = async () => {
    if (!content || content.length < 10) {
      toast.error('Please write some content first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/api/ai/analyze/', {
        content,
        title
      });

      setSuggestions(response.data.ai_suggestions);
      setShowAssistant(true);
      toast.success('AI analysis complete! 🤖');
    } catch (error) {
      toast.error('AI analysis failed');
      console.error('AI analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const enhanceContent = async () => {
    if (!content) return;

    setIsLoading(true);
    try {
      const response = await api.post('/api/ai/enhance/', {
        content
      });

      onApplySuggestion('content', response.data.enhancement.enhanced_content);
      toast.success('Content enhanced by AI! ✨');
    } catch (error) {
      toast.error('Content enhancement failed');
    } finally {
      setIsLoading(false);
    }
  };

  const generateTitle = async () => {
    if (!content) return;

    setIsLoading(true);
    try {
      const response = await api.post('/api/ai/title/', {
        content
      });

      onApplySuggestion('title', response.data.suggested_title);
      toast.success('Smart title generated! 🎯');
    } catch (error) {
      toast.error('Title generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestedCategory = (category) => {
    onApplySuggestion('category', category);
    toast.success(`Category "${category}" applied!`);
  };

  return (
    <div className="ai-assistant">
      {/* AI Trigger Button */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={getAiSuggestions}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <SparklesIcon className="w-4 h-4" />
          )}
          <span>AI Assistant</span>
        </button>

        <button
          onClick={enhanceContent}
          disabled={isLoading || !content}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <PencilSquareIcon className="w-4 h-4" />
          <span>Enhance</span>
        </button>

        <button
          onClick={generateTitle}
          disabled={isLoading || !content}
          className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          <LightBulbIcon className="w-4 h-4" />
          <span>Smart Title</span>
        </button>
      </div>

      {/* AI Suggestions Panel */}
      <AnimatePresence>
        {showAssistant && suggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                  AI Assistant
                </h3>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                  Powered by AI
                </span>
              </div>
              <button
                onClick={() => setShowAssistant(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Suggested Categories */}
            {suggestions.suggested_categories && suggestions.suggested_categories.length > 0 && (
              <div className="mb-4">
                <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <TagIcon className="w-4 h-4" />
                  <span>Suggested Categories</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.suggested_categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => applySuggestedCategory(category)}
                      className="flex items-center space-x-1 px-3 py-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-full text-sm text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                    >
                      <span>{category}</span>
                      <CheckIcon className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {suggestions.summary && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Summary
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-100 dark:border-purple-800">
                  {suggestions.summary}
                </p>
              </div>
            )}

            {/* Enhancements */}
            {suggestions.enhancements && suggestions.enhancements.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Suggestions
                </h4>
                <div className="space-y-2">
                  {suggestions.enhancements.map((enhancement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-100 dark:border-purple-800"
                    >
                      <LightBulbIcon className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{enhancement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiAssistant; 