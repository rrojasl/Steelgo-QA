var ProyectoInicial = 0;
var EmbarqueInicial = 0;
function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoEmbarque();
    SuscribirEventoBuscar();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoSpoolID();
    SuscribirEventoPaquete();
    SuscribirEventoAgregar();
    SuscribirEventoGuardar();
    SuscribirEventoMostrarDetalle();
}

function SuscribirEventoProyecto() {
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource._data;

            if (!existenCambios(ds)) {
                LimpiarListaProyecto();
                if (dataItem != undefined) {
                    ProyectoInicial = dataItem.ProyectoID;
                    if (dataItem.ProyectoID != 0)
                        AjaxCargarEmbarques(dataItem.ProyectoID);

                }
                else {
                    $("#Proyecto").data("kendoComboBox").value("");
                }
            } else {
                ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    draggable: false,
                    resizable: false,
                    animation: {
                        close: false,
                        open: false
                    },
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                    + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                    + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    LimpiarListaProyecto();
                    if (dataItem != undefined) {
                        ProyectoInicial = dataItem.ProyectoID;
                        if (dataItem.ProyectoID != 0)
                            AjaxCargarEmbarques(dataItem.ProyectoID);

                    }
                    else {
                        $("#Proyecto").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Proyecto").data("kendoComboBox").value(ProyectoInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoEmbarque() {
    $('#Embarque').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "EmbarqueID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource._data;
             
            if (!existenCambios(ds)) {
                LimpiarListaEmbarque();
                if (dataItem != undefined) {
                    EmbarqueInicial = dataItem.EmbarqueID;
                    if (dataItem.EmbarqueID != 0) {
                        $("#EmbarqueDestino").text(dataItem.Destino);
                        if (dataItem.RevisionCerrada)
                            $("#InputCerrar")[0].checked = true;
                        else
                            $("#InputCerrar")[0].checked = false;
                    }   

                }
                else {
                    $("#Embarque").data("kendoComboBox").value("");
                }
            } else {
                ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    draggable: false,
                    resizable: false,
                    animation: {
                        close: false,
                        open: false
                    },
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                    + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                    + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    LimpiarListaEmbarque();
                    if (dataItem != undefined) {
                        EmbarqueInicial = dataItem.EmbarqueID;
                        if (dataItem.EmbarqueID != 0)
                            $("#EmbarqueDestino").text(dataItem.Destino);
                    }
                    else {
                        $("#Embarque").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Embarque").data("kendoComboBox").value(EmbarqueInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });

    $('#Embarque').closest('.k-widget').keydown(function (e) {
        var Embarque = $("#Embarque").data("kendoComboBox").dataItem($("#Embarque").data("kendoComboBox").select());
        if (e.keyCode == 13) {

            var ds = $("#grid").data("kendoGrid").dataSource._data;
            if (!existenCambios(ds)) {
                LimpiarListaEmbarque();
                if (Embarque != undefined && Embarque.EmbarqueID != 0) {
                    EmbarqueInicial = Embarque.EmbarqueID;
                    AjaxObtieneDetalle(Embarque.EmbarqueID);
                } else {
                    displayNotify("MensajeSeleccionaEmbarque", "", '1');
                    $("#Embarque").data("kendoComboBox").value("");
                }
            } else {
                ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    draggable: false,
                    resizable: false,
                    animation: {
                        close: false,
                        open: false
                    },
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                    + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                    + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    LimpiarListaEmbarque();
                    if (Embarque != undefined && Embarque.EmbarqueID != 0) {
                        EmbarqueInicial = Embarque.EmbarqueID;
                        AjaxObtieneDetalle(Embarque.EmbarqueID);
                    } else {
                        displayNotify("MensajeSeleccionaEmbarque", "", '1');
                        $("#Embarque").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Embarque").data("kendoComboBox").value(EmbarqueInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoChangeRadioTipoListado() {
    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(0)').change(function () {
        $("#divSpool").show();
        $("#divPaquete").hide();
        $("#divCodigo").hide();
    });
    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(1)').change(function () {
        $("#divSpool").hide();
        $("#divPaquete").show();
        $("#divCodigo").hide();

    });
    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(2)').change(function () {
        $("#divSpool").hide();
        $("#divPaquete").hide();
        $("#divCodigo").show();

    });
}

function ObtenerTipoConsulta() {
    var radioButtonsLLena = document.getElementsByName('RevisionEmbarqueTipoSeleccion');
    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            return (x + 1);
        }
    }
    return -1;
}


function SuscribirEventoGuardar() {

    $('#btnGuardarYNuevo').click(function (e) {
        //ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

    });

    $('#btnGuardarYNuevo1').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

    });

};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
    }
}

function SuscribirEventoBuscar() {
    $('#btnBuscar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource._data;
        if (!existenCambios(ds)) {

            if ($("#Embarque").data("kendoComboBox").text() != "") {
                AjaxObtieneDetalle($("#Embarque").data("kendoComboBox").value());
            }
            else {
                displayNotify('MensajeSeleccionaEmbarque', '', '1');
            }
        } else {
            ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                draggable: false,
                resizable: false,
                animation: {
                    close: false,
                    open: false
                },
                actions: []
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                + "</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                if ($("#Embarque").data("kendoComboBox").text() != "") {
                    AjaxObtieneDetalle($("#Embarque").data("kendoComboBox").value());
                }
                else {
                    displayNotify('MensajeSeleccionaEmbarque', '', '1');
                }
                ventanaConfirm.close();
            });
            $("#noButtonProy").click(function () {
                ventanaConfirm.close();
            });
        }
        
    });
}

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        var Proyecto = $("#Proyecto").data("kendoComboBox").dataItem($("#Proyecto").data("kendoComboBox").select());
        var Embarque = $("#Embarque").data("kendoComboBox").dataItem($("#Embarque").data("kendoComboBox").select());

        
        if (Proyecto != undefined && Proyecto.ProyectoID != 0) {
            if (Embarque != undefined && Embarque.EmbarqueID != 0) {
                if (!$("#inputCerrar").is(":checked")) {
                    var TipoConsulta = ObtenerTipoConsulta();
                    var codigo = "";
                    var ordenTrabajoSpoolID = 0;
                    var paqueteID = 0;

                    if (TipoConsulta == 1) {
                        ordenTrabajoSpoolID = $("#InputID").data("kendoComboBox").value();

                        if (ordenTrabajoSpoolID != "" && ordenTrabajoSpoolID != undefined && ordenTrabajoSpoolID != "0") {
                            AjaxAgregarDetalleSpool(TipoConsulta, ordenTrabajoSpoolID, codigo);
                        }

                    }else if(TipoConsulta == 2){
                        codigo = $("#inputCodigo").val();

                        if (ordenTrabajoSpoolID != "" && ordenTrabajoSpoolID != undefined && ordenTrabajoSpoolID != "0") {
                            AjaxAgregarDetalleSpool(TipoConsulta, ordenTrabajoSpoolID, codigo);
                        }
                    }
                    else if (TipoConsulta == 3) {
                        paqueteID = $("#inputPaquete").data("kendoComboBox").value();

                        if (paqueteID != "" && paqueteID != undefined && paqueteID != "0") {

                        }
                    } else {

                    }
                } else {
                    displayNotify('EmbarqueRevisionMsjRevisionCerrada', '', '1');
                }
            }else
                displayNotify('MensajeSeleccionaEmbarque', '', '1');
        }else
            displayNotify('MensajeSeleccionaProyecto', '', '1');
    });
}

function SuscribirEventoPaquete() {
    $('#inputPaquete').kendoComboBox({
        dataTextField: "Folio",
        dataValueField: "EmbarquePaqueteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputPaquete").data("kendoComboBox").dataItem($("#inputPaquete").data("kendoComboBox").select()) != undefined) {
                //ajaxBuscar();
            }
            else {
                $("#inputPaquete").data("kendoComboBox").value("");
            }
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
        select: function (e) {

            dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                displayNotify("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }

        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);

            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '2');
            }
        } else {
            displayNotify("MensajeOrdenTrabajoNoValida", "", '1');
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").dataSource.data([]);
        $("#InputID").data("kendoComboBox").value("");
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) {
            if ($('#InputID').data("kendoComboBox").value() != "") {
                //AjaxAgregarCarga();
            }

        }
    });

};

function SuscribirEventoMostrarDetalle() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        FiltroMostrar(0);
    });

    $('input:radio[name=Muestra]:nth(1)').change(function () {
        FiltroMostrar(1);
    });
}

function ObtenerTipoConsulta() {
    var tipoConsulta = $("input:radio[name=RevisionEmbarqueTipoSeleccion]:checked").val();
    var valor = 0;
    if(tipoConsulta == "Spool"){
        valor = 1;
    } else if (tipoConsulta == "Codigo") {
        valor = 2;
    } else if (tipoConsulta == "Paquete") {
        valor = 3
    }
   
    return valor;
}

function LimpiarListaProyecto() {
    $("#Embarque").data("kendoComboBox").dataSource.data([]);
    $("#Embarque").data("kendoComboBox").value("");
    $("#InputCerrar")[0].checked = false;
    $("#EmbarqueDestino").text("");

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#inputCodigo").val("");
    $("#inputPaquete").data("kendoComboBox").dataSource.data([]);
    $("#inputPaquete").data("kendoComboBox").value("");


    $("#grid").data("kendoGrid").dataSource.data([]);
}

function LimpiarListaEmbarque() {

    $("#InputCerrar")[0].checked = false;
    $("#EmbarqueDestino").text("");
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#grid").data("kendoGrid").dataSource.data([]);
}