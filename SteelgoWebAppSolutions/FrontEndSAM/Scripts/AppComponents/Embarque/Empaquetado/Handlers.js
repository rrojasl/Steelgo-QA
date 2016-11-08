function SuscribirEventos() {
    SuscribirEventoChangeRadioTipoListado();
    suscribirEventoProveedor();
    suscribirEventoTracto();
    suscribirEventoChofer();
    suscribirEventoPlana();
    suscribirEventoAgregar();
    suscribirEventoDestino();
    suscribirEventoGuardar();
    suscribirEventoProyecto();
    SuscribirEventoPaquete();
    SuscribirEventoSpoolID();
}

SuscribirEventos();

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


function suscribirEventoGuardar() {

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if ($("#Tracto").data("kendoComboBox").dataItem($("#Tracto").data("kendoComboBox").select()) != undefined) {
            if ($("#Chofer").data("kendoComboBox").dataItem($("#Chofer").data("kendoComboBox").select()) != undefined) {
                if ($("#Destino").data("kendoComboBox").dataItem($("#Destino").data("kendoComboBox").select()) != undefined) {
                    if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
                        opcionHabilitarView(true, "FieldSetView");
                        //AjaxGuardarPlanas(ds._data);
                    }
                    else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                        opcionHabilitarView(false, "FieldSetView")
                    }
                }
                else {
                    displayNotify("", "Debe seleccionar un Destino", "1");
                }
            }
            else {
                displayNotify("", "Debe seleccionar un Chofer", "1");
            }
        }
        else {

            displayNotify("", "Debe seleccionar un tracto", "1");
        }
    });
}

function suscribirEventoAgregar() {

    $('#btnAgregar').click(function (e) {
        if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
            AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
        }
        else {
            $("#Plana").data("kendoComboBox").value("");
        }

    });
}

function suscribirEventoProyecto() {
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Proveedor").data("kendoComboBox").dataItem($("#Proveedor").data("kendoComboBox").select()) != undefined) {
                
                //AjaxCargarTracto($("#Proveedor").data("kendoComboBox").value());
            }
            else {
                $("#Proyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoProveedor() {
    $("#Proveedor").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TransportistaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Proveedor").data("kendoComboBox").dataItem($("#Proveedor").data("kendoComboBox").select()) != undefined) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                $("#Tracto").data("kendoComboBox").value("");
                $("#Chofer").data("kendoComboBox").value("");
                $("#Plana").data("kendoComboBox").value("");
                $("#Destino").data("kendoComboBox").value("");
                //AjaxCargarTracto($("#Proveedor").data("kendoComboBox").value());
            }
            else {
                $("#Proveedor").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoDestino() {
    $("#Destino").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DestinoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Destino").data("kendoComboBox").dataItem($("#Destino").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#Destino").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoTracto() {
    $("#Tracto").kendoComboBox({
        dataTextField: "Placas",
        dataValueField: "VehiculoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Tracto").data("kendoComboBox").dataItem($("#Tracto").data("kendoComboBox").select()) != undefined) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                $("#Chofer").data("kendoComboBox").value("");
                $("#Plana").data("kendoComboBox").value("");
                $("#Destino").data("kendoComboBox").value("");
                //AjaxCargarChofer($("#Tracto").data("kendoComboBox").value());
            }
            else {
                $("#Tracto").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoChofer() {
    $("#Chofer").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ChoferID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Chofer").data("kendoComboBox").dataItem($("#Chofer").data("kendoComboBox").select()) != undefined) {
                $("#grid").data('kendoGrid').dataSource.data([]);

                $("#Plana").data("kendoComboBox").value("");
                //AjaxCargarPlana($("#Proveedor").data("kendoComboBox").value());
                //AjaxCargarDatosChofer($("#Tracto").data("kendoComboBox").value(), $("#Chofer").data("kendoComboBox").value());
            }
            else {
                $("#Chofer").data("kendoComboBox").value("");
            }
        }

    });
}

function suscribirEventoPlana() {
    $("#Plana").kendoComboBox({
        dataTextField: "Placas",
        dataValueField: "EmbarquePlanaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
                //AjaxCargarDestino($('#Plana').data("kendoComboBox").dataSource._data[$('#Plana').data("kendoComboBox").selectedIndex].ProyectoID);
            }
            else {
                $("#Plana").data("kendoComboBox").value("");
            }
        }
    });

    $('#Plana').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#Plana").data("kendoComboBox").dataItem($("#Plana").data("kendoComboBox").select()) != undefined) {
                AgregaRenglon($("#Plana").data("kendoComboBox").value(), $("#Plana").data("kendoComboBox").text());
                //AjaxCargarDestino($('#Plana').data("kendoComboBox").dataSource._data[$('#Plana').data("kendoComboBox").selectedIndex].ProyectoID);
            }
            else {
                $("#Plana").data("kendoComboBox").value("");
            }
        }
    });

}


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Chofer").data("kendoComboBox").enable(false);
        $("#Plana").data("kendoComboBox").enable(false);
        $("#Tracto").data("kendoComboBox").enable(false);
        $("#Proveedor").data("kendoComboBox").enable(false);
        $("#Destino").data("kendoComboBox").enable(false);
        $("#btnAgregar").prop('disabled', true);

        //$('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Chofer").data("kendoComboBox").enable(true);
        $("#Plana").data("kendoComboBox").enable(true);
        $("#Tracto").data("kendoComboBox").enable(true);
        $("#Proveedor").data("kendoComboBox").enable(true);
        $("#Destino").data("kendoComboBox").enable(true);
        $("#btnAgregar").prop('disabled', false);
        //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}

function SuscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(0)').change(function () {
        $("#divSpool").show();
        //$("#divPaquete").hide();
        $("#divCodigo").hide();
    });
    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(1)').change(function () {
        $("#divSpool").hide();
        //$("#divPaquete").show();
        $("#divCodigo").hide();

    });
    $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(2)').change(function () {
        $("#divSpool").hide();
        //$("#divPaquete").hide();
        $("#divCodigo").show();

    });
}