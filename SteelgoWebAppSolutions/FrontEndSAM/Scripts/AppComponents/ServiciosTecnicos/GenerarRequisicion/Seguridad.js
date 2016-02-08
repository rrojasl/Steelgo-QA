
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

            visible: "#CapturaRequisicionJunta",
            editable: "#Junta",
            required: "#Junta",
        },
        Fecha: {
            visible: "#FechaDiv",
            editable: "#Fecha",
            required: "#Fecha",
        },
        Observacion: {
            visible: "#AgregadoDiv",
        },
        Proyecto: {
            visible: "#ProyectoDiv",
            editable: "#Proyecto",
            required: "#Proyecto",
        },
        tipoPrueba: {
            visible: "#PruebaDiv",
            editable: "#tipoPrueba",
            required: "#tipoPrueba",
        },
    }
};

