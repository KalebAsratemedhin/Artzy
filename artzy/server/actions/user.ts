'use server'
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verifyToken } from "../utils/auth";

const prisma = new PrismaClient()


export async function getUserFromToken() {
    const token = cookies().get('session')?.value

    if(!token){
        return null;
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
        console.error('Invalid token:', error);
        return null;
      }

}

