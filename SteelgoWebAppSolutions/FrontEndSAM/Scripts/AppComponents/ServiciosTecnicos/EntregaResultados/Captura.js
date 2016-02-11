function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
    document.title = _dictionary.EntregaResultadosHeader[$("#language").data("kendoDropDownList").value()];
    AjaxCargarEntregaResultados();
};

IniciarEntregaResultados();

function IniciarEntregaResultados() {
    SuscribirEventos();
   setTimeout(function () { AjaxCargarEntregaResultados() }, 1000);
    
};

function CargarGrid() {

    $("#grid").kendoGrid({
        autoBind: true,
        edit: function (e) {

            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataSource: {
            schema: {
                model: {
                    fields: {
                        DatosJunta: { type: "int", editable: false },
                        FOLIO: { type: "string", editable: false },
                        DESCRIPCION: { type: "string", editable: false },
                        RECIBIDO: { type: "boolean" },
                        CONDICIONESFISICAS: { type: "string", editable: true },
                        DEFECTOS: { type: "string", editable: true  }
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
        editable:true,
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
            { field: "FOLIO", title: _dictionary.ServiciosTecnicosFolio[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Junta", title: _dictionary.ServiciosDatosJunta[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "DESCRIPCION", title:  _dictionary.ServiciosTecnicosDescripcion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "RECIBIDO", title:  _dictionary.ServiciosTecnicosRECIBIDO[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input type="checkbox" #= RECIBIDO ? "checked=checked" : "" # class="chkbx"  ></input>' },
            { field: "CONDICIONESFISICAS", title: _dictionary.ServiciosTecnicosCondicionesFisicas[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxCondicionFisica, filterable: true},
            { field: "DEFECTOS", title:  _dictionary.ServiciosTecnicosDefectos[$("#language").data("kendoDropDownList").value()],editor: RenderComboBoxDefectos, filterable: true} //editor: RenderComboBoxDefectos,
        ]
    });

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {

        if ($("#language").val() == "es-MX") {
            if ($('#botonGuardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.ConCinta = true;
                }
                else {
                    dataItem.ConCinta = false;
                    dataItem.ColorCintaID = 0;
                    dataItem.ColorCinta = "";
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
            if ($('#botonGuardar').text() != "Edit") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.ConCinta = true;
                }
                else {
                    dataItem.ConCinta = false;
                    dataItem.ColorCintaID = 0;
                    dataItem.ColorCinta = "";
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




        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        dataItem.set("RECIBIDO", this.checked);

        
    });
};



