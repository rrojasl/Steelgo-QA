var windowNewCarriage;
function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoCarro();
    SuscribirEventoAgregar();
    SuscribirEventoGuardar();
    SuscribirEventoCerrarMedioTransporte(); 
    SuscribirEventoClasificacion();
    SuscribirEventoPersistencia();
    SuscribirEventoGuardarCrearMedioTransporte();
    SuscribirEventoCerrarCrearMedioTransporte();
};

function SuscribirEventoGuardarCrearMedioTransporte() {
    $('#btnGuardarCrearMedioTransporte').click(function (e) {
        AjaxGuardarNuevoCarro()
    });
}

function SuscribirEventoCerrarCrearMedioTransporte() {
    $('#btnCerrarVentanaCrearMedioTransporte').click(function (e) {
        windowNewCarriage.close();
    });
}

function SuscribirEventoPersistencia() {
     $('#inputPersistencia').kendoComboBox({
        dataTextField: "Tipo",
        dataValueField: "TipoPersistenciaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            if (dataItem.Tipo.toLowerCase() == "cantidad") {
                $("#divNumeroVeces").show();
            }
            else {
                $("#divNumeroVeces").hide();
            }
        },
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if (dataItem.Tipo.toLowerCase() == "cantidad") {
                    $("#divNumeroVeces").show();
                }
                else {
                    $("#divNumeroVeces").hide();
                }
            }
            else {
                displayMessage("NoExistePersistencia", '', '2');
            } 
        }
    });

    $("#inputPersistencia").blur(function () {
        $("#inputPersistencia").data("kendoComboBox").trigger("change");
    });
}

function SuscribirEventoClasificacion() {
     
    $('#inputClasificacion').kendoComboBox({
        dataTextField: "NombreClasificacion",
        dataValueField: "ClasificacionPersistenciaID ",
        suggest: true,
        filter: "contains",
        index: 3
    });
}
 
function SuscribirEventoCerrarMedioTransporte() {
    $('#btnCerrarCarro, #btnCerrarCarro1').click(function (e) {
        AjaxCerrarCarro();
    });
}

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) { 
            AjaxAgregarCarga();  
    });
}
 
function SuscribirEventoGuardar() { 
    $('#btnGuardarYNuevo,#btnGuardarYNuevo1').click(function (e) {
       
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        Limpiar();
    });

    $('#Guardar, #btnGuardar, #GuardarPie, #Guardar1').click(function (e) {
        e.stopPropagation(); 
        if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

        }
        else if ($('#botonGuardar').text() == _dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });
};

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".botonDeplegaMenu").attr("disabled", true);
 
        $("#Guardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar3').text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".botonDeplegaMenu").attr("disabled", false);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar3').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function ObtenerTipoConsulta() {
    var radioButtonsLLena = document.getElementsByName('PinturaCargaTipoSeleccion');

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
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);

                }
            }
            else
                displayMessage("NoExisteSpoolID", '', '2');
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
            $("#InputOrdenTrabajo").focus();
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
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
    });
    $("#InputID").blur(function () {
        $("#InputID").data("kendoComboBox").trigger("change");
    });

};

function SuscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=PinturaCargaTipoSeleccion]:nth(0)').change(function () {
        $("#divSpool").show();
        $("#divCodigo").hide();
    });

    $('input:radio[name=PinturaCargaTipoSeleccion]:nth(1)').change(function () {
        $("#divSpool").hide();
        $("#divCodigo").show();
    });
}

function SuscribirEventoCarro() { 
    $('#inputCarro').kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteCargaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) { 
            var dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
                $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteID);
                if (dataItem.MedioTransporteID == "-1") {
                    LimpiarCarro();
                    windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
                        modal: true,
                        // title:,
                        resizable: false,
                        visible: true,
                        width: "auto",
                        minWidth: "20%",

                        position: {
                            top: "1%",
                            left: "1%"
                        },
                        actions: [
                            "Close"
                        ],
                    }).data("kendoWindow");
                    $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                    $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                }
                else {
                    $("#inputCarro").val(dataItem.MedioTransporteCargaID);
                    AjaxObtenerDetalleCarroCargado(dataItem.MedioTransporteCargaID);
                }
            }
            else
                displayMessage("NoExisteCarro", '', '2');
        },
        change: function (e) { 
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteID);
                if (dataItem.MedioTransporteID == "-1") {
                    LimpiarCarro();
                    windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
                        modal: true,
                        // title:,
                        resizable: false,
                        visible: true,
                        width: "auto",
                        minWidth: "20%",

                        position: {
                            top: "1%",
                            left: "1%"
                        },
                        actions: [
                            "Close"
                        ],
                    }).data("kendoWindow");
                    $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                    $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                }
                else {
                    $("#inputCarro").val(dataItem.MedioTransporteCargaID);
                    AjaxObtenerDetalleCarroCargado(dataItem.MedioTransporteCargaID);
                }
            }
            else
                displayMessage("NoExisteCarro", '', '2');
        }
    });


    $("#inputCarro").blur(function () { 
        $("#inputCarro").data("kendoComboBox").trigger("change");
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
            if (dataItem != undefined) {
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
            else
                displayMessage("NoExisteSpoolID", '', '2');
        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                }
            }
            else {
                displayMessage("NoExisteSpoolID", '', '2');
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
            $("#InputOrdenTrabajo").focus();
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
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
    });

};

function Limpiar() {
    $("#InputCarro").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    AjaxPinturaCargaMedioTransporte();
    $("#grid").data('kendoGrid').dataSource.data([]);
}