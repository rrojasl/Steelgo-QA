function AjaxCargaDetalleSistemaPintura() {
    $ListadoSistemaPintura.ListadoSistemaPintura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }
    });
}

function AjaxEliminaSistemaPintura(sistemaPinturaID) {
    $ListadoSistemaPintura.ListadoSistemaPintura.read({ token: Cookies.get("token"), SistemaPinturaID: sistemaPinturaID }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
         
            setTimeout(function () { AjaxCargaDetalleSistemaPintura(); }, 1100);
            displayNotify("SistemaPinturaEliminadoExitoso", "", '0');
        }
        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
            displayNotify("SistemaPinturaErrorEliminado", "", '2');
        }
    });
}