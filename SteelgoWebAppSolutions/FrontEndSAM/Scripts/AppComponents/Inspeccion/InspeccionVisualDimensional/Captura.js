var endRangeDate;
var endRangeDateV;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;
IniciarCapturaInspecion();

//Cambia lenguaje
function changeLanguageCall() {
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    endRangeDateV.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });

    CargarGrid();
    limpiar();
    $('#Guardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    //document.title = _dictionary.InpeccionVisualEnlaceInspeccion[$("#language").data("kendoDropDownList").value()];
    opcionHabilitarView(false, "FieldSetView");

    IniciarPreCargas();
};
function IniciarCapturaInspecion() {

    asignarProyecto();
    SuscribirEventos();

};

function IniciarPreCargas() {

    ajaxObtenerListaDefectosDimensionales();
    ajaxObtenerListaDefectosVisuales();
    ajaxObtenerListaInspector();
    ajaxObtenerListaInspectorVisual();
    ajaxCargaCamposPredeterminados();

}

function asignarProyecto() {
    //    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}

function ExisteJunta(Spool) {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;
    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].JuntaID == Spool) {
            return false;
        }
    }
    return true;
}
function DatoDefaultNumeroUnico1() {

}
function DatoDefaultNumeroUnico2() {

    return "";
}

function MostrarDetalleVisualDimensional() {
    ajaxobtenerDetalleDimensional($("#InputID").val());
    ajaxObtenerListaTaller();
}

function CargarGrid() {
    kendo.ui.Grid.fn.editCell = (function (editCell) {
        return function (cell) {
            cell = $(cell);

            var that = this,
                column = that.columns[that.cellIndex(cell)],
                model = that._modelForContainer(cell),
                event = {
                    container: cell,
                    model: model,
                    preventDefault: function () {
                        this.isDefaultPrevented = true;
                    }
                };

            if (model && typeof this.options.beforeEdit === "function") {
                this.options.beforeEdit.call(this, event);

                // don't edit if prevented in beforeEdit
                if (event.isDefaultPrevented) return;
            }

            editCell.call(this, cell);
        };
    })(kendo.ui.Grid.fn.editCell);

    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                this.closeCell();
            }
        },
        change: function () {
            var dataItem = this.dataSource.view()[this.select().index()];
        },
        dataSource: {

            data: '',
            schema: {
                model: {
                    fields: {
                        Junta: { type: "string", editable: false },
                        DetalleJunta: { type: "string", editable: false },
                        Diametro: { type: "number", editable: false },
                        Taller: { type: "string", editable: true },
                        Resultado: { type: "string", editable: true },
                        Defectos: { type: "string", editable: true },
                        Inspector: { type: "string", editable: true },
                        FechaInspeccion: { type: "date", editable: true },
                        NumeroUnico1: { type: "string", editable: true },
                        NumeroUnico2: { type: "string", editable: true },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 4 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Junta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "55px" },
            { field: "DetalleJunta", title: _dictionary.columnDetalleJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "55px" },
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "55px", attributes: { style: "text-align:right;" } },
            { field: "Taller", title: _dictionary.columnTaller[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxTaller, width: "55px" },
            { field: "Resultado", title: _dictionary.columnResultado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderOptionResultado, width: "55px" },
            { field: "Defectos", title: _dictionary.columnDefectos[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDefectos, width: "55px" },
            { field: "Inspector", title: _dictionary.columnInspector[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxInspector, width: "55px" },
            { field: "FechaInspeccion", title: _dictionary.columnFecha[$("#language").data("kendoDropDownList").value()], type: "date", filterable: getKendoGridFilterableDateMaftec(), format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "55px" },
            { field: "NumeroUnico1", title: _dictionary.columnNumeroUnico1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxNumeroUnico1, width: "55px" },
            { field: "NumeroUnico2", title: _dictionary.columnNumeroUnico2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxNumeroUnico2, width: "55px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "30px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarCaptura }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "30px" }
        ],
        filterable: getGridFilterableMaftec(),
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");

            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },
        dataBound: function (e) {
            var grid = $("#grid").data("kendoGrid");
            var gridData = grid.dataSource.view();

            for (var i = 0; i < gridData.length; i++) {
                var currentUid = gridData[i].uid;
                if (gridData[i].RowOk == false) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffcccc");
                }
                else if (gridData[i].RowOk) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffffff");
                }

            }
        }
    });
    CustomisaGrid($("#grid"));
};

function isEditable(fieldName, model) {
    if (fieldName == "Defectos") {
        // condition for the field "ProductName"
        return model.Resultado !== "Aprobado";
    }

    return true; // default to editable
}


function ArregloListadoCaptura() {

    JsonCaptura = [];
    JsonCaptura[0] = { ProyectoID: "", Proyecto: "", OrdenTrabajoID: "", OrdenTrabajo: "", OrdenTrabajoSpoolID: "", OrdenTrabajoSpool: "", SpoolID: "", FechaInspeccion: "", InspectorID: "", Inspector: "" };

    //combobox.text()
    var fechaInspeccion = new Date($("#FechaInspeccion").data("kendoDatePicker").value());

    JsonCaptura[0].ProyectoID = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).ProyectoID;
    JsonCaptura[0].Proyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Proyecto;
    JsonCaptura[0].OrdenTrabajoID = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].OrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].OrdenTrabajoSpoolID = $("#InputID").val();
    JsonCaptura[0].OrdenTrabajoSpool = $("#InputID").data("kendoComboBox").text()
    JsonCaptura[0].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
    //JsonCaptura[0].JuntaID = $("#Junta").val();
    //JsonCaptura[0].Junta = $("#Junta").data("kendoComboBox").text();
    JsonCaptura[0].FechaInspeccion = $("#FechaInspeccion").val();
    JsonCaptura[0].InspectorID = $("#inputInspector").val();
    JsonCaptura[0].Inspector = $("#inputInspector").data("kendoComboBox").text();
    return JsonCaptura[0];
};
function AplicarAsignacionAutomaticaNumeroUnico(rowitem, textoAnterior, combobox, posicionSiguiente) {

    var jsonGridVisualDimensional = $("#grid").data("kendoGrid").dataSource._data;


    //se asigna datos a nivel Etiqueta. NU1 NU2 1,1 -> 3,3 
    for (var i = 0; i < jsonGridVisualDimensional.length; i++) {
        if (jsonGridVisualDimensional[i].OrdenTrabajoID + '-' + jsonGridVisualDimensional[i].OrdenTrabajoSpool == (rowitem.OrdenTrabajoID + '-' + rowitem.OrdenTrabajoSpool)) {

            for (var j = 0; j < jsonGridVisualDimensional[i].ListaNumerosUnicos1.length; j++) {
                if (combobox.EtiquetaMaterial == jsonGridVisualDimensional[i].ListaNumerosUnicos1[j].EtiquetaMaterial) {
                    jsonGridVisualDimensional[i].NumeroUnico1 = combobox.Clave;
                    jsonGridVisualDimensional[i].NumeroUnico1ID = combobox.NumeroUnicoID;
                }
            }
            for (var k = 0; k < jsonGridVisualDimensional[i].ListaNumerosUnicos2.length; k++) {
                if (combobox.EtiquetaMaterial == jsonGridVisualDimensional[i].ListaNumerosUnicos2[k].EtiquetaMaterial) {
                    jsonGridVisualDimensional[i].NumeroUnico2 = combobox.Clave;
                    jsonGridVisualDimensional[i].NumeroUnico2ID = combobox.NumeroUnicoID;
                }
            }

        }
    }

    //se asigna datos a nivel numero unico siempre y cuando la longitud del total de posibles numeros unicos es 1

    var itemSiguienteMismoMaterial;
    var arrayListaNumerosUnicos;

    if (combobox.Etiqueta == "2")
    { arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos2; }
    else if (combobox.Etiqueta == "1")
    { arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos1; }
    if (arrayListaNumerosUnicos != undefined) {
        if (arrayListaNumerosUnicos.length <= 3) {//se pone -2 por el vacio y por el elemento que reviso
            for (var l = 0; l < arrayListaNumerosUnicos.length; l++) {
                if (combobox.Clave != arrayListaNumerosUnicos[l].Clave) {
                    itemSiguienteMismoMaterial = arrayListaNumerosUnicos[l];
                    rowitem = BuscarItemSiguienteEnGrid(itemSiguienteMismoMaterial);

                    if (rowitem != undefined) {


                        if (posicionSiguiente < arrayListaNumerosUnicos.length) {
                            posicionSiguiente++;
                            AplicarAsignacionAutomaticaNumeroUnico(rowitem[0], textoAnterior, rowitem[1], posicionSiguiente);
                        }
                    }
                }
            }
        }
        else {
            if (ExisteNUGrid(combobox.NumeroUnicoID, jsonGridVisualDimensional, rowitem)) {
                //proceso para borrar el dato seleccionado donde se encuentra y ponerlo en el actual.
                EliminarItemNUSeleccionado(jsonGridVisualDimensional, combobox.NumeroUnicoID, rowitem)
            }
            else {
                if (!ExisteSpoolJuntaEnGrid(combobox, jsonGridVisualDimensional, rowitem)) {
                    for (var i = 0; i < jsonGridVisualDimensional.length; i++) {
                        if (combobox.JuntasEncontradas != '' &&
                            ((jsonGridVisualDimensional[i].IdOrdenTrabajo + '-' + jsonGridVisualDimensional[i].IdVal) == (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal)) &&
                            (jsonGridVisualDimensional[i].NumeroUnico2ID == combobox.NumeroUnicoID)) {
                            jsonGridVisualDimensional[i].NumeroUnico2 = '';
                            jsonGridVisualDimensional[i].NumeroUnico2ID = null;
                            MensajesSteelGO("AvisoNumeroUnicoYaAsignado", combobox.JuntasEncontradas);
                        }
                        else if (combobox.JuntasEncontradas != '' && ((jsonGridVisualDimensional[i].IdOrdenTrabajo + '-' + jsonGridVisualDimensional[i].IdVal) == (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal)) && (jsonGridVisualDimensional[i].NumeroUnico1ID == combobox.NumeroUnicoID)) {
                            jsonGridVisualDimensional[i].NumeroUnico1 = '';
                            jsonGridVisualDimensional[i].NumeroUnico1ID = null;
                            MensajesSteelGO("AvisoNumeroUnicoYaAsignado", combobox.JuntasEncontradas);
                        }
                    }
                }
            }
        }
    }
}

function ExisteNUGrid(NumeroUnicoID, jsonGridVisualDimensional, rowitem) {
    var existe = false;
    for (var i = 0; i < jsonGridVisualDimensional.length; i++) {
        if ((jsonGridVisualDimensional[i].Accion != 3 &&
            (jsonGridVisualDimensional[i].NumeroUnico1ID == NumeroUnicoID || jsonGridVisualDimensional[i].NumeroUnico2ID == NumeroUnicoID)) &&
            (jsonGridVisualDimensional[i].IdOrdenTrabajo + '-' + jsonGridVisualDimensional[i].IdVal) == (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal) &&
            jsonGridVisualDimensional[i].JuntaID != rowitem.JuntaID)
            return true;
    }
    return false;
}

function ExisteSpoolJuntaEnGrid(combobox, jsonGridVisualDimensional, rowitem) {
    for (var i = 0; i < jsonGridVisualDimensional.length; i++) {
        if (jsonGridVisualDimensional[i].Accion != 3 && (jsonGridVisualDimensional[i].OrdenTrabajoID + '-' + jsonGridVisualDimensional[i].OrdenTrabajoSpool + jsonGridVisualDimensional[i].Junta) == (rowitem.OrdenTrabajoID + '-' + rowitem.OrdenTrabajoSpool + combobox.JuntasEncontradas.trim())) {
            return true;
        }
    }
    return false;
};

function MensajesSteelGO(control, mensajeExepcionTecnico) {

    switch (control) {

        case 'InputOrdenTrabajo':// el InputOrdenTrabajo no tiene el formato correcto.
            displayNotify("OrdenTrabajoNoValida", "", '1');
            break;
        case 'Mensajes_error':
            displayNotify("Mensajes_error", mensajeExepcionTecnico, '2');//muestra cualquier error indicando el error tecnico al usuario
            break;
        case 'InputID-SelectInvalid':
            displayNotify("NoExisteSpoolID", '', '2');//mensaje indicando que el id no es valido.
            break;
        case 'radioMostrar':
            displayNotify("radioMostrar", '', '2');//mensaje cuando el tipo de datos a Mostrar no se encuentre seleccionado
            break;
        case 'LLenadoMasivo':
            displayNotify("radioLLenadoMasivo", '', '2');//mensaje cuando el tipo de llenado masivo no esta seleccionado
            break;
        case 'ResultadoDimensional':
            displayNotify("radioResultadoDimensional", '', '2');//mensaje cuando el tipo de resultado dimensional no esta seleccionado
            break;
        case 'radioTipoAgregado':
            displayNotify("radioTipoAgregado", '', '2');//mensaje cuando el tipo de resultado dimensional no esta seleccionado
            break;
        case 'AvisoNumeroUnicoYaAsignado':
            displayNotify('', _dictionary.AvisoNumeroUnicoYaAsignado[$("#language").data("kendoDropDownList").value()].replace("?1", mensajeExepcionTecnico), '2');//mensaje cuando el numero unico ya se encuentra asignado.
            break;

    }
};

function EliminarItemNUSeleccionado(jsonGridVisualDimensional, NumeroUnicoID, rowitem) {
    for (var i = 0; i < jsonGridVisualDimensional.length; i++) {
        if (jsonGridVisualDimensional[i].NumeroUnico1ID == NumeroUnicoID && (jsonGridVisualDimensional[i].IdOrdenTrabajo + '-' + jsonGridVisualDimensional[i].IdVal) == (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal) && (jsonGridVisualDimensional[i].IdOrdenTrabajo + '-' + jsonGridVisualDimensional[i].IdVal + jsonGridVisualDimensional[i].JuntaID) != (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal + rowitem.JuntaID)) {
            jsonGridVisualDimensional[i].NumeroUnico1 = '';
            jsonGridVisualDimensional[i].NumeroUnico1ID = null;
        }
        else if (jsonGridVisualDimensional[i].NumeroUnico2ID == NumeroUnicoID && (jsonGridVisualDimensional[i].IdOrdenTrabajo + '-' + jsonGridVisualDimensional[i].IdVal) == (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal) && (jsonGridVisualDimensional[i].IdOrdenTrabajo + '-' + jsonGridVisualDimensional[i].IdVal + jsonGridVisualDimensional[i].JuntaID) != (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal + rowitem.JuntaID)) {
            jsonGridVisualDimensional[i].NumeroUnico2 = '';
            jsonGridVisualDimensional[i].NumeroUnico2ID = null;
        }
    }
}

function BuscarItemSiguienteEnGrid(siguienteItemBuscar) {
    var jsonGridVisualDimensional = $("#grid").data("kendoGrid").dataSource._data;


    //se busca el nuevo item en alguna junta con el mismo EtiquetaMaterial .
    for (var i = 0; i < jsonGridVisualDimensional.length; i++) {
        for (var j = 0; j < jsonGridVisualDimensional[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridVisualDimensional[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridVisualDimensional[i].ListaNumerosUnicos1[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridVisualDimensional[i].NumeroUnico1 == undefined)
                return [jsonGridVisualDimensional[i], jsonGridVisualDimensional[i].ListaNumerosUnicos1[j]];
        }

        for (var j = 0; j < jsonGridVisualDimensional[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridVisualDimensional[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridVisualDimensional[i].ListaNumerosUnicos2[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridVisualDimensional[i].NumeroUnico2 == undefined)
                return [jsonGridVisualDimensional[i], jsonGridVisualDimensional[i].ListaNumerosUnicos2[j]];
        }
    }

    //se busca el nuevo item en alguna junta con diferente EtiquetaMaterial .
    for (var i = 0; i < jsonGridVisualDimensional.length; i++) {
        for (var j = 0; j < jsonGridVisualDimensional[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridVisualDimensional[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridVisualDimensional[i].ListaNumerosUnicos1[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
                return [jsonGridVisualDimensional[i], jsonGridVisualDimensional[i].ListaNumerosUnicos1[j]];
        }

        for (var j = 0; j < jsonGridVisualDimensional[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridVisualDimensional[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridVisualDimensional[i].ListaNumerosUnicos2[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
                return [jsonGridVisualDimensional[i], jsonGridVisualDimensional[i].ListaNumerosUnicos2[j]];
        }
    }

    //en caso de no encontrar nada
    return undefined;
}
function cancelarCaptura(e) {
    e.preventDefault();
    if ($("#language").val() == "es-MX") {
        if ($('#Guardar').text().trim() != "Editar") {
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            var spoolIDRegistro = dataItem.SpoolID;
            var modalTitle = "";
            modalTitle = _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()];
            var window = $("#ventanaConfirm");
            var ventanaConfirm = window.kendoWindow({
                iframe: true,
                title: modalTitle,
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                resizable: false,
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content('<center>' + _dictionary.mensajeEliminarInspeccionVisualDimensional[$("#language").data("kendoDropDownList").value()] + '</center>' +
                                    '<center><button class="btn btn-blue" id="YesButton"> Si</button>&nbsp;<button class="btn btn-blue" id="NoButton"> No</button></center>');

            ventanaConfirm.center().open();

            $("#YesButton").click(function (handler) {
                var dataSource = $("#grid").data("kendoGrid").dataSource;
                if (dataItem.Accion == 2 || dataItem.Accion == 4)
                    dataItem.Accion = 3;
                if (dataItem.InspeccionVisualID == 0)
                    dataSource.remove(dataItem);
                $("#grid").data("kendoGrid").dataSource.sync();
                ventanaConfirm.close();
            });

            $("#NoButton").click(function (handler) {
                ventanaConfirm.close();
            });
        }
    }
    else {
        if ($('#Guardar').text().trim() != "Edit") {
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            var spoolIDRegistro = dataItem.SpoolID;
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            var spoolIDRegistro = dataItem.SpoolID;
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                resizable: false,
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function (handler) {
                var dataSource = $("#grid").data("kendoGrid").dataSource;
                dataItem.Accion = 3;
                if (dataItem.InspeccionVisualID == 0)
                    dataSource.remove(dataItem);
                $("#grid").data("kendoGrid").dataSource.sync();
                ventanaConfirm.close();
            });
            $("#noButton").click(function (handler) {
                ventanaConfirm.close();
            });
        }
    }

};

function limpiarCaptura(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        itemToClean.Taller = "";
        itemToClean.TallerID = "";
        itemToClean.Resultado = "";
        itemToClean.InspectorID = "";
        itemToClean.Defectos = "";
        itemToClean.Inspector = "";
        itemToClean.FechaInspeccion = "";
        itemToClean.NumeroUnico1 = "";
        itemToClean.NumeroUnico2 = "";
        itemToClean.NumeroUnico1ID = "";
        itemToClean.NumeroUnico2ID = "";

        if (itemToClean.Accion == 1)
            itemToClean.Accion = 1;
        if (itemToClean.Accion == 2)
            itemToClean.Accion = 4;

        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();

    }
}

function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
    }
    else {
        var filters = ds.filter();
        filters.logic = "or"
        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        ds.sync();
    }
}


function PlanchaTaller() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].TallerID = $("#inputTaller").val();
            data[i].Taller = $("#inputTaller").data("kendoComboBox").text();
        }
        else {
            if (data[i].Taller == "" || data[i].Taller == null || data[i].Taller == undefined) {
                data[i].TallerID = $("#inputTaller").val();
                data[i].Taller = $("#inputTaller").data("kendoComboBox").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};
function PlanchaInspector() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].InspectorID = $("#inputInspectorVisual").val();
            data[i].Inspector = $("#inputInspectorVisual").data("kendoComboBox").text();
        }
        else {
            if (data[i].Inspector == "" || data[i].Inspector == null || data[i].Inspector == undefined) {
                data[i].InspectorID = $("#inputInspectorVisual").val();
                data[i].Inspector = $("#inputInspectorVisual").data("kendoComboBox").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};
function PlanchaDefecto() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].DefectosID = $("#inputDefectosVisual").val();
            data[i].Defectos = $("#inputDefectosVisual").data("kendoComboBox").text();
        }
        else {
            if ((data[i].Defectos == "" || data[i].Defectos == null || data[i].Defectos == undefined) && data[i].Resultado != "Aprobado") {
                data[i].DefectosID = $("#inputDefectosVisual").val();
                data[i].Defectos = $("#inputDefectosVisual").data("kendoComboBox").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};
function PlanchaFecha() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaInspeccion = new Date(ObtenerDato(endRangeDateV.val(), 1), ObtenerDato(endRangeDateV.val(), 2), ObtenerDato(endRangeDateV.val(), 3));//año, mes, dia;
        }
        else {
            if (data[i].FechaInspeccion == "" || data[i].FechaInspeccion == null || data[i].FechaInspeccion == undefined) {
                data[i].FechaInspeccion = new Date(ObtenerDato(endRangeDateV.val(), 1), ObtenerDato(endRangeDateV.val(), 2), ObtenerDato(endRangeDateV.val(), 3));//año, mes, dia;
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};
function PlanchadoResultadoVisual() {
    try {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].ResultadoID = $('input:radio[name=ResultadoVisual]:checked').val() == "Aprobado" ? 1 : 2;
                if (data[i].ResultadoID == 1)
                    data[i].Resultado = _dictionary.DimensionalVisualAporbadoVisual[$("#language").data("kendoDropDownList").value()];
                else
                    data[i].Resultado = _dictionary.DimensionalVisualRechazadoVisual[$("#language").data("kendoDropDownList").value()];

                if (data[i].Resultado == "Aprobado") {
                    data[i].DefectosID = "";
                    data[i].Defectos = "";
                }
            }
            else {
                if (data[i].Resultado == "" || data[i].Resultado == null || data[i].Resultado == undefined) {
                    data[i].ResultadoID = $('input:radio[name=ResultadoVisual]:checked').val() == "Aprobado" ? 1 : 2;

                    if (data[i].ResultadoID == 1)
                        data[i].Resultado = _dictionary.DimensionalVisualAporbadoVisual[$("#language").data("kendoDropDownList").value()];
                    else
                        data[i].Resultado = _dictionary.DimensionalVisualRechazadoVisual[$("#language").data("kendoDropDownList").value()];

                    if (data[i].Resultado == "Aprobado") {
                        data[i].DefectosID = "";
                        data[i].Defectos = "";
                    }
                }
            }
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }
    catch (e) { }
};