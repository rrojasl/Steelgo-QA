function AjaxCargarProyecto() {
    loadingStart();
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
            var proyectoId = 0;

            if (data.length > 0) {
                $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ProyectoID != 0) {
                            proyectoId = data[i].ProyectoID;
                        }
                    }
                }

                $("#inputProyecto").data("kendoComboBox").value(proyectoId);
                $("#inputProyecto").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}
