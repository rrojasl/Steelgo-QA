function SuscribirEventos() {
    SuscribirEventoComboProveedor();

    
};

function SuscribirEventoComboPrueba() {
    $('#inputPrueba').kendoDropDownList({
        dataTextField: "Clave",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3
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
        dataBound: function () {
            $(this.items()).each(function (index, item) {
                var model = $("#inputProveedor").data("kendoDropDownList").dataItem(index);

                $(item).attr("title", "" + model.Capacidad + "");
            });
        }
    });

    $('#inputProveedor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaProveedor();
        }
    });
   
};