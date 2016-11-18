﻿function changeLanguageCall() {
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    //$("#Area").data("kendoComboBox").value("");
    // $("#Cuadrante").data("kendoComboBox").value("");
    //AjaxCargarArea();
    //document.title = "Consulta";
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,

        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        Proyecto: { type: "string", editable: false },
                        Accion: { type: "number", editable: false },
                        Spool: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: true },
                        OkPnd: { type: "boolean", editable: true },
                        OkPintura: { type: "boolean", editable: true },
                        Etiquetado: { type: "boolean", editable: true }
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
        nnavigatable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        editable: true,
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
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "180px" },
            { field: "Spool", title: _dictionary.columnSpoolIDEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "160px" },
            { field: "Cuadrante", title: _dictionary.columnCuadranteEmbarque[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxCuadrante, filterable: getGridFilterableCellMaftec(), width: "170px" },
              {
                  field: "OkPnd", title: _dictionary.columnOkPintura[$("#language").data("kendoDropDownList").value()], filterable: {
                      multi: true,
                      messages: {
                          isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                          isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                          style: "max-width:100px;"
                      },
                      dataSource: [{ OkPnd: true }, { OkPnd: false }]
                  }, template: '<input type="checkbox" disabled #= OkPnd ?  "checked=checked" : "" # class="chkbx"  ></input>', width: "120px", attributes: { style: "text-align:center;" }
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
                  }, template: '<input type="checkbox" disabled #= OkPintura ?  "checked=checked" : "" # class="chkbx"  ></input>', width: "120px", attributes: { style: "text-align:center;" }
              },
            {
                field: "Etiquetado", title: _dictionary.columnEtiquetadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: '<input type="checkbox" #= Etiquetado ? "checked=checked" : "" # class="chkbx"  ></input>', width: "120px", attributes: { style: "text-align:center;" }
            },
        ],
        dataBound: function (e) {
            $(".chkbx").bind("change", function (e) {
                if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                    if (e.target.checked) {
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = true;
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion == 3 ? 2 : $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion;
                    }
                    else {
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = false;
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion == 2 ? 3 : $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Accion;
                    }

                    $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).ModificadoPorUsuario = true;
                }
                else {
                    if (e.target.checked)
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = false;
                    else
                        $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).Etiquetado = true;
                }

                $("#grid").data("kendoGrid").dataSource.sync();
            });
        },
    });
    CustomisaGrid($("#grid"));
};

function existenCambios(arregloCaptura) {
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true && arregloCaptura[index].RequisicionID == 0)
            return true;
    }
    return false;
}

function PlanchaCuadrante() {

    var seleccionartodos = $('#SelectTodosSi').is(':checked');
    var seleccionarNinguno = $('#SelectTodosNinguno').is(':checked');
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    var SpoolsNoPlanchados = '';

    if ($("#inputCuadrantePlanchado").data("kendoComboBox").text() != "") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() == "Todos") {
                var existe = false;
                for (var x = 0; x < data[i].ListaCuadrantes.length; x++){
                    if ($("#inputCuadrantePlanchado").data("kendoComboBox").dataSource._data[$("#inputCuadrantePlanchado").val()].CuadranteID == data[i].ListaCuadrantes[x].CuadranteID)
                        existe= true;
                }
                if (existe) {
                    data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
                    data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
                }
                else {
                    SpoolsNoPlanchados += data[i].Spool + " ";
                }
                if (!seleccionarNinguno)
                    data[i].Etiquetado = seleccionartodos;
            }
        }
        displayNotify("", "Los spools: " + SpoolsNoPlanchados + "No han sido planchados", 1);
    }
    else {
        if (data[i].Cuadrante === "" || data[i].Cuadrante === null || data[i].Cuadrante === undefined) {
            data[i].CuadranteID = $("#inputCuadrantePlanchado").val();
            data[i].Cuadrante = $("#inputCuadrantePlanchado").data("kendoComboBox").text();
            if (!seleccionarNinguno) data[i].Etiquetado = seleccionartodos;
        }

    }
    $("#grid").data("kendoGrid").dataSource.sync();
}