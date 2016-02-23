function SuscribirEventos() {
    suscribirEventoArea();
    suscribirEventoCuadrante();
    suscribirEventoGuardar();
    suscribirEventoImprimirEtiqueta();
    suscribirEventoVer();
    suscribirEventoCambioImpreso();
}


SuscribirEventos();

function suscribirEventoCambioImpreso() {
    $('.radioBtnImpreso').change(function () {
        if ($('.radioBtnImpreso')[0].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }

                }
            }
        }
        else if ($('.radioBtnImpreso')[1].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(),2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }
                }
            }
        }
    });

    $('.radioBtnCaptura').change(function () {
        if ($('.radioBtnCaptura')[0].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }

                }
            }
        }
        else if ($('.radioBtnCaptura')[1].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }
                }
            }
        }
    });

    $('.radioBtnConCinta').change(function () {
        if ($('.radioBtnConCinta')[0].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }

                }
            }
        }
        else if ($('.radioBtnConCinta')[1].checked) {
            if ($("#Area").val() != "") {
                if ($("#Cuadrante").val() != "") {
                    if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                        AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
                    }
                    else {
                        $("#Area").data("kendoComboBox").value("");
                    }
                }
            }
        }
    });

}

function suscribirEventoArea() {
    $("#Area").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "AreaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
                AjaxCargarCuadrante($("#Area").data("kendoComboBox").value());
            }
            else {
                $("#Area").data("kendoComboBox").value("");
            }

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
            if ($("#Cuadrante").data("kendoComboBox").dataItem($("#Cuadrante").data("kendoComboBox").select()) != undefined) {
                AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), $('input:radio[name=Captura]:checked').val(), $('input:radio[name=ConCinta]:checked').val());
            }
            else {
                $("#Cuadrante").data("kendoComboBox").value("");
            }

        }
    });
}


function suscribirEventoGuardar() {

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data, "0");
            }
            else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
    });


}

function suscribirEventoVer() {

    $('#btnAgregar').click(function (e) {
        if ($("#Area").val() != "") {
            if ($("#Cuadrante").val() != "") {
                AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), $('input:radio[name=Captura]:checked').val(), $('input:radio[name=ConCinta]:checked').val());
            }
            else {
                displayMessage("EmbarqueMarcadoMensajeCuadrante", "", "1");
            }
        }
        else {
            displayMessage("EmbarqueMarcadoMensajeArea", "", "1");
        }
    });
}


function suscribirEventoImprimirEtiqueta() {

    $('#ImprimirEtiqueta').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, "1");
    });
}


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Area").data("kendoComboBox").enable(false);
        $("#Cuadrante").data("kendoComboBox").enable(false);
        $("#btnAgregar").prop('disabled', true);
        $(".radioImpreso").prop('disabled', true);

        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Area").data("kendoComboBox").enable(true);
        $("#Cuadrante").data("kendoComboBox").enable(true);
        $("#btnAgregar").prop('disabled', false);
        $(".radioImpreso").prop('disabled', false);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}