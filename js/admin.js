jQuery( document ).ready( function() {

	// AJAX request to clear the log
	jQuery( 'a#clearLog' ).click( function( e ) {
		e.preventDefault();

		var data = {
			action: 'post_by_email_clear_log',
			security: logNonce
		};

		jQuery.post( ajaxurl, data, function( response ) {
			jQuery(' table#logTable' ).hide();
			jQuery( 'a#clearLog' ).hide();
		});
	});

	// AJAX request for a new PIN
	jQuery( 'input#generatePIN' ).click( function( e ) {
		e.preventDefault();

		var data = {
			action: 'post_by_email_generate_pin',
			security: pinNonce
		};

		jQuery.post( ajaxurl, data, function( response ) {
			jQuery( 'input#post_by_email_options\\\[pin\\\]' ).val( response );
		});
	});

	// tab switching
	jQuery( 'a.nav-tab' ).click( function( e ) {
		e.preventDefault();
		var id = e.target.id.substr( 4 );
		jQuery( 'div.tab-content').hide();
		jQuery( 'div#tab-'+id ).show();
		jQuery( 'a.nav-tab-active' ).removeClass( 'nav-tab-active' );
		jQuery( e.target ).addClass( 'nav-tab-active' );
	});

	// reset advanced options to default (SSL+IMAP)
	jQuery( 'input#resetButton' ).click( function( e ) {
		jQuery( 'input#post_by_email_options\\[ssl\\]' ).attr( 'checked', 'checked' );
		jQuery( 'select#post_by_email_options\\[mailserver_protocol\\]' ).val( 'IMAP' );
		jQuery( 'input#post_by_email_options\\[mailserver_port\\]' ).val( 993 );
		jQuery( 'input#post_by_email_options\\[delete_messages\\]' ).attr( 'checked', 'checked' );
		jQuery( 'input#post_by_email_options\\[delete_messages\\]' ).attr( 'disabled', false );
	});

	if ( 'POP3' == jQuery( 'select#post_by_email_options\\[mailserver_protocol\\]' ).val() ) {
		jQuery( 'input#post_by_email_options\\[delete_messages\\]' ).attr( 'checked', 'checked' );
		jQuery( 'input#post_by_email_options\\[delete_messages\\]' ).attr( 'disabled', true);
	}

	jQuery( 'select#post_by_email_options\\[mailserver_protocol\\]' ).change( function( e ) {
		if ( 'POP3' == jQuery( e.target ).val() ) {
			jQuery( 'input#post_by_email_options\\[delete_messages\\]' ).attr( 'checked', 'checked' );
			jQuery( 'input#post_by_email_options\\[delete_messages\\]' ).attr( 'disabled', true);
		} else {
			jQuery( 'input#post_by_email_options\\[delete_messages\\]' ).attr( 'disabled', false );
		}
	});

	// PIN tab
	jQuery( 'input#post_by_email_options\\[pin_required\\]' ).click( function( e ) {
		if ( jQuery( e.target ).attr('checked') ) {
			jQuery( 'tr.post-by-email-pin-settings' ).show();
		} else {
			jQuery( 'tr.post-by-email-pin-settings' ).hide();
		}
	});

});