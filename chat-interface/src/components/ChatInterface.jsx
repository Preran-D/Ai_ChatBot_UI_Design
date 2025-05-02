import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
};

const ChatInterface = () => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [displayedWords, setDisplayedWords] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [initialMessageShown, setInitialMessageShown] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const inputRef = useRef(null);
  const inputFormRef = useRef(null);

  useEffect(() => {
    if (!initialMessageShown) {
      const welcomeMessage = {
        id: 1,
        text: "Welcome to the AI agent on Webflow!",
        secondaryText: "You can build an experience like this to replace complex forms.",
        showTryMe: true,
        sender: 'ai',
      };
      setCurrentMessage(welcomeMessage);
      setInitialMessageShown(true);
    }
  }, [initialMessageShown]);

  useEffect(() => {
    if (currentMessage?.text) {
      const words = currentMessage.text.split(' ');
      setDisplayedWords(words);
      const animationDuration = words.length * 0.05 + 0.5;
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, animationDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentMessage]);

  useEffect(() => {
    if (!isThinking && currentMessage && !currentMessage.showTryMe && animationComplete) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  }, [isThinking, currentMessage, animationComplete]);

  const getAIResponse = (userInput) => {
    const responses = {
      hello: [
        "Hello there! How can I assist you today?",
        "Hi! What can I do for you?",
        "Greetings!",
      ],
      help: [
        "I can help with many things! Try asking about our services or how to get started.",
        "Need assistance? Ask me about our features or how to begin.",
        "Let me guide you. What information are you looking for?",
      ],
      services: [
        "We offer AI integration, chatbot development, and UI design.",
        "Our expertise includes AI solutions, custom chatbots, and user interface design.",
        "You can leverage our services for AI-powered integrations, intelligent chatbots, and stunning UI.",
      ],
      "get started": [
        "To get started, you can explore our documentation or try our quick start guide.",
        "The best way to begin is to check out our introductory materials and tutorials.",
        "Ready to dive in? Our getting started resources will walk you through the process.",
      ],
      pricing: [
        "Our pricing varies depending on your needs. Please visit our pricing page for details.",
        "For information on our plans and costs, please see our pricing section.",
        "We offer flexible pricing options. Check out our pricing page for more information.",
      ],
      contact: [
        "You can contact us via email at support@example.com",
        "Feel free to reach out to our support team at support@example.com or by phone at 1-800-EXAMPLE.",
        "Need to get in touch? Email us at support@example.com or call 1-800-EXAMPLE.",
      ],
      default: [
        "That's interesting. Could you provide more detail?",
        "Tell me more about that.",
        "I'm not sure I understand. Could you please elaborate?",
      ],
    };
    const lowerInput = userInput.toLowerCase();
    const matchedResponse = responses[lowerInput];
    if (matchedResponse) {
      return matchedResponse[Math.floor(Math.random() * matchedResponse.length)];
    }
    return responses["default"][Math.floor(Math.random() * responses["default"].length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userInput = inputValue;
    setCurrentMessage(null);
    setInputValue('');
    setIsThinking(true);
    setInputFocused(false);
    setAnimationComplete(false);

    setTimeout(() => {
      const aiText = getAIResponse(userInput);
      const newMessage = {
        id: Date.now(),
        text: aiText,
        sender: 'ai',
        showTryMe: false,
      };
      setCurrentMessage(newMessage);
      setIsThinking(false);
    }, 1200);
  };

  const handleTryMeClick = () => {
    setCurrentMessage(null);
    setIsThinking(true);
    setAnimationComplete(false);

    setTimeout(() => {
      const aiText = "Great! Let's get started. What would you like to know about our AI solutions?";
      const newMessage = {
        id: Date.now(),
        text: aiText,
        sender: 'ai',
        showTryMe: false,
      };
      setCurrentMessage(newMessage);
      setIsThinking(false);
    }, 800);
  };

  const handleInputFocus = () => setInputFocused(true);
  const handleInputBlur = () => setInputFocused(false);

  return (
    <div className={`chat-container ${inputFocused ? 'input-focused' : ''}`}>
      <div className="messages-container">
        <AnimatePresence>
          {isThinking && (
            <motion.div
              className="thinking-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="thinking-content">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="spinner"
                >
                  <Sparkles className="text-blue-500 w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isThinking && currentMessage && (
            <motion.div
              key={currentMessage.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: inputFocused ? 0.6 : 1,
                height: 'auto'
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`message ${currentMessage.sender} ${inputFocused ? 'dull' : ''}`}
            >
              <div className="message-content">
                <motion.p
                  className="main-text"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {displayedWords.map((word, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      style={{ marginRight: '4px', display: 'inline-block' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>

                {currentMessage.secondaryText && (
                  <motion.p
                    className="secondary-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inputFocused ? 0.6 : 1 }}
                    transition={{ delay: displayedWords.length * 0.05 + 0.3 }}
                  >
                    {currentMessage.secondaryText}
                  </motion.p>
                )}

                {currentMessage.showTryMe && (
                  <motion.button
                    className="try-me-button"
                    onClick={handleTryMeClick}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: inputFocused ? 0.6 : 1
                    }}
                    whileHover={{ scale: inputFocused ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      delay: displayedWords.length * 0.05 + 0.6,
                      type: 'spring',
                      stiffness: 500,
                      damping: 20
                    }}
                  >
                    Try me
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showInput && (
            <motion.form
              ref={inputFormRef}
              onSubmit={handleSendMessage}
              className="input-form"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Type here..."
                  className={`message-input ${inputFocused ? 'focused' : ''}`}
                />
                {inputFocused && (
                  <motion.button
                    type="submit"
                    className={`send-button ${inputValue ? 'active' : ''}`}
                    disabled={!inputValue}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    Send
                  </motion.button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatInterface;