function ObtenerJSONParaGrid() {

    $WPS.WPS.read({ TipoDato: 1, token: Cookies.get("token") }).done(function (data) {
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



function EliminaWPSAjax(dataItem) {



    if (confirm(_dictionary.WPSEliminar[$("#language").data("kendoDropDownList").value()])) {
      
        $WPS.WPS.update({}, { TipoDeDato: 4, WPSIdentificador: dataItem.WPSID, token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage == 'OK') {
                loadingStart();
                ObtenerJSONParaGrid();
                loadingStop();
            } else {

            };
            
        })
    }


};
