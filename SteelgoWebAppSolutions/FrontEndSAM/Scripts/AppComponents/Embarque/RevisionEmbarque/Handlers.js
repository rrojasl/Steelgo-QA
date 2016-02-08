function SuscribirEventos()
{
    SuscribirEventoEmbarquePlana();
    SuscribirEventoSpoolID();
    SuscribirEventoPaquete();
    SuscribirEventoBuscar();
    SuscribirEventoAgregar();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoGuardar();
}


function ObtenerTipoConsulta() {
    var radioButtonsLLena = document.getElementsByName('RevisionEmbarqueTipoSeleccion');
    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            return (x + 1);
        }
    }
    return -1;
}


function SuscribirEventoGuardar() {



    $('#btnGuardarYNuevo').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
       
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

    });

    $('#btnGuardar').click(function (e) {

        if ($('#botonGuardar').text() == "Guardar") {
            
            if( ajaxGuardar($("#grid").data("kendoGrid").dataSource._data))
                opcionHabilitarView(true, "FieldSetView");
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#Guardar').click(function (e) {

        if ($('#botonGuardar').text() == "Guardar") {

            if (ajaxGuardar($("#grid").data("kendoGrid").dataSource._data))
                opcionHabilitarView(true, "FieldSetView");
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");
    }
}


function SuscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(0)').change(function () {
        $("#divSpool").show();
        $("#divPaquete").hide();
        $("#divCodigo").hide();
    });
    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(1)').change(function () {
        $("#divSpool").hide();
        $("#divPaquete").show();
        $("#divCodigo").hide();

    });
    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(2)').change(function () {
        $("#divSpool").hide();
        $("#divPaquete").hide();
        $("#divCodigo").show();

    });
}

function SuscribirEventoBuscar()
{
    $('#btnBuscar').click(function (e) {
        ajaxBuscar();
    });
}

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        AjaxAgregarCarga()
    });
}


function SuscribirEventoPaquete() {
    $('#inputPaquete').kendoComboBox({
        dataTextField: "Folio",
        dataValueField: "EmbarquePaqueteID",
        suggest: true,
        filter: "contains",
        index: 3,
    });
}



function SuscribirEventoEmbarquePlana() {
    $('#inputEmbarqueBuscar').kendoComboBox({
        dataTextField: "Folio",
        dataValueField: "EmbarquePlanaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            ajaxBuscar();
        },
        selectedIndex: function (e) {
            if ($("#inputEmbarqueBuscar").data("kendoComboBox").dataItem($("#inputEmbarqueBuscar").data("kendoComboBox").select()) != undefined) {
                ajaxBuscar();
            }
            else {
                $("#inputEmbarqueBuscar").data("kendoComboBox").value("");
            }
            
        }
    });
}


function SuscribirEventoSpoolID() {
    
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {

            dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                displayMessage("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }

        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);

            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '2');
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
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) {
            if ($('#InputID').data("kendoComboBox").value() != "") {
                AjaxAgregarCarga();
            }
            
        }
    });

};