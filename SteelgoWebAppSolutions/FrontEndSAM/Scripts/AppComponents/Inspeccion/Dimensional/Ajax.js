var TipoObrero = "Inspector Visual Dimensional";
var TipoConsultaObrero = 2;
var TipoPrueba = "Inspección dimensional";
var CampoFechaPredeterminada = 24;
var CampoResultadoPredetrminado = 25;
var CampoLlenadoPredeterminado = 26;

function AjaxObtenerListaInspector() {
   
    $Obrero.Obrero.read({ idProyecto: 0, tipo: TipoConsultaObrero, token: Cookies.get("token"), TipoObrero: TipoObrero }).done(function (data) {
        $("#inputInspector").data("kendoComboBox").value("");
        $("#inputInspector").data("kendoComboBox").dataSource.data(data)
    });
   
}
function AjaxObtenerListaDefectos() {
    $Defectos.Defectos.read({ lenguaje: $("#language").val(), TipoPrueba: TipoPrueba, token: Cookies.get("token") }).done(function (data) {
            $("#inputDefecto").data("kendoComboBox").value("");
            $("#inputDefecto").data("kendoComboBox").dataSource.data(data)
    });
}
function AjaxCargaCamposPredetrminados() {
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaPredeterminada }).done(function (data) {
        var NewDate = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDate.val(NewDate);
    });
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoResultadoPredetrminado }).done(function (data) {
        if (data == "Aprobado") {
            $('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', true);
            $('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', false);
            $("input:radio[name=ResultadoDimensional]:checked").change();
            $("#StyleResultadoDimensionalA").addClass("active");
            $("#StyleResultadoDimensionalR").removeClass("active");
        }
        else if (data == "Rechazado") {
            $('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', false);
            $('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', true);
            $("input:radio[name=ResultadoDimensional]:checked").change();
            $("#StyleResultadoDimensionalR").addClass("active");
            $("#StyleResultadoDimensionalA").removeClass("active");
        }
        else {
            $('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', true);
            $('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', false);
            $("input:radio[name=ResultadoDimensional]:checked").change();
            $("#StyleResultadoDimensionalA").addClass("active");
            $("#StyleResultadoDimensionalR").removeClass("active");
        }
    });

    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoLlenadoPredeterminado }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', true);
            $('input:radio[name=LLena]:nth(1)').attr('checked', false);
            $("input:radio[name=LLena]:checked").change();
           
        }
        else if (data == "Vacios") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').attr('checked', true);
            $("input:radio[name=LLena]:checked").change();
           
        }
        else {
            $('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').attr('checked', true);
            $("input:radio[name=LLena]:checked").change();
           
        }


    });
}
function AjaxObtenerSpoolID() {
    try {

        loadingStart();
        $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token") }).done(function (data) {
           
            $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus)
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            loadingStop();

        });
    } catch (e) {
        displayMessage("Mensajes_error", e.message, '2');
    }
}
function AjaxobtenerDetalleDimensional(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: 'todos', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {


        if (data.ListaDetalleDimensional.length == 0) {
            $("#InspeccionDimensionalID").val("0")

        }
        else {
            $("#InspeccionDimensionalID").val(data.ListaDetalleDimensional[0].InspeccionDimensionalID);

        }
        loadingStop();
    });
}

function AjaxObtenerJSonGrid() {

    loadingStart();
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

            }
            loadingStop();
        });

    } catch (e) {
        displayMessage("Mensajes_error", e.message, '2');
    }

   

}


function AjaxGuardar(jSonCaptura) {
    loadingStart();
    Captura = [];
    Captura[0] = { Detalles: "" };

    var mensaje = '';
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
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            mensaje = "Se guardo correctamente la informacion" + "-0";
            displayMessage("CapturaMensajeGuardadoExitoso", "", '1');
        }
        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
            mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
            displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
        }
        loadingStop();
       
    });

    
}
