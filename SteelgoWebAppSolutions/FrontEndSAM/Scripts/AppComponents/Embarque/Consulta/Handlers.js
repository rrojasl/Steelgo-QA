function SuscribirEventos() {
    suscribirEventoArea();
    suscribirEventoCuadrante();
}

SuscribirEventos();

function suscribirEventoArea() {
        $("#Area").kendoComboBox({
            dataTextField: "Nombre",
            dataValueField: "AreaID",
            suggest: true,
            filter: "contains",
            index: 3,
            change: function (e) {
                AjaxCargarCuadrante($("#Area").data("kendoComboBox").value());
            }
        });
}

function suscribirEventoCuadrante() {
    $("#Cuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value());
        }
    });
}