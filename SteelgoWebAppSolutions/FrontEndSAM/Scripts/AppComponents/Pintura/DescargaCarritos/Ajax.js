function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 5075 }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=LLena]:nth(1)').trigger("click");
        }
        else if (data == "vacios") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
        }
        loadingStop();
    });
    AjaxCargarCarrosCargadosPorProceso(0);//el cliente no especifico si es por proceso de pintura por eso se pone el cero.
};

function AjaxCargarCarrosCargadosPorProceso(idProceso) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), procesoID: idProceso }).done(function (data) {
        var medioTranporteId = 0;
        $("#inputCarro").data("kendoComboBox").dataSource.data([]);
        $("#inputCarro").data("kendoComboBox").dataSource.data(data);

      
        var carroID = getParameterByName('carroid');

        if (carroID == null) {
            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].MedioTransporteID != 0) {
                        medioTranporteId = data[i].MedioTransporteID;
                    }
                }
                $("#inputCarro").data("kendoComboBox").value(medioTranporteId);
                $("#inputCarro").data("kendoComboBox").trigger("change");
                $("#btnMostrar").trigger("click");
            }
        } else {
            $("#inputCarro").data("kendoComboBox").value(carroID);
            $("#inputCarro").data("kendoComboBox").trigger("change");
        }
        loadingStop();
    });
}

function ajaxGuardar(data) {
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

function AjaxObtenerDetalleGrid(carroID)
{
    $DescargaCarro.DescargaCarro.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), carroID: carroID }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.data(data);
        }
    });
}