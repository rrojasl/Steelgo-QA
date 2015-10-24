var TipoObrero = 3;
var TipoPrueba = "Inspección dimensional";
var CampoFechaPredeterminada = 4;

function AjaxObtenerListaInspector() {
    $Obrero.Obrero.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], tipo: TipoObrero, token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#inputInspector").data("kendoComboBox").value("");
        $("#inputInspector").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}
function AjaxObtenerListaDefectos() {
    $Defectos.Defectos.read({ lenguaje: $("#language").val(), TipoPrueba: TipoPrueba, token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#inputDefecto").data("kendoComboBox").value("");
        $("#inputDefecto").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}
function AjaxCargarFechaInspeccionDimencional() {
        var valor = $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaPredeterminada }).done(function (data) {
        loadingStart();
       
        var NewDate = kendo.toString(valor, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

      
        loadingStop();
    });
};
function AjaxObtenerSpoolID() {
    try {
        $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token") }).done(function (data) {
            loadingStart();
            $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus)

            loadingStop();

        });
    } catch (e) {
        alert(e.message);
    }
}
function AjaxJunta(spoolID) {
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}





function ObtenerJSonGrid() {

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
function AjaxGuardar()
{ }
