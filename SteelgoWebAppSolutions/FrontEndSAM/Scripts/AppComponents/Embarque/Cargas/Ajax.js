function AjaxCargarCamposPredeterminados() {
    loadingStart();
    var TipoMuestraPredeterminadoID = 3066;
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

    //AjaxCargaMostrarPredeterminado();
    loadingStop();
};

function AjaxObtenerSpoolID() {

    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $Armado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        dataSpoolArray = data;
        if (Error(data)) {
            if (data.OrdenTrabajo != "") {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }

            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            $("#InputID").data("kendoComboBox").enable(true);
            $("#InputID").data("kendoComboBox").input.focus();
        }
    });
}


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

function AjaxAgregarCarga() {
    var peso = 0;
    if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
        $CargaPlana.CargaPlana.read({ token: Cookies.get("token"), CargaPlanaID: 0, TipoConsulta: 1, OrdenTrabajoSpoolID: $("#InputID").data("kendoComboBox").value() }).done(function (data) {
            if (data.length > 0) {
                //$("#grid").data("kendoGrid").dataSource.data(data);
                var ds = $("#grid").data("kendoGrid").dataSource;

                var array = data;
                for (var i = 0; i < array.length; i++) {
                    if (!ExisteSpool(array[i])) {
                        array[i].Consecutivo = $("#grid").data("kendoGrid").dataSource._data.length + 1;
                        ds.add(array[i]);
                    }
                }
                $('#lblEmbarqueCargaTotalPiezas').text($("#grid").data("kendoGrid").dataSource._data.length);
                
                for (var i = 0; i < array.length; i++) {
                        peso = peso + array[i].Peso ;
                }
                peso = peso / 1000;
                $('#lblEmbarqueCargaToneladasCargadas').text(peso);
                
            }
            loadingStop();
        });
    }
}


function AjaxObtenerGrid() {
    if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
        $CargaPlana.CargaPlana.read({ token: Cookies.get("token"), PlanaID: 0, Todos: 1 }).done(function (data) {
            if (data.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                //$("#grid").data("kendoGrid").dataSource.data(data);
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = data;
                for (var i = 0; i < array.length; i++) {
                    ds.add(array[i]);
                }
            }
            $('#lblEmbarqueCargaTotalPiezas').text($("#grid").data("kendoGrid").dataSource._data.length);

            if (data.length > 0) {
                var peso = 0;
                for (var i = 0; i < array.length; i++) {
                    peso = peso + array[i].Peso;
                }
                peso = peso / 1000;
                $('#lblEmbarqueCargaToneladasCargadas').text(peso);
            }
            loadingStop();
        });
    }
}



function ExisteSpool(row) {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].SpoolID == row.SpoolID) {
            return true
        }
    }
    return false;

}


function AjaxCargarZona() {
    loadingStart();
    $Zona.Zona.read({ token: Cookies.get("token") }).done(function (data) {
        var ZonaId = 0;
        if (data.length > 0) {
            $("#inputZonaPopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ZonaID != 0) {
                        ZonaId = data[i].ZonaID;
                    }
                }
            }
            $("#inputZonaPopup").data("kendoComboBox").value(ZonaId);
            $("#inputZonaPopup").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}


function AjaxCargarCuadrante(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var CuadranteId = 0;

        if (data.length > 0) {
            $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CuadranteID != 0) {
                        CuadranteId = data[i].CuadranteID;
                    }
                }
            }

            $("#inputCuadrantePopup").data("kendoComboBox").value(CuadranteId);
            $("#inputCuadrantePopup").data("kendoComboBox").trigger("change");
        }
    });
}


function AjaxDescargarSpool() {

}