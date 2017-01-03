function SuscribirEventos() {
    SuscribirEventoTab();
    suscribirEventoModal();
    suscribirEventoGuardarFolio();
    suscribirEventoEnviarEmbarque();
    SuscribirEventoImprimir();
}

SuscribirEventos();

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


function suscribirEventoModal() {

    $(document).on('click', '.botonEnviar', function (e) {
        var grid = $("#grid").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem.Estatus != "Enviada" && dataItem.Estatus != "sent") {
            if (dataItem.FolioAprobadoCliente != "") {
                if (dataItem.FolioSolicitarPermisos != "" || dataItem.RequierePermisoAduana == 0) {
                    if (dataItem.FolioAprobadoAduana != "" || dataItem.RequierePermisoAduana == 0) {
                        if (dataItem.RequierePermisoAduana == 0) {
                            dataItem.FolioSolicitarPermisos = "";
                            dataItem.FolioAprobadoAduana = "";
                        }
                        VentanaModalFecha(dataItem);
                    }
                    else {
                        displayNotify("ListadoEmbarqueMensajeFaltaFolioAduana", "", "1");
                    }
                }
                else {
                    displayNotify("ListadoEmbarqueMensajeFaltaSolicitudPermisos", "", "1");
                }
            }
            else {
                displayNotify("ListadoEmbarqueMensajeFaltaFolioCliente", "", "1");
            }
        }
        else {
            displayNotify("ListadoEmbarqueMensajePlanaEnviada", "", "1");
        }

    });

    $(document).on('click', '.botonFolio', function (e) {
        var grid = $("#grid").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));
        var columnIndex = $(e.target).closest("tr")[0].cells.grid_active_cell.cellIndex;
        if (columnIndex == 5) {
            $("#Folio").val(dataItem.FolioSolicitarPermisos);
        }
        else if (columnIndex == 6) {
            $("#Folio").val(dataItem.FolioAprobadoAduana);
        }
        else if (columnIndex == 7) {
            $("#Folio").val(dataItem.FolioAprobadoCliente);
        }
        VentanaModalFolio(dataItem, columnIndex);
    });

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