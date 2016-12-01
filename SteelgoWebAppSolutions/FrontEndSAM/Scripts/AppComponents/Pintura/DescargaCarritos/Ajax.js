function AjaxCargarCamposPredeterminados() {
    //$CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
    //    if (data == "sin captura") {
    //        $('input:radio[name=Muestra]:nth(0)').trigger("click");
    //    }
    //    else if (data == "Todos") {
    //        $('input:radio[name=Muestra]:nth(1)').trigger("click");
    //    }
    //    loadingStop();
    //});

    AjaxCargaListadoCarro();
};

function AjaxCargaListadoCarro() {
    $DescargaCarrito.DescargaCarro.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputCarro").data("kendoComboBox").dataSource.data(data);

        if ($("#inputCarro").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputCarro").data("kendoComboBox").select(1);
            $("#inputCarro").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxCargaListadoZona() {

}

function AjaxCargaListadoCuadrante() {

}

function ajaxGuardar(data) {

    for (var i = 0; i < data.length; i++) {
        data[i].RowOk = true;
        data[i].Estatus = 1;
        if (data[i].NombreCuadrante == "") {
            data[i].RowOk = false;
            data[i].Estatus = 0
        }

    }



    if (!ExistRowEmpty(data)) {
        displayNotify("", "se guardo correctamente la informacion", '0');
        opcionHabilitarView(true, "FieldSetView")
        $("#grid").data('kendoGrid').dataSource.sync();
    }
    else {
        loadingStop();
        $("#grid").data("kendoGrid").dataSource.sync();
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.TituloPopUpError[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.MensajeConfirmacionGuardadoGeneral[$("#language").data("kendoDropDownList").value()] +
            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {
            loadingStart();
            displayNotify("", "se guardo correctamente la informacion", '0');
            opcionHabilitarView(true, "FieldSetView");

            for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                $("#grid").data("kendoGrid").dataSource._data[i].RowOk = true;
                $("#grid").data("kendoGrid").dataSource._data[i].Estatus = 1;
            }

            $("#grid").data('kendoGrid').dataSource.sync();
            loadingStop();
            ventanaConfirm.close();
        });

        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }

};

function AjaxCargarCuadrante(zonaID) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var cuadranteid = 0;
        if (data.length > 0) {
            $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrante").data("kendoComboBox").value("");
            $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
            SustituirListaCuadranteGrid(data);
        }

        loadingStop();
    });
}