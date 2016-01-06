var requisicionID;
var ItemSeleccionado;
var comboDefectos;
var modeloRenglon;
var NumeroPlacasActual;
function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUp();
    $('#grid').data('kendoGrid').dataSource.read();
    $('#gridPopUp').data('kendoGrid').dataSource.read();
    requisicionID = $("#RequisicionID").val();
    AjaxRequisicionDetalle(requisicionID);
    
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
        save: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (fieldName == "NumeroPlacas") {
                if (parseInt(e.values.NumeroPlacas) < parseInt(NumeroPlacasActual)) {
                    e.preventDefault();
                }
                else {
                    var longitudActual = e.model.listaDetallePruebas.length;
                    

                    
                    var longitudNuevos = parseInt(e.values.NumeroPlacas) - longitudActual;
                    if (isNaN(longitudNuevos)) {
                        e.preventDefault();
                    }
                    var ds = e.model.listaDetallePruebas;
                    detallePruebas = [];
                    for (var index = 0; index < longitudNuevos; index++) {

                        detallePruebas[index] = {
                            Accion: "",
                            RequisicionPruebaElementoID: "",
                            PruebaElementoResultadoID: "",
                            Ubicacion: "",
                            Resultado: "",
                            Nombre: "",
                            ListaDefectos: "",
                            ListaDetalleDefectos: ""
                        }
                        detallePruebas[index].Accion = 1;
                        detallePruebas[index].RequisicionPruebaElementoID = e.model.RequisicionPruebaElementoID;
                        detallePruebas[index].PruebaElementoResultadoID = 0;
                        detallePruebas[index].Resultado = 1;
                        detallePruebas[index].Nombre = "Aceptado";

                        var aux = 0;
                        for (var i = 0 ; i < ds.length; i++) {
                            var res = ds[i].Ubicacion.split("-");
                            if (aux <= res[1]) {
                                aux = parseInt(res[1]);
                            }
                        }
                        detallePruebas[index].Ubicacion = aux+"-"+(aux+1);

                        ds.push(detallePruebas[index]);
                    }
                    
                    
                }
            }
        },
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        SpoolJunta: { type: "string", editable: false },
                        NumeroPlacas: { type: "string", editable: true },
                        Densidad: { type: "string", editable: true },
                        Tamano: { type: "string", editable: true },
                        InformacionResultados: { type: "string", editable: true },
                    }
                }
            },
        },
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (fieldName == "NumeroPlacas") {
                NumeroPlacasActual = e.model.NumeroPlacas;
            }
        },
        columns: [

            { field: "SpoolJunta", title: _dictionary.CapturaReportePruebasHeaderSpoolJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
             { field: "NumeroPlacas", title: _dictionary.CapturaReportePruebasHeaderNumeroPlacas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
             { field: "Tamano", title: _dictionary.CapturaReportePruebasHeaderTamano[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
             { field: "Densidad", title: _dictionary.CapturaReportePruebasHeaderDensidad[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
            { field: "InformacionResultados", title: _dictionary.CapturaReportePruebasHeaderDetallePruebas[$("#language").data("kendoDropDownList").value()], filterable: false, width: "500px", editor: RenderGridDetalle, template: "Tiene:  Numero de placas" },

        ],
        editable: true,
        navigatable: true,
    });
};


function isEditable(fieldName, model) {
    if (fieldName === "NumeroPlacas") {

        return model.NumeroPlacas !== 1;
    }
    return true;
}