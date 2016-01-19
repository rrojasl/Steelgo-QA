function SuscribirEventos() {
    suscribirEventoCarro();
    suscribirEventoGuardarCarro();
    suscribirEventoShotBlastero();
    suscribirEventoPintor();
    suscribirEventoComponente();
    SuscribirEventoSpoolID();
    suscribirEventoCuadrante();
    suscribirEventoDescargar();
}

SuscribirEventos();

function suscribirEventoDescargar() {

    $('#btnDescargar').click(function (e) {
        ajaxAplicarDescarga(currentDataItemGridDownload)
        
        win.close();
    });
}

function suscribirEventoGuardarCarro() {

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCarro(ds._data)
    });
}


function suscribirEventoCuadrante() {

    $("#inputCuadrante").kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains"
    });
}


function suscribirEventoCarro() {

    $("#inputCarro").kendoDropDownList({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            AjaxCargarSpool($("#inputCarro").data("kendoDropDownList").value());
        }
    });
}

function suscribirEventoComponente() {

    $("#inputComponente").kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "PinturaComponenteComposicionID",
        suggest: true,
        filter: "contains",
        change: function (e) {

        }
    });
}

function suscribirEventoPintor() {

    $("#inputPintor").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        change: function (e) {

        }
    }).data("kendoMultiSelect");
    $('#inputPintor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {
                PlancharPintor($("#grid").data("kendoGrid").dataSource._data);
            }
        }

    });

    
}

function suscribirEventoShotBlastero() {

    $("#inputShotBlastero").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        change: function (e) {

        }
    }).data("kendoMultiSelect");

    $('#inputShotBlastero').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {
                PlancharShotBlastero($("#grid").data("kendoGrid").dataSource._data);
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
            }
            else {
                $("#InputID").val(dataItem.IDValido);

            }
        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {

                }

            }
        }
    });


    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                loadingStart();
                $CapturaSoldadura.Soldadura.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                    $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);

                    loadingStop();
                });
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaSoldaduraMensajeOrdenTrabajo", "", '1');
            $("#InputOrdenTrabajo").focus();
        }
    });



    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource()
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
        else if (e.keyCode == 13) {
            if ($("#grid").data("kendoGrid").dataSource._data.length != 0) {
                AjaxAgregarSpool($("#InputID").data("kendoComboBox").value());
            }
        }

    });
};


