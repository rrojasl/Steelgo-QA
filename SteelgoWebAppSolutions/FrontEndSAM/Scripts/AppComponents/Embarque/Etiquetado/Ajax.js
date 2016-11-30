var gridInformation = false;

var TipoMuestraPredeterminadoTipoBusqueda = 3059;
var TipoMuestraPredeterminadoMuestra = 3060;
var TipoMuestraPredeterminadoPlanchado = 3061;
var TipoMuestraPredeterminadoSelecTodos = 3062;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoPlanchado }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
        }
        else if (data == "Vacios") {
            $('input:radio[name=LLena]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoSelecTodos }).done(function (data) {
        if (data == "Si") {
            $('input:radio[name=SelectTodos]:nth(0)').trigger("click");
        }
        else if (data == "No") {
            $('input:radio[name=SelectTodos]:nth(1)').trigger("click");
        }
        else if (data == "Ninguno") {
            $('input:radio[name=SelectTodos]:nth(2)').trigger("click");
        }
        loadingStop();
    });

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoTipoBusqueda }).done(function (data) {
        if (data == "Zona") {
            $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
        }
        else if (data == "Spool") {
            $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
        }
        loadingStop();
    });
    
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoMuestra }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Vacios") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    AjaxGetListaZonas();
};

function AjaxGetListaZonas(){
    $Zona.Zona.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputZona").data("kendoComboBox").dataSource.data(data);

        if ($("#inputZona").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputZona").data("kendoComboBox").select(1);
            $("#inputZona").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxGetListaCuadrantes(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);

        if ($("#inputCuadrante").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputCuadrante").data("kendoComboBox").select(1);
            $("#inputCuadrante").data("kendoComboBox").trigger("change");
        }

        $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data(data);

        if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputCuadrantePlanchado").data("kendoComboBox").select(1);
            $("#inputCuadrantePlanchado").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxGetDetalleEtiquetado(tipoConsulta, todos, zonaID, cuadranteID, spoolIDContiene) {
    $Etiquetado.Etiquetado.read({ token: Cookies.get("token"), TipoConsulta: tipoConsulta, Todos: todos, ZonaID: zonaID, CuadranteID: cuadranteID, SpoolContiene: spoolIDContiene }).done(function (data) {
        modificadoPorUsuario = false;
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            gridInformation = true;
            ds.page(1);
        } else {
            ds.page(0);
        }
        gridInformation = false;
        ds.sync();
        loadingStop();
    });
}

function AjaxGetCuadranteListadoPorSpool(spoolIDContiene) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), Spool: spoolIDContiene }).done(function (data) {
        $("#inputCuadrantePlanchado").data("kendoComboBox").dataSource.data(data);

        if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputCuadrantePlanchado").data("kendoComboBox").select(1);
            $("#inputCuadrantePlanchado").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxImprimirEtiqueta(SpoolID) {
    $Etiquetado.Etiquetado.read({ token: Cookies.get("token"), SpoolID: SpoolID, TipoReporte: 1 }).done(function (data) {
        var ruta = data[0].Ruta;
        alert(ruta);
    });
}

function AjaxImprimirTravelerMasivo(SpoolID) {
    $Etiquetado.Etiquetado.read({ token: Cookies.get("token"), SpoolID: SpoolID, TipoReporte: 2 }).done(function (data) {
        var ruta = data[0].Ruta;
        alert(ruta);
    });
}

function AjaxGuardarCaptura(rows, tipoGuardar) {
    loadingStart();

    Captura = [];
    Captura[0] = { listaDetalle: "" };
    ListaDetalles = [];
    var index = 0;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].ModificadoPorUsuario && (rows[i].Accion == 1 || rows[i].Accion == 2 || rows[i].Accion == 3)) {
            ListaDetalles[index] = { Accion: "", SpoolID: "", Etiquetado: "", EtiquetadoID: "", CuadranteID: "" };
            ListaDetalles[index].Accion = rows[i].Accion;
            ListaDetalles[index].SpoolID = rows[i].SpoolID;
            ListaDetalles[index].Etiquetado = rows[i].Etiquetado;
            ListaDetalles[index].EtiquetadoID = rows[i].EtiquetadoID;
            ListaDetalles[index].CuadranteID = rows[i].CuadranteID;
            index++;
        }
    };
    Captura[0].listaDetalle = ListaDetalles;

    if (Captura[0].listaDetalle.length > 0) {
        $Etiquetado.Etiquetado.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                displayNotify("MensajeGuardadoExistoso", "", '0');
                if (tipoGuardar == 0) {
                    opcionHabilitarView(true, "FieldSetView");
                    //Limpiar();
                    var ZonaID = $("#inputZona").val();
                    var CuadranteID = $("#inputCuadrante").val();
                    var SpoolIDContiene = $("#SpoolIDCOntiene").val();
                    var Muestra = $('input:radio[name=Muestra]:checked').val();
                    var TipoBusqueda = $('input:radio[name=TipoBusqueda]:checked').val();
                    AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra == 'Todos' ? 1 : 0, ZonaID == "" ? 0 : ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);
                    AjaxCargarCamposPredeterminados();
                }
                else {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    opcionHabilitarView(false, "FieldSetView");
                    //var ZonaID = $("#inputZona").val();
                    //var CuadranteID = $("#inputCuadrante").val();
                    //var SpoolIDContiene = $("#SpoolIDCOntiene").val();
                    //var Muestra = $('input:radio[name=Muestra]:checked').val();
                    //var TipoBusqueda = $('input:radio[name=TipoBusqueda]:checked').val();
                    LimpiarBusquedaZona();
                    LimpiarCuadrantes();
                    LimpiarBusquedaSpool();
                    //AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra == 'Todos' ? 1 : 0, ZonaID == "" ? 0 : ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);
                    // AjaxCambiarAccionAModificacion();
                }
                loadingStop();
            }
            else {
                displayNotify("MensajeGuardadoErroneo", "", '2');
                loadingStop();
            }
        });
    }
    else {
        displayNotify("", "Tu vista no presenta cambios de origen", '1');
        //displayNotify("MensajeGuardadoExistoso", "", '0');
        //if (($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") || ($('#btnGuardar').text() == "Guardar" || $('#btnGuardar').text() == "Save") || ($('#GuardarPie').text() == "Guardar" || $('#GuardarPie').text() == "Save") || ($('#btnGuardar1').text() == "Guardar" || $('#btnGuardar1').text() == "Save")) {
        //    opcionHabilitarView(true, "FieldSetView");
        //}
        //if (($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") || ($('#btnGuardar').text() == "Editar" || $('#btnGuardar').text() == "Edit") || ($('#GuardarPie').text() == "Editar" || $('#GuardarPie').text() == "Edit") || ($('#btnGuardar1').text() == "Editar" || $('#btnGuardar1').text() == "Edit")) {
        //    opcionHabilitarView(false, "FieldSetView");
        //}
        loadingStop();
    }
};