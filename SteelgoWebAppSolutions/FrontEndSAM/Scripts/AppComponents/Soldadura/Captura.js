var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;
var ItemSeleccionado;
var longitudSoldadoresRaiz;
var longitudSoldadoresRelleno;
var listaRaizFiltro;
var listaRellenoFiltro;
var modeloRenglon;
IniciarCapturaSoldadura();

function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
    }
    else {
        var filters = ds.filter();
        filters.logic = "or"
        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
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

function IniciarCapturaSoldadura() {

    AltaFecha();
    asignarProyecto();
    SuscribirEventos();
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
    JsonCaptura[0].tallerID = $("#inputTaller").val();
    JsonCaptura[0].Taller = $("#inputTaller").data("kendoComboBox").text();
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
        JsonCaptura[i].tallerID = $("#inputTaller").val();
        JsonCaptura[i].Taller = $("#inputTaller").data("kendoComboBox").text();
        JsonCaptura[i].sinCaptura = "todos";
    }
    return JsonCaptura;
};

function ArregloListadoSpoolID() {
    JsonCaptura = [];
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

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
        JsonCaptura[index].FechaSoldadura = data[index].FechaSoldadura;
        JsonCaptura[index].TallerID = data[index].TallerID;
        JsonCaptura[index].tallerID = data[index].TallerID;
        JsonCaptura[index].Taller = data[index].Taller;
        JsonCaptura[index].sinCaptura = data[index].sinCaptura;
    }
    return JsonCaptura;
};

function CargarGridSoldadura() {

    $("#grid").kendoGrid({ 
        autoBind: false,
        edit: function (e) {

            if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

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
            data: '',//listadoJsonCaptura,//[{}],
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
                        Cedula: { type: "string", editable: false },
                        FechaSoldadura: { type: "date", editable: true },
                        TallerID: { type: "string", editable: true },
                        Taller: { type: "string", editable: true },
                        Localizacion: { type: "string", editable: false },
                        juntaSpoolID: { type: "int", editable: true },
                        DetalleJunta: { type: "string", editable: false },
                        DetalleAdicional: {  editable: false }
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
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        filterable: {
            extra: false
        },
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [ 
            { field: "SpoolID", title: _dictionary.CapturaArmadoHeaderSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
            { field: "JuntaID", title: "", filterable: true, width: "110px", hidden: true },
            { field: "Junta", title: _dictionary.CapturaSoldaduraJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "95px" },
            { field: "DetalleJunta", title: _dictionary.CapturaSoldaduraDetalleJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "180px" },
            { field: "FechaSoldadura", title: _dictionary.CapturaSoldaduraHeaderFechaSoldadura[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "Taller", title: _dictionary.CapturaSoldaduraHeaderTaller[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTaller, width: "130px" },
            { field: "procesoSoldaduraRaiz", title: _dictionary.CapturaSoldaduraProcesoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px", editor: RenderComboBoxProcesoSoldaduraRaiz },
            { field: "procesoSoldaduraRelleno", title: _dictionary.CapturaSoldaduraProcesoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px", editor: RenderComboBoxProcesoSoldaduraRelleno },
            { field: "Raiz", title: _dictionary.CapturaRaizHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "#:SoldadoresRaiz#", editor: RenderMultiselectRaiz },
            { field: "Relleno", title: _dictionary.CapturaRellenoHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "#:SoldadoresRelleno#", editor: RenderMultiselectRelleno },
            { field: "DetalleAdicional", title: _dictionary.CapturaSoldaduraHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px", template: "<a href='\\#' class='botonAdicionales' > <span>#=TrabajosAdicionales#</span></a>" },
            { field: "juntaSpoolID", title: "", filterable: true, width: "150px", hidden: true },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: "", width: "99px" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });

    CustomisaGrid($("#grid"));
};


function CargarGridPopUp() {

    $("#gridPopUp").kendoGrid({
        dataSource: {
            // batch: true,
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
            }
        },
        selectable: true,
        dataBinding: function (e) {
            console.log("dataBinding");
        },
        change: function (e) {

            ItemSeleccionadoAnidado = this.dataSource.view()[this.select().index()];

            var dataSource = this.dataSource;
            var filters = dataSource.filter();
            var allData = dataSource.data();
            var query = new kendo.data.Query(allData);
            var data = query.filter(filters).data;
             
            actuallongitudTrabajosAdicionales = data.length;
            modeloRenglon.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
            if (modeloRenglon.JuntaSoldaduraID != 0 && modeloRenglon.JuntaSoldaduraID != undefined)
                modeloRenglon.Accion = 2;
            
        },
        columns: [
          { field: "TrabajoAdicional", title: _dictionary.CapturaSoldaduraHeaderTrabajosAdicionalesAnidado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px", editor: RenderComboBoxTrabajos },
          { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldador[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px", editor: RenderComboBoxSoldadorTrabajos },
          { field: "Observacion", title: _dictionary.CapturaSoldaduraHeaderObservacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },

         {
             command: {
                 name: "",
                 title: "",
                 text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                 click: function (e) {
                     e.preventDefault();
                     dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                     var dataSource = this.dataSource;

                     if (confirm(_dictionary.CapturaSoldaduraPreguntaBorradoCapturaTrabajoAdicional[$("#language").data("kendoDropDownList").value()])) {
                         dataItem.Accion = 3;
                     }
                     var filters = dataSource.filter();
                     var allData = dataSource.data();
                     var query = new kendo.data.Query(allData);
                     var data = query.filter(filters).data;

                     actuallongitudTrabajosAdicionales = data.length;
                     modeloRenglon.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
                     dataSource.sync();

                 }
             }, width: "100px"
         }],
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create", }]

    });
};

function LlenarGridPopUp(data) {
    modeloRenglon = data;
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    var array = data.DetalleAdicional;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    VentanaModal();
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
            modal: true
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
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    AjaxCargarCamposPredeterminados();
    CargarGridSoldadura();
    CargarGridPopUp();
    opcionHabilitarView(false, "FieldSetView");
    document.title = _dictionary.CapturaSoldaduraSoldaduraSpool[$("#language").data("kendoDropDownList").value()];
};

function AltaFecha() {

    endRangeDate = $("#FechaSoldadura").kendoDatePicker({
        max: new Date(),
    });

    //endRangeDate.on("keydown", function (e) {
    //    if (e.keyCode == 13) {
    //        PlanchaFecha();
    //    }
    //});

}

function ExisteJunta() {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].idVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID == $("#Junta").val()) {
            return false;
        }
    }
    return true;
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
            if (data[i].FechaSoldadura == "") {
                data[i].FechaSoldadura = String(endRangeDate.val()).trim();
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