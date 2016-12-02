function AjaxCargarProyecto() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        var proyectoId = 0;

        if (data.length > 0) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ProyectoID != 0) {
                        proyectoId = data[i].ProyectoID;
                    }
                }
            }
            $("#inputProyecto").data("kendoComboBox").value(proyectoId);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
    });
}

function ajaxObtenerInformacion() {
    var array = [{
        Accion: 1,
        OKPinturaDID: 1,
        NumeroControl: 'X001-016',
        Cuadrante: "1B",
        Prioridad: 12,
        SpoolID: 41719,
        OrdenTrabajoSpoolID: 596,
        OkPintura: false,
        Detalle: "Ver Pruebas",
        ShotBlastFecha: new Date(),
        PrimarioFecha: new Date(),
        IntermedioFecha: new Date(),
        AcabadoFecha: new Date()

    },
            {
                Accion: 1,
                OKPinturaDID: 1,
                NumeroControl: 'X001-020',
                Cuadrante: "Comdistral",
                Prioridad: 12,
                SpoolID: 41719,
                OrdenTrabajoSpoolID: 596,
                OkPintura: false,
                Detalle: "Ver Pruebas",
                ShotBlastFecha: new Date(),
                PrimarioFecha: new Date(),
                IntermedioFecha: new Date(),
                AcabadoFecha: new Date()

            },
            {
                Accion: 1,
                OKPinturaDID: 1,
                NumeroControl: 'X001-021',
                Cuadrante: "Comdistral",
                Prioridad: 12,
                SpoolID: 41719,
                OrdenTrabajoSpoolID: 596,
                OkPintura: false,
                Detalle: "Ver Pruebas",
                ShotBlastFecha: new Date(),
                PrimarioFecha: new Date(),
                IntermedioFecha: new Date(),
                AcabadoFecha: new Date()

            }];
    $("#grid").data('kendoGrid').dataSource.data(array);
};

function ajaxGuardar() {
    loadingStart();
    displayNotify("", "se guardo correctamente la informacion", '0');
    opcionHabilitarView(true, "FieldSetView");

    $("#grid").data('kendoGrid').dataSource.sync();
    loadingStop();

};