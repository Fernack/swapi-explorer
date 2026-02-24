'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Loader2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { ChatMessage } from '@/types/swapi';
import { MessageBubble } from '@/components/MessageBubble';
import { TypingIndicator } from '@/components/TypingIndicator';

const SUGGESTED_QUESTIONS = [
    'Who is Luke Skywalker?',
    'How many characters are from Tatooine?',
    'Tell me about the Millennium Falcon',
    'What is the Force?',
    'Describe the Death Star',
    'Who is Master Yoda?',
];

export function ChatInterface() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: `Greetings! I am C-3PO, your Star Wars Universe guide. Ask me about characters, planets, starships, the Force, or anything from the saga.`,
            timestamp: new Date(),
        }]);
    }, []);


    // Scroll automatically
    useEffect(() => {
        if (scrollRef.current) {
            // 'viewport' es el div interno de ScrollArea donde ocurre el scroll real
            const viewport = scrollRef.current.querySelector<HTMLDivElement>('[data-slot="scroll-area-viewport"]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages, loading]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || loading) return;
        setError(null);

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };

        // Add user message immediately
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Use updated messages including the current user message
            const history = [...messages, userMessage]
                .filter((m) => m.id !== 'welcome')
                .slice(-10)
                .map((m) => ({ role: m.role, content: m.content }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: content.trim(), history }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to get response');

            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            if (data.model) setModel(data.model);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const clearChat = () => {
        setMessages([
            {
                id: 'welcome',
                role: 'assistant',
                content: `Greetings! I am C-3PO, your Star Wars Universe guide. Ask me about characters, planets, starships, the Force, or anything from the saga.`,
                timestamp: new Date(),
            },
        ]);
        setError(null);
        setModel(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center force-pulse">
                        <Bot size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold gold-text">AI Agent</h1>
                        <p className="text-sm text-muted-foreground">Your Star Wars Universe Guide</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {model && (
                        <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-300 bg-blue-500/10">
                            <Sparkles size={10} className="mr-1" />
                            {model === 'fallback' ? 'Rule-based' : model}
                        </Badge>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearChat}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <RefreshCw size={14} className="mr-1" />
                        Reset
                    </Button>
                </div>
            </div>

            <div className="lightsaber-line" />

            {/* No API Key Notice */}
            {model === 'fallback' && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-sm">
                    <AlertCircle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-yellow-300 font-medium">Rule-based mode active</p>
                        <p className="text-muted-foreground text-xs mt-0.5">
                            Set <code className="bg-white/10 px-1 rounded">OPENAI_API_KEY</code> in{' '}
                            <code className="bg-white/10 px-1 rounded">.env.local</code> for full AI capabilities.
                        </p>
                    </div>
                </div>
            )}

            {/* Chat area */}
            <div className="glass-card rounded-2xl border border-white/8 flex flex-col"
                style={{ height: '80vh', minHeight: '400px' }}>
                <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollRef as React.RefObject<React.ElementRef<typeof ScrollArea>>}>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        {loading && <TypingIndicator />}
                        {error && (
                            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                <AlertCircle size={15} />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Suggested questions */}
                {messages.length <= 2 && (
                    <div className="px-4 pb-2">
                        <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                        <div className="flex flex-wrap gap-1.5">
                            {SUGGESTED_QUESTIONS.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => sendMessage(q)}
                                    disabled={loading}
                                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/10 transition-all disabled:opacity-40"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-white/8">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            ref={inputRef}
                            id="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about Star Wars..."
                            disabled={loading}
                            className="flex-1 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/8"
                        />
                        <Button
                            type="submit"
                            id="chat-send"
                            disabled={loading || !input.trim()}
                            className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                            {loading ? '' : 'Send'}
                        </Button>
                    </form>
                </div>
            </div>
        </div >
    );
}