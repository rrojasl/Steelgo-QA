function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoProveedor();
    SuscribirEventoRequisicion();
    SuscribirEventoRecibido();    
    SuscribirEventoCondicionesFisicas();
    SuscribirEventoDefectos();
    SuscribirEventoPlanchado();
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "idProyecto",
        dataValueField: "Proyecto",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}

function SuscribirEventoProveedor() {
    $("#inputProveedor").kendoComboBox({
        dataTextField: "idProveedor",
        dataValueField: "Proveedor",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}

function SuscribirEventoRequisicion() {
    $("#inputRequisicion").kendoComboBox({
        dataTextField: "idFuente",
        dataValueField: "Fuente",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    })
}

function SuscribirEventoRecibido() {
    $("#inputDocumentoRecibido").kendoComboBox({
        dataTextField: "DocumentoRecibidoNombre",
        dataValueField: "DocumentoRecibidoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            } else {
                $("#inputDocumentoRecibido").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoCondicionesFisicas() {
    $("#inputCondicionesFisicas").kendoComboBox({
        dataTextField: "DocumentoEstatusNombre",
        dataValueField: "DocumentoEstatusID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if (dataItem.DocumentoEstatusID == 2) {
                    $("#divDefectos").show();
                } else {
                    $("#divDefectos").hide();
                }

            } else {
                $("#inputCondicionesFisicas").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoDefectos() {
    $("#inputDefectos").kendoComboBox({
        dataTextField: "DefectoDocumentoNombre",
        dataValueField: "DefectoDocumentoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if(dataItem!=undefined){

            } else {
                $("#inputDefectos").data("kendoComboBox").value("");
            }
        }
    })
}

function SuscribirEventoPlanchado() {
    $("#botonPlanchar").click(function () {
        $("#")
    });
}