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

function AjaxobtenerDetalleDimensional(spoolID)
{
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: 'todos', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        
       
        if (data.ListaDetalleDimensional.length == 0) {
            $("#InspeccionDimensionalID").val("0")
        }
        else
        {
            if (data.ListaDetalleDimensional[0].ResultadoID == 1) {//aprobado
                $('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', true);
                $('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', false);
                $("input:radio[name=ResultadoDimensional]:checked").change();
            }
            else if (data.ListaDetalleDimensional[0].ResultadoID == 2) {//rechazado
                $('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', false);
                $('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', true);
                $("input:radio[name=ResultadoDimensional]:checked").change();
            }

            $("#inputDefecto").data("kendoComboBox").value(data.ListaDetalleDimensional[0].DefectoID);
            $("#inputInspector").data("kendoComboBox").value(data.ListaDetalleDimensional[0].ObreroID);
            $("#InspeccionDimensionalID").val(data.ListaDetalleDimensional[0].InspeccionDimensionalID); 
            endRangeDate.val(data.ListaDetalleDimensional[0].FechaInspeccion);

        }
        loadingStop();
    });
}

function AjaxJunta(spoolID) {
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: 'todos', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data.ListaJuntaXSpoolID)

      
        
        loadingStop();
    });
}
function AjaxObtenerJSonGrid() {

    loadingStart();
    //if (ExisteJunta()) {
        try {

            $Inspeccion.Inspeccion.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {

                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);

                for (var i = 0; i < array.length; i++) {
                    array[i].NumeroUnico1 = array[i].NumeroUnico1 == "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
                    array[i].NumeroUnico2 = array[i].NumeroUnico2 == "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
                    ds.add(array[i]);
                  
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





function AjaxGuardar(jSonCaptura)
{
    loadingStart();
    //if (ExisteJunta()) {
    Captura = [];
    Captura[0] = { Detalles: "" };


    inspeccionDimensional = [];


    ListaDetalleGuardarInspeccionVisual = []
    for (index = 0; index < jSonCaptura.length; index++) {
        ListaDetalleGuardarInspeccionVisual[index] = { Accion: "", OrdenTrabajoSpoolID: "", TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "", DefectosID: "", InspectorID: "", FechaInspeccion: "", JuntaTrabajoID: "", ResultadoID: "", TallerID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", InspeccionVisualID:"" };
        ListaDetalleGuardarInspeccionVisual[index].Accion = jSonCaptura[index].Accion;
        ListaDetalleGuardarInspeccionVisual[index].OrdenTrabajoSpoolID = jSonCaptura[index].OrdenTrabajoSpoolID;
        ListaDetalleGuardarInspeccionVisual[index].TipoJuntaID = jSonCaptura[index].TipoJuntaID;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaJunta = jSonCaptura[index].Junta;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaMaterial1 = jSonCaptura[index].EtiquetaMaterial1;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaMaterial2 = jSonCaptura[index].EtiquetaMaterial2;
        ListaDetalleGuardarInspeccionVisual[index].DefectosID = jSonCaptura[index].DefectosID;
        ListaDetalleGuardarInspeccionVisual[index].InspectorID = jSonCaptura[index].InspectorID;
        ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion = kendo.toString(jSonCaptura[index].FechaInspeccion.split(' ')[0], String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
        ListaDetalleGuardarInspeccionVisual[index].JuntaTrabajoID = jSonCaptura[index].JuntaTrabajoID;
        ListaDetalleGuardarInspeccionVisual[index].ResultadoID = jSonCaptura[index].ResultadoID;
        ListaDetalleGuardarInspeccionVisual[index].TallerID = jSonCaptura[index].TallerID;
        ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID = jSonCaptura[index].NumeroUnico1ID;
        ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID = jSonCaptura[index].NumeroUnico2ID;
    }

    inspeccionDimensional[0] = { Lenguaje: "", InspeccionDimensionalID: "", OrdenTrabajoSpoolID: "", FechaInspeccion: "", ResultadoID: "", ObreroID: "", DefectoID: "", ListaDetalleGuardarInspeccionVisual: "" }

    inspeccionDimensional[0].Lenguaje = $("#language").val();

    inspeccionDimensional[0].InspeccionDimensionalID = $("#InspeccionDimensionalID").val();

    inspeccionDimensional[0].OrdenTrabajoSpoolID =  $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor;

    inspeccionDimensional[0].FechaInspeccion = kendo.toString(new Date($("#FechaInspeccion").data("kendoDatePicker").value()), String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));

    inspeccionDimensional[0].ResultadoID = $('input:radio[name=ResultadoDimensional]:checked').val()=="Aprobado"?1:2;

    inspeccionDimensional[0].ObreroID = $("#inputInspector").data("kendoComboBox").dataItem($("#inputInspector").data("kendoComboBox").select()).ObreroID;

    inspeccionDimensional[0].DefectoID =$("#inputDefecto").data("kendoComboBox").select()==-1? null: $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID;

    inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual = ListaDetalleGuardarInspeccionVisual;

    Captura[0].Detalles = inspeccionDimensional;

    $Inspeccion.Inspeccion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        console.log("se guardo correctamente la informacion");
    });

    loadingStop();
}
