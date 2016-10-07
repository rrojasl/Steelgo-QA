function AjaxCargarCamposPredeterminados() {
    var TipoMuestraPredeterminadoID = 3057;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "spool") {
            $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
        }
        else if (data == "nc") {
            $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
        }
    });
    AjaxCargarTipoLlenado();
}
function AjaxCargarTipoLlenado() {
    var TipoMuestraPredeterminadoID = 3058;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Vacios") {
            $('input:radio[name=Planchar]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Planchar]:nth(1)').trigger("click");
        }
    });
}
function AjaxCargaProyecto() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        var proyectoId = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ProyectoID != 0) {
                    proyectoId = data[i].ProyectoID;
                }
            }
        }

        $("#inputProyecto").data("kendoComboBox").value(proyectoId);
        $("#inputProyecto").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargarSistemaPintura(proyectoID) {
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), ProyectoID: proyectoID }).done(function (data) {
        
        $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(data);

        var spid = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].SistemaPinturaID != 0) {
                    spid = data[i].SistemaPinturaID;
                }
            }
        }

        $("#inputSistemaPintura").data("kendoComboBox").value(spid);
        $("#inputSistemaPintura").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargarColorPintura(sistemaPinturaID) {    
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), ProyectoID: proyectoID, Lenguaje: $("#language").val() }).done(function (data) {
        
        $("#inputColorPintura").data("kendoComboBox").dataSource.data(data);

        var cpid = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ColorPinturaID != 0) {
                    cpid = data[i].ColorPinturaID;
                }
            }
        }

        $("#inputColorPintura").data("kendoComboBox").value(cpid);
        $("#inputColorPintura").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargarDetalleSpool(proyectoID, tipoBusqueda, cadena) {
    $SistemaPinturaAplicable.SistemaPinturaAplicable.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoBusqueda: tipoBusqueda, Cadena: cadena, Lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;
        if(data.length>0){
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }    
    });
}