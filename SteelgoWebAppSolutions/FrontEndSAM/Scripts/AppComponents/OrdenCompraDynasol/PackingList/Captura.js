var modeloRenglon;

function changeLanguageCall() {
    CargarGrid();

    inicio();
};


function inicio() {
    SuscribirEventos();
}


function CargarGrid() {

    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {

                        Rev: { type: "string", editable: false },
                        Descripcion: { type: "string", editable: false },
                        MaterialNorma: { type: "string", editable: false },
                        Diametro1: { type: "string", editable: false },
                        Diametro2: { type: "string", editable: false },
                        Registro: { type: "string", editable: false },
                        Rating: { type: "string", editable: false },
                        PreparacionExtremos: { type: "string", editable: false },
                        Neodata: { type: "string", editable: false },
                        Cant: { type: "string", editable: false },
                        PrecioUnidad: { type: "string", editable: false },
                        Total: { type: "string", editable: false },
                        PackingList: { type: "string", editable: true },
                        Partida: { type: "string", editable: true },
                        Coladas: { type: "string", editable: false },
                        Agregar: { type: "boolean", editable: false }

                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 4 }
                ]
            },
        },
        edit: function (e) {
            setTimeout(function () {
                var inputName = e.container.find('input');

                inputName.select();
            });
            if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            };
        },
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
            { field: "Rev", title: "Rev", filterable: getGridFilterableCellMaftec(), width: "50px" },
            { field: "Descripcion", title: "Descripción", filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "MaterialNorma", title: "Material/ Norma", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Diametro1", title: "D1", filterable: getGridFilterableCellMaftec(), width: "40px" },
            { field: "Diametro2", title: "D2", filterable: getGridFilterableCellMaftec(), width: "40px" },
            { field: "Registro", title: "Schedule", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Rating", title: "Rating", filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "PreparacionExtremos", title: "Prep. ext.", filterable: getGridFilterableCellMaftec(), width: "70px" },
            //{ field: "Neodata", title: "Neodata", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Cant", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "60px" },
            { field: "PrecioUnidad", title: "Precio U.", filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "Total", title: "Total", filterable: getGridFilterableCellMaftec(), width: "70px" },
            //{ field: "PackingList", title: "Packing List", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Partida", title: "Partida", filterable: getGridFilterableCellMaftec(), width: "100px" },
            {
                field: "Agregar", title: _dictionary.columnAgregar[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },

                }, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: Agregar' #= Agregar ? checked='checked' : '' # />", width: "112px", attributes: { style: "text-align:center;" }
            },


        ],

        editable: true,
        navigatable: true,
        dataBound: function (a) {
            $(".ob-paid").bind("change", function (e) {
                if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                    var grid = $("#grid").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (e.target.checked == true)
                        dataItem.Agregar = true;
                    else
                        dataItem.Agregar = false;
                }
                else {
                    if (e.target.checked) {
                        e.target.checked = false;
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Agregar = false;
                    }
                    else {
                        e.target.checked = true;
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Agregar = true;
                    }
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            });
        }
    });



    CustomisaGrid($("#grid")); 5
};