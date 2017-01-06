﻿var windowSend;

function SuscribirEventos() {
    SuscribirEventoTab();
    suscribirEventoGuardarFolio();
    suscribirEventoEnviarEmbarque();
    SuscribirEventoImprimir();
}

function SuscribirEventoTab() {
    $("#btnPendientes").click(function (e) {
        $(".btn-tabList").removeClass("active");
        $("#btnPendientes").addClass("active");
        AjaxObtenerDetalleListadoEmbarque(1);
    });
    $("#btnTransito").click(function (e) {
        $(".btn-tabList").removeClass("active");
        $("#btnTransito").addClass("active");
        AjaxObtenerDetalleListadoEmbarque(2);
    });
}


function SuscribirEventoPopUPEnviarEmbarque() {
    var modalTitle = "Enviar Embarque";
    windowSend = $("#windowSend").kendoWindow({
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: true,
            width: "auto",
            minWidth: 30,
            actions: [ //"Pin", "Minimize", "Maximize", "Close"
            ],
    }).data("kendoWindow");

   // windowSend.center().open();
}

function SuscribirEventoImprimir() {
    $(document).on('click', '.imprimirPapelesCliente', function (e) {
        //AjaxImprimir();
    });

    $(document).on('click', '.imprimirPapelesAduana', function (e) {
        //AjaxImprimir();
    });
}



function suscribirEventoGuardarFolio() {
    $("#GuardarFolio").click(function () {
        if ($("#Folio").val() != "") {
            if (IndiceRenglon == 5) {
                ObjetoRenglon.FolioSolicitarPermisos = $("#Folio").val();
            }
            else if (IndiceRenglon == 6) {
                ObjetoRenglon.FolioAprobadoAduana = $("#Folio").val();
            }
            else if (IndiceRenglon == 7) {
                ObjetoRenglon.FolioAprobadoCliente = $("#Folio").val();
            }
        }
        $("#windowFolio").data("kendoWindow").close();
    });
}


function suscribirEventoEnviarEmbarque() {
    $("#EnviarEmbarque").click(function () {
        if (isDate($("#Fecha").val())) {
            if ($("#Fecha").val() != "") {
                ObjetoRenglon.FechaEnvio = $("#Fecha").val();
                AjaxGuardarPlanas(ObjetoRenglon);
            }
            $("#windowFecha").data("kendoWindow").close();
        }
        else {
            displayNotify("", "", "1");
        }
    });
}


function isDate(string) { //string estará en formato dd/mm/yyyy (dí­as < 32 y meses < 13)
    var expReg;
    if ($("#language").val() == "es-MX") {
        expReg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    }
    else {
        expReg = /([1-9]|1[012])[- /.]([1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
    }

    var res = expReg.test(string);
    return res;
}