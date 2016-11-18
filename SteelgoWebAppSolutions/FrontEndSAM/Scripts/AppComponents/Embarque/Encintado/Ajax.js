function AjaxCargarCamposPredeterminados() {
    var TipoMuestraPredeterminadoTipoBusqueda = 3059;
    var TipoMuestraPredeterminadoMuestra = 3060;
    var TipoMuestraPredeterminadoPlanchado = 3061;
    var TipoMuestraPredeterminadoSelecTodos = 3062;

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

    AjaxCargarZona();
}

function AjaxCargarZona() {
    loadingStart();
    $Zona.Zona.read({ token: Cookies.get("token") }).done(function (data) {
        $("#InputZona").data("kendoComboBox").dataSource.data([]);

        var zonaid = 0;
        if (data.length > 0) {
            $("#InputZona").data("kendoComboBox").dataSource.data(data);
            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ZonaID != 0) {
                        zonaid = data[i].ZonaID;
                    }
                }
            }

            $("#InputZona").data("kendoComboBox").value(zonaid);
            $("#InputZona").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}

function AjaxCargarCuadrante(zonaID) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var cuadranteid = 0;
        if (data.length > 0) {
            $("#InputCuadrante").data("kendoComboBox").dataSource.data(data);
            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CuadranteID != 0) {
                        cuadranteid = data[i].CuadranteID;
                    }
                }
            }

            $("#InputCuadrante").data("kendoComboBox").value(cuadranteid);
            $("#InputCuadrante").data("kendoComboBox").trigger("change");

            if ($("#styleZona").hasClass("active")) {
                $("#InputCuadrantePlanchado").data("kendoComboBox").dataSource.data(data);

                $("#InputCuadrantePlanchado").data("kendoComboBox").value(cuadranteid);
                $("#InputCuadrantePlanchado").data("kendoComboBox").trigger("change");
            }
        }

        loadingStop();
    });
}

function AjaxCargarCuadranteSpool(spool) {
    loadingStart();
    if (spool != "") {
        $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), Spool: spool }).done(function (data) {

            var cuadranteid = 0;
            if (data.length > 0) {
                $("#InputCuadrantePlanchado").data("kendoComboBox").dataSource.data(data);
                if (data.length < 3) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].CuadranteID != 0) {
                            cuadranteid = data[i].CuadranteID;

                        }
                    }
                }             

                $("#InputCuadrantePlanchado").data("kendoComboBox").value(cuadranteid);
                $("#InputCuadrantePlanchado").data("kendoComboBox").trigger("change");
            }

            loadingStop();
        });
    }
}

function AjaxCargarDetalleEtiquetado() {

}

function AjaxGuardarCaptura() {

}