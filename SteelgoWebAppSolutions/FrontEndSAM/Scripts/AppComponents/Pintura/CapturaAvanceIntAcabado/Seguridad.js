Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "58", { path: '/' });

var $CapturaAvanceIntAcabadoModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        InputCuadrante: {
            visible: "#divCuadrante",
            editable: "#inputCuadrante",
            required: "#inputCuadrante",
        },
        InputColor: {
            visible: "#divColor",
            editable: "#inputColor",
        },
        InputFecha: {
            visible: "#divFecha",
            editable: "#inputFecha",
        },
        InputPintor: {
            visible: "#divPintor",
            editable: "#inputPintor",
        },
        InputLote: {
            visible: "#divLote",
            editable: "#inputLote",
        }
    }
}