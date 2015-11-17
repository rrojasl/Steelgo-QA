var endRangeDate;
var endRangeDate2;


$("#CancelaSoldadorCertificacion").click(function (e) {
    $("#windowSoldadorCertificacion").data("kendoWindow").close();
});
$("#GuardaSoldadorCertificacion").click(function (e) {


    SoldadorCertificacionModal = {
        SoldadorCertificacionID: "",
        ObreroID: "",
        PQRID: "",
        ProcesoSoldaduraID: "",
        TipoDePruebaID: "",
        PosicionID: "",
        FechaInicioCertificado: "",
        FechaFinCertificado: "",
        EspesorMinimo: "",
        EspesorMaximo: "",
        CedulaTuboCalificado: "",
        DiametroCalificado: "",
        PorcentajeJuntasRequiere: "",
        CertificadoActivo: "",
    };

    SoldadorCertificacionModal.SoldadorCertificacionID = $("#SoldadorCertificacionID").val();
    SoldadorCertificacionModal.ObreroID = $("#SoldadorCertificacionCargarObreroID").val();
    SoldadorCertificacionModal.PQRID = $("#SoldadorCertificacionCargarPQRID").val();
    SoldadorCertificacionModal.ProcesoSoldaduraID = $("#SoldadorCertificacionProcesoSoldaduraID").val();
    SoldadorCertificacionModal.TipoDePruebaID = $("#SoldadorCertificacionTipoDePruebaID").val();
    SoldadorCertificacionModal.PosicionID = $("#SoldadorCertificacionPosicionID").val();
    SoldadorCertificacionModal.FechaInicioCertificado = $("#SoldadorCertificacionFechaInicio").val();
    SoldadorCertificacionModal.FechaFinCertificado = $("#SoldadorCertificacionFechaFin").val();
    SoldadorCertificacionModal.EspesorMinimo = $("#SoldadorCertificacionEspesorMinimoID").val();
    SoldadorCertificacionModal.EspesorMaximo = $("#SoldadorCertificacionEspesorMaximoID").val();
    SoldadorCertificacionModal.CedulaTuboCalificado = $("#SoldadorCertificacionCedulaTuboID").val();
    SoldadorCertificacionModal.DiametroCalificado = $("#SoldadorCertificacionDiametroCalificadoID").val();
    SoldadorCertificacionModal.PorcentajeJuntasRequiere = $("#SoldadorCertificacionPorcentajeJuntas").val();
    SoldadorCertificacionModal.CertificadoActivo = $("#chkSoldadorCertificacionCertificacion").is(':checked');



    if (validarRequeridosSoldadorCertificacion()) {


        var fechaInicio = SoldadorCertificacionModal.FechaInicioCertificado;
        var fechaFin = SoldadorCertificacionModal.FechaFinCertificado;
        var Idioma = $("#language").val();
        var EspesorMinimoGuardar = SoldadorCertificacionModal.EspesorMinimo;
        var EspesorMaximoGuardar = SoldadorCertificacionModal.EspesorMaximo;


        if (ValidaFormatoFecha(fechaInicio, Idioma) == false) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("ErrorFechaInicio", "", '1');
        }

        else if (ValidaFormatoFecha(fechaFin, Idioma) == false) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("ErrorFechaFin", "", '1');
        }

        else if (isNaN($("#SoldadorCertificacionEspesorMaximoID").val())) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaEspesorMaximoSoldadorCertificación", "", '1');
        }

        else if (isNaN($("#SoldadorCertificacionEspesorMinimoID").val())) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaEspesorMinimoSoldadorCertificación", "", '1');
        }

        else if (isNaN($("#SoldadorCertificacionPorcentajeJuntas").val())) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaPorcentajeJuntasSoldadorCertificación", "", '1');
        }
        else if (isNaN($("#SoldadorCertificacionDiametroCalificadoID").val())) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaCertificacionDiametroCalificado", "", '1');
        }

        else if (EspesorMinimoGuardar > EspesorMaximoGuardar) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaDiferenciaEspesores", "", '1');
        }
        else {
            $(this).closest("div").find("label").removeClass("error");
            $(this).closest("div").removeClass("clearfix");



            if (SoldadorCertificacionModal.SoldadorCertificacionID == 0) {

                AgrarSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal);
            }
            else {
                EditaSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal);

            }
        }


    }
    else {
        displayMessage("notificationslabel0031", "", '1');
    }






});



$("#CancelaPasosSoldadura").click(function (e) {
    $("#windowPasosSoldadura").data("kendoWindow").close();
});
$("#GuardarPasosSoldadura").click(function (e) {

    TotalPasosSoldadura = $("#SoldadorCertificacionPasosDeSoldadura").val()

    if (TotalPasosSoldadura.length == 0) {
        var uno = 1
        $("#SoldadorCertificacionPasosDeSoldadura").val(uno);
        TotalPasosSoldadura = $("#SoldadorCertificacionPasosDeSoldadura").val();
    }
    else {
        TotalPasosSoldadura = $("#SoldadorCertificacionPasosDeSoldadura").val();
    }

   


    if (isNaN($("#SoldadorCertificacionPasosDeSoldadura").val())) {
        $(this).closest("div").find("label").addClass("error");
        $(this).closest("div").addClass("clearfix");
        displayMessage("lblValidaPasosSoldadura", "", '1');
    }
    else {
        CalcularEspesorMaximoMayoraCinco(TotalPasosSoldadura);
        $("#windowPasosSoldadura").data("kendoWindow").close();
    }


});

