function AjaxObtenerOrdenesCompra() {
    loadingStart();

    $Dynasol.Dynasol.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            $("#inputOrdenCompra").data("kendoComboBox").setDataSource([]);
            $("#inputOrdenCompra").data("kendoComboBox").text("");
            $("#inputOrdenCompra").data("kendoComboBox").dataSource.data(data);

            if ($("#inputOrdenCompra").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputOrdenCompra").data("kendoComboBox").select(1);
                AjaxCargarRevision();
            }
            else {
                $("#inputOrdenCompra").data("kendoComboBox").select(0);
                loadingStop();
            }

        }

    });
}

function AjaxCargarRevision() {

    loadingStart();
    $Dynasol.Dynasol.read({ token: Cookies.get("token"), OrdenCompraID: $("#inputOrdenCompra").data("kendoComboBox").value() }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);

            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
            if (data.length > 0) {
                ds.data(data);
            }
        }
        ds.sync();
        loadingStop();


    });
}