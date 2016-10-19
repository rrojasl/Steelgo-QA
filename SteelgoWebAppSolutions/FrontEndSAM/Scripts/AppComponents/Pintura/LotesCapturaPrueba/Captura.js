IniciarCapturaLotesCapturaReporte();

function IniciarCapturaLotesCapturaReporte() {

   SuscribirEventos();
    //setTimeout(function () { AjaxCargarSistemaPintura(); }, 1000);
    //setTimeout(function () { AjaxCargarLotes(); }, 1100);
}


function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUp();
    llenarCombo();
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                   {
                       Accion: 1,
                       NombreSpool: "X001-001",
                       SistemaPintura: "18.1",
                       Color: "AMARILLO",
                       M2: "200",
                       PruebasReq: 5,
                       PruebasEjec: 2,
                       NombreCuadrante: "A1",
                       CapturaPrueba: "Ver Prueba"
                   }
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        M2: { type: "String", editable: false },
                        PruebasReq: { type: "number", editable: false },
                        PruebasEjec: { type: "number", editable: false },
                        NombreCuadrante: { type: "string", editable: false },
                        CapturaPrueba: { type: "string", editable: false }
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
            //{ field: "PruebasReq", title: "# Pruebas Req", filterable: getGridFilterableCellMaftec(), width: "150px"  },
            //{ field: "PruebasEjec", title: "# Pruebas Ejec", filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "NombreCuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "CapturaPrueba", title: _dictionary.columnSeRealizoPrueba[$("#language").data("kendoDropDownList").value()], filterable: false, template: "<div class='EnlaceDetallePrueba' style='text-align:center;'><a href='\\#'  > <span>#=CapturaPrueba#</span></a></div>", filterable: false, width: "190px" }
        ]
    });
    CustomisaGrid($("#grid"));
}

function CargarGridPopUp() {
    $("#gridPopUp").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                {
                    Accion: 1,
                    Prueba: "Adherencia",
                    UnidadMedida: "PLG",
                    ValorUnidadMedida: 5,
                    Aprobado: false
                },
                {
                    Accion: 1,
                    Prueba: "Adherencia",
                    UnidadMedida: "PLG",
                    ValorUnidadMedida: 2,
                    Aprobado: true
                }
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        Prueba: { type: "string", editable: false },
                        UnidadMedida: { type: "string", editable: false },
                        ValorUnidadMedida: { type: "number", editable: false },
                        Aprobado: { type: "boolean", editable: false }
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 }
                ]
            },
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        columns: [
                { field: "Prueba", title: _dictionary.lblPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "20px" },
                { field: "UnidadMedida", title: "U. Medida", filterable: getGridFilterableCellMaftec(), width: "20px" },
                { field: "ValorUnidadMedida", title: "Valor U. Medida", filterable: getGridFilterableCellNumberMaftec(), width: "20px", attributes: { style: "text-align:right;" } },
                { field: "Aprobado", title: "Aprobado", filterable: getGridFilterableCellNumberMaftec(), width: "20px" },
                { command: { text: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "10px", attributes: { style: "text-align:center;" } },
                { command: { text: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "10px", attributes: { style: "text-align:center;" } }
        ],
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUp"));
};

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

              

                //$("#inputProyecto").data("kendoComboBox").dataSource.data([]);
                //$("#inputProyecto").data("kendoComboBox").dataSource.data(p);
                //$("#inputProyecto").data("kendoComboBox").value(16);
                //$("#inputProyecto").data("kendoComboBox").trigger('changes');

                $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
                $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(sp);

                $("#inputLote").data("kendoComboBox").dataSource.data([]);
                $("#inputLote").data("kendoComboBox").dataSource.data(l);


}

function LlenarGridPopUp() {
    //$("#gridPopUp").data('kendoGrid').dataSource.data([]);
    //var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    //var array = data;
    //for (var i = 0; i < array.length; i++) {
    //    ds.add(array[i]);
    //}
    VentanaModal();
}

function VentanaModal() {
    var modalTitle = "Detalle";
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        actions: [
            "Close"
        ],
        close: function onClose(e) {
            var gridDataSource = $("#gridPopUp").data("kendoGrid").dataSource;
          //  gridDataSource.filter([]);
        }
    }).data("kendoWindow");
    window.data("kendoWindow").center().open();

};