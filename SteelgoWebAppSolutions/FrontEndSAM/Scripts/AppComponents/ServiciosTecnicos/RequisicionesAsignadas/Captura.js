function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
    document.title = _dictionary.RequisicionesAsignadas[$("#language").data("kendoDropDownList").value()];
    AjaxObtenerStatus();
};


IniciarRequisicionesAsignadas();

function IniciarRequisicionesAsignadas() {
    SuscribirEventos();
   

    //setTimeout(function () { alert("Hello"); }, 3000);
};

function AgregarStatusDinamicos(listaStatus) {
    document.getElementById("divStatusRequisiciones").innerHTML = "";

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
                        FolioTexto: { type: "string", editable: false },
                        Nombre: { type: "string", editable: false },
                        FechaAsignacion: { type: "date", editable: false },
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
            { field: "FolioTexto", title: _dictionary.RequisicionesAsignadasFolio[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Nombre", title: _dictionary.RequisicionesAsignadasTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "FechaAsignacion", title: _dictionary.RequisicionesAsignadasFecha[$("#language").data("kendoDropDownList").value()], filterable: true, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "Observacion", title: _dictionary.RequisicionesAsignadasObservacion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: VerDetalle }, title: _dictionary.ListaRequisicionVerDetalle[$("#language").data("kendoDropDownList").value()], width: "99px" }
        ]
    });
    CustomisaGrid($("#grid"));
};

