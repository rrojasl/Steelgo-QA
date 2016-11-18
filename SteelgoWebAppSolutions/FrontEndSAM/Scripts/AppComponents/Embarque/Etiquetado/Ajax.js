﻿var gridInformation = false;

var TipoMuestraPredeterminadoTipoBusquedaID = 3059;
var TipoMuestraPredeterminadoMuestraID = 3060;
var TipoMuestraPredeterminadoPlanchadoID = 3061;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoPlanchadoID }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
        }
        else if (data == "Vacios") {
            $('input:radio[name=LLena]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoMuestraID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoTipoBusquedaID }).done(function (data) {
        if (data == "Zona") {
            $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
        }
        else if (data == "Spool") {
            $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
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