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
        $("#Proyecto").data("kendoComboBox").value("");
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxGetListaTiposDePrueba() {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxGetListaRequisiciones(proyectoID, tipoPruebaID) {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID }).done(function (data) {
        $("#listaRequisiciones").data("kendoComboBox").value("");
        $("#listaRequisiciones").data("kendoComboBox").dataSource.data(data);
    });
}