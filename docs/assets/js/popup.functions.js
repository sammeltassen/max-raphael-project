$(document).ready(function() {

    $('.pdf').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                pdfjs: {
                    index: '.pdf',
                    src: '//%id%'
                }
            }
        }
    });

    $('.dzi').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                pdfjs: {
                    index: '.dzi',
                    src: '//%id%'
                }
            }
        }
    });

});