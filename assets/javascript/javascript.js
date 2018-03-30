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
var DrinkIngredients = [];
var DrinkMeasure = [];

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
$('.CSearch').on('click', function(event) {
    event.preventDefault();
    searchText = $('#NSearched').val();
    NameSearch(searchText);
});

// var DisplayDrinks = function(searched) {
//     var drinkresult = JSON.parse(localStorage.getItem("sDrinks"));
//     console.log(drinkresult);
//     for (var i = 0; i < drinkresult.length; i++) {
//         results++
//         var drinkLists = $('<li>').text(drinkresult[i].strDrink);
//         drinkLists.addClass('list').attr('id', drinkresult[i].idDrink);
//         $('.drinkinfo').append(drinkLists);
//         // console.log(DrinkIngredients[i]);
//     };
// };

var DisplayDrinks = function(searched) {
    var drinkresult = JSON.parse(localStorage.getItem("sDrinks"));
    console.log(drinkresult);

    for (var i = 0; i < drinkresult.length; i++) {
        results++
        var drinkLists = $('<li>').text(drinkresult[i].strDrink);
        drinkLists.addClass('list').attr('id', drinkresult[i].idDrink);
        // DrinkIngredients = [drinkresult[i].strIngredient1, drinkresult[i].strIngredient2, drinkresult[i].strIngredient3, drinkresult[i].strIngredient4, drinkresult[i].strIngredient5, drinkresult[i].strIngredient6, drinkresult[i].strIngredient7, drinkresult[i].strIngredient8, drinkresult[i].strIngredient9, drinkresult[i].strIngredient10, drinkresult[i].strIngredient11, drinkresult[i].strIngredient12, drinkresult[i].strIngredient13, drinkresult[i].strIngredient14, drinkresult[i].strIngredient15];
        // DrinkMeasure  = [drinkresult[i].strMeasure1, drinkresult[i].strMeasure2, drinkresult[i].strMeasure3, drinkresult[i].strMeasure4, drinkresult[i].strMeasure5, drinkresult[i].strMeasure6, drinkresult[i].strMeasure7, drinkresult[i].strMeasure8, drinkresult[i].strMeasure9, drinkresult[i].strMeasure10, drinkresult[i].strMeasure11, drinkresult[i].strMeasure12, drinkresult[i].strMeasure13, drinkresult[i].strMeasure14, drinkresult[i].strMeasure15];
        // console.log('Ing: ', DrinkIngredients);
        // console.log('Mea: ', DrinkMeasure);
        // drinkLists.addClass('list').attr('id', drinkresult[i].strIngredient);
        // console.log(drinkresult[i].idDrink);
        // console.log(drinkresult[i].strIngredient);
        $('.drinkinfo').append(drinkLists);
        // console.log(DrinkIngredients[i]);
    }
    $('.list').on('click', function(drinkSelected) {
        // console.log(drinkSelected.target.id);
        var drinkRecip = $('<li>').text(drinkSelected.target.id);
        $.ajax({
            url: searchURL + 'lookup.php?i=' + drinkSelected.target.id,
            method: "GET"
        }).then(function(response) {
            console.log(searchURL + 'lookup.php?i=' + drinkSelected.target.id);
            console.log(response.drinks[0].strInstructions);
            var DisplaySelected = $('<li>').html(response.drinks[0].strInstructions);
            DisplaySelected.addClass('list');
            $('.rDRight').html(DisplaySelected);
        // var drinkRecip = $('<li>').text(drinkSelected.target.id);
        // $('.rDRight').html(drinkresult[i].strInstructions);
        drinkRecip.addClass('list');
      })
    });
};
var drinkSelected = function(searched) {
    $.ajax({
        url: searchURL + 'lookup.php?i=' + searched,
        method: "GET"
      }).then(function(response) {
        for (var i = 0; i < response.length; i++) {
            results++
            var drinkLists = $('<li>').text(drinkresult[i].strDrink);
            drinkLists.addClass('list').attr('a', drinkresult[i].idDrink);
            $('.rDRight').append(drinkLists);
        }
        console.log(response.drinks);
        console.log(searched);
})
}


                                        // var DisplayDrinks = function(searched) {
                                        //     var drinkresult = JSON.parse(localStorage.getItem("sDrinks"));
                                        //     console.log(drinkresult);

                                        //     for (var i = 0; i < drinkresult.length; i++) {
                                        //         results++
                                        //         var drinkLists = $('<li>').text(drinkresult[i].strDrink);
                                        //         drinkLists.addClass('list').attr('id', drinkresult[i].idDrink);
                                        //         DrinkIngredients = [drinkresult[i].strIngredient1, drinkresult[i].strIngredient2, drinkresult[i].strIngredient3, drinkresult[i].strIngredient4, drinkresult[i].strIngredient5, drinkresult[i].strIngredient6, drinkresult[i].strIngredient7, drinkresult[i].strIngredient8, drinkresult[i].strIngredient9, drinkresult[i].strIngredient10, drinkresult[i].strIngredient11, drinkresult[i].strIngredient12, drinkresult[i].strIngredient13, drinkresult[i].strIngredient14, drinkresult[i].strIngredient15];
                                        //         DrinkMeasure  = [drinkresult[i].strMeasure1, drinkresult[i].strMeasure2, drinkresult[i].strMeasure3, drinkresult[i].strMeasure4, drinkresult[i].strMeasure5, drinkresult[i].strMeasure6, drinkresult[i].strMeasure7, drinkresult[i].strMeasure8, drinkresult[i].strMeasure9, drinkresult[i].strMeasure10, drinkresult[i].strMeasure11, drinkresult[i].strMeasure12, drinkresult[i].strMeasure13, drinkresult[i].strMeasure14, drinkresult[i].strMeasure15];
                                        //         // console.log('Ing: ', DrinkIngredients);
                                        //         // console.log('Mea: ', DrinkMeasure);
                                        //         // drinkLists.addClass('list').attr('id', drinkresult[i].strIngredient);
                                        //         // console.log(drinkresult[i].idDrink);
                                        //         // console.log(drinkresult[i].strIngredient);
                                        //         $('.drinkinfo').append(drinkLists);
                                        //         console.log(DrinkIngredients[i]);
                                        //     }
                                        //     $('.list').on('click', function(drinkSelected) {
                                        //         // console.log(drinkSelected.target.id);
                                        //         var drinkRecip = $('<li>').text(DrinkIngredients);
                                        //         $('.rDRight').html(drinkRecip);
                                        //         drinkRecip.addClass('list');
                                        //       })
                                        // }
                                        // var drinkSelected = function(searched) {
                                        //     $.ajax({
                                        //         url: searchURL + 'lookup.php?i=' + searched,
                                        //         method: "GET"
                                        //       }).then(function(response) {
                                        //         for (var i = 0; i < response.length; i++) {
                                        //             results++
                                        //             var drinkLists = $('<li>').text(drinkresult[i].strDrink);
                                        //             drinkLists.addClass('list').attr('a', drinkresult[i].idDrink);
                                        //             $('.rDRight').append(drinkLists);
                                        //         }
                                        //         console.log(response.drinks);
                                        //         console.log(searched);
                                        // })
                                        // }

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
        if (iresult === null) {
            $('<div>').text('No Results Found');
        }
      }
}
var IngSearch = function(searched) {
    $.ajax({
        url: searchURL + 'filter.php?i=' + searched,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(searched);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    })
  }; 
$('.ISearch').on('click', function(event) {
    event.preventDefault();
    searchText = $('#IngSearched').val();
    IngSearch(searchText);
});
// FOR THE ALCOHOLIC/NON-ALCOHOLIC BUTTON, IT DOESN'T GIVE YOU INGREDIENTS, YOU NEED TO UPON FINDING A DRINK YOU WANT, NEED TO BE ABLE TO SEARCH THE DRINK BY ID.
// REFER BACK TO LINE 77 TO LINE 116
$('.YAlcohol').on('click', function(AlcoholicDrink) {
    event.preventDefault();
    $.ajax({
        url: searchURL + 'filter.php?a=Alcoholic',
        method: "GET"
      }).then(function(response) {
        console.log(response);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    });
});
$('.NAlcohol').on('click', function(AlcoholicDrink) {
    event.preventDefault();
    $.ajax({
        url: searchURL + 'filter.php?a=Non_Alcoholic',
        method: "GET"
      }).then(function(response) {
        console.log(response[0]);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    })
})
$('.glass').on('click', function(AlcoholicDrink) {
    event.preventDefault();
    $.ajax({
        url: searchURL + 'filter.php?g=Cocktail_glass',
        method: "GET"
      }).then(function(response) {
        console.log(response);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    });
});
$('.flute').on('click', function(AlcoholicDrink) {
    event.preventDefault();
    $.ajax({
        url: searchURL + 'filter.php?g=Champagne_flute',
        method: "GET"
      }).then(function(response) {
        console.log(response[0]);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    })
})
$('.ordinary').on('click', function(AlcoholicDrink) {
    event.preventDefault();
    $.ajax({
        url: searchURL + 'filter.php?c=Ordinary_Drink',
        method: "GET"
      }).then(function(response) {
        console.log(response);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    });
});
$('.cocktail').on('click', function(AlcoholicDrink) {
    event.preventDefault();
    $.ajax({
        url: searchURL + 'filter.php?c=Cocktail',
        method: "GET"
      }).then(function(response) {
        console.log(response[0]);
        window.location = "results.html"
        localStorage.setItem("sDrinks", JSON.stringify(response.drinks));
    })
})

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

