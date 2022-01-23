$(document).ready(function () {
  // The base url for all API calls
  const apiKey = "ee38940464e0659bf989e10fd5fedb86";
  var apiBaseURL = "https://api.themoviedb.org/3/";

  // URL in Authentication. Base URL of image
  var imageBaseUrl = "https://image.tmdb.org/t/p/";

  const topRatedURL = apiBaseURL + "movie/top_rated?api_key=" + apiKey;

  //==============================================================================
  //====================== Get "now playing" data on default. ====================
  //=================== Change results when a genre is clicked on.================
  //==============================================================================
  function gettopRatedData() {
    $.getJSON(topRatedURL, function (topRatedData) {
      // console.log(topRatedData);
      //we needed to add .results because topRatedData is an array.
      for (let i = 0; i < topRatedData.results.length; i++) {
        // w300 is how wide it is
        var mid = topRatedData.results[i].id;
        // mid = movie ID
        var thisMovieUrl =
          apiBaseURL + "movie/" + mid + "/videos?api_key=" + apiKey;
        // console.log(i)

        // console.log(i);
        $.getJSON(thisMovieUrl, function (movieKey) {
          // console.log(thisMovieUrl)
          // console.log(movieKey)

          //Need to go to that specific movie's URL to get the genres associated with it. (movieKey.id)
          // var getGenreNameUrl = apiBaseURL + 'movie/' +movieKey.id+ '?api_key=' + apiKey;
          // console.log(getGenreNameUrl);
          // console.log(movieKey.id);

          var poster =
            imageBaseUrl + "w300" + topRatedData.results[i].poster_path;
          // console.log(poster);

          var title = topRatedData.results[i].original_title;

          var releaseDate = topRatedData.results[i].release_date;

          var overview = topRatedData.results[i].overview;
          // $('.overview').addClass('overview');

          var voteAverage = topRatedData.results[i].vote_average;
          // console.log(movieKey)
          var youtubeKey = movieKey.results[0].key;

          var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;
          // console.log(youtubeLink)

          var topRatedHTML = "";
          // added in i to topRatedHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
          topRatedHTML += '<div class="col-sm-6 col-lg-3 col-md-3 eachMovie">';
          topRatedHTML +=
            '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' +
            i +
            '" data-whatever="@' +
            i +
            '">' +
            '<img src="' +
            poster +
            '"></button>';
          topRatedHTML +=
            '<div class="modal fade" id="exampleModal' +
            i +
            '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          topRatedHTML += '<div class="modal-dialog" role="document">';
          topRatedHTML += '<div class="modal-content col-sm-12">';
          topRatedHTML += '<div class="col-sm-6 moviePosterInModal">';
          topRatedHTML +=
            '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          topRatedHTML += "</div><br>"; //close trailerLink
          topRatedHTML += '<div class="col-sm-6 movieDetails">';
          topRatedHTML += '<div class="movieName">' + title + "</div><br>";
          topRatedHTML +=
            '<div class="linkToTrailer" ><a href="' +
            youtubeLink +
            '"><button type="button" class="btn btn-red btn-lg">Watch Trailer</button></a>' +
            "</div><br>";
          topRatedHTML +=
            '<div class="release">Release Date: ' + releaseDate + "</div><br>";
          // topRatedHTML += '<div class="genre">Genre: '+genre+'</div><br>';
          topRatedHTML += '<div class="overview">' + overview + "</div><br>"; // Put overview in a separate div to make it easier to style
          topRatedHTML +=
            '<div class="rating">Rating: ' + voteAverage + "/10</div><br>";
          topRatedHTML += `<div class="col-sm-5 btn btn-primary add-to-favorites" data-overview="${overview}" data-poster="${poster}" data-trailer="${youtubeLink}" data-title="${title}">Add to Favorite</div>`;

          topRatedHTML += "</div>"; //close movieDetails
          topRatedHTML += "</div>"; //close modal-content
          topRatedHTML += "</div>"; //close modal-dialog
          topRatedHTML += "</div>"; //close modal
          topRatedHTML += "</div>"; //close off each div

          $("#movie-grid").append(topRatedHTML);
          //Without this line, there is nowhere for the posters and overviews to display so it doesn't show up
          $("#movieGenreLabel").html("Toprated");
          //h1 will change depending on what is clicked. Will display "Now Playing" in this case.
        });
      }
    });
  }

  //==============================================================================
  //====================== Get movies by genre ===================================
  //==============================================================================

  function getMoviesByGenre(genre_id) {
    const getMoviesByGenreURL =
      apiBaseURL +
      "genre/" +
      genre_id +
      "/movies?api_key=" +
      apiKey +
      "&language=en-US&include_adult=false&sort_by=created_at.asc";
    // console.log(getMoviesByGenreURL);

    $.getJSON(getMoviesByGenreURL, function (genreData) {
      // console.log(genreData)
      for (let i = 0; i < genreData.results.length; i++) {
        var mid = genreData.results[i].id;
        var thisMovieUrl =
          apiBaseURL + "movie/" + mid + "/videos?api_key=" + apiKey;

        $.getJSON(thisMovieUrl, function (movieKey) {
          var poster = imageBaseUrl + "w300" + genreData.results[i].poster_path;
          var title = genreData.results[i].original_title;
          var releaseDate = genreData.results[i].release_date;
          var overview = genreData.results[i].overview;
          var voteAverage = genreData.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;
          var genreHTML = "";
          genreHTML += '<div class="col-sm-6 col-md-3 col-lg-3 eachMovie">';
          genreHTML +=
            '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' +
            i +
            '" data-whatever="@' +
            i +
            '">' +
            '<img src="' +
            poster +
            '"></button>';
          genreHTML +=
            '<div class="modal fade" id="exampleModal' +
            i +
            '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          genreHTML += '<div class="modal-dialog" role="document">';
          genreHTML += '<div class="modal-content col-sm-12 col-lg-12">';
          genreHTML += '<div class="col-sm-6 moviePosterInModal">';
          genreHTML +=
            '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          genreHTML += "</div><br>"; //close trailerLink
          genreHTML += '<div class="col-sm-6 movieDetails">';
          genreHTML += '<div class="movieName">' + title + "</div><br>";
          genreHTML +=
            '<div class="linkToTrailer" ><a href="' +
            youtubeLink +
            '"><button type="button" class="btn btn-red btn-lg">Watch Trailer</button></a>' +
            "</div><br>";
          genreHTML +=
            '<div class="release">Release Date: ' + releaseDate + "</div><br>";
          genreHTML += '<div class="overview">' + overview + "</div><br>";
          genreHTML +=
            '<div class="rating">Rating: ' + voteAverage + "/10</div><br>";
          genreHTML += `<div class="col-sm-5 btn btn-primary add-to-favorites" data-overview="${overview}" data-poster="${poster}" data-trailer="${youtubeLink}" data-title="${title}">Add to Favorite</div>`;

          genreHTML += "</div>"; //close movieDetails
          genreHTML += "</div>"; //close modal-content
          genreHTML += "</div>"; //close modal-dialog
          genreHTML += "</div>"; //close modal
          genreHTML += "</div>"; //close off each div
          $("#movie-grid").append(genreHTML);
          //Without this line, there is nowhere for the posters and overviews to display so it doesn't show up
          // $('#movieGenreLabel').html("Now Playing");
          //h1 will change depending on what is clicked. Will display "Now Playing" in this case.
        });
      }
    });
  }
  // call getMoviesByGenre using click function but call gettopRatedData on default.
  gettopRatedData();

  //Reset HTML strings to empty to overwrite with new one!
  var topRatedHTML = "";
  var genreHTML = "";

  $(".navbar-brand").click(function () {
    gettopRatedData();
    $("#movie-grid").html(topRatedHTML);
    $("#movieGenreLabel").html("Now Playing");
  });
  $(".topRated").click(function () {
    gettopRatedData();
    $("#movie-grid").html(topRatedHTML);
    $("#movieGenreLabel").html("Now Playing");
  });
  $("#action").click(function () {
    getMoviesByGenre(28);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Action");
  });
  $("#adventure").click(function () {
    getMoviesByGenre(12);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Adventure");
  });
  $("#animation").click(function () {
    getMoviesByGenre(16);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Animation");
  });
  $("#comedy").click(function () {
    getMoviesByGenre(35);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Comedy");
  });
  $("#crime").click(function () {
    getMoviesByGenre(80);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Crime");
  });
  $("#drama").click(function () {
    getMoviesByGenre(18);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Drama");
  });
  $("#family").click(function () {
    getMoviesByGenre(10751);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Family");
  });
  $("#fantasy").click(function () {
    getMoviesByGenre(14);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Fantasy");
  });
  $("#history").click(function () {
    getMoviesByGenre(36);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("History");
  });
  $("#horror").click(function () {
    getMoviesByGenre(27);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Horror");
  });
  $("#music").click(function () {
    getMoviesByGenre(10402);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Music");
  });
  $("#romance").click(function () {
    getMoviesByGenre(10749);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Romance");
  });
  $("#scifi").click(function () {
    getMoviesByGenre(878);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Science Fiction");
  });
  $("#thriller").click(function () {
    getMoviesByGenre(53);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Thriller");
  });

  //==============================================================================
  //====================== Search Function =======================================
  //==============================================================================

  //Run function searchMovies AFTER an input has been submitted. Submit form first.
  //Run searchMovies once to add an empty html to movie-grid using .html(). Then, overwrite it with the new html using .append(). Need to use .append() to overwrite or all the images will display on top of each other.

  var searchTerm = "";
  searchMovies();
  //reference entire search form
  $(".searchForm").submit(function (event) {
    $("#movie-grid").html("");
    event.preventDefault();
    //search term is only concerned with what the user inputted
    //Get input with .val();
    searchTerm = $(".form-control").val();
    searchMovies();
  });

  function searchMovies() {
    //need to include query in url. (ex: &query=boss+baby)
    const searchMovieURL =
      apiBaseURL +
      "search/movie?api_key=" +
      apiKey +
      "&language=en-US&page=1&include_adult=false&query=" +
      searchTerm;
    // console.log(searchMovieURL);
    $.getJSON(searchMovieURL, function (movieSearchResults) {
      // console.log(movieSearchResults);
      for (let i = 0; i < movieSearchResults.results.length; i++) {
        var mid = movieSearchResults.results[i].id;
        var thisMovieUrl =
          apiBaseURL + "movie/" + mid + "/videos?api_key=" + apiKey;

        $.getJSON(thisMovieUrl, function (movieKey) {
          // console.log(movieKey)
          var poster =
            imageBaseUrl + "w300" + movieSearchResults.results[i].poster_path;
          var title = movieSearchResults.results[i].original_title;
          var releaseDate = movieSearchResults.results[i].release_date;
          var overview = movieSearchResults.results[i].overview;
          var voteAverage = movieSearchResults.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;
          var searchResultsHTML = "";
          searchResultsHTML +=
            '<div class="col-sm-6 col-md-3 col-lg-3 eachMovie">';
          searchResultsHTML +=
            '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' +
            i +
            '" data-whatever="@' +
            i +
            '">' +
            '<img src="' +
            poster +
            '"></button>';
          searchResultsHTML +=
            '<div class="modal fade" id="exampleModal' +
            i +
            '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          searchResultsHTML += '<div class="modal-dialog" role="document">';
          searchResultsHTML +=
            '<div class="modal-content col-sm-12 col-lg-12">';
          searchResultsHTML += '<div class="col-sm-6 moviePosterInModal">';
          searchResultsHTML +=
            '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          searchResultsHTML += "</div><br>"; //close trailerLink
          searchResultsHTML += '<div class="col-sm-6 movieDetails">';
          searchResultsHTML += '<div class="movieName">' + title + "</div><br>";
          searchResultsHTML +=
            '<div class="linkToTrailer" ><a href="' +
            youtubeLink +
            '"><button type="button" class="btn btn-red btn-lg">Watch Trailer</button></a>' +
            "</div><br>";
          searchResultsHTML +=
            '<div class="release">Release Date: ' + releaseDate + "</div><br>";
          searchResultsHTML +=
            '<div class="overview">' + overview + "</div><br>";
          searchResultsHTML +=
            '<div class="rating">Rating: ' + voteAverage + "/10</div><br>";
          searchResultsHTML += `<div class="col-sm-5 btn btn-primary add-to-favorites" data-overview="${overview}" data-poster="${poster}" data-trailer="${youtubeLink}" data-title="${title}">Add to Favorite</div>`;

          searchResultsHTML += "</div>"; //close movieDetails
          searchResultsHTML += "</div>"; //close modal-dialog
          searchResultsHTML += "</div>"; //close modal
          searchResultsHTML += "</div>"; //close off each div
          // console.log(searchResultsHTML)
          $("#movie-grid").append(searchResultsHTML);
          //Label will be whatever user input was
          $("#movieGenreLabel").html(searchTerm);
        });
      }
    });
  }
  $(document).on("click", ".add-to-favorites", async (e) => {
    console.log(e.target.dataset);
    const { overview, poster, trailer, title } = e.target.dataset;
    // alert(title);
    const newFav = {
      title,
      description: overview,
      poster_url: poster,
      trailer_url: trailer,
    };
    console.log(newFav);
    const response = await fetch("/api/favorites/add", {
      method: "POST",
      body: JSON.stringify(newFav),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("added to favorites!");
    } else {
      alert("Please login to use this feature.");
    }
  });
});
