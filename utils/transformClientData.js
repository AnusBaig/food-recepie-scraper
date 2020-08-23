const {
    handleErrorResponse,
    handleSuccessResponse
} = require("./handleLog");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function makeHashed(req) {
    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashed;
}

function generateAuthToken({
    id,
    name,
    email
}) {
    return jwt.sign({
        name,
        email,
        id
    }, process.env.mishka_jwtPrivateKey);
};

module.exports = {
    makeHashed,
    generateAuthToken
}