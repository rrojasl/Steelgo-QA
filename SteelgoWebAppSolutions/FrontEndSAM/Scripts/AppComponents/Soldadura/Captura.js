var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;
var ItemSeleccionado;

IniciarCapturaSoldadura();

function IniciarCapturaSoldadura() {
    CargarFechaArmado();
    asignarProyecto();
    SuscribirEventos();
};

function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('Proyecto') == undefined ? '' : 'R');
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}

function ArregloListadoCaptura() {
    JsonCaptura = [];
    JsonCaptura[0] = { Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaArmado: "", tallerID: "", Taller: "", sinCaptura: "" };
    //combobox.text()
    var fechaArmado = new Date($("#FechaArmado").data("kendoDatePicker").value());
    JsonCaptura[0].Proyecto = $("#LabelProyecto").text;
    JsonCaptura[0].IdOrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].OrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].idVal = $("#InputID").val();
    JsonCaptura[0].idText = $("#InputID").data("kendoComboBox").text()
    JsonCaptura[0].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
    JsonCaptura[0].JuntaID = $("#Junta").val();
    JsonCaptura[0].Junta = $("#Junta").data("kendoComboBox").text();
    JsonCaptura[0].FechaArmado = obtenerFormatoFecha(fechaArmado);
    JsonCaptura[0].tallerID = $("#inputTaller").val();
    JsonCaptura[0].Taller = $("#inputTaller").data("kendoComboBox").text();
    JsonCaptura[0].sinCaptura = $('input:radio[name=Muestra]:checked').val();
    return JsonCaptura[0];
};

function CargarFechaArmado() {

    endRangeDate = $("#FechaArmado").kendoDatePicker({
        format: "dd-MM-yyyy"
        //change: deshabilitarFechasFuturo
    }).data("kendoDatePicker");

    //if ($("#language").val() == 'es-MX')
    //    endRangeDate.format = "dd-MM-yyyy";
    //else {
    //    endRangeDate.format = "MM-dd-yyyy";
    //}

    $CapturaArmado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        console.log("fecha nueva" + data.FechaArmado);

        var from = data.FechaArmado.split("-");

        if (new Date(data.FechaArmado) <= new Date())
            $("#FechaArmado").data("kendoDatePicker").value(data.FechaArmado);
        else
            $("#FechaArmado").data("kendoDatePicker").value(new Date());

        if (data.Muestra) {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', true);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', false);
        }
        else {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
        }
        loadingStop();
    });
};

function CargarGridSoldadura() {


    $("#grid").kendoGrid({
        
        autoBind: false,
        edit: function (e) {
            var input = e.container.find(".k-input");
            var value = input.val();
            try{
                anteriorlongitudTrabajosAdicionales = e.model.DetalleAdicional.length;
            }
                catch(e){}

        },
        change: function () {
            ItemSeleccionado = this.dataSource.view()[this.select().index()];
            //console.log("seleccionado: "+JSON.stringify(ItemSeleccionado));
        },
        dataSource: {
            data: '',//listadoJsonCaptura,//[{}],
            schema: {
                model: {
                    fields: {
                        procesoSoldaduraRaizID: { type: "int", editable: false },
                        procesoSoldaduraRellenoID: { type: "int", editable: false },
                        Proyecto: { type: "string", editable: false },
                        IdOrdenTrabajo: { type: "string", editable: false },
                        OrdenTrabajo: { type: "string", editable: false },
                        idVal: { type: "string", editable: false },
                        idText: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        JuntaID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        TipoJunta: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        FechaArmado: { type: "date", editable: true, format: "dd/MM/yyyy" },
                        tallerID: { type: "string", editable: true },
                        Taller: { type: "string", editable: true },
                        Localizacion: { type: "string", editable: false },
                        TemplateMensajeTrabajosAdicionales: { type: "string", editable: true },
                        Raiz: { type: "string", editable: true },
                        Relleno: { type: "string", editable: true },
                        DetalleAdicional: { type: "string", editable: true },
                        juntaSpoolID: {type: "int", editable: true},
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
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Proyecto", title: "", filterable: true, width: "150px", hidden: true },
            { field: "procesoSoldaduraRaizID", title: "Soldadura Raiz", filterable: true, width: "150px" },
            { field: "procesoSoldaduraRellenoID", title: "Soldadura Relleno", filterable: true, width: "150px" },
            { field: "Proyecto", title: "", filterable: true, width: "150px", hidden: true },
            { field: "IdOrdenTrabajo", title: "", filterable: true, width: "150px", hidden: true },
            { field: "OrdenTrabajo", title: "", filterable: true, width: "110px", hidden: true },
            { field: "idVal", title: "", filterable: true, width: "110px", hidden: true },
            { field: "idText", title: "", filterable: true, width: "110px", hidden: true },
            { field: "SpoolID", title: _dictionary.CapturaArmadoHeaderSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "JuntaID", title: "", filterable: true, width: "110px", hidden: true },
            { field: "Junta", title: _dictionary.CapturaArmadoJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
            { field: "TipoJunta", title: _dictionary.CapturaArmadoHeaderTipoJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Cedula", title: _dictionary.CapturaArmadoHeaderCedula[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "FechaArmado", title: _dictionary.CapturaArmadoHeaderFechaArmado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "160px", format: "{0:dd-MM-yyyy}" },
            { field: "tallerID", title: "", filterable: true, width: "130px", hidden: true },
            { field: "Taller", title: _dictionary.CapturaArmadoHeaderTaller[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTaller, width: "130px" },
            { field: "Localizacion", title: _dictionary.CapturaArmadoHeaderLocalizacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Raiz", title: "Raiz", filterable: true, width: "300px", template: "#:TemplateMensajeTrabajosAdicionales#" },
            { field: "Relleno", title: "Relleno", filterable: true, width: "300px", template: "#:TemplateMensajeTrabajosAdicionales#" },
            { field: "DetalleAdicional", title: _dictionary.CapturaArmadoHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: true, width: "300px", editor: RenderGridDetalle, template: "#:TemplateMensajeTrabajosAdicionales#" },
            { field: "juntaSpoolID", title: "", filterable: true, width: "150px", hidden: true },
            { command: { text: _dictionary.ListadoLlegadaMaterial0017[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: "", width: "99px" }
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
        dataSource.remove(dataItem);
        dataSource.sync();
    }
};

function changeLanguageCall() {
    CargarGridSoldadura();
};

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