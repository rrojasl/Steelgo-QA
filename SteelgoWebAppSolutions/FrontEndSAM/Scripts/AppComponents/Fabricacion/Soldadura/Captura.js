function changeLanguageCall() {
    asignarProyecto();
    SuscribirEventos();
    AjaxCargarCamposPredeterminados();
    CargarGridSoldadura();
    opcionHabilitarView(false, "FieldSetView");
    document.title = _dictionary.CapturaSoldaduraSoldaduraSpool[$("#language").data("kendoDropDownList").value()];
};

function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}


function CargarGridSoldadura() {

    $("#grid").kendoGrid({
        autoBind: false,
        edit: function (e) {
            if ($('#botonGuardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        DetalleJunta: { type: "string", editable: false },
                        Taller: { type: "string", editable: true },
                        Diametro: { type: "string", editable: false },
                        FechaSoldadura: { type: "date", editable: true },
                        ProcesoSoldaduraRaiz: { type: "string", editable: true },
                        TemplateSoldadoresRaiz: { type: "string", editable: false },
                        ProcesoSoldaduraRelleno: { type: "string", editable: true },
                        TemplateSoldadoresRelleno: { type: "string", editable: false },
                        WPSNombre: { type: "string", editable: true }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 4 },
                  { field: "Accion", operator: "eq", value: undefined }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        filterable: getGridFilterableMaftec(),
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "SpoolID", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Junta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "DetalleJunta", title: _dictionary.columnDetalleJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "180px" },
            { field: "Taller", title: _dictionary.columnTaller[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxTaller, width: "130px" },
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px", attributes: { style: "text-align:right;" } },
            { field: "FechaSoldadura", title: _dictionary.columnFecha[$("#language").data("kendoDropDownList").value()], filterable: getKendoGridFilterableDateMaftec(), editor: RenderDatePicker, width: "160px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "ProcesoSoldaduraRaiz", title: _dictionary.columnProcesoRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxProcesoSoldaduraRaiz },
            { field: "TemplateSoldadoresRaiz", title: _dictionary.columnSoldadoresRaiz[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonSoldadoresRaiz'><a href='\\#'  > <span>#=TemplateSoldadoresRaiz#</span></a></div>" },
            { field: "ProcesoSoldaduraRelleno", title: _dictionary.columnProcesoRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxProcesoSoldaduraRelleno },
            { field: "TemplateSoldadoresRelleno", title: _dictionary.columnSoldadoresRelleno[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonSoldadoresRelleno'><a href='\\#' > <span>#=TemplateSoldadoresRelleno#</span></a></div>" },
            { field: "WPSNombre", title: _dictionary.columnWPS[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxWPS, filterable: getGridFilterableCellMaftec(), width: "130px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, filterable: false, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarRenglon }, filterable: false, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "60px" }
        ]
    });

    CustomisaGrid($("#grid"));
};


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        $("#inputWPS").data("kendoComboBox").enable(false);
        $("#inputPQR").data("kendoComboBox").enable(false);
        $("#FechaSoldadura").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#DetalleAvisoLlegada0017").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#ButtonAplicar').attr("disabled", true);
        $('#btnGuardarPiePagina').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        $("#FechaSoldadura").data("kendoDatePicker").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $('#botonGuardar').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#DetalleAvisoLlegada0017").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#ButtonAplicar').attr("disabled", false);
        $('#btnGuardarPiePagina').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function Limpiar() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");//.dataSource.data([]);
    $("#FechaSoldadura").data("kendoDatePicker").value("");
    $("#inputTaller").data("kendoComboBox").value("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}


function cancelarCaptura(e) {
    e.preventDefault();
    if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var spoolIDRegistro = dataItem.SpoolID;

        windowTemplate = kendo.template($("#windowTemplate").html());

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                     "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {

            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataItem.Accion = 3;
            if (dataItem.JuntaSoldaduraID == 0)
                dataSource.remove(dataItem);
            $("#grid").data("kendoGrid").dataSource.sync();

            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }

};


function limpiarRenglon(e) {
    e.preventDefault();
    if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        itemToClean.Raiz = [];
        itemToClean.Taller = "";
        itemToClean.Relleno = [];
        itemToClean.TallerID = 0;
        itemToClean.FechaSoldadura = "";
        itemToClean.procesoSoldaduraRaiz = "";
        itemToClean.procesoSoldaduraRaizID = 0;
        itemToClean.procesoSoldaduraRelleno = "";
        itemToClean.procesoSoldaduraRellenoID = 0;
        itemToClean.DetalleAdicional = [];
        itemToClean.SoldadoresRaiz = _dictionary.CapturaSoldaduraNoSoldadoresRaiz[$("#language").data("kendoDropDownList").value()];
        itemToClean.SoldadoresRelleno = _dictionary.CapturaSoldaduraNoSoldadoresRelleno[$("#language").data("kendoDropDownList").value()];
        itemToClean.TrabajosAdicionales = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();
    }

}

function CambioTipoListado() {
    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
        $("#JuntaDiv").css('display', 'none');
        $("#MuestraDiv").css('display', 'block');
        AjaxObtenerListaTaller();
    }
    else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
        $("#JuntaDiv").css('display', 'block');
        $("#MuestraDiv").css('display', 'block');
        AjaxObtenerListaTaller();
    }
}


function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])
        else
            ds.filter(curr_filters[0])
        ds.sync();
    }
    else {

        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        filters.filters.push({ field: "Accion", operator: "eq", value: 4 });
        ds.sync();
    }
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}


function ArregloListadoReporte() {
    JsonCaptura = [];
    var lista = $("#Junta").data("kendoComboBox").dataSource._data;

    for (var i = 0; i < lista.length ; i++) {
        JsonCaptura[i] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaSoldadura: "", tallerID: "", Taller: "", sinCaptura: "" };
        JsonCaptura[i].IDProyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).ProyectoID;
        JsonCaptura[i].Proyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Proyecto;
        JsonCaptura[i].IdOrdenTrabajo = $("#InputOrdenTrabajo").val();
        JsonCaptura[i].OrdenTrabajo = $("#InputOrdenTrabajo").val();
        JsonCaptura[i].idVal = $("#InputID").val();
        JsonCaptura[i].idText = $("#InputID").data("kendoComboBox").text()
        JsonCaptura[i].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
        JsonCaptura[i].JuntaID = lista[i].JuntaSpoolID;
        JsonCaptura[i].Junta = lista[i].Etiqueta;
        JsonCaptura[i].FechaSoldadura = $("#FechaSoldadura").val();
        JsonCaptura[i].sinCaptura = "Todos";
    }
    return JsonCaptura;
};

function ExisteJuntaEnSpool(Row) {

    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == (Row.IdOrdenTrabajo + '-' + Row.IdVal) && jsonGridArmado[i].JuntaID === Row.JuntaID) {
            return true;
        }
    }
    return false;
}


function GridPopupSoldadoresRaizCapturados(row) {


    $("#inputSoldadoresRaiz").kendoGrid({
        dataSource: {
            data: row.ListaSoldadoresRaizCapturados,
            schema: {
                model: {
                    fields: {
                        Accion: { type: "int", editable: false },
                        ObreroID: { type: "int", editable: false },
                        Soldador: { type: "string", editable: true },
                        ColadaID: { type: "int", editable: false },
                        Colada: { type: "string", editable: true },
                        Observaciones: { type: "string", editable: true }
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: undefined }
                ]
            }
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldadores[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), editor: RenderComboBoxSoldador, width: "100px" },
          { field: "Colada", title: _dictionary.ListadoCatalogos0046[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(),editor: RenderComboBoxColada, width: "100px" },
          { field: "Observaciones", title: _dictionary.CapturaSoldaduraHeaderObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px" },
        {
            command: {
                name: "",
                title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
                text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                click: function (e) {
                    e.preventDefault();
                    var dataSource = this.dataSource;
                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                    if (dataItem.Accion == 1 || dataItem.JuntaArmadoID == undefined)
                        dataSource.remove(dataItem);
                    else
                        dataItem.Accion = 3;
                    dataSource.sync();

                }
            }, width: "50px", title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()]
        },
        ],
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create" }]
    });
    CustomisaGrid($("#inputSoldadoresRaiz"));
    VentanaModalSoldadoresRaiz();
};


function VentanaModalSoldadoresRaiz() {

    var modalTitle = "";
    modalTitle = _dictionary.CapturaSoldaduraSoldadoresRaiz[$("#language").data("kendoDropDownList").value()];
    var windowRaiz = $("#windowGridSoldadorRaiz");
    var win = windowRaiz.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        }
    }).data("kendoWindow");
    windowRaiz.data("kendoWindow").title(modalTitle);
    windowRaiz.data("kendoWindow").center().open();

};




function GridPopupSoldadoresRellenoCapturados(row) {


    $("#inputSoldadoresRelleno").kendoGrid({
        dataSource: {
            data: row.ListaSoldadoresRaizCapturados,
            schema: {
                model: {
                    fields: {
                        Accion: { type: "int", editable: false },
                        ObreroID: { type: "int", editable: false },
                        Soldador: { type: "string", editable: true },
                        ColadaID: { type: "int", editable: false },
                        Colada: { type: "string", editable: true },
                        Observaciones: { type: "string", editable: true }
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: undefined }
                ]
            }
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldadores[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(),editor: RenderComboBoxSoldador, width: "100px" },
          { field: "Colada", title: _dictionary.ListadoCatalogos0046[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), editor: RenderComboBoxColada, width: "100px" },
          { field: "Observaciones", title: _dictionary.CapturaSoldaduraHeaderObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px" },
        {
            command: {
                name: "",
                title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
                text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                click: function (e) {
                    e.preventDefault();
                    var dataSource = this.dataSource;
                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                    if (dataItem.Accion == 1 || dataItem.JuntaArmadoID == undefined)
                        dataSource.remove(dataItem);
                    else
                        dataItem.Accion = 3;
                    dataSource.sync();
                }
            }, width: "50px", title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()]
        },
        ],
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create" }]
    });
    CustomisaGrid($("#inputSoldadoresRelleno"));
    VentanaModalSoldadoresRelleno();
};


function VentanaModalSoldadoresRelleno() {

    var modalTitle = "";
    modalTitle = _dictionary.CapturaSoldaduraSoldadoresRelleno[$("#language").data("kendoDropDownList").value()];
    var windowRelleno = $("#windowMultiselectSoldadorRelleno");
    var win = windowRelleno.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        }
    }).data("kendoWindow");
    windowRelleno.data("kendoWindow").title(modalTitle);
    windowRelleno.data("kendoWindow").center().open();

};