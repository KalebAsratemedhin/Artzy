'use server'

import { z } from 'zod';
import { PrismaClient } from "@prisma/client";
import { generateToken, hashPassword, verifyPassword } from '../utils/auth';
import { cookies } from 'next/headers';


const prisma = new PrismaClient();

const signupSchema = z.object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(6, { message: "Username must be at least 5 characters long." }),
    address: z.string().min(1, { message: "Address is required" }),
    phoneNumber: z.string().min(10, { message: "Invalid phone number" }), 
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });

const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


type SignupFormData = z.infer<typeof signupSchema>;
type SigninFormData = z.infer<typeof signinSchema>;

export async function signup(formData: FormData) {
  try {
    const rawFormData: SignupFormData = {
      fullName: formData.get('fullName')?.toString() || "",
      email: formData.get('email')?.toString() || "",
      username: formData.get('username')?.toString() || "",
      address: formData.get('address')?.toString() || "",
      phoneNumber: formData.get('phoneNumber')?.toString() || "",
      password: formData.get('password')?.toString() || "",
    };

    const parsedData = signupSchema.parse(rawFormData);
    const hashedPassword = await hashPassword(parsedData.password);

     const newUser = await prisma.user.create({
      data: {
        fullName: parsedData.fullName,
        email: parsedData.email,
        username: parsedData.username,
        address: parsedData.address,
        phoneNumber: parsedData.phoneNumber,
        password: hashedPassword,
      },
    });

    const token = await generateToken(newUser);
    cookies().set('session', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date().setMinutes(new Date().getMinutes() + 3600),
      path: '/',
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.reduce(
        (acc: Record<string, string>, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        },
        {}
      );
      return { errors: validationErrors };
    } else {
      return { error: 'Signup error occurred' };
    }
  }
}



export async function signin(formData: FormData){
  console.log('mello', formData)

    try {
      const rawFormData: SigninFormData = {
          email: formData.get('email')?.toString() || '',
          password: formData.get('password')?.toString() || ''
      }

      const parsedData = signinSchema.parse(rawFormData)

      const user = await prisma.user.findUnique({
          
          where: {
              email: parsedData.email
          }
      })

      if(!user){
          
        return {error: 'Invalid credentials'}
      }

      const isMatch = await verifyPassword(parsedData.password, user.password)

      if(!isMatch){
        return {error: 'Invalid credentials'}
      }
      console.log('ismatch', isMatch)

      const token = await generateToken(user)
      cookies().set('session', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: new Date().setHours(new Date().getHours() + 2),
        path: '/'
      })

      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.reduce(
          (acc: Record<string, string>, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          },
          {}
        );
        return { errors: validationErrors };
      } else {
        return { error: 'Error'};
      }
    }

}

export async function getToken() {
  const token = cookies().get('session');
  return token || null;
}

export async function signout() {

}