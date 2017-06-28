IniciarCaptura();

function IniciarCaptura() {
    SuscribirEventos();
};

function changeLanguageCall() {
    //CargarGrid();
    document.title = _dictionary.PlanchadoSoldaduraBreadcrumb[$("#language").data("kendoDropDownList").value()];
    
};


function validarJuntaSpoolRepetido(data) {

    for (var i = 0; i < data.length; i++) {
        if (data[i].Repetido == 0) {
            var aux1 = data[i].JuntaSpoolid;
            for (var j = 0; j < data.length; j++) {
                if (aux1 == data[j].JuntaSpoolid && i != j) {
                    data[j].Repetido = 1;
                }
            }
        }
    }
    return data;
}


function csvToJson(data, field) {
    data = data.split("\n");
    data.shift();
    //data.pop();
    data = data.join("\n");
    data = data.split("\r").join("");

    var cabeceras = ["JuntaSpoolid", "FechaEntregaReporteArmado", "FechadeArmado", "ClaveTubero", "FechaEntregaReporteSoldadura",
                    "FechaSoldadura", "ClaveSoldador1", "ClaveSoldador2", "Wps", "Proceso", "Material1", "Material2", "LiberacionArmado",
                    "FechaLiberacionArmado", "LiberacionDimensional", "FechaLiberacionDimensional", "LiberacionVisual", "FechaLiberacionVisual"];

    var encabezados = cabeceras;
    var csv = [];
    try {
        data.split("\n").forEach(function (d, i) {
            if (d.substring(0, d.length).split(",").length === encabezados.length) {    
                var tmp = {};
                d.split(",").forEach(function (cell, z) {
                    //Verificamos celdas vacias
                    if (cell !== "") {
                        tmp[encabezados[z]] = cell;
                    } else {
                        //throw -1;
                        //csv = [];                        
                        //si la celda esta vacía le agrego un espacio o un caracter
                        tmp[encabezados[z]] = ' ';
                    }
                });
                csv.push(tmp);
            } else {
                if (d.substring(0, d.length).split(",").length != 1) {
                    throw -1;
                    csv = [];
                    displayNotify("ListadoCatalogos0012", "", "2");
                }
            }
        })
    } catch (e) {
        if (e !== -1) {
            error = 1;
            throw e;
        } else {
            displayNotify("ErrorColumnaTieneRegistroVacio", "", "2");
            error = 1;
        }
        csv = [];
    }
    return csv;
}



