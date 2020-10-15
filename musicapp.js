var Vibrant = require(['node-vibrant']);
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
    const url = 'https://itunes.apple.com/search?term=' + searchTerm + '&country=US&media=music&limit=10';
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
                $('.musicplayer').hide();
                Vibrant.from(resultsArr[i].artworkUrl100)
                    .getPalette()
                    .then((palette) => {
                        function setColor() {
                            var random = Math.floor(Math.random() * 6);
                            if (random === 1) {
                                $resultDiv.css('background-color', 'rgb(' + palette.Vibrant._rgb[0] + ',' + palette.Vibrant._rgb[1] + ',' + palette.Vibrant._rgb[2] + ')');
                            } else if (random === 2) {
                                $resultDiv.css('background-color', 'rgb(' + palette.Vibrant._rgb[0] + ',' + palette.LightVibrant._rgb[1] + ',' + palette.LightVibrant._rgb[2] + ')');
                            } else if (random === 3) {
                                $resultDiv.css('background-color', 'rgb(' + palette.DarkVibrant._rgb[0] + ',' + palette.DarkVibrant._rgb[1] + ',' + palette.DarkVibrant._rgb[2] + ')');
                            } else if (random === 4) {
                                $resultDiv.css('background-color', 'rgb(' + palette.Muted._rgb[0] + ',' + palette.Muted._rgb[1] + ',' + palette.Muted._rgb[2] + ')');
                            } else if (random === 5) {
                                $resultDiv.css('background-color', 'rgb(' + palette.LightMuted._rgb[0] + ',' + palette.LightMuted._rgb[1] + ',' + palette.LightMuted._rgb[2] + ')');
                            } else if (random === 6) {
                                $resultDiv.css('background-color', 'rgb(' + palette.DarkMuted._rgb[0] + ',' + palette.DarkMuted._rgb[1] + ',' + palette.DarkMuted._rgb[2] + ')');
                            } else if (random === 0) {
                                $resultDiv.css('background-color', 'rgb(' + palette.Vibrant._rgb[0] + ',' + palette.Vibrant._rgb[1] + ',' + palette.Vibrant._rgb[2] + ')');
                            }
                        }
                        setInterval(setColor, 5000);
                    });
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