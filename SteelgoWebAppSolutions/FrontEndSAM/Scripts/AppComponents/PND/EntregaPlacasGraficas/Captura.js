IniciarCapturaPlacasGraficas();
function IniciarCapturaPlacasGraficas() {
    SuscribirEventos();
}

function changeLanguageCall() {
    var paramReq = getParameterByName('requisicion');
    
    cargarGrid();

    AjaxCargarCamposPredeterminados();
    AjaxCargaListaDocumentoRecibido();
    SiguienteProceso(paramReq);
    if (paramReq == null) {
        AjaxCargaListaProyectos();
    } else {
        AjaxObtenerElementoRequisicion(paramReq)
    }
    document.title = _dictionary.ServiciosTecnicosEntregaPGBreadcrumb[$("#language").data("kendoDropDownList").value()];
}

function SiguienteProceso(paramReq)
{
    var url = "";
    if(paramReq==null){
        url = "/PND/ValidacionRT?leng=" + $("#language").data("kendoDropDownList").value();
    }else{
        url = "/PND/ValidacionRT?leng=" + $("#language").data("kendoDropDownList").value()
            + "&requisicion="+paramReq;
    }
    $("#EntregaResultadosValidarResultadosSup").attr("href", url);
    $("#EntregaResultadosValidarResultadosInf").attr("href", url);

    
}

function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function cargarGrid() {

    //BeforeEdit
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
                if (event.isDefaultPrevented) return;
            }

            editCell.call(this, cell);
        };
    })(kendo.ui.Grid.fn.editCell);

    $("#grid").kendoGrid({
        edit: function (e) {
            setTimeout(function () {
                var inputName = e.container.find('input');

                inputName.select();
            });
            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
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
                        DocumentoDefectoID: { type: "number", editable: true },
                        DocumentoDefecto: { type: "string", editable: true },
                        EstatusCaptura: { type: "number", editable: true }
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
            { field: "DocumentoEstatus", title: _dictionary.columnCondicionesPlacasOGraficas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDocumentoEstatus, width: "200px" },
            { field: "DocumentoDefecto", title: _dictionary.columnDefectosRechazos[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDefectoDocumento, width: "160px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarRenglon }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },
    });

    CustomisaGrid($("#grid"));
}

function isEditable(fieldName, model) {
    if (fieldName === "DocumentoDefecto") {
        var estatusID = model.DocumentoEstatusID

        if(estatusID == 2){
            return true;
        } else {
            return false;
        }
    }
    return true;
}

function limpiarRenglon(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        itemToClean.DocumentoRecibido = "";
        itemToClean.DocumentoRecibidoID = 0;
        itemToClean.DocumentoEstatus = "";
        itemToClean.DocumentoEstatusID = 0;
        itemToClean.DocumentoDefecto = "";
        itemToClean.DocumentoDefectoID = 0;
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
            data[i].EstatusCaptura = 1;
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].DocumentoRecibido === "" || data[i].DocumentoRecibido === null || data[i].DocumentoRecibido === undefined) {
                data[i].DocumentoRecibido = $("#inputDocumentoRecibido").data("kendoComboBox").text();
                data[i].DocumentoRecibidoID = $("#inputDocumentoRecibido").data("kendoComboBox").value();
                data[i].EstatusCaptura = 1;
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
            data[i].EstatusCaptura = 1;
            if ($("#inputCondicionesFisicas").data("kendoComboBox").value()!="2") {
                data[i].DocumentoDefecto = "";
                data[i].DocumentoDefectoID = 0;
            }
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].DocumentoEstatus === "" || data[i].DocumentoEstatus === null || data[i].DocumentoEstatus === undefined) {
                data[i].DocumentoEstatus = $("#inputCondicionesFisicas").data("kendoComboBox").text();
                data[i].DocumentoEstatusID = $("#inputCondicionesFisicas").data("kendoComboBox").value();
                data[i].EstatusCaptura = 1;
                if ($("#inputCondicionesFisicas").data("kendoComboBox").value() != "2") {
                    data[i].DocumentoDefecto = "";
                    data[i].DocumentoDefectoID = 0;
                }
            }
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
            if (data[i].DocumentoEstatusID==2) {
                data[i].DocumentoDefecto = $("#inputDefectos").data("kendoComboBox").text();
                data[i].DocumentoDefectoID = $("#inputDefectos").data("kendoComboBox").value();
                data[i].EstatusCaptura = 1;
            } else {
                data[i].DocumentoDefecto = "";
                data[i].DocumentoDefectoID = 0;
                data[i].EstatusCaptura = 1;
            }
        }
        else if (tipoLlenado === "Vacios") {
            if (data[i].DocumentoDefecto === "" || data[i].DocumentoDefecto === null || data[i].DocumentoDefecto === undefined) {
                if (data[i].DocumentoEstatusID == 2) {
                    data[i].DocumentoDefecto = $("#inputDefectos").data("kendoComboBox").text();
                    data[i].DocumentoDefectoID = $("#inputDefectos").data("kendoComboBox").value();
                    data[i].EstatusCaptura = 1;
                } else {
                    data[i].DocumentoDefecto = "";
                    data[i].DocumentoDefectoID = 0;
                    data[i].EstatusCaptura = 1;
                }
                
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

    var contador = 0;
    if(data.length>0){        
        for (var i=0; i < data.length; i++) {
            if (data[i].EstatusCaptura == 1 ) {
                contador++;
            }
        }
        if(contador>0){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}