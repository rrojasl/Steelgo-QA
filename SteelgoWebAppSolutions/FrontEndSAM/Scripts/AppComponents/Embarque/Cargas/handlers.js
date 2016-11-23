var proyectoInicial = 0;
var proveedorInicial = 0;
var planaInicial = 0;


function SuscribirEventos() {
    SuscribirEventoMostrar();
    SuscribirEventoProyecto();
    SuscribirEventoSpoolID();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoProveedor();
    SuscribirEventoPlacasPlana();
    SuscribirEventoPaquete();
    SuscribirEventoAgregar();
    //SuscribirEventoCrearPaquete();
    SuscribirEventoAgregarPaquete();
    SuscribirEventoPopupCuadrante();
    SuscribirEventoActualizarCuadrante();
    SuscribirEventoCancelar();
    SuscribirEventoPopupPaquete();
    SuscribirEventoActualizarPaquete();
    SuscribirEventoCancelarPaquete();
    SuscribirEventoGuardar();
    //SuscribirEventoCerrarPlana();
    //SuscribirEventoNuevoProveedor();
    SuscribirEventoCancelarPopup();
    SuscribirEventoSpoolID();
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoGuardarPlana();
    SuscribirEventoGuardarProveedor();
    suscribirEventoDescargarPaquete();
}


function suscribirEventoDescargarPaquete() {

    $(document).on('click', '.EnlaceDescargarPaquete', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            LlenarGridPopUp(dataItem);
        }
    });
}

function SuscribirEventoCancelarPopup() {
    $('#CancelarNuevoProveedor').click(function (e) {
        $("#inputProveedor").data("kendoComboBox").value("0");
        windowNewProvider.close();
    });
    $('#CancelarNuevaPlana').click(function (e) {
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("0");
        windowNewPlate.close();
    });
    $('#btnCerrarPopup').click(function (e) {
        ventanaPopup.close();
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
                displayNotify("EmbarqueCargaMensajeErrorPlana", "", '2');
            }
        }
        else {
            displayNotify("EmbarqueCargaMensajeErrorProveedor", "", '2');
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
        //$('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
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
        //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
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
        //AjaxCrearPaquete(dataItemSeleccionadoPopup, undefined, $("#inputPopupPaqueteID").text() == "" ? 0 : parseInt($("#inputPopupPaqueteID").text()));
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

function SuscribirEventoProyecto() {
    $('#inputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {

            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                if (ds._data.length == 0) {
                    proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                    $("#inputProveedor").data("kendoComboBox").setDataSource();
                    $("#inputProveedor").data("kendoComboBox").value("");
                    $("#inputProveedor").data("kendoComboBox").dataSource.data([]);

                    AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        close: function () {
                            $('input:radio[name=LLena]:nth(0)').select();
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();
                        AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                        $("#inputProveedor").data("kendoComboBox").setDataSource();
                        $("#inputProveedor").data("kendoComboBox").value("");
                        $("#inputProveedor").data("kendoComboBox").dataSource.data([]);
                        $("#grid").data("kendoGrid").dataSource.data([]);

                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#inputProyecto").data("kendoComboBox").value(proyectoInicial);
                        ventanaConfirm.close();
                        //$('input:radio[name=LLena]:nth(0)').select();
                    });
                }


            }
            else {
                $("#inputProyecto").data("kendoComboBox").value("");

            }


        },
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
                    displayNotify("Mensajes_error", e.message, '2');
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
                if (!$("#inputCerrar").is(":checked")) {
                    if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
                        AjaxAgregarCarga();
                    }
                    else {
                        displayNotify('EmarqueCargaMensajeEligePlana', '', 1);
                    }
                }
                else {
                    displayNotify('', 'La plana esta cerrada, debe abrirlar para poder modificarla', 1);
                }
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("PinturaCargaNoExisteSpoolID", '', '2');
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
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                if (ds._data.length == 0) {
                    proveedorInicial = $("#inputProveedor").data("kendoComboBox").value();
                    if (dataItem.ProveedorID == -1) {
                        CargaPopupNuevoProveedor();
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);
                    } else {
                        AjaxObtenerPlanas(dataItem.ProveedorID, null);
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);
                    }
                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        close: function () {
                            $('input:radio[name=LLena]:nth(0)').select();
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        proveedorInicial = $("#inputProveedor").data("kendoComboBox").value();
                        if (dataItem.ProveedorID == -1) {
                            CargaPopupNuevoProveedor();
                            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                        } else {
                            AjaxObtenerPlanas(dataItem.ProveedorID, null);
                            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                        }
                        $("#grid").data("kendoGrid").dataSource.data([]);
                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#inputProveedor").data("kendoComboBox").value(proveedorInicial);
                        ventanaConfirm.close();
                        //$('input:radio[name=LLena]:nth(0)').select();
                    });
                }


            }
            else {
                $("#inputProveedor").data("kendoComboBox").value("");
            }

        }
    });

}

function SuscribirEventoPlacasPlana() {
    $('#inputEmbarqueCargaPLacaPlana').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PlanaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                if (ds._data.length == 0) {
                    planaInicial = $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value();
                    if (dataItem.PlanaID == -1) {
                        CargaPopupNuevaPlana();
                    }
                    else {
                        //AjaxObtenerGrid();
                    }
                }
                else {
                    var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                        iframe: true,
                        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                        visible: false,
                        width: "auto",
                        height: "auto",
                        modal: true,
                        close: function () {
                            $('input:radio[name=LLena]:nth(0)').select();
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                    ventanaConfirm.open().center();
                    $("#yesButtonProy").click(function () {
                        planaInicial = $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value();
                        if (dataItem.PlanaID == -1) {
                            CargaPopupNuevaPlana();
                        }
                        else {
                            AjaxObtenerGrid();
                        }
                        $("#grid").data("kendoGrid").dataSource.data([]);
                        ventanaConfirm.close();
                    });
                    $("#noButtonProy").click(function () {
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value(planaInicial);
                        ventanaConfirm.close();
                        //$('input:radio[name=LLena]:nth(0)').select();
                    });
                }
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
        if (!$("#inputCerrar").is(":checked")) {
            if ($("#lblEstatus").text().toLowerCase() != "cerrada" && $("#lblEstatus").text().toLowerCase() != "closed") {
                if (ObtenerTipoConsulta() == 1) {
                    if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                        if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
                            AjaxAgregarCarga();
                        }
                        else {
                            displayNotify('EmarqueCargaMensajeEligePlana', '', 1);
                        }

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
                displayNotify("EmbarqueCargaErrorAgregar", "", '1');
            }
        }
        else {
            displayNotify('', 'La plana esta cerrada, debe abrirlar para poder modificarla', 1);
        }
    });
}


function SuscribirEventoMostrar() {
    $('#btnMostrar').click(function (e) {
        if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
            AjaxObtenerGrid();
        }
        else {
            displayNotify('EmarqueCargaMensajeEligePlana', '', 1);
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
            displayNotify("", "", '1');
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
            displayNotify("EmbarqueCargaSeAgregaPaquete", "", '2');
        }
    });

}


function SuscribirEventoZona() {
    $('#inputZonaPopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePopup").data("kendoComboBox").value("");

            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadrante(dataItem.ZonaID);
                }
            }
            else {
                $("#inputZonaPopup").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoCuadrante() {
    $('#inputCuadrantePopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else {
                $("#inputCuadrantePopup").data("kendoComboBox").value("");
            }
        }
    });
}


function SuscribirEventoGuardarPlana() {
    $('#GuardarNuevaPlana').click(function (e) {
        if ($("#inputNombreNuevaPlana").val() != "") {
            GuardarNuevaPlana();
        }
        else {
            displayNotify('', 'Ingrese un nombre para el proveedor', 1);
        }
    });
}

function SuscribirEventoGuardarProveedor() {
    $('#GuardarNuevoProveedor').click(function (e) {
        if ($("#inputNombreNuevoProveedor").val() != "") {
            GuardarNuevoProveedor();
        }
        else {
            displayNotify('', 'Ingrese un nombre para el proveedor', 1);
        }
    });
}