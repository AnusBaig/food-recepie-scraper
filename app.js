const express = require("express");
const app = express();
const config = require('config');
const cors = require('cors');
const error = require('./middlewear/error');
require('express-async-errors');
const {
    handleLog,
    handleSevereErrorResponse,
} = require('./utils/handleLog');
const recepieCategory = require('./routes/recipeCategoryRoute');
const recipe = require('./routes/recipeRoute');

process
    .on('uncaughtException', e => handleSevereErrorResponse(e.stack, e))
    .on('unhandledRejection', e => handleSevereErrorResponse(e.stack, e));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/recipe-category', recepieCategory);
app.use('/api/recipe', recipe);
app.use(error);

const PORT = process.env.PORT || config.get('PORT') || 3000;
app.listen(PORT, () => handleLog(`Listening on port ${PORT}...`));