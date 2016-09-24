

var EmbarquePlanaID = 0;

function changeLanguageCall() {
    CargarGrid();
    opcionHabilitarView(false, "FieldSetView");
    $("#inputEmbarqueBuscar").data("kendoComboBox").value("");
    document.title = "Revisión Embarque";
    //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
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

    //setTimeout(function () { AjaxCargarPaquetes(); }, 1000);
    //setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 2000);
    //setTimeout(function () { AjaxCargarEmbarques(); }, 3000);
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
                        Comentario: { type: "string", editable: true },
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
            { field: "NumeroControl", title: "Spool",filterable: true, width: "140px" },
            { field: "Paquete", title: "Paquete", filterable: true, width: "140px" },
            { field: "Llego", title: "Llegó",filterable: true, template: '<input name="Llego"  type="checkbox" #= Llego ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "140px" },
            { field: "NoLlego", title: "No llegó",filterable: true, template: '<input name="NoLlego" type="checkbox" #= NoLlego ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "140px" },
            { field: "LlegoMas", title: "Llego más",filterable: true, template: '<input name="LlegoComentarios" type="checkbox" #= LlegoComentarios ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "140px" },
            { field: "Comentario", title: "Comentario",filterable: true, template: kendo.template('<div  style="height=10px; border: #= LlegoComentarios && (String(Comentario) == ""|| Comentario == null )  ? " 1px solid red" : LlegoComentarios==false  && Comentario == null ? " 1px solid red" : " none" # ; z-index=9999;">#=Comentario==null ?"": Comentario #</div>'), width: "140px" },
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


        // grid.editable.validatable.validate();
    });


};