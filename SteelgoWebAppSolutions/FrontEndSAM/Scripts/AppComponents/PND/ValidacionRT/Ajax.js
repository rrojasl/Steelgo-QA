var TipoMuestraPredeterminadoID = 3055;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
    });

    AjaxGetListaProyectos();
};

function AjaxGetListaProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputProyecto").data("kendoComboBox").select(1);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
    });
}