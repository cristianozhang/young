(function() {
    'use strict';

    $( '#confirm-delete' ).on( 'show.bs.modal', function ( event ) {
        var button = $( event.relatedTarget );
        var id = button.data( 'id' );
        var source = button.data( 'source' );
    
        var modal = $( this );
        modal.find( '.modal__source' ).text( source );
        modal.find( '.modal-footer input' ).val( id );
    });

})( window.JW );
