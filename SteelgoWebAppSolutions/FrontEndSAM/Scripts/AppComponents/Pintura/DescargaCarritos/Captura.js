IniciarCapturaPinturaDescarga();
function IniciarCapturaPinturaDescarga() {
    SuscribirEventos();
    //setTimeout(function () { AjaxCargarCuadrante(0); }, 2400);
    //setTimeout(function () { AjaxCargarCarrosCargados(); }, 1500);

}

function changeLanguageCall() {
    CargarGrid();
 llenarCombo();


    //document.title = _dictionary.PinturaHeaderDescargaCarroPintura[$("#language").data("kendoDropDownList").value()];
}


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{
                Accion:1,
                NombreSpool: "X001-01",
                SistemaPintura:"18.1",
                Color: "Amarillo",
                M2:"40 m2",
                NombreCuadrante:"ZZ0-01"
            },
            {
                Accion: 1,
                NombreSpool: "X001-016",
                SistemaPintura: "A1",
                Color: "Cafe",
                M2: "60 m2",
                NombreCuadrante: "E-01"
            }
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        M2:{type:"String",editable:false},
                        NombreCuadrante: { type: "string", editable: true }
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
            pageSizes: [10, 25, 50, 100],
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
            //{ field: "CapturaPrueba", title: _dictionary.columnSeRealizoPrueba[$("#language").data("kendoDropDownList").value()], filterable: false, template: '<input type="checkbox" #= CapturaPrueba ? "checked=checked" : "" # class="chkbx"  ></input>  ' }
           { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaPatio }, title: _dictionary.columnDescargar1[$("#language").data("kendoDropDownList").value()], width: "100px", attributes: { style: "text-align:center;" } }

        ]


    });
    CustomisaGrid($("#grid"));
}


function llenarCombo() {
    //var data = [{Accion: 1, }]

    var c = [
             { MedioTransporteID: 0, NombreMedioTransporte: "" },
             { MedioTransporteID: 1, NombreMedioTransporte: "Carro-1" },
             { MedioTransporteID: 2, NombreMedioTransporte: "Carro-Prueba" },
    ];

    var sp = [
        { SistemaPinturaID: 0, Nombre: "" },
        { SistemaPinturaID: 1, Nombre: "A1" },
        { SistemaPinturaID: 2, Nombre: "A2" },
        { SistemaPinturaID: 3, Nombre: "18.1" },
    ];

    $("#inputCarro").data("kendoComboBox").dataSource.data([]);
    $("#inputCarro").data("kendoComboBox").dataSource.data(c);
    $("#inputCarro").data("kendoComboBox").value(1);
    $("#inputCarro").data("kendoComboBox").trigger('changes');
    

    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(sp);

}






function VentanaModalDescargarMedioTransporte(e) {
    e.preventDefault();
    if ($("#botonGuardar2").text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        currentDataItemGridDownload = this.dataItem($(e.currentTarget).closest("tr"));

        win = $("#windowDownload").kendoWindow({
            modal: true,
            title: "",
            resizable: false,
            visible: true,
            width: "20%",
            minWidth: 30,
            position: {
                top: "1%",
                left: "1%"
            },
            animation: {
                close: false,
                open: false
            },
            actions: [
                "Close"
            ],
        }).data("kendoWindow");

        $("#windowDownload").data("kendoWindow").center().open();

        $("#inputCuadrantePopup").data("kendoComboBox").value(currentDataItemGridDownload.CuadranteID);
    }

};

function PlanchaCuadrante() {
    if ($("#inputCuadrante").val() != "") {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        for (var i = 0; i < data.length; i++) {
            data[i].CuadranteID = $("#inputCuadrante").val();
            data[i].Cuadrante = $("#inputCuadrante").data("kendoComboBox").text();
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }
}


function eliminarCapturaPatio(e)
{
}