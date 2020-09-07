const {
    handleLog,
    handleSevereErrorResponse
} = require("../utils/handleLog");
const url = require("url");
const config = require("config");
const axios = require("axios");
const cheerio = require("cheerio");
const {
    getRecipes
} = require("./categoryRecepiesController");

const website = config.get("ScrapingWebsites.primary");

module.exports.getALLRecipes = async (req, res) => {
    const recipeCategoryApi = `http://${req.hostname}:${config.get(
    "PORT"
  )}/api/recipe-category/`;

    const categories = await axios.get(recipeCategoryApi);
    const foods = [];

    handleLog(`Total categories: ${categories.data.length}`);
    let currentFething = 0;
    let starFetchItem = req.query['start'] || 1;
    let totalFetchcategory = req.query['total'] || 6;

    for (let category of categories.data) {
        currentFething += 1;
        if(currentFething <starFetchItem) continue;

        let categoryLink = category.link.split("/");
        category = categoryLink[categoryLink.length - 2];

        handleLog(`${currentFething}: Fetching food category '${category}'`);

        let foodItem = await getRecipes(category, req.query['page']);

        if (foodItem.length >= 1) foods.push(foodItem);

        if (currentFething == totalFetchcategory) break;
    }

    console.log(foods);
    
    res.send(foods);
};