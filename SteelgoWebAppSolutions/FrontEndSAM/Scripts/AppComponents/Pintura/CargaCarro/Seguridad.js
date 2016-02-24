
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "61", { path: '/' });

var $CargaCarroModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        InputCarro: {
            visible: "#InputCarroDiv",
            editable: "#inputCarro",
        },
        InputID: {
            visible: "#InputIDDiv",
            editable: "#InputID",
            required: "#InputID",
        },
        InputNombre: {
            visible: "#InputNombreDiv",
            editable: "#InputNombre",
            required: "#InputNombre",
        },
        InputClasificacion: {
            visible: "#inputClasificacionDiv",
            editable: "#inputClasificacion",
            required: "#inputClasificacion",
        },
        InputPersistencia: {
            visible: "#inputPersistenciaDiv",
            editable: "#inputPersistencia",
            required: "#inputPersistencia",
        },
        InputPeso: {
            visible: "#inputPesoMaximoDiv",
            editable: "#inputPesoMaximo",
            required: "#inputPesoMaximo",
        },
        InputArea: {
            visible: "#inputAreaDiv",
            editable: "#inputArea",
            required: "#inputArea",
        },
        InputNoUsos: {
            visible: "#divNumeroVeces",
            editable: "#inputNumeroVeces",
            required: "#inputNumeroVeces",
        },


    }
};
