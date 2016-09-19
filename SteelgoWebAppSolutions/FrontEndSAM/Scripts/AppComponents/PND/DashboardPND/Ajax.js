function AjaxCargarHeaderDashboard() {
    $Dashboard.Dashboard.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), modulo: 1}).done(function (data) {
        if(data.length>0){
            var tab = '';
            var option = '';
            for (var i = 0; i < data.length; i++) {
                option = option + '<button '
                    + 'onclick="ActivarRefrescarGrid(' + data[i].Estatus_DashboardID + ');" '
                    +'id="' + data[i].Estatus_DashboardID 
                    + '" class="btn btn-tab btn-Requisicion">'
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
            AgregarStatusDinamicos(data);
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

function AjaxObtenerProveedor() {
    if ($("#inputTipoPrueba").data("kendoComboBox").value() != "") {
        loadingStart();
        var patioID = $('#inputProyecto').data("kendoComboBox").dataSource._data[$('#inputProyecto').data("kendoComboBox").selectedIndex].PatioID;
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), PatioID: patioID, TipoPruebaID: $("#inputTipoPrueba").data("kendoComboBox").value() }).done(function (data) {
            if (Error(data)) {
                $("#inputProveedor").data("kendoComboBox").value("");
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

                if ($("#inputProveedor").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputProveedor").data("kendoComboBox").select(1);
                    $("#inputProveedor").data("kendoComboBox").trigger("change");
                    var RequiereEquipo = $('#inputTipoPrueba').data("kendoComboBox").dataSource._data[$('#inputTipoPrueba').data("kendoComboBox").selectedIndex].RequiereEquipo;
                    if (!RequiereEquipo) {
                        

                    }
                    else {
                        AjaxObtenerEquipo();

                    }
                }
                else {

                }
            }
            loadingStop();
        });
    }
}


function AjaxAccionesListado(requisicionID) {
    $Dashboard.Dashboard.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), EstatusID: requisicionID }).done(function (data) {
        if (data.length > 0) {
            
        }

    });
}