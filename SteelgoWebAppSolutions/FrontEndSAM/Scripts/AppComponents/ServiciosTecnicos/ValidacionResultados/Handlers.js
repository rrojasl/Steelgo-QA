function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoVer();
    suscribirEventoCancelar();
    suscribirEventoRequisicion();
}

SuscribirEventos();

function suscribirEventoGuardar() {

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data);
    });

    $('#GuardarDefectos').click(function (e) {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
            AjaxGuardarDefectos(ds._data);  
    });

}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}


function suscribirEventoVer() {

    $('#btnVer').click(function (e) {
        if ($("#Requisicion").val() != "") {
            AjaxObtenerJuntas();
        }
        else {
            displayMessage("ValidacionResultadosMensajeCampoRequisicionVacio", "", "1");
        }
    });
}


function Limpiar() {

    $("#Requisicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function suscribirEventoRequisicion() {
    $("#Requisicion").keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#Requisicion").val() != "") {
                AjaxObtenerJuntas();
            }
            else {
                displayMessage("ValidacionResultadosMensajeCampoRequisicionVacio", "", "1");
            }
            
        }
    });
}


