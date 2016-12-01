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


function ajaxGuardar(data) {
    loadingStart();
    displayNotify("", "se guardo correctamente la informacion", '0');
    opcionHabilitarView(true, "FieldSetView");
    loadingStop();
};

function ajaxBuscarSpool()
{
    var array = [
                    {
                        Accion: 2,
                        NombreSpool: "X002-006",
                        SistemaPintura: "A4",
                        Color: "ALUMINIO",
                        M2: "4.12",
                        PruebasReq: 2,
                        PruebasEjec: 0,
                        NombreCuadrante: "Comdistral",
                        CapturaPrueba: "Ver Prueba"
                    },
                     {
                         Accion: 2,
                         NombreSpool: "X002-002",
                         SistemaPintura: "A4",
                         Color: "ALUMINIO",
                         M2: "4.12",
                         PruebasReq: 2,
                         PruebasEjec: 0,
                         NombreCuadrante: "Comdistral",
                         CapturaPrueba: "Ver Prueba"
                     }
    ];

    $("#grid").data('kendoGrid').dataSource.data(array);
}

function AjaxCargarProcesos() {
    var llenaProcesos = [
            { ProcesoID: 0, Nombre: "" },
            { ProcesoID: 1, Nombre: "ShotBlast" },
            { ProcesoID: 2, Nombre: "Primario" },
            { ProcesoID: 3, Nombre: "Intermedio" },
            { ProcesoID: 4, Nombre: "Acabado" }
    ];


    $("#inputProceso").data("kendoComboBox").dataSource.data([]);
    $("#inputProceso").data("kendoComboBox").dataSource.data(llenaProcesos);
}

function ajaxObtenerSistemasPintura(procesoid) {
    var llenaSistemaPintura;

    switch (procesoid) {
        case 1:
            llenaSistemaPintura = [
            { SistPintID: 0, Nombre: "" },
            { SistPintID: 1, Nombre: "A4" }
            ];
            break;
        case 2:
            llenaSistemaPintura = [
            { SistPintID: 0, Nombre: "" },
            { SistPintID: 2, Nombre: "A4" }
            ];
            break;
        case 3:
            llenaSistemaPintura = [
            { SistPintID: 0, Nombre: "" },
            { SistPintID: 3, Nombre: "A5" }
            ];
            break;
        case 4:
            llenaSistemaPintura = [
            { SistPintID: 0, Nombre: "" },
            { SistPintID: 4, Nombre: "A5" }
            ];
            break;
    }

    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(llenaSistemaPintura);

    if (procesoid == 1)
        $("#inputSistemaPintura").data("kendoComboBox").value(1);
    else if (procesoid == 2)
        $("#inputSistemaPintura").data("kendoComboBox").value(2);
    else if (procesoid == 3)
        $("#inputSistemaPintura").data("kendoComboBox").value(3);
    else if (procesoid == 4)
        $("#inputSistemaPintura").data("kendoComboBox").value(4);

    $("#inputSistemaPintura").data("kendoComboBox").trigger("change");

}

function ajaxPruebas(SistPintID, ProcesoID) {
    var llenaPruebas;
    switch (ProcesoID) {
        case 1:
            llenaPruebas = [
            { PruebaID: 0, Nombre: "" },
            { PruebaID: 1, Nombre: "Adherencia" }
            ];
            break;
        case 2:
            llenaPruebas = [
            { PruebaID: 0, Nombre: "" },
            { PruebaID: 2, Nombre: "Densidad" }
            ];
            break;
        case 3:
            llenaPruebas = [
            { PruebaID: 0, Nombre: "" },
            { PruebaID: 3, Nombre: "Espesores" }
            ];
            break;
        case 4:
            llenaPruebas = [
            { PruebaID: 0, Nombre: "" },
            { PruebaID: 4, Nombre: "Pullof" }
            ];
            break;
    }

    $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
    $("#inputPrueba").data("kendoComboBox").dataSource.data(llenaPruebas);

    if (ProcesoID == 1)
        $("#inputPrueba").data("kendoComboBox").value(1);
    else if (ProcesoID == 2)
        $("#inputPrueba").data("kendoComboBox").value(2);
    else if (ProcesoID == 3)
        $("#inputPrueba").data("kendoComboBox").value(3);
    else if (ProcesoID == 4)
        $("#inputPrueba").data("kendoComboBox").value(4);

    $("#inputPrueba").data("kendoComboBox").trigger("change");

}

function ajaxLlenarLote(sistemapinturaID) {

   
    var llenaLotes;
    switch (sistemapinturaID) {
        case 1:
            llenaLotes = [
            { LotePinturaID: 0, NumeroLote: "" },
            { LotePinturaID: 1, NumeroLote: " LT - 455" }
            ];
            break;
        case 2:
            llenaLotes = [
            { LotePinturaID: 0, NumeroLote: "" },
            { LotePinturaID: 2, NumeroLote: " LT - 455" }
            ];
            break;
        //case 3:
        //    llenaLotes = [
        //    { LotePinturaID: 0, NumeroLote: "" },
        //    { LotePinturaID: 3, NumeroLote: " LT - 456" }
        //    ];
        //    break;
        //case 4:
        //    llenaLotes = [
        //    { LotePinturaID: 0, NumeroLote: "" },
        //    { LotePinturaID: 4, NumeroLote: " LT - 456" }
        //    ];
        //    break;
    }

    $("#inputLote").data("kendoComboBox").dataSource.data([]);
    $("#inputLote").data("kendoComboBox").dataSource.data(llenaLotes);

    if (sistemapinturaID == 1)
        $("#inputLote").data("kendoComboBox").value(1);
    else if (sistemapinturaID == 2)
        $("#inputLote").data("kendoComboBox").value(2);

  

}