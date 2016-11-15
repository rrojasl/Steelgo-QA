function changeLanguageCall() {
    //document.title = _dictionary.WPSLabelNavegacion[$("#language").data("kendoDropDownList").value()];
    suscribirEventos();
    obtenerPQRAjax();

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