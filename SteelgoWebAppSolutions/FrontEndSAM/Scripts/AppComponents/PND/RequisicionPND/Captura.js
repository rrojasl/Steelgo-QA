﻿var endRangeDate;
var ItemSeleccionado;
var pruebasID, ProyectoID;
var requisicionID, pruebaProyID = 0;
var ProyectoNombre = "";
var PruebaNombre = "";
var EstatusID = 1; // Capturada segun tabla Sam3_Estatus

if ($("#idField").val() != null || $("#idField").val() != undefined)
    requisicionID = $("#idField").val();
else
    requisicionID = 0;

IniciarCaptura();

function IniciarCaptura() {
    //AltaFecha();
    SuscribirEventos();
};

function changeLanguageCall() {
    //endRangeDate.data("kendoDatePicker").setOptions({
    //    format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    //});
    CargarGrid();
    $("#tipoPrueba").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").enable(true);
    $("#tipoPrueba").data("kendoComboBox").enable(true);
    $('#containerDiv').css('display', 'none');
    $('#grid').data('kendoGrid').dataSource.read();
    //ajaxRequisicion();

    //ajaxObtenerProyectos();
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
    document.title = _dictionary.ServiciosTecnicosRequisicionPND[$("#language").data("kendoDropDownList").value()];
};


function cargaInicialRequisicionEditar() {
    if (requisicionID != 0) {
        $("#Proyecto").data("kendoComboBox").value(ProyectoID);
        ajaxObtenerTipoPruebasRequisicionEdicion();
    }
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()])
                this.closeCell();
        },
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        EtiquetaJunta: { type: "string", editable: false },
                        TipoJunta: { type: "string", editable: false },
                        NombreRequisicion: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Prioridad: { type: "number", editable: false },
                        Clasificacion: { type: "string", editable: false },
                        Diametro: { type: "number", editable: false },
                        Espesor: { type: "number", editable: false },
                        Cedula: { type: "string", editable: false },

                        RequisicionID: { type: "int", editable: false },
                        ProyectoID: { type: "int", editable: false },
                        SpoolID: { type: "int", editable: false },
                        JuntaSpoolID: { type: "int", editable: false },
                        OrdenTrabajoSpoolID: { type: "int", editable: false },
                        JuntaSpoolID: { type: "int", editable: false },
                        TipoPruebaID: { type: "int", editable: false },
                        Especificacion: { type: "number", editable: false },
                        Agregar: { type: "boolean", editable: false }
                    }
                }
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
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "EtiquetaJunta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "TipoJunta", title: _dictionary.columnTipoJta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "112px" },
            { field: "NombreRequisicion", title: _dictionary.columnRequisicion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "127px" },
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", attributes: { style: "text-align:right;" } },
            { field: "Clasificacion", title: _dictionary.columnClasificacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "85px" },
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "94px", attributes: { style: "text-align:right;" } },
            { field: "Espesor", title: _dictionary.columnEspesor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "112px", attributes: { style: "text-align:right;" } },
            { field: "Cedula", title: _dictionary.columnCedula[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "105px" },
            {
                field: "Agregar", title: _dictionary.columnAgregar[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: Agregar' #= Agregar ? checked='checked' : '' #/>", width: "112px", attributes: { style: "text-align:center;" }
            },
        ],
        dataBound: function (a) {
            $(".ob-paid").bind("change", function (e) {
                if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                    var grid = $("#grid").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem.RequisicionID == 0 && e.target.checked == true)
                        dataItem.Agregar = true;
                    else
                        dataItem.Agregar = false;
                }
                else
                    $("#grid").data("kendoGrid").closeCell();
                //$("#grid").data("kendoGrid").dataSource.sync();
            });
        }
    });

    $("#grid").on("change", ":checkbox", function (e) {
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            if (dataItem.RequisicionID != 0 && dataItem.RequisicionID != undefined) {
                dataItem.Seleccionado = false;
                displayNotify("", "Este elemento no puede ser asignado a otra requisición", '1');
            }

            //$("#grid").data("kendoGrid").dataSource.sync();
        }
        //else {
        //    if ($(this)[0].checked) {
        //        $(this)[0].checked = false;
        //    }
        //    else {
        //        $(this)[0].checked = true;
        //    }
        //}
    });

    CustomisaGrid($("#grid"));
};

function AltaFecha() {
    endRangeDate = $("#Fecha").kendoDatePicker({
        max: new Date(),
    });
    $("#Fecha").data("kendoDatePicker").enable(false);
}

function ExisteJunta() {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].JuntaTrabajoID == $("#Junta").data("kendoComboBox").value()) {
            $("#grid").data("kendoGrid").dataSource.sync();
            return false;
        }
    }
    return true;
}

function AgregarJuntaNueva() {
    if (ExisteJunta()) {
        loadingStart();
        AjaxObtenerJunta();
    }
    else
        displayNotify("GenerarRequisicionMensajeJuntaAgregada", "", '1');
}

function ValidaFormatoFecha(FechaValidar, Idioma) {

    //Valida que el formato de la fecha sea correcto (2-2-4)
    var bool;
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((String(FechaValidar).trim().match(RegExPattern)) && (FechaValidar != '')) {

        if (Idioma == 'es-MX') {
            if (existeFechaMexicoFormato(FechaValidar) && existeFechaMexico(FechaValidar)) {
                bool = true;
            }
            else {
                bool = false
            }
        }
        else if (Idioma == 'en-US') {

            if (existeFechaEUFormato(FechaValidar) && existeFechaEU(FechaValidar))
                bool = true;
            else
                bool = false
        }
    } else
        bool = false;
    return bool;

}

function existeFechaMexicoFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[0];
    var m = fechaf[1];
    var y = fechaf[2];

    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function existeFechaMexico(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[0];
    var month = FechaValidar[1];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0))
        return false;
    return true;
}

function existeFechaEUFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[1];
    var m = fechaf[0];
    var y = fechaf[2];

    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function existeFechaEU(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[1];
    var month = FechaValidar[0];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0))
        return false;
    return true;
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down")
            return true;
    }
    return false;
}

function VentanaModal() {
    var modalTitle = "";
    modalTitle = _dictionary.MensajeNuevaRequisicion[$("#language").data("kendoDropDownList").value()];
    var ventanaConfirm = $("#ventanaConfirm");
    var window = ventanaConfirm.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        }
    }).data("kendoWindow");

    window.content('<div id="ventanaConfirm" z-index: inherit">' +
                        '<div class="col-sm-11 col-md-11 col-lg-11">' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblRequisicion1[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="NombreRequisicion" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblFechaRequisicion[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="FechaRequisicion" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblCodigoAsme[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="CodigoAsme" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblObservacion[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="Observacion" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<center><button class="btn btn-blue" id="YesButton"> Guardar</button>&nbsp;<button class="btn btn-blue" id="NoButton"> Cancelar</button></center>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
    ventanaConfirm.data("kendoWindow").title(modalTitle);
    ventanaConfirm.data("kendoWindow").center().open();

};
//function createKendoWindow() {

//    $("#YesButton").click(function (handler) {
//        ventanaConfirm.close();
//    });
//    $("#NoButton").click(function (handler) {
//        ventanaConfirm.close();
//    });

//    ventanaConfirm.open().center();
//}