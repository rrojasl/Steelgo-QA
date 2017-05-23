var previousCurrentItem;

function SuscribirEventos() {
    suscribirEventoDetalleInspeccion();
    suscribirEventoDetallePartida();
    suscribirEventoDetalleDefectoPorPlaca();
    suscribirEventoCancelar();
    suscribirEventoGuardar();
}


function suscribirEventoDetallePartida() {

    $(document).on('click', '.EnlacePorPlaca', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            LlenarGridPopUpDetallePartida(dataItem);
        }
    });
}

function suscribirEventoDetalleDefectoPorPlaca() {

    $(document).on('click', '.EnlaceDefectoPorPlaca', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#gridPopUp").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            
            LlenarGridPopUpDetalleDefectoPorPlaca(dataItem);
        }
    });
}

function suscribirEventoDetalleInspeccion() {

    $(document).on('click', '.EnlaceInspeccion', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#gridPopUpDefectos").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));

            LlenarGridPopUpDetalleInspeccion(dataItem);
        }
    });
}


function suscribirEventoCancelar() {
    $('#CancelarPlacas').click(function (e) {
        $("#windowGrid").data("kendoWindow").close();
    });

    $('#CancelarDefectos').click(function (e) {
        $("#windowGridDefectos").data("kendoWindow").close();
    });

    $('#CancelarInspeccion').click(function (e) {
        $("#windowGridInspeccion").data("kendoWindow").close();
    });

    
}

function suscribirEventoGuardar() {
    $('#GuardarPlacas').click(function (e) {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        var window = $("#windowGrid");
        //actualizaGridGeneralPorPlaca();
        $("#windowGrid").data("kendoWindow").close();
        
    });

    $('#GuardarDefectos').click(function (e) {
        var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
        var window = $("#windowGridDefectos");
        //actualizaGridGeneralPorDefectos();
        $("#windowGridDefectos").data("kendoWindow").close();
    });
    
    $('#GuardarInspeccion').click(function (e) {
        var ds = $("#gridPopUpInspeccion").data("kendoGrid").dataSource;
        var window = $("#windowGridInspeccion");
        //actualizaGridGeneralPorDefectos();
        $("#windowGridInspeccion").data("kendoWindow").close();
    });
}