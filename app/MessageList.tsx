"use client"
import React, { useEffect } from 'react'
import useSWR from "swr"
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';
type props={
  initialMessages: Message[]
}

const MessageList = ({initialMessages}:props) => {

  const {data:messages,error,mutate}=useSWR("api/getMessages",fetcher);
  //the line i provide width-full but in video they provide max-w-2xl class   in this line   <div className='space-y-5 px-5 pt-8 pb-32 w-full'>

  useEffect(() => {
    const channel= clientPusher.subscribe('messages');

    channel.bind('new-message', async (data:Message)=> {

      //if you sent the message, no need to update the cache
        if((messages || initialMessages).find(message => message.id === data.id)) return; 
      if (!messages)
      {
        mutate(fetcher)
      }
      else
      {   
        mutate(fetcher,{
          optimisticData:[data,...messages!],
          rollbackOnError:true
        });
      }
    });
    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages,mutate,clientPusher])
  

  return (
     <div className='space-y-5 px-5 pt-8 pb-32 w-full'>     
      {messages ?.map(message =>(
          <MessageComponent key={message.id} message={message}/>
      ))}
    </div>
  )
}

export default MessageList

