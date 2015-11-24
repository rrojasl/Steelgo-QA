function SuscribirEventos() {
    SuscribirEventoComboPrueba();
    SuscribirEventoComboProveedor();
    suscribirEventoGuardar();
};

function SuscribirEventoComboPrueba() {
    $('#inputPrueba').kendoDropDownList({
        dataTextField: "Clave",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function () {
            AjaxProveedor(0);
        }
    });
    AjaxPruebas();
};

function SuscribirEventoComboProveedor() {
    $('#inputProveedor').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function () {
           
            AjaxCargarRequisicionAsignacion();
        },
        dataBound: function () {
            $(this.items()).each(function (index, item) {
                var model = $("#inputProveedor").data("kendoDropDownList").dataItem(index);


                $(item).attr("title",replaceAll( model.Capacidad,'°','\n'));
            });
        }
    });

    $('#inputProveedor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaProveedor();
        }
    });
   
};

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