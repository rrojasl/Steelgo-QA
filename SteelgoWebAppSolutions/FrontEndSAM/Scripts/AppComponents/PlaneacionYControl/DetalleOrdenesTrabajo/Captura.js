function changeLanguageCall() {
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
                { Proyeccion: "Proyeccion 1", Proyecto: "X", OrdenTrabajo: "001" },
                { Proyeccion: "Proyeccion 2", Proyecto: "X", OrdenTrabajo: "002" }
            ],
            schema: {
                model: {
                    fields: {
                        Proyeccion: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        OrdenTrabajo: { type: "string", editable: true }, 
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
        detailTemplate: kendo.template($("#templateGridDetalleOrdenTrabajo").html()),
        detailInit: RenderGridDetalleOrdenTrabajo,
        columns: [
            { field: "Proyeccion", title: "Proyeccion", filterable: true },
            { field: "Proyecto", title: "Proyecto", filterable: true },
            { field: "OrdenTrabajo", title: "Orden de Trabajo", filterable: true },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });

    CustomisaGrid($("#grid"));
}

function eliminarCaptura(e) {
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

function eliminarCaptura(e) {
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