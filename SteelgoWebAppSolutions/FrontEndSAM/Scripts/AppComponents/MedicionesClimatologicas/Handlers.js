

function SuscribirEventos() {
    SuscribirEventoGuardar();
    suscribirEventoArea();
  //  SuscribirEventoProyecto();
    SuscribirEventoPatio();
    SubscribeMedicionesTempAmbiente();
    SubscribeMedicionesCampoX();
    SubscribeMedicionesHumedad();
    SubscribeMedicionesPuntoRocio();
    SubscribeCalendarFechaToma();
    SubscribeNumerosDecimal();
    SubscribeHora();
    
};
SuscribirEventos();


function EventoGuardar() {
    AjaxGuardarCaptura(0);
}
function SuscribirEventoGuardar() {
    $("#Guardar").click(function (e) {
        EventoGuardar();
    });

    $("#GuardarPie").click(function (e) {
        EventoGuardar();
    });

    //botonGuardar2
    //botonGuardarYNuevo
    //btnGuardarPiePagina
    //DetalleAvisoLlegada0062



}


function Limpiar() {

}

function opcionHabilitarView(valor, name) {

    if (valor) {


    }
    else {

    }
}

function suscribirEventoArea() {
    $("#Area").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "AreaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Area").data("kendoComboBox").dataItem($("#Area").data("kendoComboBox").select()) != undefined) {
              
            }
            else {
                $("#Area").data("kendoComboBox").value("");
            }
        }
    });
}

//proyectos cuando seleccionas un proyecto se pinta su patio correspondinte
//function SuscribirEventoProyecto() {
//    $('#inputProyecto').kendoComboBox({
//        dataTextField: "Proyecto",
//        dataValueField: "ProyectoID",
//        suggest: true,
//        filter: "contains",
//        index: 3,
//        select: function (e) {
//            var dataItem = this.dataItem(e.item.index());
//            if (dataItem != undefined) {
//                $("#inputPatio").data("kendoComboBox").value("");
//                $("#inputPatio").data("kendoComboBox").dataSource.data(dataItem.ListaPatio);
//               // alert(JSON.stringify(dataItem.ListaPatio));
//              //  $("#inputPatio").data("kendoComboBox").select(e.item.index);
//            }
//            else {
//                displayMessage("errorNoExisteProyecto", '', '2');
//            }
//        },
//        change: function (e) {
//            var dataItem = this.dataItem(e.sender.selectedIndex);
//            if (dataItem != undefined) {
//                // llemar el patio dependiendo del
//            }
//            else {
//                displayMessage("errorNoExisteProyecto", '', '2');
//            }
//        }
//    });
//}

//patios
function SuscribirEventoPatio() {
    $('#inputPatio').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PatioID ",
        suggest: true,
        filter: "contains",
        index: 0,
        //dataSource: [
        //     { Nombre: "Patio Default", PatioID: "1" },
        //     { Nombre: "Comdistral", PatioID: "2" },
        //     { Nombre: "Veracruz", PatioID: "3" },
        //     { Nombre: "Bay-Corpus Christi", PatioID: "4" },
        //     { Nombre: "Altamira", PatioID: "5" },
        //     { Nombre: "Bay Montana", PatioID: "6" },
        //     { Nombre: "Altamira", PatioID: "7" },
        //     { Nombre: "Patio Ejemplo", PatioID: "8" },
        //     { Nombre: "Patio Prueba 1", PatioID: "9" },
        //     { Nombre: "Patio en Puerto", PatioID: "10" },
        //     { Nombre: "a", PatioID: "11" },
        //     { Nombre: "aa", PatioID: "12" },
        //     { Nombre: "Prueba Patio DELAI", PatioID: "13" },
        //     { Nombre: "Patio Prueba", PatioID: "14" },
        //     { Nombre: "Patio Prueba", PatioID: "15" },
        //     { Nombre: "Pat Material", PatioID: "16" }
        //],
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            if (dataItem == undefined) {
                displayMessage("errorNoExistePatio", '', '2');
            }

            //var patio = $(this).value();
            //alert(patio);

        },
        //change: function (e) {
        //    var dataItem = this.dataItem(e.sender.selectedIndex);
        //    if (dataItem == undefined) {
        //        displayMessage("errorNoExistePatio", '', '2');
        //    }
        //}
        change: function (e) {
            if ($("#inputPatio").data("kendoComboBox").dataItem($("#inputPatio").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputPatio").data("kendoComboBox").value("");
            }
        }

    });
}

//mediciones 
function SubscribeMedicionesTempAmbiente()
{
    $("#inputEquipoTomaTempAmbID").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "HerramientaDePruebaID",
        suggest: true,
        filter: "contains",
        index: 0,
        //dataSource: [
        //    { Nombre: "Termometro A", HerramientaDePruebaID: "4" },
        //     { Nombre: "Termometro B", HerramientaDePruebaID: "5" },
        //],
        change: function (e) {
            if ($("#inputEquipoTomaTempAmbID").data("kendoComboBox").dataItem($("#inputEquipoTomaTempAmbID").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#inputEquipoTomaTempAmbID").data("kendoComboBox").value("");
            }
        }
    });
}

function SubscribeMedicionesHumedad() {
    $("#inputEquipoTomaHumedadID").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "HerramientaDePruebaID",
        suggest: true,
        filter: "contains",
        index: 0,
        //dataSource: [
        //    { Nombre: "Termometro C", HerramientaDePruebaID: "4" },
        //     { Nombre: "Termometro D", HerramientaDePruebaID: "5" },
        //],
        change: function (e) {
            if ($("#inputEquipoTomaHumedadID").data("kendoComboBox").dataItem($("#inputEquipoTomaHumedadID").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputEquipoTomaHumedadID").data("kendoComboBox").value("");
            }
        }


    });

}

function SubscribeMedicionesPuntoRocio() {
    $("#inputEquipoTomaPtoRocioID").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "HerramientaDePruebaID",
        suggest: true,
        filter: "contains",
        index: 0,
        //dataSource: [
        //    { Nombre: "Rocio PR1", HerramientaDePruebaID: "6" },
        //     { Nombre: "Rocio PR2", HerramientaDePruebaID: "7" },

        //],
        change: function (e) {
            if ($("#inputEquipoTomaPtoRocioID").data("kendoComboBox").dataItem($("#inputEquipoTomaPtoRocioID").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputEquipoTomaPtoRocioID").data("kendoComboBox").value("");
            }
        }
    });

}

function SubscribeMedicionesCampoX() {
    $("#inputEquipoTomaCampoXID").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "HerramientaDePruebaID",
        suggest: true,
        filter: "contains",
        index: 0,
        //dataSource: [
        //    { Nombre: " X1", HerramientaDePruebaID: "8" },
        //     { Nombre: " X2", HerramientaDePruebaID: "9" },

        //],
        change: function (e) {
            if ($("#inputEquipoTomaCampoXID").data("kendoComboBox").dataItem($("#inputEquipoTomaCampoXID").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputEquipoTomaCampoXID").data("kendoComboBox").value("");
            }
        }


    });

}

function SubscribeCalendarFechaToma()
{
    $("#inputMedicionesfechaToma").kendoDatePicker({
        parseFormats: ["MMddyyyy"]
    });
}

function SubscribeNumerosDecimal()
{
    $("#inputMedicionesTempAmbiente").kendoMaskedTextBox({
        mask: "000.00",
    });

    $("#inputMedicionesHumedad").kendoMaskedTextBox({
        mask: "000.00",
    });

    $("#inputMedicionesPuntoRocio").kendoMaskedTextBox({
        mask: "000.00",
    });


}

function SubscribeHora()
{
    $("#inputMedicionesHoraToma").kendoMaskedTextBox({
        mask: "00:00",
    });
}
