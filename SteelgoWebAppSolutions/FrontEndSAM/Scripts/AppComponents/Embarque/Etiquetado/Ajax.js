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
    loadingStart();
    $Etiquetado.Etiquetado.read({ token: Cookies.get("token"), TipoConsulta: tipoConsulta, Todos: todos, ZonaID: zonaID, CuadranteID: cuadranteID, SpoolContiene: spoolIDContiene }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            ds.data(data);
            ds.page(1);
        } else {
            ds.page(0);
        }
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

    var Captura = [];
    Captura[0] = { listaDetalle: "" };
    var ListaDetalles = [];

    for (var i = 0; i < rows.length; i++) {
            ListaDetalles[i] = {
                Accion: "", SpoolID: "", Etiquetado: "", EtiquetadoID: "",
                CuadranteID: "", CuadranteSam2ID: "", CuadranteAnteriorID: "",
                CuadranteAnteriorSam2ID: ""               
            };

            ListaDetalles[i].SpoolID = rows[i].SpoolID;
            ListaDetalles[i].Etiquetado = rows[i].Etiquetado;
            ListaDetalles[i].EtiquetadoID = rows[i].EtiquetadoID;
            ListaDetalles[i].CuadranteID = rows[i].CuadranteID;
            ListaDetalles[i].CuadranteSam2ID = rows[i].CuadranteSam2ID;

            if (rows[i].Accion == 2 && !rows[i].Etiquetado)
                ListaDetalles[i].Accion = 3;
            else
                ListaDetalles[i].Accion = rows[i].Accion;

            if (rows[i].CuadranteID == rows[i].CuadranteAnteriorSam3ID){
                ListaDetalles[i].CuadranteAnteriorID = 0;
                ListaDetalles[i].CuadranteAnteriorSam2ID = 0;
            }                
            else {
                ListaDetalles[i].CuadranteAnteriorID = rows[i].CuadranteAnteriorSam3ID;
                ListaDetalles[i].CuadranteAnteriorSam2ID = rows[i].CuadranteAnteriorSam2ID;
            }
    };
    Captura[0].listaDetalle = ListaDetalles;

    if (Captura[0].listaDetalle.length > 0) {
        $Etiquetado.Etiquetado.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                if (tipoGuardar == 0) {
                    var ZonaID = $("#inputZona").val();
                    var CuadranteID = $("#inputCuadrante").val();
                    var SpoolIDContiene = $("#SpoolIDCOntiene").val();
                    var Muestra = 1;
                    var TipoBusqueda = $('input:radio[name=TipoBusqueda]:checked').val();
                    opcionHabilitarView(true, "FieldSetView");
                    AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra, ZonaID == "" ? 0 : ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);
                }
                else {
                    loadingStop();
                    Limpiar();
                }
                displayNotify("MensajeGuardadoExistoso", "", '0');
            }
            else {
                displayNotify("MensajeGuardadoErroneo", "", '2');
                loadingStop();
            }
        });
    }
    else {
        displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
        loadingStop();
    }
};