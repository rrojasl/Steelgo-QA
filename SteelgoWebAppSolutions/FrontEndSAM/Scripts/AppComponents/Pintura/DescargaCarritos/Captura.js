IniciarCapturaPinturaDescarga();
var modificado = false;

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



//parametros para el grid 
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        edit: function (e) {

                var inputName = e.container.find('input');
                inputName.select();


            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();

            }
            else {
                modificado = true;
            }
        },
        dataSource: {
            data: [
            ],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        M2: { type: "String", editable: false },
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
            { field: "NombreCuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxCuadrante },
            //{ field: "CapturaPrueba", title: _dictionary.columnSeRealizoPrueba[$("#language").data("kendoDropDownList").value()], filterable: false, template: '<input type="checkbox" #= CapturaPrueba ? "checked=checked" : "" # class="chkbx"  ></input>  ' }
           //{ command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaPatio }, title: _dictionary.columnDescargar1[$("#language").data("kendoDropDownList").value()], width: "100px", attributes: { style: "text-align:center;" } }

        ],
        dataBound: function () {
            var grid = $("#grid").data("kendoGrid");
            var gridData = grid.dataSource.view();

            for (var i = 0; i < gridData.length; i++) {
                var currentUid = gridData[i].uid;
                if (gridData[i].RowOk == false) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffcccc");
                }
                else if (gridData[i].RowOk) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffffff");
                }
            }
        }


    });
    CustomisaGrid($("#grid"));
}
//parametros para el grid 




//SuscribirEventoCarro() muestra nuevos grids 
function CambiarDetalleGridPorIDCarroSeleccionado(idCarro) {
    switch (idCarro) {

        case 0:

            $("#grid").data('kendoGrid').dataSource.data([]);

            break;

        case 1:
            var array = [{
                RowOk:true,
                Accion: 2,
                NombreSpool: "X002-002",
                SistemaPintura: "A4",
                Color: "ALUMINIO",
                M2: 4.12,
                NombreCuadrante: "Comdistral"
            }];

            $("#grid").data('kendoGrid').dataSource.data(array);
            break;
        case 2:
            var array2 = [
        {
            Accion: 2,
            NombreSpool: "X002-004",
            SistemaPintura: "A5",
            Color: "AZUL",
            M2: 0.63,
            NombreCuadrante: "Comdistral"
        }];

            $("#grid").data('kendoGrid').dataSource.data(array2);

            break;


    }
    $("#grid").data('kendoGrid').dataSource.sync();
};
//SuscribirEventoCarro() 







//SuscribirEventoSistemaPintura()
function cambiarOpcionesCuadranteComboBox(idZona) {
    switch (idZona) {

        case 0:

            $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);

            break;

        case 1:

            AjaxCargarCuadrante(1);

            break;

        case 2:

           

            AjaxCargarCuadrante(2);

           
           
            break;


    }

};
//SuscribirEventoSistemaPintura()



function SustituirListaCuadranteGrid(listaCuadrante) {
    for (var i = 0; i < $("#grid").data('kendoGrid').dataSource._data.length; i++) {
        $("#grid").data('kendoGrid').dataSource._data[i].ListaCuandrantes = listaCuadrante;
    }
    $("#grid").data('kendoGrid').dataSource.sync();
};






//carga los datos de SuscribirEventoCarro()
function llenarCombo() {

    var llenaCarro = [
             { MedioTransporteID: 0, NombreMedioTransporte: "" },
             { MedioTransporteID: 1, NombreMedioTransporte: "carro 670" },
             { MedioTransporteID: 2, NombreMedioTransporte: "carro 680" }
    ];

    $("#inputCarro").data("kendoComboBox").dataSource.data([]); //limpia elementos 
    $("#inputCarro").data("kendoComboBox").dataSource.data(llenaCarro); //llena carro opciones con arreglo 

    $("#inputCarro").data("kendoComboBox").value(1); //Elemento del arreglo posicion 
    //$("#inputCarro").data("kendoComboBox").trigger('change');  //Activa llena el Grid como cambio manual 
    $("#btnBuscar").trigger('click');

    var llenaZonas = [
    { ZonaID: 0, Nombre: "" },
    { ZonaID: 1, Nombre: "Zona 1" },
    { ZonaID: 2, Nombre: "Zona 2" }
    ];


    $("#inputZona").data("kendoComboBox").dataSource.data([]);
    $("#inputZona").data("kendoComboBox").dataSource.data(llenaZonas);

}
//carga los datos de SuscribirEventoCarro()











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

        console.log("validaPlancha");

        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;



        if ($("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()) != undefined && $("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()).CuadranteID != 0) {
            for (var i = 0; i < data.length; i++) {
                if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                    console.log("--");
                    data[i].NombreCuadrante = $("#inputCuadrante").data("kendoComboBox").text();
                }

                else {
                    if (data[i].NombreCuadrante == "") {
                        data[i].NombreCuadrante = $("#inputCuadrante").data("kendoComboBox").text();
                    }
                }

            }
        }
    }



    $("#grid").data("kendoGrid").dataSource.sync();

}









function eliminarCapturaPatio(e) {
}




