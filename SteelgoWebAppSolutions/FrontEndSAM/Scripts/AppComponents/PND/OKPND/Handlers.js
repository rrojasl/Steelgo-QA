var tiposCSV = ["application/csv", "application/excel", "application/lotus123", "application/msexcel", "application/vnd.lotus-1-2-3", "application/vnd.ms-excel", "application/vnd.ms-works", "application/vnd.msexcel", "application/wk1", "application/wks", "application/x-123", "application/x-dos_ms_excel", "application/x-excel", "application/x-lotus123", "application/x-ms-excel", "application/x-msexcel", "application/x-msworks", "application/x-wks", "application/x-xls", "application/xlc", "application/xls", "text/anytext", "text/comma-separated-values", "text/csv", "zz-application/zz-winassoc-wk1"];
var proyectoInicial = 0;
var pruebaInicial = 0;
var requisicionOriginal = 0;
var error = 0;

function SuscribirEventos() {
    SuscribirEventoBuscar();
    suscribirEventoGuardar();
    SuscribirEventoAplicar();
    suscribirEventoCancelar();
    suscribirEventoProyecto();
    suscribirEventoCarGaCSV();
    suscribirEventoDescarGaCSV();
    suscribirEventoChangeRadio();
    suscribirEventoNumeroControl();
    suscribirEventoElementosAsignados();    
    SuscribirEventoCerrarPopUpJuntas();
    suscribirEventoDesactivaCheckOK();
}

function suscribirEventoGuardar() {
    $('#BotonGuardar, #BotonGuardar2, #BotonGuardar3, #BotonGuardar4').click(function (e) {
        $("#grid").data("kendoGrid").dataSource.sync();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#BotonGuardar').text() == "Guardar") {
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#BotonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView");
    });

    $('#BotonGuardarYNuevo, #BotonGuardarYNuevo1').click(function (e) {
        $("#grid").data("kendoGrid").dataSource.sync();
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
            var ds = $("#grid").data("kendoGrid").dataSource;
            var proyectoID = $("#Proyecto").data("kendoComboBox").value();
            var NumControl = $("#InputNumeroControl").val();

            if (existenCambios(ds._data)) {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    animation: false,
                    width: "auto",
                    height: "auto",
                    actions: [],
                    modal: true
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.EntregaPlacasGraficasbotonSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.EntregaPlacasGraficasbotonNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    ProyectoIDAnterior = proyectoID;
                    Limpiar();
                });

                $("#noButtonProy").click(function () {
                    $("#InputNumeroControl").val(SpoolContiene);
                    $("#Proyecto").data("kendoComboBox").value(ProyectoIDAnterior);
                    ventanaConfirm.close();
                });
            }
            else {
                ProyectoIDAnterior = proyectoID;
                Limpiar();
            }
        }
    });
}

function SuscribirEventoBuscar() {
    $('#ButtonBuscar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var proyectoID = $("#Proyecto").data("kendoComboBox").value();
        var NumControl = $("#InputNumeroControl").val();

        if (proyectoID != 0 && proyectoID != undefined && proyectoID != "") {
            if (!existenCambios(ds._data)) {
                AjaxGetListaElementos(proyectoID, NumControl);
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    animation: false,
                    width: "auto",
                    height: "auto",
                    actions: [],
                    modal: true
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    AjaxGetListaElementos(proyectoID, NumControl);
                });

                $("#noButtonProy").click(function () {
                    $("#InputNumeroControl").val(SpoolContiene);
                    ventanaConfirm.close();
                });
            }
        }
        else {
            displayNotify("SistemaPinturaMensajeErrorProyecto", "", '1');
        }
    });
};

function SuscribirEventoAplicar() {
    $('#ButtonPlanchar').click(function (e) {        
        var Check = $("#InputSeleccionTodos")[0].checked;
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ds.length > 0) {
            aplicarPlanchado(ds._data, Check);
            ds.sync();
        } else {
            displayNotify("PinturaCargaBackLogMensajeSeleccionaSpool", "", "1");
            return;
        }
    });
};

function Limpiar() {
    $("#InputNumeroControl").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        //$('#FieldSetView').find('*').attr('disabled', true);        
        $('#AgregadoDiv, #containerDiv').find('*').attr('disabled', true);
        $("#Proyecto").data("kendoComboBox").enable(false);
        $("#InputNumeroControl").addClass("k-state-disabled");

        //$("#Fecha").data("kendoDatePicker").enable(false);
        $('#BotonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

        $("#BotonGuardar2").text("Editar");
        $('#BotonGuardar').text("Editar");
        $('#BotonGuardar4').text("Editar");
        $('#BotonGuardar3').text("Editar");
        $(".formNav").find("#Acciones").css("display", "none");
    }
    else {
        //$('#FieldSetView').find('*').attr('disabled', false);
        $('#AgregadoDiv, #containerDiv').find('*').attr('disabled', false);
        $("#Proyecto").data("kendoComboBox").enable(true);
        $("#InputNumeroControl").removeClass("k-state-disabled");
        $('#BotonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

        $("#BotonGuardar2").text("Guardar");
        $('#BotonGuardar').text("Guardar");
        $('#BotonGuardar4').text("Guardar");
        $('#BotonGuardar3').text("Guardar");
        $(".formNav").find("#Acciones").css("display", "block");
    }
}

function suscribirEventoDescarGaCSV() {
    $("#btnDescargaCsv, #btnDescargaCsv1").click(function (e) {
        window.location.href = "/TemplateOKPND.csv";
    });
}

function suscribirEventoCarGaCSV() {
    $('#btnCargaCsv, #btnCargaCsv1').click(function (e) {
        if ($('#BotonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            var proyectoID = $("#Proyecto").data("kendoComboBox").value();
            if (proyectoID != 0 && proyectoID != undefined && proyectoID != "") {
                $("#files").val("");
                $("#files").click();
            }
            else {
                displayNotify("SPAProyectoCargaMasiva", "", '1');
            }
        }
    });

    document.getElementById("files").addEventListener("change", function (evt) {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            displayNotify("ListadoCatalogos0007", "", '2');
        } else {
            var data = [];
            var file = evt.target.files[0];
            try {
                if (tiposCSV.indexOf(file.type.toLowerCase()) == -1) {
                    this.value = null;
                    displayNotify("ListadoCatalogos0008", "", '2');
                } else {
                    var reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = function (event) {
                        var csvData = event.target.result;

                        csvToJson(csvData, "").forEach(function (c) {
                            data.push(c);
                        });

                        if (error == 0)                            
                            //OBTENEMOS UN ARRAY CON UN ORDEN DE EJECUCION 
                            var newData = ObtenerNewData(data);
                            if (newData.length > 0) {
                                AjaxGuardadoMasivo(newData);                                
                            } else {
                                displayNotify("EditarRequisicionExcepcionGuardado", "", "1");
                            }                            
                        error = 0;
                    };
                    reader.onerror = function () {
                        alert('Unable to read ' + file.fileName);
                    };
                }
            } catch (e) { }
        }
    });
}


function csvToJson(data, field) {
    data = data.split("\n");
    data.shift();
    //data.pop();
    data = data.join("\n");
    data = data.split("\r").join("");
    var encabezados = Object.keys($("#gridMasivo").data("kendoGrid").options.dataSource.schema.model.fields);
    var csv = [];
    try {
        data.split("\n").forEach(function (d, i) {
            if (d.substring(0, d.length).split(",").length === encabezados.length) {
                var tmp = {};
                d.split(",").forEach(function (cell, z) {
                    tmp[encabezados[z]] = cell;
                });
                csv.push(tmp);
            } else {
                if (d.substring(0, d.length).split(",").length != 1) {
                    throw -1;
                    csv = [];
                }
            }
        })
    } catch (e) {
        if (e !== -1) {
            error = 1;
            throw e;
        } else {
            displayNotify("ListadoCatalogos0012", "", '2');
            error = 1;
        }
        csv = [];
    }
    return csv;
}

function suscribirEventoElementosAsignados() {

    $(document).on('click', '.EnlaceDetalleJunta', function (e) {
        e.preventDefault();

        if ($('#BotonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

            LlenarGridPopUp(dataItem.ListaDetalle);
        }
    });
}

function suscribirEventoDesactivaCheckOK() {
    $("#grid").on('click', '.ob-paid', function (e) {        
        if ($('#BotonGuardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            e.preventDefault();            
        }
    });
}
function SuscribirEventoCerrarPopUpJuntas() {
    $("#CerrarDetalleJunta").click(function (e) {
        e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });
}

function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var proyectoID = $("#Proyecto").data("kendoComboBox").value();
        var NumControl = $("#InputNumeroControl").val();

        if (!existenCambios(ds._data)) {
            FiltroMostrar(0);
        }
        else {
            var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                animation: false,
                width: "auto",
                height: "auto",
                actions: [],
                modal: true
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                ventanaConfirm.close();
                AjaxGetListaElementos(proyectoID, NumControl);
            });

            $("#noButtonProy").click(function () {
                $("#InputNumeroControl").val(SpoolContiene);
                $('input[name="Muestra"][value="Todos"]').prop('checked', true);
                ventanaConfirm.close();
            });
        }
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var proyectoID = $("#Proyecto").data("kendoComboBox").value();
        var NumControl = $("#InputNumeroControl").val();

        if (!existenCambios(ds._data)) {
            FiltroMostrar(1);
        }
        else {
            var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                animation: false,
                width: "auto",
                height: "auto",
                modal: true,
                actions: []
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButtonProy").click(function () {
                ventanaConfirm.close();
                AjaxGetListaElementos(proyectoID, NumControl);
            });

            $("#noButtonProy").click(function () {
                $("#InputNumeroControl").val(SpoolContiene);
                $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
                ventanaConfirm.close();
            });
        }
    });
}
function suscribirEventoNumeroControl() {
    $('#InputNumeroControl').keydown(function (e) {
        if (e.keyCode == 13) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var proyectoID = $("#Proyecto").data("kendoComboBox").value();
            var NumControl = $("#InputNumeroControl").val();

            if (!existenCambios(ds._data)) {
                AjaxGetListaElementos(proyectoID, NumControl);
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    animation: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    AjaxGetListaElementos(proyectoID, NumControl);
                });

                $("#noButtonProy").click(function () {
                    $("#InputNumeroControl").val(SpoolContiene);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function ObtenerNewData(data) {    
    try {
        var tmpData = [];
        elementos = [];
        contador = {};
        var tmpNumControl = {};
        if (data.length > 0) {
            for (n in data) {
                tmpData[n] = {
                    NumeroControl: "",
                    //OKPND: "",
                    OK: 0,
                    OE: 0
                };

                if (!isNaN(parseInt(data[n].OKPND.toString().trim()))) {                    
                    tmpNumControl[n] = data[n].NumeroControl.toString().toUpperCase().trim();                    
                    if (!(tmpNumControl[n] in contador))
                        contador[tmpNumControl[n]] = 0;
                    contador[tmpNumControl[n]] += 1;                        
                    
                    tmpData[n].NumeroControl = tmpNumControl[n].toString().toUpperCase().trim();
                    tmpData[n].OK = parseInt(data[n].OKPND.toString().trim());                    
                    tmpData[n].OE = parseInt(contador[tmpNumControl[n]]);
                    console.log("\t\t\t" + tmpData[n].NumeroControl + "\t\t\t" + tmpData[n].OK + "\t\t\t" + tmpData[n].OE);

                } else {
                    displayNotify("ErrorColumnaNoEsNumero", "", "2");
                    return;
                }
                
            }            
        } else {
            //no hay datos
            tmpData = [];            
        }
    } catch (e) {
        if (e !== -1) {
            error = 1;
            throw e;
        } else {
            displayNotify("ListadoCatalogos0012", "", '2');
            error = 1;
        }
    }
    loadingStop();
    return tmpData;
}
