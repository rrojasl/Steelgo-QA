function AjaxCargarProveedor() {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proveedor").data("kendoComboBox").value("");
        $("#Proveedor").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

}

function AjaxCargarTracto(area) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#Cuadrante").data("kendoComboBox").value("");
        $("#Cuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarTracto(area) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#Cuadrante").data("kendoComboBox").value("");
        $("#Cuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarTracto(area) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#Cuadrante").data("kendoComboBox").value("");
        $("#Cuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}


function AjaxCargarDatos(area, cuadrante) {
    loadingStart();
    $Embarque.Embarque.read({ token: Cookies.get("token"), AreaID: area, CuadranteID: cuadrante }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        loadingStop();
    });
}