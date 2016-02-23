function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoSeleccionar();
}
 
function SuscribirEventoProyecto() {
    $('#inputProyecto').kendoComboBox({
        dataTextField: "Proyecto",
        dataValueField: "ProyectoID ",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            if (dataItem != undefined) {
                $("#inputPatio").data("kendoComboBox").value("");
                $("#inputPatio").data("kendoComboBox").dataSource.data(dataItem.ListaPatio);
            }
            else {
                displayMessage("errorNoExisteProyecto", '', '2');
            }
        },
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                displayMessage("errorNoExisteProyecto", '', '2');
            }
        }
    });
}

function SuscribirEventoSeleccionar() {
    $("input[name='Cerrar']").change(function () {
        var columnasVisiblesFamiliaAcero = [2, 6, 8];
        var columnasVisiblesFamiliaMateriales = [3,4,5,7,9,10,11];
        var columnasVisiblesPWHT = [12,13,14];

        var checked = $("#chkFamiliaAcero").is(':checked');

        if ($(this).attr("id") == "chkFamiliaAcero") {
            OcultarTodasColumnas(columnasVisiblesFamiliaAcero);

            if ($("#chkFamiliaMateriales").is(':checked')) {
                MostrarColumnas(columnasVisiblesFamiliaMateriales);
            }
             
            if (!$(this).is(':checked')) { 
                OcultarColumnas(columnasVisiblesFamiliaAcero);
                if (!$("#chkFamiliaMateriales").is(':checked')) {
                    $('#chkPWHT').attr('checked', false);
                }
            }

            if ($("#chkPWHT").is(':checked')) {
                MostrarColumnas(columnasVisiblesPWHT);
            }

        }
        

        if ($(this).attr("id") == "chkFamiliaMateriales") {
            OcultarTodasColumnas(columnasVisiblesFamiliaMateriales);

            if ($("#chkFamiliaAcero").is(':checked')) {
                MostrarColumnas(columnasVisiblesFamiliaAcero);
            }

            if ($("#chkPWHT").is(':checked')) {
                MostrarColumnas(columnasVisiblesPWHT);
            }

            if (!$(this).is(':checked')) {
                OcultarColumnas(columnasVisiblesFamiliaMateriales);
            }
        } 

        if ($(this).attr("id") == "chkPWHT") { 
            if ($(this).is(':checked') && $("#chkFamiliaAcero").is(':checked') ||
                $(this).is(':checked') && $("#chkFamiliaMateriales").is(':checked')) {
                OcultarTodasColumnas(columnasVisiblesPWHT);


                if ($(this).is(':checked') && $("#chkFamiliaAcero").is(':checked')) {
                    MostrarColumnas(columnasVisiblesFamiliaAcero);
                }

                if ($(this).is(':checked') && $("#chkFamiliaMateriales").is(':checked')) {
                    MostrarColumnas(columnasVisiblesFamiliaMateriales);
                }
            }
            else if ($(this).is(':checked')) {
                displayMessage("Mensajes_error", "Seleccione una familia", '0');
            }

            if (!$(this).is(':checked')) {
                OcultarColumnas(columnasVisiblesPWHT);
            } 
        }  
    });
}