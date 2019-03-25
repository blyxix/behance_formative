$(function(){
	
	// REPLACE THIS !!
	var key = 'ZZI3LTKqP5pdKUyFTQkzuObtnAHxf5Ao';	// Your unique key - https://www.behance.net/dev
	var behanceUser = 'AndreasEbneter'; 				// example - Manuel from Yoobee Creative Catchup #3 | ellastoner370c

	var urlProjects = 'https://api.behance.net/v2/users/' + behanceUser + '/projects?client_id=' + key;

// ================================== HOME PAGE TEMPLATE (PROJECT DETAILS) ====================================================================

	// If the ID #index has been rendered on the page, then run this <code></code>
	if($('#home').length > 0) {

		

		// AJAX request for PROJECT INFO
		$.ajax({

			url: urlProjects,
			dataType: 'jsonp',

			// let's show a little preloader to the user while they wait for a nice User Experience
			beforeSend: function(res) {
									$('<div class="pre-loader"> ... loading portfolio ... </div>').prependTo('body');
			},

			// when the ajax request is complete do all of these things
			success: function(res) {

				console.log(res);

				// Success! We can get rid of the preloader now...
				$('.pre-loader').detach();

				var projects = res.projects;

				// https://www.behance.net/dev/api/endpoints/1
				projects.forEach(function(project) {
					$('<div class="proj-item mt-5 mb-5">' + '<div class="img-wrapper mt-2"><img src="' + project.covers.original + '"><div class = overlay><a href="project.html?id=' + project.id + '" class="link btn btn-danger" >See more</a></div></div></div>').appendTo('.projects');
				});
			},

			// if the ajax request fails do these things as a fallback
			error: function(res) {
				$('<h1> Error!! </h1>').appendTo('body');
			}


		}); // END ajax request

		var urlUser = 'https://api.behance.net/v2/users/' + behanceUser + '?client_id=' + key;

		// AJAX request for USER INFO
		$.ajax({
			url: urlUser,
			dataType: 'jsonp',
			success: function(res) {
				var user = res.user;
				//console.log(res.user);
	
				// $('<h1>' + user.first_name + ' ' + user.last_name + '</h1>').prependTo('.designer');
				// //images[276]
				// $('<img src="' + user.images[276] + '">').prependTo('.designer');

				createHTML(user); //passing the user data to create HTML

				function createHTML(user){
					console.log(user);
					var rawTemplate = document.getElementById('userTemplate').innerHTML;
					var compiledTemplate = Handlebars.compile(rawTemplate);
					var generatedHTML = compiledTemplate(user);

					var userContainer = document.getElementById('designer');
					userContainer.innerHTML = generatedHTML;
				}
			}
		}); // END ajax request

	} // END HOMEPAGE template

// ================================== PROJECT PAGE TEMPLATE ====================================================================

	// If the ID #project has been rendered on the page, then run this code
	if($('#project').length > 0) {
 
		var pageURL = new URL(document.location);
		var params = pageURL.searchParams;
		var id = params.get('id');
		var urlProject = 'http://www.behance.net/v2/projects/' + id + '?api_key=' + key;

		// AJAX request
		$.ajax({

			url: urlProject,
			dataType: 'jsonp',

			// let's show a little preloader to the user while they wait for a nice User Experience
			beforeSend: function(res){
				$('<div class="pre-loader"> ... loading behance project ... </div>').prependTo('body');
			},

			// when the ajax request is complete do all of these things
			success: function(res) {

				// Success! We can get rid of the preloader now...
				$('.pre-loader').detach();

				console.log(res);

				var project = res.project;

				// show the project details like this
				$('<h1>' + project.name +'</h1>').appendTo('.container');
				$('<p>' + project.description + '</p>').appendTo('.container');
				// using Moment JS for clean and easy to use time format
				// https://momentjs.com/docs/#/displaying/fromnow/
				// https://momentjs.com/docs/#/displaying/unix-timestamp/
				$('<h3>' + '<small>published:</small>' + moment.unix(project.published_on).fromNow() + '</h3>').appendTo('.container');
				$('<img src="' + project.covers.original + '">').appendTo('.container');
			},

			// if the ajax request fails do these things as a fallback
			error: function(res) {
				$('<h1> Error!! </h1>').appendTo('body');

			}

		});

	}
	
});