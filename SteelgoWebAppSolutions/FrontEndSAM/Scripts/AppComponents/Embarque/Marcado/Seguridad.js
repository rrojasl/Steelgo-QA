Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10019", { path: '/' });

var $MarcadoModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        Area: {
            visible: "#AreaDiv",
            editable: "#Area",
            required: "#Area",
        },
        Cuadrante: {
            visible: "#CuadranteDiv",
            editable: "#Cuadrante",
            required: "#Cuadrante",
        }
    }
};