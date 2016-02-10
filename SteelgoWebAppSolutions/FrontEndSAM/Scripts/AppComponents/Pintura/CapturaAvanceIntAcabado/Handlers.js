function SuscribirEventos() {
    SuscribirEventoCuadrante();
    SuscribirEventoPintor();
    SuscribirEventoLote();
    SuscribirEventoFecha();
    SuscribirEventoMostrar();
    SuscribirEventoGuardar();
    SuscribirEventoComponenteComposicion();
    SuscribirEventoColor();
    SuscribirEventoSistemaPintura();

};

function SuscribirEventoCuadrante() {
    $('#inputCuadrante').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID ",
        suggest: true,
        index: 3,
        change: function (e) {
            if ($("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#inputCuadrante").data("kendoComboBox").value("");
            }
        }
    });
}


function SuscribirEventoPintor() {
    var detallePintoresSeleccionados;

    $('#inputPintor').kendoMultiSelect({
        dataTextField: "Pintor",
        dataValueField: "ObreroID",
        suggest: true,
        index: 3,
        autoBind: false,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        },
        change: function (e) {
            //------------------modelo del pintor---------------------

            detallePintoresSeleccionados = e.sender._dataItems;
            //--------------------------------------------------------


        },
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaPintor(detallePintoresSeleccionados);
        }
    });
}

function SuscribirEventoLote() {
    $('#inputLote').kendoComboBox({
        dataTextField: "NumeroLote",
        dataValueField: "LotePinturaID ",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputLote").data("kendoComboBox").dataItem($("#inputLote").data("kendoComboBox").select()) != undefined) {
                PlanchaLote();
            }
            else {
                $("#inputLote").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoComponenteComposicion() {
    $('#inputPinturaComponenteComposicion').kendoComboBox({
        dataTextField: "Componente",
        dataValueField: "ComponenteID",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputPinturaComponenteComposicion").data("kendoComboBox").dataItem($("#inputPinturaComponenteComposicion").data("kendoComboBox").select()) != undefined) {
                PlanchaComponenteComposicion();
            }
            else {
                $("#inputPinturaComponenteComposicion").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventoSistemaPintura() {
    $('#inputSistemaPintura').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        index: 3,
        change: function () {
            AjaxComponenteComposicion();
        }

    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select()) != undefined) {
                PlanchaSistemaPintura();
            }
            else {
                $("#inputSistemaPintura").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventoFecha() {
    $("#inputFechaCapturaAvanceIntAcabado").kendoDatePicker({
        max: new Date()
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaFecha();
        }
    });
}

function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function () {
        var _cuadranteId = $("#inputCuadrante").val();
        if (_cuadranteId != "") {
            var _paso;

            if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
                _paso = 3;
            }
            else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
                _paso = 4;
            }
            AjaxMostrarCapturaAvanceIntAcabado(_cuadranteId, _paso);
        }
        else {
            displayMessage("ErrorCapturaAvanceIntAcabadoSeleccionarCuadrante", '', '2');
        }
    });
}

function SuscribirEventoGuardar() {
    $("#Guardar, #GuardarPie, #Guardar1, #btnGuardar").click(function () {
        if ($('#lblGuardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var _pasoId;
            if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
                _pasoId = 3;
            }
            else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
                _pasoId = 4;
            }
            AjaxGuardarCaptura(ds._data, _pasoId);
        }
        else if ($('#lblGuardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false, "FieldSetView")
        }
    });

}

function SuscribirEventoColor() {
    $('#inputColor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ColorID",
        suggest: true,
        index: 3
    });
    $('#inputColor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()) != undefined) {
                PlanchaColor();
            }
            else {
                $("#inputColor").data("kendoComboBox").value("");
            }

        }
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".botonDeplegaMenu").attr("disabled", true);
        $("input:radio[name=LLena]").prop('disabled', true);
        $("#inputCuadrante").data("kendoComboBox").enable(false);
        $("#inputColor").data("kendoComboBox").enable(false);
        $("#inputLote").data("kendoComboBox").enable(false);
        $("#inputFechaCapturaAvanceIntAcabado").data("kendoDatePicker").enable(false);
        $("#inputPintor").data("kendoMultiSelect").enable(false);
        $("#inputSistemaPintura").data("kendoComboBox").enable(false);
        $("#inputPinturaComponenteComposicion").data("kendoComboBox").enable(false);

        $("#lblGuardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $('#lblGuardarFooter').text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("input:radio[name=LLena]").prop('disabled', false);
        $(".botonDeplegaMenu").attr("disabled", true);
        $("#inputCuadrante").data("kendoComboBox").enable(true);
        $("#inputColor").data("kendoComboBox").enable(true);
        $("#inputLote").data("kendoComboBox").enable(true);
        $("#inputFechaCapturaAvanceIntAcabado").data("kendoDatePicker").enable(true);
        $("#inputPintor").data("kendoMultiSelect").enable(true);
        $("#inputSistemaPintura").data("kendoComboBox").enable(true);
        $("#inputPinturaComponenteComposicion").data("kendoComboBox").enable(true);

        $("#lblGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#lblGuardarFooter').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function Limpiar() {
    $("#InputCuadrante").val("");
    $("#InputColor").val("");
    $("#InputFechaCapturaAvanceIntAcabado").val("");
    $("#InputPintor").val("");
    $("#InputSistemaPintura").val("");
    $("#InputPinturaComponenteComposicion").val("");

    $("#grid").data('kendoGrid').dataSource.data([]);
}
