import React from 'react'
import { Message } from '../typings'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import {unstable_getServerSession} from 'next-auth/next'
import Providers from './Providers'



const HomePage = async () => {
   const data =await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`).then(res => res.json());
   const messages:Message[]=data.messages;
   const session= await unstable_getServerSession()
   

  return (
    <main>
      <Providers session={session}>
        <MessageList initialMessages={messages}/>
        <ChatInput session={session}/>
      </Providers> 
    </main>
  )
}

export default HomePage