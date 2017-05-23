function AjaxCargarFechasSpool() {

    loadingStart();
    $FechasSpool.FechasSpool.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
            if(data.length > 0) {
                ds.data(data);
            }
        }
        ds.sync();
        loadingStop();
        

    });
}