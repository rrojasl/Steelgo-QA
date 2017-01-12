function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoFecha();
}

function SuscribirEventoProyecto() {
    $('#InputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                $("#InputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoFecha() {
    FechaInicio = $("#InputFechaInicio").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            ValidarFecha(e.sender._value)
        }
    });

    FechaFin = $("#InputFechaFin").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            ValidarFecha(e.sender._value)
        }
    });
}