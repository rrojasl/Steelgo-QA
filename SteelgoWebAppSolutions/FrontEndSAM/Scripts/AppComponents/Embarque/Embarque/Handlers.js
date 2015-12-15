function SuscribirEventos() {
    suscribirEventoProveedor();
    suscribirEventoTracto();
    suscribirEventoChofer();
    suscribirEventoPlana();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
}

SuscribirEventos();


function suscribirEventoGuardar() {

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarPlanas(ds._data);
    });
}

function suscribirEventoAgregar() {

    $('#btnAgregar').click(function (e) {
        AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
    });
}


function suscribirEventoProveedor() {
    $("#Proveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TransportistaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            AjaxCargarTracto($("#Proveedor").data("kendoComboBox").value());
        }
    });
}

function suscribirEventoTracto() {
    $("#Tracto").kendoComboBox({
        dataTextField: "Placas",
        dataValueField: "VehiculoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            AjaxCargarChofer($("#Tracto").data("kendoComboBox").value());
        }
    });
}

function suscribirEventoChofer() {
    $("#Chofer").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ChoferID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            AjaxCargarPlana($("#Proveedor").data("kendoComboBox").value());
        }
    });
}

function suscribirEventoPlana() {
    $("#Plana").kendoComboBox({
        dataTextField: "Placas",
        dataValueField: "VehiculoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            //AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
        }
    });
}