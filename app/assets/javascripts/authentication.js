var sign_up_clicked = false;
var sign_in_clicked = false;
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

	$( '#sign_up_button' ).click(function(event){
		if (!sign_up_clicked) {
			$( '#sign_up_form' ).css( 'display', 'inline' );
			sign_up_clicked = true;
		} else {
			$( '#sign_up_form' ).css( 'display', 'none' );
			sign_up_clicked = false;
		};
	});
	
	$( '#sign_in_button' ).click(function(event){
		if (!sign_in_clicked) {
			$( '#sign_in_form' ).css( 'display', 'inline' );
			sign_in_clicked = true;
		} else {
			$( '#sign_in_form' ).css( 'display', 'none' );
			sign_in_clicked = false;
		};
	});
});