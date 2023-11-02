import Joi from "joi";

const optionalString = Joi.string().trim();
const requiredString = optionalString.required();
const requiredEmail = requiredString.email();


const REGISTER = Joi.object().keys({
    name: requiredString,
    email: requiredEmail,
    password: requiredString
});

const LOGIN = Joi.object().keys({
    email: requiredEmail,
    password: requiredString
});

const CREATEPOST = Joi.object().keys({
    title: requiredString,
    content: requiredString
});

const CREATECOMMENT = Joi.object().keys({
    content: requiredString
});


export default {
    REGISTER,
    LOGIN,
    CREATEPOST,
    CREATECOMMENT
};
