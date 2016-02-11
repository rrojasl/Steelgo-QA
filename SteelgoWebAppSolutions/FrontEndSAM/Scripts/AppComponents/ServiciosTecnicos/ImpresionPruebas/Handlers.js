function SuscribirEventos() {
    
    suscribirEventoGenerarReporte();
    suscribirEventoImprimir();
};


function suscribirEventoGenerarReporte() {
    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGenerarReporte(ds._data);
        //Limpiar();
    });


    $('#GuardarPie').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGenerarReporte(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGenerarReporte(ds._data);
        //Limpiar();
    });

}

function suscribirEventoImprimir() {
    $('#Imprimir').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxImprimir(ds._data);
       // alert("imprimir");
    });
}