$("#CancelaEditarPQR").click(function (e) {
    $("#windowPQR").data("kendoWindow").close();
});



$("#EditaPQR").click(function (e) {
    PQRModal = {
        PQRID: "",
        Nombre: "",
        PREHEAT: "",
        PWHT: "",
        Espesor: "",
        ProcesoSoldaduraID: "",
        NumeroP: "",
        GrupoP: "",
        Aporte: "",
        Mezcla: "",
        Respaldo: "",
        GrupoF: "",
    };

    PQRModal.PQRID = $("#IdPQR").val();
    PQRModal.Nombre = $("#NombreId").val();
    PQRModal.PREHEAT = $("#chkPreheat").is(':checked');
    PQRModal.PWHT = $("#chkPwht").is(':checked');
    PQRModal.Espesor = $("#Espesor").val();
    PQRModal.ProcesoSoldaduraID = $("#ProcesoSoldaduraID").val();
    PQRModal.NumeroP = $("#NumeroPID").val();
    PQRModal.GrupoP = $("#GrupoPID").val();
    PQRModal.Aporte = $("#AporteID").val();
    PQRModal.Mezcla = $("#MezclaID").val();
    PQRModal.Respaldo = $("#RespaldoID").val();
    PQRModal.GrupoF = $("#GrupoFID").val();


    if (validarRequeridosPQR()) {

        var PQRID = PQRModal.PQRID = $("#IdPQR").val();
        var nombrePQR = PQRModal.Nombre = $("#NombreId").val();
        var Accion = 6;

        $PQR.PQR.read({ nombrePQR, token: Cookies.get("token"), PQRID, Accion }).done(function (data) {

            if (data.ReturnMessage == "Error") {

                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("lblExisteNombrePQR", "", '1');
            }
            else if (isNaN($("#Espesor").val())) {
                $(this).closest("div").find("label").addClass("error");
                $(this).closest("div").addClass("clearfix");
                displayMessage("lblValidaEspesorPQR", "", '1');
            }

            else {
                $(this).closest("div").find("label").removeClass("error");
                $(this).closest("div").removeClass("clearfix");

                if (PQRModal.PQRID == 0) {
                    agregarPQR();

                }
                else {
                    EditaPQR();
                }
            }
        });

    } else {
        displayMessage("notificationslabel0031", "", '1');
    }





});

