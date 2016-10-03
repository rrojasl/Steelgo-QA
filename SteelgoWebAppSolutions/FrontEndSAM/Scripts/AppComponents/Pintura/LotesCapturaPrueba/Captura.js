IniciarCapturaLotesCapturaReporte();

function IniciarCapturaLotesCapturaReporte() {

   SuscribirEventos();
    //setTimeout(function () { AjaxCargarSistemaPintura(); }, 1000);
    //setTimeout(function () { AjaxCargarLotes(); }, 1100);
}


function changeLanguageCall() {
    CargarGrid();
    llenarCombo();
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                //{
                //    Accion: 1,
                //    NombreSpool: "X001-014",
                //    SistemaPintura: "A1",
                //    Color: "Alumninio",
                //    M2:"12 m2",
                //    NombreCuadrante:"ZZ0-12"
                //}
                   
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        M2:{type:"String",editable:false},
                        NombreCuadrante: { type: "string", editable: false}
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
        filterable: {
            extra: false
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25,50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NombreSpool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], width: "150px", filterable: getGridFilterableCellMaftec() },
            { field: "M2", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" } },
            { field: "NombreCuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "CapturaPrueba", title: _dictionary.columnSeRealizoPrueba[$("#language").data("kendoDropDownList").value()], filterable: false, template: '<input type="checkbox" #= CapturaPrueba ? "checked=checked" : "" # class="chkbx"  ></input>  ' }
        ]
    });
    CustomisaGrid($("#grid"));
}


function llenarCombo() {
               var p = [
                        { Proyecto: 0, Nombre: "" },
                        { Proyecto: 16, Nombre: "ETILENO XXI" },
                ];

                var sp = [
                    { SistPintID: 0, Nombre: "" },
                    { SistPintID: 1, Nombre: "A1" },
                    { SistPintID: 2, Nombre: "A2" },
                    { SistPintID: 3, Nombre: "18.1" },
                ];
                var l = [
                         { LotePinturaID: 0, NumeroLote: "" },
                         { LotePinturaID: 1, NumeroLote: "1/33" },
                         { LotePinturaID: 2, NumeroLote: "12" },
                         { LotePinturaID: 3, NumeroLote: "123/23" },
                ];

              

                $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
                $("#inputProyecto").data("kendoComboBox").dataSource.data(p);
                $("#inputProyecto").data("kendoComboBox").value(16);
                $("#inputProyecto").data("kendoComboBox").trigger('changes');

                $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
                $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(sp);

                $("#inputLote").data("kendoComboBox").dataSource.data([]);
                $("#inputLote").data("kendoComboBox").dataSource.data(l);


                }