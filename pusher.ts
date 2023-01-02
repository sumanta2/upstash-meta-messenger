import Pusher from "pusher";
import ClientPusher from "pusher-js"

export const serverPusher= new Pusher({
    appId: process.env.APP_ID!,
    key:process.env.KEY!,
    secret: process.env.SECRET!,
    cluster: "ap2",
    useTLS: true,
})

export const clientPusher= new ClientPusher(process.env.NEXT_PUBLIC_PUSHER_ID!,{
    cluster: 'ap2',
    forceTLS:true,
});