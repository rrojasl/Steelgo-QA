function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoTipoPrueba();
    SuscribirEventoProveedor();
    SuscribirFechaInicio();
    suscribirEventoChangeRadio();
}


function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        $('.porElemento').css('display', 'block');
        $('.porRequisicion').css('display', 'none');
    });
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        $('.porElemento').css('display', 'none');
        $('.porRequisicion').css('display', 'block');
    });
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                AjaxPruebas();
            }
            else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else {
                $("#inputTipoPrueba").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoProveedor() {
    $("#inputProveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else {
                $("#inputProveedor").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirFechaInicio() {
    $("#inputFechaInicio").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            
        }
    });
    //$("#inputFechaInicio").data("kendoDatePicker").setOptions({
    //    format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    //});

    $("#inputFechaFin").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            
        }
    });
    //$("#inputFechaFin").data("kendoDatePicker").setOptions({
    //    format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    //});
}