kendo.ui.Upload.fn._supportsDrop = function () { return false; }
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10025", { path: '/' });

var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;

IniciarCapturaInspecion();
//Cambia lenguaje
function IniciarCapturaInspecion() {
    CargarFecha();
    asignarProyecto();
    SuscribirEventos();
    
};
function changeLanguageCall() {
    CargarGrid();
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    AjaxObtenerListaDefectos();
    AjaxCargaCamposPredetrminados();
    limpiar();
    $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    document.title = _dictionary.DimensionalVisualInspeccionDimensional[$("#language").data("kendoDropDownList").value()];
    opcionHabilitarView(false, "FieldSetView");
};
function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}
function CargarFecha() {
    endRangeDate = $("#FechaInspeccion").kendoDatePicker({
        max: new Date()
    })

    endRangeDate.on("keydown", function (e) {
        if (e.keyCode == 13) {
            //PlanchaFecha();
        }
    });

  
};

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
                        Accion: { type: "int", editable: false },
                        InspeccionDimensionalID: { type: "int", editable: false },
                        OrdenTrabajoSpoolID: { type: "string", editable: false },
                        OrdenTrabajoSpool: { type: "string", editable: false },
                        Resultado: { type: "string", editable: true },
                        ResultadoID: { type: "string", editable: true },
                        DefectosID: { type: "string", editable: true },
                        Defectos: { type: "string", editable: true },
                        InspectorID: { type: "string", editable: true },
                        Inspector: { type: "string", editable: true },
                        FechaInspeccion: { type: "date", editable: true }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: false,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "OrdenTrabajoSpool", title: _dictionary.DimensionalVisualHeaderSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderOptionResultado },
             { field: "Resultado", title: _dictionary.DimensionalVisualHeadeResultado[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderOptionResultado },
             { field: "Defectos", title: _dictionary.DimensionalVisualHeaderDefecto[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxDefectos },
             { field: "Inspector", title: _dictionary.DimensionalVisualHeaderInspectorDimesional[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxInspector },
             { field: "FechaInspeccion", title: _dictionary.DimensionalVisualHeaderFechaDimesional[$("#language").data("kendoDropDownList").value()], type: "date", filterable: true, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
             { field: "ListaJuntasSeleccionadas",title:" ", filterable: true, editor: RenderMultiSelectJuntas, template: "#:TemplateRender#" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: "", width: "99px" }
        ],
        filterable: {
            extra: false
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });

};

function isEditable(fieldName, model) {
    if (fieldName === "Defectos") {
        // condition for the field "ProductName"
        return model.Resultado !== "Aprobado";
    }
    else if (fieldName === "ListaJuntasSeleccionadas") {
        // condition for the field "ProductName"
        return model.TIPO !== "NoEspecificarJunta" &&  model.TIPO !=null;
    }

    return true; // default to editable
}

function ArregloListadoCaptura() {

    JsonCaptura = [];
    JsonCaptura[0] = { Accion: "", InspeccionDimensionalID: "", ProyectoID: "", Proyecto: "", OrdenTrabajoSpoolID: "", OrdenTrabajoSpool: "", ResultadoID: "", Resultado: "", DefectosID: "", Defectos: "", InspectorID: "", Inspector: "", FechaInspeccion: "" };
    var fechaInspeccion = new Date($("#FechaInspeccion").data("kendoDatePicker").value());
    JsonCaptura[0].Accion = "0";
    JsonCaptura[0].InspeccionDimensionalID = "0";
    JsonCaptura[0].ProyectoID = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).ProyectoID;
    JsonCaptura[0].Proyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Proyecto;
    JsonCaptura[0].OrdenTrabajoSpoolID = $("#InputID").val();
    JsonCaptura[0].OrdenTrabajoSpool = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").data("kendoComboBox").text();
    JsonCaptura[0].ResultadoID = $('input:radio[name=ResultadoDimensional]:checked').val() == "Aprobado" ? 1 : 2;
    JsonCaptura[0].Resultado = $('input:radio[name=ResultadoDimensional]:checked').val();
    JsonCaptura[0].DefectosID = $("#inputDefecto").val();
    JsonCaptura[0].Defectos = $("#inputDefecto").data("kendoComboBox").text();
    JsonCaptura[0].InspectorID = $("#inputInspector").val();
    JsonCaptura[0].Inspector = $("#inputInspector").data("kendoComboBox").text();
    JsonCaptura[0].FechaInspeccion = $("#FechaInspeccion").val();
    return JsonCaptura[0];
};

function cancelarCaptura(e) {
    e.preventDefault();
    var filterValue = $(e.currentTarget).val();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    if ($("#language").val() == "es-MX") {
        if ($('#Guardar').text().trim() != "Editar") {

            if (confirm(_dictionary.CapturaInspeccionPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                var dataSource = $("#grid").data("kendoGrid").dataSource;

                if (dataItem.Accion == 1)
                    dataSource.remove(dataItem);
                else
                    dataItem.Accion = 3;
                $("#grid").data("kendoGrid").dataSource.sync();

            }
        }
    }
    else {
        if ($('#Guardar').text().trim() != "Edit") {

            if (confirm(_dictionary.CapturaInspeccionPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                var dataSource = $("#grid").data("kendoGrid").dataSource;

                if (dataItem.Accion == 1)
                    dataSource.remove(dataItem);
                else
                    dataItem.Accion = 3;

                $("#grid").data("kendoGrid").dataSource.sync();

            }
        }
    }

    
};

function PlanchaDefecto() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            if (data[i].Resultado != "Aprobado") {
                data[i].DefectosID = $("#inputDefecto").val();
                data[i].Defectos = $("#inputDefecto").data("kendoComboBox").text();
            }
            
        }
        else {
            if (data[i].Defectos == "" || data[i].Defectos == null || data[i].Defectos == undefined) {
                if (data[i].Resultado != "Aprobado") {
                    data[i].DefectosID = $("#inputDefecto").val();
                    data[i].Defectos = $("#inputDefecto").data("kendoComboBox").text();
                }
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
            if ($("#inputInspector").data("kendoComboBox").selectedIndex != -1) {
                data[i].InspectorID = $("#inputInspector").val();
                data[i].Inspector = $("#inputInspector").data("kendoComboBox").text();
            }
            
        }
        else {
            if (data[i].Inspector == "" || data[i].Inspector == undefined || data[i].Inspector == null) {
                if ($("#inputInspector").data("kendoComboBox").selectedIndex != -1) {
                    data[i].InspectorID = $("#inputInspector").val();
                    data[i].Inspector = $("#inputInspector").data("kendoComboBox").text();
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};

function PlanchadoResultadoDimensional() {
    try{
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].ResultadoID = $('input:radio[name=ResultadoDimensional]:checked').val() == "Aprobado" ? 1 : 2;
                data[i].Resultado = $('input:radio[name=ResultadoDimensional]:checked').val();

                if (data[i].Resultado == "Aprobado") {
                    data[i].DefectosID = "";
                    data[i].Defectos = "";
                }
            }
            else {
                if (data[i].Resultado == "" || data[i].Resultado == null || data[i].Resultado == undefined) {
                    data[i].ResultadoID = $('input:radio[name=ResultadoDimensional]:checked').val() == "Aprobado" ? 1 : 2;
                    data[i].Resultado = $('input:radio[name=ResultadoDimensional]:checked').val();

                    if (data[i].Resultado == "Aprobado") {
                        data[i].DefectosID = "";
                        data[i].Defectos = "";
                    }

                }
            }
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }
    catch (e){}
};

function PlanchaFecha() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaInspeccion = new Date(ObtenerDato(endRangeDate.val(), 1), ObtenerDato(endRangeDate.val(), 2), ObtenerDato(endRangeDate.val(), 3));//año, mes, dia;
        }
        else {
            if (data[i].FechaInspeccion == "" || data[i].FechaInspeccion == null || data[i].FechaInspeccion == undefined) {
                data[i].FechaInspeccion = new Date(ObtenerDato(endRangeDate.val(), 1), ObtenerDato(endRangeDate.val(), 2), ObtenerDato(endRangeDate.val(), 3));//año, mes, dia;
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};