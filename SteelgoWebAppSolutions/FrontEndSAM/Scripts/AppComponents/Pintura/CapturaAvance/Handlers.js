function SuscribirEventos() {
    suscribirEventoCarro();
    suscribirEventoGuardarCarro();
    suscribirEventoShotBlastero();
    suscribirEventoPintor();
    suscribirEventoComponente();
    SuscribirEventoSpoolID();
}

SuscribirEventos();


function suscribirEventoGuardarCarro() {

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCarro(ds._data)
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
        dataTextField: "Componente",
        dataValueField: "ComponenteID",
        suggest: true,
        filter: "contains",
        change: function (e) {

        }
    });
}

function suscribirEventoPintor() {

    $("#inputPintor").kendoDropDownList({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        change: function (e) {

        }
    });
}

function suscribirEventoShotBlastero() {

    $("#inputShotBlastero").kendoDropDownList({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        change: function (e) {

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