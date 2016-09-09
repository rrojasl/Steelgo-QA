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

function AjaxCargaListaRequisicion(req, tipoPruebaID) {

    var proyectoID = $("#inputProyecto").data("kendoComboBox").value();

    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID, estatusID: 1 }).done(function (data) {
        $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
        $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);
        if (req != null)
        {
            $("#inputRequisicion").data("kendoComboBox").value(req);
            $("#inputRequisicion").data("kendoComboBox").trigger("change");
        } else {
            $("#inputRequisicion").data("kendoComboBox").value(0);
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
            $("#inputProyecto").data("kendoComboBox").value(proyectoId);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxCargaListaTipoPrueba() {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#inputTipoPrueba").data("kendoComboBox").dataSource.data([]);
        $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data);

        $("#inputTipoPrueba").data("kendoComboBox").value(0);
        $("#inputTipoPrueba").data("kendoComboBox").trigger('change');
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

        var cont = 0;
        for (var i = 0; i < arregloCaptura.length; i++) {
            if ((arregloCaptura[i].Accion == 2 && !arregloCaptura[i].Agregar)
                    || (arregloCaptura[i].Accion == 1 && arregloCaptura[i].Agregar)) {

                ListaCaptura[cont] = { RequisicionID: 0, ElementoPorClasificacionPNDID: 0, Accion: 0 };
                ListaCaptura[cont].RequisicionID = arregloCaptura[i].RequisicionID;
                ListaCaptura[cont].ElementoPorClasificacionPNDID = arregloCaptura[i].ElementoPorClasificacionPNDID;
                ListaCaptura[cont].Accion = arregloCaptura[i].Accion;
                if (arregloCaptura[i].Accion == 2) {
                    ListaCaptura[cont].Accion = 3;
                }
                cont;
            }
        }

        if (ListaCaptura.length >= 0) {
            Captura[0].RequisicionID = $("#inputRequisicion").data("kendoComboBox").value();
            Captura[0].Requisicion = $("#inputRequisicion").data("kendoComboBox").text();
            Captura[0].ProyectoID = $("#inputProyecto").data("kendoComboBox").value();
            Captura[0].TipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
            Captura[0].CodigoAsme = "ASME VIII Div 1 App 8";
            Captura[0].Observacion = "B";
            Captura[0].FechaRequisicion = "";
            Captura[0].ListaDetalle = ListaCaptura;
            displayNotify("", "Guardado exitoso", "0");
            //$EditarRequisicion.EditarRequisicion.create(Captura[0], { token: Cookies.get("token")}).done(function (data) {
                //if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                    //if (guardaNuevo) {
                        //limpiarPantalla();
                        //displayNotify("", "Guardado exitoso", "0");
                    //} else {
                        //AjaxGetListaElementos(Captura[0].Requisicion, Captura[0].TipoPruebaID, Captura[0].ProyectoID, "todos");
                        //opcionHabilitarView(true, '');
                        //displayNotify("", "Guardado exitoso", "0");
                    //}
                //}
                //else {
                //    mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                //    displayNotify("", mensaje, '1');
                //}
            //});
        }
            
           
    } else {
        displayNotify("","No hay datos por guardar","2");
    }

}