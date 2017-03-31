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
        LimpiarDespuesCambioProcesoPintura();
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

            CrearGrid();

            var grid = $("#grid").data("kendoGrid");
            var dataSource = grid.dataSource;
            var options = grid.options;


            ////////////////////


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
            options.columns.push({ field: "FechaShotblast", title: _dictionary.columnFechaShotblast[$("#language").data("kendoDropDownList").value()], type: "date", filterable: getKendoGridFilterableDateMaftec(), format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "160px" });
            options.columns.push({ field: "ListaShotblasteroGuargado", title: _dictionary.columnShotblastero[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RendercomboBoxShotBlastero, template: "#:plantillaShotblastero#", width: "280px" });


            for (var i = 0; i < data[0].length; i++) {
                options.columns.push({ field: data[0][i].NombreComponente, title: data[0][i].NombreComponente, filterable: getGridFilterableCellMaftec(), editor: renderComboboxComponenteDinamico, width: "140px" });
            }

            for (var i = 0; i < data[1].length; i++) {
                options.columns.push({ field: data[1][i].NombreReductor, title: data[1][i].NombreReductor, filterable: getGridFilterableCellMaftec(), editor: RendercomboReductor, width: "140px" });
            }

            
            options.columns.push({ command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "60px", attributes: { style: "text-align:center;" } });
            options.columns.push({ command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: VentanaModalDescargarMedioTransporte }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" });


            grid.destroy();
            $("#grid").kendoGrid(options);

            CustomisaGrid($("#grid"));
            AjaxCargarSpool(CargaCarroID, sistemaPinturaProyectoId, procesoID);
        }
    });
}

function AjaxCargarSpool(medioTransporteCargaID, sistemaPinturaProyectoID, procesopinturaID) {
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), medioTransporteCargaID: medioTransporteCargaID, lenguaje: $("#language").val(), sistemaPinturaProyectoID: sistemaPinturaProyectoID, procesopinturaID: procesopinturaID }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = JSON.parse(data);

        for (var i = 0; i < array.length; i++) {
            //if (array[i].ListaShotblasteroGuargado.length > 0) {
            //    array[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + array[i].ListaShotblasteroGuargado.length;
            //}
            //else {
            //    array[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastNoExistentes[$("#language").data("kendoDropDownList").value()];
            //}
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
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), OrdenTrabajoSpoolID: ordenTrabajoSpoolID, lenguaje: $("#language").val() }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var carroID = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).medioTransporteID;
        var sistemaPinturaProyectoID = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).SistemaPinturaProyectoID;
        var array = data;
        var elementosNoModificados = "";
        var elementosModificados = "";
        for (var i = 0; i < array.length; i++) {
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
                        displayNotify("PinturaSpoolCargadoEnCarro", "", '1');
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
                //displayNotify("notificationslabel0066", "", '1');
            }
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

function AjaxGetLotesComponente(container, options) {
    var datos = null;
    
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), componente: options.field, lenguaje: $("#language").val(),tipoConsulta:0 }).done(function (data) {

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
              if (dataItem != undefined && dataItem.NombreLote!="") {
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

function AjaxGetLotesReductor(container, options) {
    var datos = null;

    var datos = null;

    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), componente: options.field, lenguaje: $("#language").val(),tipoConsulta:1 }).done(function (data) {

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