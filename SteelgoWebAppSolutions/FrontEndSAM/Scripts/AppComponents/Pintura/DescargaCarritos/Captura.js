
var editado = false;

SuscribirEventos();

function changeLanguageCall() {
    //SiguienteProceso(paramReq);
    CargarGrid();
    AjaxCargarCamposPredeterminados();
}

function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function SiguienteProceso(paramReq) {
    var url = "";
    if (paramReq == null) {
        url = "/PND/CapturaReporteRT?leng=" + $("#language").data("kendoDropDownList").value();
    } else {
        url = "/PND/CapturaReporteRT?leng=" + $("#language").data("kendoDropDownList").value()
            + "&requisicion=" + paramReq;
    }

    $("#EntregaresultadosSup").attr("href", url);
    $("#EntregaresultadosINF").attr("href", url);
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        edit: function (e) {
           var inputName = e.container.find('input');
                inputName.select();
            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataSource: {
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
            { field: "NombreCuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxCuadrante }
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




function SustituirListaCuadranteGrid(listaCuadrante) {
    for (var i = 0; i < $("#grid").data('kendoGrid').dataSource._data.length; i++) {
        $("#grid").data('kendoGrid').dataSource._data[i].ListaCuandrantes = listaCuadrante;
    }
    $("#grid").data('kendoGrid').dataSource.sync();
};


function PlanchaCuadrante() {
    if ($("#inputCuadrante").val() != "") {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        if ($("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()) != undefined && $("#inputCuadrante").data("kendoComboBox").dataItem($("#inputCuadrante").data("kendoComboBox").select()).CuadranteID != 0) {
            for (var i = 0; i < data.length; i++) {
                if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                    //data[i].NombreCuadrante = $("#inputCuadrante").data("kendoComboBox").text();
                }

                else {
                    if (data[i].NombreCuadrante == "") {
                      //  data[i].NombreCuadrante = $("#inputCuadrante").data("kendoComboBox").text();
                    }
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

