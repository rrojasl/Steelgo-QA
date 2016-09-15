function AjaxCargarHeaderDashboard() {
    $Dashboard.Dashboard.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), modulo: 1}).done(function (data) {
        if(data.length>0){
            var tab = '';
            var option = '';
            for (var i = 0; i < data.length; i++) {
                option = option + '<button id="btn' + data[i].Estatus_DashboardID 
                    + '" class="btn btn-tab Tubos">'
                    + '<label>' 
                    + data[i].Descripcion
                    + '</label><span id="span'
                    + data[i].Estatus_DashboardID
                    + '">' + data[i].Contador + '</span></button>';
                
            }
            $("#tabEstatus").append(option);
        }

    });
}