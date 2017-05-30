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

        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("CantG");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("FechaRecibido");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("Camion");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("FacturaProveedor");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("Acuerdo");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("FechaEnvio");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("Pedimento");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("ShippingDate");

        //Steelgo
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("CantS");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("FechaRecibidoS");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("InspeccionS");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("FechaFactura");
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        //Gerez
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("CantG");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FechaRecibido");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("Camion");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FacturaProveedor");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("Acuerdo");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FechaEnvio");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("Pedimento");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("ShippingDate");

        //Steelgo

        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("CantS");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("FechaRecibidoS");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("InspeccionS");
        $("#gridPopUpSteelgo").data("kendoGrid").hideColumn("FechaFactura");
    });
    $('input:radio[name=Muestra]:nth(2)').change(function () {
        //Gerez
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("CantG");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FechaRecibido");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("Camion");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FacturaProveedor");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("Acuerdo");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FechaEnvio");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("Pedimento");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("ShippingDate");

        //Steelgo

        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("CantS");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FechaRecibidoS");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("InspeccionS");
        $("#gridPopUpSteelgo").data("kendoGrid").showColumn("FechaFactura");
    });
}


$('#inputOrdenCompra').kendoComboBox({
    dataTextField: "Nombre",
    dataValueField: "OrdenCompraID",
    dataSource: [{ OrdenCompraID: 0, Nombre: "" }, { OrdenCompraID: 1, Nombre: "DT CS FIgthing  PO  279" }],
    suggest: true,
    filter: "contains",
    index: 3,
    change: function (e) {
        var dataItem = this.dataItem(e.sender.selectedIndex);
        if (dataItem != undefined) {
            //pruebaOriginal = $("#inputOrdenCompra").data("kendoComboBox").value();
            AjaxCargarRevision();
        }
        else {
            $("#grid").data("kendoGrid").dataSource.data([]);
        }
        //loadingStart();
        //setTimeout(function () {
        //    $("#grid").data('kendoGrid').dataSource.data([]);
        //    var ds = $("#grid").data("kendoGrid").dataSource;
        //    ds.data([{
        //        Rev: "CS",
        //        Descripcion: "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo  , #3000 A 105",
        //        MaterialNorma: "A 105",
        //        Diametro1: "0.5",
        //        Diametro2: "",
        //        Registro: "SCH STD",
        //        Rating: "#300",
        //        PreparacionExtremos: "SW",
        //        Cant: 10,
        //        PrecioUnidad: "$3,78 ",
        //        Total: "$37,83 ",
        //        PackingList: "35777-1",
        //        Partida: "Partida 1",
        //        TemplateDetalleElemento: "Ver coladas",
        //        ListaDetalleColadas: [
        //        {
        //            Colada: "50015",
        //            InspeccionDetalle: "RELEASED",
        //            Comentario: "",
        //            Cant: 10,
        //            CantG: 9,
        //            FechaRecibido: "",
        //            Camion: "",
        //            FacturaProveedor: "",
        //            FechaLanzamiento: "",
        //            FechaEnvio: "",
        //            FechaRecibido: "",
        //            CantRecibida: 10,
        //            Acuerdo: "",
        //            FechaFactura: "",
        //            ListaDetalleInspeccion: [{
        //                Inspeccion: "REJECTED",
        //                Comentario: "mal elemento",
        //            }, {
        //                Inspeccion: "RELEASED",
        //                Comentario: "",
        //            }]
        //        },
        //        {
        //            Colada: "37LLLL",
        //            InspeccionDetalle: "RELEASED",
        //            Comentario: "",
        //            Cant: 3,
        //            CantG: 2,
        //            FechaRecibido: "",
        //            Camion: "",
        //            FacturaProveedor: "",
        //            FechaLanzamiento: "",
        //            FechaEnvio: "",
        //            FechaRecibidoS: "",
        //            CantRecibida: 2,
        //            Acuerdo: "",
        //            FechaFactura: "",
        //            ListaDetalleInspeccion: [{
        //                Inspeccion: "REJECTED",
        //                Comentario: "mal elemento",
        //            }, {
        //                Inspeccion: "RELEASED",
        //                Comentario: "",
        //            }]
        //        }]
        //    },
        //    {
        //        Rev: "CS",
        //        Descripcion: "Codo 45º Radio Largo, NeoData: 1.5 x  NPS SW Codo 45º Radio Largo  , #3000 A 105",
        //        MaterialNorma: "A 105",
        //        Diametro1: "1.5",
        //        Diametro2: "",
        //        Registro: "SCH STD",
        //        Rating: "#300",
        //        PreparacionExtremos: "SW",
        //        Cant: 10,
        //        PrecioUnidad: "$9,67",
        //        Total: "$96,71",
        //        PackingList: "",
        //        Partida: "",
        //        TemplateDetalleElemento: "Ver coladas",
        //        ListaDetalleColadas: [
        //        {
        //            Colada: "50015",
        //            InspeccionDetalle: "RELEASED",
        //            Comentario: "",
        //            Cant: 10,
        //            CantG: 9,
        //            FechaRecibido: "",
        //            Camion: "",
        //            FacturaProveedor: "",
        //            FechaLanzamiento: "",
        //            FechaEnvio: "",
        //            FechaRecibido: "",
        //            CantRecibida: 10,
        //            Acuerdo: "",
        //            FechaFactura: "",
        //            ListaDetalleInspeccion: [{
        //                Inspeccion: "REJECTED",
        //                Comentario: "mal elemento",
        //            }, {
        //                Inspeccion: "RELEASED",
        //                Comentario: "",
        //            }]
        //        },
        //        {
        //            Colada: "37LLLL",
        //            InspeccionDetalle: "RELEASED",
        //            Comentario: "",
        //            Cant: 3,
        //            CantG: 2,
        //            FechaRecibido: "",
        //            Camion: "",
        //            FacturaProveedor: "",
        //            FechaLanzamiento: "",
        //            FechaEnvio: "",
        //            FechaRecibidoS: "",
        //            CantRecibida: 2,
        //            Acuerdo: "",
        //            FechaFactura: "",
        //            ListaDetalleInspeccion: [{
        //                Inspeccion: "REJECTED",
        //                Comentario: "mal elemento",
        //            }, {
        //                Inspeccion: "RELEASED",
        //                Comentario: "",
        //            }]
        //        }]
        //    },
        //    {
        //        Rev: "CS",
        //        Descripcion: "Codo 45º Radio Largo, NeoData: 4 x  NPS BW Codo 45º Radio Largo SCH STD ,  A234 Gr.WPB seamless",
        //        MaterialNorma: "A 105",
        //        Diametro1: "4",
        //        Diametro2: "",
        //        Registro: "SCH STD",
        //        Rating: "#300",
        //        PreparacionExtremos: "BW",
        //        Neodata: "",
        //        Cant: 4,
        //        PrecioUnidad: "$8,37",
        //        Total: "$33,46",
        //        PackingList: "",
        //        Partida: "",
        //        TemplateDetalleElemento: "Ver coladas",
        //        ListaDetalleColadas: [
        //        {
        //            Colada: "50015",
        //            InspeccionDetalle: "RELEASED",
        //            Comentario: "",
        //            Cant: 10,
        //            CantG: 9,
        //            FechaRecibido: "",
        //            Camion: "",
        //            FacturaProveedor: "",
        //            FechaLanzamiento: "",
        //            FechaEnvio: "",
        //            FechaRecibido: "",
        //            CantRecibida: 10,
        //            Acuerdo: "",
        //            FechaFactura: "",
        //            ListaDetalleInspeccion: [{
        //                Inspeccion: "REJECTED",
        //                Comentario: "mal elemento",
        //            }, {
        //                Inspeccion: "RELEASED",
        //                Comentario: "",
        //            }]
        //        },
        //        {
        //            Colada: "37LLLL",
        //            InspeccionDetalle: "RELEASED",
        //            Comentario: "",
        //            Cant: 3,
        //            CantG: 2,
        //            FechaRecibido: "",
        //            Camion: "",
        //            FacturaProveedor: "",
        //            FechaLanzamiento: "",
        //            FechaEnvio: "",
        //            FechaRecibidoS: "",
        //            CantRecibida: 2,
        //            Acuerdo: "",
        //            FechaFactura: "",
        //            ListaDetalleInspeccion: [{
        //                Inspeccion: "REJECTED",
        //                Comentario: "mal elemento",
        //            }, {
        //                Inspeccion: "RELEASED",
        //                Comentario: "",
        //            }]
        //        }]
        //    }]);
        //    loadingStop();
        //}, 500);
    }
});



function suscribirEventoDetallePartida() {

    $(document).on('click', '.EnlacePorPlaca', function (e) {
        e.preventDefault();

    });
}

function suscribirEventoDetalleDefectoPorPlaca() {

    $(document).on('click', '.EnlaceDetalleColada', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));

            LlenarGridPopUpDetalleColadas(dataItem);


        }
    });
}

function suscribirEventoDetalleInspeccion() {

    $(document).on('click', '.EnlaceInspeccion', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid;

            $("#gridPopUpInspeccion").data('kendoGrid').dataSource.data([]);
            if ($('input:radio[name=Muestra]:nth(0)').prop('checked')) {
                grid = $("#gridPopUpCecilia").data("kendoGrid");
            }
            else if ($('input:radio[name=Muestra]:nth(1)').prop('checked')) {
                grid = $("#gridPopUpGerez").data("kendoGrid");
            }
            else if ($('input:radio[name=Muestra]:nth(2)').prop('checked')) {
                grid = $("#gridPopUpSteelgo").data("kendoGrid");
            }


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
        $("#windowGridSteelgo").data("kendoWindow").close();
    });

    $(document).on('click', '#CancelarInspeccion', function (e) {

        $("#windowGridInspeccion").data("kendoWindow").close();
    });


}

function suscribirEventoGuardar() {
    $(document).on('click', '#GuardarPlacasSteelgo', function (e) {
        var coladasCorrectos = true;
        var ds = $("#gridPopUpSteelgo").data("kendoGrid").dataSource;
        var window = $("#windowGrid");
        
        for (var i = 0; i < ds._data.length; i++) {
            if (ds._data[i].Accion == undefined || ds._data[i].Accion == 0)
                ds._data[i].Accion = 1;
            if ((ds._data[i].Colada == "" || ds._data[i].Cant == 0 || ds._data[i].Cant == "") && !(ds._data[i].Accion == 3 || ds._data[i].Accion == 4))
                coladasCorrectos = false;
        }
        if (coladasCorrectos) {
            modeloRenglon.ListaDetalleColadas = ds._data;

            $("#grid").data("kendoGrid").dataSource.sync();


            window.data("kendoWindow").close();
        }
        else 
            displayNotify('DynasolColadaMandatorio', '', '2');

        });
        $(document).on('click', '#GuardarPlacasGerez', function (e) {
            var coladasCorrectos = true;
            var ds = $("#gridPopUpGerez").data("kendoGrid").dataSource;
            var window = $("#windowGridGerez");
            
            for (var i = 0; i < ds._data.length; i++) {
                if (ds._data[i].Accion == undefined || ds._data[i].Accion == 0)
                    ds._data[i].Accion = 1;
                if ((ds._data[i].Colada == "" || ds._data[i].Cant == 0 || ds._data[i].Cant == "") && !(ds._data[i].Accion == 3 || ds._data[i].Accion == 4))
                    coladasCorrectos = false;
            }
            if (coladasCorrectos) {
                modeloRenglon.ListaDetalleColadas = ds._data;
                $("#grid").data("kendoGrid").dataSource.sync();
                window.data("kendoWindow").close();
            }
            else
                displayNotify('DynasolColadaMandatorio', '', '2');

            

        });

        $(document).on('click', '#GuardarPlacasCecilia', function (e) {
            var coladasCorrectos = true;
            var ds = $("#gridPopUpCecilia").data("kendoGrid").dataSource;
            var window = $("#windowGridCecilia");
            
            for (var i = 0; i < ds._data.length; i++) {
                if (ds._data[i].Accion == undefined || ds._data[i].Accion == 0)
                    ds._data[i].Accion = 1;
                if ((ds._data[i].Colada == "" || ds._data[i].Cant == 0 || ds._data[i].Cant == "") && !(ds._data[i].Accion == 3 || ds._data[i].Accion == 4))
                    coladasCorrectos = false;
            }
            if (coladasCorrectos) {
                modeloRenglon.ListaDetalleColadas = ds._data;
                $("#grid").data("kendoGrid").dataSource.sync();
                window.data("kendoWindow").close();
            }
            else
                displayNotify('DynasolColadaMandatorio', '', '2');


            

        });


        $(document).on('click', '#GuardarInspeccion', function (e) {
            var inspeccionCorrecta = true;
            var ds = $("#gridPopUpInspeccion").data("kendoGrid").dataSource;
            var window = $("#windowGridInspeccion");
            

            for (var i = 0; i < ds._data.length; i++) {
                if (ds._data[i].Accion == undefined || ds._data[i].Accion == 0)
                    ds._data[i].Accion = 1;
                if ((ds._data[i].Inspeccion == "") && !(ds._data[i].Accion == 3 || ds._data[i].Accion == 4))
                    inspeccionCorrecta = false;
            }
            if (inspeccionCorrecta) {
                coladaRow.ListaDetalleInspeccion = ds._data;

                var longitudInspeccion = ds._data.length;

                if (longitudInspeccion > 0) {
                    coladaRow.InspeccionDetalle = ds._data[longitudInspeccion - 1].Inspeccion;
                    coladaRow.Comentario = ds._data[longitudInspeccion - 1].Comentario;
                }
                else {
                    coladaRow.InspeccionDetalle = "Sin Inspeccion";
                    coladaRow.Comentario = "";
                }
                

                if ($('input:radio[name=Muestra]:nth(0)').prop('checked')) {
                    $("#gridPopUpCecilia").data("kendoGrid").dataSource.sync();
                }
                else if ($('input:radio[name=Muestra]:nth(1)').prop('checked')) {
                    $("#gridPopUpGerez").data("kendoGrid").dataSource.sync();
                }
                else if ($('input:radio[name=Muestra]:nth(2)').prop('checked')) {
                    $("#gridPopUpSteelgo").data("kendoGrid").dataSource.sync();
                }

                window.data("kendoWindow").close();
            }
            else
                displayNotify('DynasolInspeccionMandatorio', '', '2');

            

        });
    }