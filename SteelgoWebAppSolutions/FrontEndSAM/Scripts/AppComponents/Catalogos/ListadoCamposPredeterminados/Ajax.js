function AjaxObtenerListadoCamposPredeterminados(TipoDato) {
    
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ TipoDato, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            ResultadoJason = data;
            if (ResultadoJason.length > 0) {
                $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data(ResultadoJason);
            } else {
                $("#gridCamposPredeterminados").data("kendoGrid").dataSource.data([]);
            };
        }
    });

}