var TipoMuestraPredeterminadoID = 3055;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (Error(data)) {
            if (data == "sin captura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");
            }
            else if (data == "Todos") {
                $('input:radio[name=Muestra]:nth(1)').trigger("click");
            }
            AjaxGetListaProyectos();
        }
    });
};

function AjaxGetListaProyectos() {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

            if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputProyecto").data("kendoComboBox").select(1);
                $("#inputProyecto").data("kendoComboBox").trigger("change");
            }
        }
    });
}

function AjaxGetListaTiposDePrueba() {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data);

            if ($("#inputTipoPrueba").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputTipoPrueba").data("kendoComboBox").select(1);
                $("#inputTipoPrueba").data("kendoComboBox").trigger("change");
            }
        }
    });
}

function AjaxGetListaProveedor() {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), TipoPruebaID: $("#inputTipoPrueba").data("kendoComboBox").value() }).done(function (data) {
        if (Error(data)) {
            $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

            if ($("#inputProveedor").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputProveedor").data("kendoComboBox").select(1);
                $("#inputProveedor").data("kendoComboBox").trigger("change");
            }
        }
    });
}

function AjaxGetListaRequisiciones(proyectoID, tipoPruebaID, proveedorID) {
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID, ProveedorID: proveedorID, estatusID: 2 }).done(function (data) {
        if (Error(data)) {
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

            if ($("#inputRequisicion").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputRequisicion").data("kendoComboBox").select(1);
                $("#inputRequisicion").data("kendoComboBox").trigger("change");
            }
        }
    });
}