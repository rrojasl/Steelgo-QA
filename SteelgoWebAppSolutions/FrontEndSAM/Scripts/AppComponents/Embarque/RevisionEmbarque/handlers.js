var ProyectoInicial;
function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoEmbarque();
    SuscribirEventoBuscar();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoSpoolID();
    SuscribirEventoPaquete();
    SuscribirEventoAgregar();
    SuscribirEventoGuardar();
}

function SuscribirEventoProyecto() {
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                ProyectoInicial = dataItem.ProyectoID;

                AjaxCargarEmbarquesEnviados(dataItem.ProyectoID);

            }
            else {
                $("#Proyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoEmbarque() {
    $('#Embarque').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "EmbarqueID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                //AjaxCargarDetalleRevision();
            }
            else {
                $("#Embarque").data("kendoComboBox").value("");
            }
        }
    });
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
        //ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

    });

    $('#btnGuardarYNuevo1').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);

    });

};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
    }
}

function SuscribirEventoBuscar() {
    $('#btnBuscar').click(function (e) {
        if ($("#Embarque").data("kendoComboBox").text() != "") {
            AjaxObtieneDetalle($("#Embarque").data("kendoComboBox").value());
        }
        else {
            displayNotify('', 'Elije un embarque', '1');
        }
        
    });
}

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {

    });
}

function SuscribirEventoPaquete() {
    $('#inputPaquete').kendoComboBox({
        dataTextField: "Folio",
        dataValueField: "EmbarquePaqueteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputPaquete").data("kendoComboBox").dataItem($("#inputPaquete").data("kendoComboBox").select()) != undefined) {
                //ajaxBuscar();
            }
            else {
                $("#inputPaquete").data("kendoComboBox").value("");
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
                displayNotify("Mensajes_error", dataItem.Status, '1');

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
                //AjaxObtenerSpoolID();
            } catch (e) {
                //displayNotify("Mensajes_error", e.message, '0');
            }
        } else {
            //displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '2');
            //$("#InputOrdenTrabajo").focus();
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
                //AjaxAgregarCarga();
            }

        }
    });

};