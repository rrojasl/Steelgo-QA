
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "42", { path: '/' });

var $ArmadoModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        InputOrdenTrabajo: {
            visible: "#InputOrdenTrabajoDiv",
            editable: "#InputOrdenTrabajo",
        },
        InputID: {
            visible: "#InputIDDiv",
            editable: "#InputID",
        },
        Junta: {
            visible: "#JuntaDiv",
            editable: "#Junta",
        },
        FechaArmado: {
            visible: "#FechaArmadoDiv",
            editable: "#FechaArmado",
        },
        inputTaller: {
            visible: "#inputTallerDiv",
            editable: "#inputTaller",
        },
        inputTubero: {
            visible: "#inputTuberoDiv",
            editable: "#inputTubero",
        },
    }
};
