var endRangeDate;
var endRangeDate2;


$("#CancelaSoldadorCertificacion").click(function (e) {
    $("#windowSoldadorCertificacion").data("kendoWindow").close();
});
$("#GuardaSoldadorCertificacion").click(function (e) {


    SoldadorCertificacionModal = {
        SoldadorCertificacionID: "",
        ObreroID: "",
        CodigoObrero: "",
        PQRID: "",
        NombrePQR: "",
        FechaInicioCertificado: "",
        FechaFinCertificado: "",
        EspesorMinimo: "",
        EspesorMaximo: "",
        PorcentajeJuntasRequiere: "",
        CertificadoActivo: "",
    };

    SoldadorCertificacionModal.SoldadorCertificacionID = $("#SoldadorCertificacionID").val();
    SoldadorCertificacionModal.ObreroID = $("#SoldadorCertificacionCargarObreroID").val();
    SoldadorCertificacionModal.PQRID = $("#SoldadorCertificacionCargarPQRID").val();
    SoldadorCertificacionModal.FechaInicioCertificado = $("#SoldadorCertificacionFechaInicio").val();
    SoldadorCertificacionModal.FechaFinCertificado = $("#SoldadorCertificacionFechaFin").val();
    SoldadorCertificacionModal.EspesorMinimo = $("#SoldadorCertificacionEspesorMinimoID").val();
    SoldadorCertificacionModal.EspesorMaximo = $("#SoldadorCertificacionEspesorMaximoID").val();
    SoldadorCertificacionModal.PorcentajeJuntasRequiere = $("#SoldadorCertificacionPorcentajeJuntas").val();
    SoldadorCertificacionModal.CertificadoActivo = $("#chkSoldadorCertificacionCertificacion").is(':checked');

    //alert(SoldadorCertificacionModal.SoldadorCertificacionID + ' ' + SoldadorCertificacionModal.CodigoObrero + ' ' + SoldadorCertificacionModal.NombrePQR + ' ' +
    //    SoldadorCertificacionModal.FechaInicioCertificado + ' ' + SoldadorCertificacionModal.FechaFinCertificado + ' ' + SoldadorCertificacionModal.EspesorMinimo
    //    + ' ' + SoldadorCertificacionModal.EspesorMaximo + ' ' + SoldadorCertificacionModal.PorcentajeJuntasRequiere + ' ' + SoldadorCertificacionModal.CertificadoActivo);

    if (validarRequeridosSoldadorCertificacion()) {
       

        var fechaInicio = SoldadorCertificacionModal.FechaInicioCertificado;
        var fechaFin = SoldadorCertificacionModal.FechaFinCertificado;
        var Idioma = $("#language").val();


       alert(fechaInicio + ' ' + fechaFin + ' ' + Idioma);

        if (ValidaFormatoFecha(fechaInicio, Idioma) == false) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaFechasInicioSoldadorCertificacion", "", '1');
        }

        else if (ValidaFormatoFecha(fechaFin, Idioma) == false) {
            $(this).closest("div").find("label").addClass("error");
            $(this).closest("div").addClass("clearfix");
            displayMessage("lblValidaFechasFinSoldadorCertificacion", "", '1');
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

        else {
            $(this).closest("div").find("label").removeClass("error");
            $(this).closest("div").removeClass("clearfix");

         

            if (SoldadorCertificacionModal.SoldadorCertificacionID == 0) {

                AgrarSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal);
            }
            else  {
                EditaSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal);
              
            }




        }


    }
    else {
        displayMessage("notificationslabel0031", "", '1');
    }






});


