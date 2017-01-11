var windowSend;

function SuscribirEventos() {
    SuscribirEventoTab();
    SuscribirEventoEnviarEmbarque();
    SuscribirEventoImprimir();
    SuscribirEventoGuardar();
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
            visible: false,
            width: "500px",
            actions: [ //"Pin", "Minimize", "Maximize", "Close"
            ],
    }).data("kendoWindow");

    $("#btnEnviarEmbarque").click(function (e) {

    });

    $("#btnCerrarPopUp").click(function (e) {
        windowSend.close();
    })
}

function SuscribirEventoEnviarEmbarque() {
    $(document).on('click', '.enviarEmbarque', function (e) {
        windowSend.center().open();
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

function SuscribirEventoGuardar() {
    $(".accionGuardar").click(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            if (ds._data.length > 0) {
                AjaxGuardarCaptura(ds._data, 1);
            } else {
                displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
            }
        } else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "");
           
    });

    $(".accionGuardarNuevo").click(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (ds._data.length > 0) {
            AjaxGuardarCaptura(ds._data, 2);
        } else {
            displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
        }
    });
}

function opcionHabilitarView(valor, name) {
    if (valor){
        $('#FieldSetView').find('*').attr('disabled', true);

        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);

        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
        
}