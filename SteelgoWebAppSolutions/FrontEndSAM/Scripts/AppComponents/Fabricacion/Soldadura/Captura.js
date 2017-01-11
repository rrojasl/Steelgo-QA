var modeloRenglon;

function changeLanguageCall() {
    asignarProyecto();
    SuscribirEventos();
    AjaxCargarCamposPredeterminados();
    CargarGrid();
    CargarGridPopUp();
    opcionHabilitarView(false, "FieldSetView");
    document.title = _dictionary.CapturaSoldaduraSoldaduraSpool[$("#language").data("kendoDropDownList").value()];
};

function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}


function CargarGrid() {

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
                        WPSNombre: { type: "string", editable: true },
                        DetalleAdicional: { type: "string", editable: false }
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
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Taller", title: _dictionary.columnTaller[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxTaller, width: "130px" },
            { field: "FechaSoldadura", title: _dictionary.columnFecha[$("#language").data("kendoDropDownList").value()], filterable: getKendoGridFilterableDateMaftec(), editor: RenderDatePicker, width: "160px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "ProcesoSoldaduraRaiz", title: _dictionary.columnProcesoRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxProcesoSoldaduraRaiz },
            { field: "TemplateSoldadoresRaiz", title: _dictionary.columnSoldadoresRaiz[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonSoldadoresRaiz'><a href='\\#'  > <span>#=TemplateSoldadoresRaiz#</span></a></div>" },
            { field: "ProcesoSoldaduraRelleno", title: _dictionary.columnProcesoRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxProcesoSoldaduraRelleno },
            { field: "TemplateSoldadoresRelleno", title: _dictionary.columnSoldadoresRelleno[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonSoldadoresRelleno'><a href='\\#' > <span>#=TemplateSoldadoresRelleno#</span></a></div>" },
            { field: "WPSNombre", title: _dictionary.columnWPS[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxWPS, filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "DetalleAdicional", title: _dictionary.columnDetalleAdicional[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonAdicionales'><a href='\\#' > <span>#=TemplateTrabajosAdicionales#</span></a></div>" },
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
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldadores[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), editor: RenderComboBoxSoldadorRaiz, width: "100px" },
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
                    if (dataItem != null) {
                        if (dataItem.Accion == 1 || dataItem.Accion == undefined)
                            dataSource.remove(dataItem);
                        else
                            dataItem.Accion = 3;
                    }


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
            data: row.ListaSoldadoresRellenoCapturados,
            schema: {
                model: {
                    fields: {
                        Accion: { type: "int", editable: false },
                        Soldador: { type: "string", editable: true },
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
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldadores[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), editor: RenderComboBoxSoldadorRelleno, width: "100px" },
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

                    if (dataItem != null) {
                        if (dataItem.Accion == 1 || dataItem.Accion == undefined)
                            dataSource.remove(dataItem);
                        else
                            dataItem.Accion = 3;
                    }
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


function ArregloListadoCaptura() {
    JsonCaptura = [];
    JsonCaptura[0] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaSoldadura: "", tallerID: "", Taller: "", sinCaptura: "", IDProyecto: "" };
    JsonCaptura[0].IDProyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).ProyectoID;
    JsonCaptura[0].Proyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Proyecto;
    JsonCaptura[0].IdOrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].OrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].idVal = $("#InputID").val();
    JsonCaptura[0].idText = $("#InputID").data("kendoComboBox").text()
    JsonCaptura[0].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
    JsonCaptura[0].JuntaID = $("#Junta").val();
    JsonCaptura[0].Junta = $("#Junta").data("kendoComboBox").text();
    JsonCaptura[0].FechaSoldadura = $("#FechaSoldadura").val();
    JsonCaptura[0].sinCaptura = $('input:radio[name=Muestra]:checked').val();

    return JsonCaptura[0];
};

function ExisteJunta(Row) {
    var jsonGridSoldadura = $("#grid").data("kendoGrid").dataSource._data;
    if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
        for (var i = 0; i < jsonGridSoldadura.length; i++) {
            if (jsonGridSoldadura[i].IdOrdenTrabajo + '-' + jsonGridSoldadura[i].IdVal == (Row.IdOrdenTrabajo + '-' + Row.IdVal) && jsonGridSoldadura[i].JuntaID === Row.JuntaID) {
                return true;
            }
        }
    }
    return false;
}



function CargarGridPopUp() {

    $("#gridPopUp").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        TrabajoAdicionalID: { type: "int", editable: true },
                        juntaSpoolID: { type: "int", editable: true },
                        juntaSoldaduraID: { type: "int", editable: true },
                        TrabajoAdicional: { type: "string", editable: true },
                        ObreroID: { type: "int", editable: true },
                        Soldador: { type: "string", editable: true },
                        Observacion: { type: "string", editable: true }
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
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true
        },
        change: function (e) {

            //ItemSeleccionadoAnidado = this.dataSource.view()[this.select().index()];

            //var dataSource = this.dataSource;
            //var filters = dataSource.filter();
            //var allData = dataSource.data();
            //var query = new kendo.data.Query(allData);
            //var data = query.filter(filters).data;
            //actuallongitudTrabajosAdicionales = data.length;
            //if (actuallongitudTrabajosAdicionales == 0 || actuallongitudTrabajosAdicionales == undefined)
            //    modeloRenglon.TrabajosAdicionales = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
            //else
            //    modeloRenglon.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
            //if (modeloRenglon.JuntaSoldaduraID != 0 && modeloRenglon.JuntaSoldaduraID != undefined)
            //    modeloRenglon.Accion = 2;

        },
        columns: [
          { field: "TrabajoAdicional", title: _dictionary.CapturaSoldaduraHeaderTrabajosAdicionalesAnidado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "80px", editor: RenderComboBoxTrabajos },
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldador[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "80px", editor: RenderComboBoxObrerosAdicionales },
          { field: "Observacion", title: _dictionary.CapturaSoldaduraHeaderObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px" },

         {
             command: {
                 name: "",
                 title: "",
                 text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                 click: function (e) {
                     e.preventDefault();
                     dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                     var dataSource = this.dataSource;

                     if (dataItem.Accion == 1 || dataItem.Accion == undefined)
                         dataSource.remove(dataItem);
                     else
                         dataItem.Accion = 3;

                     var filters = dataSource.filter();
                     var allData = dataSource.data();
                     var query = new kendo.data.Query(allData);
                     var data = query.filter(filters).data;

                     actuallongitudTrabajosAdicionales = data.length;

                     if (actuallongitudTrabajosAdicionales == 0 || actuallongitudTrabajosAdicionales == undefined)
                         modeloRenglon.TrabajosAdicionales = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
                     else
                         modeloRenglon.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];

                     dataSource.sync();

                 }
             }, width: "40px", title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()]
         },
         {
             command: {
                 name: "",
                 title: "",
                 text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()],
                 click: function (e) {
                     var itemToClean = $("#gridPopUp").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                     itemToClean.TrabajoAdicional = "";
                     itemToClean.TrabajoAdicionalID = 0;
                     itemToClean.Soldador = "";
                     itemToClean.ObreroID = 0;
                     itemToClean.Observacion = "";
                     var dataSource = $("#gridPopUp").data("kendoGrid").dataSource;
                     dataSource.sync();

                 }
             }, width: "50px", title: _dictionary.tituloLimpiar[$("#language").data("kendoDropDownList").value()]
         }
        ],
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create", }]

    });

    CustomisaGrid($("#gridPopUp"));
};

function GridPopUpTrabajosAdicionales(data) {
    modeloRenglon = data;

    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    var array = data.DetalleAdicional;

    VentanaModal();
}

var actuallongitudTrabajosAdicionales = 0;

function VentanaModal() {

    var modalTitle = "";
    modalTitle = _dictionary.CapturaSoldaduraHeaderAdicionales[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        },
        actions: [
            "Close"
        ],
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function ObtenerListadoObreros(arregloObrerosRaiz, arregloObrerosRelleno) {
    var arregloRaiz = new Array(arregloObrerosRaiz.length);
    var arregloRelleno = new Array(arregloObrerosRelleno.length);

    //for (var i = 0; i < arregloRaiz.length; i++) {
    //    arregloRaiz[i] = new Array(2);
    //}

    for (var i = 0; i < arregloRaiz.length; i++) {
        arregloRaiz[i] = arregloObrerosRaiz[i].ObreroID;
        //arregloRaiz[i][2] = arregloObrerosRaiz[i].Soldador;
    }

    //for (var i = 0; i < arregloRelleno.length; i++) {
    //    arregloRelleno[i] = new Array(2);
    //}
    for (var i = 0; i < arregloRelleno.length; i++) {
        arregloRelleno[i] = arregloObrerosRelleno[i].ObreroID;
        //arregloRelleno[i][2] = arregloObrerosRelleno[i].Soldador;
    }



    var arreglo = arregloRaiz.concat(arregloRelleno)
    var arregloSinRepetir = arreglo.filter(onlyUnique);
    var array =[];

    for (var i = 0; i < arregloSinRepetir.length; i++) {
        array[i] = { ObreroID: "", Soldador: "" };
        for (var j = 0; j < arregloObrerosRaiz.length; j++) {
            if (arregloSinRepetir[i] == arregloObrerosRaiz[j].ObreroID) {
                array[i].ObreroID = arregloObrerosRaiz[j].ObreroID;
                array[i].Soldador = arregloObrerosRaiz[j].Soldador;
            }
        }
        if (array[i].Soldador == "") {
            for (var j = 0; j < arregloObrerosRelleno.length; j++) {
                if (arregloSinRepetir[i] == arregloObrerosRelleno[j].ObreroID) {
                    array[i].ObreroID = arregloObrerosRelleno[j].ObreroID;
                    array[i].Soldador = arregloObrerosRelleno[j].Soldador;
                }
            }
        }

    }

    return array;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}