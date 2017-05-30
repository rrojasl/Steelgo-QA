function AjaxObtenerOrdenesCompra() {
    loadingStart();

    $Dynasol.Dynasol.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            $("#inputOrdenCompra").data("kendoComboBox").setDataSource([]);
            $("#inputOrdenCompra").data("kendoComboBox").text("");
            $("#inputOrdenCompra").data("kendoComboBox").dataSource.data(data);

            if ($("#inputOrdenCompra").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputOrdenCompra").data("kendoComboBox").select(1);
                AjaxCargarRevision();
            }
            else {
                $("#inputOrdenCompra").data("kendoComboBox").select(0);
                loadingStop();
            }

        }

    });
}

function AjaxCargarRevision() {

    loadingStart();
    $Dynasol.Dynasol.read({ token: Cookies.get("token"), OrdenCompraID: $("#inputOrdenCompra").data("kendoComboBox").value() }).done(function (data) {
        if (Error(data)) {
            $("#grid").data("kendoGrid").dataSource.data([]);

            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
            if (data.length > 0) {
                ds.data(data);
            }
        }
        ds.sync();
        loadingStop();


    });
}



function AjaxEjecutarGuardado(Captura, tipoGuardar) {
    $Dynasol.Dynasol.create(Captura, { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                displayNotify("CapturaMensajeGuardadoExitoso", "", '0');

                if (tipoGuardar == 1) {
                    //editado = false;
                    Limpiar();
                    loadingStop();
                    AjaxCargarCamposPredeterminados();
                }
                else {
                    opcionHabilitarView(true, "FieldSetView");
                    loadingStop();
                    AjaxCambiarAccionAModificacion();
                }
            }
            else {
                loadingStop();
                displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
            }
        }
    });
}


function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    loadingStart();
    try {
        var bandera = true, banderaProcesoRaiz = true, banderaProcesoRelleno = true;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];

        for (index = 0; index < arregloCaptura.length; index++) {
            $("#grid").data("kendoGrid").dataSource._data[index].RowOk = true;
            ListaDetalles[index] = {
                Accion: "", RevisionID: "", Partida: "", Estatus: 1
            };

            var labelFecha = String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""));

            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].RevisionID = arregloCaptura[index].RevisionID;
            ListaDetalles[index].Partida = arregloCaptura[index].Partida;
            
            ListaDetalles[index].FechaSoldadura =
                kendo.toString(arregloCaptura[index].FechaSoldadura, labelFecha) == null ? "" :
                kendo.toString(arregloCaptura[index].FechaSoldadura, labelFecha).trim();

            //-----------------------------------Lista Coladas--------------------------------------------

            ListaTrabajosAdicionalesEditados = [];
            if (arregloCaptura[index].ListaDetalleTrabajoAdicional != undefined) {
                for (j = 0; j < arregloCaptura[index].ListaDetalleTrabajoAdicional.length; j++) {
                    ListaTrabajosAdicionalesEditados[j] = {Accion: "", RevisionID: "", Partida: ""}

                    if (arregloCaptura[index].ListaDetalleTrabajoAdicional[j].TrabajoAdicionalID == 0 || arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ObreroID == 0)
                        ListaTrabajosAdicionalesEditados[j].Accion = 0;
                    else
                        ListaTrabajosAdicionalesEditados[j].Accion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Accion;

                    ListaTrabajosAdicionalesEditados[j].JuntaID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].JuntaID;
                    ListaTrabajosAdicionalesEditados[j].SoldaduraTrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].SoldaduraTrabajoAdicionalID;
                    ListaTrabajosAdicionalesEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                    ListaTrabajosAdicionalesEditados[j].JuntaSpoolID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].JuntaSpoolID;
                    ListaTrabajosAdicionalesEditados[j].TrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].TrabajoAdicionalID;
                    ListaTrabajosAdicionalesEditados[j].TallerID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].TallerID
                    ListaTrabajosAdicionalesEditados[j].ObreroID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ObreroID;
                    ListaTrabajosAdicionalesEditados[j].Observacion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Observacion;
                }
            }


            //-----------------------------------Lista Inspeccion--------------------------------------------

            var listaSoldadoresFinal = arregloCaptura[index].ListaSoldadoresRaizCapturados;

            ListaSoldadoresEditados = [];

            for (j = 0; j < listaSoldadoresFinal.length; j++) {

                ListaSoldadoresEditados[j] = {
                    Accion: "", JuntaSpoolID: "",
                    JuntaSoldaduraSoldadoID: "", JuntaSoldaduraID: "",
                    EsRaiz: "", ObreroID: "", Comentario: "", ConsumibleID: ""
                };

                ListaSoldadoresEditados[j].Accion = listaSoldadoresFinal[j].Accion == undefined ? 1 : listaSoldadoresFinal[j].Accion;
                ListaSoldadoresEditados[j].JuntaSpoolID = arregloCaptura[index].JuntaID;
                ListaSoldadoresEditados[j].JuntaSoldaduraSoldadoID = listaSoldadoresFinal[j].JuntaSoldaduraSoldadoID == undefined ? 0 : listaSoldadoresFinal[j].JuntaSoldaduraSoldadoID;
                ListaSoldadoresEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID == undefined ? 0 : arregloCaptura[index].JuntaSoldaduraID;
                ListaSoldadoresEditados[j].EsRaiz = 1;
                ListaSoldadoresEditados[j].ObreroID = listaSoldadoresFinal[j].ObreroID;
                ListaSoldadoresEditados[j].Comentario = listaSoldadoresFinal[j].Observaciones == undefined ? "" : listaSoldadoresFinal[j].Observaciones;
                ListaSoldadoresEditados[j].ConsumibleID = listaSoldadoresFinal[j].ColadaID;

            }

            if (true) {
                ListaDetalles[index].Estatus = 0;
                $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
                $("#grid").data("kendoGrid").dataSource.sync();
                //$('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
            }

        }




        Captura[0].Detalles = ListaDetalles;






        ////        if (bandera) {
        if (!ExistRowEmpty(ListaDetalles)) {
            if (Captura[0].Detalles.length > 0) {
                AjaxEjecutarGuardado(Captura[0], tipoGuardar);
                
            }

        }
        else {
            loadingStop();
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceIntAcabadoMensajeErrorGuardado[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                actions: [],
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function () {
                loadingStart();

                ArregloGuardado = [];
                var indice = 0;
                for (var i = 0; i < Captura[0].Detalles.length; i++) {
                    if (Captura[0].Detalles[i].Estatus == 1) {
                        ArregloGuardado[indice] = ListaDetalles[i];
                        indice++;
                    }
                }

                Captura[0].Detalles = [];
                Captura[0].Detalles = ArregloGuardado;


                if (ArregloGuardado.length > 0) {
                    AjaxEjecutarGuardado(Captura[0], tipoGuardar);
                }
                else {
                    loadingStop();
                    displayNotify("AdverteciaExcepcionGuardado", "", '1');
                }

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });

        }

        loadingStop();
    } catch (e) {
        loadingStop();
        displayNotify("", e.message, '2');
    }

};