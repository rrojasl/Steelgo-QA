/********************************************/
/********************************************/
/*********                          *********/
/********* Grid Extensions Manager  *********/
/*********                          *********/
/********************************************/
/********************************************/

/****************************/
/*    Global Variables      */
/****************************/

//Add all global variables for your partial view here

/****************************/
/*    Document Ready        */
/****************************/

//Method to be called on the document ready and contains all the pertinent code for a partial view
function gridExtensionsToBeExecutedOnDocumentReady() {
    //CODE
}

/****************************/
/*    Global Functions      */
/****************************/

//Add all your global functions for your partial view here


function CustomisaGrid(elemento) {
    $(".k-grid-header-wrap  ", elemento).after("<div class='ScrollUp'><div class='DivScrollSup'>&nbsp;</div></div>");
    $(".DivScrollSup", elemento).css("width", $('table[role="grid"]').width())
    $(".k-grid-content", elemento).css("overflow", "hidden");

    $(".k-grid-header", elemento).before("<div id='sticky-anchor'></div>");


    $(".k-grid-content", elemento).scroll(function () {
        $(".ScrollUp", elemento)
            .scrollLeft($(".k-grid-content", elemento).scrollLeft());
    });
    $(".ScrollUp", elemento).scroll(function () {
        $(".k-grid-content", elemento)
            .scrollLeft($(".ScrollUp", elemento).scrollLeft());
    });

    $(window).scroll(function () { sticky_relocate(elemento) });
}
function sticky_relocate(elemento) {
    var window_top = $(window).scrollTop();
    var offset = $('#sticky-anchor', elemento).offset().top;
    if (window_top > offset) {
        $('.k-grid-header', elemento).addClass('stick');
        $(".k-grid-header", elemento).css("width", $('.k-grid-content', elemento).width() - 17)
        $(window).resize(function () {
            $(".k-grid-header", elemento).css("width", $('.k-grid-content', elemento).width() - 17)
        });
    } else {
        $('.k-grid-header', elemento).removeClass('stick');
        $(".k-grid-header", elemento).css("width", "inherit")
    }
}