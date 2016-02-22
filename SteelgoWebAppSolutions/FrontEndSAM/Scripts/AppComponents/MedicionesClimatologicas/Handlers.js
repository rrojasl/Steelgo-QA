

function SuscribirEventos() {
    SuscribirEventoGuardar();
    suscribirEventoArea();
  //  SuscribirEventoProyecto();
    SuscribirEventoPatio();
    SubscribeMedicionesTempAmbiente();
    SubscribeMedicionesCampoX();
    SubscribeMedicionesHumedad();
    SubscribeMedicionesPuntoRocio();
    
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
        dataTextField: "NombrePatio",
        dataValueField: "PatioID ",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            if (dataItem == undefined) {
                displayMessage("errorNoExistePatio", '', '2');
            }
        },
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                displayMessage("errorNoExistePatio", '', '2');
            }
        }
    });
}

//mediciones 
function SubscribeMedicionesTempAmbiente()
{
    $("#inputEquipoTomaTempAmbID").kendoComboBox();

}

function SubscribeMedicionesHumedad() {
    $("#inputEquipoTomaHumedadID").kendoComboBox();

}

function SubscribeMedicionesPuntoRocio() {
    $("#inputEquipoTomaPtoRocioID").kendoComboBox();

}

function SubscribeMedicionesCampoX() {
    $("#inputEquipoTomaCampoXID").kendoComboBox();

}




