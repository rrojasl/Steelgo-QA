function SuscribirEventos() {
    suscribirEventoCarro();
    suscribirEventoGuardarCarro();
    suscribirEventoShotBlastero();
    suscribirEventoPintor();
    suscribirEventoComponente();
    SuscribirEventoSpoolID();
    suscribirEventoCuadrante();
    suscribirEventoDescargar();
    SuscribirEventoAgregar();
}

SuscribirEventos();

function suscribirEventoDescargar() {
    $('#CapturaAvanceDescargar').click(function (e) { 
        ajaxAplicarDescarga(currentDataItemGridDownload) 
        win.close();
    });
}

function suscribirEventoGuardarCarro() {
    $("#btnGuardarYNuevo, #btnGuardarYNuevo2").click(function () {
        if ($("#inputComponente").data("kendoComboBox").value() > 0) { 
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCarro(ds._data, true);
            Limpiar();
        }
        else {
            displayMessage("PinturaGuardarErrorComponente", "", '2');
        }
    });

    $('#btnGuardar, #Guardar, #botonGuardar, #btnGuardar4').click(function (e) {
        e.stopPropagation();
        
        if ($("#Guardar").text() == "Guardar") {
            if ($("#inputComponente").data("kendoComboBox").value() > 0) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                AjaxGuardarCarro(ds._data, false)
            }
            else {
                displayMessage("PinturaGuardarErrorComponente", "", '2');
            }
        }
        else if ($('#Guardar').text() == "Editar") {
            opcionHabilitarView(false, "FieldSetView")
        } 
    });
}

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');
  
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".botonDeplegaMenu").attr("disabled", true);
        $("#Guardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".botonDeplegaMenu").attr("disabled", false);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}
 
function suscribirEventoCuadrante() { 
    $("#inputCuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) { 
                displayMessage("NoExisteCuadrante", '', '2');
            }

            $("#inputCuadrante").focusout();
        }
    });

    //$("#inputCuadrante").blur(function () {
    //    $("#inputCuadrante").data("kendoComboBox").trigger("change");
    //}); 
}
 
function suscribirEventoCarro() {

    $("#inputCarro").kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID",
        suggest: true,
        filter: "contains", 
        change: function (e) { 
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) { 
                AjaxCargarSpool(dataItem.MedioTransporteID);
                $("#inputCarro").focusout();
            }
            else {
                displayMessage("NoExisteCarro", '', '2');
            }

        }
    });

    //$("#inputCarro").blur(function () {
    //    $("#inputCarro").data("kendoComboBox").trigger("change");
    //});
}

function suscribirEventoComponente() {

    $("#inputComponente").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PinturaComponenteComposicionID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                displayMessage("NoExisteComponente", '', '2');
            }
            $("#inputComponente").focusout();
        }
    });

    $("#inputComponente").blur(function () {
        $("#inputComponente").data("kendoComboBox").trigger("change");
    });
}

function suscribirEventoPintor() {

    $("#inputPintor").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        change: function (e) {

        }
    }).data("kendoMultiSelect");
    $('#inputPintor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) { 
                PlancharPintor($("#grid").data("kendoGrid").dataSource._data);
            }
        }

    });


}

function suscribirEventoShotBlastero() {

    $("#inputShotBlastero").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains"
    }).data("kendoMultiSelect");

    $('#inputShotBlastero').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {
                PlancharShotBlastero($("#grid").data("kendoGrid").dataSource._data);
            }
        }

    });
}

function SuscribirEventoAgregar() {
    $("#ButtonAgregar").click(function () {
        if ($("#InputID").data("kendoComboBox").value() > 0) {
            AjaxAgregarSpool($("#InputID").data("kendoComboBox").value());
        }
        else {
            displayMessage("PinturaCargaSeleccionaSpool", "", '1');
        }
    });
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3, 
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {

                }

            }
        }
    });


    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                loadingStart();
                $CapturaSoldadura.Soldadura.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                    $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);

                    loadingStop();
                });
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaSoldaduraMensajeOrdenTrabajo", "", '1');
            $("#InputOrdenTrabajo").focus();
        }
    });



    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource()
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
        else if (e.keyCode == 13) {
            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {
                AjaxAgregarSpool($("#InputID").data("kendoComboBox").value());
            }
        }

    });

    $("#InputID").blur(function () {
        $("#InputID").data("kendoComboBox").trigger("change");
    });
};

function Limpiar() {
    $("#InputCarro").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
     
    $("#grid").data('kendoGrid').dataSource.data([]);
}
