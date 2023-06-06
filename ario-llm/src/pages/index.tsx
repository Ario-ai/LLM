'use-client'

import styles from '../styles/index.module.css'
import { useEffect, useState } from 'react';
import { Input, Sheet, Button, Stack } from '@mui/joy';
import BotBubble from '@/components/BotBubble';

export default function Home() {

  const [convo, setConvo] = useState<{ isUser: boolean, txt: string }[]>([])

  useEffect(() => { console.log(convo) }, [convo])


  const UserBubble = ({ children }: { children: any }) => <Sheet sx={{ backgroundColor: 'red', color: 'white', textAlign: 'right', ':hover': { backgroundColor: 'darkred' } }}>{children}</Sheet>

  const SendButton = () => <Button type="submit">Send</Button>

  const ChatInput = () => {
    const [userInput, setUserInput] = useState<string>('');

    return <form
      onSubmit={(e) => {
        setConvo([...convo, { isUser: true, txt: userInput }, { isUser: false, txt: 'bot response' }])
        e.preventDefault();
      }}
    >
      <Input
        placeholder="Send a hoot."
        required
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
        endDecorator={<SendButton />}
      />
    </form>
  }

  const ChatWindow = ({ children }: { children: any }) => {
    return <Sheet>
      <Stack my={1}
        spacing={2}
        height={'75vh'}>
        {children}
      </Stack>
      <ChatInput />
    </Sheet>
  }

  return (
    <main className={styles.main}>
      <ChatWindow>
        {convo.map(c => c.isUser ? <UserBubble>{c.txt}</UserBubble> : <BotBubble>{c.txt}</BotBubble>)}
      </ChatWindow>
    </main>
  )
}
