/****************************/
/*   Security Functions     */
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
    console.log("->" + elementOfMenu.texto);
    appendingTarget.append(htmlToAppend);
    return htmlSubMenu;
}

//Create Level 1 DOM Elements for SideMenu
function generateSideMenuDOMElementsLevel1(elementOfMenu, appendingTarget) {
    
    var htmlToAppend = $("<li><a href='" + elementOfMenu.liga + "'><span id='" + elementOfMenu.texto + "'></span></a></li>");
    var htmlSubMenu2 = $("<ul class='sub-menu2'></ul>");
    htmlToAppend.append(htmlSubMenu2);
    console.log("-->" + elementOfMenu.texto);
    appendingTarget.append(htmlToAppend);
    return htmlSubMenu2;
}

//Create Level 2 DOM Elements for SideMenu
function generateSideMenuDOMElementsLevel2(elementOfMenu, appendingTarget) {
    
    var htmlToAppend = $("<li><a href='" + elementOfMenu.liga + "'><span id='" + elementOfMenu.texto + "'></span></a></li>");
    var htmlSubMenu3 = $("<ul class='sub-menu3'></ul>");
    htmlToAppend.append(htmlSubMenu3);
    console.log("--->" + elementOfMenu.texto);
    appendingTarget.append(htmlToAppend);
    return htmlSubMenu3;
}

//Create Level 3 DOM Elements for SideMenu
function generateSideMenuDOMElementsLevel3(elementOfMenu, appendingTarget) {
    var htmlToAppend = $("<li><a href='" + elementOfMenu.liga + "'><span id='" + elementOfMenu.texto + "'></span></a></li>");
    console.log("--->" + elementOfMenu.texto);
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

//Method to update the visibility, required and editable attributes of all elements
function applySecurity() {
    //Obtain the entity list from the $authorizationModel
    var key, entityDefinition, entitySecurity;
    var securityNotFound = true;
    var authorizationModelKeys = Object.keys($authorizationModel);

    //For each entity available for the current page
    for (key in $authorizationModel) {
        //It the page contains the key to be threated
        if ($authorizationModel.hasOwnProperty(key)) {
            //obtain the entity definition
            entityDefinition = $authorizationModel[key];
            if (returnOfSecurityCheck.hasOwnProperty(key)) {
                entitySecurity = returnOfSecurityCheck[key];
                securityNotFound = false;
            }
            applySecurityPolicyForEntity(entityDefinition, entitySecurity, securityNotFound);
            applySecurityPolicyForProperties(entityDefinition, entitySecurity, securityNotFound);
        }
    }
}

//Method to change the visibility, editability and required attributes of the elements
function applySecurityPolicy() {
    //Block the screen
    loadingStart();

    //If this page its not the login page
    if (Cookies.get("navegacion") != "1") {

        //Execute REST Petition to obtain the user access
        $BackEndSAM.perfil.read({}, { token: Cookies.get("token"), paginaID: Cookies.get("navegacion") }).done(function (data) {
            console.log("data");
            console.log(data);

            //Retrieve the context menu definition**
            $contextMenu = {};

            //Retrieve the side menu definition
            generateSideMenu(data);

            //Generate Side Menu
            generateSideMenuDOMElements(0, 0, $(".main-menu"));

            //Retrieve the QuickLinks definition**
            $quickLinks = {};

            //Generate QuickLinks**
            generateQuickLinks();

            //Retrieve the obtained data
            generateReturnOFSecurityCheck(data);

            //Update the token cookie
            if (typeof data.token != undefined && data.token != null && data.token.length > 0) {
                Cookies.set("token", data.token, { path: '/' });
            }

            //Apply Security
            applySecurity();
            loadingStop();
            $("#language").data("kendoDropDownList").trigger("change");
        });
    } else {
        //Apply Security
        applySecurity();
        loadingStop();
    }

}

//Method to apply the security policy in the entity
//create :: applies to new item buttons
//list :: applies to grids, combos, multiselect, autocompletes
//detail :: applies to show details buttons
//destroy :: applies to remove item buttons
function applySecurityPolicyForEntity(entityDefinition, entitySecurity, securityNotFound) {
    var entityCreationPermission = false;
    var entityListPermission = false;
    var entityDetailPermission = false;
    var entityDestroyPermission = false;

    if (securityNotFound == false) {
        if (entitySecurity.hasOwnProperty("create")) {
            entityCreationPermission = entitySecurity["create"];
        }

        if (entitySecurity.hasOwnProperty("list")) {
            entityListPermission = entitySecurity["list"];
        }

        if (entitySecurity.hasOwnProperty("detail")) {
            entityDetailPermission = entitySecurity["detail"];
        }

        if (entitySecurity.hasOwnProperty("destroy")) {
            entityDestroyPermission = entitySecurity["destroy"];
        }
    }

    if (entityDefinition.hasOwnProperty("listContainer")) {
        if (entityDefinition["listContainer"].hasOwnProperty("create") && entityDefinition.listContainer["create"] != null && entityDefinition.listContainer["create"].length > 0) {
            if (entityCreationPermission == false) {
                $(entityDefinition.listContainer["create"]).css("display", "none");
            }
        }

        if (entityDefinition["listContainer"].hasOwnProperty("list") && entityDefinition.listContainer["list"] != null && entityDefinition.listContainer["list"].length > 0) {
            if (entityListPermission == false) {
                $(entityDefinition.listContainer["list"]).css("display", "none");
            }
        }

        if (entityDefinition["listContainer"].hasOwnProperty("detail") && entityDefinition.listContainer["detail"] != null && entityDefinition.listContainer["detail"].length > 0) {
            if (entityDetailPermission == false) {
                $(entityDefinition.listContainer["detail"]).css("display", "none");
            }
        }

        if (entityDefinition["listContainer"].hasOwnProperty("destroy") && entityDefinition.listContainer["destroy"] != null && entityDefinition.listContainer["destroy"].length > 0) {
            if (entityDestroyPermission == false) {
                $(entityDefinition.listContainer["destroy"]).css("display", "none");
            }
        }
    }
}

//Method to apply the security policy in the entity properties
//Iterate over all properties of an entity
//visible :: applies to containers of a properties, divs with labels and inpunts, etc inside
//editable :: applies to inputs, combos, autocompletes
//required :: applies to inputs, combos, autocompletes, add class "security_required" use this class to validate before submit actions
function applySecurityPolicyForProperties(entityDefinition, entitySecurity, securityNotFound) {
    if (entityDefinition.hasOwnProperty("properties")) {
        for (key in entityDefinition["properties"]) {
            var propertyViewPermission = false;
            var propertyEditPermission = false;
            var propertyRequiredPermission = false;

            if (securityNotFound == false) {
                if (entitySecurity.hasOwnProperty("properties")) {
                    if (entitySecurity.properties.hasOwnProperty(key)) {
                        if (entitySecurity.properties[key].hasOwnProperty("visible")) {
                            propertyViewPermission = entitySecurity.properties[key]["visible"];
                        }

                        if (entitySecurity.properties[key].hasOwnProperty("editable")) {
                            propertyEditPermission = entitySecurity.properties[key]["editable"];
                        }

                        if (entitySecurity.properties[key].hasOwnProperty("required")) {
                            propertyRequiredPermission = entitySecurity.properties[key]["required"];
                        }
                    }
                }
            }

            if (entityDefinition.properties.hasOwnProperty(key)) {
                if (entityDefinition.properties[key].hasOwnProperty("visible") && entityDefinition.properties[key]["visible"] != null && entityDefinition.properties[key]["visible"].length > 0) {
                    if (propertyViewPermission == false) {
                        $(entityDefinition.properties[key]["visible"]).css("display", "none");
                    }
                }

                if (entityDefinition.properties[key].hasOwnProperty("editable") && entityDefinition.properties[key]["editable"] != null && entityDefinition.properties[key]["editable"].length > 0) {
                    if (propertyEditPermission == false) {
                        $(entityDefinition.properties[key]["editable"]).prop('disabled', true);
                    }
                }

                if (entityDefinition.properties[key].hasOwnProperty("required") && entityDefinition.properties[key]["required"] != null && entityDefinition.properties[key]["required"].length > 0) {
                    if (propertyRequiredPermission == true) {
                        $(entityDefinition.properties[key]["required"]).addClass("security_required");
                    }
                }
            }
        }
    }
}

//Method to hide elements if im in home
function hideElements() {
    if (Cookies.get("home") != null && Cookies.get("home") == "true" &&
            Cookies.get("navegacion") != null && Cookies.get("navegacion") == "1") {
        $(".sidebar").css("display", "none");
        $(".logo").css("display", "none");
        $(".search-bar").css("display", "none");
        $(".notifications").css("display", "none");
        $(".logged-user").css("display", "none");
        $(".content-container").removeClass("topbar");
        $(".breadcrumb-container").css("display", "none");
    }
}

//Method to autogenerate a cookie
function autoCookies(correctCredentials) {
    if (Cookies.get("user") == null && Cookies.get("token") == null) {
        if (correctCredentials) {
            createUserSession("YWRtaW4", "Q2hlbHNlYTEwMiE");
        } else {
            createUserSession("ZZZtaW4", "ZZZlbHNlYTEwMiE");
        }
    }
}

//Method to autogenerate a cookie
function authenticate(username, password) {
    if (Cookies.get("user") == null && Cookies.get("token") == null) {
        createUserSession(encrypt(username), encrypt(password));
    } else {
        validateCredentials();
    }
}

function createUserSession(username, password) {
    //Create Login
    loadingStart();
    $SecurityManager.authentication.create({}, { username: username, password: password }).done(function (data) {
        if (data.IsAuthenicated) {
            Cookies.set("home", false, { path: '/' });
            Cookies.set("user", username, { path: '/' });
            Cookies.set("token", data.ReturnMessage[0], { path: '/' });
            //RedirectToLanding
            document.location.href = $homeURI;
        } else {
            loadingStop();
        }
    });
}

function removeUserSession() {
    if (Cookies.get("user") != null && Cookies.get("token") != null) {
        $SecurityManager.authentication.destroy({}, { username: Cookies.get("user"), token: Cookies.get("token") }).done(function (data) {
            if (!data.IsAuthenicated) {
                Cookies.set("LogOut", true, { path: "/" });
                Cookies.remove("user", { path: '/' });
                Cookies.remove("token", { path: '/' });
                Cookies.remove("home", { path: '/' });
                validateCredentials();
            }
        });
    }
}

function validateCredentials() {
    if (Cookies.get("home") != null && Cookies.get("home") == "false" && Cookies.get("user") != null && Cookies.get("token") != null) {
        loadingStart();
        var request = $SecurityManager.authentication.read({ username: Cookies.get("user"), token: Cookies.get("token") });
        request.done(function (data) {
            if (data.IsAuthenicated) {
                Cookies.set("home", false, { path: '/' });
            } else {
                //RedirectToHomePage
                Cookies.remove("user", { path: '/' });
                Cookies.remove("token", { path: '/' });
                if (redireccionAutomatica) {
                    document.location.href = '/';
                } else {
                    alert("Se redireccona a home por error de credenciales");
                }
            }
            loadingStop();
        });
        request.error(function (data) {
            Cookies.remove("user", { path: '/' });
            Cookies.remove("token", { path: '/' });
            if (redireccionAutomatica) {
                document.location.href = '/';
            } else {
                alert("Se redireccona a home por error en la llamada");
            }

            loadingStop();
        });
        request.fail(function (data) {
            Cookies.remove("user", { path: '/' });
            Cookies.remove("token", { path: '/' });
            if (redireccionAutomatica) {
                document.location.href = '/';
            } else {
                alert("Se redireccona a home por fallo en la llamada");
            }

            loadingStop();
        });

    } else {
        if (Cookies.get("home") != null && Cookies.get("home") == "false") {
            //RedirectToHomePage
            if (redireccionAutomatica) {
                document.location.href = '/';
            } else {
                alert("Se redireccona a home por error inesperado");
            }

        } else if (Cookies.get("home") != null && Cookies.get("home") == "true"
                    && Cookies.get("user") != null
                    && Cookies.get("token") != null
                    && Cookies.get("navegacion") != null && Cookies.get("navegacion") == "1") {
            document.location.href = $homeURI;
        } else if (Cookies.get("navegacion") != null && Cookies.get("navegacion") != "1"
                    && Cookies.get("LogOut") != null) {
            Cookies.remove("LogOut", { path: '/' });
            if (redireccionAutomatica) {
                document.location.href = '/';
            } else {
                alert("Se redireccona a home por que hice logour");
            }
        }
    }
}