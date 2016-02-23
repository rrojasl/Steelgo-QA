var endRangeDate;
var ItemSeleccionado;
var pruebasID, ProyectoID;
var requisicionID, pruebaProyID = 0;
var ProyectoNombre = "";
var PruebaNombre = "";
var EstatusID = 1; // Capturada segun tabla Sam3_Estatus
if ($("#idField").val() != null || $("#idField").val() != undefined){
    requisicionID = $("#idField").val();
}
    
else
    requisicionID = 0;


IniciarCaptura();

function IniciarCaptura() {
    AltaFecha();
    SuscribirEventos();
};

function changeLanguageCall() {
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    CargarGrid();
    $("#tipoPrueba").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").enable(true);
    $("#tipoPrueba").data("kendoComboBox").enable(true);
    $('#containerDiv').css('display', 'none');
    $('#grid').data('kendoGrid').dataSource.read();
    ajaxRequisicion();
    
    ajaxObtenerProyectos();
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
    document.title = _dictionary.ServiciosTecnicosGenerarRequisicion[$("#language").data("kendoDropDownList").value()];
};


function cargaInicialRequisicionEditar() {
    if (requisicionID != 0) {
        $("#Proyecto").data("kendoComboBox").value(ProyectoID);
        ajaxObtenerTipoPruebasRequisicionEdicion();
    }
}

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {

            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        autoBind: true,
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        Clasificacion: { type: "string", editable: true },
                        Prioridad: { type: "number", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Requisicion: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        CodigoAplicar: { type: "string", editable: false },
                        observacion: { type: "string", editable: false },
                        Folio: { type: "string", editable: false },
                        Agregar: { type: "boolean", editable: false },
                        NumeroControl: {editable: false}
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Clasificacion", title: _dictionary.GenerarRequisicionClasificacion[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxClasificacion, width: "150px" },
            { field: "Cuadrante", title: _dictionary.GenerarRequisicionCuadrante[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Prioridad", title: _dictionary.GenerarRequisicionPrioridad[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Proyecto", title: _dictionary.GenerarRequisicionProyecto[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Folio", title: _dictionary.ServiciosTecnicosRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "NumeroControl", title: _dictionary.GenerarRequisicionNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Agregar", title: _dictionary.ServiciosTecnicosAgregar[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: Agregar' #= Agregar ? checked='checked' : '' #/>", width: "130px" }
        ],
        dataBound: function (a) {
            $(".ob-paid").bind("change", function (e) {
                if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {


                    var grid = $("#grid").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem.Folio == "" && e.target.checked == true) {
                        dataItem.Agregar = true;
                    }
                    else {
                        dataItem.Agregar = false;
                    }
                }
                else
                    $("#grid").data("kendoGrid").closeCell();

                $("#grid").data("kendoGrid").dataSource.sync();

            });
        }
    });
    CustomisaGrid($("#grid"));
   

};

function AltaFecha() {

    endRangeDate = $("#Fecha").kendoDatePicker({
        max: new Date(),
    });
}


function ExisteJunta() {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].IdentificadorForaneo  == $("#Junta").data("kendoComboBox").value()) {
            
            $("#grid").data("kendoGrid").dataSource.sync();
            return false;
        }
    }
    return true;
}

function AgregarJuntaNueva() {


    if (ExisteJunta()) {

        loadingStart();
        $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), juntaTrabajoID: $("#Junta").data("kendoComboBox").value(), pruebaID: $("#tipoPrueba").data("kendoComboBox").value(), proyectoID: $("#Proyecto").data("kendoComboBox").value() }).done(function (data) {
            $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), pruebaID: $("#tipoPrueba").data("kendoComboBox").value(), lenguaje: $("#language").val(), pruebasProyectoID: data.PruebasProyectoID }).done(function (result) {

                ArregloNuevoRenglon = [];
                ArregloNuevoRenglon[0] = {
                    Accion: "", Agregar: "",
                    Clasificacion: "",
                    PruebasClasificacionID: "",
                    Cuadrante: "",
                    Prioridad: "",
                    Proyecto: "",
                    ProyectoID: "",
                    PruebaElementoID: "",
                    EtiquetaJunta: "",
                    IdentificadorForaneo: "",
                    PruebasProyectoID: "",
                    NumeroControl: "",
                    Folio: "",
                    PruebasID: "",
                    RequisicionID: "",
                    RequisicionPruebaElementoID: "",
                    listaClasificaciones: "",
                };
                ArregloNuevoRenglon[0].Accion = 1;
                ArregloNuevoRenglon[0].Agregar = true;
                ArregloNuevoRenglon[0].Clasificacion = data[0].Clasificacion;
                ArregloNuevoRenglon[0].PruebasClasificacionID = data[0].PruebasClasificacionID;
                ArregloNuevoRenglon[0].Cuadrante = data[0].Cuadrante;
                ArregloNuevoRenglon[0].Prioridad = data[0].Prioridad;
                ArregloNuevoRenglon[0].Proyecto = data[0].Proyecto;
                ArregloNuevoRenglon[0].ProyectoID = data[0].ProyectoID;
                ArregloNuevoRenglon[0].PruebaElementoID = data[0].PruebaElementoID;
                ArregloNuevoRenglon[0].IdentificadorForaneo = data[0].IdentificadorForaneo;
                ArregloNuevoRenglon[0].PruebasProyectoID = data[0].PruebasProyectoID;
                ArregloNuevoRenglon[0].NumeroControl = data[0].NumeroControl;
                ArregloNuevoRenglon[0].EtiquetaJunta = data[0].EtiquetaJunta;

                ArregloNuevoRenglon[0].Folio = $("#Folio").text();
                ArregloNuevoRenglon[0].PruebasID = $("#tipoPrueba").data("kendoComboBox").value();
                ArregloNuevoRenglon[0].RequisicionID = requisicionID;
                ArregloNuevoRenglon[0].RequisicionPruebaElementoID = 0;
                ArregloNuevoRenglon[0].listaClasificaciones = result;

                var ds = $("#grid").data("kendoGrid").dataSource;
                ds.add(ArregloNuevoRenglon[0]);
                $("#Junta").data("kendoComboBox").value("");
                AjaxJunta($("#InputID").data("kendoComboBox").value());
                loadingStop();
            });
        });
    }
    else {
        displayMessage("GenerarRequisicionMensajeJuntaAgregada", "", '1');
    }
}





function ValidaFormatoFecha(FechaValidar, Idioma) {

    //Valida que el formato de la fecha sea correcto (2-2-4)
    var bool;
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((String(FechaValidar).trim().match(RegExPattern)) && (FechaValidar != '')) {

        if (Idioma == 'es-MX') {

            if (existeFechaMexicoFormato(FechaValidar) && existeFechaMexico(FechaValidar)) {
                bool = true;
            }
            else {
                bool = false
            }
        }
        else if (Idioma == 'en-US') {

            if (existeFechaEUFormato(FechaValidar) && existeFechaEU(FechaValidar)) {
                bool = true;
            }
            else {
                bool = false
            }

        }
    } else {

        bool = false;
    }
    return bool;

}

function existeFechaMexicoFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[0];
    var m = fechaf[1];
    var y = fechaf[2];

    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();


}

function existeFechaMexico(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[0];
    var month = FechaValidar[1];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function existeFechaEUFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[1];
    var m = fechaf[0];
    var y = fechaf[2];

    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function existeFechaEU(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[1];
    var month = FechaValidar[0];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}