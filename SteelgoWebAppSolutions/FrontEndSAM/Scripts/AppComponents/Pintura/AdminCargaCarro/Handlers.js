function SuscribirEventos() {

    SuscribirEventoProyecto();
    SuscribirEventoSpoolID();
    SuscribirEventoCarro();
    SuscribirEventoCambiarEscenario();
    suscribirEventoWindowsConfirmaCaptura();
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

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            LimpiarCargaProyecto();

            if (dataItem != undefined) {
                if (dataItem.ProyectoID != 0) {
                    AjaxCargarMedioTransporte(dataItem.ProyectoID, null);
                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}


function SuscribirEventoCarro() {
    $("#inputCarro").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "MedioTransporteID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            LimpiarCargaCarro();

            if (dataItem != undefined) {
                CheckCerrarCarro(1, dataItem);
                if (dataItem.MedioTransporteID == -1) {
                    CargaPopupNuevoMedioTransporte();
                } else {
                    AjaxObtenerDetalleCargaCarroBacklog(dataItem);
                }
            } else {
                $("#inputCarroEscritorio").data("kendoComboBox").value("");
            }
        }
    });
}

function eventoCambioTipoEscenario() {

    if ($('input:radio[name=TipoVista]:checked').val() == "Escritorio") {
        //$("#JuntaDiv").css('display', 'none');
        //$("#MuestraDiv").css('display', 'block');
        $("#AgregarSpoolManual").css('display', 'none');
        
        $("#grid").data("kendoGrid").showColumn("Prioridad");
        $("#grid").data("kendoGrid").showColumn("MedioTransporte");
        $("#grid").data("kendoGrid").showColumn("Seleccionado");
        $("#grid").data("kendoGrid").refresh();
        

        //Limpiar();
       // AjaxCargarCamposPredeterminadosOcultaJunta();
    }
    else if ($('input:radio[name=TipoVista]:checked').val() == "Patio") {
        //$("#JuntaDiv").css('display', 'block');
        //$("#MuestraDiv").css('display', 'block');
        $("#AgregarSpoolManual").css('display', 'block');
        $("#grid").data("kendoGrid").hideColumn("Prioridad");
        $("#grid").data("kendoGrid").hideColumn("MedioTransporte");
        $("#grid").data("kendoGrid").hideColumn("Seleccionado");
        $("#grid").data("kendoGrid").refresh();
        //Limpiar();
        //AjaxCargarCamposPredeterminadosOcultaJunta();
    }
}

function SuscribirEventoCambiarEscenario() {

    $('input:radio[name=TipoVista]').change(function () {
        if ($('input:radio[name=TipoVista]:checked').val() == "Escritorio") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoEscenario();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
        else if ($('input:radio[name=TipoVista]:checked').val() == "Patio") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoEscenario();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
    });
}

function suscribirEventoWindowsConfirmaCaptura() {
    ventanaConfirmEdicion = $("#ventanaConfirmCaptura").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaArmadoTituloPopup[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "auto",
        height: "auto",
        modal: true,
        animation: false,
        actions: []
    }).data("kendoWindow");

    ventanaConfirmEdicion.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
        "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");


    $("#yesButtonProy").click(function (e) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        eventoCambioTipoListado();
        ventanaConfirmEdicion.close();
        editado = false;
    });
    $("#noButtonProy").click(function (e) {
        eventoRegresarTipoListado();
        ventanaConfirmEdicion.close();
    });
}