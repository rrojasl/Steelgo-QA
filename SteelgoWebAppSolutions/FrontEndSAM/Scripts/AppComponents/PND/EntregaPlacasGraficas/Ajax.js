function AjaxCargarCamposPredeterminados() {
    console.log("Hola personi!");
}

function AjaxCargaListaDocumentoRecibido() {
    var token = Cookies.get("token");
    var respuesta = 1;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, numeroCatalogo: respuesta }).done(function (data) {
        $("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data([]);
        $("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data(data);
        AjaxCargaListaDocumentoEstatus();
    });

}

function AjaxCargaListaDocumentoEstatus() {
    var token = Cookies.get("token");
    var respuesta = 2;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, numeroCatalogo: respuesta }).done(function (data) {
        $("#inputCondicionesFisicas").data("kendoComboBox").dataSource.data([]);
        $("#inputCondicionesFisicas").data("kendoComboBox").dataSource.data(data);
        AjaxCargaListaDocumentoDefecto();
    });
}

function AjaxCargaListaDocumentoDefecto() {
    var token = Cookies.get("token");
    var respuesta = 3;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, numeroCatalogo: respuesta }).done(function (data) {
        $("#inputDefectos").data("kendoComboBox").dataSource.data([]);
        $("#inputDefectos").data("kendoComboBox").dataSource.data(data);
    });
    AjaxObtieneDetalleRequisicion();
}

function AjaxObtieneDetalleRequisicion() {
    var token = Cookies.get("token");
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, proyectoID: 0, proveedorID: 0, requisicionID: 0 }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var tipoPrueba;
        if(data.length>0){
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
                tipoPrueba = data[i].TipoPruebaID;
            }
            if(tipoPrueba == 12){
                $("#grid th[data-field=DocumentoEstatus]").html(_dictionary.columnCondicionesFisicas1[$("#language").data("kendoDropDownList").value()]);
                $("#lblCondicionesFisicas").text(_dictionary.lblCondicionesFisicas1[$("#language").data("kendoDropDownList").value()]);
                //$("#gridName").data("kendoGrid").hideColumn(1);Ocultar columnas
            }
        }
    });
}

function AjaxGuardarCaptura(ds, guardarYNuevo) {
    var token = Cookies.get("token");
    if (ds.length > 0) {
        var Captura = [];
        Captura[0]={Detalles: "" }
        var listaDetalles = [];
        var cont = 0;
        for (var i = 0; i < ds.length; i++) {
            listaDetalles[cont] = { Accion: "", RequisicionID: "", OrdenTrabajoSpoolID: "", DetalleArmadoID:"", DocumentoRecibidoID: "", DocumentoEstatusID: "", DocumentoDefectoID: "", Estatus: 1 };
            listaDetalles[cont].Accion = ds[i].Accion;
            listaDetalles[cont].RequisicionID = ds[i].RequisicionID;
            listaDetalles[cont].OrdenTrabajoSpoolID = ds[i].OrdenTrabajoSpoolID;
            listaDetalles[cont].DetalleArmadoID = ds[i].DetalleArmadoID;
            listaDetalles[cont].DocumentoRecibidoID = ds[i].DocumentoRecibidoID;
            listaDetalles[cont].DocumentoEstatusID = ds[i].DocumentoEstatusID;
            listaDetalles[cont].DocumentoDefectoID = ds[i].DefectoDocumentoID;

            if (listaDetalles[cont].DocumentoRecibidoID == 0 || listaDetalles[cont].DocumentoEstatusID == 0 ||
                ( listaDetalles[cont].DocumentoEstatusID == 2 && listaDetalles[cont].DocumentoDefectoID == "")) {
                listaDetalles[cont].Estatus = 0;
            }

        }
        Captura[0].Detalles = listaDetalles;

        if (!ExistRowEmpty(listaDetalles)) {
            $EntregaPlacasGraficas.EntregaPlacasGraficas.create(Captura[0], { token: token, lenguaje: $("#language").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                    if (guardarYNuevo) {
                        cleanView();
                    } else {

                        AjaxObtieneDetalleRequisicion();
                        disableEnableView(true);
                    }

                    displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
                } else {
                    displayNotify("EntregaPlacasGraficasMensajeGuardadoErroneo", "", '2');
                }
            
            });
        } else {
            RowEmpty($("#grid"));
            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButton").click(function () {

                for (var i = 0; i < Captura[0].Detalles.length; i++) {
                    if (Captura[0].Detalles[i].Estatus == 0) {
                        Captura[0].Detalles.pop(Captura[0].Detalles[i]);
                    }
                }

                if(Captura[0].Detalles.length>0){
                    $EntregaPlacasGraficas.EntregaPlacasGraficas.create(Captura[0], { token: token, lenguaje: $("#language").val() }).done(function (data) {
                        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                            if (guardarYNuevo) {
                                cleanView();
                            } else {

                                AjaxObtieneDetalleRequisicion();
                                disableEnableView(true);
                            }

                            displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
                        } else {
                            displayNotify("EntregaPlacasGraficasMensajeGuardadoErroneo", "", '2');
                        }

                    });
                } else {
                    ventanaConfirm.close();
                    displayNotify("EntregaPlacasGraficasExcepcionGuardado", "", '1');
                }

            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
        }
    } else {
        displayNotify("EntregaPlacasGraficasExcepcionGuardado", "", '2');
    }
}
