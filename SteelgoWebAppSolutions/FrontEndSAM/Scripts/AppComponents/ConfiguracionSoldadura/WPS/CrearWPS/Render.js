function changeLanguageCall() {
    //document.title = _dictionary.WPSLabelNavegacion[$("#language").data("kendoDropDownList").value()];
    ConvertirCombos();
    setTimeout(function () { obtenerPQRAjax(); }, 1000);

};


function ConvertirCombos() {


    $("#PQRRaizNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        suggest: true,
        delay: 10,
        filter: "contains",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
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
                    $("#RaizEspesorRaiz").text(parseFloat(dataItem.EspesorRaiz).toFixed(4));
                    $("#RaizEspesorRelleno").text(parseFloat(dataItem.EspesorRelleno).toFixed(4));

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
            }
        }
    });


    $("#PQRRellenoNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        suggest: true,
        delay: 10,
        filter: "contains",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if (dataItem != undefined) {
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
                        $("#RellenoEspesorRaiz").text(parseFloat(dataItem.EspesorRaiz).toFixed(4));
                        $("#RellenoEspesorRelleno").text(parseFloat(dataItem.EspesorRelleno).toFixed(4));

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
                }
            }
        },
    });

};

function ContieneGruposMaterialBase(Base1Uno, Base2Uno, Base1Dos, Base2Dos) {


    if (Base1Uno == Base1Dos) {
        if (Base1Uno == Base2Dos) {
            return true;
        }
        else {
            if (Base2Uno == Base1Dos || Base2Uno == Base2Dos) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else if (Base1Uno == Base2Dos) {
        if (Base2Uno == Base1Dos || Base2Uno == Base2Dos) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (Base2Uno == Base1Dos && Base2Uno == Base2Dos) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}




function Limpiar() {
    $('#NomnreWPS').val("");
    $('#PQRRaizNombre').data("kendoComboBox").value("");
    $('#PQRRellenoNombre').data("kendoComboBox").value("");
    $('#grupoPRelleno').val("");
    $('#grupoPRaiz').val("");
    document.getElementById("PREHEATRelleno").checked = false;
    document.getElementById("PWHRelleno").checked = false;
    document.getElementById("PREHEATRaiz").checked = false;
    document.getElementById("PWHRaiz").checked = false;
    $('#RellenoEspesorRaiz').text("0");
    $('#RellenoEspesorRelleno').text("0");
    $('#RaizEspesorRaiz').text("0");
    $('#RaizEspesorRelleno').text("0");
    $('#EspesorMaximoWPS').text("0");
    $('#EspesorMinimoWPS').text("0");
    $("#WPSID").val("0");
    $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#btnGuardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#Guardar1").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#btnGuardar1").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
};


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#NomnreWPS').attr('disabled', true);
        $('#PQRRaizNombre').data("kendoComboBox").enable(false);
        $('#PQRRellenoNombre').data("kendoComboBox").enable(false);
        $('#grupoPRelleno').attr('disabled', true);
        $('#grupoPRaiz').attr('disabled', true);
        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#NomnreWPS').attr('disabled', false);
        $('#PQRRaizNombre').data("kendoComboBox").enable(true);
        $('#PQRRellenoNombre').data("kendoComboBox").enable(true);
        $('#grupoPRelleno').attr('disabled', false);
        $('#grupoPRaiz').attr('disabled', false);
        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}


function ObtenerEspesorCorrecto(EspesorTotalT, PWHT, ProcesoSoldadura, esRaiz) {
    var espesores = [];
    espesores[0] = { EspesorMaximo: "", EspesorMinimo: "" };
    if (PWHT == 1 || (PWHT == 0 && EspesorTotalT > 16)) {

        if (ProcesoSoldadura == "GMAW STT" && EspesorTotalT < 13 && esRaiz) {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
            espesores[0].EspesorMinimo = (1.1 * parseFloat(EspesorTotalT)).toFixed(4);
        }
        else {
            if (EspesorTotalT < 1.5) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = parseFloat(EspesorTotalT).toFixed(4);
            }
            else if (EspesorTotalT >= 1.5 && EspesorTotalT < 10) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 1.5000;
            }
            else if (EspesorTotalT >= 10 && EspesorTotalT < 19) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 19 && EspesorTotalT < 38) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 38 && EspesorTotalT < 150) {
                espesores[0].EspesorMaximo = 200.0000;
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 150) {
                espesores[0].EspesorMaximo = (1.33 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 5.0000;
            }
        }
    }
    else {
        if (EspesorTotalT < 6) {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
            espesores[0].EspesorMinimo = (parseFloat(EspesorTotalT) / 2).toFixed(4);
        }
        else {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
            espesores[0].EspesorMinimo = parseFloat(EspesorTotalT).toFixed(4);
        }
    }
    return espesores;
}