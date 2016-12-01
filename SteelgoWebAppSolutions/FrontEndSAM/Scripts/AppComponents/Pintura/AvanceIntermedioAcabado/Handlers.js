function SuscribirEventos() {
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoPintor();
    SuscribirEventoLote();
    SuscribirEventoFecha();
    SuscribirEventoMostrar();
    SuscribirEventoGuardar();
    SuscribirEventoComponenteComposicion();
    SuscribirEventoColor();
    SuscribirEventoSistemaPintura();
    SuscribirEventoPlanchar();
    SuscribirEventoOrdenTrabajo();
    SuscribirEventoSpoolID();
    suscribirEventoAgregar();
};

function suscribirEventoAgregar() {
    $("#btnAgregar").click(function (e) {
        ajaxAgregarSpool();
    });
};


function SuscribirEventoPlanchar() {
    $("#ButtonPlanchar").click(function (e) {
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                windowTemplate = kendo.template($("#windowTemplate").html());

                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                    visible: false, //the window will not appear before its .open method is called
                    width: "auto",
                    height: "auto",
                    modal: true
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    plancharTodo();
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
            else {
                plancharTodo();
            }
        }
    });
}

function plancharTodo() {


    if ($("#inputPintor").data("kendoMultiSelect")._dataItems.length > 0) {
        PlanchaPintor($("#inputPintor").data("kendoMultiSelect")._dataItems);
    }
    //if ($("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()) != undefined) {
    //    PlanchaColor();
    //}
    //if ($("#inputLote").data("kendoComboBox").dataItem($("#inputLote").data("kendoComboBox").select()) != undefined) {
    //    PlanchaLote();
    //}
    //if ($("#inputPinturaComponenteComposicion").data("kendoComboBox").dataItem($("#inputPinturaComponenteComposicion").data("kendoComboBox").select()) != undefined) {
    //    PlanchaComponenteComposicion();
    //}
    //if ($("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select()) != undefined) {
    //    PlanchaSistemaPintura();
    //}
    //if ($("#inputFechaCapturaAvanceIntAcabado").val() != "") {
    //    PlanchaFecha();
    //}
    if ($("#inputFechaCapturaAvanceIntAcabado").val() != "") {
        PlanchaFecha();
    }

}

function SuscribirEventoZona() {
    $("#inputZona").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
             
                    //$("#grid").data('kendoGrid').dataSource.data([]);
                    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
                    $("#inputCuadrante").data("kendoComboBox").value("");
                    $("#inputSistemaPintura").data("kendoComboBox").value("");
                    $("#inputColor").data("kendoComboBox").value("");

                    AjaxCuadrante(dataItem.ZonaID);
            }
            //else {
            //    $("#inputSistemaPintura").data("kendoComboBox").value("");
            //}
        }
    });
}

function SuscribirEventoCuadrante() {
    $('#inputCuadrante').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID ",
        suggest: true,
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                var hacerAjax = false;
                //if (dataItem.ZonaID != 0)
                hacerAjax = true;

                if (hacerAjax) {
                    //$("#grid").data('kendoGrid').dataSource.data([]);
                    $("#inputSistemaPintura").data("kendoComboBox").value("");
                    $("#inputColor").data("kendoComboBox").value("");

                    AjaxSistemaPintura($("#inputZona").data("kendoComboBox").value(), dataItem.CuadranteID);



                }
            }
            //if ($("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()) != undefined) {
            //}
            //else {
            //    $("#inputCuadrante").data("kendoComboBox").value("");
            //}
        }
    });
}


function SuscribirEventoSistemaPintura() {
    $('#inputSistemaPintura').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                var hacerAjax = false;
                //if (dataItem.ZonaID != 0)
                hacerAjax = true;

                if (hacerAjax) {
                    //$("#grid").data('kendoGrid').dataSource.data([]);
                    $("#inputColor").data("kendoComboBox").value("");

                    AjaxColores($("#inputZona").data("kendoComboBox").value(), $("#inputCuadrante").data("kendoComboBox").value(), dataItem.SistemaPinturaID);



                }
            }
            //if ($("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select()) != undefined) {
            //    ////ajaxComponenteComposicion();
            //}
            //else {
            //    $("#inputSistemaPintura").data("kendoComboBox").value("");
            //}

        }

    });
}

function SuscribirEventoOrdenTrabajo() {
    //$("#OrdenTrabajoAdd").kendoNumericTextBox({
    //    //max: new Date()
    //});

    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        delay: 10,
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
                if (dataItem.Status != "1") {
                    e.preventDefault();
                    $("#InputID").val("");
                    var cadenaError = "";
                    if (dataItem.HabilitadoHoldFecha == 0) {
                        cadenaError = _dictionary.MensajeErrorSpoolHold[$("#language").data("kendoDropDownList").value()];
                    }
                    else
                        cadenaError = dataItem.Status;


                    displayNotify("", cadenaError, '1');
                    return;
                }
                else {
                    $("#InputID").val(dataItem.IDValido);
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxObtenerListaTubero();
                    AjaxObtenerListaTaller();
                }
            }
        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else $("#InputID").data("kendoComboBox").value("");
        }
    });

}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        delay: 10,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                $("#InputID").data("kendoComboBox").value("");
            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                $("#InputID").data("kendoComboBox").enable(false);
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '2');

            }
        } else {
            displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            //$("#InputOrdenTrabajo").focus();
        }
    });


    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) {
            if ($('#InputID').data("kendoComboBox").value() != undefined) {

            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("PinturaCargaNoExisteSpoolID", '', '2');
            }
        }
    });

}


function SuscribirEventoPintor() {
    var detallePintoresSeleccionados;

    $('#inputPintor').kendoMultiSelect({
        dataTextField: "Pintor",
        dataValueField: "ObreroID",
        dataSource: [{ Pintor: "T-239 - Josue Gonzales", ObreroID: "1" }, { Pintor: "T-001 Tomas Edison", ObreroID: "1" }],
        suggest: true,
        index: 3,
        autoBind: false,
        change: function (e) {
            //------------------modelo del pintor---------------------
            detallePintoresSeleccionados = e.sender._dataItems;
            //--------------------------------------------------------
        },
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            //PlanchaPintor(detallePintoresSeleccionados);
        }
    });
}

function SuscribirEventoLote() {
    $('#inputLote').kendoComboBox({
        dataTextField: "NumeroLote",
        dataValueField: "LotePinturaID ",
        suggest: true,
        index: 3,
        change: function (e) {
            if ($("#inputLote").data("kendoComboBox").dataItem($("#inputLote").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#inputLote").data("kendoComboBox").value("");
            }
        }
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputLote").data("kendoComboBox").dataItem($("#inputLote").data("kendoComboBox").select()) != undefined) {
                //PlanchaLote();
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
        index: 3,
        change: function (e) {
            if ($("#inputPinturaComponenteComposicion").data("kendoComboBox").dataItem($("#inputPinturaComponenteComposicion").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputPinturaComponenteComposicion").data("kendoComboBox").value("");
            }
        }
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputPinturaComponenteComposicion").data("kendoComboBox").dataItem($("#inputPinturaComponenteComposicion").data("kendoComboBox").select()) != undefined) {
                //PlanchaComponenteComposicion();
            }
            else {
                $("#inputPinturaComponenteComposicion").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventoFecha() {
    endRangeDate = $("#inputFechaCapturaAvanceIntAcabado").kendoDatePicker({
        max: new Date()
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            //PlanchaFecha();
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
            ajaxMostrarCapturaAvanceIntAcabado(_cuadranteId, _paso);
        }
        else {
            //displayMessage("ErrorCapturaAvanceIntAcabadoSeleccionarCuadrante", '', '2');
        }
    });
}

function SuscribirEventoGuardar() {
    $("#Guardar, #GuardarPie, #Guardar1, #btnGuardar").click(function () {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var _pasoId;
            if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
                _pasoId = 3;
            }
            else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
                _pasoId = 4;
            }
            ajaxGuardarCaptura(ds._data, _pasoId);
        }
        else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false, "FieldSetView")
        }
    });
}

function SuscribirEventoColor() {
    $('#inputColor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ColorID",
        suggest: true,
        index: 3,
        change: function (e) {
            if ($("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputColor").data("kendoComboBox").value("");
            }
        }
    });
    $('#inputColor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()) != undefined) {
                //PlanchaColor();
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
        //$(".botonDeplegaMenu").attr("disabled", true);
        $("input:radio[name=LLena]").prop('disabled', true);
        $("#inputCuadrante").data("kendoComboBox").enable(false);
        $("#inputColor").data("kendoComboBox").enable(false);
        //$("#inputLote").data("kendoComboBox").enable(false);
        $("#inputFechaCapturaAvanceIntAcabado").data("kendoDatePicker").enable(false);
        $("#inputPintor").data("kendoMultiSelect").enable(false);
        $("#inputSistemaPintura").data("kendoComboBox").enable(false);
        //$("#inputPinturaComponenteComposicion").data("kendoComboBox").enable(false);

        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("input:radio[name=LLena]").prop('disabled', false);
        
        $("#inputCuadrante").data("kendoComboBox").enable(true);
        $("#inputColor").data("kendoComboBox").enable(true);
        //$("#inputLote").data("kendoComboBox").enable(true);
        $("#inputFechaCapturaAvanceIntAcabado").data("kendoDatePicker").enable(true);
        $("#inputPintor").data("kendoMultiSelect").enable(true);
        $("#inputSistemaPintura").data("kendoComboBox").enable(true);
        //$("#inputPinturaComponenteComposicion").data("kendoComboBox").enable(true);

        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
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