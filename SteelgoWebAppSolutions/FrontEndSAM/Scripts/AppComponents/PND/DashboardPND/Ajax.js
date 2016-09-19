function AjaxCargarHeaderDashboard() {
    $Dashboard.Dashboard.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), modulo: 1}).done(function (data) {
        if(data.length>0){
            var tab = '';
            var option = '';
            for (var i = 0; i < data.length; i++) {
                option = option + '<button id="' + data[i].Estatus_DashboardID 
                    + '" class="btn btn-tab Tubos">'
                    + '<label>' 
                    + data[i].Descripcion
                    + '</label><span id="span'+i+ 
                    + data[i].Estatus_DashboardID
                    + '" class="porElemento" >' + data[i].NumeroElementos + '</span>'
                    +'<span id="span' +i+i
                    + data[i].Estatus_DashboardID
                    + '" class="porRequisicion" style="display: none;" >' + data[i].NumeroRequisiciones + '</span>'
                    +'</button>';
                
            }
            $("#tabEstatus").append(option);
            AjaxObtenerProyectos();
        }

    });
}



function AjaxObtenerProyectos() {
    loadingStart();

    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").value("");
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputProyecto").data("kendoComboBox").select(1);
            AjaxPruebas();
        }
        else {
            $("#inputProyecto").data("kendoComboBox").select(0);
            loadingStop();
        }


    });
}


function AjaxPruebas() {
    if ($("#inputProyecto").val() != "") {
        loadingStart();
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                $("#inputTipoPrueba").data("kendoComboBox").value("");
                $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data);

                if ($("#inputTipoPrueba").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputTipoPrueba").data("kendoComboBox").select(1);

                }
                else {
                    
                }

            }

        });
    }
};
