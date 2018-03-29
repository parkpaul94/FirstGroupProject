// API Methods
// Search cocktail by name
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// Search ingredient by name
// https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// Lookup full cocktail details by id
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13060
// Lookup a random cocktail
// https://www.thecocktaildb.com/api/json/v1/1/random.php
// Search by ingredient
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
// Filter by alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic
// Filter by Category
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
// Filter by Glass
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute
// List the categories, glasses, ingredients or alcoholic filters
// https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list

//  Images
// https://www.thecocktaildb.com/images/ingredients/ice-Small.png (100x100 pixels)
// https://www.thecocktaildb.com/images/ingredients/ice-Medium.png (350x350 pixels)
// https://www.thecocktaildb.com/images/ingredients/ice.png (700x700 pixels)

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php" + "?s=" + input;
var articles = 0;

