import { Request, Response, NextFunction } from "express";
import { ValidationError, ObjectSchema } from "joi";
import validationError from "../utils/errors/validation-error";

type ValidatorContext = "body" | "query" | "params";

const parseError = (error: ValidationError) => {
	const inputFields: string = error.details
		.map(detail => detail.message)
		.join(", ")
		.replace(/"/g, "");

	const failed = error.details.map(err => err.path.join("."));

	return { inputFields, failed };
};


const validate =
    (schema: ObjectSchema, context: ValidatorContext = "body", stripUnknown = false) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const { value, error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown });

        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(", ");

            throw new validationError(`Invalid input: ${errorDetails}`, 412, {
                failed_fields: error.details.map(err => err.path.join("."))
            });
        }

        Object.assign(req, value);
        return next();
    };

export default validate;