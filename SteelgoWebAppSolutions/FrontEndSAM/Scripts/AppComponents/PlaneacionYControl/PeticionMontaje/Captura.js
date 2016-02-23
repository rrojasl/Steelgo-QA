function changeLanguageCall() {
    CargarGrid();
    AltaFecha();
    $("#Proyecto").data("kendoComboBox").value("");
    $("#Nombre").val("");
    $("#CargarCSV").val("");
    document.title = _dictionary.lblConsulta[$("#language").data("kendoDropDownList").value()];
};


function AltaFecha() {
    endRangeDate = $("#FechaDeseable").kendoDatePicker({
        max: new Date(),
        date: new Date()
    });
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{
                Spool: "x",
                SpoolID: "X1-002",
                GrupoEmbarque: "PND",
                Emitido: "SÍ",
                Indicadores: "Junta: 2, m2: 10, Peqs: 2, Kg: 30, Área: 2",
                TipoMateriales: "",
                Peticion: "Petición 1",
                FechaPeticion: "18/02/2016",
                Check: true
            },
            {
                Spool: "x",
                SpoolID: "X2-016",
                GrupoEmbarque: "PND",
                Emitido: "NO",
                Indicadores: "Junta: 3, m2: 4, Peqs: 30, Kg: 20, Área: 3",
                TipoMateriales: "",
                Peticion: "Petición 1",
                FechaPeticion: "18/02/2016",
                Seleccionado: false
            },
            {
                Spool: "x",
                SpoolID: "X2-004",
                GrupoEmbarque: "PND",
                Emitido: "NO",
                Indicadores: "Junta: 1, m2: 20, Peqs: 23.2, Kg: 15, Área: 2",
                TipoMateriales: "",
                Peticion: "",
                FechaPeticion: "",
                Seleccionado: false
            }, ],
            schema: {
                model: {
                    fields: {
                        Spool: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        GrupoEmbarque: { type: "string", editable: false },
                        Emitido: { type: "string", editable: false },
                        Indicadores: { type: "string", editable: false },
                        TipoMateriales: { type: "string", editable: false },
                        Peticion : { type: "string", editable: false },
                        FechaPeticion: { type: "date", editable: false },
                        Seleccionado: { type: "boolean", editable: false }
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Spool", title: "Spool", filterable: true },
            { field: "SpoolID", title: "Spool ID", filterable: true },
            { field: "GrupoEmbarque", title:"Grupo de Embarque", filterable: true },
            { field: "Emitido", title: "Emitido", filterable: true },
            { field: "Indicadores", title: "Indicadores", filterable: false },
            { field: "TipoMateriales", title: "Tipo Materiales", filterable: false },
            { field: "Peticion", title: "Petición", filterable: false },
            { field: "FechaPeticion", title: "Fecha Petición", filterable: false, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "Seleccionado", title: "", filterable: false, template: "<input name='fullyPaid' class='chk-seleccion' type='checkbox' data-bind='checked: Seleccionado' #= Seleccionado ? checked='checked' : '' #/>" },
        ]
    });

    $("#grid .k-grid-content").on("change", "input.chk-seleccion", function (e) {
        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.Seleccionado = true;
                }
                else {
                    dataItem.Seleccionado = false;
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            }
            else {
                if ($(this)[0].checked) {
                    $(this)[0].checked = false;
                }
                else {
                    $(this)[0].checked = true;
                }
            }
        }
        else {
            if ($('#Guardar').text() != "Edit") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.Seleccionado = true;
                }
                else {
                    dataItem.Seleccionado = false;
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            }
            else {
                if ($(this)[0].checked) {
                    $(this)[0].checked = false;
                }
                else {
                    $(this)[0].checked = true;
                }
            }
        }
    });


    CustomisaGrid($("#grid"));
};