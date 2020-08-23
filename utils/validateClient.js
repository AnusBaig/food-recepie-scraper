const Joi = require('@hapi/joi');

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(7).max(250).required(),
        name: Joi.string().min(3),
        isAdmin: Joi.boolean().label('Are you admin?'),
        isLike: Joi.boolean().label('Did you liked?')
    });

    return schema.validate(user);
}

module.exports = {
    validateUser
};