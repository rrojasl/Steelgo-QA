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

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (ds._data.length > 0) {
            if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarPlanas(ds._data);
            }
            else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }

    });
}

function suscribirEventoAgregar() {

    $('#btnAgregar').click(function (e) {
        if ($("#Plana").val() != "") {
            AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
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
            if ($("#Tracto").data("kendoComboBox").value() != "" && $("#Chofer").data("kendoComboBox").value() != "") {
                AjaxCargarDatosChofer($("#Tracto").data("kendoComboBox").value(), $("#Chofer").data("kendoComboBox").value());
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
        }
    });

    $('#Plana').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#Plana").val() != "") {
                AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
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
        
        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Chofer").data("kendoComboBox").enable(true);
        $("#Plana").data("kendoComboBox").enable(true);
        $("#Tracto").data("kendoComboBox").enable(true);
        $("#Proveedor").data("kendoComboBox").enable(true);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        
    }
}