kendo.ui.Upload.fn._supportsDrop = function () { return false; };
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10007", { path: '/' });
CargaInicial();

var $PqrSaveModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        Nombre: {
            visible: "#PQRNombreDiv",
            editable: "#NombreId",
            required: "#NombreId",
        },
        PREHEAT: {
            visible: "#PQRPreheatDiv",
            editable: "#PREHEAT",
            required: "#PREHEAT",
        },
        PWHT: {
            visible: "#PQRPWHTDiv",
            editable: "#PWHT",
            required: "#PWHT",
        },
        EspesorRelleno: {
            visible: "#PQREspesoRellenorDiV",
            editable: "#EspesorRelleno",
            required: "#EspesorRelleno",
        },
        EspesorRaiz: {
            visible: "#PQREspesorRaizDiV",
            editable: "#EspesorRaiz",
            required: "#EspesorRaiz",
        },
        ProcesoSoldaduraRelleno: {
            visible: "#PQRProcesoSoldaduraRellenoDiv",
            editable: "#ProcesoSoldaduraRellenoID",
            required: "#ProcesoSoldaduraRellenoID",
        },
        ProcesoSoldaduraRaiz: {
            visible: "#PQRProcesoSoldaduraRaizDiv",
            editable: "#ProcesoSoldaduraRaizID",
            required: "#ProcesoSoldaduraRaizID",
        },
        NumeroP: {
            visible: "#PQRNumeroPDiv",
            editable: "#NumeroPID",
            required: "#NumeroPID",
        },
        GrupoPMaterialBase1: {
            visible: "#PQRGrupoPMaterialBase1Div",
            editable: "#GrupoPMaterialBase1ID",
            required: "#GrupoPMaterialBase1ID",
        },
        GrupoPMaterialBase2: {
            visible: "#PQRGrupoPMaterialBase2Div",
            editable: "#GrupoPMaterialBase2ID",
            required: "#GrupoPMaterialBase2ID",
        },
        Aporte: {
            visible: "#PQRAporteDiv",
            editable: "#AporteID",
            required: "#AporteID",
        },
        Mezcla: {
            visible: "#PQRMezclaDiv",
            editable: "#MezclaID",
            required: "#MezclaID",
        },
        Respaldo: {
            visible: "#PQRRespaldoDiv",
            editable: "#RespaldoID",
            required: "#RespaldoID",
        },
        GrupoF: {
            visible: "#PQRGrupoFDiv",
            editable: "#GrupoFID",
            required: "#GrupoFID",
        },
        Codigo: {
            visible: "#PQRCodigoDiv",
            editable: "#CodigoID",
            required: "#CodigoID",
        },
    }
};



function CargaInicial() {
    ConvierteCombos();
};


function ConvierteCombos() {
  
    $("#ProcesoSoldaduraRellenoID").kendoComboBox({
        dataTextField: "CodigoRelleno",
        dataValueField: "ProcesoSoldaduraRellenoID",
    });
    $("#ProcesoSoldaduraRaizID").kendoComboBox({
        dataTextField: "CodigoRelleno",
        dataValueField: "ProcesoSoldaduraRellenoID",
    });
    ObtenerListadoProcesoSoldaduraPopUpAjax();

    $("#NumeroPID").kendoComboBox({
        dataTextField: "NumeroP",
        dataValueField: "NumeroPID",
    });
    ObtenerListadoNumeroPPopUpAjax();

    $("#GrupoPMaterialBase1ID").kendoComboBox({
        dataTextField: "GrupoMaterialBase1",
        dataValueField: "GrupoMaterialBase1PID",
    });
    $("#GrupoPMaterialBase2ID").kendoComboBox({
        dataTextField: "GrupoMaterialBase1",
        dataValueField: "GrupoMaterialBase1PID",
    });
    ObtenerListadoGrupoPPPopUpAjax();

    $("#AporteID").kendoComboBox({
        dataTextField: "Aporte",
        dataValueField: "AporteID",
    });
    ObtenerListadoAportePopUpAjax();

    $("#MezclaID").kendoComboBox({
        dataTextField: "Mezcla",
        dataValueField: "MezclaID",
    });
    ObtenerListadoMezclaPopUpAjax();

    $("#RespaldoID").kendoComboBox({
        dataTextField: "Respaldo",
        dataValueField: "RespaldoID",
    });
    ObtenerListadoRespaldoPopUpAjax();

    $("#GrupoFID").kendoComboBox({
        dataTextField: "GrupoF",
        dataValueField: "GrupoFID",
    });
    ObtenerListadoGrupoFPopUpAjax();

    $("#CodigoID").kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "CodigoID",
    });
    ObtenerListadoCodigoPopUpAjax();
  

};




function validarRequeridosPQR() {
    var bool = true;
    $("#CamposRequeridosPQR .security_required").each(function (i, elem) {
        if (elem.tagName.toLowerCase() != 'label') {
            if (!$(this).val()) {
                bool = false;
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
            } else {
                $(this).closest("div").find("label").removeClass("error");
                $(this).closest("div").removeClass("clearfix");
            };
        };
    });
    return bool;
};
