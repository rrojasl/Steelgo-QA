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

function AjaxCargarLayoutGrid(CuadranteID, SistemaPinturaID, SistemaPinturaColorID, lenguaje, ProcesoPintura, Mostrar) {
    loadingStart();
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), sistemaPinturaProyectoId: sistemaPinturaProyectoId, procesoID: procesoID, lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            ComponentesDinamicos = data[0];
            ReductorDinamico = data[1];
            ComponentesDinamicosJSON = data[2];
            ReductoresDinamicosJSON = data[3];
            CrearControlesDinamicos();

            CrearGrid();

            var grid = $("#grid").data("kendoGrid");
            var dataSource = grid.dataSource;
            var options = grid.options;


            ////////////////////

            options.dataSource = {
                schema: {
                    model: {
                        fields: {

                            Spool: { type: "string", editable: false },
                            SistemaPintura: { type: "string", editable: false },
                            Color: { type: "string", editable: false },
                            Area: { type: "string", editable: false },
                            LoteID: { type: "string", editable: false },
                            FechaProceso: { type: "date", editable: true }
                        }
                    }
                },
                filter: {
                    logic: "or",
                    filters: [
                          { field: "Accion", operator: "eq", value: 1 },
                          { field: "Accion", operator: "eq", value: 2 },
                          { field: "Accion", operator: "eq", value: 4 },
                          { field: "Accion", operator: "eq", value: 0 },
                          { field: "Accion", operator: "eq", value: undefined }
                    ]
                },
                pageSize: 10,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            };

            options.autoBind = true;
            options.pageSize = 10
            options.serverPaging = false,
            options.serverFiltering = false,
            options.serverSorting = false

            options.navigatable = true,
            options.filterable = getGridFilterableMaftec(),
            options.editable = true,
            options.autoHeight = true,
            options.sortable = true,
            options.scrollable = true,
            options.pageable = {
                refresh: false,
                pageSizes: [10, 25, 50, 100],
                info: false,
                input: false,
                numeric: true,
            };
            ///////////////////

            options.columns = $("#grid").data("kendoGrid").columns;

            options.columns.push({ field: "Spool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" });
            options.columns.push({ field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "160px" });
            options.columns.push({ field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" });
            options.columns.push({ field: "Area", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" }, width: "80px" });
            options.columns.push({ field: "LoteID", title: _dictionary.columnLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" }, width: "80px" });
            options.columns.push({ field: "FechaProceso", title: _dictionary.columnFechaShotblast[$("#language").data("kendoDropDownList").value()], type: "date", filterable: { cell: { showOperators: false } }, editor: RenderDatePicker, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], width: "160px" });
            options.columns.push({ field: "ListaObrerosSeleccionados", title: _dictionary.columnShotblastero[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RendercomboBoxShotBlastero, template: "#:plantillaObrero#", width: "280px" });

            for (var i = 0; i < data[0].length; i++) {
                options.columns.push({ field: data[0][i].NombreComponente, title: data[0][i].NombreComponente, filterable: getGridFilterableCellMaftec(), editor: renderComboboxComponenteDinamico, width: "140px" });
            }

            for (var i = 0; i < data[1].length; i++) {
                options.columns.push({ field: data[1][i].NombreReductor, title: data[1][i].NombreReductor, filterable: getGridFilterableCellMaftec(), editor: RendercomboReductor, width: "140px" });
            }


            options.columns.push({ command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: VentanaModalDescargarSpool }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "60px", attributes: { style: "text-align:center;" } });
            options.columns.push({ command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarFila }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" });


            grid.destroy();
            $("#grid").kendoGrid(options);

            CustomisaGrid($("#grid"));
            AjaxCargarSpool(CuadranteID, SistemaPinturaID, SistemaPinturaColorID, lenguaje, ProcesoPintura, Mostrar);
        }
    });
}


