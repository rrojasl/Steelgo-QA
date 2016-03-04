function SuscribirEventos() {

    //Proyecciones
    SuscribirEventoVentanaProyectar();
    SuscribirEventoComboBoxProyecciones();
    SuscribirEventoPreguntaCrearNuevaProyeccion();
    SuscribirEventoPreguntaUtilizarProyeccionExistente();
    SuscribirEventoCrearNuevaProyeccion(); 
    SuscribirEventoUtilizarProyeccionExistente();
    SuscribirEventoTalleres();
    SuscribirEventoCambiarProyeccionDeTaller();
    SuscribirEventoEliminarProyeccion();

    //Emision
    SuscribirEventoEmitir();

    //Encabezado-Mostrar
    SuscribirEventoMostrar();
    SuscribirEventoProyecto();
    SuscribirEventoPatio();


}

//Proyectar
function SuscribirEventoVentanaProyectar() {
    $("#Proyectar").click(function () {
        if (ValidarValoresAntesDeProyectar()) {
            $("#divProyectarWindow").kendoWindow({
                modal: true,
                // title:,
                resizable: false,
                visible: true,
                width: "50%",
                minWidth: "20%",

                position: {
                    top: "1%",
                    left: "1%"
                },
                actions: [
                    "Close"
                ],
            }).data("kendoWindow");
            $("#divProyectarWindow").data("kendoWindow").title("Proyectar");
            $("#divProyectarWindow").data("kendoWindow").center().open();

            $("#divProyectarWindow").data("kendoWindow").bind("close", function (e) {
                $("#ProyectarPreguntaDiv").show();
                $("#cmbSeleccionarProyeccion").hide();
                $("#inputCrearProyeccion").hide();
            });
        }
    });  
}

function SuscribirEventoComboBoxProyecciones() {   
    $("#inputProyecciones").kendoComboBox({
        dataTextField: "Proyeccion",
        dataValueField: "ProyeccionID ",
        suggest: true, 
        filter: "contains",
        index: 3
    });
}

function SuscribirEventoPreguntaCrearNuevaProyeccion() {
    $("#btnCrearNuevaProyeccion").click(function () {
        $("#ProyectarPreguntaDiv").hide();
        $("#inputCrearProyeccion").show();
    });
}

function SuscribirEventoPreguntaUtilizarProyeccionExistente() {
    $("#btnUtilizarProyeccionExistente").click(function () { 
        if ($("tr.proyeccion").length > 0) {
            $("#ProyectarPreguntaDiv").hide();
            ObtenerProyeccionesExistentes();
            $("#cmbSeleccionarProyeccion").show();
        }
        else {
            displayMessage("AdvertenciaNoExistenProyecciones", "", '2');
        }
    });
}

function SuscribirEventoCrearNuevaProyeccion() {
    $("#btnCrearProyeccion").click(function () {
        $("#divTallerWindow").kendoWindow({
            modal: true,
            // title:,
            resizable: false,
            visible: true,
            width: "50%",
            minWidth: "20%",

            position: {
                top: "1%",
                left: "1%"
            },
            actions: [
                "Close"
            ],
        }).data("kendoWindow");
         
        var existeProyeccion = false;

        if ($("#inputWindowProyeccion").val().length > 0) {
            if ($("#inputTalleresWindow").val().length > 0) {
                $.each($("tr.proyeccion"), function (index, proyeccion) {
                    if ($(proyeccion).attr("nombre") == $("#inputWindowProyeccion").val()) {
                        existeProyeccion = true;
                    }
                });

                if (!existeProyeccion) {
                    CalcularValoresProyecciones(true, $("#inputTalleresWindow").val());
                }
                else {
                    displayMessage("AdvertenciaExisteProyeccion", "", '2');
                }
            }
            else {
                displayMessage("AdvertenciaElegirTaller", "", '2');
            }
        }
        else {
            displayMessage("AdvertenciaNombreProyeccion", "", '2');
        }
    });
}

function SuscribirEventoTalleres() { 
    $("#inputTalleresWindow").kendoComboBox({
        dataTextField: "Taller",
        dataValueField: "TallerID ",
        suggest: true, 
        filter: "contains",
        index: 3
    });
}
 
function SuscribirEventoUtilizarProyeccionExistente() {
    $("#btnSeleccionaProyeccion").click(function () { 
        CalcularValoresProyecciones(false,0);
    });
}

function SuscribirEventoCambiarProyeccionDeTaller() {       
    $(document).on('change', 'input.proyeccion', function (e) {
        var tallerID = $(this).attr("tallerid");
        var proyeccionID = $(this).attr("proyeccionid");

        CambiarProyeccionDeTaller(tallerID, proyeccionID);
    });
}

function SuscribirEventoEliminarProyeccion() {
    $(document).on('click', '.eliminarProyeccion', function (e) { 
        var proyeccionID = $(this).attr("proyeccionid");
        var nombreProyeccion = $(this).attr("nombreproyeccion");

        ventanaConfirm = $("#divEliminarProyeccionWindow").kendoWindow({
            modal: true,
            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
            resizable: false,
            visible: true,
            width: "50%",
            minWidth: "20%", 
            position: {
                top: "1%",
                left: "1%"
            },
            actions: [
                "Close"
            ],
        }).data("kendoWindow");
         
        ventanaConfirm.content(_dictionary.ProyeccionPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");
        ventanaConfirm.open().center();
         
        $("#yesButton").click(function () {
            EliminarProyeccion(proyeccionID, nombreProyeccion);
            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    });
}

//Emitir
function SuscribirEventoEmitir() {
    $("#EmitirOT").click(function () { 
        $("#divEmitirWindow").kendoWindow({
            modal: true,
            // title:,
            resizable: false,
            visible: true,
            width: "50%",
            minWidth: "20%",

            position: {
                top: "1%",
                left: "1%"
            },
            actions: [
                "Close"
            ],
        }).data("kendoWindow");
        $("#divEmitirWindow").data("kendoWindow").title("Emitir Orden de Trabajo");
        $("#divEmitirWindow").data("kendoWindow").center().open();

        $("#divEmitirWindow").data("kendoWindow").bind("close", function (e) {
            $("#EmitirPreguntaDiv").show();
            $("#cmbSeleccionarOT").hide();
            $("#inputCrearOrdenTrabajo").hide(); 
        });
    });

    $("#btnCrearNuevaOrdenTrabajo").click(function () {
        $("#EmitirPreguntaDiv").hide();
        $("#inputCrearOrdenTrabajo").show();
    });

    $("#btnUtilizarOrdenTrabajoExistente").click(function () {
        $("#EmitirPreguntaDiv").hide();
        $("#cmbSeleccionarOT").show();
    });
      
    var data = [
        { OrdenTrabajo: "Orden de Trabajo 1", OrdenTrabajoID: "1" },
        { OrdenTrabajo: "Orden de Trabajo 2", OrdenTrabajoID: "2" },
        { OrdenTrabajo: "Orden de Trabajo 3", OrdenTrabajoID: "3" },
    ];

    $("#inputOrdenesTrabajo").kendoComboBox({
        dataTextField: "OrdenTrabajo",
        dataValueField: "OrdenTrabajoID ",
        suggest: true,
        width: "50%",
        dataSource: data,
        filter: "contains",
        index: 3
    });
}

$("#crearOrdenTrabajo").click(function () {
    
});

//Encabezado
function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function () {
        if ($("#inputPatio").val()!="") { 
            AjaxMostrarSpoolsDeProyecto();
            AjaxObtenerTalleresPorPatio();
            
        }
        else {
            displayMessage("errorSeleccionePatio", "", '1');
        }
    });
}
 
function SuscribirEventoProyecto() {
    $('#inputProyecto').kendoComboBox({
        dataTextField: "Proyecto",
        dataValueField: "ProyectoID ",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
           
            if (dataItem != undefined) {
                $("#inputPatio").data("kendoComboBox").value("");
                $("#inputPatio").data("kendoComboBox").dataSource.data(dataItem.ListaPatio);
            }
            else {
                displayMessage("errorNoExisteProyecto", '', '2');
            }
        },
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                
            }
            else {
                displayMessage("errorNoExisteProyecto", '', '2');
            }
        }
    }); 
}

function SuscribirEventoPatio() {
    $('#inputPatio').kendoComboBox({
        dataTextField: "NombrePatio",
        dataValueField: "PatioID ",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            if (dataItem == undefined) { 
                displayMessage("errorNoExistePatio", '', '2');
            }
        },
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem == undefined) { 
                displayMessage("errorNoExistePatio", '', '2');
            }
        }
    });
}