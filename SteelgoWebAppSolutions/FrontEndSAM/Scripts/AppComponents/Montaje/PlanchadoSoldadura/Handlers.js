
function SuscribirEventos() {
    suscribirEventoCarGaCSV();
    //suscribirEventoDescarGaCSV();   
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
                                AjaxGuardadoMasivo(newData)
                                
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