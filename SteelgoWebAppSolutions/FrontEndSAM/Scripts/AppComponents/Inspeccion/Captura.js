var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;

IniciarCapturaInspecion();
//Cambia lenguaje
function changeLanguageCall() {
    AjaxCargarFechaInspeccionDimencional();
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    AjaxObtenerListaDefectos();
    CargarGrid();
};
function IniciarCapturaInspecion() {
    CargarFecha();
    asignarProyecto();
    SuscribirEventos();
};
function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('Proyecto') == undefined ? '' : 'R');
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}
function CargarFecha() {
    endRangeDate = $("#FechaInspeccion").kendoDatePicker({
        max: new Date()
    })
    AjaxCargarFechaInspeccionDimencional();
};
function ExisteJunta() {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;
    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].OrdenTrabajoID + '-' + jsonGrid[i].OrdenTrabajoSpoolID == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGrid[i].JuntaID == $("#Junta").val()) {
            return false;
        }
    }
    return true;
}
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            var input = e.container.find(".k-input");
            var value = input.val();
        },
        change: function () {
            var dataItem = this.dataSource.view()[this.select().index()];
        },
        dataSource: {

            data: '',
            schema: {
                model: {
                    fields: {
                        ProyectoID: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        OrdenTrabajoID: { type: "string", editable: false },
                        OrdenTrabajo: { type: "string", editable: false },
                        OrdenTrabajoSpoolID: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        JuntaID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        TipoJunta: { type: "string", editable: false },
                        TipoJuntaID: { type: "string", editable: false },
                        Diametro: { type: "string", editable: false },
                        Resultado: { type: "string", editable: true },
                        ResultadoID: { type: "string", editable: true },
                        TallerID: { type: "string", editable: true },
                        Taller: { type: "string", editable: true },
                        DefectosID: { type: "string", editable: true },
                        Defectos: { type: "string", editable: true },
                        InspectorID: { type: "string", editable: true },
                        Inspector: { type: "string", editable: true },
                        FechaInspeccion: { type: "date", editable: true },
                        NumeroUnico1: { type: "string", editable: true },
                        NumeroUnico2: { type: "string", editable: true },
                        Clave1: { type: "string", editable: true },
                        Clave2: { type: "string", editable: true }
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: false,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Junta", title: _dictionary.DimensionalVisualHeaderJunta[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Taller", title: _dictionary.DimensionalVisualHeadeTaller[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTaller },
            { field: "Resultado", title: _dictionary.DimensionalVisualHeadeResultado[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderOptionResultado },
            { field: "Defectos", title: _dictionary.DimensionalVisualHeaderDefecto[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxDefectos },
            { field: "Inspector", title: _dictionary.DimensionalVisualHeaderInspectorDimesional[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxInspector },
            { field: "FechaInspeccion", title: _dictionary.DimensionalVisualHeaderFechaDimesional[$("#language").data("kendoDropDownList").value()], type: "date", filterable: true, format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "NumeroUnico1", title: _dictionary.DimensionalVisualNumeroUnico1[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxNumeroUnico1 },
            { field: "NumeroUnico2", title: _dictionary.DimensionalVisualNumeroUnico2[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxNumeroUnico2 },

            { command: { text: _dictionary.ListadoLlegadaMaterial0017[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: "", width: "99px" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
};
function ArregloListadoCaptura() {

    JsonCaptura = [];
    JsonCaptura[0] = { ProyectoID: "", Proyecto: "", OrdenTrabajoID: "", OrdenTrabajo: "", OrdenTrabajoSpoolID: "", OrdenTrabajoSpool: "", SpoolID: "", JuntaID: "", Junta: "", FechaInspeccion: "", InspectorID: "", Inspector: ""};

    //combobox.text()
    var fechaInspeccion = new Date($("#FechaInspeccion").data("kendoDatePicker").value());

    JsonCaptura[0].ProyectoID = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).ProyectoID;
    JsonCaptura[0].Proyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Proyecto;
    JsonCaptura[0].OrdenTrabajoID = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].OrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].OrdenTrabajoSpoolID = $("#InputID").val();
    JsonCaptura[0].OrdenTrabajoSpool = $("#InputID").data("kendoComboBox").text()
    JsonCaptura[0].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
    JsonCaptura[0].JuntaID = $("#Junta").val();
    JsonCaptura[0].Junta = $("#Junta").data("kendoComboBox").text();
    JsonCaptura[0].FechaInspeccion = $("#FechaInspeccion").val();
    JsonCaptura[0].InspectorID = $("#inputInspector").val();
    JsonCaptura[0].Inspector = $("#inputInspector").data("kendoComboBox").text();
    return JsonCaptura[0];
};
function AplicarAsignacionAutomaticaNumeroUnico(rowitem, textoAnterior, combobox, posicionSiguiente) {

    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;


    //se asigna datos a nivel Etiqueta
    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal)) {

            for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
                if (combobox.EtiquetaMaterial == jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial)
                    jsonGridArmado[i].NumeroUnico1 = combobox.Clave;
            }
            for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
                if (combobox.EtiquetaMaterial == jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial)
                    jsonGridArmado[i].NumeroUnico2 = combobox.Clave;
            }

        }
    }

    //se asigna datos a nivel numero unico siempre y cuando la longitud del total de posibles numeros unicos es 1

    var itemSiguienteMismoMaterial;
    var arrayListaNumerosUnicos;

    if (combobox.Etiqueta == "2")
        arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos2;
    else if (combobox.Etiqueta == "1")
        arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos1;

    if (arrayListaNumerosUnicos.length - 1 == 1) {
        for (var i = 0; i < arrayListaNumerosUnicos.length; i++) {
            if (combobox.Clave != arrayListaNumerosUnicos[i].Clave) {
                itemSiguienteMismoMaterial = arrayListaNumerosUnicos[i];
                rowitem = BuscarItemSiguienteEnGrid(itemSiguienteMismoMaterial);

                if (rowitem != undefined) {


                    if (posicionSiguiente < arrayListaNumerosUnicos.length) {
                        posicionSiguiente++;
                        AplicarAsignacionAutomaticaNumeroUnico(rowitem[0], textoAnterior, rowitem[1], posicionSiguiente)
                    }
                }
            }
        }
    }

};
function BuscarItemSiguienteEnGrid(siguienteItemBuscar) {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;


    //se busca el nuevo item en alguna junta con el mismo EtiquetaMaterial .
    for (var i = 0; i < jsonGridArmado.length; i++) {
        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridArmado[i].NumeroUnico1 == undefined)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos1[j]];
        }

        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridArmado[i].NumeroUnico2 == undefined)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos2[j]];
        }
    }

    //se busca el nuevo item en alguna junta con diferente EtiquetaMaterial .
    for (var i = 0; i < jsonGridArmado.length; i++) {
        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos1[j]];
        }

        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos2[j]];
        }
    }

    //en caso de no encontrar nada
    return undefined;
}
function cancelarCaptura(e) {
    e.preventDefault();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var spoolIDRegistro = dataItem.SpoolID;
    if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.remove(dataItem);

    }
};