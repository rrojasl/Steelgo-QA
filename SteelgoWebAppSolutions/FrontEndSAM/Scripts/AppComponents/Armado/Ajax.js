function AjaxJunta(spoolID) {
    $('input:radio[name=Muestra]:checked').val()
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        console.log("fecha nueva" + data.FechaArmado);
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}

function AjaxObtenerListaTubero() {
    $CapturaArmado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], tipo: 4, token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#inputTubero").data("kendoComboBox").value("");
        $("#inputTubero").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}

function AjaxObtenerListaTaller() {
    $CapturaArmado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#inputTaller").data("kendoComboBox").value("");
        $("#inputTaller").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}

function ObtenerJSonGridArmado() {

    loadingStart();
    if (ExisteJunta()) {
        try {

            $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);

                for (var i = 0; i < array.length; i++) {
                    array[i].NumeroUnico1 = array[i].NumeroUnico1 == "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
                    array[i].NumeroUnico2 = array[i].NumeroUnico2 == "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
                    ds.add(array[i]);
                    // AplicarAsignacionAutomaticaNumeroUnico(array[i], "" , dataItem, 0);
                }
            });

        } catch (e) {
            alert("error:" + e.message);
        }
    }
    else
        alert('La junta ya existe')

    loadingStop();

}

function AjaxGuardarCaptura(arregloCaptura) {
    try {

        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
      

        for (index = 0; index < arregloCaptura.length; index++) {

            ListaDetalles[index] = { Accion: "", IdVal: "", JuntaID: "", TipoJuntaID: "", Junta: "", Localizacion1: "", Localizacion2: "", JuntaArmadoID: "", JuntaTrabajoID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "", TuberoID: "", FechaArmado: "", ListaDetalleTrabajoAdicional: "" };
            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].IdVal = arregloCaptura[index].IdVal;
            ListaDetalles[index].JuntaID = arregloCaptura[index].JuntaID;
            ListaDetalles[index].TipoJuntaID = arregloCaptura[index].TipoJuntaID;
            ListaDetalles[index].Junta = arregloCaptura[index].Junta;
            ListaDetalles[index].Localizacion1 = arregloCaptura[index].Localizacion.split('-')[0];
            ListaDetalles[index].Localizacion2 = arregloCaptura[index].Localizacion.split('-')[1];
            ListaDetalles[index].JuntaArmadoID = arregloCaptura[index].JuntaArmadoID;
            ListaDetalles[index].JuntaTrabajoID = arregloCaptura[index].JuntaTrabajoID;
            ListaDetalles[index].NumeroUnico1ID = arregloCaptura[index].NumeroUnico1ID;
            ListaDetalles[index].NumeroUnico2ID = arregloCaptura[index].NumeroUnico2ID;
            ListaDetalles[index].TallerID = arregloCaptura[index].TallerID;
            ListaDetalles[index].TuberoID = arregloCaptura[index].TuberoID;
            ListaDetalles[index].FechaArmado = kendo.toString(arregloCaptura[index].FechaArmado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));

            ListaTrabajosAdicionalesEditados = [];
            for (j = 0; j < arregloCaptura[index].ListaDetalleTrabajoAdicional.length; j++) {
                
                ListaTrabajosAdicionalesEditados[j] = { Accion: "", JuntaID: "", ArmadoTrabajoAdicionalID: "", JuntaArmadoID: "", TrabajoAdicionalID: "", ObreroID: "", Observacion: "" }
                ListaTrabajosAdicionalesEditados[j].Accion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Accion;
                ListaTrabajosAdicionalesEditados[j].JuntaID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].JuntaID;
                ListaTrabajosAdicionalesEditados[j].ArmadoTrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ArmadoTrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].JuntaArmadoID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].JuntaArmadoID;
                ListaTrabajosAdicionalesEditados[j].TrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].TrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].ObreroID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ObreroID;
                ListaTrabajosAdicionalesEditados[j].Observacion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Observacion;
            }

            ListaDetalles[index].ListaDetalleTrabajoAdicional = ListaTrabajosAdicionalesEditados;
        }

        Captura[0].Detalles = ListaDetalles;

        $CapturaArmado.Armado.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            console.log("se guardo correctamente la informacion");
        });
        alert('finalizo el guardado de datos');
    } catch (e) {
        alert('error al guardar datos ' + e.message);
    }

};

function AjaxCargarFechaArmado() {

  
    

    $CapturaArmado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        console.log("fecha nueva" + data.FechaArmado);

        var NewDate = kendo.toString(data.FechaArmado,  _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        
        endRangeDate.val(NewDate);
        
        if (data.Muestra == "Sincaptura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', true);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', false);
        }
        else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
        }
        loadingStop();
    });
    
};