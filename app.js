//when user types input and clicks submit, add user input to array, 
// iterate through array to create buttons for each element in the array, add user input as data attribute to that button and print user input to button text, then add button to button-display div in HTML.
//when user clicks any of the search-buttons, return 10 giphs based on the data attribute of that button and display to search results panel

$(document).ready(function () {

    var userInput;
    var button;
    var buttonText = ["Charlie Day", "Michelle Obama", "Harry Potter", "Ozzy Osborne"];
    var giphySearch;
    var state;

    //function creates an api request and will be called when one of the buttons with the class giphy-button is clicked
    function giphySearch() {

        $("#resultsDisplay").empty();
        giphySearch = $(this).attr("data-name");

        $("#searchHeader").text(giphySearch);

        var apiKey = "7JEOCebVYJVBxHbhj3ofAmRhsbGnEbAR";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            giphySearch + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            for (var r = 0; r < results.length; r++) {
                var giphyDiv = $("<div>");
                var ratingDisplay = $("<p>").text("Rating: " + results[r].rating);
                var giphyImg = $("<img>");
                giphyImg.attr("src", results[r].images.fixed_height.url).attr("data-state", "animate");

                giphyImg.attr("data-animate", results[r].images.fixed_height.url);
                giphyImg.attr("data-still", results[r].images.fixed_height_still.url);

                giphyDiv.addClass("giphy-div");
                giphyDiv.append(ratingDisplay);
                giphyDiv.append(giphyImg);
                $("#resultsDisplay").append(giphyDiv);

                $("#tip").html($("<p>").text("Click any gif to switch between still image and animated gif."));

            }
            giphyState();
        });
    };

    //function to change state of gif from animate to still when clicked 
    function giphyState() {
        $("img").on("click", function () {
            state = $(this).attr("data-state");
            if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            } else {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
        })
    };

    //function to add new buttons to the page dynamically
    $("#addPersonBtn").on("click", function (event) {
        event.preventDefault();

        userInput = $("#userSearch").val().trim();
        buttonText.push(userInput);
        createButtons();

    });

    //function creates a button for each item in buttonText array
    function createButtons() {
        $("#buttonDisplay").empty();
        for (var i = 0; i < buttonText.length; i++) {
            button = $("<button>");
            button.addClass("giphy-button btn btn-lg");
            button.attr("data-name", buttonText[i]);
            button.text(buttonText[i]);
            $("#buttonDisplay").append(button);

        }
    }

    $(document).on("click", ".giphy-button", giphySearch);
    createButtons();

});
