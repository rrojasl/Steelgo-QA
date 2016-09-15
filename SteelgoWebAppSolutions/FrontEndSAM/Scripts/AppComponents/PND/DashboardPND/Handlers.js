function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoTipoPrueba();
    SuscribirEventoProveedor();
    SuscribirFechaInicio();
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            
        }
    });
}

function SuscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

        }
    });
}

function SuscribirEventoProveedor() {
    $("#inputProveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

        }
    });
}

function SuscribirFechaInicio() {
    $("#inputFechaInicio").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            
        }
    });
    //$("#inputFechaInicio").data("kendoDatePicker").setOptions({
    //    format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    //});

    $("#inputFechaFin").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            
        }
    });
    //$("#inputFechaFin").data("kendoDatePicker").setOptions({
    //    format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    //});
}