function AjaxCargarProyecto() {
    loadingStart();
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#Proyecto").data("kendoComboBox").dataSource.data([]);
            var proyectoId = 0;

            if (data.length > 0) {
                $("#Proyecto").data("kendoComboBox").dataSource.data(data);
                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ProyectoID != 0) {
                            proyectoId = data[i].ProyectoID;
                        }
                    }
                }

                $("#Proyecto").data("kendoComboBox").value(proyectoId);
                $("#Proyecto").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxCargarPaquetesCerrados(proyectoID) {
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID }).done(function (data) {
        $("#inputPaquete").data("kendoComboBox").dataSource.data([]);
            var PaqueteID = 0;
            if (data.length > 0) {
                $("#inputPaquete").data("kendoComboBox").dataSource.data(data);

                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].PaqueteID != 0) {
                            PaqueteID = data[i].PaqueteID;
                        }
                    }
                }

                $("#inputPaquete").data("kendoComboBox").value(PaqueteID);
                $("#inputPaquete").data("kendoComboBox").trigger("change");
            }
        loadingStop();
    });
}