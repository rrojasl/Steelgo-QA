function ajaxGuardarCaptura(data, _pasoId) {
    loadingStart();
    displayNotify("", "se guardo correctamente la informacion", '0');
    opcionHabilitarView(true, "FieldSetView");

    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        $("#grid").data("kendoGrid").dataSource._data[i].Lote = "LT-456";
    }

    $("#grid").data('kendoGrid').dataSource.sync();
    loadingStop();
};
function AjaxZona() {
    loadingStart();
    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token") }).done(function (data) {

        if (Error(data)) {

            /*var data = [{ ProyectoID: 1, Nombre: 'Proyecto 1' }, { ProyectoID: 2, Nombre: 'Proyecto 2' }];*/
            $("#inputZona").data("kendoComboBox").value("");
            $("#inputZona").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                $("#inputZona").data("kendoComboBox").select(1);
                AjaxCuadrante(data[1].ZonaID)
            }
            //else
            //    ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });
}

function ajaxAgregarSpool()
{
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = [{
        RowOk: true,
        Accion: 2,
        Spool: "X002-005",
        SistemaPintura: "A4",
        Color: "ALUMINIO",
        M2: 4.84,
        NombreCuadrante: "1A",
        ListaPintores: [{ Pintor: "T-239 - Josue Gonzales", ObreroID: "1" }, { Pintor: "T-001 Tomas Edison", ObreroID: "1" }],
        ListaPintoresSeleccionadosPorSpool: undefined,
        ListaDetallePintoresPorSpool: undefined,
        TemplatePintoresPorSpool: "Sin pintores"
    }];
    ds.insert(0, array[0]);
    $("#grid").data("kendoGrid").dataSource.sync();
    
}
function ajaxMostrarCapturaAvanceIntAcabado(_cuadranteId, _paso) {

    var array = [{
        RowOk: true,
        Accion: 2,
        Spool: "X002-002",
        SistemaPintura: "A4",
        Color: "ALUMINIO",
        M2: 4.12,
        NombreCuadrante: "1A",
        ListaPintores: [{ Pintor: "T-239 - Josue Gonzales", ObreroID: "1" }, { Pintor: "T-001 Tomas Edison", ObreroID: "1" }],
        ListaPintoresSeleccionadosPorSpool: undefined,
        ListaDetallePintoresPorSpool: undefined,
        TemplatePintoresPorSpool: "Sin pintores"
    }];

    $("#grid").data('kendoGrid').dataSource.data(array);

};

function AjaxObtenerSpoolID() {

    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $Armado.Armado.read({
        ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val()
    }).done(function (data) {
        dataSpoolArray = data;
        if (Error(data)) {
            if (data.OrdenTrabajo != "") {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }

            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), {
                path: '/'
            });
            $("#InputID").data("kendoComboBox").enable(true);
            $("#InputID").data("kendoComboBox").input.focus();
        }
    });
}

function AjaxCuadrante(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var cuadranteid = 0;
        if (data.length > 0) {
            $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
        }

        loadingStop();
    });
}

function AjaxSistemaPintura(zonaID, cuadranteID) {
    var llenaSistemaPintura;

    if (zonaID == "1" && cuadranteID == 1) {
        llenaSistemaPintura = [
             { SistemaPinturaID: 0, Nombre: "" },
            { SistemaPinturaID: 1, Nombre: "A4" },
        ];
    }
    else
        llenaSistemaPintura = [];


    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").value("");


    if (llenaSistemaPintura.length == 2) {
        $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(llenaSistemaPintura);
        $("#inputSistemaPintura").data("kendoComboBox").select(1);
        $("#inputSistemaPintura").data("kendoComboBox").trigger("change");
    }
}

function AjaxColores(zonaID, cuadranteID, sistemaPinturaID) {

    var llenaListaColores;

    if (zonaID == "1" && cuadranteID == 1 && sistemaPinturaID == 1) {
        llenaListaColores = [
             { ColorID: 0, Nombre: "" },
            { ColorID: 1, Nombre: "Aluminio" },
        ];
    }
    else
        llenaListaColores = [];

    $("#inputColor").data("kendoComboBox").dataSource.data([]);
    $("#inputColor").data("kendoComboBox").value("");
    if (llenaListaColores.length == 2) {

        $("#inputColor").data("kendoComboBox").dataSource.data(llenaListaColores);
        $("#inputColor").data("kendoComboBox").select(1);
        $("#inputColor").data("kendoComboBox").trigger("change");
    }



}


