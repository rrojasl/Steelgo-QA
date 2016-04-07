var endRangeDateI0;
var endRangeDateI1;
var EspesorRellenoPQR;
var TotalPasosSoldadura = 1;
var $SoldadorCertificacionSaveModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        CodigoObrero: {
            visible: "#DivCodigoObrero",
            editable: "#SoldadorCertificacionCargarObreroID",
            required: "#SoldadorCertificacionCargarObreroID"
        },
        NombrePQR: {
            visible: "#DivNombrePQR",
            editable: "#SoldadorCertificacionCargarPQRID",
            required: "#SoldadorCertificacionCargarPQRID"
        },
        ProcesoSoldadura: {
            visible: "#DivProcesoSoldadura",
            editable: "#SoldadorCertificacionProcesoSoldaduraID",
            required: "#SoldadorCertificacionProcesoSoldaduraID"
        },
        TipoDePrueba: {
            visible: "#DivTipoDePrueba",
            editable: "#SoldadorCertificacionTipoDePruebaID",
            required: "#SoldadorCertificacionTipoDePruebaID"
        },
        Posicion: {
            visible: "#DivPosicion",
            editable: "#SoldadorCertificacionPosicionID",
            required: "#SoldadorCertificacionPosicionID"
        },
        FechaInicioCertificado: {
            visible: "#DivFechaInicio",
            editable: "#SoldadorCertificacionFechaInicio",
            required: "#SoldadorCertificacionFechaInicio"
        },
        FechaFinCertificado: {
            visible: "#DivFechaFin",
            editable: "#SoldadorCertificacionFechaFin",
            required: "#SoldadorCertificacionFechaFin"
        },
        CedulaTubo: {
            visible: "#DivCedulaTubo",
            editable: "#SoldadorCertificacionCedulaTuboID",
            required: "#SoldadorCertificacionCedulaTuboID"
        },
        DiametroCalificado: {
            visible: "#DivDiametroCalificado",
            editable: "#SoldadorCertificacionDiametroCalificadoID",
            required: "#SoldadorCertificacionDiametroCalificadoID"
        },
        EspesorMinimo: {
            visible: "#DivEspesorMinimo",
            editable: "#SoldadorCertificacionEspesorMaximoID",
            required: "#SoldadorCertificacionEspesorMaximoID"
        },
        EspesorMaximo: {
            visible: "#DivEspesorMaximo",
            editable: "#SoldadorCertificacionEspesorMinimoID",
            required: "#SoldadorCertificacionEspesorMinimoID"
        },
        PorcentajeJuntasRequiere: {
            visible: "#DivPorcentajeJuntas",
            editable: "#SoldadorCertificacionPorcentajeJuntas",
            required: "#SoldadorCertificacionPorcentajeJuntas"
        }
    }
};

kendo.ui.Upload.fn._supportsDrop = function () { return false; };
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10010", { path: '/' });
CargaInicial();

function CargaInicial() {
    ObtenerListadoObrerosPopUpAjax();
    ObtenerListadoPQRPopUpAjax();
    ObtenerListadoProcesoSoldaduraAjax();
    ObtenerListadoTipoDePruebaAjax();
    ObtenerListadoPosicionAjax();
    //VentanaModalPasosSoldadura();
    CargarCalendarios();
};




function CrearDropDownListObrero() {
    $("#SoldadorCertificacionCargarObreroID").kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID"
    });
};
function CrearDropDownListPQR() {

    $("#SoldadorCertificacionCargarPQRID").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        select: function (e) {
         
            dataItem = this.dataItem(e.item.index());
            var PQRIDBuscar = dataItem.PQRID;
            ObtenerEspesoresPQRAjax(PQRIDBuscar);
        },
       

    });


};
function CrearDropDownListProcesoSoldadura() {

    $("#SoldadorCertificacionProcesoSoldaduraID").kendoComboBox({
        dataTextField: "CodigoRelleno",
        dataValueField: "ProcesoSoldaduraRellenoID",
    });

};
function CrearDropDownListTipoDePrueba() {

    $("#SoldadorCertificacionTipoDePruebaID").kendoComboBox({
        dataTextField: "TipoDePrueba",
        dataValueField: "TipoDePruebaID"
    });

};
function CrearDropDownListPosicion() {

    $("#SoldadorCertificacionPosicionID").kendoComboBox({
        dataTextField: "Posicion",
        dataValueField: "PosicionID"
    });
};






function ControlErroresObjetosComboBox(control, data) {
    if (Error(data)) {
        $("#" + control).data("kendoComboBox").dataSource.data(data);
        $("#" + control).data("kendoComboBox").select(0);
    } else {
        $("#" + control).data("kendoComboBox").dataSource.data([]);
    };
};
function validarRequeridosSoldadorCertificacion() {
    var bool = true;
    $("#CamposRequeridosSoldadorCertificacion .security_required").each(function (i, elem) {
        if (elem.tagName.toLowerCase() != 'label' && elem.tagName.toLowerCase() != 'span') {

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


function ValidaFormatoFecha(FechaValidar, Idioma) {

    //Valida que el formato de la fecha sea correcto (2-2-4)
    var bool;
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((String(FechaValidar).trim().match(RegExPattern)) && (FechaValidar != '')) {

        if (Idioma == 'es-MX') {

            if (existeFechaMexicoFormato(FechaValidar) && existeFechaMexico(FechaValidar)) {
                bool = true;
            }
            else {
                bool = false
            }
        }
        else if (Idioma == 'en-US') {

            if (existeFechaEUFormato(FechaValidar) && existeFechaEU(FechaValidar)) {
                bool = true;
            }
            else {
                bool = false
            }

        }
    } else {

        bool = false;
    }
    return bool;

}

function existeFechaMexicoFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[0];
    var m = fechaf[1];
    var y = fechaf[2];
    
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();


}

function existeFechaMexico(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[0];
    var month = FechaValidar[1];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function existeFechaEUFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[1];
    var m = fechaf[0];
    var y = fechaf[2];
   
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function existeFechaEU(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[1];
    var month = FechaValidar[0];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function CargarCalendarios() {
    //#region LLenacontrolfechaInicio

    if (endRangeDateI0 == undefined) {
        endRangeDateI0 = $("#SoldadorCertificacionFechaInicio").kendoDatePicker({
        });
    };
    //#endregion
    //#region LllenaControlFechaFin
    if (endRangeDateI1 == undefined) {
        endRangeDateI1 = $("#SoldadorCertificacionFechaFin").kendoDatePicker({
        });
    };
    //#endregion


};

function AsignarValoresItemSeleccionado() {
    //#region  ObtieneIDSoldadorCertificacion
    $("#SoldadorCertificacionID").val(currentDataItem.SoldadorCertificacionID);
    //#endregion

    //#region ObtenerObreros
    var CMBObreroID = $("#SoldadorCertificacionCargarObreroID").data("kendoComboBox");
    CMBObreroID.value(currentDataItem.ObreroID);

    //#endregion

    //#region ObtenerPQR
    var CMBPQRD = $("#SoldadorCertificacionCargarPQRID").data("kendoComboBox");
    CMBPQRD.value(currentDataItem.PQRID);
    //#endregion

    //#region ObtenerProcesoSoldadura
    var CMBPProcesoSoldadura = $("#SoldadorCertificacionProcesoSoldaduraID").data("kendoComboBox");
    CMBPProcesoSoldadura.value(currentDataItem.ProcesoSoldaduraID);
    //#endregion

    //#region ObtenerProcesoSoldadura
    var CMBPPosicion = $("#SoldadorCertificacionPosicionID").data("kendoComboBox");
    CMBPPosicion.value(currentDataItem.PosicionID);
    //#endregion

    //#region ObtenerTipoPruebas
    var CMBPTipoPruebas = $("#SoldadorCertificacionTipoDePruebaID").data("kendoComboBox");
    CMBPTipoPruebas.value(currentDataItem.TipoDePruebaID);
    //#endregion

    //#region LLenacontrolfechaInicio

    endRangeDateI0.val(currentDataItem.FechaInicioCertificado);

    //#endregion

    //#region LllenaControlFechaFin

    endRangeDateI1.val(currentDataItem.FechaFinCertificado);

    //#endregion

    //#region LlenaEspesorMinimo
    $("#SoldadorCertificacionEspesorMinimoID").val(currentDataItem.EspesorMinimo);
    //#endregion

    //#region LlenaCedulaTuboCalificado
    $("#SoldadorCertificacionCedulaTuboID").val(currentDataItem.CedulaTuboCalificado);
    //#endregion

    //#region LlenaDiametroCalificado
    $("#SoldadorCertificacionDiametroCalificadoID").val(currentDataItem.DiametroCalificado);
    //#endregion

    //#region LlenaEspesorMaximo
    $("#SoldadorCertificacionEspesorMaximoID").val(currentDataItem.EspesorMaximo);
    //#endregion

    //#region LlenaPorcentaje
    $("#SoldadorCertificacionPorcentajeJuntas").val(currentDataItem.PorcentajeJuntasRequiere);
    //#endregion

    //#region Certificacion
    var ChkCertificado = currentDataItem.CertificadoActivo;
    if (ChkCertificado == 'SI') {

        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#chkSoldadorCertificacionCertificacion"), data);
    }
    else {
        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#chkSoldadorCertificacionCertificacion"), data);
    }

    //#endregion

    //#region PasosSoldadura
    $("#SoldadorCertificacionPasosDeSoldadura").val(currentDataItem.PasosSoldadura);
    //#endregion

};

function CalcularEspesorMaximo(EspesorRellenoPQR) {

    if (EspesorRellenoPQR > .5) {
        loadingStart();
        VentanaModalPasosSoldadura();
        $("#windowPasosSoldadura").show();



        
    }
    else {
        var EspesorMaximo = EspesorRellenoPQR * 2;
        $("#SoldadorCertificacionEspesorMaximoID").val(EspesorMaximo);
    }
    loadingStop();

};

function VentanaModalPasosSoldadura() {
    var modalTitle = "";
    modalTitle = "Pasos de soldadura";
    var window = $("#windowPasosSoldadura");

        win = window.kendoWindow({
            actions: "",
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: false,
            width: "50%",
            minWidth: 660,
            position: {
                top: "10%",
                left: "20%"
            }
        }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function CalcularEspesorMaximoMayoraCinco(VarPasosSoldadura) {

    if (VarPasosSoldadura > 3) {
        var EspesorMaximo = 999999;
        $("#SoldadorCertificacionEspesorMaximoID").val(EspesorMaximo)
    }
    else {
        
        var EspesorMaximo = EspesorRellenoPQR * 2;
        $("#SoldadorCertificacionEspesorMaximoID").val(EspesorMaximo);
    }

};
















