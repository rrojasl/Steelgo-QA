/********************************************/
/********************************************/
/*********                          *********/
/*********    Menu Manager          *********/
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
function menuManagerToBeExecutedOnDocumentReady() {
    //Toggle for main menu's submenus           
    /*Open menus on hover*/
    $(document).on("mouseenter", "ul.main-menu > li:not('.shortcut')", function () {
        if ($(this).hasClass('active') && !$("#sidebar").hasClass("minified")) {
            $("ul.sub-menu2").removeClass("open");
            $("ul.sub-menu > li").removeClass("active expand");
            $(this).children("ul").toggleClass("open");
            $("i.arrow").toggleClass("down");
        }
        else if (!$("#sidebar").hasClass("minified")) {
            $("#sidebar li").removeClass('active');
            $("#sidebar ul").removeClass('open');
            $(this).closest("li").has("ul").addClass('active').children("ul").addClass("open");
            $("i.arrow").addClass("down");
        }
        else {
            $("#sidebar li").removeClass('active');
            $("#sidebar ul").removeClass('open');
            $(this).addClass('active');
        }
    }).on("mouseleave", "ul.main-menu > li:not('.shortcut')", function () {
        $("#sidebar li").removeClass('active');
        $("#sidebar ul").removeClass('open');
        $(this).removeClass('active');
    });

    /*Open menus on click*/
    $(document).on("click", "ul.main-menu > li:not('.shortcut') > a", function () {
        if ($(this).closest("li").hasClass('active') && !$("#sidebar").hasClass("minified")) {
            $("ul.sub-menu2").removeClass("open");
            $("ul.sub-menu > li").removeClass("active expand");
            $(this).closest("li").children("ul").toggleClass("open");
            $(this).children("i.arrow").toggleClass("down");
        }
        else if (!$("#sidebar").hasClass("minified")) {
            $("#sidebar li").removeClass('active');
            $("#sidebar ul").removeClass('open');
            $(this).closest("li").addClass('active').children("ul").addClass("open");
            $(this).children("i.arrow").addClass("down");
        }
        else {
            $("#sidebar li").removeClass('active');
            $("#sidebar ul").removeClass('open');
            $(this).closest("li").addClass('active');
        }
    });

    //Toggle for second submenu
    /*Open menus on hover*/
    $(document).on("mouseenter", "ul.sub-menu > li", function () {
        if ($(this).children("ul.sub-menu2").hasClass('open')) {
            $(this).removeClass("active expand");
            $(this).children("ul.sub-menu2").removeClass("open");
        }
        else {
            $("ul.sub-menu2").removeClass("open");
            $("ul.sub-menu > li").removeClass("active expand");
            $(this).addClass("active");
            $(this).has("ul").addClass("expand");
            $(this).children("ul.sub-menu2").addClass("open");
        }
    });

    /*Open menus on click*/
    $(document).on("click", "ul.sub-menu > li > a", function () {
        if ($(this).parent().children("ul.sub-menu2").hasClass('open')) {
            $(this).parent("li").removeClass("active expand");
            $(this).parent().children("ul.sub-menu2").removeClass("open");
        }
        else {
            $("ul.sub-menu2").removeClass("open");
            $("ul.sub-menu > li").removeClass("active expand");
            $(this).parent("li").addClass("active");
            $(this).parent("li").has("ul").addClass("expand");
            $(this).parent().children("ul.sub-menu2").addClass("open");
        }
    });

    //Toggle for last submenu's links         
    $(document).on("click", "ul.sub-menu2 > li > a", function () {
        $("ul.sub-menu2 li").removeClass("active");
        $("ul.sub-menu3").removeClass("open");
    });

    //Toggle for last submenu's links         
    $(document).on("click", "ul.sub-menu3 > li > a", function () {
        $("ul.sub-menu2 li").removeClass("active");
        $("ul.sub-menu3").removeClass("open");
    });

    //Toggle sidebar's size
    $("i.minify").click(function () {
        $("ul").removeClass("open");
        $("i.arrow").removeClass("down");
        $("#sidebar").toggleClass("minified");
        $(".content-container").toggleClass("expanded");
    });
}

/****************************/
/*    Global Functions      */
/****************************/

//Create the QuickLinks
function generateQuickLinks() {
    var htmlToAppend = "<li class='shortcut'><div class='quicklinks'><i class='icn links'></i><span id='layoutLabel0014'></span><i class='icn right gear'></i></div><ul class='sub-menu'>    <li>        <a href='#'>            <span>Llegada de Material</span>        </a>    </li>    <li>        <a href='#'><span>Generación Pase Salida</span></a></li><li><a href='#'><span>Despacho de Tubos</span></a></li></ul></li>";
    $(".main-menu").append(htmlToAppend);
}

//Create Level 0 DOM Elements for SideMenu
function generateSideMenuDOMElementsLevel0(elementOfMenu, appendingTarget) {
    
    //var htmlToAppend = "<li class='active'><a href='" + elementOfMenu.liga + "'>";
    var htmlToAppend = $("<li><a href='" + elementOfMenu.liga + "'><i class='" + elementOfMenu.icono + "'></i><span id='" + elementOfMenu.texto + "'></span><i class='icn right arrow'></i></a></li>");
    var htmlSubMenu = $("<ul class='sub-menu'></ul>");
    htmlToAppend.append(htmlSubMenu);
    appendingTarget.append(htmlToAppend);
    return htmlSubMenu;
}

//Create Level 1 DOM Elements for SideMenu
function generateSideMenuDOMElementsLevel1(elementOfMenu, appendingTarget) {
    
    var htmlToAppend = $("<li><a href='" + elementOfMenu.liga + "'><span id='" + elementOfMenu.texto + "'></span></a></li>");
    var htmlSubMenu2 = $("<ul class='sub-menu2'></ul>");
    htmlToAppend.append(htmlSubMenu2);
    appendingTarget.append(htmlToAppend);
    return htmlSubMenu2;
}

//Create Level 2 DOM Elements for SideMenu
function generateSideMenuDOMElementsLevel2(elementOfMenu, appendingTarget) {
    
    var htmlToAppend = $("<li><a href='" + elementOfMenu.liga + "'><span id='" + elementOfMenu.texto + "'></span></a></li>");
    var htmlSubMenu3 = $("<ul class='sub-menu3'></ul>");
    htmlToAppend.append(htmlSubMenu3);
    appendingTarget.append(htmlToAppend);
    return htmlSubMenu3;
}

//Create Level 3 DOM Elements for SideMenu
function generateSideMenuDOMElementsLevel3(elementOfMenu, appendingTarget) {
    var htmlToAppend = $("<li><a href='" + elementOfMenu.liga + "'><span id='" + elementOfMenu.texto + "'></span></a></li>");
    appendingTarget.append(htmlToAppend);
    return htmlToAppend;
}

//Recursive Method to generate the side menu
function generateSideMenuDOMElements(idPadre, nivel, appendingTarget) {
    if ($sideMenuLayout[nivel] != undefined && $sideMenuLayout[nivel][idPadre] != undefined) {
        for (key in $sideMenuLayout[nivel][idPadre]) {
            var newAppendingTarget;
            switch (nivel) {
                case 0: newAppendingTarget = generateSideMenuDOMElementsLevel0($sideMenuLayout[nivel][idPadre][key], appendingTarget); break;
                case 1: newAppendingTarget = generateSideMenuDOMElementsLevel1($sideMenuLayout[nivel][idPadre][key], appendingTarget); break;
                case 2: newAppendingTarget = generateSideMenuDOMElementsLevel2($sideMenuLayout[nivel][idPadre][key], appendingTarget); break;
                case 3: newAppendingTarget = generateSideMenuDOMElementsLevel3($sideMenuLayout[nivel][idPadre][key], appendingTarget); break;
            }
            generateSideMenuDOMElements(key, nivel + 1, newAppendingTarget);
        }
    }
}
//Method to generate the Side Menu
function generateSideMenu(data) {
    $sideMenu = {};
    $sideMenuLayout = {};

    if (typeof (data.layout) != null && typeof (data.layout.navigation) != null && data.layout.navigation[0].type == "sidemenu") {
        for (key in data.layout.navigation[0].elements) {
            var element = data.layout.navigation[0].elements[key];

            if ($sideMenuLayout[element.nivel] == undefined) {
                $sideMenuLayout[element.nivel] = {};
            }

            if ($sideMenuLayout[element.nivel][element.idPadre] == undefined) {
                $sideMenuLayout[element.nivel][element.idPadre] = {};
            }


            if ($sideMenuLayout[element.nivel][element.idPadre][element.elemetId] == undefined) {
                $sideMenuLayout[element.nivel][element.idPadre][element.elemetId] = {};
            }

            $sideMenuLayout[element.nivel][element.idPadre][element.elemetId].texto = element.texto;
            $sideMenuLayout[element.nivel][element.idPadre][element.elemetId].liga = element.liga;
            $sideMenuLayout[element.nivel][element.idPadre][element.elemetId].icono = element.icono;
        }
    }
}

//Method to populate the returnOfSecurityCheck
function generateReturnOFSecurityCheck(data) {
    returnOfSecurityCheck = {};
    //Populate entities
    for (key in data.entidades) {
        var keyRetreived = data.entidades[key];
        returnOfSecurityCheck[keyRetreived.entityName] = {};
        returnOfSecurityCheck[keyRetreived.entityName].create = keyRetreived.create;
        returnOfSecurityCheck[keyRetreived.entityName].destroy = keyRetreived.destroy;
        returnOfSecurityCheck[keyRetreived.entityName].detail = keyRetreived.detail;
        returnOfSecurityCheck[keyRetreived.entityName].list = keyRetreived.list;
        returnOfSecurityCheck[keyRetreived.entityName].properties = {};
        for (property in keyRetreived.properties) {
            var propertyRetreived = keyRetreived.properties[property];
            returnOfSecurityCheck[keyRetreived.entityName].properties[propertyRetreived.propertyName] = {};
            returnOfSecurityCheck[keyRetreived.entityName].properties[propertyRetreived.propertyName].editable = propertyRetreived.editable;
            returnOfSecurityCheck[keyRetreived.entityName].properties[propertyRetreived.propertyName].required = propertyRetreived.required;
            returnOfSecurityCheck[keyRetreived.entityName].properties[propertyRetreived.propertyName].visible = propertyRetreived.visible;
        }

    }
    //Populate Layout
    returnOfSecurityCheck.Layout = {};
    returnOfSecurityCheck.Layout.create = data.layout.create;
    returnOfSecurityCheck.Layout.destroy = data.layout.destroy;
    returnOfSecurityCheck.Layout.detail = data.layout.detail;
    returnOfSecurityCheck.Layout.list = data.layout.list;

    returnOfSecurityCheck.Layout.properties = {};
    returnOfSecurityCheck.Layout.properties.search = {};
    returnOfSecurityCheck.Layout.properties.search.editable = data.layout.properties[0].editable;
    returnOfSecurityCheck.Layout.properties.search.required = data.layout.properties[0].required;
    returnOfSecurityCheck.Layout.properties.search.visible = data.layout.properties[0].visible;

    returnOfSecurityCheck.Layout.properties.notifications = {};
    returnOfSecurityCheck.Layout.properties.notifications.editable = data.layout.properties[1].editable;
    returnOfSecurityCheck.Layout.properties.notifications.required = data.layout.properties[1].required;
    returnOfSecurityCheck.Layout.properties.notifications.visible = data.layout.properties[1].visible;

    returnOfSecurityCheck.Layout.properties.useroptions = {};
    returnOfSecurityCheck.Layout.properties.useroptions.editable = data.layout.properties[2].editable;
    returnOfSecurityCheck.Layout.properties.useroptions.required = data.layout.properties[2].required;
    returnOfSecurityCheck.Layout.properties.useroptions.visible = data.layout.properties[2].visible;

    returnOfSecurityCheck.Layout.properties.navigation = {};
    returnOfSecurityCheck.Layout.properties.navigation.editable = data.layout.properties[3].editable;
    returnOfSecurityCheck.Layout.properties.navigation.required = data.layout.properties[3].required;
    returnOfSecurityCheck.Layout.properties.navigation.visible = data.layout.properties[3].visible;
}