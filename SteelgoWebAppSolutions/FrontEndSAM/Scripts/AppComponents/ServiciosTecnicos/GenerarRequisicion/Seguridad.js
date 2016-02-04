
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "45", { path: '/' });

var $GenerarRequisicionModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        InputOrdenTrabajo: {
            visible: "#containerDiv",
        },
        InputID: {
            visible: "#CapturaArmadoHeaderSpoolIDDiv",
            editable: "#InputID",
            required: "#InputID",
        },
        Junta: {
            visible: "#containerDiv",
        },
        Fecha: {
            visible: "#AgregadoDiv",
        },
        Observacion: {
            visible: "#AgregadoDiv",
        },
        Proyecto: {
            visible: "#AgregadoDiv",
        },
        tipoPrueba: {
            visible: "#AgregadoDiv",
        },
    }
};

