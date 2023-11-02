import logger from "../utils/logger";
import { Request, Response } from "express";
import ErrorResponse from "../utils/errors/index";
import { hash, verifyHash } from "../utils/index";
import { generateJwtToken } from "../utils/jwt";
import { PrismaClient, Users } from "@prisma/client";
import { deleteValue } from "../utils/redis";

const prisma = new PrismaClient();


export const register = async (req : Request, res: Response) => {
  logger.debug("Creating new user...");
  const {name, email, password} = req.body;

  const hashed_password = await hash(password);

  const user = await prisma.users.create({
        data: {
        email,
        name,
        password : hashed_password
      },
    });

  Reflect.deleteProperty(user, "password");
  
  const token = await generateJwtToken(user);

  await deleteValue("users");

  return res.status(201).json({ message: "user created successfully", data: { token ,user } });
};

export const login = async (req : Request, res: Response) => {
  logger.debug("Login in progress");
  const { email, password } = req.body;

  const user: Users | null = await prisma.users.findUnique({
    where: {
       email,
    },
  })

  if (!user || !await verifyHash(password, user.password)) {
    throw new ErrorResponse("invalid credentials", 401);
  }
  Reflect.deleteProperty(user, "password");
  
  const token = await generateJwtToken(user);

  return res.status(200).json({ message: "success", data: { token, user } });
};