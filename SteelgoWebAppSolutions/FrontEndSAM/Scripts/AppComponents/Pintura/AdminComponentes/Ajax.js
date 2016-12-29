function AjaxDetalleGridComponentes() {
    loadingStart();

    $AdminComponentes.AdminComponentes.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (array) {
        if (Error(array)) {
            var ds = $("#grid").data("kendoGrid").dataSource;
                for (var i = 0; i < array.length; i++) {
                        ds.add(array[i]);
                }
                $("#grid").data("kendoGrid").dataSource.sync();
        }
        loadingStop();
    });
};

function AjaxObtenerCatalogoComponentes() {
    loadingStart();
    $AdminComponentes.AdminComponentes.read({ token: Cookies.get("token"), lenguaje: $("#language").val(),bandera:1 }).done(function (array) {
        if (Error(array)) {
            ListaCatalogoComponentes = array;
        }
        loadingStop();
    });
};