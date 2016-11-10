$(document).ready(function() {
	$('#post-form').on('submit', function(event) {
		event.preventDefault();
		console.log("form submitted!"); // sanity check
		create_post();
	});


	// Ajax for posting
	function create_post() {
		console.log("create post");
		// console.log($('#post-text').val());
		$.ajax({
			url: "post/",
			type: "POST",
			data: { the_post: $('#post-text').val() }, // data to be sent

			// handle successful response
			success: function(json) {
				$('#post-text').val('');
				console.log(json);
				$("#talk").prepend("<li><strong>"+json.text+"</strong> - <em> "+json.author+"</em> - <span> "+json.created+"</span></li>");
				console.log("success");
			},

			// handle non successful response
			error: function(xhr, errmsg, err) {
				$('#results').html("<div class='alert-box alert radius' data-alert>Oops! \
				We have encountered an error: "+errmsg+ " \
				<a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            	console.log(xhr.status + ": " + xhr.responseText);
			}
		});
	};


	// using jQuery
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');

	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});	
});