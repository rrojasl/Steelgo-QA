function SuscribirEventos() {
    suscribirEventoArea();
    suscribirEventoCuadrante();
}

SuscribirEventos();

function suscribirEventoArea() {
    $("#Proveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TransportistaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            AjaxCargarCuadrante($("#Area").data("kendoComboBox").value());
        }
    });
}