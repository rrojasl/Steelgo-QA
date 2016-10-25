﻿function SuscribirEventos() {
    SuscribirEventoSoldador();
    SuscribirEventoNompreWPS();
    SuscribirEventoProcesoSoldadura();
    SuscribirEventoNumeroPasos();
    SuscribirEventoEspesorMinimo();
    SuscribirEventoEspesorMaximo();
    SuscribirEventoDiametroCertificado();
    SuscribirEventoTipoPrueba();
    SuscribirEventoCedula();
    SuscriborEventoPosicion();
    SuscribirEventoFechaVigenciaInicio();
    SuscribirEventoFechaVigenciaFin();
    suscribirEventoGuardarNuevoSoldadorCertificacion();
}

function SuscribirEventoSoldador() {
    $("#inputSoldador").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        dataTextField: "NombreCompleto",
        dataValueField: "ObreroID",
        autoBind: false,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputSoldador").data("kendoComboBox").text("");
            }
        }
    });

};

function SuscriborEventoPosicion() {
    $("#inputPosicionPQR").kendoNumericTextBox({
        format: "#",
        min: 0,
        value: "0"
    });
}

function SuscribirEventoFechaVigenciaInicio() {
    $("#inputFechaInicioCertificado").kendoDatePicker({

        //format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]

        change: function (e) {
            if (ValidarFecha(this, e.sender._value))
                startChange();
        }
    });

    $("#inputFechaInicioCertificado").blur(function (e) {

        if (ValidarFecha($("#inputFechaInicioCertificado").data("kendoDatePicker"), $("#inputFechaInicioCertificado").data("kendoDatePicker").value()))
            startChange();
    });

}

function SuscribirEventoFechaVigenciaFin() {
    $("#inputFechaFinCertificado").kendoDatePicker({

        //format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
        change: function (e) {
            if (ValidarFecha(this, e.sender._value))
                endChange();
        }
    });

    $("#inputFechaFinCertificado").blur(function (e) {
        if (ValidarFecha($("#inputFechaFinCertificado").data("kendoDatePicker"), $("#inputFechaFinCertificado").data("kendoDatePicker").value()))
            endChange();
    });


}

function SuscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        dataTextField: "TipoDePrueba",
        dataValueField: "TipoPruebaID",
        autoBind: false,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputTipoPrueba").data("kendoComboBox").text("");
            }
        }
    });
}

function SuscribirEventoDiametroCertificado() {
    $("#inputDiametroCalificado").kendoNumericTextBox({
        format: "#.0000",
        min: 0,
        value: "0",
        decimals: 5
    });
}

function SuscribirEventoCedula() {
    $("#inputCedulaTuboPQR").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        dataTextField: "CedulaTuboCalificadoDesc",
        dataValueField: "CedulaTuboCalificadoID",
        autoBind: false,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputCedulaTuboPQR").data("kendoComboBox").text("");
            }
        }
    });
}

function SuscribirEventoEspesorMaximo() {
    $("#inputEspesorMaximo").kendoNumericTextBox({
        format: "#.0000",
        min: 0,
        value: "0",
        decimals: 5,

    });
    $("#inputEspesorMaximo").data("kendoNumericTextBox").readonly();
}


function SuscribirEventoEspesorMinimo() {
    $("#inputEspesorMinimo").kendoNumericTextBox({
        format: "#.0000",
        min: 0,
        value: "0",
        decimals: 5
    });

    $("#inputEspesorMinimo").blur(function (e) {
        var ipasosSoldadura = parseFloat($("#inputPasosSoldadura").kendoNumericTextBox().val());
        var iEspesorMinimo = parseFloat($("#inputEspesorMinimo").kendoNumericTextBox().val());
        if (ipasosSoldadura >= 3 && iEspesorMinimo >= 13) {
            $("#inputEspesorMaximo").data("kendoNumericTextBox").value('999999999999.0');
        }
        else {
            $("#inputEspesorMaximo").data("kendoNumericTextBox").value(parseFloat($("#inputEspesorMinimo").kendoNumericTextBox().val()) * 2);
        }
        $("#inputEspesorMinimo").kendoNumericTextBox({ format: "#.0000" });
        $("#inputPasosSoldadura").kendoNumericTextBox({ format: "#" });
    });
}

function SuscribirEventoNumeroPasos() {
    $("#inputPasosSoldadura").kendoNumericTextBox({
        format: "#",
        min: 0,
        change: function (e) {
            var ipasosSoldadura = $("#inputPasosSoldadura").kendoNumericTextBox().val();
            var iEspesorMinimo = $("#inputEspesorMinimo").kendoNumericTextBox().val();
            iEspesorMinimo = parseFloat(iEspesorMinimo);
            if (parseInt(ipasosSoldadura) >= 3 && iEspesorMinimo >= 13) {
                $("#inputEspesorMaximo").data("kendoNumericTextBox").value('999999999999.0');
            }
            else {
                $("#inputEspesorMaximo").data("kendoNumericTextBox").value(parseFloat($("#inputEspesorMinimo").kendoNumericTextBox().val()) * 2);
            }
            $("#inputEspesorMinimo").kendoNumericTextBox({ format: "#.0000" });
            $("#inputPasosSoldadura").kendoNumericTextBox({ format: "#" });
        }
    });


}

function SuscribirEventoProcesoSoldadura() {
    $("#inputProcesoSol").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "TipoProcesoSoldaduraDesc",
        dataValueField: "TipoProcesoSoldaduraID",

        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputProcesoSol").data("kendoComboBox").text("");
            }
            else {
                if (parseInt(dataItem.TipoProcesoSoldaduraID) == 2 && $("#inputNombreWPS").data("kendoComboBox").dataItem($("#inputNombreWPS").data("kendoComboBox").select()).EspesorRaiz == 0) {
                    this.select(0);
                    displayNotify("WPSMensajeErrorPQRNoAplicaRaiz", "", '2');
                }
                if (parseInt(dataItem.TipoProcesoSoldaduraID) == 3 && $("#inputNombreWPS").data("kendoComboBox").dataItem($("#inputNombreWPS").data("kendoComboBox").select()).EspesorRelleno == 0) {
                    this.select(0);
                    displayNotify("WPSMensajeErrorPQRNoAplicaRelleno", "", '2');
                }
                if (parseInt(dataItem.TipoProcesoSoldaduraID) == 4 && ($("#inputNombreWPS").data("kendoComboBox").dataItem($("#inputNombreWPS").data("kendoComboBox").select()).EspesorRaiz == 0 || $("#inputNombreWPS").data("kendoComboBox").dataItem($("#inputNombreWPS").data("kendoComboBox").select()).EspesorRelleno == 0)) {
                    this.select(0);
                    displayNotify("WPSNoAceptaAmbos", "", '2');
                }

            }
        }
    });

}

function SuscribirEventoNompreWPS() {
    $("#inputNombreWPS").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "WPSID",
        suggest: true,

        delay: 10,
        filter: "contains",
        index: 3,
        delay: 10,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputNombreWPS").data("kendoComboBox").text("");
            }
            else {
                $("#inputProcesoSol").data("kendoComboBox").select(0);
            }
        }
    });

}

function suscribirEventoGuardarNuevoSoldadorCertificacion() {
    $('.accionGuardar').click(function () {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            ValidarInformacionNuevoSoldadorCertificacion(0);
        }
        else {
            HabilitarCapturaNuevoSoldadorCertificacioon(false, "FieldSetView");
        }
    });

    $('.accionGuardarYNuevo').click(function () {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            ValidarInformacionNuevoSoldadorCertificacion(1);
        }
    });
}