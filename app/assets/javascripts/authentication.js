$(document).ready( function(){
	if ($ ('#sign_up_form').length ) {
		$( '#sign_up_form form' ).submit(function(event) {
			//IMPORTANT!!!
			//is this secure!?
			var email = $( 'form :input#sign_up_user_email' ).val();
			var pw_length = $( 'form :input#sign_up_user_password' ).val().length;
			var pw_match = ($( 'form :input#sign_up_user_password' ).val() == $( 'form :input#sign_up_user_password_confirmation' ).val());
			if (pw_length < 8){
				$( 'ul' ).empty();
				event.preventDefault();
				$( 'ul' ).append("Password is too short (minimum is 8 characters)");
			} else if (!pw_match) {
				$( 'ul' ).empty();
				event.preventDefault();
				$( 'ul' ).append("Password confirmation does not match");
			};
		});
	};
});