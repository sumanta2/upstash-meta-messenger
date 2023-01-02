"use client"
import { SessionProvider } from "next-auth/react"

const Providers = ({session,children}:any) => {
  return (
    <div>
        <SessionProvider session={session} >{children}</SessionProvider>
    </div>
  )
}

export default Providers