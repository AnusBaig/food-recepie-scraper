const {
    handleLog,
    handleSevereErrorResponse
} = require("../utils/handleLog");
const config = require("config");
const axios = require("axios");
const cheerio = require("cheerio");

const website = config.get("ScrapingWebsites.primary");

module.exports.getFoodCategories = async (req, res) => {
    const {
        data
    } = await axios.get(website);
    const $ = cheerio.load(data);
    const foodCategories = [];
    $("#menu-top-category-navigation li a").each((index, item) => {
        item = $(item);
        foodCategories.push({
            title: item.text(),
            link: item.attr("href"),
        });
    });
    res.send(foodCategories);
};

module.exports.getRecipeCategories = async (req, res) => {

    const foods = await this.getRecipes(req.params["category"], req.query['page']);

    res.send(foods);
};

module.exports.getRecipes = async (category, pageCount = 3) => {
    let foodLink = `${website}recipe-category/${category}/`;
    let foods = [],
        page = 0,
        $ = '';

    do {
        try {
            console.log(`Fetching at: ${foodLink}`);

            const {
                data
            } = await axios.get(foodLink);

            $ = cheerio.load(data);

            page += 1;
            $("#load_more_recipes_archives .grid-img-link").each(
                async (index, item) => {
                    item = $(item);

                    let $recipe = await axios.get(item.attr("href"));
                    $recipe = cheerio.load($recipe.data);

                    const gallery = [];
                    $recipe(".owl-item a").each((i, galleryItem) =>
                        gallery.push($recipe(galleryItem).attr("href"))
                    );

                    const method = {
                        english: [],
                        urdu: [],
                    };
                    $recipe(".english-detail-ff p").each((i, methodWords) =>
                        method.english.push($recipe(methodWords).text())
                    );
                    $recipe(".urdu-detail-ff p").each((i, methodWords) =>
                        method.urdu.push($recipe(methodWords).text())
                    );

                    const video = $recipe(".recipe-video iframe").attr("src");

                    let foodItem = {
                        title: item.attr("title"),
                        recipeLink: item.attr("href"),
                        thumbnail: item.children("img").attr("srcset"),
                        recipe: {
                            gallery,
                            method,
                            video,
                        },
                    };
                    foods.push(foodItem);
                }
            );
        } catch (e) {
            console.log('Error in fetching');
            break;
        }

        foodLink = $('.next-page').attr('href');
    } while (foodLink && page <= pageCount);

    return foods;
};