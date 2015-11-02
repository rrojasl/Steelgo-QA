var TipoObrero = "Inspector Visual Dimensional";
var TipoConsultaObrero = 2;
var TipoPrueba = "Inspección dimensional";
var CampoFechaPredeterminada = 4;

function AjaxObtenerListaInspector() {
    $Obrero.Obrero.read({ idProyecto: 0, tipo: TipoConsultaObrero, token: Cookies.get("token"), TipoObrero: TipoObrero }).done(function (data) {
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
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaPredeterminada }).done(function (data) {
        loadingStart();
        var NewDate = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
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

function AjaxobtenerDetalleDimensional(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: 'todos', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {


        if (data.ListaDetalleDimensional.length == 0) {
            $("#InspeccionDimensionalID").val("0")
            //var arrayCapturado= 

            //for (var i = 0; i < array.length; i++) {
            //    array[i].NumeroUnico1 = array[i].NumeroUnico1 == "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
            //    array[i].NumeroUnico2 = array[i].NumeroUnico2 == "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
            //    ds.add(array[i]);
            //}

        }
        else {
            //if (data.ListaDetalleDimensional[0].ResultadoID == 1) {//aprobado
            //    $('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', true);
            //    $('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', false);
            //    $("input:radio[name=ResultadoDimensional]:checked").change();
            //}
            //else if (data.ListaDetalleDimensional[0].ResultadoID == 2) {//rechazado
            //    $('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', false);
            //    $('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', true);
            //    $("input:radio[name=ResultadoDimensional]:checked").change();
            //}

            //$("#inputDefecto").data("kendoComboBox").value(data.ListaDetalleDimensional[0].DefectoID);
            //$("#inputInspector").data("kendoComboBox").value(data.ListaDetalleDimensional[0].ObreroID);
            $("#InspeccionDimensionalID").val(data.ListaDetalleDimensional[0].InspeccionDimensionalID);
            //endRangeDate.val(data.ListaDetalleDimensional[0].FechaInspeccion);

        }
        loadingStop();
    });
}

function AjaxObtenerJSonGrid() {

    loadingStart();
    //if (ExisteJunta()) {
    try {

        $InspeccionDimensional.InspeccionDimensional.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {

            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = JSON.parse(data);
            if (array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    array[i].NumeroUnico1 = array[i].NumeroUnico1 == "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
                    array[i].NumeroUnico2 = array[i].NumeroUnico2 == "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
                    ds.add(array[i]);

                }
            }
            else {
                //displayMessage("Spool ID no asignada", "xd", '1');
            }
        });

    } catch (e) {
        alert("error:" + e.message);
    }
    //}
    //else
    //    alert('La junta ya existe')

    loadingStop();

}





function AjaxGuardar(jSonCaptura) {
    loadingStart();
    //if (ExisteJunta()) {
    Captura = [];
    Captura[0] = { Detalles: "" };


    inspeccionDimensional = [];
    for (index = 0; index < jSonCaptura.length; index++) {
        inspeccionDimensional[index] = { Accion: "", InspeccionDimensionalID: "", FechaInspeccion: "", ResultadoID: "", Resultado: "", InspectorID: "", Inspector: "", DefectosID: "", Defectos: "", OrdenTrabajoSpoolID: "" }

        inspeccionDimensional[index].Accion = jSonCaptura[index].Accion;

        inspeccionDimensional[index].InspeccionDimensionalID = jSonCaptura[index].InspeccionDimensionalID;

        inspeccionDimensional[index].OrdenTrabajoSpoolID = jSonCaptura[index].OrdenTrabajoSpoolID;

        inspeccionDimensional[index].ResultadoID = jSonCaptura[index].ResultadoID;

        inspeccionDimensional[index].DefectosID = jSonCaptura[index].DefectosID;

        inspeccionDimensional[index].InspectorID = jSonCaptura[index].InspectorID;

        inspeccionDimensional[index].FechaInspeccion = kendo.toString(jSonCaptura[index].FechaInspeccion, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));

            
    }
    Captura[0].Detalles = inspeccionDimensional;

    $InspeccionDimensional.InspeccionDimensional.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.ReturnMessage == "ok")
            displayMessage("Se guardo correctamente la informacion", "", '0');
        console.log("se guardo correctamente la informacion");
    });

    loadingStop();
}
