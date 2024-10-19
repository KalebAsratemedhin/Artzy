'use server';
import { z } from 'zod';
import { storeFile } from '../utils/storeFile';
import prisma from "@/server/utils/prisma";
import { decodeToken } from './auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

const fileSchema = z.array(z.object({
  name: z.string(),
  type: z.string().refine((type) => allowedTypes.includes(type), {
    message: 'File must be an image (JPEG, PNG, GIF)',
  }),
  size: z.number().refine((size) => size <= MAX_FILE_SIZE, {
    message: 'File must be less than 5MB',
  }),
}));

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  price: z.string().min(1, 'Price is required').regex(/^\d+$/, 'Price must be a number'),
  description: z.string().min(1, 'Description is required').max(150),
  files: fileSchema.optional(),
});


export async function createPost(formData: FormData) {
  try {
    console.log(formData,'formData')
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;

    const files = formData.getAll('files') as File[] | null;

    const fileData = files ? files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    })) : [];

    const result = postSchema.safeParse({ title, price, description, files: fileData });
    if (!result.success) {
      const validationErrors = result.error.errors.reduce(
        (acc: Record<string, string>, curr) => {
          console.log('curr', curr)
          acc[curr.path[0]] = curr.message;
          return acc;
        },
        {}
      );
      const errors = result.error.format();
      return { success: false, errors: validationErrors };
    }

    let picUrls: string[] = [];

    if (files) {
      console.log('files', files)
      for (const file of files) {
        const filePath = await storeFile(file);
        picUrls.push(filePath.filePath);
      }
    }

    const decoded = await decodeToken();
    if (!decoded) {
      return { error: "Forbidden." };
    }


    const newPost = await prisma.post.create({
      data: {
        title: result.data.title,
        price: parseInt(result.data.price),
        description: result.data.description,
        picUrls,
        authorId: decoded.id
      }
    });

    return { success: true, post: newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, message: 'An error occurred while creating the post.' };
  }
}


export async function getPosts(){
  
  try {

    const decoded = await decodeToken();

  if (!decoded) {
    return { error: true, message: "Forbidden." };
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: decoded.id
    },
    include: {
      author: true
    }
  })

  return {success: true, posts}
    
  } catch (error) {
    return {error: true, message: "Server error"}
    
  }





}
