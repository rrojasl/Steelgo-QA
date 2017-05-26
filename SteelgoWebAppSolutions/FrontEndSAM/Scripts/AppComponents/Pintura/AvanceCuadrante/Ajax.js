function AjaxZona() {
    loadingStart();
    $AvanceCuadrante.AvanceCuadrante.read({ token: Cookies.get("token"), procesoPintura: $('input:radio[name=ProcesoPintura]:checked').val(), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), ZonaID: 0, tipo :1}).done(function (data) {
        if (Error(data)) {
            $("#inputZona").data("kendoComboBox").dataSource.data(data);
            $("#inputZona").data("kendoComboBox").value("");
            if (data.length == 2) {
                $("#inputZona").data("kendoComboBox").select(1);
                AjaxCuadrante(data[1].ZonaID)
            }
        }
        loadingStop();
    });
}

function AjaxCuadrante(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), procesoPintura: $('input:radio[name=ProcesoPintura]:checked').val(), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), ZonaID: zonaID, tipo :2 }).done(function (data) {
        var cuadranteid = 0;
        $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
        $("#inputCuadrante").data("kendoComboBox").value("");
        if (data.length == 2) {
            $("#inputCuadrante").data("kendoComboBox").select(1);
            $("#inputCuadrante").data("kendoComboBox").trigger("change");
        }
        loadingStop();
    });
}

function AjaxSistemaPintura(zonaID, cuadranteID) {
    loadingStart();
    $AvanceCuadrante.AvanceCuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID, CuadranteID: cuadranteID, procesoPintura: $('input:radio[name=ProcesoPintura]:checked').val(), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(data);
            $("#inputSistemaPintura").data("kendoComboBox").value("");
            if (data.length == 2) {
                $("#inputSistemaPintura").data("kendoComboBox").select(1);
                $("#inputSistemaPintura").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxColores(zonaID, cuadranteID, sistemaPinturaID) {
    loadingStart();
    $AvanceCuadrante.AvanceCuadrante.read({ token: Cookies.get("token"), SistemaPinturaID: sistemaPinturaID, lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputColor").data("kendoComboBox").dataSource.data(data);
            $("#inputColor").data("kendoComboBox").value("");
            if (data.length == 2) {
                $("#inputColor").data("kendoComboBox").select(1);
                $("#inputColor").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxCargaMostrarPredeterminadoseleciconProcesosPintura() {
    var TipoMuestraPredeterminadoID = 4076;
    var procesoid = 0;

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "shotblast") {
            $('input:radio[name=ProcesoPintura]:nth(0)').trigger("click");
        }
        else if (data == "primario") {
            $('input:radio[name=ProcesoPintura]:nth(1)').trigger("click");
        }
        else if (data == "intermedio") {
            $('input:radio[name=ProcesoPintura]:nth(2)').trigger("click");
        }
        else if (data == "acabado") {
            $('input:radio[name=ProcesoPintura]:nth(3)').trigger("click");
        }
       
        loadingStop();
    });
}

function AjaxCargarLayoutGrid(sistemaPinturaProyectoId, procesoID,CuadranteID, SistemaPinturaProyectoID, SistemaPinturaColorID, lenguaje, procesoPinturaID,mostrar) {
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
                            Area: { type: "string", editable: false },
                            LoteID: { type: "string", editable: false },
                            FechaShotblast: { type: "date", editable: true }
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

            //options.columns.push({ command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: VentanaModalDescargarSpool }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "60px", attributes: { style: "text-align:center;" } });
            options.columns.push({ command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarFila }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" });
            grid.destroy();
            $("#grid").kendoGrid(options);
            CustomisaGrid($("#grid"));
            AjaxCargarSpool(CuadranteID, SistemaPinturaProyectoID, SistemaPinturaColorID, lenguaje, procesoPinturaID, mostrar);
        }
    });
}
function AjaxCargarSpool(CuadranteID, sistemaPinturaProyectoId, SistemaPinturaColorID, lenguaje, ProcesoPinturaID, Mostrar) {
    loadingStart();
    $AvanceCuadrante.AvanceCuadrante.read({ token: Cookies.get("token"), CuadranteID: CuadranteID, SistemaPinturaID: SistemaPinturaID, SistemaPinturaColorID: SistemaPinturaColorID, lenguaje: lenguaje, ProcesoPinturaID: ProcesoPinturaID, Mostrar: Mostrar }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = JSON.parse(data);


        for (var i = 0; i < array.length; i++) {
            if (array[i].FechaProceso != null) {
                array[i].FechaProceso = new Date(ObtenerDato(array[i].FechaProceso, 1), ObtenerDato(array[i].FechaProceso, 2), ObtenerDato(array[i].FechaProceso, 3));//año, mes, dia
            }

            ds.add(array[i]);
        }
        if (array.length > 0)
            editado = true;

        ds.sync();
        loadingStop();
    });
}

function AjaxCargarProyecto() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        var proyectoId = 0;

        if (data.length > 0) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                $("#inputProyecto").data("kendoComboBox").value(data[1].ProyectoID);
                $("#inputProyecto").data("kendoComboBox").trigger("change");
            }

        }
    });
}