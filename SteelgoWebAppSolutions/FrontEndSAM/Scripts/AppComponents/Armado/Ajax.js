function AjaxJunta(spoolID) {

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

            $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token") }).done(function (data) {

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
         
        $.each(arregloCaptura, function (index, value) {
            ListaDetalles[index] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", IdVal: "", IdText: "", SpoolID: "", JuntaID: "", Junta: "", FechaArmado: "", TuberoID: "", Tubero: "", TallerID: "", Taller: "", TipoJunta: "", Diametro: "", Cedula: "", Localizacion: "", FamiliaAcero: "", NumeroUnico1: "", NumeroUnico2: "", SinCaptura: "" }
            ListaDetalles[index].IDProyecto = value.IDProyecto;
            ListaDetalles[index].Proyecto = value.Proyecto;
            ListaDetalles[index].IdOrdenTrabajo = value.IdOrdenTrabajo;
            ListaDetalles[index].OrdenTrabajo = value.OrdenTrabajo;
            ListaDetalles[index].IdVal = value.IdVal;
            ListaDetalles[index].IdText = value.IdText;
            ListaDetalles[index].SpoolID = value.SpoolID;
            ListaDetalles[index].JuntaID = value.JuntaID;
            ListaDetalles[index].Junta = value.Junta;
            ListaDetalles[index].FechaArmado = value.FechaArmado;
            ListaDetalles[index].TuberoID = value.tuberoID;
            ListaDetalles[index].Tubero = value.Tubero;
            ListaDetalles[index].TallerID = value.TallerID;
            ListaDetalles[index].Taller = value.Taller;
            ListaDetalles[index].TipoJunta = value.TipoJunta;
            ListaDetalles[index].Diametro = value.Diametro;
            ListaDetalles[index].Cedula = value.Cedula;
            ListaDetalles[index].Localizacion = value.Localizacion;
            ListaDetalles[index].FamiliaAcero = value.FamiliaAcero;
            ListaDetalles[index].NumeroUnico1 = value.NumeroUnico1;
            ListaDetalles[index].NumeroUnico2 = value.NumeroUnico2;
            ListaDetalles[index].SinCaptura = value.SinCaptura;
        });
        Captura[0].Detalles = ListaDetalles;


        $CapturaArmado.Armado.create(Captura[0], { token: Cookies.get("token"), xd: "" }).done(function (data) {
            console.log("se guardo correctamente la informacion");
        });
        alert('finalizo el guardado de datos');
    } catch (e) {
        alert('error al guardar datos ' + e.message);
    }

};