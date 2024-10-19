'use server'
import { cookies } from "next/headers";
import { verifyToken } from "../utils/auth";
import { redirect } from "next/navigation";
import prisma from "@/server/utils/prisma";


export async function getUserFromToken() {
    const token = cookies().get('session')?.value

    if(!token){
        redirect('/auth/signin')
        
    }

    try {
        const {email, id} = await verifyToken(token)!; 
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user; 
      } catch (error) {
        redirect('/auth/signin')
      }

}

