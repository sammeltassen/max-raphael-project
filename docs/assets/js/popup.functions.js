$(document).ready(function() {

    $('.popup').magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

            patterns: {
                pdf: {
                    index: '.pdf',
                    src: 'https://assets.maxraphael.org/pdfjs/web/viewer.html?file=%id%' // URL that will be set as a source for iframe.
                },
                dzi: {
                    index: '.dzi',
                    src: 'https://assets.maxraphael.org/openseadragon/index.php?file=/dzi/%id%'
                },
                // you may add here more sources
            },

            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".

        }
    });

});