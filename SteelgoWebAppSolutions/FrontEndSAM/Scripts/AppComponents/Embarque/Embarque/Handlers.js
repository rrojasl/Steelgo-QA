var ChoferInicial = 0;
var proveedorInicial = 0;
var TractoInicial = 0;
var ChoferInicial = 0;
var EmbarqueIncial = 0;
var divNuevoEmbarque;

function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoProveedor();
    SuscribirEventoTracto();
    SuscribirEventoChofer();
    suscribirEventoEmbarque();
    SuscribirEventoPlana();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
    SuscribirEventoCancelarPopup();
    SuscribirEventoGuardarProveedor();
    SuscribirEventoGuardarTracto();
    SuscribirEventoGuardarChofer();
    SuscribirEventoFecha();
    SuscribirEventoPopUpGuardarEmbarque();
}

SuscribirEventos();

function SuscribirEventoProyecto() {
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;

            if (ds._data.length == 0) {
                if (dataItem != undefined) {
                    proyectoInicial = dataItem.ProyectoID;
                    LimpiarSelectProyecto();
                    if (dataItem.ProyectoID != 0) {
                        AjaxObtenerPlanas(dataItem.ProyectoID, null);
                        AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                    }
                }
                else {
                    $("#Proyecto").data("kendoComboBox").value("");
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
                        $("#Proyecto").data("kendoComboBox").value(proyectoInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");
                ventanaConfirm.open().center();

                $("#yesButtonProy").click(function () {
                    if (dataItem != undefined) {
                        proyectoInicial = dataItem.ProyectoID;
                        LimpiarSelectProyecto();
                        if (dataItem.ProyectoID != 0) {
                            AjaxObtenerPlanas(dataItem.ProyectoID, null);
                            AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                        }
                    }
                    else {
                        $("#Proyecto").data("kendoComboBox").value("");
                    }

                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Proyecto").data("kendoComboBox").value(proyectoInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoProveedor() {
    $("#Proveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length == 0) {
                if (dataItem != undefined) {
                    proveedorInicial = $("#Proveedor").data("kendoComboBox").value();
                    LimpiarSelectProveedor();
                    if (dataItem.ProveedorID == -1) {
                        CargaPopupNuevoProveedor();

                    } else {
                        if (dataItem.ProveedorID != 0) {
                            AjaxEmbarqueCargaTractos(dataItem.ProveedorID, null);
                            AjaxEmbarqueCargaChofer(dataItem.ProveedorID, null);
                            AjaxObtenerEmbarque(dataItem.ProveedorID);
                        }
                    }
                }
                else {
                    $("#Proveedor").data("kendoComboBox").value("");
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
                        $("#Proveedor").data("kendoComboBox").value(proveedorInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    if (dataItem != undefined) {
                        proveedorInicial = $("#Proveedor").data("kendoComboBox").value();
                        LimpiarSelectProveedor();
                        if (dataItem.ProveedorID == -1) {
                            CargaPopupNuevoProveedor();

                        } else {
                            if (dataItem.ProveedorID != 0) {
                                AjaxEmbarqueCargaTractos(dataItem.ProveedorID, null);
                                AjaxEmbarqueCargaChofer(dataItem.ProveedorID, null);
                                AjaxObtenerEmbarque(dataItem.ProveedorID);
                            }
                        }
                    }
                    else {
                        $("#Proveedor").data("kendoComboBox").value("");
                    }

                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Proveedor").data("kendoComboBox").value(proveedorInicial);
                    ventanaConfirm.close();
                });
            }

        }
    });
}

function SuscribirEventoTracto() {
    $("#Tracto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TractoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;

            if (ds._data.length == 0) {
                if (dataItem != undefined) {
                    TractoInicial = dataItem.TractoID;
                    if (dataItem.TractoID == -1) {
                        CargaPopupNuevoTracto();
                        $("#Tracto").data("kendoComboBox").value("");
                    }
                }
                else {
                    $("#Tracto").data("kendoComboBox").value("");
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
                        $("#Tracto").data("kendoComboBox").value(TractoInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    TractoInicial = dataItem.TractoID;
                    if (dataItem.TractoID == -1) {
                        CargaPopupNuevoTracto();
                        $("#Tracto").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Tracto").data("kendoComboBox").value(TractoInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function suscribirEventoGuardar() {

    $("#Guardar, #btnGuardar, #Guardar1, #btnGuardar1").click(function (e) {
        var Embarque = {
            EmbarqueID: 0,
            Nombre: "EmbarquePrueba",
            FechaCreacion: "29/11/2016"
        }
        if ($("#Plana").data("kendoComboBox").text() != "" && $("#Plana").data("kendoComboBox").text() != undefined) {

            AbrirPopUpGuardar(Embarque, 1);
        } else {

        }
    });

    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var Embarque = {
            EmbarqueID: 1,
            Nombre: "EmbarquePrueba",
            FechaCreacion: "29/11/2016"
        }
        AbrirPopUpGuardar(Embarque, 1);
    });
}

function suscribirEventoAgregar() {

    $('#btnAgregar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length < 2) {
            if ($("#Plana").data("kendoComboBox").text() != "" && $("#Plana").data("kendoComboBox").text() != undefined) {
                var cargaPlanaID = $("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()).CargaPlanaID;
                AjaxAgregaRenglon(cargaPlanaID);
            }
            else {
                displayNotify('', 'Seleccione una plana a agregar', '1');
            }
        }
        else {
            displayNotify('', 'El embarque unicamente puede tener como maximo 2 planas', '1');
        }
    });
}

function suscribirEventoEmbarque() {
    $("#Embarque").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "EmbarqueID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Embarque").data("kendoComboBox").dataItem($("#Embarque").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#Embarque").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoChofer() {
    $("#Chofer").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ChoferID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;

            if (ds._data.length == 0) {
                if (dataItem != undefined) {
                    ChoferInicial = dataItem.ChoferID;
                    if (dataItem.ChoferID == -1) {
                        CargaPopupNuevoChofer();
                        $("#Chofer").data("kendoComboBox").value("");
                    }
                }
                else {
                    $("#Chofer").data("kendoComboBox").value("");
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
                        $("#Chofer").data("kendoComboBox").value(ChoferInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    if (dataItem != undefined) {
                        ChoferInicial = dataItem.ChoferID;
                        if (dataItem.ChoferID == -1) {
                            CargaPopupNuevoChofer();
                            $("#Chofer").data("kendoComboBox").value("");
                        }
                    }
                    else {
                        $("#Chofer").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Chofer").data("kendoComboBox").value(ChoferInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoPlana() {
    $("#Plana").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PlanaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#Plana").data("kendoComboBox").value("");
            }
        }
    });

    $('#Plana').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length < 2) {
                if ($("#Plana").data("kendoComboBox").text() != "" && $("#Plana").data("kendoComboBox").text() != undefined) {
                    var cargaPlanaID = $("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()).CargaPlanaID;
                    AjaxAgregaRenglon($("#Plana").data("kendoComboBox").value());
                }
                else {
                    displayNotify('', 'Seleccione una plana a agregar', '1');
                }
            }
            else {
                displayNotify('', 'El embarque unicamente puede tener como maximo 2 planas', '1');
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

        $("#btnAgregar").prop('disabled', true);

        //$('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Chofer").data("kendoComboBox").enable(true);
        $("#Plana").data("kendoComboBox").enable(true);
        $("#Tracto").data("kendoComboBox").enable(true);
        $("#Proveedor").data("kendoComboBox").enable(true);

        $("#btnAgregar").prop('disabled', false);
        //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
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

function SuscribirEventoGuardarTracto() {
    $('#GuardarNuevoTracto').click(function (e) {
        if ($("#inputNombreNuevoTracto").val() != "") {
            GuardarNuevoTracto();
        }
        else {
            displayNotify('', 'Ingrese un nombre para el tracto', 1);
        }
    });
}


function SuscribirEventoGuardarChofer() {
    $('#GuardarNuevoChofer').click(function (e) {
        if ($("#inputNombreNuevoChofer").val() != "") {
            GuardarNuevoChofer();
        }
        else {
            displayNotify('', 'Ingrese un nombre para el chofer', 1);
        }
    });
}


function SuscribirEventoCancelarPopup() {
    $('#CancelarNuevoProveedor').click(function (e) {
        $("#Proveedor").data("kendoComboBox").text("");
        windowNewProvider.close();
    });
    $('#CancelarNuevoTracto').click(function (e) {
        $("#Tracto").data("kendoComboBox").text("");
        windowNewTracto.close();
    });
    $('#CancelarNuevoChofer').click(function (e) {
        $("#Chofer").data("kendoComboBox").text("");
        windowNewChofer.close();
    });
}

function SuscribirEventoFecha() {
    FechaEmbarque = $("#inputFechaEmbarque").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            ValidarFecha(e.sender._value)
        }
    });
}

function SuscribirEventoPopUpGuardarEmbarque() {

    if ($("#Proyecto").data("kendoComboBox").text() != "") {
        if ($("#Proveedor").data("kendoComboBox").text() != "") {
            if ($("#Tracto").data("kendoComboBox").text() != "") {
                if ($("#Chofer").data("kendoComboBox").text() != "") {

                    var ds = $("#grid").data("kendoGrid").dataSource;
                    if (ds._data.length > 0) {

                        divNuevoEmbarque = $("#divNuevoEmbarque").kendoWindow({
                            title: "Nuevo Embarque",
                            visible: false,
                            width: "40%",
                            height: "auto",
                            draggable: false,
                            resizable: false,
                            modal: true,
                            animation: {
                                close: false,
                                open: false
                            },
                            close: function () {
                            }
                        }).data("kendoWindow");

                        $("#GuardarNuevoEmbarque").click(function (e) {
                        });

                        $("#CancelarNuevoEmbarque").click(function (e) {

                            divNuevoEmbarque.close();
                        });
                    }
                    else {
                        displayNotify('', 'El embarque debe tener al menos una plana cargada', '2');
                    }
                }
                else {
                    displayNotify('', 'El chofer es mandatorio', '2');
                }
            }
            else {
                displayNotify('', 'El tracto es mandatorio', '2');
            }
        }
        else {
            displayNotify('', 'El proveedor es mandatorio', '2');
        }
    }
    else {
        displayNotify('', 'El proyecto es mandatorio', '2');
    }
}


function LimpiarSelectProveedor() {

    $("#Tracto").data("kendoComboBox").dataSource.data([]);
    $("#Tracto").data("kendoComboBox").value("");

    $("#Chofer").data("kendoComboBox").dataSource.data([]);
    $("#Chofer").data("kendoComboBox").value("");

    $("#Embarque").data("kendoComboBox").dataSource.data([]);
    $("#Embarque").data("kendoComboBox").value("");
}

function LimpiarSelectProyecto() {


    $("#Proveedor").data("kendoComboBox").dataSource.data([]);
    $("#Proveedor").data("kendoComboBox").value("");

    $("#Tracto").data("kendoComboBox").dataSource.data([]);
    $("#Tracto").data("kendoComboBox").value("");

    $("#Chofer").data("kendoComboBox").dataSource.data([]);
    $("#Chofer").data("kendoComboBox").value("");

    $("#Embarque").data("kendoComboBox").dataSource.data([]);
    $("#Embarque").data("kendoComboBox").value("");


    $("#Plana").data("kendoComboBox").dataSource.data([]);
    $("#Plana").data("kendoComboBox").value("");
}