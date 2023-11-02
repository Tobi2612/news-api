import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";
import { PrismaClient, Users } from "@prisma/client";
import { setValue, getValue } from "../utils/redis";

const prisma = new PrismaClient();


export const getUsers = async (req : Request, res: Response) => {
  logger.debug("Fetching all user...");

  let result:any = await getValue("users");
  let users = JSON.parse(result)
  if( !users ){
    let users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
    },
  });

  await setValue("users", JSON.stringify(users), 360);
  return res.status(200).json({ message: "success", data: { users } });
}
  
  return res.status(200).json({ message: "success", data: { users } });
};

export const getPostByUserId = async (req : Request, res: Response) => {
  logger.debug("Fetching post by user id...");

  const id = req.params.id;

  const user: Users | null = await prisma.users.findUniqueOrThrow({
    where: {
       id: Number(id),
    },
  })

    const news = await prisma.news.findMany({
      where: { userId:user.id },
      include: {comments: true},
    });
  
  return res.status(200).json({ message: "success", data: { news } });
};

export const topUsers = async (req : Request, res: Response) => {
  logger.debug("Fetching top users...");


const users = await prisma.users.findMany({
  include: {
    _count: {
      select: { news: true },
    },
    comments: {orderBy: {
      createdAt: 'desc',
    },take:1},
  },
  orderBy: {
    news: {
      _count: 'desc'
    },
  },  
  take: 3
});

  return res.status(200).json({ message: "success", data: { users } });
};