function AjaxObtenerProyectos() {
    loadingStart();

    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoMultiSelect").dataSource.data([]);
        $("#inputProyecto").data("kendoMultiSelect").value("");
        $("#inputProyecto").data("kendoMultiSelect").dataSource.data(data);
    });
}


function AjaxObtenerColor() {
    loadingStart();

    $PinturaGeneral.PinturaGeneral.read({ token: Cookies.get("token"),Lenguaje: $("#language").val() }).done(function (data) {
        $("#inputColor").data("kendoMultiSelect").dataSource.data([]);
        $("#inputColor").data("kendoMultiSelect").value("");
        $("#inputColor").data("kendoMultiSelect").dataSource.data(data);
        AjaxObtenerProyectos();
    });
}
