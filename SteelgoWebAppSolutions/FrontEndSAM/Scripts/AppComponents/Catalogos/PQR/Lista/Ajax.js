function LlenaGridAjax() {

    var TipoDato = 1;

    $PQR.PQR.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            resultadoJson = data;
            if (resultadoJson.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data(resultadoJson);
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            };
        }

    });

};


function EliminaPQRAjax(e) {
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    $PQR.PQR.update({}, { TipoDeDato: 4, PQRID: dataItem.PQRID, token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        LlenarGridPQR();
        loadingStop();
    });


};


