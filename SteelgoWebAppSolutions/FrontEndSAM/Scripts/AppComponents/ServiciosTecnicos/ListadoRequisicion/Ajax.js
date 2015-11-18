function AjaxObtenerStatus() {

    $ListadoRequisicion.ListadoRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        AgregarStatusDinamicos(data)
    });
}


function AjaxAccionesListado(idStatus) {
    loadingStart();

    $ListadoRequisicion.ListadoRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), idStatus: idStatus, }).done(function (data) {
        if (data.length > 0) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.data(data);
            $("#grid").data("kendoGrid").dataSource.page(1);
        } else {
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.page(0);
        };
        loadingStop();
    });
};