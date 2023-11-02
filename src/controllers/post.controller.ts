import logger from "../utils/logger";
import { Request, Response } from "express";
import { PrismaClient, News, Users, Comments } from "@prisma/client";
import ErrorResponse from "../utils/errors";

const prisma = new PrismaClient();


export const createPost = async (req : Request, res: Response) => {
  logger.debug("Creating post...");

  const { title, content } = req.body;  

  const user: Users | null = await prisma.users.findUnique({
    where: {
       id: req.user.id,
    },
  })

  if (!user ) {
    throw new ErrorResponse("invalid user", 404);
  }

    const news :News | null = await prisma.news.create({
        data: {
        title: title,
        body: content,
        userId:user.id,
      },
    });
  
  return res.status(200).json({ message: "success", data: { news } });
};

export const createComment = async (req : Request, res: Response) => {
  logger.debug("Creating comment...");
  const newsId = req.params.newsId;

  const { content } = req.body;  

  const user: Users | null = await prisma.users.findUnique({
    where: {
       id: req.user.id,
    },
  })

  if (!user ) {
    throw new ErrorResponse("invalid user", 404);
  }

  const news: News | null = await prisma.news.findUniqueOrThrow({
    where: {
       id: Number(newsId),
    },
  })

    const comment :Comments | null = await prisma.comments.create({
        data: {
        body: content,
        userId:user.id,
        newsId:news.id
      },
    });
  
  return res.status(200).json({ message: "success", data: { comment } });
};

