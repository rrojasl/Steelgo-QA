function AjaxCargarCamposPredeterminados() {
    loadingStart();

    //$ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaDimensionalPredeterminada }).done(function (data) {
    //    var NewDate = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
    //    endRangeDate.val(NewDate);
    //});

    $RequisicionPND.RequisicionPND.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.Muestra == "Sincaptura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
            //$('input:radio[name=Muestra]:nth(1)').removeAttr('checked');
        }
        else if (data.Muestra == "Todos") {
            //$('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
    });
};