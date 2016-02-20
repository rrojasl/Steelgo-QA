function SuscribirEventos() {
    suscribirEventoProveedor();
    suscribirEventoTracto();
    suscribirEventoChofer();
    suscribirEventoPlana();
    suscribirEventoAgregar();
    suscribirEventoDestino();
    suscribirEventoGuardar();
}

SuscribirEventos();


function suscribirEventoGuardar() {

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if ($("#Tracto").data("kendoComboBox").dataItem($("#Tracto").data("kendoComboBox").select()) != undefined) {
            if ($("#Chofer").data("kendoComboBox").dataItem($("#Chofer").data("kendoComboBox").select()) != undefined) {
                if ($("#Destino").data("kendoComboBox").dataItem($("#Destino").data("kendoComboBox").select()) != undefined) {
                    if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                        opcionHabilitarView(true, "FieldSetView");
                        AjaxGuardarPlanas(ds._data);
                    }
                    else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                        opcionHabilitarView(false, "FieldSetView")
                    }
            }
            else {
                displayMessage("", "Debe seleccionar un Destino", "1");
            }
            }
            else {
                displayMessage("", "Debe seleccionar un Chofer", "1");
            }
        }
        else {

            displayMessage("", "Debe seleccionar un tracto", "1");
        }
    });
}

function suscribirEventoAgregar() {

    $('#btnAgregar').click(function (e) {
        if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
            AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
        }
        else {
            $("#Plana").data("kendoComboBox").value("");
        }
        
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
            if ($("#Proveedor").data("kendoComboBox").dataItem($("#Proveedor").data("kendoComboBox").select()) != undefined) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                $("#Tracto").data("kendoComboBox").value("");
                $("#Chofer").data("kendoComboBox").value("");
                $("#Plana").data("kendoComboBox").value("");
                $("#Destino").data("kendoComboBox").value("");
                AjaxCargarTracto($("#Proveedor").data("kendoComboBox").value());
            }
            else {
                $("#Proveedor").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoDestino() {
    $("#Destino").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DestinoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Destino").data("kendoComboBox").dataItem($("#Destino").data("kendoComboBox").select()) != undefined) {
                
            }
            else {
                $("#Destino").data("kendoComboBox").value("");
            }
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
            if ($("#Tracto").data("kendoComboBox").dataItem($("#Tracto").data("kendoComboBox").select()) != undefined) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                $("#Chofer").data("kendoComboBox").value("");
                $("#Plana").data("kendoComboBox").value("");
                $("#Destino").data("kendoComboBox").value("");
                AjaxCargarChofer($("#Tracto").data("kendoComboBox").value());
            }
            else {
                $("#Tracto").data("kendoComboBox").value("");
            }
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
            if ($("#Chofer").data("kendoComboBox").dataItem($("#Chofer").data("kendoComboBox").select()) != undefined) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                
                $("#Plana").data("kendoComboBox").value("");
                AjaxCargarPlana($("#Proveedor").data("kendoComboBox").value());
                AjaxCargarDatosChofer($("#Tracto").data("kendoComboBox").value(), $("#Chofer").data("kendoComboBox").value());
            }
            else {
                $("#Chofer").data("kendoComboBox").value("");
            }
        }

    });
}

function suscribirEventoPlana() {
    $("#Plana").kendoComboBox({
        dataTextField: "Placas",
        dataValueField: "EmbarquePlanaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
                AjaxCargarDestino($('#Plana').data("kendoComboBox").dataSource._data[$('#Plana').data("kendoComboBox").selectedIndex].ProyectoID);
            }
            else {
                $("#Plana").data("kendoComboBox").value("");
            }
        }
    });

    $('#Plana').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
                AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
                AjaxCargarDestino($('#Plana').data("kendoComboBox").dataSource._data[$('#Plana').data("kendoComboBox").selectedIndex].ProyectoID);
                }
                else {
                    $("#Plana").data("kendoComboBox").value("");
                }
        }
    });

}


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Chofer").data("kendoComboBox").enable(false);
        $("#Plana").data("kendoComboBox").enable(false);
        $("#Tracto").data("kendoComboBox").enable(false);
        $("#Proveedor").data("kendoComboBox").enable(false);
        $("#Destino").data("kendoComboBox").enable(false);
        $("#btnAgregar").prop('disabled', true);

        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Chofer").data("kendoComboBox").enable(true);
        $("#Plana").data("kendoComboBox").enable(true);
        $("#Tracto").data("kendoComboBox").enable(true);
        $("#Proveedor").data("kendoComboBox").enable(true);
        $("#Destino").data("kendoComboBox").enable(true);
        $("#btnAgregar").prop('disabled', false);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}