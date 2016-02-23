function changeLanguageCall() {
    SuscribirEventos();
    CargarGrid(); 
};


function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            //   this.closeCell();
        },
        autoBind: true,
        dataSource: {
            data: [
                {
                    Spool: "x",
                    SpoolID: "x1",
                    Paso: "PND",
                    Ciclo: "Si",
                    Fase: "Si",
                    GrupoEmision: "29-01-2016",
                    Emitido: "Si",
                    Embarque: "15-01-2016",
                    FechaPeticion: "06-02-2016",
                    TipoMaterial: "Acero"
                },
                {
                    Spool: "x",
                    SpoolID: "x2",
                    Paso: "LD",
                    Ciclo: "Si",
                    Fase: "Si",
                    GrupoEmision: "29-01-2016",
                    Emitido: "Si",
                    Embarque: "21-01-2016",
                    FechaPeticion: "06-02-2016",
                    TipoMaterial: "Acero"
                },
                {
                    Spool: "y",
                    SpoolID: "x3",
                    Paso: "Soldadura",
                    Ciclo: "Si",
                    Fase: "Si",
                    GrupoEmision: "29-01-2016",
                    Emitido: "Si",
                    Embarque: "15-06-2015",
                    FechaPeticion: "06-06-2015",
                    TipoMaterial: "Acero"
                },
                {
                    Spool: "w",
                    SpoolID: "",
                    Paso: "Armado",
                    Ciclo: "Si",
                    Fase: "Si",
                    GrupoEmision: "29-01-2015",
                    Emitido: "No",
                    Embarque: "",
                    FechaPeticion: "",
                    TipoMaterial: "Acero"
                },
            ],
            schema: {
                model: {
                    fields: {
                        Spool: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        Paso: { type: "string", editable: false },
                        Ciclo: { type: "string", editable: false },
                        Fase: { type: "string", editable: false },
                        GrupoEmision: { type: "string", editable: false },
                        Emitido: { type: "string", editable: false },
                        Embarque: { type: "string", editable: false },
                        FechaPeticion: { type: "string", editable: false },
                        TipoMaterial: { type: "string", editable: false },
                    }
                }
            },
            //filter: {
            //    logic: "or",
            //    filters: [
            //      { field: "Accion", operator: "eq", value: 1 },
            //      { field: "Accion", operator: "eq", value: 2 }
            //    ]
            //},
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
        detailTemplate: kendo.template($("#templateGridDetalleSpool").html()),
        detailInit: RenderGridDetalleSpool,
        columns: [
            { field: "Spool", title: "Nombre", filterable: true },
            { field: "SpoolID", title: "Spool ID", filterable: true },
            { field: "Paso", title: "Paso", filterable: true },
            { field: "Ciclo", title: "Ciclo", filterable: true },
            { field: "Fase", title: "Fase", filterable: true },
            { field: "GrupoEmision", title: "Grupo Emision", filterable: true },
            { field: "Emitido", title: "Emitido", filterable: true },
            { field: "Embarque", title: "Embarque", filterable: true },
            { field: "FechaPeticion", title: "Fecha Peticion", filterable: true },
            { field: "TipoMaterial", title: "Tipo Material", filterable: true },

            //{ command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });

    CustomisaGrid($("#grid"));
}

function eliminarCapturaDetalleSpool(e) {
    e.preventDefault();
    if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var spoolIDRegistro = dataItem.SpoolID;


        windowTemplate = kendo.template($("#windowTemplate").html());

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.ProyeccionBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataItem.Accion = 3;

            if (dataItem.PinturaSpoolID === 0)
            { dataSource.remove(dataItem); }

            dataSource.sync();
            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}