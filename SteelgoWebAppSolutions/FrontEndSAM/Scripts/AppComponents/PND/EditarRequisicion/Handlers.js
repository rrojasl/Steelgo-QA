function SuscribirEventos() {
    SuscribirEventoRequisicion();
    SuscribirEventoProyecto();
    SuscribirEventoTipoPrueba();
}

function SuscribirEventoRequisicion() {
    $("#inputRequisicion").kendoComboBox({
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
        }
    });    
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Proyecto",
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
    $("#inputPrueba").kendoComboBox({
        dataTextField: "TipoPrueba",
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