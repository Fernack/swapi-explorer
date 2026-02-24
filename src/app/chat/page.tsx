import type { Metadata } from 'next';
import { ChatInterface } from '@/components/ChatInterface';

export const metadata: Metadata = {
  title: 'Chat',
  description:
    'Chat with the Star Wars Universe Expert Assistant',
};

export default function ChatPage() {
  return <ChatInterface />;
}
