// EmailJS
(function() {
    emailjs.init("user_x1pjNHjz25ErQPONihZeA");
})();
window.onload = function () {
	$('.contactAlert').hide();
	document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
	document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // generate the contact number value
        this.contact_number.value = Math.random() * 100000 | 0;
        emailjs.sendForm('service_6txsn5z', 'template_nm1muj6', this).then(function () {
            document.getElementById('name').value='';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
			$('html,body').scrollTop(0);    
			$('.contactAlert').show();         
        });
    });
}
// Pull googlesheets data
let sheeturl =
	'https://docs.google.com/spreadsheets/d/1TlKRKovC8em4akrec83UF8KgqFztfjvAfACcb0tpy5E/edit?usp=sharing';
let sheetAsJSON =
	'https://spreadsheets.google.com/feeds/list/1TlKRKovC8em4akrec83UF8KgqFztfjvAfACcb0tpy5E/od6/public/values?alt=json';

$.ajax({ url: sheetAsJSON }).then((data) => {
	const projects = data.feed.entry.map((project) => {
		return {
			title: project.gsx$title.$t,
			image: project.gsx$image.$t,
			description: project.gsx$description.$t,
			tech: project.gsx$tech.$t,
		};
	});
	app(projects);
});

function app(projects) {
	for (let i = 0; i < projects.length; i = i + 1) {
		const $projectDiv = $('<div class="eachProject">');
		$('.listprojects').append($projectDiv);
		const $projectImg = $(
			'<img class="projectImg" src="' + projects[i].image + '">'
		);
		$projectDiv.append($projectImg);
		const $projectTitle = $('<h3 class="projectTitle">').text(
			projects[i].title
		);
		$projectDiv.append($projectTitle);
		const $projectDesc = $('<p class="projectDesc">').text(
			projects[i].description
		);
		$projectDiv.append($projectDesc);
		const $projectTech = $('<p class="projectTech">').text(projects[i].tech);
		$projectDiv.append($projectTech);
	}
}
let i = 0;
function matrix() {
	// const $hiredText = $('<p class="matrixelement">').text('HIRED');
	while (i <= 259) {
		const $hiredText = $('<p class="matrixelement">').text('HIRED');
		$('.enterthematrix').append($hiredText);
		i++;
	}
	var random = Math.floor(Math.random() * $('.matrixelement').length);
	$('.matrixelement').eq(random).fadeOut('slow');
	$('.matrixelement').eq(random).fadeIn('slow');
}

$('.bluepill').on('click', () => {
	$('.skills-tohide').hide();
	setInterval(matrix, 20);
});