function AjaxCargarCamposPredeterminados() {

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

        loadingStop();
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
    var TipoMuestraPredeterminadoID = 4074;
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

    });
}

function AjaxCargarCuadrante(area) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#inputCuadrante").data("kendoComboBox").value("");
        $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarCarrosCargadosPorProceso(idProceso) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), procesoID: idProceso }).done(function (data) {
        var medioTranporteId = 0;
        $("#inputCarro").data("kendoComboBox").dataSource.data([]);
        $("#inputCarro").data("kendoComboBox").dataSource.data(data);
        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].MedioTransporteID != 0) {
                    medioTranporteId = data[i].MedioTransporteID;
                }
            }
            $("#inputCarro").data("kendoComboBox").value(medioTranporteId);
            $("#inputCarro").data("kendoComboBox").trigger("change");
            $("#btnMostrar").trigger("click");
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
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), tipo: 2, tipoObrero: "ShotBlastero" }).done(function (data) {
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
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), sistemaPinturaProyectoId: sistemaPinturaProyectoId, procesoID: procesoID, lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {

            $("#grid").kendoGrid({
                dataSource: []
            });

            var grid = $("#grid").data("kendoGrid");
            var dataSource = grid.dataSource;
            var options = grid.options;


            ////////////////////
            options.edit = function (e) {
                var inputName = e.container.find('input');
                inputName.select();

                if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

                }
                else {
                    this.closeCell();
                }

            };

            options.autoBind = true;

            options.filter = {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            };
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

            options.columns.push({ field: "Spool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() });
            options.columns.push({ field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() });
            options.columns.push({ field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() });
            options.columns.push({ field: "Metros2", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } });
            options.columns.push({ field: "Lote", title: _dictionary.columnLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } });
            options.columns.push({ field: "FechaShotblast", title: _dictionary.columnFechaShotblast[$("#language").data("kendoDropDownList").value()], type: "date", filterable: getKendoGridFilterableDateMaftec(), format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] });
            options.columns.push({ field: "ListaShotblasteroGuargado", title: _dictionary.columnShotblastero[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RendercomboBoxShotBlastero, template: "#:plantillaShotblastero#", width: "25%" });


            for (var i = 0; i < data.length; i++) {
                options.columns.push({ field: data[i].NombreComponente, title: data[i].NombreComponente, filterable: getGridFilterableCellMaftec(), width: "120px" });
            }

            options.columns.push({ command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "60px", attributes: { style: "text-align:center;" } });
            options.columns.push({ command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: VentanaModalDescargarMedioTransporte }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" });


            grid.destroy();
            $("#grid").kendoGrid(options);

            CustomisaGrid($("#grid"));
            AjaxCargarSpool(CargaCarroID);
        }
    });
}

function AjaxCargarSpool(medioTransporteCargaID) {
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), medioTransporteCargaID: medioTransporteCargaID, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;

        for (var i = 0; i < array.length; i++) {
            if (array[i].ListaShotblasteroGuargado.length > 0) {
                array[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + array[i].ListaShotblasteroGuargado.length;
            }
            else {
                array[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastNoExistentes[$("#language").data("kendoDropDownList").value()];
            }
            ds.add(array[i]);
        }

        ds.sync();
        loadingStop();
    });
}

function ajaxAgregarSpool() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array2 = [{
        RowOk: true,
        Accion: 2,
        Spool: "X002-006",
        SistemaPintura: "A4",
        Color: "ALUMINIO",
        Metros2: 4.12,
        Lote: '',
        Peso: 300.40,
        FechaShotblast: '',
        FechaPrimario: '',
        plantillaShotblastero: "",
        ListaShotblasteros: [{ Codigo: "T-523 - Raul Saldaña", ObreroID: "1" }, { Codigo: "T-133 Gabriela B.", ObreroID: "1" }],
        ListaShotblasteroGuargado: [],

        ListaPintores: [{ Codigo1: "T-239 - Josue Gonzales", ObreroID1: "1" }, { Codigo1: "T-001 Tomas Edison", ObreroID1: "1" }],
        ListaPintorGuargado: [],
        plantillaPintor: ''
    }];
    ds.insert(0, array2[0]);
    $("#grid").data("kendoGrid").dataSource.sync();

}

function AjaxAgregarSpool(ordenTrabajoSpoolID) {
    loadingStart();

    CapturaNuevo = [];
    CapturaNuevo[0] = { ListaPintorGuargado: "", ListaShotblasteroGuargado: "" };
    ListaPintorGuargado = [];
    ListaShotblasteroGuargado = [];

    var dataPintor = $("#inputPintor").data("kendoMultiSelect")._dataItems;
    for (var i = 0; i < dataPintor.length; i++) {
        ListaPintorGuargado[i] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaPintorGuargado[i].Accion = 1;
        ListaPintorGuargado[i].PinturaSpoolObreroID = dataPintor[i].PinturaSpoolObreroID;
        ListaPintorGuargado[i].ObreroID = dataPintor[i].ObreroID;
        ListaPintorGuargado[i].Codigo = dataPintor[i].Codigo;
    }
    if (dataPintor.length == 0) {
        ListaPintorGuargado[0] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaPintorGuargado[0].Accion = 1;
        ListaPintorGuargado[0].PinturaSpoolObreroID = 0;
        ListaPintorGuargado[0].ObreroID = 0;
        ListaPintorGuargado[0].Codigo = "";
    }

    var dataShotBlast = $("#inputShotBlastero").data("kendoMultiSelect")._dataItems;
    for (var i = 0; i < dataShotBlast.length; i++) {
        ListaShotblasteroGuargado[i] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaShotblasteroGuargado[i].Accion = 1;
        ListaShotblasteroGuargado[i].PinturaSpoolObreroID = dataShotBlast[i].PinturaSpoolObreroID;
        ListaShotblasteroGuargado[i].ObreroID = dataShotBlast[i].ObreroID;
        ListaShotblasteroGuargado[i].Codigo = dataShotBlast[i].Codigo;
    }

    if (dataShotBlast.length == 0) {
        ListaShotblasteroGuargado[0] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaShotblasteroGuargado[i].Accion = 1;
        ListaShotblasteroGuargado[0].PinturaSpoolObreroID = 0;
        ListaShotblasteroGuargado[0].ObreroID = 0;
        ListaShotblasteroGuargado[0].Codigo = "";
    }


    CapturaNuevo[0].ListaPintorGuargado = ListaPintorGuargado;
    CapturaNuevo[0].ListaShotblasteroGuargado = ListaShotblasteroGuargado;

    $CapturaAvance.CapturaAvance.create(CapturaNuevo[0], { token: Cookies.get("token"), OrdenTrabajoSpoolID: ordenTrabajoSpoolID, lenguaje: $("#language").val() }).done(function (data) {

        var ds = $("#grid").data("kendoGrid").dataSource;

        var array = data;
        for (var i = 0; i < array.length; i++) {
            if (!existeSpool(array[i].Spool, ds)) {

                ds.add(array[i]);
            }

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

//function AjaxGuardarCarro(arregloCaptura, guardarYNuevo) {
//    Captura = [];
//    Captura[0] = { listaDetalleSpool: "" };
//    listaDetalleSpool = [];


//    var contIndice = 0;
//    for (index = 0; index < arregloCaptura.length; index++) {

//        listaDetalleSpool[contIndice] = {
//            Accion: "",
//            SpoolID: "",
//            PinturaSpoolID: "",
//            PasoID: "",
//            SistemaPinturaID: "",
//            ColorPinturaID: "",
//            LotePinturaID: "",
//            PinturaComponenteComposicionID: "",
//            Fecha: "",
//            ListaObreros: ""
//        };

//        //-------------------------------------------Primario--------------------------------------------------------------------------
//        var listaPintorNueva = [];
//        var listaPintorInicial = [];
//        listaPintorNueva = arregloCaptura[index].ListaPintorGuargado;
//        listaPintorInicial = arregloCaptura[index].ListaPintorInicial;

//        var listaFinalPintor = [];
//        var guardarPrimario = [];


//        for (var i = 0; i < listaPintorInicial.length; i++) {
//            var bandera = false;
//            for (var j = 0 ; j < listaPintorNueva.length ; j++) {
//                if (listaPintorInicial[i].ObreroID == listaPintorNueva[j].ObreroID) {
//                    listaFinalPintor.push(listaPintorInicial[i]);
//                    bandera = true;
//                }
//                if ((listaPintorNueva.length - 1) == j && bandera == false) {
//                    listaPintorInicial[i].Accion = 3;
//                    listaFinalPintor.push(listaPintorInicial[i]);
//                }
//            }
//        }

//        if (listaPintorInicial.length == 0) {
//            listaFinalPintor = listaPintorNueva;
//        }
//        else {
//            for (var i = 0; i < listaPintorNueva.length; i++) {
//                var bandera = false;
//                for (var j = 0 ; j < listaPintorInicial.length ; j++) {
//                    if (listaPintorNueva[i].ObreroID != listaPintorInicial[j].ObreroID) {
//                        bandera = true;
//                    }
//                    if ((listaPintorInicial.length - 1) == j && bandera == true && listaPintorNueva[i].Accion == 1) {
//                        listaFinalPintor.push(listaPintorNueva[i]);
//                    }

//                }
//            }
//        }




//        if (listaFinalPintor.length > 0) {



//            for (var i = 0; i < listaFinalPintor.length; i++) {
//                guardarPrimario[i] = {
//                    Accion: "",
//                    SpoolID: "",
//                    PasoID: "",
//                    PinturaSpoolID: "",
//                    PinturaSpoolObreroID: "",
//                    ObreroID: ""
//                }

//                guardarPrimario[i].Accion = listaFinalPintor[i].Accion;
//                guardarPrimario[i].SpoolID = arregloCaptura[index].SpoolID;
//                guardarPrimario[i].PasoID = 2;
//                guardarPrimario[i].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotPrimario;
//                guardarPrimario[i].PinturaSpoolObreroID = listaFinalPintor[i].PinturaSpoolObreroID;
//                guardarPrimario[i].ObreroID = listaFinalPintor[i].ObreroID;
//            }

//        }
//        else {
//            guardarPrimario[0] = {
//                Accion: "",
//                SpoolID: "",
//                PasoID: "",
//                PinturaSpoolID: "",
//                PinturaSpoolObreroID: "",
//                ObreroID: ""
//            }

//            guardarPrimario[0].Accion = 0;
//            guardarPrimario[0].SpoolID = 0;
//            guardarPrimario[0].PasoID = 0;
//            guardarPrimario[0].PinturaSpoolID = 0;
//            guardarPrimario[0].PinturaSpoolObreroID = 0;
//            guardarPrimario[0].ObreroID = 0;
//        }

//        /*------------------------------------------------ShotBlast---------------------------------------------------------------------*/

//        var listaShotBlastNueva = arregloCaptura[index].ListaShotblasteroGuargado;
//        var listaShotBlastInicial = arregloCaptura[index].ListaShotblasteroInicial;
//        var listaFinalShotBlast = [];
//        var guardarShotblast = [];


//        for (var i = 0; i < listaShotBlastInicial.length; i++) {
//            var bandera = false;
//            for (var j = 0 ; j < listaShotBlastNueva.length ; j++) {
//                if (listaShotBlastInicial[i].ObreroID == listaShotBlastNueva[j].ObreroID) {
//                    listaFinalShotBlast.push(listaShotBlastInicial[i]);
//                    bandera = true;
//                }
//                if ((listaShotBlastNueva.length - 1) == j && bandera == false) {
//                    listaShotBlastInicial[i].Accion = 3;
//                    listaFinalShotBlast.push(listaShotBlastInicial[i]);
//                }
//            }
//        }

//        if (listaShotBlastInicial.length == 0) {
//            listaFinalShotBlast = listaShotBlastNueva;
//        }
//        else {
//            for (var i = 0; i < listaShotBlastNueva.length; i++) {
//                var bandera = false;
//                for (var j = 0 ; j < listaShotBlastInicial.length ; j++) {
//                    if (listaShotBlastNueva[i].ObreroID != listaShotBlastInicial[j].ObreroID) {
//                        bandera = true;
//                    }
//                    if ((listaShotBlastInicial.length - 1) == j && bandera == true && listaShotBlastNueva[i].Accion == 1) {
//                        listaFinalShotBlast.push(listaShotBlastNueva[i]);
//                    }

//                }
//            }
//        }



//        if (listaFinalShotBlast.length > 0) {


//            for (var i = 0; i < listaFinalShotBlast.length; i++) {
//                guardarShotblast[i] = {
//                    Accion: "",
//                    SpoolID: "",
//                    PasoID: "",
//                    PinturaSpoolID: "",
//                    PinturaSpoolObreroID: "",
//                    ObreroID: ""
//                }

//                guardarShotblast[i].Accion = listaFinalShotBlast[i].Accion;
//                guardarShotblast[i].SpoolID = arregloCaptura[index].SpoolID;
//                guardarShotblast[i].PasoID = 1;
//                guardarShotblast[i].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotblastero;
//                guardarShotblast[i].PinturaSpoolObreroID = listaFinalShotBlast[i].PinturaSpoolObreroID;
//                guardarShotblast[i].ObreroID = listaFinalShotBlast[i].ObreroID;

//            }



//        }
//        else {
//            guardarShotblast[0] = {
//                Accion: "",
//                SpoolID: "",
//                PasoID: "",
//                PinturaSpoolID: "",
//                PinturaSpoolObreroID: "",
//                ObreroID: ""
//            }

//            guardarShotblast[0].Accion = 0;
//            guardarShotblast[0].SpoolID = 0;
//            guardarShotblast[0].PasoID = 1;
//            guardarShotblast[0].PinturaSpoolID = 0;
//            guardarShotblast[0].PinturaSpoolObreroID = 0;
//            guardarShotblast[0].ObreroID = 0;

//        }
//        //---------------------------------------------------------------------------------------------------------------------        


//        listaDetalleSpool[contIndice].Accion = arregloCaptura[index].Accion;
//        listaDetalleSpool[contIndice].SpoolID = arregloCaptura[index].SpoolID;
//        listaDetalleSpool[contIndice].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotblastero;
//        listaDetalleSpool[contIndice].PasoID = 1;
//        listaDetalleSpool[contIndice].SistemaPinturaID = arregloCaptura[index].SistemaPinturaID;
//        listaDetalleSpool[contIndice].ColorPinturaID = arregloCaptura[index].ColorPinturaID;
//        listaDetalleSpool[contIndice].LotePinturaID = 0;
//        listaDetalleSpool[contIndice].PinturaComponenteComposicionID = 1;

//        if (arregloCaptura[index].FechaShotblast != null) {
//            listaDetalleSpool[contIndice].Fecha = kendo.toString(arregloCaptura[index].FechaShotblast,
//                String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim(" ", '')
//        }
//        listaDetalleSpool[contIndice].ListaObreros = guardarShotblast;
//        contIndice++;


//        listaDetalleSpool[contIndice] = {
//            Accion: "",
//            SpoolID: "",
//            PinturaSpoolID: "",
//            PasoID: "",
//            SistemaPinturaID: "",
//            ColorPinturaID: "",
//            LotePinturaID: "",
//            PinturaComponenteComposicionID: "",
//            Fecha: "",
//            ListaObreros: ""
//        };

//        listaDetalleSpool[contIndice].Accion = arregloCaptura[index].Accion;
//        listaDetalleSpool[contIndice].SpoolID = arregloCaptura[index].SpoolID;
//        listaDetalleSpool[contIndice].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotPrimario;
//        listaDetalleSpool[contIndice].PasoID = 2;
//        listaDetalleSpool[contIndice].SistemaPinturaID = arregloCaptura[index].SistemaPinturaID;
//        listaDetalleSpool[contIndice].ColorPinturaID = arregloCaptura[index].ColorPinturaID;
//        listaDetalleSpool[contIndice].LotePinturaID = 0;
//        listaDetalleSpool[contIndice].PinturaComponenteComposicionID = 0;

//        if (arregloCaptura[index].FechaPrimario != null) {
//            listaDetalleSpool[contIndice].Fecha = kendo.toString(arregloCaptura[index].FechaPrimario,
//                String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim(" ", '')
//        }
//        listaDetalleSpool[contIndice].ListaObreros = guardarPrimario;
//        contIndice++;

//    }

//    Captura[0].listaDetalleSpool = listaDetalleSpool;

//    loadingStart();
//    $CapturaAvance.CapturaAvance.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteCargaID: $("#inputCarro").data("kendoComboBox").value() }).done(function (data) {
//        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
//            AjaxCargarSpool($("#inputCarro").data("kendoComboBox").value());

//            if (!guardarYNuevo) {
//                opcionHabilitarView(true, "FieldSetView");
//            }


//            displayNotify("CapturaAvanceGuardadoCorrecto", "", "0");
//        }
//        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
//            displayNotify("CapturaMensajeGuardadoErroneo", "", '1');
//            opcionHabilitarView(false, "FieldSetView");
//        }
//        loadingStop();
//    });
//}
function AjaxGuardarCarro(arregloCaptura, guardarYNuevo) {
    loadingStart();
    displayNotify("", "se guardo correctamente la informacion", '0');
    opcionHabilitarView(true, "FieldSetView");

    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        $("#grid").data("kendoGrid").dataSource._data[i].Lote = "LT-455";
    }

    $("#grid").data('kendoGrid').dataSource.sync();
    loadingStop();
};

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

function ajaxAplicarDescarga(arregloCaptura) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var index = 0;
        ListaDetalles[index] = { SpoolID: "", Accion: "", medioTransporteID: "", MedioTransporteCargaID: "", CuadranteID: "" };
        ListaDetalles[index].Accion = arregloCaptura.Accion;
        ListaDetalles[index].SpoolID = arregloCaptura.SpoolID;
        ListaDetalles[index].medioTransporteID = arregloCaptura.MedioTransporteID;
        ListaDetalles[index].CuadranteID = $("#inputCuadrante").val();
        Captura[0].Detalles = ListaDetalles;

        $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxCargarSpool($("#inputCarro").data("kendoComboBox").value());
                displayMessage("PinturaGuardarDescarga", "", '1');
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                displayMessage("PinturaGuardarErrorDesGuardar", "", '2');
            }

            $("#grid").data("kendoGrid").dataSource.sync();
            loadingStop();
        });
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }
};