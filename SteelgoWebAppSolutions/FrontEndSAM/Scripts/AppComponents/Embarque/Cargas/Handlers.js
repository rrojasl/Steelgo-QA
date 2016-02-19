
function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoProveedor();
    SuscribirEventoPlacasPlana();
    SuscribirEventoPaquete();
    SuscribirEventoAgregar();
    SuscribirEventoCrearPaquete();
    SuscribirEventoAgregarPaquete();
    SuscribirEventoPopupCuadrante();
    SuscribirEventoActualizarCuadrante();
    SuscribirEventoCancelar();
    SuscribirEventoPopupPaquete();
    SuscribirEventoActualizarPaquete();
    SuscribirEventoCancelarPaquete();
    SuscribirEventoGuardar();
    SuscribirEventoCerrarPlana();
}

function SuscribirEventoCerrarPlana() {
    $('.btnCerrarPlana').click(function (e) {
        ajaxCerrarPlana();
    });
}

function SuscribirEventoGuardar() {



    $('#btnGuardarYNuevo').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        Limpiar();
    });
    $('#btnGuardarYNuevo1').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        Limpiar();
    });


    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($("#inputProveedor").data("kendoComboBox").dataItem($("#inputProveedor").data("kendoComboBox").select()) != undefined) {
            if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataItem($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").select()) != undefined) {
                if (ds._data.length > 0) {
                    if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                        opcionHabilitarView(true, "FieldSetView");
                        ajaxGuardar(ds._data);
                    }
                    else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                        opcionHabilitarView(false, "FieldSetView");
                    }
                }
            }
            else {
                displayMessage("EmbarqueCargaMensajeErrorPlana", "", '2');
            }
        }
        else {
            displayMessage("EmbarqueCargaMensajeErrorProveedor", "", '2');
        }
    });

};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#inputProveedor").data("kendoComboBox").enable(false);
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").enable(false);
        $('#btnAgregar').prop("disabled", true);
        $('#inputPaquete').data("kendoComboBox").enable(false);
        $('#ButtonCrearPaquete').prop("disabled", true);
        $('#ButtonAgregarPAquete').prop("disabled", true);
        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('.radioEmbarqueCargaTipoSeleccion').prop("disabled", true);
        $('#InputOrdenTrabajo').prop("disabled", true);
        $('#inputCodigo').prop("disabled", true);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputProveedor").data("kendoComboBox").enable(true);
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").enable(true);
        $('#btnAgregar').prop("disabled", false);
        $('#inputPaquete').data("kendoComboBox").enable(true);
        $('#ButtonCrearPaquete').prop("disabled", false);
        $('#ButtonAgregarPAquete').prop("disabled", false);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('.radioEmbarqueCargaTipoSeleccion').prop("disabled", false);
        $('#InputOrdenTrabajo').prop("disabled", false);
        $('#inputCodigo').prop("disabled", false);

    }
}

function SuscribirEventoActualizarPaquete() {
    $('#btnActualizarPaquetePopUp').click(function (e) {
        //accion=2 es para actualizar paquete
        AjaxCrearPaquete($("#grid").data("kendoGrid").dataSource._data, 1, $("#inputPopupPaquete").val());
        ventanaAgregarPaquetePopup.close();
    });
}

function SuscribirEventoActualizarCuadrante() {
    $('#btnActualizarCuadrantePopUp').click(function (e) {
        dataItemSeleccionadoPopup.CuadranteID = parseInt($("#inputPopupCuadrante").val());
        dataItemSeleccionadoPopup.Accion = 3;
        //accion=3 es para eliminar 
        AjaxCrearPaquete(dataItemSeleccionadoPopup, undefined, $("#inputPopupPaqueteID").text() == "" ? 0 : parseInt($("#inputPopupPaqueteID").text()));
        $("#grid").data("kendoGrid").dataSource.sync();
        ventanaPopup.close();
    });
}

function SuscribirEventoCancelarPaquete() {
    $('#btnCancelarPaquetePopUp').click(function (e) {
        ventanaAgregarPaquetePopup.close();
    });
}

function SuscribirEventoCancelar() {
    $('#btnCancelarPopUp').click(function (e) {
        ventanaPopup.close();
    });
}

function SuscribirEventoPopupCuadrante() {
    $('#inputPopupCuadrante').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
    });
}

function SuscribirEventoPopupPaquete() {
    $('#inputPopupPaquete').kendoComboBox({
        dataTextField: "Folio",
        dataValueField: "EmbarquePaqueteID",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

function ObtenerTipoConsulta() {
    var radioButtonsLLena = document.getElementsByName('EmbarqueCargaTipoSeleccion');

    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            return (x + 1);
        }
    }
    return -1;
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {

            dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                displayMessage("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }

        }
        ,
        change: function (e) {

            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);

                }
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
            }


        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '2');
            
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
            if ($("#lblEstatus").text().toLowerCase() != "cerrada" && $("#lblEstatus").text().toLowerCase() != "closed") {
                if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                    AjaxAgregarCarga();
                }
                else {
                    $("#InputID").data("kendoComboBox").value("");
                }
            }
            else {
                displayMessage("EmbarqueCargaErrorAgregar", "", '1');
            }
        }
        
    });

};

function SuscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').change(function () {
        $("#divSpool").show();
        $("#divPaquete").hide();
        $("#divCodigo").hide();
    });
    $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').change(function () {
        $("#divSpool").hide();
        $("#divPaquete").show();
        $("#divCodigo").hide();

    });
    $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').change(function () {
        $("#divSpool").hide();
        $("#divPaquete").hide();
        $("#divCodigo").show();

    });
}

function SuscribirEventoProveedor() {
    $('#inputProveedor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TransportistaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function () {
            if ($("#inputProveedor").data("kendoComboBox").dataItem($("#inputProveedor").data("kendoComboBox").select()) != undefined) {
                AjaxCargarPlanasPlacas();
                $("#grid").data('kendoGrid').dataSource.data([]);
                $("#lblEstatus").text("");
                $("#lblEmbarqueCargaTotalPiezas").text("");
                $("#lblEmbarqueCargaToneladasCargadas").text("");
            }
            else {
                $("#inputProveedor").data("kendoComboBox").value("");
            }

        }
    });

}

function SuscribirEventoPlacasPlana() {
    $('#inputEmbarqueCargaPLacaPlana').kendoComboBox({
        dataTextField: "Placas",
        dataValueField: "VehiculoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataItem($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").select()) != undefined) {
                var dataItem = this.dataItem(e.sender.selectedIndex);
                $("#lblEstatus").text(dataItem.estatus);
                if (dataItem.estatus != "Abierta" && dataItem.estatus != "Open") {
                    $('.btnCerrarPlana').css('display', 'none');
                }
                else {
                    $('.btnCerrarPlana').css('display', 'block');
                }
                $("#grid").data('kendoGrid').dataSource.data([]);
                ajaxCargarSpoolXPlaca();
            }
            else {
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
            }

        }
    });
    $('#inputEmbarqueCargaPLacaPlana').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataItem($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").select()) != undefined) {
                ajaxCargarSpoolXPlaca();
            }
            else {
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventoPaquete() {
    $('#inputPaquete').kendoComboBox({
        dataTextField: "Folio",
        dataValueField: "EmbarquePaqueteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function () {
            if ($("#inputPaquete").data("kendoComboBox").dataItem($("#inputPaquete").data("kendoComboBox").select()) != undefined) {
                //AjaxCargarPlanasPlacas();
            }
            else {
                $("#inputPaquete").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        if ($("#lblEstatus").text().toLowerCase() != "cerrada" && $("#lblEstatus").text().toLowerCase() != "closed") {
        if (ObtenerTipoConsulta() == 1) {
            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                AjaxAgregarCarga();
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
            }
        }
        else if (ObtenerTipoConsulta() == 2) {
            if ($("#inputPaquete").data("kendoComboBox").dataItem($("#inputPaquete").data("kendoComboBox").select()) != undefined) {
                AjaxAgregarCarga();
            }
            else {
                $("#inputPaquete").data("kendoComboBox").value("");
            }
        }
        else {
            AjaxAgregarCarga();
        }
        }
        else {
            displayMessage("EmbarqueCargaErrorAgregar", "", '1');
        }
    });
}

function SuscribirEventoCrearPaquete() {
    $('#ButtonCrearPaquete').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ExistenSeleccionados(ds._data)) {
            if (!validarExisteSpoolSeleccionadoSinPaquete()) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                AjaxCrearPaquete(ds._data, undefined, 0);
            }
        }
        else {
            displayMessage("", "", '1');
            existe = true;
            return existe;
        }
    });

}

function SuscribirEventoAgregarPaquete() {
    $('#ButtonAgregarPAquete').click(function (e) {
        if (validarExistaSoloUnpaqueteSeleccionado()) {
            // alert('entro asiganr paquete con uno seleccionado');
            AsignarValorPaqueteASinPaquete();

        }//falta
        else if (validarSoloSeleccionadoSinPaquete()) {
            //  alert('entro solo seleccionado sin paquete');
            ventanaAgregarPaquetePopup.open().center();

        }
        else {
            //  alert('no hay nada seleccionado');
            displayMessage("EmbarqueCargaSeAgregaPaquete", "", '2');
        }
    });

}