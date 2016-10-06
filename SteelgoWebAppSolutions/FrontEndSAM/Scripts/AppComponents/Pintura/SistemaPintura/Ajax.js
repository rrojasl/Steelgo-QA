function AjaxObtenerProyectos() {
    loadingStart();

    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoMultiSelect").dataSource.data([]);
        $("#inputProyecto").data("kendoMultiSelect").value("");
        data.shift();
        $("#inputProyecto").data("kendoMultiSelect").dataSource.data(data);
        AjaxCargarNuevoSistemaPintura();
    });
}


function AjaxObtenerColor() {
    loadingStart();

    $PinturaGeneral.PinturaGeneral.read({ token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        $("#inputColor").data("kendoMultiSelect").dataSource.data([]);
        $("#inputColor").data("kendoMultiSelect").value("");
        data.shift();
        $("#inputColor").data("kendoMultiSelect").dataSource.data(data);
        AjaxObtenerProyectos();
    });
}


function AjaxCargarNuevoSistemaPintura() {

    loadingStart();
    $SistemaPintura.SistemaPintura.read({ token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
            
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }
        }
        loadingStop();

    });

}