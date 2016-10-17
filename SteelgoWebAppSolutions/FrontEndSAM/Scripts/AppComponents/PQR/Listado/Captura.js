﻿
function changeLanguageCall() {
    suscribirEventoGuardar();
    CargarGrid();
    LlenaGridAjax();
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
                    "<th scope='col' colspan='3' class='k-header'></th>  <th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblPQREspesormm[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span>" + _dictionary.WPSPQRProceso[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.WPSPQRGrupoP[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                    "<th width='auto'  colspan='6' class='k-header' style='text-align: center;'><span id=''></span></th>" +
                    "</tr>");
            }
        },
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        PQRID: { type: "int" },
                        Nombre: { type: "string", editable: true },
                        PREHEAT: { type: "boolean", editable: false },
                        PWHT: { type: "boolean", editable: false },
                        EspesorRelleno: { type: "number", editable: true },
                        EspesorRaiz: { type: "number", editable: true },
                        CodigoRelleno: { type: "string", editable: true },
                        CodigoRaiz: { type: "string", editable: true },
                        NumeroP: { type: "string", editable: true },
                        GrupoPMaterialesBase1: { type: "string", editable: true },
                        GrupoPMaterialesBase2: { type: "string", editable: true },
                        Aporte: { type: "string", editable: true },
                        Mezcla: { type: "string", editable: true },
                        Respaldo: { type: "string", editable: true },
                        GrupoF: { type: "string", editable: true },
                        CodigoASMEID: { type: "int", editable: false },
                        Especificacion: { type: "String", editable: true },

                        GrupoPMaterialesBase1ID: { type: "int" },
                        GrupoPMaterialesBase2ID: { type: "int" },
                        ProcesoSoldaduraRellenoID: { type: "int" },
                        ProcesoSoldaduraRaizID: { type: "int" },
                        NumeroPID: { type: "int" },
                        GrupoPID: { type: "int" },
                        Accion: { type: "int" },

                        RegistrosWPS: { type: "int" }
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
            { width: "110px", field: "Nombre", title: _dictionary.lblPQRNombre[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            {
                width: "120px", field: "PREHEAT", title: _dictionary.lblPQRPREHEAT[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.CheckBoxFilterPQRContiene[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.CheckBoxFilterPQRNoContiene[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:120px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-PREHEAT' type='checkbox' data-bind='checked: PREHEAT' #= PREHEAT ? checked='checked' : '' #/>", width: "120px"
            },
            {
                width: "100px", field: "PWHT", title: _dictionary.lblPQRPWHT[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.CheckBoxFilterPQRContiene[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.CheckBoxFilterPQRNoContiene[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-PWHT' type='checkbox' data-bind='checked: PWHT' #= PWHT ? checked='checked' : '' #/>", width: "111px"
            },
            { width: "120px", field: "EspesorRelleno", title: _dictionary.WPSPQRRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n4}", editor: RenderEspesorRelleno, attributes: { style: "text-align:right;" } },
            { width: "120px", field: "EspesorRaiz", title: _dictionary.WPSPQRRAIZ[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n4}", editor: RenderEspesorRaiz, attributes: { style: "text-align:right;" } },
            { width: "120px", field: "CodigoRelleno", title: _dictionary.WPSPQRRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderComboBoxProcesoSoldaduraRelleno },
            { width: "120px", field: "CodigoRaiz", title: _dictionary.WPSPQRRAIZ[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxProcesoSoldaduraRaiz },
            { width: "120px", field: "GrupoPMaterialBase1Nombre", title: _dictionary.lblPQRBase1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxMaterialesBase1 },
            { width: "120px", field: "GrupoPMaterialBase2Nombre", title: _dictionary.lblPQRBase2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxMaterialesBase2 },
            { width: "120px", field: "Aporte", title: _dictionary.lblPQRAporte[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { width: "120px", field: "Mezcla", title: _dictionary.lblPQRMezcla[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { width: "120px", field: "Respaldo", title: _dictionary.lblPQRRespaldo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { width: "120px", field: "GrupoF", title: _dictionary.lblPQRGrupoF[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { width: "200px", field: "Especificacion", title: _dictionary.lblPQRCodigo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxEspecificacion },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, width: "90px", title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()] }
        ]
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chk-PWHT", function (e) {
        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if (dataItem.RegistrosWPS == 0) {
                    if ($(this)[0].checked) {
                        dataItem.PWHT = true;
                    }
                    else {
                        dataItem.PWHT = false;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    displayNotify("", _dictionary.lblPQRElementoPQR[$("#language").data("kendoDropDownList").value()] + dataItem.Nombre + _dictionary.lblPQRYaAsignado[$("#language").data("kendoDropDownList").value()], 1);
                    if ($(this)[0].checked) {
                        dataItem.PWHT = false;
                    }
                    else {
                        dataItem.PWHT = true;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
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
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if (dataItem.RegistrosWPS == 0) {
                    if ($(this)[0].checked) {
                        dataItem.PWHT = true;
                    }
                    else {
                        dataItem.PWHT = false;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    displayNotify("", _dictionary.lblPQRElementoPQR[$("#language").data("kendoDropDownList").value()] + dataItem.Nombre + _dictionary.lblPQRYaAsignado[$("#language").data("kendoDropDownList").value()], 1);
                    if ($(this)[0].checked) {
                        dataItem.PWHT = false;
                    }
                    else {
                        dataItem.PWHT = true;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
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
    });

    $("#grid .k-grid-content").on("change", "input.chk-PREHEAT", function (e) {
        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if (dataItem.RegistrosWPS == 0) {
                    if ($(this)[0].checked) {
                        dataItem.PREHEAT = true;
                    }
                    else {
                        dataItem.PREHEAT = false;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    displayNotify("", _dictionary.lblPQRElementoPQR[$("#language").data("kendoDropDownList").value()] + dataItem.Nombre + _dictionary.lblPQRYaAsignado[$("#language").data("kendoDropDownList").value()], 1);
                    if ($(this)[0].checked) {
                        dataItem.PREHEAT = false;
                    }
                    else {
                        dataItem.PREHEAT = true;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
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
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if (dataItem.RegistrosWPS == 0) {
                    if ($(this)[0].checked) {
                        dataItem.PREHEAT = true;
                    }
                    else {
                        dataItem.PREHEAT = false;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    displayNotify("", _dictionary.lblPQRElementoPQR[$("#language").data("kendoDropDownList").value()] + dataItem.Nombre + _dictionary.lblPQRYaAsignado[$("#language").data("kendoDropDownList").value()], 1);
                    if ($(this)[0].checked) {
                        dataItem.PREHEAT = false;
                    }
                    else {
                        dataItem.PREHEAT = true;
                    }
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
            }
        }
    });
};

function NombreRepetido(listaDetalles) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var allData = dataSource.data();

    for (var i = 0; i < listaDetalles.length; i++) {
        for (var j = 0; j < listaDetalles.length; j++) {
            if (listaDetalles[i].Nombre.toLowerCase() == listaDetalles[j].Nombre.toLowerCase() && i != j) {
                listaDetalles[j].Estatus = -1;
                $('tr[data-uid="' + allData[j].uid + '"] ').css("background-color", "#ffcccc");
            }
        }
    }

    return ExistNombreRepetido(listaDetalles);
}

function ExistNombreRepetido(rows) {
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Estatus == -1)
            return true;
    }
    return false;
}

function VentanaModal() {
    var modalTitle = "";
    modalTitle = "PQR";
    var window = $("#windowPQR");
    var win = window.kendoWindow({
        actions: "",
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: false,
        width: "50%%",
        minWidth: 660,
        position: {
            top: "10%",
            left: "20%"
        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

//function LimpiaControles() {
//    $('#NombreId').val('');
//    $('#EspesorRelleno').val('');
//    $('#EspesorRaiz').val('');
//    $('#chkPreheat').prop('checked', false);
//    $('#chkPwht').prop('checked', false);

//    $('#ProcesoSoldaduraRellenoID').data("kendoComboBox").value("");
//    $('#ProcesoSoldaduraRaizID').data("kendoComboBox").value("");
//    $('#NumeroPID').data("kendoComboBox").value("");
//    $('#GrupoPMaterialBase1ID').data("kendoComboBox").value("");
//    $('#AporteID').data("kendoComboBox").value("");
//    $('#MezclaID').data("kendoComboBox").value("");
//    $('#RespaldoID').data("kendoComboBox").value("");
//    $('#GrupoFID').data("kendoComboBox").value("");
//    $('#CodigoID').data("kendoComboBox").value("");
//};

function cancelarCaptura(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var PQRIDRegistro = dataItem.PQRID;

        if (dataItem.RegistrosWPS == 0) {
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

            ventanaConfirm.content(_dictionary.lblPQRCapturaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function () {

                var dataSource = $("#grid").data("kendoGrid").dataSource;
                dataItem.Accion = 3;
                $("#grid").data("kendoGrid").dataSource.sync();

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
        }
        else
            displayNotify("", _dictionary.lblPQRElementoPQR[$("#language").data("kendoDropDownList").value()] + dataItem.Nombre + _dictionary.lblPQRYaAsignado[$("#language").data("kendoDropDownList").value()], 1);
    }

};

function LLenaControles(e) {
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    $("#IdPQR").val(dataItem.PQRID)

    $("#NombreId").val(dataItem.Nombre)

    var ChkPreheat = dataItem.PREHEAT;
    if (ChkPreheat == true) {

        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#chkPreheat"), data);
    }
    else {

        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#chkPreheat"), data);
    }

    $("#EspesorRelleno").val(dataItem.EspesorRelleno);
    $("#EspesorRaiz").val(dataItem.EspesorRaiz);

    var ChkPWHT = dataItem.PWHT;
    if (ChkPWHT == true) {

        var data = kendo.observable({
            optionCheckPWHT: true
        });
        kendo.bind($("#chkPwht"), data);
    }
    else {

        var data = kendo.observable({
            optionCheckPWHT: false
        });
        kendo.bind($("#chkPwht"), data);
    }

    var CMBProcesoSoldaduraRelleno = $("#ProcesoSoldaduraRellenoID").data("kendoComboBox");
    CMBProcesoSoldaduraRelleno.value(dataItem.ProcesoSoldaduraRellenoID);


    var CMBProcesoSoldaduraRAIZ = $("#ProcesoSoldaduraRaizID").data("kendoComboBox");
    CMBProcesoSoldaduraRAIZ.value(dataItem.ProcesoSoldaduraRaizID);


    //var CMBNumeroP = $("#NumeroPID").data("kendoComboBox");
    //CMBNumeroP.value(dataItem.NumeroPID);

    var GrupoPMaterialBase1ID = $("#GrupoPMaterialBase1ID").data("kendoComboBox");
    GrupoPMaterialBase1ID.value(dataItem.GrupoMaterialBase1PID);

    var GrupoPMaterialBase2ID = $("#GrupoPMaterialBase12D").data("kendoComboBox");
    GrupoPMaterialBase2ID.value(dataItem.GrupoMaterialBase2PID);

    var CMBAporte = $("#AporteID").data("kendoComboBox");
    CMBAporte.value(dataItem.AporteID);

    var CMBMezcla = $("#MezclaID").data("kendoComboBox");
    CMBMezcla.value(dataItem.MezclaID);

    var CMBRespaldo = $("#RespaldoID").data("kendoComboBox");
    CMBRespaldo.value(dataItem.RespaldoID);

    var CMBGrupoFID = $("#GrupoFID").data("kendoComboBox");
    CMBGrupoFID.value(dataItem.GrupoFID)

    var CMBCodigoID = $("#CodigoID").data("kendoComboBox");
    CMBCodigoID.value(dataItem.CodigoID)

};
