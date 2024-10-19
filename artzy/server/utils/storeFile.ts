'use server'
import { revalidatePath } from "next/cache";
import path from "path";
import { promises as fs } from 'fs';


export async function storeFile(file: File) {
    const uploadDir = path.join(process.cwd(), '/public/uploads');
    const buffer = Buffer.from(await file.arrayBuffer());
    
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    revalidatePath('/'); 

    return { filePath: `/uploads/${file.name}` };
}