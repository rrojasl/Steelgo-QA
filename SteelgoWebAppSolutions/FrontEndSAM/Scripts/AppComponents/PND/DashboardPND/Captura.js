IniciarDashboardPND();
function IniciarDashboardPND() {
    SuscribirEventos();
    
}

function changeLanguageCall() {
    AjaxCargarHeaderDashboard();
    CargarGrid();
    document.title = _dictionary.menuServiciosTecnicosDashboardPND[$("#language").data("kendoDropDownList").value()];
    
}

function AgregarStatusDinamicos(listaStatus) {
    document.getElementById("divStatusRequisiciones").innerHTML = "";

    for (var i = 0; i < listaStatus.length; i++) {
        $("#divStatusRequisiciones").append("<button  onclick='ActivarRefrescarGrid(" + listaStatus[i].Estatus_DashboardID + ")' id='"
            + listaStatus[i].Estatus_DashboardID + "' class='btn btn-tabList btn-listRequisicion'><span class='porElemento' id='" + listaStatus[i].Estatus_DashboardID + "'>"
            + listaStatus[i].Descripcion + " </span><span  class='porElemento'  id='" + listaStatus[i].NumeroElementos + "'>" + listaStatus[i].NumeroElementos
            + "</span><span class='porRequisicion' style='display:none;' id='" + listaStatus[i].Estatus_DashboardID + "'>" + listaStatus[i].Descripcion +
            " </span><span class='porRequisicion' style='display:none;  id='" + listaStatus[i].NumeroRequisiciones + "'>" + listaStatus[i].NumeroRequisiciones + "</span></button>");
        if (i == 0) {
            //AjaxAccionesListado(listaStatus[i].Estatus_DashboardID);
            $("#" + listaStatus[i].Estatus_DashboardID).addClass("active");
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
                        TipoPrueba: { type: "string", editable: false },
                        Requisicion: { type: "string", editable: false },
                        FechaAsignacion: { type: "date", editable: false },
                        ElementosRequisicion: { type: "string", editable: false },
                        Proveedor: { type: "string", editable: false },
                        Equipo: { type: "string", editable: false },
                        Turno: { type: "string", editable: false },
                    }
                }
            },
            pageSize: 10,
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
            pageSizes: [10, 25, 50,100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "TipoPrueba", title: _dictionary.columnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Requisicion", title: _dictionary.columnRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Fecha", title: _dictionary.lblFechaRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true, format: _dictionary.FormatoFecha2[$("#language").data("kendoDropDownList").value()] },
            { field: "ElementosRequisicion", title: _dictionary.columnJuntas[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Proveedor", title: _dictionary.columnProveedor[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Equipo", title: _dictionary.columnEquipo[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Turno", title: _dictionary.columnTurnoLaboral[$("#language").data("kendoDropDownList").value()], filterable: true },
            
        ]
    });
    CustomisaGrid($("#grid"));
};
