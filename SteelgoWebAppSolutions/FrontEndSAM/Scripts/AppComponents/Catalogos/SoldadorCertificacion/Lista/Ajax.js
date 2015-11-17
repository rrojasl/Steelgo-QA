function ObtenerJSONParaGrid()
{
    $SoldadorCertificacion.SoldadorCertificacion.read({ TipoDato:1, token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            resultadoJson = data;
            if (resultadoJson.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data(resultadoJson);
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            };
        }

    });

}
function EliminaSoldadorCertificacionAjax(dataItem) {
    
   
    if (confirm(_dictionary.lblConfirmaElimanarPQR[$("#language").data("kendoDropDownList").value()])) {
        $SoldadorCertificacion.SoldadorCertificacion.update({}, { TipoDeDato: 4, SoldadorCertificacionID: dataItem.SoldadorCertificacionID, token: Cookies.get("token") }).done(function (data) {
            loadingStart();
            ObtenerJSONParaGrid();
            loadingStop();

        });
    }
}



