function AjaxCargarCamposPredeterminados() {
    var campoPredeterminado = 3052;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: campoPredeterminado }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
    });
}


var dataSpoolArray = null;
function AjaxObtenerSpoolID() {
    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $Armado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        dataSpoolArray = data;
        if (Error(data)) {
            if (data.OrdenTrabajo != "") {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }

            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            $("#InputID").data("kendoComboBox").enable(true);
            $("#InputID").data("kendoComboBox").input.focus();
        }
    });
}

function AjaxObtenerElementoRequisicion(paramReq) {
    
    $EditarRequisicion.EditarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: paramReq }).done(function (data) {
        if(data!=null){
            $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data.listaProyecto);
            $("#inputProyecto").data("kendoComboBox").value(data.ProyectoID);

            $("#inputTipoPrueba").data("kendoComboBox").dataSource.data([]);
            $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data.listaTipoPrueba);
            $("#inputTipoPrueba").data("kendoComboBox").value(data.TipoPruebaID);

            $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data.listaRequisicion);
            $("#inputRequisicion").data("kendoComboBox").value(data.RequisicionID);
            $("#inputRequisicion").data("kendoComboBox").trigger("change");

        }
    });
}

function AjaxCargaListaProyecto() {
    var proyectoId = 0;
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ProyectoID!=0) {
                    proyectoId = data[i].ProyectoID;
                }
            }            
        }

        $("#inputProyecto").data("kendoComboBox").value(proyectoId);
        $("#inputProyecto").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargaListaTipoPrueba() {
    var tipoPruebaId = 0;
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#inputTipoPrueba").data("kendoComboBox").dataSource.data([]);
        $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data);
        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].TipoPruebaID != 0) {
                    tipoPruebaId = data[i].TipoPruebaID;
                }
            }
        }

        $("#inputTipoPrueba").data("kendoComboBox").value(tipoPruebaId);
        $("#inputTipoPrueba").data("kendoComboBox").trigger('change');
    });
}

function AjaxCargaListaRequisicion(tipoPruebaID, proyectoID) {
    var requisicionId = 0;
    //$ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID, estatusID: 1 }).done(function (data) {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID, estatusID: 1, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
        $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].RequisicionID != 0) {
                    requisicionId = data[i].RequisicionID;
                }
            }
        }
        $("#inputRequisicion").data("kendoComboBox").value(requisicionId);
        $("#inputRequisicion").data("kendoComboBox").trigger("change");

         
    });
}

function AjaxCargaDetalleRequisicion(_requisicionID, _tipoPruebaID, _proyectoID) {
    $EditarRequisicion.EditarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: _requisicionID, TipoPruebaID: _tipoPruebaID, ProyectoID: _proyectoID, Muestra: $('input:radio[name=Muestra]').val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }        
        loadingStop();
    }); 
}

function AjaxGuardaCaptura(arregloCaptura, guardaNuevo) {
    if (arregloCaptura.length > 0) {
        var ListaCaptura = [];
        var Captura = [];
        Captura[0] = {
            RequisicionID: 0,
            Requisicion: "",
            ProyectoID: 0,
            TipoPruebaID: 0,
            FechaRequisicion: "",
            CodigoAsme: "",
            Observacion: "",

            ListaDetalle: ""
        };
        var cont = 0;
        for (var i = 0; i < arregloCaptura.length; i++) {
            if ((arregloCaptura[i].Accion == 1 || arregloCaptura[i].Accion == 2) && arregloCaptura[i].Agregar == true) {
                ListaCaptura[cont] = {
                    RequisicionID: 0,
                    ElementoPorClasificacionPNDID: 0,
                    Accion: 0,
                    OrdenTrabajoID: 0,
                    //Disposicion: 0,
                    ClasificacionPNDID: 0,
                    SpoolID: 0,
                    JuntaSpool: 0,
                    ClasificacionManual: 0
                    //OrdenTrabajoID: 0,                                        
                };

                ListaCaptura[cont].RequisicionID = arregloCaptura[i].RequisicionID;
                ListaCaptura[cont].ElementoPorClasificacionPNDID = arregloCaptura[i].ElementoPorClasificacionPNDID;
                ListaCaptura[cont].Accion = arregloCaptura[i].Accion;                
                //ListaCaptura[cont].Disposicion = arregloCaptura[i].Disposicion;
                ListaCaptura[cont].OrdenTrabajoID = arregloCaptura[i].OrdenTrabajoID;
                ListaCaptura[cont].ClasificacionPNDID = arregloCaptura[i].ClasificacionPNDID;
                ListaCaptura[cont].SpoolID = arregloCaptura[i].SpoolID;
                ListaCaptura[cont].JuntaSpool = arregloCaptura[i].JuntaSpool;
                ListaCaptura[cont].ClasificacionManual = 0;
                //ListaCaptura[cont].ClasificacionManual = arregloCaptura[i].Clasificacion;
                cont++;

            } else if (arregloCaptura[i].Accion == 2 && !arregloCaptura[i].Agregar) {
                ListaCaptura[cont] = {
                    RequisicionID: 0,
                    ElementoPorClasificacionPNDID: 0,
                    Accion: 0,
                    OrdenTrabajoID: 0,
                    ClasificacionPNDID: 0,
                    SpoolID: 0,
                    JuntaSpool: 0,
                    ClasificacionManual: 0
                };
                //ListaCaptura[cont] = {
                //    RequisicionID: 0,
                //    ElementoPorClasificacionPNDID: 0,
                //    Accion: 0,
                //    Disposicion: 0,
                //    ClasificacionPNDID: 0,
                //    OrdenTrabajoID: 0,
                //    SpoolID: 0,
                //    JuntaSpool: 0
                //};

                ListaCaptura[cont].RequisicionID = arregloCaptura[i].RequisicionID;
                ListaCaptura[cont].ElementoPorClasificacionPNDID = arregloCaptura[i].ElementoPorClasificacionPNDID;
                ListaCaptura[cont].Accion = 3;                
                ListaCaptura[cont].OrdenTrabajoID = arregloCaptura[i].OrdenTrabajoID;
                ListaCaptura[cont].ClasificacionPNDID = arregloCaptura[i].ClasificacionPNDID;
                ListaCaptura[cont].SpoolID = arregloCaptura[i].SpoolID;
                ListaCaptura[cont].JuntaSpool = arregloCaptura[i].JuntaSpool;
                ListaCaptura[cont].ClasificacionManual = 0;
                //ListaCaptura[cont].ClasificacionManual = arregloCaptura[i].Clasificacion;
                cont++;
            } 
            
        }

        if (ListaCaptura.length > 0) {
            var Requisicion = $("#inputRequisicion").data("kendoComboBox").dataItem($("#inputRequisicion").data("kendoComboBox").select());
            Captura[0].RequisicionID = Requisicion.RequisicionID;
            Captura[0].Requisicion = Requisicion.NombreRequisicion;
            Captura[0].ProyectoID = $("#inputProyecto").data("kendoComboBox").value();
            Captura[0].TipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
            Captura[0].CodigoAsme = Requisicion.CodigoAsme;
            Captura[0].Observacion = Requisicion.Observacion;
            Captura[0].FechaRequisicion = Requisicion.FechaRequisicion;
            Captura[0].ListaDetalle = ListaCaptura;

            $EditarRequisicion.EditarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                    if (guardaNuevo) {
                        Limpiar();
                        displayNotify("MensajeGuardadoExistoso", "", "0");
                    } else {
                        AjaxCargaDetalleRequisicion(Captura[0].RequisicionID, Captura[0].TipoPruebaID, Captura[0].ProyectoID);
                        opcionHabilitarView(true, '');
                        displayNotify("MensajeGuardadoExistoso", "", "0");
                    }
                }
                else {
                    displayNotify("MensajeGuardadoErroneo", "", '2');
                }
            });
        } else {
            displayNotify("EditarRequisicionExcepcionGuardado", "", "2");
        }    
           
    } else {
        displayNotify("EditarRequisicionExcepcionGuardado", "", "2");
    }

}

function AjaxEliminaRequisicion(itemRequisicion) {
    var Requisicion = {
        RequisicionID: itemRequisicion.RequisicionID,
        TipoPruebaID : itemRequisicion.TipoPruebaID,
        ProyectoID : itemRequisicion.ProyectoID,
        NombreRequisicion: itemRequisicion.NombreRequisicion,
        CodigoAsme: itemRequisicion.CodigoAsme,
        FechaRequisicion: itemRequisicion.FechaRequisicion,
        Observacion: itemRequisicion.Observacion
    }

    $EditarRequisicion.EditarRequisicion.update( Requisicion, { token: Cookies.get("token")}).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                Limpiar();
                displayNotify("EditarRequisicionMensajeEliminadoCorrecto", "", "0");
        }
        else {
            displayNotify("MensajeGuardadoErroneo", "", '2');
        }
    });
}

function AjaxObtenerSpool() {
    loadingStart();
    $EditarRequisicion.EditarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), IdOrdenTrabajo: $("#InputOrdenTrabajo").val(), OrdenTrabajoSpoolID: $("#InputID").val(), TipoPruebaID: $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value(), ProyectoID: $("#inputProyecto").data("kendoComboBox").value() == "" ? 0 : $("#inputProyecto").data("kendoComboBox").value() }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (data.length > 0) {
            $("#InputID").data("kendoComboBox").value("");
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            //ds.page(1);
        }
        ds.sync();
        loadingStop();
    });
};

function AjaxObtenerJunta() {
    loadingStart();
    $EditarRequisicion.EditarRequisicion.read({ token: Cookies.get("token"), IdOrdenTrabajo: $("#InputOrdenTrabajo").val(), OrdenTrabajoSpoolID: $("#InputID").val(), TipoPruebaID: $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value(), ProyectoID: $("#inputProyecto").data("kendoComboBox").value() == "" ? 0 : $("#inputProyecto").data("kendoComboBox").value(), JuntaSpoolID: $("#Junta").val() }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (data.length > 0) {
            $("#Junta").data("kendoComboBox").value("");
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            //ds.page(1);
        }
        ds.sync();
        loadingStop();
    });
};

function AjaxJunta(spoolID) {
    loadingStart();
    $EditarRequisicion.EditarRequisicion.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        }
    });
};