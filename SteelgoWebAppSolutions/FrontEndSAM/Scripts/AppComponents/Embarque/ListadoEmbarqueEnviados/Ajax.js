function AjaxCargarProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
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
    });
}

function AjaxCargarDetalleEmbarqueEnviados() {

}