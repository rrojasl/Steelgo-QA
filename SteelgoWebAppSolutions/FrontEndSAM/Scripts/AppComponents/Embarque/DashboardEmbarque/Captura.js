function changeLanguageCall() {
    //AjaxCargarHeaderDashboard();
    CargarGrid();
    CargarGridCarga();
    document.title = "Dashboard Embarque";
    AjaxCargarProyecto();
}





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
                        NombrePlana: { type: "string", editable: false },
                        Plana: { type: "string", editable: false },
                        M2: { type: "string", editable: false },
                        KG: { type: "string", editable: false },
                        Elementos: { type: "number", editable: false }
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
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Plana", title: "Embarque", filterable: getGridFilterableCellMaftec(), template: " <div class='' style='text-align:center;'><a href='#=URL#'  > <span>#=Plana#</span></a></div> " },
            { field: "NombrePlana", title: "Plana", filterable: getGridFilterableCellMaftec(), },
            { field: "Elementos", title: "Elementos", filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } },
            { field: "M2", title: "KG", filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } },
            { field: "KG", title: "M2", filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } },
        ]
    });
    CustomisaGrid($("#grid"));
};



function CargarGridCarga() {
    $("#gridCarga").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }

        },
        dataSource: {
            data: [
                 {
                     Accion: 1,
                     Proyecto: "ETILENO XXI",
                     Spool: "X001-001",
                     Cuadrante: "ZZ0-001 PT",
                     NombreColor: "",
                     OkPND: true,
                     OkPintura: true,
                     Encintado: false,
                     Etiquetado: true,
                     ModificadoPorUsuario: false,
                     ListaCuadrantes: [{ CuadranteID: 0, Nombre: "" }, { CuadranteID: 1, Nombre: "A1" }, { CuadranteID: 2, Nombre: "A2" }, { CuadranteID: 3, Nombre: "ZZ0-001 PT" }],
                     ListaColoresCinta: [{ ColorCintaID: 0, Nombre: "" }, { ColorCintaID: 1, Nombre: "Verde" }, { ColorCintaID: 2, Nombre: "Amarillo" }, { ColorCintaID: 3, Nombre: "Rojo" }]
                 },
                 {

                     Accion: 2,
                     Proyecto: "ETILENO XXI",
                     Spool: "X001-002",
                     Cuadrante: "A1",
                     NombreColor: "Rojo",
                     OkPND: true,
                     OkPintura: true,
                     Encintado: true,
                     Etiquetado: true,
                     ModificadoPorUsuario: false,
                     ListaCuadrantes: [{ CuadranteID: 0, Nombre: "" }, { CuadranteID: 1, Nombre: "A1" }, { CuadranteID: 2, Nombre: "A2" }, { CuadranteID: 3, Nombre: "ZZ0-001 PT" }],
                     ListaColoresCinta: [{ ColorCintaID: 0, Nombre: "" }, { ColorCintaID: 1, Nombre: "Verde" }, { ColorCintaID: 2, Nombre: "Amarillo" }, { ColorCintaID: 3, Nombre: "Rojo" }]
                 }
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Spool: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        OkPND: { type: "boolean", editable: false },
                        OkPintura: { type: "boolean", editable: false },
                        NombreColor: { type: "string", editable: false },
                        Encintado: { type: "boolean", editable: false },
                        Etiquetado: { type: "boolean", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 3 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Spool", title: _dictionary.columnSpoolIDEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Cuadrante", title: _dictionary.columnCuadranteEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            {
                field: "OkPND", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkPND: true }, { OkPND: false }]
                }, template: "<input name='fullyPaid' class='chk-Lectura' type='checkbox' data-bind='checked: OkPND' #= OkPND ? checked='checked' : '' # disabled/>", width: "70px", attributes: { style: "text-align:center;" }
            },
            {
                field: "OkPintura", title: _dictionary.columnOkPintura[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ OkPintura: true }, { OkPintura: false }]
                }, template: "<input name='fullyPaid' class='chk-Lectura' type='checkbox' data-bind='checked: OkPintura' #= OkPintura ? checked='checked' : '' # disabled/>", width: "80px", attributes: { style: "text-align:center;" }
            },
            { field: "NombreColor", title: _dictionary.columnColorCintaEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },

             {
                 field: "Etiquetado", title: _dictionary.columnEtiquetadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                     multi: true,
                     messages: {
                         isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                         isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                         style: "max-width:100px;"
                     },
                     dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                 }, template: "<input name='fullyPaid' class='chk-Lectura' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' # disabled/>", width: "80px", attributes: { style: "text-align:center;" }
             },
            {
                field: "Encintado", title: _dictionary.columnEncintadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Encintado: true }, { Encintado: false }]
                }, template: "<input name='fullyPaid' class='chk-Encintado' type='checkbox' data-bind='checked: Encintado' #= Encintado ? checked='checked' : '' #/>", width: "80px", attributes: { style: "text-align:center;" }
            }

        ],

    });

    $("#gridCarga .k-grid-content").on("change", "input.chk-Encintado", function (e) {
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#gridCarga").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));

            if ($(this)[0].checked) {
                dataItem.Encintado = true;
                dataItem.ModificadoPorUsuario = true;
            }
            else {
                dataItem.Encintado = false;
                dataItem.NombreColor = "";
                dataItem.ColorID = 0;
                //dataItem.ColorCintaID = 0;
                //dataItem.ColorCinta = "";
                dataItem.ModificadoPorUsuario = true;
            }

            $("#gridCarga").data("kendoGrid").dataSource.sync();
        }
        else {
            if (e.target.checked)
                $("#gridCarga").data("kendoGrid").dataItem($(e.target).closest("tr")).Encintado = false;
            else
                $("#gridCarga").data("kendoGrid").dataItem($(e.target).closest("tr")).Encintado = true;
        }

        $("#gridCarga").data("kendoGrid").dataSource.sync();
    });

    CustomisaGrid($("#gridCarga"));
};