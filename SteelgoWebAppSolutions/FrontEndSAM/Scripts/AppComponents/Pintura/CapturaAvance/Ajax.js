function AjaxCargarCamposPredeterminados() {

    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        var NewDate = kendo.toString(data.FechaShotblast, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDate.val(NewDate);
        var NewDate2 = kendo.toString(data.FechaPrimario, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDate2.val(NewDate2);
        loadingStop();
    });
}


function AjaxCargarCarrosCargados() {

    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), cargado: 1 }).done(function (data) {
        $("#inputCarro").data("kendoDropDownList").value("");
        $("#inputCarro").data("kendoDropDownList").dataSource.data(data);
        loadingStop();
    });
}


function AjaxCargarPintor() {

    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), tipo: 2, tipoObrero: "Pintor" }).done(function (data) {
        $("#inputPintor").data("kendoDropDownList").value("");
        $("#inputPintor").data("kendoDropDownList").dataSource.data(data);
        loadingStop();
    });
}


function AjaxCargarShotBlastero() {

    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), tipo: 2, tipoObrero: "ShotBlastero" }).done(function (data) {
        $("#inputShotBlastero").data("kendoDropDownList").value("");
        $("#inputShotBlastero").data("kendoDropDownList").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarOrdenTrabajo() {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        loadingStop();
    });
}




function AjaxCargarSpool(medioTransporteCargaID) {
    loadingStart();

    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), medioTransporteCargaID: medioTransporteCargaID, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data.listaCapturaAvance;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }

        $("#inputComponente").data("kendoDropDownList").value("");
        $("#inputComponente").data("kendoDropDownList").dataSource.data(data.listaComponenteDetalle);

        loadingStop();
    });
}


function AjaxAgregarSpool(ordenTrabajoSpoolID) {
    loadingStart();

    $CapturaAvance.CapturaAvance.read({
        token: Cookies.get("token"), OrdenTrabajoSpoolID: ordenTrabajoSpoolID, lenguaje: $("#language").val(),
        shotblasteroID: $("#inputShotBlastero").data("kendoDropDownList").value(),shotblastero:$("#inputShotBlastero").data("kendoDropDownList").text(),
        pintorID: $("#inputPintor").data("kendoDropDownList").value(), pintor: $("#inputPintor").data("kendoDropDownList").text()
    }).done(function (data) {
        
        var ds = $("#grid").data("kendoGrid").dataSource;
            
            var array = data;
            for (var i = 0; i < array.length; i++) {
                if (!existeSpool(array[i].Spool, ds)) {
                    ds.add(array[i]);
                }
                
            }
            loadingStop();
        });
}

function existeSpool(spool, array) {
    for (var index = 0; index < array._data.length; index++) {
        if (array._data[index].Spool == spool) {
            return true;
        }
    }
    return false;
}