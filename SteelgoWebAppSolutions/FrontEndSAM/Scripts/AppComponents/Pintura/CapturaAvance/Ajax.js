﻿function AjaxCargarCamposPredeterminados() {

    loadingStart();

    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        var NewDate = kendo.toString(data.FechaShotblast, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDateShotblast.val(NewDate);
        var NewDate2 = kendo.toString(data.FechaPrimario, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDatePrimario.val(NewDate2);

        if (data.Llenado.toLowerCase() == "todos") {
            $('input#LlenaTodos').attr('checked', true).trigger("change");
        }
        else if (data.Llenado.toLowerCase() == "vacios") {
            $('input#LlenaVacios').attr('checked', true).trigger("change");
        }

       
        AjaxCargaMostrarPredeterminado();
    });

}

function AjaxCargaMostrarPredeterminado() {
    var TipoMuestraPredeterminadoID = 2048;
    
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }

        AjaxCargaMostrarPredeterminadoseleciconProcesosPintura();
    });
}

function AjaxCargaMostrarPredeterminadoseleciconProcesosPintura() {
    var TipoMuestraPredeterminadoID = 3075;
    var procesoid = 0;
    
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "shotblast") {

            $('input:radio[name=ProcesoPintura]:nth(0)').trigger("click");

        }
        else if (data == "primario") {
            $('input:radio[name=ProcesoPintura]:nth(1)').trigger("click");

        }
        else if (data == "intermedio") {
            $('input:radio[name=ProcesoPintura]:nth(2)').trigger("click");
        }
        else if (data == "acabado") {
            $('input:radio[name=ProcesoPintura]:nth(3)').trigger("click");
        }
        loadingStop();
    });
}

function AjaxCargarCuadrante(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var CuadranteId = 0;

        if (data.length > 0) {
            $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3 && CuadranteSpoolAnterior == 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CuadranteID != 0) {
                        CuadranteId = data[i].CuadranteID;
                    }
                }
            }
            else
                CuadranteId = currentDataItemGridDownload.CuadranteAnteriorID;

            $("#inputCuadrantePopup").data("kendoComboBox").value(CuadranteId);
            $("#inputCuadrantePopup").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxCargarCarrosCargadosPorProceso(idProceso) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), procesoID: idProceso }).done(function (data) {
        var medioTranporteId = 0;
        $("#inputCarro").data("kendoComboBox").dataSource.data([]);
        $("#inputCarro").data("kendoComboBox").dataSource.data(data);
        LimpiarDespuesCambioCarro();
        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].MedioTransporteID != 0) {
                    medioTranporteId = data[i].MedioTransporteID;
                }
            }
            $("#inputCarro").data("kendoComboBox").value(medioTranporteId);
            $("#inputCarro").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}

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

function AjaxCargarShotBlastero() {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"),procesoPintura: $('input:radio[name=ProcesoPintura]:checked').val() }).done(function (data) {
        if (Error(data)) {
            $("#inputShotBlastero").data("kendoMultiSelect").setDataSource(data);
        }
        loadingStop();
    });
}

function AjaxCargarOrdenTrabajo() {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        }
        loadingStop();
    });
}

function AjaxCargarLayoutGrid(sistemaPinturaProyectoId, procesoID, CargaCarroID) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), sistemaPinturaProyectoId: sistemaPinturaProyectoId, procesoID: procesoID, lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            ComponentesDinamicos = data[0];
            ReductorDinamico = data[1];
            CrearGrid();

            var grid = $("#grid").data("kendoGrid");
            var dataSource = grid.dataSource;
            var options = grid.options;


            ////////////////////

            options.dataSource = {
                    schema: {
                        model: {
                                fields: {
                                   
                                    Spool: { type: "string", editable: false },
                                    SistemaPintura: { type: "string", editable: false },
                                    Color: { type: "string", editable: false },
                                    Area: { type: "string", editable: false },
                                    Lote: { type: "string", editable: false },
                                    FechaShotblast: { type: "date", editable: true }
                                   
                                }
                        }
                    },
                filter: {
                    logic: "or",
                    filters: [
                          { field: "Accion", operator: "eq", value: 1 },
                          { field: "Accion", operator: "eq", value: 2 },
                          { field: "Accion", operator: "eq", value: 4 },
                          { field: "Accion", operator: "eq", value: 0 },
                          { field: "Accion", operator: "eq", value: undefined }
                    ]
                },
                pageSize: 10,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            };

            options.autoBind = true;
            options.pageSize = 10
            options.serverPaging = false,
            options.serverFiltering = false,
            options.serverSorting = false

            options.navigatable = true,
            options.filterable = getGridFilterableMaftec(),
            options.editable = true,
            options.autoHeight = true,
            options.sortable = true,
            options.scrollable = true,
            options.pageable = {
                refresh: false,
                pageSizes: [10, 25, 50, 100],
                info: false,
                input: false,
                numeric: true,
            };
            ///////////////////

            options.columns = $("#grid").data("kendoGrid").columns;

            options.columns.push({ field: "Spool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" });
            options.columns.push({ field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "160px" });
            options.columns.push({ field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" });
            options.columns.push({ field: "Area", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" }, width: "80px" });
            options.columns.push({ field: "Lote", title: _dictionary.columnLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" }, width: "80px" });
            options.columns.push({ field: "FechaProceso", title: _dictionary.columnFechaShotblast[$("#language").data("kendoDropDownList").value()], type: "date", filterable: { cell: { showOperators: false } }, editor: RenderDatePicker, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "160px" });
            options.columns.push({ field: "ListaObrerosSeleccionados", title: _dictionary.columnShotblastero[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RendercomboBoxShotBlastero, template: "#:plantillaObrero#", width: "280px" });

            for (var i = 0; i < data[0].length; i++) {
                options.columns.push({ field: data[0][i].NombreComponente, title: data[0][i].NombreComponente, filterable: getGridFilterableCellMaftec(), editor: renderComboboxComponenteDinamico, width: "140px" });
            }

            for (var i = 0; i < data[1].length; i++) {
                options.columns.push({ field: data[1][i].NombreReductor, title: data[1][i].NombreReductor, filterable: getGridFilterableCellMaftec(), editor: RendercomboReductor, width: "140px" });
            }


            options.columns.push({ command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: VentanaModalDescargarSpool }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "60px", attributes: { style: "text-align:center;" } });
            options.columns.push({ command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarFila }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" });


            grid.destroy();
            $("#grid").kendoGrid(options);

            CustomisaGrid($("#grid"));
            AjaxCargarSpool(CargaCarroID, sistemaPinturaProyectoId, procesoID);
        }
    });
}

function AjaxCargarSpool(medioTransporteCargaID, sistemaPinturaProyectoID, procesopinturaID) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), medioTransporteCargaID: medioTransporteCargaID, lenguaje: $("#language").val(), sistemaPinturaProyectoID: sistemaPinturaProyectoID, procesopinturaID: procesopinturaID }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        //var array = JSON.parse('[{"CargaCarroID":"3","SpoolID":"41704","Spool":"X002-005","plantillaObrero":"xd"}]');
        var array = JSON.parse(data);


        for (var i = 0; i < array.length; i++) {
            //if (array[i].ListaShotblasteroGuargado.length > 0) {
            //    array[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + array[i].ListaShotblasteroGuargado.length;
            //}
            //else {
            //    array[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastNoExistentes[$("#language").data("kendoDropDownList").value()];
            //}
            if (array[i].FechaProceso != null) {
                array[i].FechaProceso = new Date(ObtenerDato(array[i].FechaProceso, 1), ObtenerDato(array[i].FechaProceso, 2), ObtenerDato(array[i].FechaProceso, 3));//año, mes, dia
            }

            ds.add(array[i]);
        }
        if (array.length > 0)
            editado = true;

        ds.sync();
        loadingStop();
    });
}
 
function AjaxAgregarSpool(ordenTrabajoSpoolID) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), OrdenTrabajoSpoolID: ordenTrabajoSpoolID, lenguaje: $("#language").val(), procesoPinturaID: $('input:radio[name=ProcesoPintura]:checked').val() }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        //var carroID = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID;
        var sistemaPinturaProyectoID = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).SistemaPinturaProyectoID;
        var array = data;
        var elementosNoModificados = "";
        var elementosModificados = "";
        for (var i = 0; i < array.length; i++) {
            if (array[i].Banderastatus == "") {
                if (!existeSpool(array[i].Spool, ds)) {
                    if (sistemaPinturaProyectoID == array[i].SistemaPinturaProyectoID) {
                        if (array[i].CarroID == 0) {
                            ds.add(array[i]);
                            if (elementosModificados != "")
                                elementosModificados += ", " + array[i].Spool;
                            else
                                elementosModificados = array[i].Spool;
                        }
                        else
                            displayNotify("", _dictionary.PinturaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()].replace('?', array[i].Cuadrante), '1');
                    }
                    else {
                        displayNotify("PinturaSpoolSistemaPinturaNoCoincide", "", '1');
                    }
                }
                else {
                    if (elementosNoModificados != "")
                        elementosNoModificados += ", " + array[i].Spool;
                    else
                        elementosNoModificados = array[i].Spool;
                }
            }
            else
                displayNotify("", array[i].Banderastatus, '1');
        }

        if (elementosModificados != "") {
            displayNotify("", _dictionary.SpoolAgregado[$("#language").data("kendoDropDownList").value()] +
               elementosModificados + _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');
            editado = true;
            $("#inputCodigo").val("");
        }

        if (elementosNoModificados != "") {
            displayNotify("", _dictionary.SpoolAgregado[$("#language").data("kendoDropDownList").value()] +
                elementosNoModificados + _dictionary.CapturaArmadoMsgExisteReporte[$("#language").data("kendoDropDownList").value()], '1');
        }

        loadingStop();
    });
}

function existeSpool(spool, array) {
    for (var index = 0; index < array._data.length; index++) {
        if (array._data[index].Spool == spool) {
            return true;
        }
    }
    return false;
}

function AjaxGuardarAvanceCarro(arregloCaptura, guardarYNuevo) {
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    
   

    for (var index = 0 ; index < arregloCaptura.length; index++) {
        $("#grid").data("kendoGrid").dataSource._data[index].RowOk = true;
        ListaDetalles[index] = { Accion: "", SpoolID: "", ProcesoPinturaID: 0, FechaProceso: "", SistemaPinturaID:"", Reductor: 0, ReductorLote: "", ListaObrerosSeleccionados: [], ListaComponentesDinamicos: [], Estatus: 1 };
        ListaDetalles[index].Accion = arregloCaptura[index].Accion;
        ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
        ListaDetalles[index].ProcesoPinturaID = $('input:radio[name=ProcesoPintura]:checked').val();
        ListaDetalles[index].FechaProceso = arregloCaptura[index].FechaProceso == null ? "" : kendo.toString(arregloCaptura[index].FechaProceso, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
        ListaDetalles[index].SistemaPinturaID = arregloCaptura[index].SistemaPinturaID;
        ListaDetalles[index].Reductor = ReductorDinamico[0].NombreReductor;
        ListaDetalles[index].ReductorLote = arregloCaptura[index][ReductorDinamico[0].NombreReductor];

        if (ListaDetalles[index].FechaProceso == "")
        {
            ListaDetalles[index].Estatus = 0;
            $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
        }

        if (ListaDetalles[index].ReductorLote == "" || ListaDetalles[index].ReductorLote == undefined || ListaDetalles[index].ReductorLote == null) {
            $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
            ListaDetalles[index].Estatus = 0;
        }

        var ListaDetallesObrerosSeleccionados = [];
        for (var j = 0 ; j < arregloCaptura[index].ListaObrerosSeleccionados.length; j++) {
            ListaDetallesObrerosSeleccionados[j] = { Accion: "", SpoolID: "", ObreroId: 0, ProcesoPinturaID: 0 };
            ListaDetallesObrerosSeleccionados[j].Accion = arregloCaptura[index].ListaObrerosSeleccionados[j].Accion;
            ListaDetallesObrerosSeleccionados[j].SpoolID = arregloCaptura[index].SpoolID;
            ListaDetallesObrerosSeleccionados[j].ObreroId = arregloCaptura[index].ListaObrerosSeleccionados[j].ObreroID;
            ListaDetallesObrerosSeleccionados[j].ProcesoPinturaID = $('input:radio[name=ProcesoPintura]:checked').val();
        }

        
        var existeObrero = false;
        var posicionSiguiente = arregloCaptura[index].ListaObrerosSeleccionados.length;
        var elementoEliminado = 0;

        for (var k = 0 ; k < arregloCaptura[index].ListaObrerosGuargados.length; k++) {
            for (var j = 0 ; j < arregloCaptura[index].ListaObrerosSeleccionados.length; j++) {
                if (arregloCaptura[index].ListaObrerosGuargados[k].ObreroID == arregloCaptura[index].ListaObrerosSeleccionados[j].ObreroID && arregloCaptura[index].ListaObrerosGuargados[k].SpoolID == arregloCaptura[index].ListaObrerosSeleccionados[k].SpoolID && arregloCaptura[index].ListaObrerosGuargados[k].ProcesoPinturaID == arregloCaptura[index].ListaObrerosSeleccionados[k].ProcesoPinturaID) {
                    existeObrero = true;
                }
            }
            if (!existeObrero)
            {
                ListaDetallesObrerosSeleccionados[posicionSiguiente + elementoEliminado] = { Accion: "", SpoolID: "", ObreroId: 0, ProcesoPinturaID: 0 };
                ListaDetallesObrerosSeleccionados[posicionSiguiente + elementoEliminado].Accion = 3;// se pone tres porque ya se borra.
                ListaDetallesObrerosSeleccionados[posicionSiguiente + elementoEliminado].SpoolID = arregloCaptura[index].SpoolID;
                ListaDetallesObrerosSeleccionados[posicionSiguiente + elementoEliminado].ObreroId = arregloCaptura[index].ListaObrerosGuargados[k].ObreroID;
                ListaDetallesObrerosSeleccionados[posicionSiguiente + elementoEliminado].ProcesoPinturaID = $('input:radio[name=ProcesoPintura]:checked').val();
                elementoEliminado++;
            }
            else {
                existeObrero = false;
            }
        }

        ListaDetalles[index].ListaObrerosSeleccionados = ListaDetallesObrerosSeleccionados;

        if (ListaDetallesObrerosSeleccionados.length == 0) {
            $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
            ListaDetalles[index].Estatus = 0;
        }

        var ListaDetalleComponentesDinamicos = [];
        for (var k = 0; k < ComponentesDinamicos.length; k++) {
            ListaDetalleComponentesDinamicos[k] = { Accion: "", SpoolID: "", Componente: "", Lote: "", ProcesoPinturaID: 0 };
            ListaDetalleComponentesDinamicos[k].Accion = arregloCaptura[index].Accion;
            ListaDetalleComponentesDinamicos[k].SpoolID = arregloCaptura[index].SpoolID;
            ListaDetalleComponentesDinamicos[k].Componente = ComponentesDinamicos[k].NombreComponente; //arregloCaptura[index][ComponentesDinamicos[k]]
            ListaDetalleComponentesDinamicos[k].Lote = arregloCaptura[index][ComponentesDinamicos[k].NombreComponente];
            ListaDetalleComponentesDinamicos[k].ProcesoPinturaID = $('input:radio[name=ProcesoPintura]:checked').val();

            if (ListaDetalleComponentesDinamicos[k].Lote == "" || ListaDetalleComponentesDinamicos[k].Lote == undefined || ListaDetalleComponentesDinamicos[k].Lote == null) {
                $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
                ListaDetalles[index].Estatus = 0;
            }
        }
        ListaDetalles[index].ListaComponentesDinamicos = ListaDetalleComponentesDinamicos;
    }
    Captura[0].Detalles = ListaDetalles;

    if (!ExistRowEmpty(ListaDetalles)) {
        if (Captura[0].Detalles.length > 0) {
            AjaxEjecutarGuardado(Captura[0], guardarYNuevo);
        }
        else {
            loadingStop();
        }
    }
    else {
        loadingStop();
        $("#grid").data("kendoGrid").dataSource.sync();
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.TituloPopUpError[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            actions: [],
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.MensajeConfirmacionGuardadoGeneral[$("#language").data("kendoDropDownList").value()] +
            "</br><center><button class='btn btn-blue' id='yesButton'>" + _dictionary.EntregaPlacasGraficasbotonSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButton'>" + _dictionary.EntregaPlacasGraficasbotonNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

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

            if (Captura[0].Detalles.length > 0) {

                AjaxEjecutarGuardado(Captura[0], guardarYNuevo);
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

   

};

function AjaxEjecutarGuardado(data, guardarYNuevo)
{
    $CapturaAvance.CapturaAvance.create(data, { token: Cookies.get("token"), lenguaje: $("#language").val(), cargaCarroID: $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteCargaID }).done(function (data) {

        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            displayNotify("MensajeGuardadoExistoso", "", '0');


            if (guardarYNuevo == 1) {
                opcionHabilitarView(false, "FieldSetView");
                Limpiar();
                AjaxCargarCamposPredeterminados();
                editado = false;
            }
            else {
                opcionHabilitarView(true, "FieldSetView");
                var dataItem = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
                AjaxCargarLayoutGrid(dataItem.SistemaPinturaProyectoID, $('input:radio[name=ProcesoPintura]:checked').val(), dataItem.MedioTransporteCargaID);
            }
            loadingStop();
        }
        else {
            //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
            displayNotify("MensajeGuardadoErroneo", "", '2');
            loadingStop();

        }
    });
}

function removerRepetidos(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}

function AjaxDescargarSpool(dataItem, Cuadrante) {
    loadingStart();
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var elemento = 0;
    $PinturaGeneral.PinturaGeneral.read({ token: Cookies.get("token"), CarroID: $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, SpoolID: dataItem.SpoolID, CuadranteID: Cuadrante.CuadranteID, CuadranteSam2ID: Cuadrante.CuadranteSam2ID, CuadranteAnterior: dataItem.CuadranteID }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), '');
            displayNotify("EmbarqueCargaMsjDescargaSpoolExito", "", "0");
        } else {
            displayNotify("EmbarqueCargaMsjDescargaSpoolError", "", "2");
        }
        loadingStop();
    });
}

function AjaxGetLotesComponente(container, options) {
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        var datos = null;

        $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), componente: options.field, lenguaje: $("#language").val(), tipoConsulta: 0 }).done(function (data) {

            $('<input  data-text-field="NombreLote" id=' + options.model.uid + ' data-value-field="NombreLote" data-bind="value:' + options.field + '"/>')
          .appendTo(container)
          .kendoComboBox({
              dataTextField: "NombreLote",
              dataValueField: "NombreLote",
              dataSource: data,
              suggest: true,
              filter: "contains",
              change: function (e) {
                  dataItem = this.dataItem(e.sender.selectedIndex);
                  if (dataItem != undefined && dataItem.NombreLote != "") {
                      options.model[options.field] = dataItem.NombreLote
                  }
                  // $("#grid").data("kendoGrid").dataSource.sync();
              }
          });

            $(".k-combobox").on('mouseleave', function (send) {
                var e = $.Event("keydown", { keyCode: 27 });
                var item = this;
                if (!tieneClase(item)) {
                    $(container).trigger(e);
                }
            });

            //loadingStop();
        });
    }
}

function AjaxGetLotesReductor(container, options) {
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        var datos = null;

        var datos = null;

        $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), componente: options.field, lenguaje: $("#language").val(), tipoConsulta: 1 }).done(function (data) {

            $('<input  data-text-field="NombreLote" id=' + options.model.uid + ' data-value-field="NombreLote" data-bind="value:' + options.field + '"/>')
         .appendTo(container)
         .kendoComboBox({
             dataTextField: "NombreLote",
             dataValueField: "NombreLote",
             dataSource: data,
             suggest: true,
             filter: "contains",
             change: function (e) {
                 dataItem = this.dataItem(e.sender.selectedIndex);
                 if (dataItem != undefined && dataItem.NombreLote != "") {
                     options.model[options.field] = dataItem.NombreLote;
                 }
             }
         });

            $(".k-combobox").on('mouseleave', function (send) {
                var e = $.Event("keydown", { keyCode: 27 });
                var item = this;
                if (!tieneClase(item)) {
                    $(container).trigger(e);
                }
            });


        });

    }
}

function AjaxCargarZona(patioID) {
    loadingStart();
    $Zona.Zona.read({ token: Cookies.get("token") }).done(function (data) {
        var ZonaId = 0;
        if (data.length > 0) {
            $("#inputZonaPopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ZonaID != 0) {
                        ZonaId = data[i].ZonaID;
                    }
                }
            }
            $("#inputZonaPopup").data("kendoComboBox").value(currentDataItemGridDownload.ZonaAnteriorID);
            $("#inputZonaPopup").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}
