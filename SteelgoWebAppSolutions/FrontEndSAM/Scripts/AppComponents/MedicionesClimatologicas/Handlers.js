function SuscribirEventos() {
    SuscribirEventoGuardar();
    suscribirEventoArea();
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
        if ($(this).text() == "Editar" || $(this).text() == "Edit")
        {
            HablilitarInputs();
            $(this).text("Guardar")
            $("#GuardarPie").text("Guardar");
        }
        else
        { EventoGuardar(); }
    });

    $("#btnGuardarYNuevo").click(function (e) {
        EventoGuardar();
        Limpiar();
        HablilitarInputs();
    });

    $("#EditarPie").click(function (e) {
    });

    $("#GuardarPie").click(function (e) {
        if ($(this).text() == "Editar" || $(this).text() == "Edit") {
            HablilitarInputs();
            $(this).text("Guardar");
            $("#Guardar").text("Guardar");
        }
        else { EventoGuardar(); }
    });

   
}

function Limpiar() {

    $(':input', '#FieldSetView').not(':button, :submit, :reset, :hidden, :radio, :checkbox').val('');
    if ($("#Guardar").text() == "Editar" && $("#GuardarPie").text() == 'Editar')
    {
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#GuardarPie").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function opcionHabilitarView(valor, name) {

    if (valor) {


    }
    else {

    }
}
//patios
function SuscribirEventoPatio() {
  cbxPatios =  $('#inputPatio').kendoComboBox({
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
//Zonas
function suscribirEventoArea() {
    $("#Area").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "AreaID",
        suggest: true,
        filter: "contains",
        cascadeFrom: "cbxPatios",
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
//herramientas para mediciones 
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
//
function SubscribeHora()
{
    $("#inputMedicionesHoraToma").kendoMaskedTextBox({
        mask: "00:00",
    });
}
//habilitar botones 
function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#Guardar').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#GuardarPie").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#botonGuardar2').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function DeshablilitarInputs()
{
    $('#FieldSetView').find(':input').prop('disabled', true);
}


function HablilitarInputs() {
    $('#FieldSetView').find(':input').prop('disabled', false);
}

