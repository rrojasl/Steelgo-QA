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
    $('#inputCuadrante').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID ",
        suggest: true,
        index: 3
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
    $('#inputLote').kendoDropDownList({
        dataTextField: "NumeroLote",
        dataValueField: "LotePinturaID ",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaLote();
        }
    });
}

function SuscribirEventoComponenteComposicion() {
    $('#inputPinturaComponenteComposicion').kendoDropDownList({
        dataTextField: "Componente",
        dataValueField: "ComponenteID",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaComponenteComposicion();
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $('#inputSistemaPintura').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        index: 3,
        change: function () {
            AjaxComponenteComposicion();
        }

    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaSistemaPintura();
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

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputSpoolID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputSpoolID").val("");
                console.log("borrar datos");

                displayMessage("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputSpoolID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }
        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputSpoolID").val().length == 1) {
                $("#InputSpoolID").data("kendoComboBox").value(("00" + $("#InputSpoolID").val()).slice(-3));
            }
            if ($("#InputSpoolID").val() != '' && $("#InputPrefijoSpool").val() != '') {
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }
        }
    });

    $("#InputPrefijoSpool").blur(function (e) {
        if ($("#InputPrefijoSpool").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            $("#InputPrefijoSpool").focus();
        }
    });

    $("#InputPrefijoSpool").focus(function (e) {
        $("#InputPrefijoSpool").val("");
        $("#InputSpoolID").data("kendoComboBox").value("");
        $("#InputSpoolID").data("kendoComboBox").setDataSource();
    });

    $('#InputSpoolID').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputPrefijoSpool").focus();
        }
        else if (e.keyCode == 40) {
            $("#InputSpoolID").data("kendoComboBox").select();
        }
    });

}

function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function () {
        var _cuadranteId = $("#inputCuadrante").val();

        var _paso;

        if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
            _paso = 3;
        }
        else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
            _paso = 4;
        }
        AjaxMostrarCapturaAvanceIntAcabado(_cuadranteId, _paso);
    });
}

function SuscribirEventoGuardar() {
    $("#Guardar").click(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#Guardar').text() == "Guardar") {
            //   opcionHabilitarView(true, "FieldSetView");

            var _pasoId;
            if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
                _pasoId = 3;
            }
            else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
                _pasoId = 4;
            }

            AjaxGuardarCaptura(ds._data, _pasoId);
        }
        else if ($('#Guardar').text() == "Editar") {
            // opcionHabilitarView(false, "FieldSetView")
        }
    });
}

function SuscribirEventoColor() {
    $('#inputColor').kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "ColorID",
        suggest: true,
        index: 3
    });
    $('#inputColor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaColor();
        }
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        $("#FechaSoldadura").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");
        $('#ButtonAplicar').attr("disabled", true);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        $("#FechaSoldadura").data("kendoDatePicker").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");
        $('#ButtonAplicar').attr("disabled", false);
    }
}

