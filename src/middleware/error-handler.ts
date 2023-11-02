/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import logger from "../utils/logger";
import { NextFunction, Request, Response } from "express";

function errorHandler(err:any, req: Request, res: Response, next: NextFunction) {
    logger.error(err);
    const error = {
        code: err.code || 500,
        message: err.message || "Something went wrong try again later!",
        metadata: err.metadata,
    };

    if (err.code === 'P2002') {
        error.message = `Unique constraint violation on field ${err.meta.target}. Choose another field`;
        error.code = 400;
    }
    if (err.code === 'P2025') {
        logger.error(err);
        error.message = `${err.message} with that id`;
        error.code = 404;
    }
    if (err.name == "CastError") {
        if (err.path.match(/id/i)) {
            error.message = `No item found with id : ${err.value}`;
        } else {
            error.message = err.message.replace(/"/g, "");
        }
        error.code = 404;
    }

    if (err.message === "invalid signature") {
        error.metadata = `JWT - ${err.message}`;
        error.message = "Access Denied! Invalid Token";
        error.code = 412;
    }

    res.status(error.code).json(error);
}

export default errorHandler;