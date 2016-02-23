function AjaxObtenerProyectos() {
    $Ciclos.Ciclos.read({ token: Cookies.get("token"), idCatalogo: 1 }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").value("");

        if (data.length > 0) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
        }

        loadingStop();
    });
}
