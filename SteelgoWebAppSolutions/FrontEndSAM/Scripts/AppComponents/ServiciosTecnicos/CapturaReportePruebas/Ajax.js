function ObtenerDatosReporteAjax() {
  
    $CapturaReportesPruebas.CapturaReportesPruebas.read({ IdRequisicion: requisicionID, token: Cookies.get("token") }).done(function (data) {

        var _TipoDePrueba = data[0].TipoPrueba;
        var _Requisicion = data[0].Requisicion;
        var _HerramientaPrueba = data[0].HerramientaPrueba;
        var _TurnoLaboral = data[0].TurnoLaboral;


        LlenarDatosDeRequisicion(_TipoDePrueba, _Requisicion, _HerramientaPrueba, _TurnoLaboral);

    });
};


function ObtenerDatosGidAjax() {
   
    $CapturaReportesPruebas.CapturaReportesPruebas.read({ token: Cookies.get("token"), IdRequisicion: requisicionID, Valor: 1 }).done(function (data) {
        console.log(data);
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

