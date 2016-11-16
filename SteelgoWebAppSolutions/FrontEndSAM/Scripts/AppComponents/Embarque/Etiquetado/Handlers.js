function SuscribirEventos() {
    suscribirEventoProyecto();
    suscribirEventoZona();
    suscribirEventoCuadrante();
    suscribirEventoCuadrantePlanchado();

   
}


SuscribirEventos();

function suscribirEventoProyecto() {
    //$("#Proyecto").kendoComboBox({
    //    dataTextField: "Nombre",
    //    dataValueField: "ProyectoID",
    //    suggest: true,
    //    filter: "contains",
    //    index: 3,
    //    change: function (e) {
    //        if ($("#Proyecto").data("kendoComboBox").dataItem($("#Proyecto").data("kendoComboBox").select()) != undefined) {
    //            //AjaxCargarCuadrante($("#Area").data("kendoComboBox").value());
    //        }
    //        else {
    //            $("#Proyecto").data("kendoComboBox").value("");
    //        }

    //    }
    //});
}

function suscribirEventoZona() {
    $("#Zona").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        index: 3,
       
    });
}


function suscribirEventoCuadrante() {
    $("#Cuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,

    });
}
function suscribirEventoCuadrantePlanchado() {
    $("#InputCuadrante").kendoComboBox({
        dataTextField: "Nombre1",
        dataValueField: "CuadranteID1",
        suggest: true,
        filter: "contains",
        index: 3,

    });
}

function suscribirEventoGuardar() {

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds._data.length > 0) {
            if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                opcionHabilitarView(true, "FieldSetView");
                //AjaxGuardarCaptura(ds._data, "0");
            }
            else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
    });


}

function suscribirEventoVer() {

    $('#btnAgregar').click(function (e) {
        if ($("#Area").val() != "") {
            if ($("#Cuadrante").val() != "") {
                //AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val(), 2, $('input:radio[name=ConCinta]:checked').val());
            }
            else {
                displayNotify("EmbarqueMarcadoMensajeCuadrante", "", "1");
            }
        }
        else {
            displayNotify("EmbarqueMarcadoMensajeArea", "", "1");
        }
    });
}


function suscribirEventoImprimirEtiqueta() {

    $('#ImprimirEtiqueta').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        //AjaxGuardarCaptura(ds._data, "1");
    });
}


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Area").data("kendoComboBox").enable(false);
        $("#Cuadrante").data("kendoComboBox").enable(false);
        $("#btnAgregar").prop('disabled', true);
        $(".radioImpreso").prop('disabled', true);

        //$('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Area").data("kendoComboBox").enable(true);
        $("#Cuadrante").data("kendoComboBox").enable(true);
        $("#btnAgregar").prop('disabled', false);
        $(".radioImpreso").prop('disabled', false);
        //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}