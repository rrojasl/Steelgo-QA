var tiposCSV = ["application/csv", "application/excel", "application/lotus123", "application/msexcel", "application/vnd.lotus-1-2-3", "application/vnd.ms-excel", "application/vnd.ms-works", "application/vnd.msexcel", "application/wk1", "application/wks", "application/x-123", "application/x-dos_ms_excel", "application/x-excel", "application/x-lotus123", "application/x-ms-excel", "application/x-msexcel", "application/x-msworks", "application/x-wks", "application/x-xls", "application/xlc", "application/xls", "text/anytext", "text/comma-separated-values", "text/csv", "zz-application/zz-winassoc-wk1"];
var error = 0;

function SuscribirEventos() {
    suscribirEventoCarGaCSV();
    suscribirEventoDescarGaCSV();
}


function suscribirEventoDescarGaCSV() {
    $("#btnDescargaCsv, #btnDescargaCsv1").click(function (e) {
        window.location.href = "/TemplateOKPND.csv";
    });
}

function suscribirEventoCarGaCSV() {
    $('#btnCargaCsv, #btnCargaCsv1').click(function (e) {
        $("#files").val("");
        $("#files").click();
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
                        if (newData != undefined) {
                            if (newData.length > 0) {
                                var dataRevision = validarJuntaSpoolRepetido(newData);
                                AjaxGuardadoMasivo(dataRevision);

                            } else {
                                displayNotify("EditarRequisicionExcepcionGuardado", "", "1");
                            }
                        } else {
                            displayNotify("notificationslabel0084", "", "2");
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


function ObtenerNewData(data) {
    try {
        var tmpData = [];
        elementos = [];
        contador = {};
        var tmpNumControl = {};
        if (data.length > 0) {
            for (n in data) {
                tmpData[n] = {
                    JuntaSpoolid: 0,
                    FechaEntregaReporteArmado: "",
                    FechadeArmado: "",
                    ClaveTubero: "",
                    FechaEntregaReporteSoldadura: "",
                    FechaSoldadura: "",
                    ClaveSoldador1: "",
                    ClaveSoldador2: "",
                    Wps: "",
                    Proceso: "",
                    Material1: "",
                    Material2: "",
                    LiberacionArmado: "",
                    FechaLiberacionArmado: "",
                    LiberacionDimensional: "",
                    FechaLiberacionDimensional: "",
                    LiberacionVisual: "",
                    FechaLiberacionVisual: "",
                    Repetido: 0
                };
                //if (data[n].OKPND.toString().trim() === "") { data[n].OKPND = 0 };

                if (!isNaN(parseInt(data[n].JuntaSpoolid.trim()))) {

                    //tmpNumControl[n] = data[n].NumeroControl.toString().toUpperCase().trim();

                    tmpData[n].JuntaSpoolid = parseInt(data[n].JuntaSpoolid.trim());
                    tmpData[n].FechaEntregaReporteArmado = (new Date(ObtenerDato(data[n].FechaEntregaReporteArmado.trim(), 1), ObtenerDato(data[n].FechaEntregaReporteArmado.trim(), 2), ObtenerDato(data[n].FechaEntregaReporteArmado.trim(), 3))).toISOString().slice(0, 10).replace(/-/g, "");//año, mes, dia;
                    tmpData[n].FechadeArmado = (new Date(ObtenerDato(data[n].FechadeArmado.trim(), 1), ObtenerDato(data[n].FechadeArmado.trim(), 2), ObtenerDato(data[n].FechadeArmado.trim(), 3))).toISOString().slice(0, 10).replace(/-/g, "");//año, mes, dia;
                    tmpData[n].ClaveTubero = data[n].ClaveTubero.toString().trim();
                    tmpData[n].FechaEntregaReporteSoldadura = (new Date(ObtenerDato(data[n].FechadeArmado.trim(), 1), ObtenerDato(data[n].FechadeArmado.trim(), 2), ObtenerDato(data[n].FechadeArmado.trim(), 3))).toISOString().slice(0, 10).replace(/-/g, "");//año, mes, dia;
                    tmpData[n].FechaSoldadura = (new Date(ObtenerDato(data[n].FechadeArmado.trim(), 1), ObtenerDato(data[n].FechadeArmado.trim(), 2), ObtenerDato(data[n].FechadeArmado.trim(), 3))).toISOString().slice(0, 10).replace(/-/g, "");//año, mes, dia;
                    tmpData[n].ClaveSoldador1 = data[n].ClaveSoldador1.toString().trim();
                    tmpData[n].ClaveSoldador2 = data[n].ClaveSoldador2.toString().trim();
                    tmpData[n].Wps = data[n].Wps.toString().trim();
                    tmpData[n].Proceso = data[n].Proceso.toString().trim();
                    tmpData[n].Material1 = data[n].Material1.toString().trim();
                    tmpData[n].Material2 = data[n].Material2.toString().trim();
                    tmpData[n].LiberacionArmado = data[n].LiberacionArmado.toString().trim();
                    tmpData[n].FechaLiberacionArmado = (new Date(ObtenerDato(data[n].FechadeArmado.trim(), 1), ObtenerDato(data[n].FechadeArmado.trim(), 2), ObtenerDato(data[n].FechadeArmado.trim(), 3))).toISOString().slice(0,10).replace(/-/g,"");//año, mes, dia;
                    tmpData[n].LiberacionDimensional = data[n].LiberacionDimensional.toString().trim();
                    tmpData[n].FechaLiberacionDimensional = (new Date(ObtenerDato(data[n].FechadeArmado.trim(), 1), ObtenerDato(data[n].FechadeArmado.trim(), 2), ObtenerDato(data[n].FechadeArmado.trim(), 3))).toISOString().slice(0, 10).replace(/-/g, "");//año, mes, dia;
                    tmpData[n].LiberacionVisual = data[n].LiberacionVisual.toString().trim();
                    tmpData[n].FechaLiberacionVisual = (new Date(ObtenerDato(data[n].FechadeArmado.trim(), 1), ObtenerDato(data[n].FechadeArmado.trim(), 2), ObtenerDato(data[n].FechadeArmado.trim(), 3))).toISOString().slice(0, 10).replace(/-/g, "");//año, mes, dia;
                    tmpData[n].Repetido = 0;

                } else {
                    displayNotify("ErrorColumnaTieneLetras", "", "2");
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
            //displayNotify("ListadoCatalogos0012", "", '2');
            displayNotify("ErrorColumnaTieneRegistroVacio", "", "2");
            error = 1;
        }
    }
    loadingStop();
    return tmpData;
}



function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura == 'es-MX')
                return fecha.split('/')[1] - 1
            else
                return fecha.split('/')[0] - 1
            break;
        case 3://dia
            if (cultura == 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}
