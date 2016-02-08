function AjaxCargarArea() {
    loadingStart();
    $Area.Area.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Area").data("kendoComboBox").value("");
        $("#Area").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

}

function AjaxCargarCuadrante(area) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#Cuadrante").data("kendoComboBox").value("");
        $("#Cuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarDatos(area, cuadrante) {
    loadingStart();
    
    $Consulta.Consulta.read({ token: Cookies.get("token"), AreaID: area, CuadranteID: cuadrante }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        loadingStop();
    });
}