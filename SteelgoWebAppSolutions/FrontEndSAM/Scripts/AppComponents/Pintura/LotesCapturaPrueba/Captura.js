IniciarCapturaLotesCapturaReporte();

function IniciarCapturaLotesCapturaReporte() {

   SuscribirEventos();
    //setTimeout(function () { AjaxCargarSistemaPintura(); }, 1000);
    //setTimeout(function () { AjaxCargarLotes(); }, 1100);
}


function changeLanguageCall() {
   CargarGrid();
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {

            schema: {
                model: {
                    fields: {
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        NombreCuadrante: { type: "string", editable: true }
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
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NombreSpool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "NombreCuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "CapturaPrueba", title: _dictionary.columnSeRealizoPrueba[$("#language").data("kendoDropDownList").value()], filterable: false, template: '<input type="checkbox" #= CapturaPrueba ? "checked=checked" : "" # class="chkbx"  ></input>  ' }
        ]
    });
    CustomisaGrid($("#grid"));
}