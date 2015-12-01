function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};


IniciarRequisicionesAsignadas();

function IniciarRequisicionesAsignadas() {
    SuscribirEventos();
    AjaxObtenerStatus();
    
    //setTimeout(function () { alert("Hello"); }, 3000);
};

function AgregarStatusDinamicos(listaStatus) {
    for (var i = 0; i < listaStatus.length; i++) {
        $("#divStatusRequisiciones").append("<button onclick='ActivarRefrescarGrid(" + listaStatus[i].EstatusID + ")' id='" + listaStatus[i].EstatusID + "' class='btn btn-tabList'><span id='" + listaStatus[i].EstatusID + "'>" + listaStatus[i].Estatus + " </span><span id='" + listaStatus[i].CantidadRegistros + "'>" + listaStatus[i].CantidadRegistros + "</span></button>");
        if (i == 0) {
            AjaxAccionesListado(listaStatus[i].EstatusID);
            $("#" + listaStatus[i].EstatusID).addClass("active");
        }
    }
}

function VerDetalle(e) {
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    document.location.target = "_blank";
    document.location.href = "/serviciostecnicos/CapturaReportePruebas?id=" + dataItem.Folio;
};

function tabActivo(idButton) {
    $(".btn-tabList").removeClass("active");
    var list = document.getElementById("divStatusRequisiciones").getElementsByTagName("button");

    for (var i = 0; i < list.length; i++) {
        if (list[i].id == idButton) {
            $("#" + idButton).addClass("active");
            break;
        }
    }
};

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Folio: { type: "int", editable: false },
                        Clave: { type: "string", editable: false },
                        FechaAsignacion: { type: "string", editable: false },
                        Observacion: { type: "string", editable: false }
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
            { field: "Folio", title: "Folio", filterable: true },
            { field: "Clave", title: "Tipo Prueba", filterable: true },
            { field: "FechaAsignacion", title: "Fecha", filterable: true },
            { field: "Observacion", title: "Observación", filterable: true },
            { command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: VerDetalle }, title: _dictionary.ListaRequisicionVerDetalle[$("#language").data("kendoDropDownList").value()], width: "99px" }
        ]
    });
};

