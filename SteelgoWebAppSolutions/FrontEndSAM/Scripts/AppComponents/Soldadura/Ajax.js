
function AjaxJunta(spoolID) {

    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        console.log("fecha nueva" + data.FechaSoldadura);
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}

function AjaxObtenerListaTaller() {
    $Taller.Taller.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#inputTaller").data("kendoComboBox").value("");
        $("#inputTaller").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}


function ObtenerJSonGridSoldadura() {
    loadingStart();
    if (ExisteJunta()) {
        try {
            getGridSoldadura();

        } catch (e) {
            alert("error:" + e.message);
        }
    }
    else
        alert('La junta ya se agregó')

    loadingStop();

}


function getGridSoldadura()
{
    $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = JSON.parse(data);
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
    });
}

function AjaxGuardarCaptura(arregloCaptura) {
    try {
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];


        for (index = 0; index < arregloCaptura.length; index++) {

            ListaDetalles[index] = {
                Accion: "", OrdenTrabajoSpoolID: "", JuntaSpoolID: "",
                TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "",
                JuntaSoldaduraID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "",
                ProcesoSoldaduraRaizID: "", ProcesoSoldaduraRellenoID: "", FechaSoldadura: "", ListaSoldaduraRaiz: "",
                ListaSoldaduraRelleno: "", ListaDetalleTrabajoAdicional: "", FechaReporte:"",
            };

            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].OrdenTrabajoSpoolID = arregloCaptura[index].idVal;
            ListaDetalles[index].JuntaSpoolID = arregloCaptura[index].JuntaID;
            ListaDetalles[index].TipoJuntaID = arregloCaptura[index].TipoJuntaID;
            ListaDetalles[index].EtiquetaJunta = arregloCaptura[index].Junta;
            ListaDetalles[index].EtiquetaMaterial1 = arregloCaptura[index].EtiquetaMaterial1;
            ListaDetalles[index].EtiquetaMaterial2 = arregloCaptura[index].EtiquetaMaterial2;
            ListaDetalles[index].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
            ListaDetalles[index].NumeroUnico1ID = arregloCaptura[index].NumeroUnico1ID;
            ListaDetalles[index].NumeroUnico2ID = arregloCaptura[index].NumeroUnico2ID;
            ListaDetalles[index].TallerID = arregloCaptura[index].TallerID;
            ListaDetalles[index].ProcesoSoldaduraRaizID = arregloCaptura[index].procesoSoldaduraRaizID;
            ListaDetalles[index].ProcesoSoldaduraRellenoID = arregloCaptura[index].procesoSoldaduraRellenoID;
            ListaDetalles[index].FechaSoldadura = kendo.toString(arregloCaptura[index].FechaSoldadura, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));

            
            ListaTrabajosAdicionalesEditados = [];
            for (j = 0; j < arregloCaptura[index].DetalleAdicional.length; j++) {

                ListaTrabajosAdicionalesEditados[j] = {
                    JuntaSpoolID: "", ProcesoSoldaduraRaizID: "",
                    ProcesoSoldaduraRellenoID: "", EtiquetaJunta: "", EtiquetaMaterial1: "",
                    EtiquetaMaterial2: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "",
                    Accion: "", JuntaID: "", SoldaduraTrabajoAdicionalID: "", JuntaSoldaduraID: "",
                    TrabajoAdicionalID: "", ObreroID: "", Observacion: ""
                }
                ListaTrabajosAdicionalesEditados[j].Accion = arregloCaptura[index].DetalleAdicional[j].Accion;
                ListaTrabajosAdicionalesEditados[j].JuntaID = arregloCaptura[index].DetalleAdicional[j].JuntaID;
                ListaTrabajosAdicionalesEditados[j].SoldaduraTrabajoAdicionalID = arregloCaptura[index].DetalleAdicional[j].SoldaduraTrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].JuntaSoldaduraID = arregloCaptura[index].DetalleAdicional[j].JuntaSoldaduraID;
                ListaTrabajosAdicionalesEditados[j].JuntaSpoolID = arregloCaptura[index].DetalleAdicional[j].JuntaSpoolID;
                ListaTrabajosAdicionalesEditados[j].TrabajoAdicionalID = arregloCaptura[index].DetalleAdicional[j].TrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].TallerID = arregloCaptura[index].DetalleAdicional[j].TallerID
                ListaTrabajosAdicionalesEditados[j].ObreroID = arregloCaptura[index].DetalleAdicional[j].ObreroID;
                ListaTrabajosAdicionalesEditados[j].Observacion = arregloCaptura[index].DetalleAdicional[j].Observacion;
            }


            ListaRaizEditados = [];
            for (j = 0; j < arregloCaptura[index].Raiz.length; j++) {

                ListaRaizEditados[j] = {
                    Accion: "", JuntaID: "",
                    SoldaduraTrabajoAdicionalID: "", JuntaSoldaduraID: "",
                    TipoSoldaduraID: "", ObreroID: ""
                };
                ListaRaizEditados[j].Accion = arregloCaptura[index].Raiz[j].Accion;
                ListaRaizEditados[j].JuntaID = arregloCaptura[index].Raiz[j].JuntaID;
                ListaRaizEditados[j].SoldaduraTrabajoAdicionalID = arregloCaptura[index].Raiz[j].SoldaduraTrabajoAdicionalID;
                ListaRaizEditados[j].JuntaSoldaduraID = arregloCaptura[index].Raiz[j].JuntaSoldaduraID;
                ListaRaizEditados[j].TipoSoldaduraID = arregloCaptura[index].Raiz[j].TipoSoldaduraID;
                ListaRaizEditados[j].ObreroID = arregloCaptura[index].Raiz[j].ObreroID;
            }

            ListaRellenoEditados = [];
            for (j = 0; j < arregloCaptura[index].Relleno.length; j++) {

                ListaRellenoEditados[j] = {
                    Accion: "", JuntaID: "", SoldaduraTrabajoAdicionalID: "",
                    JuntaSoldaduraID: "", ObreroID: "", TipoSoldaduraID: "", 
                };
                ListaRellenoEditados[j].Accion = arregloCaptura[index].Relleno[j].Accion;
                ListaRellenoEditados[j].JuntaID = arregloCaptura[index].Relleno[j].JuntaID;
                ListaRellenoEditados[j].SoldaduraTrabajoAdicionalID = arregloCaptura[index].Relleno[j].SoldaduraTrabajoAdicionalID;
                ListaRellenoEditados[j].JuntaSoldaduraID = arregloCaptura[index].Relleno[j].JuntaSoldaduraID;
                ListaRellenoEditados[j].TipoSoldaduraID = arregloCaptura[index].Relleno[j].TipoSoldaduraID;
                ListaRellenoEditados[j].ObreroID = arregloCaptura[index].Relleno[j].ObreroID;
            }

            ListaDetalles[index].ListaSoldaduraRelleno = ListaRellenoEditados;
            ListaDetalles[index].ListaSoldaduraRaiz = ListaRaizEditados;
            ListaDetalles[index].ListaDetalleTrabajoAdicional = ListaTrabajosAdicionalesEditados;
        }

        Captura[0].Detalles = ListaDetalles;

        $CapturaSoldadura.Soldadura.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(ArregloListadoSpoolID()), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (result) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(result);
                for (var i = 0; i < array.length; i++) {
                    ds.add(array[i]);
                }
            });
        });

        
        alert('finalizo el guardado de datos');
    } catch (e) {
        alert('error al guardar datos ' + e.message);
    }

};

function AjaxCargarCamposPredeterminados() {


    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Muestra == "Sincaptura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', true);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', false);
        }
        else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
        }

        if (data.Llena == "Todos") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', true);
            $('input:radio[name=LLena]:nth(1)').attr('checked', false);
        }
        else if (data.Llena == "Vacios") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').attr('checked', true);
        }
    });

};