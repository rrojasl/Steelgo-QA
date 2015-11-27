$("#CancelarWPS").click(function (e) {
    $("#windowWPS").data("kendoWindow").close();
});


$("#GuardarWPS").click(function (e) {

    WPSModal = {

        WPSID: "",
        WPSNombre: "",
        PQRRaizId: "",
        PQRRellenoId: "",
        GrupoPIdRaiz: "",
        GrupoPIdRelleno: "",
        PWHTRaiz: "",
        PWHTRelleno: "",
        EspesorMaximoRaiz: "",
        EspesorMinimoRaiz: "",
        EspesorMaximoRelleno: "",
        EspesorMinimoRelleno: "",
    }

    WPSModal.WPSID = $("#WPSID").val();
    WPSModal.WPSNombre = $("#NomnreWPS").val();
    WPSModal.PQRRaizId = $("#PQRRaizNombre").val();
    WPSModal.PQRRellenoId = $("#PQRRellenoNombre").val();
    WPSModal.GrupoPIdRaiz = $("#grupoPRaiz").val();
    WPSModal.GrupoPIdRelleno = $("#grupoPRelleno").val();
    WPSModal.PWHTRaiz = $("#PWHRaiz").is(':checked');
    WPSModal.PWHTRelleno = $("#PWHRelleno").is(':checked');
    WPSModal.EspesorMaximoRaiz = $("#EspesoirMaximoRaiz").val();
    WPSModal.EspesorMinimoRaiz = $("#EspesoirMinimoRaiz").val();
    WPSModal.EspesorMaximoRelleno = $("#EspesoirMaximoRelleno").val();
    WPSModal.EspesorMinimoRelleno = $("#EspesoirMinimoRelleno").val();

    WPSModal.GrupoPId = $("#grupoPRaiz").val();
    WPSModal.PWHTId = $("#PWHRaiz").is(':checked');

    if (validarRequeridosWPS()) {

        var pwhtRaizValida = WPSModal.PWHTRaiz;
        var pwhtRellenoValida = WPSModal.PWHTRelleno;
        var grupoPRellenoValida = WPSModal.GrupoPIdRaiz;
        var GrupoPRaizValida = WPSModal.GrupoPIdRelleno;
        var NombreWPSValida = WPSModal.WPSNombre;
        var WPSIDValida = WPSModal.WPSID;
        var Accion = 9090;
       
        $WPS.WPS.read({ NombreWPSValida: WPSModal.WPSNombre, token: Cookies.get("token"), WPSIDValida: WPSModal.WPSID, Accion:9090 }).done(function (data) {

            if (data.ReturnMessage == "Error") {
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("lblExisteNombreWPS", "", '1');
            }
           else if (pwhtRaizValida != pwhtRellenoValida) {
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("WPSPWHTNoCoinciden", "", '1');
            }

            else if (grupoPRellenoValida != GrupoPRaizValida) {
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("WPSGrupoPNoCoinciden", "", '1');
            }
            else {
                $(this).closest("div").find("label").removeClass("error");
                $(this).closest("div").removeClass("clearfix");

                if (WPSModal.WPSID == 0) {
                    GuardaNuevoWPSAjax(WPSModal);
                }
                else {
                    EditaWPSAjax(WPSModal);
                }
            }


        });


    }
    else {
        displayMessage("notificationslabel0031", "", '1');
    }


});
