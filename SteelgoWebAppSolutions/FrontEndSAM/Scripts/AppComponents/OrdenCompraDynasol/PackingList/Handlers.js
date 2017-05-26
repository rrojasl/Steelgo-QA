function SuscribirEventos() {
    suscribirEventoComboOrdenCompra();
    suscribirEventoGuardar();
}

function suscribirEventoGuardar() {
    $(".Guardar").click(function (e) {
        e.preventDefault();

        if ($("#InputPackingList").val() != "") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            if ($('#botonGuardar').text() == "Guardar" || $('#botonGuardar').text() == "Save") {
                loadingStart();
                setTimeout(function () {
                    opcionHabilitarView(true, "FieldSetView");
                    loadingStop();
                    displayNotify("MensajeGuardadoExistoso", "", "0");
                }, 500);
            }
            else if ($('#botonGuardar').text() == "Editar" || $('#botonGuardar').text() == "Edit")
                opcionHabilitarView(false, "FieldSetView")
        }
        else
            displayNotify("", "Escriba el packing List", "1");
    });

    $('.GuardarNuevo').click(function (e) {
        e.preventDefault();
        if ($("#InputPackingList").val() != "") {
            var ds = $("#grid").data("kendoGrid").dataSource;

            for (var i = 0; i < ds._data.length; i++) {
                if (ds._data[i].Agregar) {
                    ds._data[i].Accion = 3;
                }
            }
            ds.sync();

            loadingStart();
            setTimeout(function () {
                $("#InputPackingList").val("");

                opcionHabilitarView(false, "FieldSetView");
                loadingStop();
                displayNotify("MensajeGuardadoExistoso", "", "0");
            }, 500);
        }
        else
            displayNotify("", "Escriba el packing List", "1");
    });

}


function suscribirEventoComboOrdenCompra() {


    $('#inputProyecto').kendoComboBox({
        dataTextField: "Colada",
        dataValueField: "ColadaID",
        dataSource: [{ ColadaID: 0, Colada: "" }, { ColadaID: 1, Colada: "DT CS FIgthing  PO  279" }, { ColadaID: 2, Colada: "DT P22 FIgthing  PO  280" }],
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            loadingStart();
            setTimeout(function () {
                $("#grid").data('kendoGrid').dataSource.data([]);
                var ds = $("#grid").data("kendoGrid").dataSource;
                ds.data([{
                    Accion: 1,
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
                    Agregar: false,
                    PackingList: "35777-1",
                    Partida: "Partida 1",
                    TemplateDetalleElemento: "Ver coladas"
                },
                {
                    Accion: 1,
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
                    Partida: "P2",
                    Agregar: false,
                    PermiteSeparar: 1,

                },
                {
                    Accion: 1,
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
                    Partida: "P1",
                    Agregar: false,
                    PermiteSeparar: 1,

                }]);
                loadingStop();
            }, 500);
        }
    });

}



function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);

        $("#inputProyecto").data("kendoComboBox").enable(false);


        $('#botonGuardar2').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);

        $("#inputProyecto").data("kendoComboBox").enable(true);


        $('#botonGuardar2').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);


    }
}
