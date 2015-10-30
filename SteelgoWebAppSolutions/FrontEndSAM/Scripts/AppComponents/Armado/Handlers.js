function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    SuscribirEventoTubero();
    SuscribirEventoTaller();
    suscribirEventoChangeRadio();

};


function suscribirEventoChangeRadio()
{
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        AjaxJunta($("#InputID").val());
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        AjaxJunta($("#InputID").val());
    });

}

function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {

        var ds = $("#grid").data("kendoGrid").dataSource;

        AjaxGuardarCaptura(ds._data);

    });

    $('#btnGuardarYNuevo').click(function (e) {

        var ds = $("#grid").data("kendoGrid").dataSource;

        AjaxGuardarCaptura(ds._data);
        Limpiar();
    });
}

function opcionHabilitarRadioTipoCaptura(valor)
{
    var radioButtons = document.getElementsByName('TipoAgregado');

    for (var x = 0; x < radioButtons.length; x++) {
      //  if (radioButtons[x].checked) {
            radioButtons[x].disabled = valor;

      //  }
    }
}


function Limpiar()
{
    
    $("#InputOrdenTrabajo").val("");
    

    $("#InputID").data("kendoComboBox").value("");
    
    $("#Junta").data("kendoComboBox").value("");

    var radioButtons = document.getElementsByName('Muestra');

    for (var x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            radioButtons[x].checked = false;

        }
    }

    $("#FechaArmado").data("kendoDatePicker").value("");

    $("#inputTubero").data("kendoComboBox").value("");

    $("#inputTaller").data("kendoComboBox").value("");


    var radioButtonsLLena = document.getElementsByName('LLena');

    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            radioButtonsLLena[x].checked = false;

        }
    }
    


    $("#grid").data('kendoGrid').dataSource.data([]);
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        // alert('se cancela todo y que pagina tiene que abrir');
        Limpiar();
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {

        ObtenerJSonGridArmado();
    });
}

function SuscribirEventoTubero() {
    $('#inputTubero').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    $('#inputTubero').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
          PlanchaTubero();
        }
    });
}

function SuscribirEventoTaller() {
    $('#inputTaller').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TallerID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    $('#inputTaller').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaTaller();
        }
    });
}

function SuscribirEventosJunta() {
    $('#Junta').kendoComboBox({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
        suggest: true,
        filter: "contains",
        index: 3
    });

    $('#Junta').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputID").data("kendoComboBox").input.focus();
            $("#Junta").val("");
        }
        else if (e.keyCode == 39) {
            $("#ButtonAgregar").focus();
        }
        else if (e.keyCode == 13) {
            

            if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte")
            {
                deshabilitaSpool();
                ObtenerJSonGridArmado();
                opcionHabilitarRadioTipoCaptura(true);
            }
            else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
                habilitaSpool();
                opcionHabilitarRadioTipoCaptura(true);
                ObtenerJSonGridArmado();

            }
            else {
                displayMessage("Mensajes_error", "Favor de seleccionar un Tipo de Captura", '2');
            }

        }
    });
}

function deshabilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", true);
    $("#InputID").data("kendoComboBox").enable(false);

}

function habilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", false);
    $("#InputID").data("kendoComboBox").enable(true);

}


function SuscribirEventoSpoolID() {

    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
           
            var dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                console.log("borrar datos");

                displayMessage("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
                AjaxObtenerListaTubero();
                AjaxObtenerListaTaller();
            }
          
        }
        ,
        change: function (e) {
           
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                AjaxJunta($("#InputID").val());
            }

            AjaxObtenerListaTubero();
            AjaxObtenerListaTaller();
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token") }).done(function (data) {
                    $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                    $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
                });
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');

            }
        } else {
            displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            $("#InputOrdenTrabajo").focus();
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoComboBox").input.focus();
        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
    });

};

function SuscribirEventoEliminar(idtable) {
    $("#" + idtable + " .deleteRow").on("click", function () {
        var td = $(this).parent();
        var tr = td.parent();
        //change the background color to red before removing
        tr.css("background-color", "#FF3700");

        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
};
