var searchURL = "https://www.thecocktaildb.com/api/json/v1/1/";
var results = 0;
var ingList = 0;
var measList = 0;
var searchText = "";
var DrinkIngredients = [];
var DrinkMeasure = [];


function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 38.902861, lng: -77.02775270000001},
      zoom: 15
      // MAKE IT DISPLAY YOUR LOCATION
    });
};

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
        localStorage.setItem('searchterm', searched);
    })
  }; 
$('.CSearch').on('click', function(event) {
    event.preventDefault();
    searchText = $('#NSearched').val();
    NameSearch(searchText);
});

$('#NSearched').on('keyup', function(event) {
    if (event.which === 13) {
        event.preventDefault();
        searchText = $('#NSearched').val();
        NameSearch(searchText);
    }
})

var DisplayDrinks = function(searched) {
    var drinkresult = JSON.parse(localStorage.getItem("sDrinks"));
    console.log(drinkresult);
    $('.ListContainer').hide();
    $('.YTContent').hide();
    $('.video-contain').hide();
    $('.DrinkInst').hide();
    $('.moreinfo').hide();
    for (var i = 0; i < drinkresult.length; i++) {
        var drinkLists = $('<li>').text(drinkresult[i].strDrink);
        drinkLists.addClass('list').attr('id', drinkresult[i].idDrink);
        $('.drinkinfo').append(drinkLists);
    }
    var searchfordrink = localStorage.getItem('searchterm');
    console.log(searchfordrink);
    var authKey = "AIzaSyArQekFCAemjpJYgMnZrNT8blQaat7EvQ4";
                var queryURLBase = "https://www.googleapis.com/youtube/v3/search?key=" + authKey + "&channelId=UCaDY8WjYWy36bnt0RVzSklw&part=snippet,id" + "&q=" + searchfordrink +"&order=viewCount&maxResults=8";
                    $.ajax({
                    url: queryURLBase,
                    method: "GET"
                        }).then(function(data){
                    for (var i = 0; i < data.items.length; i++) {
                        var youTubeResults = data.items[i];
                        var video = $('<iframe>', {
                            src: 'https://www.youtube.com/embed/'+youTubeResults.id.videoId+'?autoplay=0',
                            type: 'video/mp4',
                            allowfullscreen: true,
                            controls: true
                        });
                        var YTVideo = $('<div>').addClass('list dFlex');
                        $(YTVideo).append(video).addClass('fill');
                        $(".YTContent").append(YTVideo);
                }
                $('.VideoShow').text(searchfordrink + " Videos");
                console.log(data.items);
                })
    $('.VideoShow').on('click', function() {
        $(".YTContent").show();
        $(".video-contain").show();
    });
    
    $('.VideoHide').on('click', function() {
        $(".YTContent").hide();
        $(".video-contain").hide();
    });

    $('.list').on('click', function(drinkSelected) {
        var drinkRecip = $('<li>').text(drinkSelected.target.id);
        $.ajax({
            url: searchURL + 'lookup.php?i=' + drinkSelected.target.id,
            method: "GET"
        }).then(function(response) {
            const totalIngredients = [];
            const totalMeasure = [];
                for (const key in response.drinks[0]) {
                    if (key.indexOf('Ingredient') > -1) {
                        const element = response.drinks[0][key];
                        if (element) {
                            totalIngredients.push(element)

                            const measureKey = key.replace('Ingredient', 'Measure')
                            const measurement = response.drinks[0][measureKey]
                            totalMeasure.push(measurement);
                        }
                    }
                }
                var ytDrink = response.drinks[0].strDrink;
                console.log(ytDrink);
                var dName = $('<div>').text(response.drinks[0].strDrink).attr('id', 'drinktitle');
                var ingList = $('<ul>').addClass('ulClass');
                var drinkImage = $('<img>').attr('src', response.drinks[0].strDrinkThumb).addClass('thedrink');
                var dDirection = $('<div>').text(response.drinks[0].strInstructions).addClass('list');
                var dGlass = $('<div>').text('Glass: ' + response.drinks[0].strGlass).addClass('list glass-row');
                var dAlc = $('<div>').text('Type: ' + response.drinks[0].strAlcoholic).addClass('list glass-row');
                var dCata = $('<div>').text('Catagory: ' + response.drinks[0].strCategory).addClass('list glass-row');
                var testereverything = $('<div>');
                testereverything.append(dAlc);
                testereverything.append(dCata);
                testereverything.append(dGlass);
                for (var i = 0; i < totalIngredients.length; i++) {
                    var ingDisplay = $('<li>' + 'ingredients').addClass('recipe-display');
                    const ingredientElem = $('<div>').addClass('DisplayD display-ingedients');
                    ingredientElem.text(totalIngredients[i]);
                    const measureElem = $('<div>').addClass('DisplayD display-measurement');
                    measureElem.text(totalMeasure[i]);

                    ingDisplay.append(ingredientElem);
                    ingDisplay.append(measureElem);
                    ingList.append(ingDisplay);
                }
                $('.drinkname').html(dName);
                $('.DrinkImg').html(drinkImage);
                $('.ListContainer').show();
                $('.ListContainer').html(ingList);
                $('.DrinkInst').show();
                $('.DrinkInst').html(dDirection);
                $('.moreinfo').show();
                $('.glassType').html(testereverything);
                
                
                

                console.log(response.drinks[0]);
                console.log(totalIngredients);
                console.log(totalMeasure);
      })
    });
};
var RandomDrink = function(searched) {
    console.log(searched);
    $('.randomContainer').hide();
    $('.DrinkInst').hide();
    $('.moreinfo').hide();
        $.ajax({
            url: searchURL + 'random.php',
            method: "GET"
        }).then(function(response) {
            const totalIngredients = [];
            const totalMeasure = [];
                for (const key in response.drinks[0]) {
                    if (key.indexOf('Ingredient') > -1) {
                        const element = response.drinks[0][key];
                        if (element) {
                            totalIngredients.push(element)

                            const measureKey = key.replace('Ingredient', 'Measure')
                            const measurement = response.drinks[0][measureKey]
                            totalMeasure.push(measurement);
                        }
                    }
                }

                var ytDrink = response.drinks[0].strDrink;
                var dName = $('<div>').text(response.drinks[0].strDrink);
                var ingList = $('<ul>').addClass('ulClass');
                var drinkImage = $('<img>').attr('src', response.drinks[0].strDrinkThumb).addClass('randomDrink');
                var dInstructions = $('<div>').text('Drink Instructions').addClass('list inst-margin');
                var dDirection = $('<div>').text(response.drinks[0].strInstructions).addClass('list');
                var dGlass = $('<div>').text('Glass: ' + response.drinks[0].strGlass).addClass('list glass-row');
                var dAlc = $('<div>').text('Type: ' + response.drinks[0].strAlcoholic).addClass('list glass-row');
                var dCata = $('<div>').text('Catagory: ' + response.drinks[0].strCategory).addClass('list glass-row');
                var testereverything = $('<div>');
                var rmDisp = $('<li>').addClass('recipe-display2');
                var rName = $('<div>').text('Recipe').addClass('DisplayD2 display-ingedients');
                var mName = $('<div>').text('Measurement').addClass('DisplayD2 display-ingedients');
                rmDisp.append(rName);
                rmDisp.append(mName);
                ingList.append(rmDisp);

                testereverything.append(dAlc);
                testereverything.append(dCata);
                testereverything.append(dGlass);
                for (var i = 0; i < totalIngredients.length; i++) {
                    var ingDisplay = $('<li>').addClass('recipe-display');
                    const ingredientElem = $('<div>').addClass('DisplayD display-ingedients random-prop');
                    ingredientElem.text(totalIngredients[i]);
                    const measureElem = $('<div>').addClass('DisplayD display-measurement random-prop');
                    measureElem.text(totalMeasure[i]);

                    ingDisplay.append(ingredientElem);
                    ingDisplay.append(measureElem);
                    ingList.append(ingDisplay);
                }
                $('#drinktitle').html(dName);
                $('.randomImg').html(drinkImage);
                $('.randomContainer').show();
                $('.directions').prepend(dInstructions);
                $('.randomContainer').html(ingList);
                $('.DrinkInst').show();
                $('.DrinkInst').html(dDirection);
                $('.DrinkInst').html(dDirection);
                $('.moreinfo').show();
                $('.glassType').html(testereverything);

                var authKey = "AIzaSyArQekFCAemjpJYgMnZrNT8blQaat7EvQ4";
                var queryURLBase = "https://www.googleapis.com/youtube/v3/search?key=" + authKey + "&channelId=UCaDY8WjYWy36bnt0RVzSklw&part=snippet,id&order=date&q=" + ytDrink + "&maxResults=1";
                    $.ajax({
                    url: queryURLBase,
                    method: "GET"
                        }).then(function(data){
                        var youTubeResults = data.items;
                        console.log(data.items.length);
                        // var youTubeResults = data.items;
                        var video = $('<iframe>', {
                            src: 'https://www.youtube.com/embed/'+youTubeResults.id.videoId+'?autoplay=0',
                            type: 'video/mp4',
                            controls: true
                    });
                    console.log(youTubeResults);
                    $(".YTContent").html(video);
                })
                
                console.log(response.drinks[0]);
                console.log(totalIngredients);
                console.log(totalMeasure);
      })
    };

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
$('#iSearched').on('keyup', function(event) {
    if (event.which === 13) {
        event.preventDefault();
        searchText = $('#iSearched').val();
        iSearch(searchText);
    }
})

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
$('#IngSearched').on('keyup', function(event) {
    if (event.which === 13) {
        event.preventDefault();
        searchText = $('#IngSearched').val();
        IngSearch(searchText);
    }
})

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

