﻿var tiposCSV = ["application/csv", "application/excel", "application/lotus123", "application/msexcel", "application/vnd.lotus-1-2-3", "application/vnd.ms-excel", "application/vnd.ms-works", "application/vnd.msexcel", "application/wk1", "application/wks", "application/x-123", "application/x-dos_ms_excel", "application/x-excel", "application/x-lotus123", "application/x-ms-excel", "application/x-msexcel", "application/x-msworks", "application/x-wks", "application/x-xls", "application/xlc", "application/xls", "text/anytext", "text/comma-separated-values", "text/csv", "zz-application/zz-winassoc-wk1"];
var proyectoInicial = 0;
var pruebaInicial = 0;
var requisicionOriginal = 0;

function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    suscribirEventoProyecto();
    SuscribirEventoBuscar();
    SuscribirEventoAplicar();
    suscribirEventoCarGaCSV();
    suscribirEventoDescarGaCSV();
    suscribirEventoElementosAsignados();
}

function suscribirEventoGuardar() {
    $('#BotonGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView");
    });

    $('#BotonGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView");
    });

    $('#BotonGuardar3').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar") {
            opcionHabilitarView(false, "FieldSetView");
        }
    });

    $('#BotonGuardar4').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#BotonGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 1);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            AjaxGuardarCaptura(ds._data, 1);
    });

    $('#BotonGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 1);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            AjaxGuardarCaptura(ds._data, 1);
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoProyecto() {
    var dataItem;
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            Limpiar();
        }
    });
}

function SuscribirEventoBuscar() {
    $('#ButtonBuscar').click(function (e) {
        var proyectoID = $("#Proyecto").data("kendoComboBox").value();
        var NumControl = $("#InputNumeroControl").val();

        AjaxGetListaElementos(proyectoID, NumControl);
    });
};

function SuscribirEventoAplicar() {
    $('#ButtonPlanchar').click(function (e) {
        var Check = $("#InputSeleccionTodos")[0].checked;
        
        var ds = $("#grid").data("kendoGrid").dataSource;

        aplicarPlanchado(ds._data, Check);

        ds.sync();
    });
};

function Limpiar() {
    $("#InputNumeroControl").val("");

    $("#grid").data('kendoGrid').dataSource.data([]);
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Proyecto").data("kendoComboBox").enable(false);

        //$("#Fecha").data("kendoDatePicker").enable(false);
        $('#BotonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

        $("#BotonGuardar2").text("Editar");
        $('#BotonGuardar').text("Editar");
        $('#BotonGuardar4').text("Editar");
        $('#BotonGuardar3').text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Proyecto").data("kendoComboBox").enable(true);
        $('#BotonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

        $("#BotonGuardar2").text("Guardar");
        $('#BotonGuardar').text("Guardar");
        $('#BotonGuardar4').text("Guardar");
        $('#BotonGuardar3').text("Guardar");
    }
}

function suscribirEventoDescarGaCSV() {
    $("#btnDescargaCsv, #btnDescargaCsv").click(function (e) {
        window.location.href = "/TemplateOKPND.csv";
    });
}

function suscribirEventoCarGaCSV(){
    $('#btnCargaCsv').click(function (e) {
        $("#files").click();
    });

    $('#btnCargaCsv1').click(function (e) {
        $("#files").click();
    });

    document.getElementById("files").addEventListener("change", function (evt) {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            displayMessage("ListadoCatalogos0007", "", '2');
        } else {
            var data = [];
            var file = evt.target.files[0];
            if (tiposCSV.indexOf(file.type.toLowerCase()) == -1) {
                this.value = null;
                displayMessage("ListadoCatalogos0008", "", '2');
            } else {
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function (event) {
                    var csvData = event.target.result;
                    csvToJson(csvData, "ID").forEach(function (c) {
                        NumControlValido(c);
                        data.push(c);
                    });

                    AjaxGuardadoMasivo(data);
                };
                reader.onerror = function () {
                    alert('Unable to read ' + file.fileName);
                };
                reader.onloadend = function () {
                    var valido = true;
                    var nuevos = $("#gridMasivo").data("kendoGrid").dataSource.data().filter(function (n) { return n.dirty === true });
                    var advertencia = null;
                    nuevos.forEach(function (n) {
                        if (n.valido !== false) {
                            if (n.advertencia) {
                                $("[data-uid=" + n.uid + "]").attr("style", "background-color:#FDF9AA")
                                advertencia = true;
                            } else {
                                $("[data-uid=" + n.uid + "]").attr("style", "background-color:#E3FCCB")
                            }
                        } else {
                            $("[data-uid=" + n.uid + "]").attr("style", "background-color:#FEDEE8")
                            valido = false;
                        }
                    });
                    var mensaje = null;
                    if (!valido && advertencia) {
                        mensaje = _dictionary.ListadoCatalogos0011[$("#language").data("kendoDropDownList").value()] + "\n" + _dictionary.ListadoCatalogos0017[$("#language").data("kendoDropDownList").value()];
                    } else if (!valido) {
                        mensaje = _dictionary.ListadoCatalogos0011[$("#language").data("kendoDropDownList").value()];
                    } else if (advertencia) {
                        mensaje = _dictionary.ListadoCatalogos0017[$("#language").data("kendoDropDownList").value()];
                    }
                    if (mensaje != null) {
                        displayMessage("", mensaje, '2');
                    }
                    nuevasCedulas = nuevos;
                }
            }
        }
    });
}

function csvToJson(data, idField) {
    data = data.split("\n");
    data.shift();
    data.pop();
    data = data.join("\n");
    data = data.split("\r").join("");
    var encabezados = Object.keys($("#gridMasivo").data("kendoGrid").options.dataSource.schema.model.fields);
    //encabezados.splice(encabezados.indexOf(idField), 1);
    var csv = [];
    try {
        data.split("\n").forEach(function (d, i) {
            if (d.substring(0, d.length).split(";").length === encabezados.length - (encabezados.length - $("#gridMasivo").data("kendoGrid").columns.length)) {
                var tmp = {};
                tmp[idField] = null;
                d.split(";").forEach(function (cell, z) {
                    tmp[encabezados[z]] = cell;
                });
                csv.push(tmp);
            } else {
                throw -1;
            }
        })
    } catch (e) {
        if (e !== -1) {
            throw e;
        } else {
            displayMessage("ListadoCatalogos0012", "", '2');
        }
    }
    return csv;
}

function suscribirEventoElementosAsignados() {

    $(document).on('click', '.EnlaceDetalleJunta', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            
            LlenarGridPopUp(dataItem.ListaDetalle);
        }
    });
}