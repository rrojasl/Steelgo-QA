﻿var ItemSeleccionado;
var resultadoJson;
var win;

function changeLanguageCall() {
    document.title = _dictionary.WPSBreadcrumb[$("#language").data("kendoDropDownList").value()];
    CargarGrid();

    ObtenerJSONParaGrid();




};

function CargarGrid() {

    $("#grid").kendoGrid({
        edit: function (e) {

            if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

            } else
                this.closeCell();

        },

        dataBound: function () {
            var myElem = document.getElementById('trParentHeader');
            if (myElem == null) {
                $("#grid").find("th.k-header").parent().before("<tr id='trParentHeader'> " +
                    "<th scope='col' colspan='1' class='k-header'></th>  <th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.columnPQR[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span>" + _dictionary.columnGrupoP[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.columnEspesorRaiz[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.columnEspesorRelleno[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.columnPWHT[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.columnPreheat[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.columnEspesormm[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "</tr>");
            }
        },
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        WPSNombre: { type: "string", editable: true },
                        NombrePQRRaiz: { type: "string", editable: true },
                        NombrePQRRelleno: { type: "string", editable: true },
                        GrupoPRaiz: { type: "string", editable: false },
                        GrupoPRelleno: { type: "string", editable: false },
                        PWHTRelleno: { type: "boolean", editable: false },
                        PWHTRaiz: { type: "boolean", editable: false },
                        PREHEATRaiz: { type: "boolean", editable: false },
                        PREHEATRelleno: { type: "boolean", editable: false },
                        EspesorMaximo: { type: "number", editable: false },
                        EspesorMinimo: { type: "number", editable: false },
                        RaizEspesorRaiz: { type: "number", editable: false },
                        RaizEspesorRelleno: { type: "number", editable: false },
                        RellenoEspesorRaiz: { type: "number", editable: false },
                        RellenoEspesorRelleno: { type: "number", editable: false },
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
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true
        },
        filterable: getGridFilterableMaftec(),

        columns: [
                    { field: "WPSNombre", title: _dictionary.columnNombre[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
                    { field: "NombrePQRRaiz", title: _dictionary.columnRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", editor: RenderComboBoxPQRRaiz },
                    { field: "NombrePQRRelleno", title: _dictionary.columnRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", editor: RenderComboBoxPQRRelleno },
                    { field: "GrupoPRaiz", title: _dictionary.columnRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
                    { field: "GrupoPRelleno", title: _dictionary.columnRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
                    { field: "RaizEspesorRaiz", title: _dictionary.columnRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", format: "{0:n4}", },
                    { field: "RaizEspesorRelleno", title: _dictionary.columnRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", format: "{0:n4}" },
                    { field: "RellenoEspesorRaiz", title: _dictionary.columnRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", format: "{0:n4}" },
                    { field: "RellenoEspesorRelleno", title: _dictionary.columnRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", format: "{0:n4}" },
                    {
                        field: "PWHTRaiz", title: _dictionary.columnRaiz[$("#language").data("kendoDropDownList").value()], filterable: {
                            multi: true,
                            messages: {
                                isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                                isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                                style: "max-width:120px;"
                            },
                            dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                        }, width: "73px", template: "<input readonly disabled type='checkbox' data-bind='checked: PWHTRaiz' #= PWHTRaiz ? checked='checked' : '' #/>"
                    },
                    {
                        field: "PWHTRelleno", title: _dictionary.columnRelleno[$("#language").data("kendoDropDownList").value()], filterable: {
                            multi: true,
                            messages: {
                                isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                                isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                                style: "max-width:120px;"
                            },
                            dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                        }, width: "73px", template: "<input readonly disabled type='checkbox' data-bind='checked: PWHTRelleno' #= PWHTRelleno ? checked='checked' : '' #/>"
                    },
                    {
                        field: "PREHEATRaiz", title: _dictionary.columnRaiz[$("#language").data("kendoDropDownList").value()], filterable: {
                            multi: true,
                            messages: {
                                isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                                isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                                style: "max-width:120px;"
                            },
                            dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                        }, width: "73px", template: "<input readonly disabled type='checkbox' data-bind='checked: PREHEATRaiz' #= PREHEATRaiz ? checked='checked' : '' #/>"
                    },
                    {
                        field: "PREHEATRelleno", title: _dictionary.columnRelleno[$("#language").data("kendoDropDownList").value()], filterable: {
                            multi: true,
                            messages: {
                                isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                                isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                                style: "max-width:120px;"
                            },
                            dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                        }, width: "73px", template: "<input readonly disabled type='checkbox' data-bind='checked: PREHEATRelleno' #= PREHEATRelleno ? checked='checked' : '' #/>"
                    },
                    { field: "EspesorMinimo", title: _dictionary.columnMin[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", format: "{0:n4}" },
                    { field: "EspesorMaximo", title: _dictionary.columnMax[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", format: "{0:n4}" },
                    { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
                    //{ command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: EditaWPS }, title: _dictionary.tituloEditar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ],
    });
    CustomisaGrid($("#grid"));
};

function eliminarCaptura(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));


        windowTemplate = kendo.template($("#windowTemplate").html());

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.WPSMensajeEliminar[$("#language").data("kendoDropDownList").value()] +
                     "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function (handler) {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataItem.Accion = 3;
            dataSource.sync();
            ventanaConfirm.close();
        });
        $("#noButton").click(function (handler) {
            ventanaConfirm.close();
        });
    }
    else {
        displayNotify("WPSMensajeErrorNombreRepetido", "", "2");
    }

}


function VentanaModal() {
    var modalTitle = "";
    modalTitle = _dictionary.WPSNombre[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowWPS");

    if (win == undefined) {

        win = window.kendoWindow({
            actions: "",
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: false,
            width: "50%",
            minWidth: 660,
            position: {
                top: "10%",
                left: "20%"
            }
        }).data("kendoWindow");

    }

    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function NombreRepetido(listaDetalles) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var allData = dataSource.data();

    for (var i = 0; i < listaDetalles.length; i++) {
        for (var j = 0; j < listaDetalles.length; j++) {
            if (listaDetalles[i].WPSNombre.toLowerCase() == listaDetalles[j].WPSNombre.toLowerCase() && i != j) {
                listaDetalles[j].Estatus = -4;
                $('tr[data-uid="' + allData[j].uid + '"] ').css("background-color", "#ffcccc");
            }
        }
    }

    return ValidaNombreRepetido(listaDetalles);
}



function ValidaNombreRepetido(rows) {
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -4)
            return true;
    }
    return false;
}


function ObtenerEspesorCorrecto(EspesorTotalT, PWHT, ProcesoSoldadura, esRaiz) {
    var espesores = [];
    espesores[0] = { EspesorMaximo: "", EspesorMinimo: "" };
    if (PWHT || (!PWHT && EspesorTotalT > 16)) {

        if (ProcesoSoldadura == "GMAW STT" && EspesorTotalT < 13 && esRaiz) {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
            espesores[0].EspesorMinimo = (1.1 * parseFloat(EspesorTotalT)).toFixed(4);
        }
        else {
            if (EspesorTotalT < 1.5) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = parseFloat(EspesorTotalT).toFixed(4);
            }
            else if (EspesorTotalT >= 1.5 && EspesorTotalT < 10) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 1.5000;
            }
            else if (EspesorTotalT >= 10 && EspesorTotalT < 19) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 19 && EspesorTotalT < 38) {
                espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 38 && EspesorTotalT < 150) {
                espesores[0].EspesorMaximo = 200.0000;
                espesores[0].EspesorMinimo = 5.0000;
            }
            else if (EspesorTotalT >= 150) {
                espesores[0].EspesorMaximo = (1.33 * parseFloat(EspesorTotalT)).toFixed(4);
                espesores[0].EspesorMinimo = 5.0000;
            }
        }

    }
    else {
        if (EspesorTotalT < 6) {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
            espesores[0].EspesorMinimo = (parseFloat(EspesorTotalT) / 2).toFixed(4);
        }
        else {
            espesores[0].EspesorMaximo = (2 * parseFloat(EspesorTotalT)).toFixed(4);
            espesores[0].EspesorMinimo = parseFloat(EspesorTotalT).toFixed(4);
        }
    }
    return espesores;
}

function EsCorrectoGruposMaterialBase(rows) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var allData = dataSource.data();


    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -1)
            $('tr[data-uid="' + allData[i].uid + '"] ').css("background-color", "#ffcccc");
    }

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -1)
            return true;
    }
    return false;
}

function EsCorrectoPWHTRELLENO(rows) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var allData = dataSource.data();


    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -2)
            $('tr[data-uid="' + allData[i].uid + '"] ').css("background-color", "#ffcccc");
    }

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -2)
            return true;
    }
    return false;
}

function EsCorrectoPreHitRelleno(rows) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var allData = dataSource.data();

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -3)
            $('tr[data-uid="' + allData[i].uid + '"] ').css("background-color", "#ffcccc");
    }

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -3)
            return true;
    }
    return false;
}