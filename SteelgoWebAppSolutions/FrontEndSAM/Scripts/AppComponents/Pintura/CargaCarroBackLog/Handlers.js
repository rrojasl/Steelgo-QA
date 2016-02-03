function SuscribirEventos() {
    suscribirEventoSubirCarro();
    suscribirEventoCarro();
}

SuscribirEventos();


function suscribirEventoSubirCarro() {

    $('#Guardar, #btnGuardar, #botonGuardar, #Guardar1').click(function (e) { 
        e.stopPropagation();
        if ($('#botonGuardar').text() == "Guardar") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxSubirSpool(ds._data); 
        }
        else if ($('#botonGuardar').text() == "Editar"){
            opcionHabilitarView(false, "FieldSetView")
        }
        
    });

    $('#btnGuardarYNuevo, #btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxSubirSpool(ds._data);
        Limpiar();
    });
}

function suscribirEventoCarro() {
    
    $("#inputCarro").kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteCargaID",
        suggest: true,
        filter: "contains",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteID);
            AjaxCargarSpool();
        },
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined ) {
                $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteID);
                AjaxCargarSpool();
            }
            else if($("#Guardar").text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                displayMessage("NoExisteCarro", '', '2');
            } 
        }
    });


}

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".botonDeplegaMenu").attr("disabled", true);
        $("#Guardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar').text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#grid").data('kendoGrid').dataSource.data([]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".botonDeplegaMenu").attr("disabled", false);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

