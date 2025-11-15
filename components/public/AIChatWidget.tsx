import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { api } from '../../services/mockApiService';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'ai';
};

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
      if (isOpen && messages.length === 0) {
        setMessages([
            { id: Date.now(), text: "Hello! I'm the Zenith AI assistant. Ask me about a specific product, or about our shipping and return policies.", sender: 'ai' }
        ]);
      }
    }, [isOpen, messages.length]);

    const renderMessageWithLinks = (text: string) => {
        const parts = text.split(/(\/#\/products\/\d+)/g);
        return parts.map((part, index) => {
            if (part.startsWith('/#/products/')) {
                const linkPath = part.substring(2); // remove '/#' to get '/products/...'
                return (
                    <Link key={index} to={linkPath} className="text-blue-600 font-bold hover:underline" onClick={() => setIsOpen(false)}>
                        [View Product]
                    </Link>
                );
            }
            return part;
        });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = userInput.trim();
        if (!trimmedInput || isLoading) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: trimmedInput,
            sender: 'user',
        };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

            const findProductByNameFunctionDeclaration: FunctionDeclaration = {
                name: 'findProductByName',
                description: 'Get details for a specific product from the Zenith E-Commerce store, such as its price, rating, and a link to its page.',
                parameters: {
                    type: Type.OBJECT,
                    properties: {
                        productName: {
                            type: Type.STRING,
                            description: 'The name of the product to search for. Can be a partial name or a descriptive query.',
                        },
                    },
                    required: ['productName'],
                },
            };
            
            // FIX: Encapsulated `tools` and `systemInstruction` within a `config` object to adhere to the Gemini API guidelines.
            const firstResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [{ role: 'user', parts: [{ text: trimmedInput }] }],
                config: {
                    tools: [{ functionDeclarations: [findProductByNameFunctionDeclaration] }],
                    systemInstruction: `You are a friendly customer support assistant for Zenith E-Commerce. Your primary role is to help users by answering questions about products and company policies. If the user asks about a specific product, you MUST use the 'findProductByName' tool to get information. If the user asks a general question, you will classify it against a list of allowed topics before answering.`
                }
            });

            let aiResponseText = '';
            
            if (firstResponse.functionCalls && firstResponse.functionCalls.length > 0) {
                const functionCall = firstResponse.functionCalls[0];
                let functionResult = 'Product not found.';

                if (functionCall.name === 'findProductByName') {
                    const productName = functionCall.args.productName as string;
                    const allProducts = await api.getProducts();
                    const foundProduct = allProducts.find(p => p.name.toLowerCase().includes(productName.toLowerCase()));

                    if (foundProduct) {
                        const averageRating = foundProduct.reviews && foundProduct.reviews.length > 0
                            ? (foundProduct.reviews.reduce((acc, r) => acc + r.rating, 0) / foundProduct.reviews.length).toFixed(1)
                            : 'No ratings yet';
                        
                        functionResult = `Product Found: ${foundProduct.name}, Price: $${foundProduct.price.toFixed(2)}, Rating: ${averageRating}/5 stars, URL: /#/products/${foundProduct.id}`;
                    }
                }

                const secondResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: [
                        { role: 'user', parts: [{ text: trimmedInput }] },
                        firstResponse.candidates[0].content,
                        {
                            role: 'tool',
                            parts: [{
                                functionResponse: {
                                    name: 'findProductByName',
                                    response: { result: functionResult }
                                }
                            }]
                        }
                    ],
                });
                aiResponseText = secondResponse.text;

            } else {
                // Fallback to topic classification if no tool is called
                const topics = await api.getAITopics();
                const enabledTopics = topics.filter(t => t.enabled).map(t => t.topic);
                
                const classificationPrompt = `Does the user query "${trimmedInput}" fall under these topics: ${enabledTopics.join(', ')}? Respond only "yes" or "no".`;
                const classificationResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: classificationPrompt });
                const isQueryAllowed = classificationResponse.text.toLowerCase().includes('yes');

                if (isQueryAllowed) {
                    const answeringResponse = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: trimmedInput,
                        config: {
                            systemInstruction: `You are a support assistant for Zenith E-Commerce. Answer the user's question based on these allowed topics: ${enabledTopics.join(', ')}. Keep responses helpful and concise.`
                        }
                    });
                    aiResponseText = answeringResponse.text;
                } else {
                    aiResponseText = `I can only assist with questions about our products or these topics: ${enabledTopics.join(', ')}. For other inquiries, please use our "Contact Us" page.`;
                }
            }
            
            const newAiMessage: Message = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, newAiMessage]);

        } catch (error) {
            console.error("AI chat error:", error);
            const newErrorMessage: Message = {
                id: Date.now() + 1,
                text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'ai',
            };
            setMessages(prev => [...prev, newErrorMessage]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            {/* Chat Bubble */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-50 transition-transform hover:scale-110"
                aria-label="Open support chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white rounded-lg shadow-2xl flex flex-col z-50">
                    {/* Header */}
                    <div className="bg-primary-600 text-white p-4 rounded-t-lg">
                        <h3 className="font-bold text-lg">Zenith AI Support</h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`rounded-lg px-4 py-2 max-w-xs ${msg.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{renderMessageWithLinks(msg.text)}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                                        <Spinner />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                disabled={isLoading}
                            />
                            <Button type="submit" disabled={isLoading || !userInput.trim()}>Send</Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatWidget;