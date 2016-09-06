IniciarCapturaPlacasGraficas();
function IniciarCapturaPlacasGraficas() {
    SuscribirEventos();
}

function changeLanguageCall() {
    cargarGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargaListaProyectos();
    AjaxCargaListaDocumentoRecibido();
    document.title = _dictionary.ServiciosTecnicosEntregaPGBreadcrumb[$("#language").data("kendoDropDownList").value()];
}

function cargarGrid() {
    $("#grid").kendoGrid({
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        EntregaPlacasGraficasID: { type: "number", editable: false },
                        RequisicionID: { type: "number", editable: false },
                        OrdenTrabajoID: { type: "number", editable: false },
                        SpoolID: { type: "number", editable: false },
                        JuntaSpoolID: { type: "number", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        JuntaEtiqueta: { type: "number", editable: false },
                        ClasificacionPndID: { type: "number", editable: false },
                        ClasificacionPnd: { type: "string", editable: false },
                        TipoPruebaID: { type: "number", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        Observaciones: { type: "string", editable: false },
                        CodigoAsmeID: { type: "number", editable: false },
                        CodigoAsme: { type: "string", editable: false },
                        DocumentoRecibidoID: { type: "number", editable: true },
                        DocumentoRecibido: { type: "string", editable: true },
                        DocumentoEstatusID: { type: "number", editable: true },
                        DocumentoEstatus: { type: "string", editable: true },
                        DefectoDocumentoID: { type: "number", editable: true},
                        DefectoDocumento: { type: "string", editable: true }
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
            numeric: true
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "JuntaEtiqueta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px" },
            { field: "ClasificacionPnd", title: _dictionary.columnClasificacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "TipoPrueba", title: _dictionary.columnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Observaciones", title: _dictionary.columnObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "CodigoAsme", title: _dictionary.columnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "DocumentoRecibido", title: _dictionary.columnRecibido[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDocumentoRecibido, width: "120px" },
            { field: "DocumentoEstatus", title: _dictionary.columnCondicionesFisicas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDocumentoEstatus, width: "200px" },
            { field: "DefectoDocumento", title: _dictionary.columnDefectosRechazos[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDefectoDocumento, width: "160px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarRenglon }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ],
    });

    CustomisaGrid($("#grid"));
}
function limpiarRenglon(e) {
    e.preventDefault();
    if ($('#botonGuardar').text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        itemToClean.DocumentoRecibido = "";
        itemToClean.DocumentoRecibidoID = 0;
        itemToClean.DocumentoEstatus = "";
        itemToClean.DocumentoEstatusID = 0;
        itemToClean.DefectoDocumento = "";
        itemToClean.DefectoDocumentoID = 0;
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();
    }
}
function PlanchaDocumentoRecibido(tipoLlenado) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if (tipoLlenado === "Todos") {
            data[i].DocumentoRecibido = $("#inputDocumentoRecibido").data("kendoComboBox").text();
            data[i].DocumentoRecibidoID = $("#inputDocumentoRecibido").data("kendoComboBox").value();
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].DocumentoRecibido === "" || data[i].DocumentoRecibido === null || data[i].DocumentoRecibido === undefined) {
                data[i].DocumentoRecibido = $("#inputDocumentoRecibido").data("kendoComboBox").text();
                data[i].DocumentoRecibidoID = $("#inputDocumentoRecibido").data("kendoComboBox").value();
            }
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaDocumentoEstatus(tipoLlenado) {

    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if (tipoLlenado === "Todos") {
            data[i].DocumentoEstatus = $("#inputCondicionesFisicas").data("kendoComboBox").text();
            data[i].DocumentoEstatusID = $("#inputCondicionesFisicas").data("kendoComboBox").value();
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].DocumentoEstatus === "" || data[i].DocumentoEstatus === null || data[i].DocumentoEstatus === undefined) {
                data[i].DocumentoEstatus = $("#inputCondicionesFisicas").data("kendoComboBox").text();
                data[i].DocumentoEstatusID = $("#inputCondicionesFisicas").data("kendoComboBox").value();
            }
        }
        if (data[i].DocumentoEstatusID == 1) {
            data[i].__proto__.fields.DefectoDocumento.editable = false;
        } else {
            data[i].__proto__.fields.DefectoDocumento.editable = true;
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}

function PlanchaDocumentoDefecto(tipoLlenado) {

    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if (tipoLlenado === "Todos") {
            data[i].DefectoDocumento = $("#inputDefectos").data("kendoComboBox").text();
            data[i].DefectoDocumentoID = $("#inputDefectos").data("kendoComboBox").value();
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].DefectoDocumento === "" || data[i].DefectoDocumento === null || data[i].DefectoDocumento === undefined) {
                data[i].DefectoDocumento = $("#inputDefectos").data("kendoComboBox").text();
                data[i].DefectoDocumentoID = $("#inputDefectos").data("kendoComboBox").value();
            }
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
}

function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])
        else
            ds.filter(curr_filters[0])
        ds.sync();


    }
    else {

        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        filters.filters.push({ field: "Accion", operator: "eq", value: 4 });
        ds.sync();
    }
}

function validaInformacionCapturada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var filters = ds.filter();
    var allData = ds.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    if(data.length>0){        
        for (var i=0; i < data.length; i++) {
            if (data[i].Accion == 2 ) {
                if ((data[i].DocumentoRecibidoID == 0 && data[i].DocumentoEstatusID == 0
                    && data[i].DefectoDocumentoID == 0)) {
                    return true;
                }
            } else if (ds._data[i].Accion == 1) {
                if ((data[i].DocumentoRecibidoID != 0 || data[i].DocumentoEstatusID != 0
                    || data[i].DefectoDocumentoID != 0)) {
                    return true;
                }
            }
        }
        return false;
    } else {
        return false;
    }
}