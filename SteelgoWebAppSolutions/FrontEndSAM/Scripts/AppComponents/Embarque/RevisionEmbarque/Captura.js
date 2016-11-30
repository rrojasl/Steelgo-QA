

var EmbarquePlanaID = 0;

function changeLanguageCall() {
    CargarGrid();
    opcionHabilitarView(false, "FieldSetView");
    document.title = "Revisión Embarque";
};

IniciarCapturaEmbarqueCarga();
function IniciarCapturaEmbarqueCarga() {
    SuscribirEventos();
}

function validarInformacion(row) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {

        if (ds._data[i]["NumeroControl"] == row.NumeroControl) {
            existe = true;
            break;
        }
    }
    return existe;
}

function CargarGrid() {

    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

                this.closeCell();
            }
        },
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        Llego: { type: "boolean", editable: true },
                        LlegoConComentarios: { type: "boolean", editable: true },
                        NoLlego: { type: "boolean", editable: true },
                        Comentario: { type: "string", editable: true }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,        
        editable: false,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: "Spool", filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "Paquete", title: "Paquete", filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "Llego", title: "Llegó", filterable: getGridFilterableCellMaftec(), template: '<input name="Llego"  type="checkbox" #= Llego ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "140px" },
            { field: "LlegoConComentarios", title: "Llego con comentarios", filterable: getGridFilterableCellMaftec(), template: '<input name="LlegoComentarios" type="checkbox" #= LlegoComentarios ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "150px" },
            { field: "NoLlego", title: "No llegó", filterable: getGridFilterableCellMaftec(), template: '<input name="NoLlego" type="checkbox" #= NoLlego ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "140px" },
            { field: "Comentario", title: "Comentario", filterable: getGridFilterableCellMaftec(), template: kendo.template('<div  style="height=10px; border: #= LlegoComentarios && (String(Comentario) == ""|| Comentario == null )  ? " 1px solid red" : LlegoComentarios==false  && Comentario == null ? " 1px solid red" : " none" # ; z-index=9999;">#=Comentario==null ?"": Comentario #</div>'), width: "140px" },
        ]
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid"),
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                //dataItem.set(this.name, this.checked);

                switch (this.name) {
                    case 'Llego':
                        dataItem.set("Llego", this.checked);
                        dataItem.set("NoLlego", false);
                        dataItem.set("LlegoComentarios", false);
                        dataItem.Comentario = "";
                        break;
                    case 'NoLlego':
                        dataItem.set("Llego", false);
                        dataItem.set("NoLlego", this.checked);
                        dataItem.set("LlegoComentarios", false);
                        dataItem.Comentario = "";
                        break;
                    case 'LlegoComentarios':
                        dataItem.set("Llego", false);
                        dataItem.set("NoLlego", false);
                        dataItem.set("LlegoComentarios", this.checked);
                        break;
                }
                grid.dataSource.sync();
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
                var grid = $("#grid").data("kendoGrid"),
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                //dataItem.set(this.name, this.checked);

                switch (this.name) {
                    case 'Llego':
                        dataItem.set("Llego", this.checked);
                        dataItem.set("NoLlego", false);
                        dataItem.set("LlegoComentarios", false);
                        break;
                    case 'NoLlego':
                        dataItem.set("Llego", false);
                        dataItem.set("NoLlego", this.checked);
                        dataItem.set("LlegoComentarios", false);
                        break;
                    case 'LlegoComentarios':
                        dataItem.set("Llego", false);
                        dataItem.set("NoLlego", false);
                        dataItem.set("LlegoComentarios", this.checked);
                        break;
                }
                grid.dataSource.sync();
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


};