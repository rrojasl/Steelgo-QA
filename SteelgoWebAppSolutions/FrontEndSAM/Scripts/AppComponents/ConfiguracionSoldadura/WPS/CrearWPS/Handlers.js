function suscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoNombreWPS();
    suscribirEventoRaizNombre();
    suscribirEventoRellenoNombre();
}

function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            AjaxExisteWPS(0);
        }
        else if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        AjaxExisteWPS(1);
    });


}

function suscribirEventoNombreWPS() {
    $("#NomnreWPS").keyup(function (e) {
        $('#NomnreWPS').val($('#NomnreWPS').val().toUpperCase());
    });
}

function suscribirEventoRaizNombre()
{
    $("#PQRRaizNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        suggest: true,
        delay: 10,
        filter: "contains",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined && dataItem.Accion != 0) {
                if (dataItem.CodigoRaiz != "N/A") {
                    if (dataItem.PREHEAT) {
                        var data = kendo.observable({
                            optionCheck: true
                        });
                        kendo.bind($("#PREHEATRaiz"), data);
                    } else {
                        var data = kendo.observable({
                            optionCheck: false
                        });
                        kendo.bind($("#PREHEATRaiz"), data);
                    }
                    if (dataItem.PWHT) {
                        var data = kendo.observable({
                            optionCheck: true
                        });
                        kendo.bind($("#PWHRaiz"), data);
                    }
                    else {
                        var data = kendo.observable({
                            optionCheck: false
                        });
                        kendo.bind($("#PWHRaiz"), data);
                    }
                    $("#grupoPRaiz").val(dataItem.GrupoPMaterialBase1Nombre + " - " + dataItem.GrupoPMaterialBase2Nombre);
                    $("#RaizEspesorRaiz").text(parseFloat(dataItem.EspesorRaiz));
                    $("#RaizEspesorRelleno").text(parseFloat(dataItem.EspesorRelleno));

                    var EspesoresRaiz = ObtenerEspesorCorrecto(parseFloat(dataItem.EspesorRaiz) + parseFloat(dataItem.EspesorRelleno), dataItem.PWHT, dataItem.ProcesoSoldadura, true);
                    var EspesoresRelleno;
                    if ($("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()) == undefined) {
                        $("#EspesorMaximoWPS").text(parseFloat(EspesoresRaiz[0].EspesorMaximo));
                        $("#EspesorMinimoWPS").text(parseFloat(EspesoresRaiz[0].EspesorMinimo));
                    }
                    else {
                        EspesoresRelleno = ObtenerEspesorCorrecto(parseFloat($("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()).EspesorRelleno) +
                                                                  parseFloat($("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()).EspesorRaiz),
                                                                  $('#PWHRelleno').is(':checked'), $("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()).CodigoRelleno,
                                                                  true);
                        $("#EspesorMaximoWPS").text(parseFloat(EspesoresRaiz[0].EspesorMaximo) > parseFloat(EspesoresRelleno[0].EspesorMaximo) ? parseFloat(EspesoresRaiz[0].EspesorMaximo) : parseFloat(EspesoresRelleno[0].EspesorMaximo));
                        $("#EspesorMinimoWPS").text(parseFloat(EspesoresRaiz[0].EspesorMinimo) < parseFloat(EspesoresRelleno[0].EspesorMinimo) ? parseFloat(EspesoresRaiz[0].EspesorMinimo) : parseFloat(EspesoresRelleno[0].EspesorMinimo));
                    }
                }
                else {
                    displayNotify("WPSMensajeErrorPQRNoAplicaRaiz", "", "1");
                    $("#PQRRaizNombre").data("kendoComboBox").value("");
                    $("#grupoPRaiz").val("");
                    $("#RaizEspesorRaiz").text(0);
                    $("#RaizEspesorRelleno").text(0);
                    var data = kendo.observable({
                        optionCheck: false
                    });
                    kendo.bind($("#PREHEATRaiz"), data);
                    kendo.bind($("#PWHRaiz"), data);
                }
                if ($("#PQRRellenoNombre").data("kendoComboBox").value() == "") {
                    $("#EspesorMaximoWPS").text("0");
                    $("#EspesorMinimoWPS").text("0");
                }

            }
            else {
                $("#PQRRaizNombre").data("kendoComboBox").value("");
                $("#grupoPRaiz").val("");
                $("#RaizEspesorRaiz").text(0);
                $("#RaizEspesorRelleno").text(0);
                var data = kendo.observable({
                    optionCheck: false
                });
                kendo.bind($("#PREHEATRaiz"), data);
                kendo.bind($("#PWHRaiz"), data);

                if ($("#PQRRellenoNombre").text() == "") {
                    $("#EspesorMaximoWPS").text("0");
                    $("#EspesorMinimoWPS").text("0");
                }
            }
        }
    });

}

function suscribirEventoRellenoNombre() {
    $("#PQRRellenoNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        suggest: true,
        delay: 10,
        filter: "contains",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined && dataItem.Accion != 0) {
                if (dataItem.CodigoRelleno != "N/A") {
                    if (dataItem.PREHEAT) {
                        var data = kendo.observable({
                            optionCheck: true
                        });
                        kendo.bind($("#PREHEATRelleno"), data);
                    } else {
                        var data = kendo.observable({
                            optionCheck: false
                        });
                        kendo.bind($("#PREHEATRelleno"), data);
                    }
                    if (dataItem.PWHT) {
                        var data = kendo.observable({
                            optionCheck: true
                        });
                        kendo.bind($("#PWHRelleno"), data);
                    }
                    else {
                        var data = kendo.observable({
                            optionCheck: false
                        });
                        kendo.bind($("#PWHRelleno"), data);
                    }
                    $("#grupoPRelleno").val(dataItem.GrupoPMaterialBase1Nombre + " - " + dataItem.GrupoPMaterialBase2Nombre);
                    $("#RellenoEspesorRaiz").text(parseFloat(dataItem.EspesorRaiz));
                    $("#RellenoEspesorRelleno").text(parseFloat(dataItem.EspesorRelleno));

                    var EspesoresRelleno = ObtenerEspesorCorrecto(parseFloat(dataItem.EspesorRaiz) + parseFloat(dataItem.EspesorRelleno), dataItem.PWHT, dataItem.ProcesoSoldadura, true);
                    var EspesoresRaiz;
                    if ($("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()) == undefined) {
                        $("#EspesorMaximoWPS").text(parseFloat(EspesoresRelleno[0].EspesorMaximo));
                        $("#EspesorMinimoWPS").text(parseFloat(EspesoresRelleno[0].EspesorMinimo));
                    }
                    else {
                        EspesoresRaiz = ObtenerEspesorCorrecto(parseFloat($("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()).EspesorRelleno) +
                                                                  parseFloat($("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()).EspesorRaiz),
                                                                  $('#PWHRelleno').is(':checked'), $("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()).CodigoRelleno,
                                                                  false);
                        $("#EspesorMaximoWPS").text(parseFloat(EspesoresRelleno[0].EspesorMaximo) > parseFloat(EspesoresRaiz[0].EspesorMaximo) ? parseFloat(EspesoresRelleno[0].EspesorMaximo) : parseFloat(EspesoresRaiz[0].EspesorMaximo));
                        $("#EspesorMinimoWPS").text(parseFloat(EspesoresRelleno[0].EspesorMinimo) < parseFloat(EspesoresRaiz[0].EspesorMinimo) ? parseFloat(EspesoresRelleno[0].EspesorMinimo) : parseFloat(EspesoresRaiz[0].EspesorMinimo));
                    }
                }
                else {
                    displayNotify("WPSMensajeErrorPQRNoAplicaRelleno", "", "1");
                    $("#PQRRellenoNombre").data("kendoComboBox").value("");
                    $("#grupoPRelleno").val("");
                    $("#RellenoEspesorRaiz").text(0);
                    $("#RellenoEspesorRelleno").text(0);
                    var data = kendo.observable({
                        optionCheck: false
                    });
                    kendo.bind($("#PREHEATRelleno"), data);
                    kendo.bind($("#PWHRelleno"), data);
                    if ($("#PQRRaizNombre").data("kendoComboBox").value() == "") {
                        $("#EspesorMaximoWPS").text("0");
                        $("#EspesorMinimoWPS").text("0");
                    }
                }
            }
            else {
                $("#PQRRellenoNombre").data("kendoComboBox").value("");
                $("#grupoPRelleno").val("");
                $("#RellenoEspesorRaiz").text(0);
                $("#RellenoEspesorRelleno").text(0);
                var data = kendo.observable({
                    optionCheck: false
                });
                kendo.bind($("#PREHEATRelleno"), data);
                kendo.bind($("#PWHRelleno"), data);

                if ($("#PQRRaizNombre").text() == "") {
                    $("#EspesorMaximoWPS").text("0");
                    $("#EspesorMinimoWPS").text("0");
                }
            }

        },
    });
};