function SuscribirEventos() {
    suscribirEventoGuardar();
    SuscribirEventoClikChekBoxGrid();
};

function SuscribirEventoClikChekBoxGrid()
{
   
  
}

function suscribirEventoGuardar() {
    
    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        //if ($('#botonGuardar').text() == "Guardar") {
        //    opcionHabilitarView(true, "FieldSetView");
        AjaxGuardarCaptura(ds._data);
        //}
        //else if ($('#botonGuardar').text() == "Editar")
        //    opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {



        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });
}