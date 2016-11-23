function AjaxCargarCamposPredeterminados() {
    var TipoMuestraPredeterminadoTipoBusqueda = 3063;
    var TipoMuestraPredeterminadoMuestra = 3064;
    var TipoMuestraPredeterminadoPlanchado = 3065;
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

function AjaxCargarDetalleEncintado() {
    if (tipoBusqueda == 1) {//Zona
        $EncintadoFinal.EncintadoFinal.read({ token: Cookies.get("token"), ZonaID: zonaID, CuadranteID: cuadranteID, todos: 1, lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                var ds = $("#grid").data("kendoGrid").dataSource;
                for (var i = 0; i < data.length; i++) {
                    ds.add(data[i]);
                }
            }
            loadingStop();
        });
    }
    else if (tipoBusqueda == 2) {//Spool
        $EncintadoFinal.EncintadoFinal.read({ token: Cookies.get("token"), ZonaID: zonaID, NumeroControl: spool, todos: 1, lenguaje: $("#language").val(), demo: 1 }).done(function (data) {
            if (Error(data)) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                var ds = $("#grid").data("kendoGrid").dataSource;
                for (var i = 0; i < data.length; i++) {
                    ds.add(data[i]);
                }
            }
            loadingStop();
        });
    }
}

function AjaxGuardarCaptura(rows, tipoGuardar) {
    loadingStart();

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var index = 0;
    for (var i = 0; i < rows.length; i++) {
        if ((rows[i].ColorID != 0) && (rows[i].Accion == 1 || rows[i].Accion == 2 || rows[i].Accion == 3)) {
            ListaDetalles[index] = { Accion: "", EncintadoID: 0, SpoolID: 0, Encintado: false, ColorID: 0 };
            ListaDetalles[index].Accion = rows[i].Accion;
            ListaDetalles[index].EncintadoID = rows[i].EncintadoID;
            ListaDetalles[index].SpoolID = rows[i].SpoolID;
            ListaDetalles[index].Encintado = rows[i].Encintado;
            ListaDetalles[index].ColorID = rows[i].ColorID;
            index++;
        }
    };
    Captura[0].Detalles = ListaDetalles;

    if (Captura[0].Detalles.length > 0) {
        $EncintadoFinal.EncintadoFinal.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                displayNotify("MensajeGuardadoExistoso", "", '0');
                //if (tipoGuardar == 1) {
                    opcionHabilitarView(false, "FieldSetView");
                    //Limpiar();
                    AjaxCargarCamposPredeterminados();
                //}
                //else {
                //    $("#grid").data("kendoGrid").dataSource.data([]);
                //    opcionHabilitarView(true, "FieldSetView");
                //    var ZonaID = $("#inputZona").val();
                //    var CuadranteID = $("#inputCuadrante").val();
                //    var SpoolIDContiene = $("#SpoolIDCOntiene").val();
                //    var Muestra = $('input:radio[name=Muestra]:checked').val();
                //    var TipoBusqueda = $('input:radio[name=TipoBusqueda]:checked').val();

                //   //AjaxGetDetalleEtiquetado(TipoBusqueda == 'Zona' ? 1 : 0, Muestra == 'Todos' ? 1 : 0, ZonaID == "" ? 0 : ZonaID, CuadranteID == "" ? 0 : CuadranteID, SpoolIDContiene);
                //    // AjaxCambiarAccionAModificacion();
                //}
                loadingStop();
            }
            else {
                displayNotify("MensajeGuardadoErroneo", "", '2');
                loadingStop();
            }
        });
    }
    else {
        displayNotify("", "No hay datos por guardar", '1');
        loadingStop();
    }
}