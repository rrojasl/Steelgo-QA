var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudSoldadoresRaizCapturados;
var actuallongitudTrabajosAdicionales;
var ItemSeleccionado;
var longitudSoldadoresRaiz;
var longitudSoldadoresRelleno;
var listaRaizFiltro;
var listaRellenoFiltro;
var modeloRenglon;


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

function PlanchaRelleno() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            if (data[i].PermiteTerminadoRelleno) {
                data[i].procesoSoldaduraRellenoID = $("#inputProcesoRelleno").data("kendoDropDownList").value();
                data[i].procesoSoldaduraRelleno = $("#inputProcesoRelleno").data("kendoDropDownList").text();
            }
        }
        else {
            if (data[i].procesoSoldaduraRelleno == "" || data[i].procesoSoldaduraRelleno == null || data[i].procesoSoldaduraRelleno == undefined) {
                if (data[i].PermiteTerminadoRelleno) {
                    data[i].procesoSoldaduraRellenoID = $("#inputProcesoRelleno").data("kendoDropDownList").value();
                    data[i].procesoSoldaduraRelleno = $("#inputProcesoRelleno").data("kendoDropDownList").text();
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};

function PlanchaRaiz() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            if (data[i].PermiteTerminadoRaiz) {
                data[i].procesoSoldaduraRaizID = $("#inputProcesoRaiz").data("kendoDropDownList").value();
                data[i].procesoSoldaduraRaiz = $("#inputProcesoRaiz").data("kendoDropDownList").text();
            }
        }
        else {
            if (data[i].procesoSoldaduraRaiz == "" || data[i].procesoSoldaduraRaiz == null || data[i].procesoSoldaduraRaiz == undefined) {
                if (data[i].PermiteTerminadoRaiz) {
                    data[i].procesoSoldaduraRaizID = $("#inputProcesoRaiz").data("kendoDropDownList").value();
                    data[i].procesoSoldaduraRaiz = $("#inputProcesoRaiz").data("kendoDropDownList").text();
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};


function aplicarFiltro(listaRespaldo, listaConFiltro) {
    for (var i = 0; i < listaRespaldo.length ; i++) {
        for (var j = 0 ; j < listaConFiltro.length; j++) {

        }
    }
}

function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}

function ArregloListadoJuntasCapturadas() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var data = dataSource._data

    JsonCaptura = [];


    for (var i = 0; i < data.length ; i++) {
        JsonCaptura[i] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaArmado: "", TuberoID: "", Tubero: "", TallerID: "", Taller: "", sinCaptura: "" };
        JsonCaptura[i].IDProyecto = data[i].IDProyecto;
        JsonCaptura[i].Proyecto = data[i].Proyecto;
        JsonCaptura[i].IdOrdenTrabajo = data[i].IdOrdenTrabajo;
        JsonCaptura[i].OrdenTrabajo = data[i].OrdenTrabajo;
        JsonCaptura[i].idVal = data[i].idVal;
        JsonCaptura[i].idText = data[i].idText;
        JsonCaptura[i].SpoolID = data[i].SpoolID;
        JsonCaptura[i].JuntaID = data[i].JuntaID;
        JsonCaptura[i].Junta = data[i].Junta;
        JsonCaptura[i].FechaSoldadura = kendo.toString(data[i].FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);;
        JsonCaptura[i].tallerID = data[i].TallerID
        JsonCaptura[i].Taller = data[i].Taller;
        JsonCaptura[i].ColadaID = data[i].ColadaID;
        JsonCaptura[i].NumeroColada = data[i].NumeroColada;
        JsonCaptura[i].sinCaptura = "Todos";

    }
    return JsonCaptura;
}

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

function ArregloListadoSpoolID() {


    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var data = dataSource._data


    JsonCaptura = [];

    for (var index = 0 ; index < data.length ; index++) {
        JsonCaptura[index] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaSoldadura: "", tallerID: "", Taller: "", sinCaptura: "" };
        JsonCaptura[index].IDProyecto = data[index].IDProyecto;
        JsonCaptura[index].Proyecto = data[index].Proyecto;
        JsonCaptura[index].IdOrdenTrabajo = data[index].IdOrdenTrabajo;
        JsonCaptura[index].OrdenTrabajo = data[index].OrdenTrabajo;
        JsonCaptura[index].idVal = data[index].idVal;
        JsonCaptura[index].idText = data[index].idText;
        JsonCaptura[index].SpoolID = data[index].SpoolID;
        JsonCaptura[index].JuntaID = data[index].JuntaID;
        JsonCaptura[index].Junta = data[index].Junta;
        JsonCaptura[index].FechaSoldadura = kendo.toString(data[i].FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        JsonCaptura[index].TallerID = data[index].TallerID;
        JsonCaptura[index].tallerID = data[index].TallerID;
        JsonCaptura[index].Taller = data[index].Taller;
        JsonCaptura[index].sinCaptura = "Todos";
    }
    return JsonCaptura;
};

function CargarGridSoldadura() {

    $("#grid").kendoGrid({
        autoBind: false,
        edit: function (e) {

            if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

                var input = e.container.find(".k-input");
                var value = input.val();
                try {
                    anteriorlongitudTrabajosAdicionales = e.model.DetalleAdicional.length;

                    console.log(ItemSeleccionado.Accion);
                    if (ItemSeleccionado.JuntaSoldaduraID != 0)
                        ItemSeleccionado.Accion = 2;
                    console.log(ItemSeleccionado.Accion);
                }
                catch (e) { }
            } else
                this.closeCell();

        },
        change: function () {
            ItemSeleccionado = this.dataSource.view()[this.select().index()];
        },
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        procesoSoldaduraRaizID: { type: "int", editable: false },
                        procesoSoldaduraRellenoID: { type: "int", editable: false },
                        procesoSoldaduraRaiz: { type: "string", editable: true },
                        procesoSoldaduraRelleno: { type: "string", editable: true },
                        Proyecto: { type: "string", editable: false },
                        IDProyecto: { type: "int", editable: false },
                        IdOrdenTrabajo: { type: "string", editable: false },
                        OrdenTrabajo: { type: "string", editable: false },
                        idVal: { type: "string", editable: false },
                        idText: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        JuntaID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        TipoJunta: { type: "string", editable: false },
                        Diametro: { type: "string", editable: false },
                        FechaSoldadura: { type: "date", editable: true },
                        TallerID: { type: "string", editable: true },
                        Taller: { type: "string", editable: true },
                        DetalleJunta: { type: "string", editable: false },
                        WPSNombre: { type: "string", editable: true },
                        Raiz: { type: "string", editable: false },
                        Relleno: { type: "string", editable: false },
                        DetalleAdicional: { type: "string", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
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
            { field: "procesoSoldaduraRaiz", title: _dictionary.columnProcesoRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxProcesoSoldaduraRaiz },
            { field: "Raiz", title: _dictionary.columnSoldadoresRaiz[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonSoldadoresRaiz'><a href='\\#'  > <span>#=TemplateSoldadoresRaiz#</span></a></div>" },
            { field: "procesoSoldaduraRelleno", title: _dictionary.columnProcesoRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxProcesoSoldaduraRelleno },
            { field: "Relleno", title: _dictionary.columnSoldadoresRelleno[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonSoldadoresRelleno'><a href='\\#' > <span>#=TemplateSoldadoresRelleno#</span></a></div>" },
            { field: "WPSNombre", title: _dictionary.columnWPS[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxWPS, filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "DetalleAdicional", title: _dictionary.columnDetalleAdicional[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<div class='botonAdicionales'><a href='\\#' > <span>#=TemplateTrabajosAdicionales#</span></a></div>" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, filterable: false, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarRenglon }, filterable: false, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "60px" }
        ]
    });

    CustomisaGrid($("#grid"));
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
        itemToClean.NumeroColada = "";
        itemToClean.ColadaID = 0;
        itemToClean.DetalleAdicional = [];
        itemToClean.SoldadoresRaiz = _dictionary.CapturaSoldaduraNoSoldadoresRaiz[$("#language").data("kendoDropDownList").value()];
        itemToClean.SoldadoresRelleno = _dictionary.CapturaSoldaduraNoSoldadoresRelleno[$("#language").data("kendoDropDownList").value()];
        itemToClean.TrabajosAdicionales = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();
    }

}

function CargarGridPopUpRaiz() {

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

            ItemSeleccionadoAnidado = this.dataSource.view()[this.select().index()];

            var dataSource = this.dataSource;
            var filters = dataSource.filter();
            var allData = dataSource.data();
            var query = new kendo.data.Query(allData);
            var data = query.filter(filters).data;

            actuallongitudTrabajosAdicionales = data.length;

            if (actuallongitudTrabajosAdicionales == 0 || actuallongitudTrabajosAdicionales == undefined)
                modeloRenglon.TrabajosAdicionales = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
            else
                modeloRenglon.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];

            if (modeloRenglon.JuntaSoldaduraID != 0 && modeloRenglon.JuntaSoldaduraID != undefined)
                modeloRenglon.Accion = 2;

        },
        columns: [
          { field: "TrabajoAdicional", title: _dictionary.CapturaSoldaduraHeaderTrabajosAdicionalesAnidado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "80px", editor: RenderComboBoxSoldadoresRaiz },
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldador[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "80px", editor: RenderComboBoxSoldadorTrabajos },
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

                     $("#yesButton").click(function (handler) {


                         if (dataItem.Accion == 1 || dataItem.Accion == undefined)
                             dataSource.remove(dataItem);
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
                         ventanaConfirm.close();
                     });
                     $("#noButton").click(function (handler) {
                         ventanaConfirm.close();
                     });

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

function GridPopupSoldadoresRaizCapturados(row) {
    modeloRenglon = row;

    $("#inputSoldadoresRaiz").kendoGrid({
        dataSource: {
            data: modeloRenglon.ListaSoldadoresRaizCapturados,
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
        change: function (e) {

            ItemSeleccionadoAnidado = this.dataSource.view()[this.select().index()];

            var dataSource = this.dataSource;
            var filters = dataSource.filter();
            var allData = dataSource.data();
            var query = new kendo.data.Query(allData);
            var data = query.filter(filters).data;


            actuallongitudTrabajosAdicionales = data.length;

            if (actuallongitudTrabajosAdicionales == 0)
                modeloRenglon.TemplateSoldadoresRaiz = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
            else
                modeloRenglon.TemplateSoldadoresRaiz = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];

        },
        columns: [
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldadores[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px", editor: RenderComboBoxSoldadoresRaiz },
          { field: "Colada", title: _dictionary.ListadoCatalogos0046[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px", editor: RenderComboBoxColadas },
          { field: "Observaciones", title: _dictionary.CapturaSoldaduraHeaderObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px" },

         {
             command: {
                 name: "",
                 title: "",
                 text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                 click: function (e) {
                     e.preventDefault();
                     dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                     var dataSource = this.dataSource;

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

                     $("#yesButton").click(function (handler) {


                         if (dataItem.Accion == 1 || dataItem.Accion == undefined)
                             dataSource.remove(dataItem);
                         else
                             dataItem.Accion = 3;

                         var filters = dataSource.filter();
                         var allData = dataSource.data();
                         var query = new kendo.data.Query(allData);
                         var data = query.filter(filters).data;

                         actuallongitudSoldadoresRaizCapturados = data.length;

                         if (actuallongitudSoldadoresRaizCapturados == 0 || actuallongitudSoldadoresRaizCapturados == undefined)
                             modeloRenglon.TemplateSoldadoresRaiz = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
                         else
                             modeloRenglon.TemplateSoldadoresRaiz = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudSoldadoresRaizCapturados + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];

                         dataSource.sync();
                         ventanaConfirm.close();
                     });
                     $("#noButton").click(function (handler) {
                         dataSource.sync();
                         ventanaConfirm.close();
                     });



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
                     var dataSource = $("#gridPopUp").data("kendoGrid").dataSource;
                     dataSource.sync();

                 }
             }, width: "50px", title: _dictionary.tituloLimpiar[$("#language").data("kendoDropDownList").value()]
         }
        ],
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#inputSoldadoresRaiz"));
    VentanaModalSoldadoresRaiz();
}

function GridPopUpSoldadoresRellenoCapturados(options) {
    modeloRenglon = options;

    $("#inputSoldadoresRelleno").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
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
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldadores[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px", editor: RenderComboBoxSoldadoresRelleno },
          { field: "Colada", title: _dictionary.ListadoCatalogos0046[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px", editor: RenderComboBoxSoldadorTrabajos },
          { field: "Observaciones", title: _dictionary.CapturaSoldaduraHeaderObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftecpopUp(), width: "100px" },

         {
             command: {
                 name: "",
                 title: "",
                 text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                 click: function (e) {
                     e.preventDefault();
                     dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                     var dataSource = this.dataSource;

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

                     $("#yesButton").click(function (handler) {


                         if (dataItem.Accion == 1 || dataItem.Accion == undefined)
                             dataSource.remove(dataItem);
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
                         ventanaConfirm.close();
                     });
                     $("#noButton").click(function (handler) {
                         ventanaConfirm.close();
                     });

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
    CustomisaGrid($("#inputSoldadoresRelleno"));
    VentanaModalSoldadoresRelleno();
}



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

function VentanaModalSoldadoresRaiz() {

    var modalTitle = "";
    modalTitle = _dictionary.CapturaSoldaduraSoldadoresRaiz[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowMultiselectSoldador");
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


function VentanaModalSoldadoresRelleno() {

    var modalTitle = "";
    modalTitle = _dictionary.CapturaSoldaduraSoldadoresRelleno[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowMultiselectSoldadorRelleno");
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


function agregarFila(idGrid) {
    var grid = $("#" + idGrid).data("kendoGrid");
    //grid.addRow();
    //$(".k-grid-edit-row").appendTo("#" + idGrid + " tbody");
    alert('se agrego fila');
}

function AddRow(idTable) {
    var row = '';
    row += ' <tr>';
    row += '   <td><input style=" min-height:10px !important; height:auto;" placeholder="bisel" /></td>';
    row += '   <td><input style=" min-height:10px !important; height:auto;" placeholder="5" /></td> ';
    row += '   <td><input type="Button" class="deleteRow"  style=" width:10px; height:10px; background-image:url(../../Content/images/Delete_Grey.png); background-repeat:no-repeat; padding:0; margin:auto; background-position:center;"></td> ';
    row += ' </tr> ';

    $('#' + idTable).append(row);

    SuscribirEventoEliminar(idTable);
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



function changeLanguageCall() {

    asignarProyecto();
    SuscribirEventos();

    AjaxCargarCamposPredeterminados();
    CargarGridSoldadura();

    opcionHabilitarView(false, "FieldSetView");
    //document.title = _dictionary.CapturaSoldaduraSoldaduraSpool[$("#language").data("kendoDropDownList").value()];

};



function desplegarNotificacion() {
    var tipoCapturaSpool = $('input:radio[name=TipoAgregado]:checked').val() == "Listado" ? false : true;
    var spoolIDDefinido = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) == undefined ? false : true;
    var tipoMostrarTodos = $('input:radio[name=Muestra]:checked').val() == "Todos" ? true : false;
    var InputIDVacio = $("#InputID").val() == "" ? true : false;
    var InputJuntaVacia = $("#Junta").val() == "" ? true : false;
    var JuntaDefinida = $("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) == undefined ? false : true;


    if (InputIDVacio) {
        displayNotify("CapturaSoldaduraSpoolNoCapturado", "", '1');
    }
    else if (InputJuntaVacia) {
        displayNotify("CapturaSoldaduraJuntaNoCapturada", "", '1');
    }
    else if (!spoolIDDefinido) {
        displayNotify("CapturaSoldaduraNoExisteSpoolID", "", '2');
    }
    else if (tipoCapturaSpool) {
        displayNotify("CapturaSoldaduraNoExisteSpoolID", "", '2');
    }
    else if (!tipoCapturaSpool) {
        if (JuntaDefinida) {
            if (!tipoMostrarTodos) {
                displayNotify("CapturaSoldaduraNoExisteLista", "", '1');
            }
        }
        else if (!JuntaDefinida) {
            if (tipoMostrarTodos) {
                displayNotify("CapturaSoldaduraNoExisteJunta", "", '1');
            }
            else {
                displayNotify("CapturaSoldaduraNoExisteLista", "", '1');
            }
        }
    }

}

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


function ValidarFecha(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#FechaSoldadura").data("kendoDatePicker").value('');
    }
}

function deshabilitarFechasFuturo() {
    alert('entra')
    return endRangeDate.max(new Date())
};

function obtenerFormatoFecha(d) {
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var horaActual = new Date();
    return curr_date + "-" + curr_month + "-" + curr_year;
};



function PlanchaTaller() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].TallerID = $("#inputTaller").val();
            data[i].Taller = $("#inputTaller").data("kendoComboBox").text();
        }
        else {
            if (data[i].Taller == "" || data[i].Taller == null || data[i].Taller == undefined) {
                data[i].TallerID = $("#inputTaller").val();
                data[i].Taller = $("#inputTaller").data("kendoComboBox").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};
function PlanchaFecha() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaSoldadura = String(endRangeDate.val()).trim();
        }
        else {
            if (data[i].FechaSoldadura == "" || data[i].FechaSoldadura == null || data[i].FechaSoldadura == undefined) {
                data[i].FechaSoldadura = String(endRangeDate.val()).trim();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};
function PlanchaColada() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].ColadaID = $("#inputColada").val();
            data[i].NumeroColada = $("#inputColada").data("kendoComboBox").text();
        }
        else {
            if (data[i].NumeroColada == "" || data[i].NumeroColada == null || data[i].NumeroColada == undefined) {
                data[i].ColadaID = $("#inputColada").val();
                data[i].NumeroColada = $("#inputColada").data("kendoComboBox").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
};

function ExisteJuntaReporte(juntaVal) {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].idVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID == juntaVal) {

            $("#grid").data("kendoGrid").dataSource.sync();
            return false;
        }
    }
    return true;
}

function ExisteJuntaEnSpool(Row) {

    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == (Row.IdOrdenTrabajo + '-' + Row.IdVal) && jsonGridArmado[i].JuntaID === Row.JuntaID) {
            return true;
        }
    }
    return false;
}

function ValidarExisteSoldadorEnTrabajosAdicionales(modelo, tipoSoldador) {
    var existeSoldadorEnOtraLista = false;
    if (tipoSoldador == "relleno") {
        for (var i = 0; i < modelo.DetalleAdicional.length; i++) {
            var existe = false;

            for (var j = 0; j < modelo.Relleno.length; j++) {
                if (modelo.DetalleAdicional[i].ObreroID == modelo.Relleno[j].ObreroID) {
                    existe = true;
                }
            }

            //Comparar si existe soldador en relleno
            for (var i = 0; i < modelo.Raiz.length; i++) {
                if (modelo.Raiz[i].ObreroID == modelo.DetalleAdicional[j].ObreroID) {
                    existeSoldadorEnOtraLista = true;
                }
            }

            if (existe == true) break;

            if ((existe || (modelo.DetalleAdicional.length > modelo.Relleno.length && modelo.Relleno.length == 0) || (modelo.DetalleAdicional.length > modelo.Raiz.length && modelo.Raiz.length == 0)) && !existeSoldadorEnOtraLista) {
                modelo.DetalleAdicional[i].Accion = 3;
                modelo.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];

            }
        }
    }
    else if (tipoSoldador = "raiz") {
        for (var i = 0; i < modelo.DetalleAdicional.length; i++) {
            var existe = false;

            for (var j = 0; j < modelo.Raiz.length; j++) {
                if (modelo.DetalleAdicional[i].ObreroID == modelo.Raiz[j].ObreroID) {
                    existe = true;
                }
            }

            //Comparar si existe soldador en relleno
            for (var i = 0; i < modelo.Relleno.length; i++) {
                if (modelo.Relleno[i].ObreroID == modelo.DetalleAdicional[j].ObreroID) {
                    existeSoldadorEnOtraLista = true;
                }
            }

            if (existe == true) break;

            if ((existe || (modelo.DetalleAdicional.length > modelo.Relleno.length && modelo.Relleno.length == 0) || (modelo.DetalleAdicional.length > modelo.Raiz.length && modelo.Raiz.length == 0)) && !existeSoldadorEnOtraLista) {
                modelo.DetalleAdicional[i].Accion = 3;
                modelo.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];

            }
        }


    }

    var actuallongitudTrabajosAdicionales = 0;
    for (var k = 0; k < modelo.DetalleAdicional.length; k++) {
        if (modelo.DetalleAdicional[k].Accion != 3) {
            actuallongitudTrabajosAdicionales++;
        }
    }

    modelo.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];

}