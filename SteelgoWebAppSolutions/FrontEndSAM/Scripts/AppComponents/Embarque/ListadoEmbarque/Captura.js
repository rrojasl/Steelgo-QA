IniciarListadoEmbarque();

function IniciarListadoEmbarque() {
    SuscribirEventos();
}

function changeLanguageCall() {
    AltaFecha();
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    document.title = _dictionary.EmbarqueListadoTituloPagina[$("#language").data("kendoDropDownList").value()];

    SuscribirEventoPopUPEnviarEmbarque();
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
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Embarque: { type: "string", editable: false },
                        Planas: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Destino: { type: "string", editable: true },
                        PapelesCliente: { type: "boolean", editable: false },
                        PapelesAduana: { type: "boolean", editable: false },
                        FolioSolicitudPermiso: {
                            type: "string", editable: true// validation:
                                //{
                                //    required : false,
                                //    validateFolioSolicitudPermiso: function (e) {
                                //        var re = /^[a-zA-Z][0-9]*$/;
                                //        var grid = $("#grid").data("kendoGrid");
                                //        var dataItem = grid.dataItem($(e.target).closest("tr"));

                                //        if(!re.test(e.val())){
                                //            $("#grid_active_cell").text("");
                                //        }

                                //        return true;
                                //    }
                                //}
                        },
                        FechaSolicitudPermiso: { type: "date", editable: true },
                        AprobadoClienteDesc: { type: "string", editable: true },
                        AprobadoAduanaDesc: { type: "string", editable: true },
                        OkEmbarque: { type: "boolean", editable: false },
                        RequierePermisoAduana: { type: "boolean", editable: false },
                        RequierePapCliente: { type: "boolean", editable: false },
                        Enviar: { type: "boolean", editable: false }
                    }
                }
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
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Embarque", title: _dictionary.columnEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Planas", title: _dictionary.columnPlanasEmb[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Destino", title: _dictionary.columnDestinoEmb[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxDestino, width: "145px" },
            {
                field: "PapelesCliente", title: _dictionary.columnPapCliente[$("#language").data("kendoDropDownList").value()], filterable: false, template: "<center><button  type='button' class='btn btn-blue imprimirPapelesCliente' Style='display: #= RequierePermisoAduana ==true ? 'block;' : 'none;' #'> <span>" +
                  _dictionary.lblImprimir[$("#language").data("kendoDropDownList").value()] + "</span></button></center>", width: "140px"
            },
            {
                field: "PapelesAduana", title: _dictionary.columnPapAduana[$("#language").data("kendoDropDownList").value()], filterable: false, template: "<center><button  type='button' class='btn btn-blue imprimirPapelesAduana' Style='display: #= RequierePermisoAduana==true ?  'block;' : 'none;' #' > <span>" +
                  _dictionary.lblImprimir[$("#language").data("kendoDropDownList").value()] + "</span></button></center>", width: "140px"
            },
            { field: "FolioSolicitudPermiso", title: _dictionary.columnSolicitudPermiso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "FechaSolicitudPermiso", title: _dictionary.columnFechaPermiso[$("#language").data("kendoDropDownList").value()], filterable: getKendoGridFilterableDateMaftec(), editor: RenderDatePicker, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "150px" },
            { field: "AprobadoClienteDesc", title: _dictionary.columnAprobadoCliente[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxAprobacionCliente, width: "130px" },
            { field: "AprobadoAduanaDesc", title: _dictionary.columnAprobadoAduana[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxAprobacionAduana, width: "130px" },
            {
                field: "OkEmbarque", title: _dictionary.columnOkEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkEmbarque: true }, { OkEmbarque: false }]
                }, template: '<input type="checkbox" class="chk-OkEmbarque" #= OkEmbarque ? "checked=checked" : "" # class="chkbx" ></input>', width: "150px", attributes: { style: "text-align:center;" }
            },
            {
                field: "Enviar", title: " ", filterable: false, template: "<center><button  type='button' class='btn btn-blue botonEnviar' Style='display: #= Enviar == true ?'block;' : 'none;' #' ><span>" +
                   _dictionary.botonEnviar[$("#language").data("kendoDropDownList").value()] + "</span></button></center>", width: "115px"
            },
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },
    });

    $("#grid .k-grid-content").on("change", "input.chk-OkEmbarque", function (e) {

        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));

            if ($(this)[0].checked) {
                dataItem.OkEmbarque = true;

                if (dataItem.Accion == 1)
                    dataItem.ModificadoPorUsuario = true;
                
            }
            else {
                dataItem.OkEmbarque = false;

                if (dataItem.Accion == 2)
                    dataItem.ModificadoPorUsuario = true;
            }

            if (SetValueEnviar(dataItem))
                dataItem.Enviar = true;
            else
                dataItem.Enviar = false;

            $("#grid").data("kendoGrid").dataSource.sync();
        }
        else {
            if (e.target.checked)
                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = false;
            else
                $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = true;
        }

        $("#grid").data("kendoGrid").dataSource.sync();
    });
    CustomisaGrid($("#grid"));
};

function isEditable(fieldName, model) {
    if (fieldName === "FolioSolicitudPermiso") {
        if (!model.RequierePermisoAduana) {
            return false;
        }
    }
    if (fieldName === "FechaSolicitudPermiso") {
        if (!model.RequierePermisoAduana) {
            return false;
        }
    }
    return true;
}

function AltaFecha() {
    endRangeDate = $("#Fecha").kendoDatePicker({
        value: new Date()
    });
}

function SetValueEnviar(obj) {
    var retorno = false;
    if (obj != undefined) {
        if (obj.AprobadoCliente == 1 && obj.AprobadoAduana == 1 && obj.OkEmbarque)
            retorno = true;
    }

    return retorno;
}