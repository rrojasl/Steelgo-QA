function AjaxObtenerStatus() {
    
    $RequisicionesAsignadas.RequisicionesAsignadas.read({ lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        AgregarStatusDinamicos(data)
    });
}

function AjaxAccionesListado(idStatus) {
    loadingStart();

    $RequisicionesAsignadas.RequisicionesAsignadas.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), idStatus: idStatus, }).done(function (data) {
        if (data.length > 0) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            //$("#grid").data("kendoGrid").dataSource.data(data);

            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;

            for (var i = 0; i < array.length; i++) {
                array[i].FechaAsignacion = new Date(ObtenerDato(array[i].FechaAsignacion, 1), ObtenerDato(array[i].FechaAsignacion, 2), ObtenerDato(array[i].FechaAsignacion, 3));//año, mes, dia
                ds.add(array[i]);
            }

            $("#grid").data("kendoGrid").dataSource.page(1);
        } else {
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.page(0);
        };
        loadingStop();
    });
};

function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura = 'es-MX')
                return fecha.split('/')[1]
            else
                return fecha.split('/')[0]
            break;
        case 3://dia
            if (cultura = 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}