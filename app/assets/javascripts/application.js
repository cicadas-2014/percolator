// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require raphael
//= require raphael-animated-viewbox
//= require percolator-model
//= require percolator-factories
//= require percolator
//= require_tree .


$(document).ready( function(){
	$( '#sign_up_form form' ).submit(function(event) {
		var email = $( 'form :input#sign_up_user_email' ).val();
		var pw_length = $( 'form :input#sign_up_user_password' ).val().length;

		if (pw_length < 8){
			$( 'ul' ).empty();
			event.preventDefault();
			$( 'ul' ).append("Password is too short (minimum is 8 characters)")
		}
		$.ajax({
			
		})
		// $( 'ul' ).append(data);
	});
});