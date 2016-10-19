
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10007", { path: '/' });

var $PQRModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        Nombre: {
            visible: "#lblPQRNombre",
            editable: "#NombreId",
            required: "#NombreId",
        },
        PREHEAT: {
            visible: "#lblPQRPREHEAT",
            editable: "#chkPreheat",
            required: "#chkPreheat",
        },
        PWHT: {
            visible: "#lblPQRPWHT",
            editable: "#chkPwht",
            required: "#chkPwht",
        },
        EspesorRelleno: {
            visible: "#lblPQREspesorRelleno",
            editable: "#EspesorRelleno",
            required: "#EspesorRelleno",
        },
        EspesorRaiz: {
            visible: "#lblPQREspesorRaiz",
            editable: "#EspesorRaiz",
            required: "#EspesorRaiz",
        },
        ProcesoSoldaduraRelleno: {
            visible: "#lblPQRProcesoSoldaduraRelleno",
            editable: "#ProcesoSoldaduraRellenoID",
            required: "#ProcesoSoldaduraRellenoID",
        },
        ProcesoSoldaduraRaiz: {
            visible: "#lblPQRProcesoSoldaduraRaiz",
            editable: "#ProcesoSoldaduraRaizID",
            required: "#ProcesoSoldaduraRaizID"
        },
        GrupoPMaterialBase1: {
            visible: "#lblPQRGrupoPMaterialBase1",
            editable: "#GrupoPMaterialBase1ID",
            required: "#GrupoPMaterialBase1ID",
        },
        GrupoPMaterialBase2: {
            visible: "#lblPQRGrupoPMaterialBase2",
            editable: "#GrupoPMaterialBase2ID",
            required: "#GrupoPMaterialBase2ID",
        },
        Codigo: {
            visible: "#lblPQRCodigo",
            editable: "#CodigoID",
            required: "#CodigoID",
        }
    }
};
