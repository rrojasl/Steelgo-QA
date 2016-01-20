Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "42", { path: '/' });

var $CapturaAvanceIntAcabadoModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        InputCuadrante: {
            visible: "divCuadrante",
            editable: "cuadranteID",
        },
        InputColor: {
            visible: "divColor",
            editable: "inputColor",
        },
        InputFecha: {
            visible: "divFecha",
            editable: "inputFecha",
        },
        InputPintor: {
            visible: "divPintor",
            editable: "inputPintor",
        },
        InputLote: {
            visible: "divLote",
            editable: "inputLote",
        }
    }
}