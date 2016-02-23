var ReporteIDConsecutivo;

function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
    document.title = _dictionary.lblImpresionPruebas[$("#language").data("kendoDropDownList").value()];
};

IniciarImpresionPruebas();
function IniciarImpresionPruebas() {


    SuscribirEventos();
    setTimeout(function () { AjaxCargarDatos(); }, 1000);


}

function JuntasSeleccionadasConIDUnico(arregloJuntas) {
    //arregloJuntas[index].Seleccionado
    //arregloJuntas[index].ReporteID
    var cantidadJuntasSeleccionadasDiferentes = 0, cantidadJuntasSeleccionadas, IdReporteMaximo = 0;

    for (index = 0; index < arregloJuntas.length; index++) {
       
        if (arregloJuntas[index].Seleccionado) {

            for (var j = 0; j < arregloJuntas.length; j++) {
                if (arregloJuntas[index].ReporteID != null && arregloJuntas[j].Seleccionado && arregloJuntas[index].ReporteID != arregloJuntas[j].ReporteID && arregloJuntas[j].ReporteID != null) {
                    cantidadJuntasSeleccionadasDiferentes++;
                }
            }
        }
    }

    if (cantidadJuntasSeleccionadasDiferentes == 0) {

        return true;

    }
    return false;
}



function AsignarIDUnicoXJuntaSeleccionada(arregloJuntas) {
    var IDReporteSeleccionado;
    var cantidadJuntasSeleccionadasVacias = 0, cantidadJuntasSeleccionadasAsignadas = 0;

    for (a = 0; a < arregloJuntas.length; a++) {
        if (arregloJuntas[a].Seleccionado && (arregloJuntas[a].ReporteID == null || arregloJuntas[a].ReporteID == undefined)) {           
            cantidadJuntasSeleccionadasVacias++;
        }
    }

    for (a = 0; a < arregloJuntas.length; a++) {
        if (arregloJuntas[a].Seleccionado && (arregloJuntas[a].ReporteID != null || arregloJuntas[a].ReporteID != undefined)) {
            cantidadJuntasSeleccionadasAsignadas++;
        }
    }

    if (cantidadJuntasSeleccionadasAsignadas == 0) {
        //caso 1 solo es un registro y es nuevo

        if (cantidadJuntasSeleccionadasVacias == 1) {
            for (a = 0; a < arregloJuntas.length; a++) {
                if (arregloJuntas[a].Seleccionado && (arregloJuntas[a].ReporteID == null || arregloJuntas[a].ReporteID == undefined)) {
                    arregloJuntas[a].Status = 'N'
                }
            }
        } else if (cantidadJuntasSeleccionadasVacias > 1) {
            for (a = 0; a < arregloJuntas.length; a++) {
                if (arregloJuntas[a].Seleccionado && (arregloJuntas[a].ReporteID == null || arregloJuntas[a].ReporteID == undefined)) {
                    arregloJuntas[a].Status = 'NR'
                }
            }

        }
    }
    else {
        for (a = 0; a < arregloJuntas.length; a++) {
            if (arregloJuntas[a].Seleccionado && (arregloJuntas[a].ReporteID != null || arregloJuntas[a].ReporteID != undefined)) {
                for (var i = 0; i < arregloJuntas.length; i++) {
                    if (arregloJuntas[i].Seleccionado && (arregloJuntas[i].ReporteID == null || arregloJuntas[i].ReporteID == undefined)) {
                        arregloJuntas[i].ReporteID = arregloJuntas[a].ReporteID;
                    }
                }
            }
        }
    }

    return true;
}

function CargarGrid() { 
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        RequisicionPruebaElementoID: { type: "int", editable: false },
                        SpoolJunta: { type: "string", editable: false },
                        NumeroPruebas: { type: "number", editable: false },
                        Clave: { type: "string", editable: false },
                        Nombre: { type: "string", editable: false },
                        ReporteID: { type: "string", editable: false }
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
            { field: "SpoolJunta", title: _dictionary.ImpresionPruebasSpoolJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "NumeroPruebas", title: _dictionary.ImpresionPruebasCantidadPruebas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Clave", title: _dictionary.ImpresionPruebasTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
             { field: "Nombre", title: _dictionary.ImpresionPruebasNombrePrueba[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
             { field: "ReporteID", title: _dictionary.ImpresionPruebasReporteID[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
             { field: "Seleccionado", title: _dictionary.ImpresionPruebasSeleccionado[$("#language").data("kendoDropDownList").value()], filterable: false, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "130px" },
        ]
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        dataItem.set("Seleccionado", this.checked);
    });
};

