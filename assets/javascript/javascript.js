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

// var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php" + "?s=" + input;
// var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php" + "?i=" + input;

// =============================================================================
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13060
// This will pull the cocktail information. Use this to pull information and display on a new HTML like movie one


var searchURL = "https://www.thecocktaildb.com/api/json/v1/1/";
var results = 0;
var searchText = "";
  // ================ AJAX VERSION =====================
  var NameSearch = function(searched) {
      console.log(searched);
    $.ajax({
        url: searchURL + 'search.php?s=' + searched,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(searched);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    })
  }; 
$('.CName').on('click', function(event) {
    event.preventDefault();
    searchText = $('#NSearched').val();
    NameSearch(searchText);
});

var DisplayDrinks = function(searched) {
    var drinkresult = JSON.parse(localStorage.getItem("sDrinks"));
    console.log(drinkresult);
    for (var i = 0; i < drinkresult.length; i++) {
        results++
        var drinkLists = $('<li>').text(drinkresult[i].strDrink);
        drinkLists.addClass('list');
        $('.drinkinfo').append(drinkLists);
      }
}

var iSearch = function(searched) {
    console.log(searchURL);
    console.log(searched);
  $.ajax({
      url: searchURL + 'search.php?i=' + searched,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(searched);
      window.location = "ingredients.html"
      localStorage.setItem("iDrinks", JSON.stringify(response.ingredients));
      console.log(response.ingredients);
  })
}; 
$('.IName').on('click', function(event) {
    event.preventDefault();
    searchText = $('#iSearched').val();
    iSearch(searchText);
});

var DisplayIng = function(searched) {
    var iresult = JSON.parse(localStorage.getItem("iDrinks"));
    console.log(iresult);
    for (var i = 0; i < iresult.length; i++) {
        results++
        var iLists = $('<div>').text(iresult[i].strIngredient);
        iLists.addClass('name text-center');
        $('#drinktitle').append(iLists);
        var iDes = $('<div>').html(iresult[i].strDescription);
        iDes.addClass('descript');
        $('.ingDescription').append(iDes);
        console.log(iresult[i].strIngredient);
      }
}

// var iSearch = function(searched) {
//     $.ajax({
//         url: searchURL + 'search.php?i=' + searched,
//         method: "GET"
//       }).then(function(response) {
//       console.log(response);
//       let output = '';
//       console.log(searched);
//   })
// };   
var IngSearch = function(searched) {
    $.ajax({
        url: searchURL + 'filter.php?i=' + searched,
        method: "GET"
      }).then(function(response) {
      console.log(response);
      let output = '';
      console.log(searched);
  })
};   
var AlcoholSearch = function(searched) {
    $.ajax({
        url: searchURL + 'filter.php?a=' + searched,
        method: "GET"
      }).then(function(response) {
      console.log(response);
      let output = '';
      console.log(searched);
  })
};   
var GlassSearch = function(searched) {
    $.ajax({
        url: searchURL + 'filter.php?g=' + searched,
        method: "GET"
      }).then(function(response) {
      console.log(response);
      let output = '';
      console.log(searched);
  })
};   
var CatSearch = function(searched) {
    $.ajax({
        url: searchURL + 'filter.php?c=' + searched,
        method: "GET"
      }).then(function(response) {
      console.log(response);
      let output = '';
      console.log(searched);
  })
};   

// ======================== AXIOS VERSION ============================

// var NameSearch = function(searched) {
//     axios.get(searchURL + "search.php?s=" + searched)
//     .then(function(response) {
//     console.log(response);
//   //   let drinks = response.data.drinks[""];
//     let output = '';
//   //   console.log(response.data.drinks[0]);
//     console.log(searched);
//   })
//   // sessionStorage.setItem('')
// };     
// var iSearch = function(searched) {
//     axios.get(searchURL + "search.php?i=" + searched)
//     .then(function(response) {
//     console.log(response);
//   //   let drinks = response.data.drinks[""];
//     let output = '';
//   //   console.log(response.data.drinks[0]);
//     console.log(searched);
//   })
//   // sessionStorage.setItem('')
// };   
// var IngSearch = function(searched) {
//     axios.get(searchURL + "filter.php?i=" + searched)
//     .then(function(response) {
//     console.log(response);
//   //   let drinks = response.data.drinks[""];
//     let output = '';
//   //   console.log(response.data.drinks[0]);
//     console.log(searched);
//   })
//   // sessionStorage.setItem('')
// };   
// var AlcoholSearch = function(searched) {
//     axios.get(searchURL + "filter.php?a=" + searched)
//     .then(function(response) {
//     console.log(response);
//   //   let drinks = response.data.drinks[""];
//     let output = '';
//   //   console.log(response.data.drinks[0]);
//     console.log(searched);
//   })
//   // sessionStorage.setItem('')
// };   
// var GlassSearch = function(searched) {
//     axios.get(searchURL + "filter.php?g=" + searched)
//     .then(function(response) {
//     console.log(response);
//   //   let drinks = response.data.drinks[""];
//     let output = '';
//   //   console.log(response.data.drinks[0]);
//     console.log(searched);
//   })
//   // sessionStorage.setItem('')
// };   
// var CatSearch = function(searched) {
//     axios.get(searchURL + "filter.php?c=" + searched)
//     .then(function(response) {
//     console.log(response);
//   //   let drinks = response.data.drinks[""];
//     let output = '';
//   //   console.log(response.data.drinks[0]);
//     console.log(searched);
//   })
//   // sessionStorage.setItem('')
// };   

