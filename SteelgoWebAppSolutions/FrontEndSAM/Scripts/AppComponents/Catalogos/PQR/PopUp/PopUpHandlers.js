$("#CancelaEditarPQR").click(function (e) {
    $("#windowPQR").data("kendoWindow").close();
});



$("#EditaPQR").click(function (e) {
    PQRModal = {
        PQRID: "",
        Nombre: "",
        PREHEAT: "",
        PWHT: "",
        EspesorRaiz: "",
        EspesorRelleno: "",
        ProcesoSoldaduraRellenoID: "",
        ProcesoSoldaduraRaizID:"",
        NumeroP: "",
        GrupoPMaterialBase1: "",
        GrupoPMaterialBase2: "",
        Aporte: "",
        Mezcla: "",
        Respaldo: "",
        GrupoF: "",
        Codigo: "",
    };
    PQRModal.PQRID = $("#IdPQR").val();
    PQRModal.Nombre = $("#NombreId").val();
    PQRModal.PREHEAT = $("#chkPreheat").is(':checked');
    PQRModal.PWHT = $("#chkPwht").is(':checked');  
    PQRModal.EspesorRaiz = $("#EspesorRaiz").val();
    PQRModal.EspesorRelleno = $("#EspesorRelleno").val();
    PQRModal.ProcesoSoldaduraRellenoID = $("#ProcesoSoldaduraRellenoID").val();
    PQRModal.ProcesoSoldaduraRaizID = $("#ProcesoSoldaduraRaizID").val();
    PQRModal.NumeroP = $("#NumeroPID").val();
    PQRModal.GrupoPMaterialBase1 = $("#GrupoPMaterialBase1ID").val();
    PQRModal.GrupoPMaterialBase2 = $("#GrupoPMaterialBase2ID").val();
    PQRModal.Aporte = $("#AporteID").val();
    PQRModal.Mezcla = $("#MezclaID").val();
    PQRModal.Respaldo = $("#RespaldoID").val();
    PQRModal.GrupoF = $("#GrupoFID").val();
    PQRModal.Codigo = $("#CodigoID").val();

    

    if (validarRequeridosPQR()) {

        var PQRID  = $("#IdPQR").val();
        var nombrePQR = $("#NombreId").val();
        var Accion = 6;
        $PQR.PQR.read({ nombrePQR, token: Cookies.get("token"), PQRID, Accion }).done(function (data) {

            if (data.ReturnMessage == "Error") {

                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("lblExisteNombrePQR", "", '1');
            }
            else if (isNaN($("#EspesorRelleno").val())) {
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("lblValidaEspesorRellenoPQR", "", '1');
            }
            else if (isNaN($("#EspesorRaiz").val())) {
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("lblValidaEspesorRaizPQR", "", '1');
            }

            else {
                $(this).closest("div").find("label").removeClass("error");
                $(this).closest("div").removeClass("clearfix");

                if (PQRModal.PQRID == 0) {
                    agregarPQR(PQRModal);

                }
                else {
                    EditaPQR(PQRModal);
                }
            }
        });

    }
    else {
        displayMessage("notificationslabel0031", "", '1');
    }





});

