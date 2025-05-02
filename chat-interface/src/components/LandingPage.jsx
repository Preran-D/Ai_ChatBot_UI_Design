import React from 'react';
import './LandingPage.css';
import ChatInterface from './ChatInterface';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Bot, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Chat Column */}
            <div className="chat-column">
                <motion.div
                    className="chat-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <ChatInterface />
                </motion.div>
            </div>
            {/* Animation Column */}
            <div className="animation-column">
                <motion.div
                    className="floating-elements"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="logo-section"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, 45, 0],
                                rotate: [0, 10, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="logo-container">
                                <Sparkles
                                    className="logo-icon"
                                    size={38}
                                />
                            </div>
                        </motion.div>

                    </motion.div>
                    {/* Floating elements */}
                    <motion.div
                        className="floating-icon icon-1"
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <MessageCircle size={48} className="text-blue-400" />
                    </motion.div>

                    <motion.div
                        className="floating-icon icon-2"
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -8, 0]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    >
                        <Bot size={48} className="text-purple-400" />
                    </motion.div>

                    <motion.div
                        className="floating-icon icon-3"
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    >
                        <Zap size={48} className="text-amber-400" />
                    </motion.div>

                    {/* Background circles */}
                    <motion.div
                        className="bg-circle circle-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                        className="bg-circle circle-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;