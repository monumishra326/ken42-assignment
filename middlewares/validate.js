import Joi from '@hapi/joi'

export const create = Joi.object({
    name: Joi.string().min(3).required(),
    surname: Joi.string().min(3).required(),
    email: Joi.string().email(),
    gender: Joi.string(),
    role: Joi.string(),
    telephone: Joi.string(),
    classID: Joi.string(),
    positions: Joi.array(),
    position: Joi.string(),
    address: Joi.string(),
    courses: Joi.array(),
    classes: Joi.array(),
    nextofKinID: Joi.string(),
    profileUrl: Joi.string(),
    grade: Joi.string(),
})

export const login = Joi.object({
    userID: Joi.string().required(),
    password: Joi.string().required()
})


export const changePassword = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})


