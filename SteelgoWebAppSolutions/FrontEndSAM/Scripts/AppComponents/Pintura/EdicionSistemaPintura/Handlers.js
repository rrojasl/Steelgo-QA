function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoSistemaPintura();
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

            if (dataItem != undefined) {
                
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            } else {
                $("#inputSistemaPintura").data("kendoComboBox").value("");
            }
        }
    });
}