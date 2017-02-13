﻿function AjaxCargarProyecto() {
    loadingStart();
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#InputProyecto").data("kendoComboBox").dataSource.data([]);
            var proyectoId = 0;

            if (data.length > 0) {
                $("#InputProyecto").data("kendoComboBox").dataSource.data(data);
                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ProyectoID != 0) {
                            proyectoId = data[i].ProyectoID;
                        }
                    }
                }

                $("#InputProyecto").data("kendoComboBox").value(proyectoId);
                $("#InputProyecto").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxCargarPeriodos() {
    loadingStart();
    $Periodo.Periodo.read({ token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        $("#InputPeriodo").data("kendoComboBox").dataSource.data([]);

        if (data.length > 0) {
            $("#InputPeriodo").data("kendoComboBox").dataSource.data(data);

            $("#InputPeriodo").data("kendoComboBox").value(0);
            $("#InputPeriodo").data("kendoComboBox").trigger("change");
        }
        loadingStop();
    });
}

function AjaxCargarRangoFechas(dataItem) {
    loadingStart();
    $Periodo.Periodo.read({
        token: Cookies.get("token"), Lenguaje: $("#language").val(), Minuendo: dataItem.Minuendo,
        Sustraendo: dataItem.Sustraendo, FechaFinal: $("#InputFechaFin").val()
    }).done(function (data) {
        if (data != undefined) {
            $("#InputFechaInicio").val(data.FechaInicio);
            $("#InputFechaFin").val(data.FechaFin);

        }
        loadingStop();
    });
}