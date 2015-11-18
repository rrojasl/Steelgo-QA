﻿var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;
var ItemSeleccionado;
var longitudSoldadoresRaiz;
var longitudSoldadoresRelleno;
var listaRaizFiltro;
var listaRellenoFiltro;

IniciarCapturaSoldadura();

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
    JsonCaptura[0] = {IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaSoldadura: "", tallerID: "", Taller: "", sinCaptura: "", IDProyecto: "" };
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

    for(var index = 0 ; index < data.length ; index ++ ){
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

   $ ("#grid").kendoGrid({
        
        autoBind: false,
        edit: function (e) {
            var input = e.container.find(".k-input");
            var value = input.val();
            try{
                anteriorlongitudTrabajosAdicionales = e.model.DetalleAdicional.length;
                
                    console.log(ItemSeleccionado.Accion);
                    if (ItemSeleccionado.JuntaSoldaduraID != 0)
                        ItemSeleccionado.Accion = 2;
                    console.log(ItemSeleccionado.Accion);
            }
                catch(e){}

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
                        procesoSoldaduraRaiz: { type: "int", editable: true },
                        procesoSoldaduraRelleno: { type: "int", editable: true },
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
                        FechaSoldadura: { type: "date", editable: true},
                        TallerID: { type: "string", editable: true},
                        Taller: { type: "string", editable: true, validation: { required: true }},
                        Localizacion: { type: "string", editable: false },
                        juntaSpoolID: { type: "int", editable: true },
                        DetalleJunta: { type: "string", editable: false },
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
            
            { field: "SpoolID", title: _dictionary.CapturaArmadoHeaderSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "JuntaID", title: "", filterable: true, width: "110px", hidden: true },
            { field: "Junta", title: _dictionary.CapturaSoldaduraJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
            { field: "DetalleJunta", title: _dictionary.CapturaSoldaduraDetalleJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "180px" },
            { field: "FechaSoldadura", title: _dictionary.CapturaSoldaduraHeaderFechaSoldadura[$("#language").data("kendoDropDownList").value()], filterable: true, width: "180px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "Taller", title: _dictionary.CapturaSoldaduraHeaderTaller[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTaller, width: "130px" },
            { field: "procesoSoldaduraRaiz", title: _dictionary.CapturaSoldaduraProcesoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "200px", editor: RenderComboBoxProcesoSoldaduraRaiz },
            { field: "procesoSoldaduraRelleno", title: _dictionary.CapturaSoldaduraProcesoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "200px", editor: RenderComboBoxProcesoSoldaduraRelleno },
            { field: "Raiz", title: _dictionary.CapturaRaizHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: true, width: "250px", template: "#:SoldadoresRaiz#", editor: RenderGridRaiz },
            { field: "Relleno", title: _dictionary.CapturaRellenoHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: true, width: "250px", template: "#:SoldadoresRelleno#", editor: RenderGridRelleno },
            { field: "DetalleAdicional", title: _dictionary.CapturaSoldaduraHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: true, width: "500px", editor: RenderGridDetalle, template: "#:TrabajosAdicionales#" },
            { field: "juntaSpoolID", title: "", filterable: true, width: "150px", hidden: true },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: "", width: "99px" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
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
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var spoolIDRegistro = dataItem.SpoolID;

    if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataItem.Accion = 3;
        if (dataItem.JuntaSoldaduraID == 0)
            dataSource.remove(dataItem);
        $("#grid").data("kendoGrid").dataSource.sync();
    }
};

function changeLanguageCall() {
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    AjaxCargarCamposPredeterminados();
    CargarGridSoldadura();
    SuscribirEventoMuestraJunta();
};

function AltaFecha() {

    endRangeDate = $("#FechaSoldadura").kendoDatePicker({
        max: new Date(),
    });

    endRangeDate.on("keydown", function (e) {
        if (e.keyCode == 13) {
            PlanchaFecha();
        }
    });

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