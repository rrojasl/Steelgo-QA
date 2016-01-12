function SuscribirEventos() {
   
    
    SuscribirEventoCarro();
    SuscribirEventoCuadrante();
    SuscribirEventoGuardar();
};

function SuscribirEventoCarro() {
    $('#inputCarro').kendoDropDownList({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            ajaxObtenerDetalleMedioTransporteID(dataItem.MedioTransporteCargaID);
        }
    });
}

function SuscribirEventoCuadrante() {
    $('#inputCuadrante').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

function SuscribirEventoGuardar() {

    $('#btnGuardarYNuevo').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        Limpiar();
    });

    $('#btnGuardar').click(function (e) {

        if ($('#botonGuardar').text() == "Guardar") {
            opcionHabilitarView(true, "FieldSetView");
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
     
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
     
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");
    }
}