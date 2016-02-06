function SuscribirEventos() {
   
    
    SuscribirEventoCarro();
    SuscribirEventoCuadrante();
    SuscribirEventoGuardar();
    suscribirEventoDescargar();
};

function SuscribirEventoCarro() {
    $('#inputCarro').kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                $("#grid").data('kendoGrid').dataSource.data([]);
                ajaxObtenerDetalleMedioTransporteID(dataItem.MedioTransporteID);
            }
            else {
                displayMessage("NoExisteCarro", '', '2');
            }
        }
    });

    $("#inputCarro").blur(function () {
        $("#inputCarro").data("kendoComboBox").trigger("change");
    });
}

function SuscribirEventoCuadrante() {
    $('#inputCuadrante, #inputCuadrantePopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains" 
    });

    $('#inputCuadrante').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaCuadrante();
        }
    });
}

function suscribirEventoDescargar() {
    $('#CapturaAvanceDescargar').click(function (e) {
        ajaxAplicarDescarga(currentDataItemGridDownload)
        win.close();
    });
}

function SuscribirEventoGuardar() {

    $('#btnGuardarYNuevo').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        Limpiar();
    });

    $('#btnGuardar, #btnGuardar1, #Guardar1, #Guardar').click(function (e) {

        if ($('#botonGuardar2').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(true, "FieldSetView");
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        }
        else if ($('#botonGuardar2').text() == _dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });
};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".botonDeplegaMenu").attr("disabled", true);
        $("#inputCarro").data("kendoComboBox").enable(false);
        $("#inputCuadrante").data("kendoComboBox").enable(false);
        $('#botonGuardar4, #botonGuardar2').text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
         
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".botonDeplegaMenu").attr("disabled", false);
        $("#inputCarro").data("kendoComboBox").enable(true);
        $("#inputCuadrante").data("kendoComboBox").enable(true);
        $('#botonGuardar4, #botonGuardar2').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        
    }
}