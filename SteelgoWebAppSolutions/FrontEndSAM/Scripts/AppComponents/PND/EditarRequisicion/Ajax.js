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
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID, estatusID: 1 }).done(function (data) {
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

function AjaxCargaDetalleRequisicion(requisicionID, tipoPruebaID, proyectoID) {
    $EditarRequisicion.EditarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: requisicionID, TipoPruebaID: tipoPruebaID, ProyectoID: proyectoID, Muestra: "todos" }).done(function (data) {
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

        for (var i = 0; i < arregloCaptura.length; i++) {

            ListaCaptura[i] = { RequisicionID: 0, ElementoPorClasificacionPNDID: 0, Accion: 0 };
            ListaCaptura[i].RequisicionID = arregloCaptura[i].RequisicionID;
            ListaCaptura[i].ElementoPorClasificacionPNDID = arregloCaptura[i].ElementoPorClasificacionPNDID;
            ListaCaptura[i].Accion = arregloCaptura[i].Accion;
            if (arregloCaptura[i].Accion == 2 && !arregloCaptura[i].Agregar) {

                    ListaCaptura[i].Accion = 3;
            }            
        }

        //if (ListaCaptura.length >= 0) {
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
        //}           
           
    } else {
        displayNotify("EditarRequisicionExcepcionGuardado", "", "2");
    }

}

function AjaxEliminaRequisicion(requisicionID) {
    $EditarRequisicion.EditarRequisicion.update({ token: Cookies.get("token"), RequisicionID: requisicionID }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                Limpiar();
                displayNotify("EditarRequisicionMensajeEliminadoCorrecto", "", "0");
        }
        else {
            displayNotify("MensajeGuardadoErroneo", "", '2');
        }
    });
}