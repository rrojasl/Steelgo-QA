var TipoMuestraPredeterminadoID = 3049;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    AjaxGetListaProyectos();
};

function AjaxGetListaProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#Proyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#Proyecto").data("kendoComboBox").select(1);
            $("#Proyecto").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxGetListaElementos(proyectoID, muestra) {
    loadingStart();
    $OKPND.OKPND.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), ProyectoID: proyectoID, Muestra: muestra }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            ds.page(1);
        } else {
            ds.page(0);
        }
        ds.sync();
        loadingStop();
    });
}