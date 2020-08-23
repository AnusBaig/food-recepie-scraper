const {
    handleLog,
    handleSevereErrorResponse
} = require("../utils/handleLog");
const url = require('url');
const config = require("config");
const axios = require("axios");
const cheerio = require("cheerio");
const {
    getRecipes
} = require('./categoryRecepiesController');

const website = config.get("ScrapingWebsites.primary");

module.exports.getALLRecipes = async (req, res) => {
    const recipeCategoryApi = `http://${req.hostname}:${config.get('PORT')}/api/recipe-category/`;

    const category = await axios.get(recipeCategoryApi);
    const foods = [];

    for (let category of category.data) {
        let categoryLink = category.link.split('/');
        const category = categoryLink[categoryLink.length - 2];

        let foodItem = await getRecipes(category);

        console.log(JSON.stringify(foodItem.data));
        foods.push(foodItem.data);
    }
    res.send(foods);
}