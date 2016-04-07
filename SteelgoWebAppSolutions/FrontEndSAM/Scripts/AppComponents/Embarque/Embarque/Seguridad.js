
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "49", { path: '/' });

var $EmbarqueModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {

        Proveedor: {
            visible: "#ProveedorDiv",
            editable: "#Proveedor",
            required: "#Proveedor"
        },
        Tracto: {
            visible: "#TractoDiv",
            editable: "#Tracto",
            required: "#Tracto"
        },
        Chofer: {
            visible: "#ChoferDiv",
            editable: "#Chofer",
            required: "#Chofer"
        },
        Plana: {
            visible: "#PlanaDiv",
            editable: "#Plana",
        }
    }
};

