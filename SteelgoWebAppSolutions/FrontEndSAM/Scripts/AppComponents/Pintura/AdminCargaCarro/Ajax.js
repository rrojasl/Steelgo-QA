function AjaxCargarCamposPredeterminados() {
    loadingStart();
    var TipoMuestraPredeterminadoID = 46;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Escritorio") {
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(0)').trigger("change");
            $("#contenedorPrincipalEscritorio").show();
            $("#contenedorSecundarioEscritorio").show();
            $("#contenedorPrincipalPatio").hide();
            $("#contenedorSecundarioPatio").hide();
        }
        else if (data == "Patio") {
            $("#styleEscritorio").removeClass("active");
            $("#stylePatio").addClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').trigger("change");
            $("#contenedorPrincipalEscritorio").hide();
            $("#contenedorSecundarioEscritorio").hide();
            $("#contenedorPrincipalPatio").show();
            $("#contenedorSecundarioPatio").show();
        }
    });

    AjaxCargaMostrarPredeterminado();
    loadingStop();
};

function AjaxCargaMostrarPredeterminado() {
    var TipoMuestraPredeterminadoID = 2048;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
    });

    AjaxCargaTipoSpool();
}

function AjaxCargaTipoSpool() {
    var TipoMuestraPredeterminadoID = 34;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=TipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data == "Codigo") {
            $('input:radio[name=TipoSeleccion]:nth(1)').attr('checked', true).trigger("change");
        }

    });
}