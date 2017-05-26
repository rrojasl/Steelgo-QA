var previousCurrentItem;

function SuscribirEventos() {
    suscribirEventoDetalleInspeccion();
    suscribirEventoDetallePartida();
    suscribirEventoDetalleDefectoPorPlaca();
    suscribirEventoCancelar();
    suscribirEventoGuardar();
    //suscribirEventoChangeRadio();
}


function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        //Gerez

        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantG");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaRecibido");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CambionRecibido");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FacturaProveedor");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("LiberacionInspeccion");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaEnvio");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantRecibidaS");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("ShippingDate");

        //Steelgo
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantS");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaRecibidoS");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("InspeccionS");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaFactura");
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        //Gerez
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantG");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaRecibido");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("CambionRecibido");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FacturaProveedor");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("LiberacionInspeccion");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaEnvio");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantRecibidaS");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("ShippingDate");

        //Steelgo

        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantS");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaRecibidoS");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("InspeccionS");
        $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaFactura");
    });
    $('input:radio[name=Muestra]:nth(2)').change(function () {
        //Gerez
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantG");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaRecibido");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("CambionRecibido");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FacturaProveedor");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("LiberacionInspeccion");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaEnvio");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantRecibidaS");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("ShippingDate");

        //Steelgo

        $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantS");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaRecibidoS");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("InspeccionS");
        $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaFactura");
    });
}


$('#inputProyecto').kendoComboBox({
    dataTextField: "Colada",
    dataValueField: "ColadaID",
    dataSource: [{ ColadaID: 0, Colada: "" },{ ColadaID: 1, Colada: "DT CS FIgthing  PO  279" }, { ColadaID: 2, Colada: "DT P22 FIgthing  PO  280" }],
    suggest: true,
    filter: "contains",
    index: 3,
    change: function (e) {
        loadingStart();
        setTimeout(function () {
            $("#grid").data('kendoGrid').dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            ds.data([{
                Rev: "CS",
                Descripcion: "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo  , #3000 A 105",
                MaterialNorma: "A 105",
                Diametro1: "0.5",
                Diametro2: "",
                Registro: "SCH STD",
                Rating: "#300",
                PreparacionExtremos: "SW",
                Cant: 10,
                PrecioUnidad: "$3,78 ",
                Total: "$37,83 ",
                PackingList: "35777-1",
                Partida: "Partida 1",
                TemplateDetalleElemento: "Ver coladas"
            },
            {
                Rev: "CS",
                Descripcion: "Codo 45º Radio Largo, NeoData: 1.5 x  NPS SW Codo 45º Radio Largo  , #3000 A 105",
                MaterialNorma: "A 105",
                Diametro1: "1.5",
                Diametro2: "",
                Registro: "SCH STD",
                Rating: "#300",
                PreparacionExtremos: "SW",
                
                Cant: 10,
                PrecioUnidad: "$9,67",
                Total: "$96,71",
                PackingList: "",
                Partida: "",
                TemplateDetalleElemento: "Ver coladas"
            },
            {
                Rev: "CS",
                Descripcion: "Codo 45º Radio Largo, NeoData: 4 x  NPS BW Codo 45º Radio Largo SCH STD ,  A234 Gr.WPB seamless",
                MaterialNorma: "A 105",
                Diametro1: "4",
                Diametro2: "",
                Registro: "SCH STD",
                Rating: "#300",
                PreparacionExtremos: "BW",
                Neodata: "",
                Cant: 4,
                PrecioUnidad: "$8,37",
                Total: "$33,46",
                PackingList: "",
                Partida: "",
                TemplateDetalleElemento: "Ver coladas"
            }]);
            loadingStop();
        }, 500);
    }
});



function suscribirEventoDetallePartida() {

    $(document).on('click', '.EnlacePorPlaca', function (e) {
        e.preventDefault();
        
    });
}

function suscribirEventoDetalleDefectoPorPlaca() {

    $(document).on('click', '.EnlaceDefectoPorPlaca', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#gridPopUpGerez").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));

            if ($('input:radio[name=Muestra]:nth(0)').prop('checked')) {
                VentanaModalDetalleCecilia();

            }
            else if ($('input:radio[name=Muestra]:nth(1)').prop('checked')) {
                VentanaModalDetallePlaca();
            }
            else if ($('input:radio[name=Muestra]:nth(2)').prop('checked')) {
                VentanaModalDetalleDefectoPorPlaca();
            }
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
    $(document).on('click', '#CancelarPlacasCecilia', function (e) {
        $("#windowGridCecilia").data("kendoWindow").close();
    });
    $(document).on('click', '#CancelarPlacasGerez', function (e) {
        $("#windowGridGerez").data("kendoWindow").close();
    });

    $(document).on('click', '#CancelarDefectos', function (e) {
        $("#windowGridDefectos").data("kendoWindow").close();
    });

    $(document).on('click', '#CancelarInspeccion', function (e) {
    
        $("#windowGridInspeccion").data("kendoWindow").close();
    });


}

function suscribirEventoGuardar() {
    $(document).on('click', '#GuardarPlacas', function (e) {
    
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        var window = $("#windowGrid");
        //actualizaGridGeneralPorPlaca();
        $("#windowGrid").data("kendoWindow").close();

    });
    $(document).on('click', '#GuardarPlacasGerez', function (e) {

        var ds = $("#gridPopUpGerez").data("kendoGrid").dataSource;
        var window = $("#windowGridGerez");
        //actualizaGridGeneralPorPlaca();
        $("#windowGridGerez").data("kendoWindow").close();

    });

    $(document).on('click', '#GuardarPlacasCecilia', function (e) {

        var ds = $("#gridPopUpCecilia").data("kendoGrid").dataSource;
        var window = $("#windowGridCecilia");
        //actualizaGridGeneralPorPlaca();
        $("#windowGridCecilia").data("kendoWindow").close();

    });

    $(document).on('click', '#GuardarDefectos', function (e) {
    
        var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
        var window = $("#windowGridDefectos");
        //actualizaGridGeneralPorDefectos();
        $("#windowGridDefectos").data("kendoWindow").close();

        
    });

    $(document).on('click', '#GuardarInspeccion', function (e) {
    
        var ds = $("#gridPopUpInspeccion").data("kendoGrid").dataSource;
        var window = $("#windowGridInspeccion");
        //actualizaGridGeneralPorDefectos();
        $("#windowGridInspeccion").data("kendoWindow").close();
        var grid = $("#gridPopUpInspeccion").data("kendoGrid");
        grid.destroy();
    });
}