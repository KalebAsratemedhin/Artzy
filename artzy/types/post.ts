import { Post, User } from "@prisma/client";

export interface PopulatedPost extends Post{
    id: string;
    title: string;
    price: number;
    description: string;
    picUrls: string[];
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    author: User;
}

