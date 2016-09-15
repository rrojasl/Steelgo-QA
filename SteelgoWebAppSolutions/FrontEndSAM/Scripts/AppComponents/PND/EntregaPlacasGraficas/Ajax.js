function AjaxCargarCamposPredeterminados() {
    var tipoCampo = 3050;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: tipoCampo }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        AjaxCargaTipoLlenado();
    });
}
function AjaxCargaTipoLlenado() {
    var tipoCampo = 3051;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: tipoCampo }).done(function (data) {
        if (data == "vacios") {
            $('input:radio[name=Planchar]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Planchar]:nth(1)').trigger("click");
        }        
    });
}

function AjaxObtenerElementoRequisicion(paramReq) {

    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: paramReq }).done(function (data) {
        if (data != null) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data.listaProyecto);
            $("#inputProyecto").data("kendoComboBox").value(data.ProyectoID);

            $("#inputProveedor").data("kendoComboBox").dataSource.data([]);
            $("#inputProveedor").data("kendoComboBox").dataSource.data(data.listaProveedor);
            $("#inputProveedor").data("kendoComboBox").value(data.ProveedorID);

            $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data.listaRequisicion);
            $("#inputRequisicion").data("kendoComboBox").value(data.RequisicionID);

            AjaxObtieneDetalleRequisicion();
        }
    });
}

function AjaxCargaListaProyectos() {   
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        var proyectoID = 0;
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ProyectoID != 0) {
                    proyectoID = data[i].ProyectoID;
                }

            }
        }

        $("#inputProyecto").data("kendoComboBox").value(proyectoID);
        $("#inputProyecto").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargaListaProveedores(proyectoID, patioID) {
    var Requisicion = $("#inputRequisicion").data("kendoComboBox").dataItem($("#inputRequisicion").data("kendoComboBox").select());
    var tipoPruebaID = 0;

    if (Requisicion != undefined) {
        if (Requisicion.TipoPruebaID != 0) {
            tipoPruebaID = Requisicion.TipoPruebaID;
        }
    }

    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: Cookies.get("token"), ProyectoID: proyectoID, PatioID: patioID, TipoPruebaID: tipoPruebaID}).done(function (data) {
        $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
        var ProveedorID = 0;
        if(data.length < 3){            
            for (var i = 0; i < data.length; i++) {
                if (data[i].ProveedorID != 0) {
                    ProveedorID = data[i].ProveedorID;
                }

            }
        }
        $("#inputProveedor").data("kendoComboBox").value(ProveedorID);
        $("#inputProveedor").data("kendoComboBox").trigger("change");;
        
    });
}

function AjaxCargaListaRequisicion(proyectoID, proveedorID) {

    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: Cookies.get("token"), ProyectoID: proyectoID, lenguaje: $("#language").val(), proveedorID: proveedorID }).done(function (data) {
        $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

        var RequisicionID = 0;
        if(data.length < 3){
            for (var i = 0; i < data.length; i++) {
                if (data[i].RequisicionID != 0) {
                    RequisicionID = data[i].RequisicionID;
                }
            }
        }

        $("#inputRequisicion").data("kendoComboBox").value(RequisicionID);
        $("#inputRequisicion").data("kendoComboBox").trigger("change");

    });
}

function AjaxCargaListaDocumentoRecibido() {
    var respuesta = 1;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: Cookies.get("token"), numeroCatalogo: respuesta, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data([]);
        $("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data(data);

        var DocumentoRecibidoID = 0;
        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].DocumentoRecibidoID != 0) {
                    DocumentoRecibidoID = data[i].DocumentoRecibidoID;
                }
            }
        }

        $("#inputDocumentoRecibido").data("kendoComboBox").value(DocumentoRecibidoID);
        $("#inputDocumentoRecibido").data("kendoComboBox").trigger("change");

        AjaxCargaListaDocumentoEstatus();
    });

}

function AjaxCargaListaDocumentoEstatus() {
    var respuesta = 2;

    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: Cookies.get("token"), numeroCatalogo: respuesta, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputCondicionesFisicas").data("kendoComboBox").dataSource.data([]);
        $("#inputCondicionesFisicas").data("kendoComboBox").dataSource.data(data);
        var DocumentoEstatusID = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].DocumentoEstatusID != 0) {
                    DocumentoEstatusID = data[i].DocumentoEstatusID;
                }
            }
        }

        $("#inputCondicionesFisicas").data("kendoComboBox").value(DocumentoEstatusID);
        $("#inputCondicionesFisicas").data("kendoComboBox").trigger("change");

        AjaxCargaListaDocumentoDefecto();
    });
}

function AjaxCargaListaDocumentoDefecto() {
    var respuesta = 3;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: Cookies.get("token"), numeroCatalogo: respuesta, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputDefectos").data("kendoComboBox").dataSource.data([]);
        $("#inputDefectos").data("kendoComboBox").dataSource.data(data);

        var DocumentoDefectoID = 0;
        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].DocumentoDefectoID != 0) {
                    DocumentoDefectoID = data[i].DocumentoDefectoID;
                }
            }
        }

        $("#inputDefectos").data("kendoComboBox").value(DocumentoDefectoID);
        $("#inputDefectos").data("kendoComboBox").trigger("change");
    });    
}

function AjaxObtieneDetalleRequisicion() {
    var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
    var proveedorID = $("#inputProveedor").data("kendoComboBox").value();
    var requisicionID = $("#inputRequisicion").data("kendoComboBox").value();

    if (proyectoID != 0 && proveedorID != 0 && requisicionID != 0) {
        $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: Cookies.get("token"), proyectoID: proyectoID, proveedorID: proveedorID, requisicionID: requisicionID, lenguaje: $("#language").val() }).done(function (data) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var tipoPrueba;
            if(data.length>0){
                for (var i = 0; i < data.length; i++) {
                    ds.add(data[i]);
                    tipoPrueba = data[i].TipoPruebaID;
                }
                var Requisicion = $("#inputRequisicion").data("kendoComboBox").dataItem($("#inputRequisicion").data("kendoComboBox").select());
                if(Requisicion.TipoPruebaID == 12){
                    $("#grid th[data-field=DocumentoEstatus]").html(_dictionary.columnCondicionesFisicasDocto[$("#language").data("kendoDropDownList").value()]);
                    $("#lblCondicionesPlacasOGraficas").text(_dictionary.lblCondicionesFisicasDocto[$("#language").data("kendoDropDownList").value()]);
                } else {
                    $("#grid th[data-field=DocumentoEstatus]").html(_dictionary.columnCondicionesFisicasSL[$("#language").data("kendoDropDownList").value()]);
                    $("#lblCondicionesPlacasOGraficas").text(_dictionary.lblCondicionesFisicasSL[$("#language").data("kendoDropDownList").value()]);
                }
                disableDocumentoDefecto();
            }
        });
    }
}

function disableDocumentoDefecto() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    if(data.length>0){        
        for (var i = 0; i < ds._data.length; i++) {
            if (data[i].DocumentoEstatusID == 1) {
                data[i].__proto__.fields.DocumentoDefecto.editable = false;
            } else {
                data[i].__proto__.fields.DocumentoDefecto.editable = true;
            }
        }
    }
    
}

function AjaxGuardarCaptura(ds, guardarYNuevo) {
    if (ds.length > 0) {
        var RequisicionID = 0;
        var Captura = [];
        Captura[0]={Detalles: "" }
        var listaDetalles = [];
        var cont = 0;
        for (var i = 0; i < ds.length; i++) {

            listaDetalles[cont] = { 
                Accion: "",
                EntregaPlacasGraficasID: "",
                RequisicionID: "", 
                OrdenTrabajoID: "", 
                SpoolID: "",
                JuntaID: "",
                DocumentoRecibidoID: "",
                DocumentoEstatusID: "",
                DocumentoDefectoID: "",
                Estatus: 1
            };

            listaDetalles[cont].Accion = ds[i].Accion;
            listaDetalles[cont].EntregaPlacasGraficasID = ds[i].EntregaPlacasGraficasID;
            listaDetalles[cont].RequisicionID = ds[i].RequisicionID;
            listaDetalles[cont].OrdenTrabajoID = ds[i].OrdenTrabajoID;
            listaDetalles[cont].SpoolID = ds[i].SpoolID;
            listaDetalles[cont].JuntaID = ds[i].JuntaSpoolID;
            listaDetalles[cont].DocumentoRecibidoID = ds[i].DocumentoRecibidoID;
            listaDetalles[cont].DocumentoEstatusID = ds[i].DocumentoEstatusID;
            listaDetalles[cont].DocumentoDefectoID = ds[i].DocumentoDefectoID;

                if ((listaDetalles[cont].DocumentoRecibidoID == 0 || listaDetalles[cont].DocumentoEstatusID == 0 ||
                    listaDetalles[cont].DocumentoDefectoID == 0) &&listaDetalles[cont].Accion != 4) {
                    if(listaDetalles[cont].Accion == 2){
                        listaDetalles[cont].Accion = 4;
                    } else {
                        
                        if (listaDetalles[cont].DocumentoRecibidoID == 0) {
                            listaDetalles[cont].Estatus = 0;
                            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                        }
                        if (listaDetalles[cont].DocumentoEstatusID == 0) {
                            listaDetalles[cont].Estatus = 0;
                            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                        }

                        if (listaDetalles[cont].DocumentoEstatusID == 2 && listaDetalles[cont].DocumentoDefectoID == 0) {
                            listaDetalles[cont].Estatus = 0;
                            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                        }
                    }
                    
                }
                if (ds[i].Accion != 2 && RequisicionID==0) {
                    RequisicionID = $("#inputRequisicion").data("kendoComboBox").value();
                }
                cont++;
        }
        Captura[0].Detalles = listaDetalles;

        if (!ExistRowEmpty(listaDetalles)) {
            $EntregaPlacasGraficas.EntregaPlacasGraficas.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), requisicionID: RequisicionID }).done(function (data) {
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
                    $EntregaPlacasGraficas.EntregaPlacasGraficas.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
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
                        ventanaConfirm.close();
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
