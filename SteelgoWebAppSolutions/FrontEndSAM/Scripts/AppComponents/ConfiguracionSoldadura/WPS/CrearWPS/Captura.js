function changeLanguageCall() {
    document.title = _dictionary.NuevoWPSBreadcrumb[$("#language").data("kendoDropDownList").value()];
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
        $('#NomnreWPS').css('opacity', '0.8');
        $('#PQRRaizNombre').data("kendoComboBox").enable(false);
        $('#PQRRellenoNombre').data("kendoComboBox").enable(false);
        $('#grupoPRelleno').attr('disabled', true);
        $('#grupoPRelleno').css('opacity', '0.8');
        $('#grupoPRaiz').attr('disabled', true);
        $('#grupoPRaiz').css('opacity', '0.8');
        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#NomnreWPS').attr('disabled', false);
        $('#NomnreWPS').css('opacity', '1');
        $('#PQRRaizNombre').data("kendoComboBox").enable(true);
        $('#PQRRellenoNombre').data("kendoComboBox").enable(true);
        $('#grupoPRelleno').attr('disabled', false);
        $('#grupoPRelleno').css('opacity', '1');
        $('#grupoPRaiz').attr('disabled', false);
        $('#grupoPRaiz').css('opacity', '1');
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
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT));
            espesores[0].EspesorMinimo = (1.1 * parseFloat(EspesorTotalT));
        }
        else {
            if (EspesorTotalT < 1.5) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT));
                espesores[0].EspesorMinimo = parseFloat(EspesorTotalT);
            }
            else if (EspesorTotalT >= 1.5 && EspesorTotalT < 10) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT));
                espesores[0].EspesorMinimo = 1.5000;
            }
            else if (EspesorTotalT >= 10 && EspesorTotalT < 19) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT));
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 19 && EspesorTotalT < 38) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT));
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 38 && EspesorTotalT < 150) {
                espesores[0].EspesorMaximo = 200.0000;
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 150) {
                espesores[0].EspesorMaximo = (1.33 * parseFloat(EspesorTotalT));
                espesores[0].EspesorMinimo = 5.0000;
            }
        }
    }
    else {
        if (EspesorTotalT < 6) {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT));
            espesores[0].EspesorMinimo = (parseFloat(EspesorTotalT) / 2);
        }
        else {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT));
            espesores[0].EspesorMinimo = parseFloat(EspesorTotalT);
        }
    }
    return espesores;
}


function obtenerGruposPLiberar(gp1, gp2, gp3, gp4) {
    var array = [];
    array[0] = gp1;
    array[1] = gp2;
    array[2] = gp3;
    array[3] = gp4;


    array.unique()
    
}

Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
        }(function (a, b, c) {
       return c.indexOf(a, b + 1) < 0
});