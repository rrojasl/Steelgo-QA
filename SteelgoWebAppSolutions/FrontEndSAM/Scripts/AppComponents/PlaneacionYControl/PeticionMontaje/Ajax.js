function AjaxGuardarCaptura(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].Seleccionado) {
            if (data[i].Peticion != "") {
                var noPeticion = parseInt(data[i].Peticion.substr(data[i].Peticion.length - 1, data[i].Peticion.length - 1));
                data[i].Peticion = data[i].Peticion.replace(noPeticion+"", (noPeticion + 1)+"");
            }
            else {
                data[i].Peticion = data[i-1].Peticion;
            }
            data[i].FechaPeticion = $("#FechaDeseable").val();
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}