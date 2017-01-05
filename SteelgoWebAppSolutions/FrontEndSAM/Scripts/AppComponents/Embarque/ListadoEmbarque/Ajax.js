function AjaxCargarCamposPredeterminados() {
    var campoPredeterminado = 3070;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: campoPredeterminado }).done(function (data) {
        if (data == "Pendientes") {
            $('#btnPendientes').trigger("click");
        }
        else if (data == "Transitados") {
            $('#btnTransito').trigger("click");
        }
        loadingStop();
        AjaxObtenerContadorPorEstatus();
    });
}

function AjaxObtenerContadorPorEstatus() {
    loadingStart();
    $ListadoEmbarque.ListadoEmbarque.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#nPendientes").text("");
        $("#nTransito").text("");

        if (data.length > 0) {
            $("#nPendientes").text(" "+data[0].Pendientes);
            $("#nTransito").text(" "+data[0].Transito);
        }
        loadingStop();
    });
}

function AjaxObtenerDetalleListadoEmbarque(estatus) {
    loadingStart();
    $ListadoEmbarque.ListadoEmbarque.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), EstatusEmbarque: estatus }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            ds.data(data);
            ds.page(1);
        } else
            ds.page(0);

        ds.sync();
        loadingStop();
    });
}