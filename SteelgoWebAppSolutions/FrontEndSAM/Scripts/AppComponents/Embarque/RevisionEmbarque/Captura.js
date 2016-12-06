var EmbarquePlanaID = 0;

IniciarCapturaEmbarqueCarga();
function IniciarCapturaEmbarqueCarga() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGrid();
    opcionHabilitarView(false, "FieldSetView");
    document.title = "Revisión Embarque";
    AjaxCargarProyecto();
    //LlenarPantalla();
};

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
     
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        Llego: { type: "boolean", editable: true },
                        LlegoComentario: { type: "boolean", editable: true },
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
            { field: "NumeroControl", title: "Spool", filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "Paquete", title: "Paquete", filterable: getGridFilterableCellMaftec(), width: "110px" },
            {
                field: "Llego", title: "Llegó", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:90px;"
                    },
                    dataSource: [{ Llego: true }, { Llego: false }]
                }, template: '<input type="checkbox" #= Llego ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            {
                field: "LlegoComentarios", title: "Llego con comentarios", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:150px;"
                    },
                    dataSource: [{ LlegoComentarios: true }, { LlegoComentarios: false }]
                }, template: '<input type="checkbox" #= LlegoComentarios ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            {
                field: "NoLlego", title: "No llegó", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ NoLlego: true }, { NoLlego: false }]
                }, template: '<input type="checkbox" #= NoLlego ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
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

function LlenarPantalla() {
    var emb = [{ EmbarqueID: 0, Nombre: "" }, { EmbarqueID: 1, Nombre: "Emb-4" }];
    var data = [{
        Accion: 1,
        NumeroControl: "X001-011",
        Paquete: "PAQ-X01",
        Llego: false,
        LlegoComentarios: false,
        NoLlego: false,
        Comentario: ""
    }, {
        Accion: 1,
        NumeroControl: "X001-012",
        Paquete: "PAQ-X01",
        Llego: false,
        LlegoComentarios: false,
        NoLlego: false,
        Comentario: ""
    }];

    $("#Embarque").data("kendoComboBox").dataSource.data(emb);
    $("#Embarque").data("kendoComboBox").value(1);

    $("#grid").data("kendoGrid").dataSource.data(data);
    $("#grid").data("kendoGrid").dataSource.sync();
}