
import '../../styles/global.css'
import { useEffect, useState } from 'react';
import { Input, Sheet, Button, Stack } from '@mui/joy';
import BotBubble from '@/components/BotBubble';
import UserBubble from '@/components/UserBubble';
import Header from '@/components/Header';

export default function Home() {

  const [convo, setConvo] = useState<{ isUser: boolean, txt: string, context?: Array<any> }[]>([])

  useEffect(() => { console.log(convo) }, [convo])

  const SendButton = () => <Button type="submit">Send</Button>

  useEffect(() => {
    // window is accessible here.
    fetch(`http://${window.location.host}/api/context/${encodeURIComponent("How big is New Jersey")}`, { // "/my_external_api" as an alternative
    method: "POST",
  })
  .then(res => res.json())
  .then(json => console.log("CONTEXT", json))
  .catch((e) => console.log(e));

  }, []);

  const ChatInput = () => {
    const [userInput, setUserInput] = useState<string>('');

    const getAnswer = () => {
      fetch("/api/ask/"+userInput, { // "/my_external_api" as an alternative
        method: "POST",
      })
      .then(res => res.text())
      .then(answer => getContext(answer))
      .catch((e) => console.log(e));
    }
  
    const getContext = (answer: string) => {
      fetch(`http://${window.location.host}/api/context/${encodeURIComponent(userInput)}`, { // "/my_external_api" as an alternative
        method: "POST",
      })
      .then(res => res.json())
      .then(json => setConvo([...convo, { isUser: true, txt: userInput }, { isUser: false, txt:answer, context: json }]))
      .catch((e) => console.log(e));
    }
  

    return <form
      onSubmit={(e) => {
        getAnswer()
        // setConvo([...convo, { isUser: true, txt: userInput }, { isUser: false, txt: 'bot response' }])
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
    return <Sheet >
      <Stack my={1}
        spacing={2}
        height={'75vh'} paddingY={2} sx={{ backgroundColor: '#EFEFEF', borderRadius: 8, overflowY: 'scroll' }}>
        {children}
      </Stack>

    </Sheet>
  }

  return (
    <main >
      <Header title="Demo Question Answer" />

      <ChatWindow>
        {convo.map(c => c.isUser ? <UserBubble>{c.txt}</UserBubble> : <BotBubble context={c.context}>{c.txt}</BotBubble>)}
      </ChatWindow>
      <ChatInput />
    </main>
  )
}
