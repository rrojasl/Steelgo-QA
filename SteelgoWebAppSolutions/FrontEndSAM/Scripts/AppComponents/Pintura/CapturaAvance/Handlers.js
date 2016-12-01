function SuscribirEventos() {
    suscribirEventoCarro();
    suscribirEventoGuardarCarro();
    suscribirEventoShotBlastero();
    suscribirEventoPintor();
    suscribirEventoComponente();
    SuscribirEventoSpoolID();
    suscribirEventoCuadrante();
    suscribirEventoCuadrante1();
    suscribirEventoDescargar();
    SuscribirEventoAgregar();
    SuscribirEventoPlanchar();
    suscribirEventoChangeRadio();
    SuscribirEventoMostrar();
}

SuscribirEventos();





function SuscribirEventoPlanchar() {
    $("#ButtonPlanchar").click(function (e) {
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                windowTemplate = kendo.template($("#windowTemplate").html());

                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.PinturaCargaTitulo[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasPlancharTodos[$("#language").data("kendoDropDownList").value()] +
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
        PlancharPintor($("#grid").data("kendoGrid").dataSource._data);
    }
    if ($("#inputShotBlastero").data("kendoMultiSelect")._dataItems.length > 0) {
        PlancharShotBlastero($("#grid").data("kendoGrid").dataSource._data);
    }
    if ($("#FechaShotBlast").val() != "") {
        PlanchaFechaShotblast();
    }
    if ($("#Fechaprimario").val() != "") {
        PlanchaFechaPrimario();
    }
    //if ($("#inputCuadrante1").data("kendoComboBox").dataItem($("#inputCuadrante1").data("kendoComboBox").select()) != undefined) {
    //    PlanchaCuadranteDescarga();
    //}

}

function suscribirEventoDescargar() {
    $('#CapturaAvanceDescargar').click(function (e) {
        ajaxAplicarDescarga(currentDataItemGridDownload)
        win.close();
    });
}

function suscribirEventoGuardarCarro() {
    $("#btnGuardarYNuevo, #btnGuardarYNuevo2").click(function () {
        
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCarro(ds._data, true);
            Limpiar();
     });

    $('.accionGuardar').click(function (e) {
        e.stopPropagation();


        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
              //opcionHabilitarView(true, "FieldSetView");
              var ds = $("#grid").data("kendoGrid").dataSource;
              AjaxGuardarCarro(ds._data, false);
        }
        else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, "FieldSetView")
        }
    });
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('.FieldSetView').find('*').attr('disabled', true);
        $("#inputCarro").data("kendoComboBox").enable(false);
        //$("#inputComponente").data("kendoComboBox").enable(false);
        $("#inputPintor").data("kendoMultiSelect").enable(false);
        $("#inputShotBlastero").data("kendoMultiSelect").enable(false);
        $("#InputOrdenTrabajo").attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#FechaShotBlast").data("kendoDatePicker").enable(false);
        $("#Fechaprimario").data("kendoDatePicker").enable(false);
        //$("#inputCuadrante1").data("kendoComboBox").enable(false);
        $("input[name='LLena']").attr("disabled", true);
        $("#ButtonAgregar").attr("disabled", true);
        $("#ButtonPlanchar").attr("disabled", true);

        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#GuardarPie").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar4").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('.FieldSetView').find('*').attr('disabled', false);
        $("#inputCarro").data("kendoComboBox").enable(true);
        //$("#inputComponente").data("kendoComboBox").enable(true);
        $("#inputPintor").data("kendoMultiSelect").enable(true);
        $("#inputShotBlastero").data("kendoMultiSelect").enable(true);
        $("#InputOrdenTrabajo").attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#FechaShotBlast").data("kendoDatePicker").enable(true);
        $("#Fechaprimario").data("kendoDatePicker").enable(true);
        //$("#inputCuadrante1").data("kendoComboBox").enable(true);
        $("input[name='LLena']").attr("disabled", false);
        $("#ButtonAgregar").attr("disabled", false);
        $("#ButtonPlanchar").attr("disabled", false);

        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#GuardarPie").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar4").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function suscribirEventoCuadrante() {
    $("#inputCuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            if ($("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#inputCuadrante").data("kendoComboBox").value("");
            }
        }
    });

}

function suscribirEventoCuadrante1() {

    $("#inputCuadrante1").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            if ($("#inputCuadrante1").data("kendoComboBox").dataItem($("#inputCuadrante1").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#inputCuadrante1").data("kendoComboBox").value("");
            }
        }
    });
}


function suscribirEventoCarro() {

    $("#inputCarro").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "MedioTransporteID",
        suggest: true,
        filter: "contains",
        change: function (e) {

            if ($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()) != undefined) {
                var dataItem = this.dataItem(e.sender.selectedIndex);
                //AjaxCargarSpool(dataItem.MedioTransporteID);
            }
            else {
                $("#inputCarro").data("kendoComboBox").value("");
            }
        }
    });


    $('#inputCarro').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()) != undefined) {
                var dataItem = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
                AjaxCargarSpool(dataItem.MedioTransporteID);
            }
            else {
                $("#inputCarro").data("kendoComboBox").value("");
            }
        }

    });

}

function suscribirEventoComponente() {

    $("#inputComponente").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PinturaComponenteComposicionID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            if ($("#inputComponente").data("kendoComboBox").dataItem($("#inputComponente").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#inputComponente").data("kendoComboBox").value("");
            }
        }
    });

    $("#inputComponente").blur(function () {
        $("#inputComponente").data("kendoComboBox").trigger("change");
    });
}

function suscribirEventoPintor() {

    $("#inputPintor").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Codigo1",
        dataValueField: "ObreroID1",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    }).data("kendoMultiSelect");
    $('#inputPintor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {

            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {
                //PlancharPintor($("#grid").data("kendoGrid").dataSource._data);
            }
        }

    });


}

function suscribirEventoShotBlastero() {

    $("#inputShotBlastero").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains"
    }).data("kendoMultiSelect");

    $('#inputShotBlastero').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {
                //PlancharShotBlastero($("#grid").data("kendoGrid").dataSource._data);
            }
        }

    });
}

function SuscribirEventoAgregar() {
    $("#btnAgregar").click(function () {
        if ($("#InputID").data("kendoComboBox").value() > 0) {
            //AjaxAgregarSpool($("#InputID").data("kendoComboBox").value());
            ajaxAgregarSpool();
        }
        else {
            displayNotify("PinturaCargaSeleccionaSpool", "", '1');
        }
    });
}

function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function () {
        if ($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()) != undefined) {
            var dataItem = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
            AjaxCargarSpool(dataItem.MedioTransporteID);
        }
        else {
            
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

        if ($("#InputOrdenTrabajo").val() != "") {
            if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
                try {
                    AjaxObtenerSpoolID();
                } catch (e) {
                    displayNotify("", e.message, '2');
                }
            } else {
                $("#InputOrdenTrabajo").val("");
                displayNotify("PinturaCargaMensajeOrdenTrabajo", "", '1');
            }
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
                AjaxAgregarCarga();
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("PinturaCargaNoExisteSpoolID", '', '2');
            }
        }
    });

}
function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        FiltroMostrar(0);
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        FiltroMostrar(1);
    });
}

function Limpiar() {
    $("#inputCarro").data("kendoComboBox").value("");
    $("#inputComponente").data("kendoComboBox").value("");
    $("#inputComponente").data("kendoComboBox").dataSource.data([]);
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#Fechaprimario").data("kendoDatePicker").value(new Date());
    $("#grid").data('kendoGrid').dataSource.data([]);
    opcionHabilitarView(false, "FieldSetView");
}