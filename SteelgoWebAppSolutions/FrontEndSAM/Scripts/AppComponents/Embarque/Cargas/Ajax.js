function AjaxCargarCamposPredeterminados() {
    loadingStart();
    var TipoMuestraPredeterminadoID = 46;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Spool") {


            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').attr('checked', true);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').attr('checked', false);

            $("#contenedorPrincipalEscritorio").show();
            $("#contenedorSecundarioEscritorio").show();
            $("#contenedorPrincipalPatio").hide();
            $("#contenedorSecundarioPatio").hide();
        }
        else if (data == "Paquete") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', true);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').attr('checked', false);

            $("#contenedorPrincipalEscritorio").hide();
            $("#contenedorSecundarioEscritorio").hide();
            $("#contenedorPrincipalPatio").show();
            $("#contenedorSecundarioPatio").show();
        }
        else if (data == "Codigo") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', false);
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').attr('checked', true);

            $("#contenedorPrincipalEscritorio").hide();
            $("#contenedorSecundarioEscritorio").hide();
            $("#contenedorPrincipalPatio").show();
            $("#contenedorSecundarioPatio").show();
        }
    });

    AjaxCargaMostrarPredeterminado();
    loadingStop();
};


function AjaxCargarProyecto() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
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
    });
}


function AjaxObtenerPlanas(dataItem) {
    $EmbarqueGeneral.EmbarqueGeneral.read({ token: Cookies.get("token"), ProveedorID: dataItem.ProveedorID  }).done(function (data) {
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);
        var PlanaID = 0;

        if (data.length > 0) {
            
            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].PlanaID != 0) {
                        PlanaID = data[i].PlanaID;
                    }
                }
            }
            data.splice(1, 0, {
                PlanaID: -1, Nombre: _dictionary.EmbarqueCargaNuevaPlana[$("#language").data("kendoDropDownList").value()]
            });
            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data(data);
            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value(PlanaID);
            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").trigger("change");
        }
    });
}



function AjaxEmbarqueCargaProveedores(dataItem) {
    loadingStart();

    $Proveedores.Proveedores.read({ token: Cookies.get("token"), ProyectoID: dataItem.ProyectoID }).done(function (data) {
        if (data.length > 0) {
            $("#inputProveedor").data("kendoComboBox").value("");
            $("#inputProveedor").data("kendoComboBox").trigger("change");
            var ProveedorId = 0;
            if (data.length > 0) {
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
                if (data.length == 2) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ProveedorID != 0) {
                            ProveedorId = data[i].ProveedorID;
                            $("#inputProveedor").data("kendoComboBox").value(ProveedorId);
                            $("#inputProveedor").data("kendoComboBox").trigger("change");
                        }
                    }
                }
                data.splice(1, 0, {
                    ProveedorID: -1, Nombre: _dictionary.EmbarqueCargaAgregarNuevoProveedor[$("#language").data("kendoDropDownList").value()]
                });
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
            }
            else {
                $("#inputProveedor").data("kendoComboBox").value("");
            }
        }
        loadingStop();
    });
}
