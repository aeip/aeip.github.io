// var Vibrant = require(['node-vibrant']);
let resultsArr = [];
// Get search input
let searchTerm = '';
$('#search').on('keydown', (event) => {
	if (event.key === 'Enter') {
        searchTerm = $('#search').val().split(' ').join('+');
        $('#search').blur();
        const displayedItems = document.getElementById('display');
		displayedItems.innerHTML = '';
        itunesSearch();
	}
});

// Search music and display
const itunesSearch = (search) => {
    const url = 'https://itunes.apple.com/search?term=' + searchTerm + '&media?=music';
    $.getJSON(url,
		function (data) {
            for (let i = 0; i < data.results.length; i++) {
							resultsArr = data.results;
							$resultDiv = $(
								'<div class="resultDiv" onclick="tappedDiv(this)">'
							);
							$artwork = $(
								'<img class="artwork" src="' +
									resultsArr[i].artworkUrl100 +
									'">'
							);
							$song = $('<h3 class="artist">').text(resultsArr[i].trackName);
							$artist = $('<p class="artist">').text(resultsArr[i].artistName);
							$audioPlayer = $('<audio class="musicplayer" controls>');
							$preview = $(
								'<source src="' +
									resultsArr[i].previewUrl +
									'" type="audio/mpeg">'
							);
							$('#display').append($resultDiv);
							$resultDiv.append($artwork);
							$resultDiv.append($song);
							$resultDiv.append($artist);
							$('.musicplayer').hide();
							$resultDiv.append($audioPlayer);
                            $audioPlayer.append($preview);
                            
                            // Vibrant.from(resultsArr[i].artworkUrl100)
							// 								.getPalette()
							// 								.then((palette) => console.log(palette));

							// var colorThief = new colorThief();
							// var img = document.createElement('img');
                            // img.setAttribute('src', resultsArr[i].artworkUrl100);
                            // console.log(colorThief.getColor(img));
                            
                            
							// const img = resolve(process.cwd(), resultsArr[i].artworkUrl100);

							// 				ColorThief.getColor(img)
							// 					.then((color) => {
							// 						console.log(color);
							// 					})
							// 					.catch((err) => {
							// 						console.log(err);
							// 					});

							// 				ColorThief.getPalette(img, 5)
							// 					.then((palette) => {
							// 						console.log(palette);
							// 					})
							// 					.catch((err) => {
							// 						console.log(err);
							// 					});
							// var img = document.createElement('img');
							// 				img.setAttribute('src', resultsArr[i].artworkUrl100);

							// 				img.addEventListener('load', function () {
							// 					var vibrant = new Vibrant(img);
							//                     var swatches = vibrant.swatches();
							//                     console.log(vibrant);
							// 					for (var swatch in swatches)
							// 						if (swatches.hasOwnProperty(swatch) && swatches[swatch])
							// 							console.log(swatch, swatches[swatch].getHex());

							// 					/*
							// 					 * Results into:
							// 					 * Vibrant #7a4426
							// 					 * Muted #7b9eae
							// 					 * DarkVibrant #348945
							// 					 * DarkMuted #141414
							// 					 * LightVibrant #f3ccb4
							// 					 */
							// 				});
						}
		}
	);
}
function deletetext() {
    document.getElementById('search').value = '';
}

function tappedDiv(tapped) {
    tapped.id = 'tapped';
    $('.resultDiv').not('#tapped').fadeOut();
    $('.musicplayer').show();
    const closeButton = $('<button id="closebutton" onclick="closeClicked(this)">').text('X');
    $('#display').append(closeButton);
    tapped.id = '';

}
function closeClicked(buttonObj) {
    $('.resultDiv').not('#tapped').fadeIn();
    $('.musicplayer').hide();
    buttonObj.remove();
}