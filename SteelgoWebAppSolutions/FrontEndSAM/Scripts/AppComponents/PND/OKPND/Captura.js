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

    SiguienteProceso("");
    CargarGrid();
    //$("#tipoPrueba").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").enable(true);
    //$("#tipoPrueba").data("kendoComboBox").enable(true);
    $('#containerDiv').css('display', 'none');
    $('#grid').data('kendoGrid').dataSource.read();
    //ajaxRequisicion();

    //ajaxObtenerProyectos();
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
    document.title = _dictionary.menuOKPND[$("#language").data("kendoDropDownList").value()];
};

function SiguienteProceso(paramReq) {
    var url = "";
    if (paramReq == 0 || paramReq == undefined || paramReq == "") {
        url = "/PND/AsignacionRequisicion?leng=" + $("#language").data("kendoDropDownList").value();
    } else {
        url = "/PND/AsignacionRequisicion?leng=" + $("#language").data("kendoDropDownList").value()
            + "&requisicion=" + paramReq;
    }

    $("#GenerarRequisicionASignarRequisicionSup").attr("href", url);
    $("#GenerarRequisicionASignarRequisicionInf").attr("href", url);
}

function cargaInicialRequisicionEditar() {
    if (requisicionID != 0) {
        $("#Proyecto").data("kendoComboBox").value(ProyectoID);
    //ajaxObtenerTipoPruebasRequisicionEdicion();
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
                        Cuadrante: { type: "string", editable: false },
                        Prioridad: { type: "number", editable: false },
                        Estatus: { type: "string", editable: false },

                        SpoolID: { type: "int", editable: false },
                        OrdenTrabajoSpoolID: { type: "int", editable: false },
                        OkPND: { type: "boolean", editable: false },

                        TemplateMensajeTrabajosAdicionales: { type: "string", editable: false }
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
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "127px" },
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "40px", attributes: { style: "text-align:right;" } },
            //{ field: "Estatus", title: _dictionary.columnStatus[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "150px" },
            { field: "InformacionDetalle", title: _dictionary.columnAdicionales[$("#language").data("kendoDropDownList").value()], filterable: false, width: "115px", template: "<div class='botonAdicionales'><a href='\\#'  > <span>#=TemplateMensajeTrabajosAdicionales#</span></a></div>" },
            {
                field: "OkPND", title: _dictionary.columnOkPND[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' #= (OkPND && (RequisicionID != 0)) ? 'hidden=true':(OkPND ? 'checked=checked':'') # />", width: "50px", attributes: { style: "text-align:center;" }
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
                $(this)[0].checked = false;
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
        //AjaxObtenerJunta();
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

function existenCambios(arregloCaptura) {
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true && arregloCaptura[index].RequisicionID == 0)
            return true;
    }
    return false;
}