function SuscribirEventos() {
    SuscribirEventoProyectar();
    SuscribirEventoEmitir();
}

function SuscribirEventoProyectar() {
    $("#Proyectar").click(function () {
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

        $("#divProyectarWindow").data("kendoWindow").bind("close", function(e) {
            $("#ProyectarPreguntaDiv").show();
            $("#cmbSeleccionarProyeccion").hide();
            $("#inputCrearProyeccion").hide();
        }); 
    });

    $("#btnCrearNuevaProyeccion").click(function () {
        $("#ProyectarPreguntaDiv").hide();
        $("#inputCrearProyeccion").show();
    });

    $("#btnUtilizarProyeccionExistente").click(function () {
        $("#ProyectarPreguntaDiv").hide();
        $("#cmbSeleccionarProyeccion").show();
    });


    var data = [
        { Proyeccion: "Proyeccion 1", ProyeccionID: "1" },
        { Proyeccion: "Proyeccion 2", ProyeccionID: "2" },
        { Proyeccion: "Proyeccion 3", ProyeccionID: "3" },
    ];

    

    $("#inputProyecciones").kendoComboBox({
        dataTextField: "Proyeccion",
        dataValueField: "ProyeccionID ",
        suggest: true,
        dataSource: data,
        filter: "contains",
        index: 3
    });
}

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