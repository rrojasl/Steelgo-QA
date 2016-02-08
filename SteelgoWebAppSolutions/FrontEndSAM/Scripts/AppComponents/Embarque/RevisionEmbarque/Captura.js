

var EmbarquePlanaID = 0;

function changeLanguageCall() {
    CargarGrid();
    document.title = _dictionary.EmbarqueBotonRevisionEmbarque[$("#language").data("kendoDropDownList").value()];
};

if ($("#inputEmbarqueBuscar").val() != null && $("#inputEmbarqueBuscar").val() != undefined && $("#inputEmbarqueBuscar").val() != "") {
    EmbarquePlanaID = $("#inputEmbarqueBuscar").val();
    setTimeout(function () { ajaxBuscar(); }, 2100);
}
else {
    EmbarquePlanaID = 0;
}


IniciarCapturaEmbarqueCarga();
function IniciarCapturaEmbarqueCarga() {

    SuscribirEventos();

    setTimeout(function () { AjaxCargarPaquetes(); }, 1000);
    setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 2000);
    setTimeout(function () { AjaxCargarEmbarques(); }, 3000);
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
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        Comentario: {type: "string", editable: true},
                        Llego: { type: "boolean", editable: true },
                        NoLlego: { type: "boolean", editable: true },
                        LlegoMas: { type: "boolean", editable: true }
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
            { field: "NumeroControl", title: _dictionary.RevisionEmbarqueGridHeaderSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Paquete", title: _dictionary.RevisionEmbarqueGridHeaderPaqueteID[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Llego", title: _dictionary.RevisionEmbarqueGridHeaderLLego[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input name="Llego"  type="checkbox" #= Llego ? "checked=checked" : "" # class="chkbx"  ></input>  ' },
            { field: "NoLlego", title: _dictionary.RevisionEmbarqueGridHeaderNoLLego[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input name="NoLlego" type="checkbox" #= NoLlego ? "checked=checked" : "" # class="chkbx"  ></input>  ' },
            { field: "LlegoMas", title: _dictionary.RevisionEmbarqueGridHeaderLlegoConComentarios[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input name="LlegoComentarios" type="checkbox" #= LlegoComentarios ? "checked=checked" : "" # class="chkbx"  ></input>  ' },
            { field: "Comentario", title: _dictionary.RevisionEmbarqueGridHeaderComentario[$("#language").data("kendoDropDownList").value()], filterable: true, template: kendo.template('<div  style="height=10px; border: #= LlegoComentarios && (String(Comentario) == ""|| Comentario == null )  ? " 1px solid red" : LlegoComentarios==false  && Comentario == null ? " 1px solid red" : " none" # ; z-index=9999;">#=Comentario==null ?"": Comentario #</div>') },
        ]
    });

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
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

        
       // grid.editable.validatable.validate();
    });


};