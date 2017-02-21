﻿var previousCurrentItem;

var currentSpoolMaster = null;

var currentTipoSalidaArray = [];
//var currentListaSpools = [];

function initSpoolMaster() {
    currentSpoolMaster = {
        UsuarioID: 0,
        ProyectoID: 0,
        ProyectoNombre: '',
        NombreLoop: '',
        Dibujo: '',
        PND: '',
        RequierePWHT: false,
        RevisionCliente: 0,
        RevisionSteelgo: 'A1',
        Acero: '',
        Especificacion: '',
        PDI: 0.0,
        SistemaPintura: '',
        ColorPintura: '',

        DetalleSalidas: [] 
    };
}

function addNewDetalleSalida(spoolID, nombreSpool) {
    currentSpoolMaster.DetalleSalidas[currentSpoolMaster.DetalleSalidas.length] = {
        NombreLoop: currentSpoolMaster.NombreLoop,
        SpoolID: spoolID,
        NombreSpool: nombreSpool,
        Posicion: currentSpoolMaster.DetalleSalidas.length,
        RevisionCliente: 0,
        RevisionSteelgo: '',
        SistemaPinturaID: 0,
        SistemaPintura: '',
        ColorPinturaID: 0,
        ColorPintura: '',

        SalidasEstandar: [],
        SalidasJuntasCerradas: []
    };

    //addNewDetalleSalida(spoolID);
}

function addNewDetalleSalidaAgrupado(spoolID, salidasEstandar, salidasJuntasCerradas, detalleMaterialesSpool, detalleListadoSpool, listadoJuntaSpool) {
    for (var i = 0; i < currentSpoolMaster.DetalleSalidas.length; i++) {
        if (currentSpoolMaster.DetalleSalidas[i].SpoolID == spoolID) {
            for (var j = 0; j < salidasEstandar; j++) {
                currentSpoolMaster.DetalleSalidas[i].SalidasEstandar[j] = {
                    SpoolID: spoolID,
                    PosicionSalida: j,
                    ClaveSalida: 'S' + (j+1),
                    TipoSalidaID: 0,
                    TipoSalida: '',
                    TipoSalidaLista: currentTipoSalidaArray,
                    DetalleMaterialSpoolID: 0,
                    DetalleMaterialSpool: '',
                    DetalleMaterialSpoolLista: detalleMaterialesSpool,
                    SpoolItemCodeID: 0,
                    SpoolItemCode: '',
                    SpoolItemCodeLista: detalleListadoSpool,
                    ItemCodeSelect: '',
                    DetalleJuntaSpoolID: 0,
                    DetalleJuntaSpool: '',
                    DetalleJuntaSpoolLista: listadoJuntaSpool,
                    Nivel: 0,
                    PosicionSalidaPadre: currentSpoolMaster.DetalleSalidas[i].Posicion,
                    ClaveSalidaPadre: '',

                    TipoJuntaID: 0,
                    TipoJunta: '',
                    Cedula: '',
                    FamiliaAceroMaterial1ID: 0,
                    FamiliaAceroMaterial1: '',
                    FamiliaAceroMaterial2ID: 0,
                    FamiliaAceroMaterial2: '',
                    Diametro: 0.0,

                    TipoCorte1ID: 0,
                    TipoCorte1: '',
                    TipoCorte1Lista: [],
                    TipoCorte2ID: 0,
                    TipoCorte2: '',
                    TipoCorte2Lista: [],
                    Cantidad: 0.0

                };
            }

            for (var j = 0; j < salidasJuntasCerradas; j++) {
                currentSpoolMaster.DetalleSalidas[i].SalidasJuntasCerradas[j] = {
                    SpoolID: spoolID,
                    PosicionSalida: j,
                    ClaveSalida: 'JC' + (j + 1),
                    TipoSalidaID: 0,
                    TipoSalida: '',
                    TipoSalidaLista: currentTipoSalidaArray,
                    DetalleMaterialSpoolID: 0,
                    DetalleMaterialSpool: '',
                    DetalleMaterialSpoolLista: detalleMaterialesSpool,
                    SpoolItemCodeID: 0,
                    SpoolItemCode: '',
                    SpoolItemCodeLista: detalleListadoSpool,
                    ItemCodeSelect: '',
                    DetalleJuntaSpoolID: 0,
                    DetalleJuntaSpool: '',
                    DetalleJuntaSpoolLista: listadoJuntaSpool,
                    Nivel: 0,
                    PosicionSalidaPadre: currentSpoolMaster.DetalleSalidas[i].Posicion,
                    ClaveSalidaPadre: '',

                    TipoJuntaID: 0,
                    TipoJunta: '',
                    Cedula: '',
                    FamiliaAceroMaterial1ID: 0,
                    FamiliaAceroMaterial1: '',
                    FamiliaAceroMaterial2ID: 0,
                    FamiliaAceroMaterial2: '',
                    Diametro: 0.0,

                    TipoCorte1ID: 0,
                    TipoCorte1: '',
                    TipoCorte1Lista: [],
                    TipoCorte2ID: 0,
                    TipoCorte2: '',
                    TipoCorte2Lista: [],
                    Cantidad: 0.0

                };
            }
            break;
        }
    }
}


function SuscribirEventos() {
    suscribirEventoGuardar();
    //suscribirEventoCancelar();
    //suscribirEventoChangeRadioTipo();
    suscribirEventoProyecto();
    //suscribirEventoProveedor();
    SuscribirEventoComboPrueba();

    //nombreLoop();
    //suscribirEventoRequisicion();
    //suscribirEventoFuente();
    //suscribirEventTurno();
    //suscribirEventoDetallePlaca();
    //suscribirEventoDetalleDefectoPorPlaca();
    //suscribirUsuarioVR();
}

function buscaLoop() {
    //AJAX
    var loopHTML = '';
    initSpoolMaster();
    addNewDetalleSalida(0, '');//Primer Item

    loopHTML += '<div id="content_0">';
    loopHTML += '<div class="row">';
    loopHTML += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-2 altoControl" >';
    loopHTML += '<label>' + _dictionary.lblSpool[$("#language").data("kendoDropDownList").value()] + '</label>';
    loopHTML += '<input id="spool_0" class="item-select general-input" />';
    loopHTML += '</div>';
    loopHTML += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-2 altoControl" id="divPrueba">';
    loopHTML += '<label>' + _dictionary.lblNumeroSalidas[$("#language").data("kendoDropDownList").value()] + '</label>';
    loopHTML += '<input style="width:47%" id="inputSalidas_0" />';
    loopHTML += '</div>';
    loopHTML += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 altoControl" id="divPrueba">';
    loopHTML += '<label>' + _dictionary.lblNumeroSalidasCerradas[$("#language").data("kendoDropDownList").value()] + '</label>';
    loopHTML += '<input style="width:30%" id="inputJuntasCerradas_0" />';
    loopHTML += '</div>';
    loopHTML += '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">';
    loopHTML += '<label></label>';
    loopHTML += '<button type="button" id="btnAgregar_0" class="btn btn-blue"  onclick="eventBuscar(0);">Agregar</button>';
    loopHTML += '</div>';
    loopHTML += '</div>';

    loopHTML += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">';
    loopHTML += '<div id="ContenedorGrid" class="row">';
    loopHTML += '<div id="grid_0" data-role="grid" class="k-grid k-widget">';
    loopHTML += '</div>';
    loopHTML += '</div>';
    loopHTML += '</div>';

    loopHTML += '<div class="row">';
    loopHTML += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">';
    loopHTML += '<label>&nbsp;</label>';
    loopHTML += '</div>';
    loopHTML += '</div>';

    loopHTML += '';
    loopHTML += '';
    loopHTML += '</div>';

    if ($('#content_0').length > 0)
        $("#content_0").remove();

    $("#contenedor_master").append(loopHTML);

    $('#inputSalidas_0').kendoNumericTextBox({
        format: "###"
    });

    $('#inputJuntasCerradas_0').kendoNumericTextBox({
        format: "###"
    });

    CargarGridDynamic(0);

    reCalculaReglas();
}

function eventBuscar(posicion) {
    var nombreSpoolABuscar = '';
    var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());

    if (Proyecto != undefined && Proyecto.ProyectoID != 0) {
        if (posicion == 0) {
            AjaxDetalleSpoolXNombre(posicion, Proyecto.ProyectoSpoolID, $('#spool_' + posicion).val());
        }
        else {
            AjaxDetalleSpoolXNombre(posicion, Proyecto.ProyectoSpoolID, currentSpoolMaster.DetalleSalidas[posicion].NombreSpool);
        }
    } else {
        alert("Por favor seleccione un proyecto");
    }
}

function reloadControls() {
    var loopHTML = '';

    for (var i = 0; i < currentSpoolMaster.DetalleSalidas.length; i++) {
        if ($('#content_' + i).length > 0)
            $('#content_' + i).remove();

        loopHTML += '<div id="content_' + i + '">';
        loopHTML += '<div class="row">';
        loopHTML += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-2 altoControl" >';
        loopHTML += '<label>' + _dictionary.lblSpool[$("#language").data("kendoDropDownList").value()] + '</label>';
        if (i == 0)
            loopHTML += '<input id="spool_' + i + '" class="item-select general-input" value="' + currentSpoolMaster.DetalleSalidas[i].NombreSpool + '" />';
        else
            loopHTML += '<label>' + currentSpoolMaster.DetalleSalidas[i].NombreSpool + '</label>';
        loopHTML += '</div>';
        loopHTML += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-2 altoControl" id="divPrueba">';
        loopHTML += '<label>' + _dictionary.lblNumeroSalidas[$("#language").data("kendoDropDownList").value()] + '</label>';
        loopHTML += '<input style="width:47%" id="inputSalidas_' + i + '" />';
        loopHTML += '</div>';
        loopHTML += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 altoControl" id="divPrueba">';
        loopHTML += '<label>' + _dictionary.lblNumeroSalidasCerradas[$("#language").data("kendoDropDownList").value()] + '</label>';
        loopHTML += '<input style="width:30%" id="inputJuntasCerradas_' + i + '" />';
        loopHTML += '</div>';
        loopHTML += '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">';
        loopHTML += '<label></label>';
        loopHTML += '<button type="button" id="btnAgregar_' + i + '" class="btn btn-blue"  onclick="eventBuscar(' + i + ');">Agregar</button>';
        loopHTML += '</div>';
        loopHTML += '</div>';

        loopHTML += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">';
        loopHTML += '<div id="ContenedorGrid" class="row">';
        loopHTML += '<div id="grid_' + i + '" data-role="grid" class="k-grid k-widget">';
        loopHTML += '</div>';
        loopHTML += '</div>';
        loopHTML += '</div>';

        loopHTML += '<div class="row">';
        loopHTML += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">';
        loopHTML += '<label>&nbsp;</label>';
        loopHTML += '</div>';
        loopHTML += '</div>';

        loopHTML += '';
        loopHTML += '';
        loopHTML += '</div>';

    }

    
    $("#contenedor_master").append(loopHTML);

    for (var i = 0; i < currentSpoolMaster.DetalleSalidas.length; i++) {
        $('#inputSalidas_' + i).kendoNumericTextBox({
            format: "###",
            value: currentSpoolMaster.DetalleSalidas[i].SalidasEstandar.length
        });

        $('#inputJuntasCerradas_' + i).kendoNumericTextBox({
            format: "###",
            value: currentSpoolMaster.DetalleSalidas[i].SalidasJuntasCerradas.length
        });

        CargarGridDynamic(i);
    }

    RenderGridRowsDynamic();
}

function reCalculaReglas() {
    //RevisionCliente: 0,
    //RevisionSteelgo: '',
    //Acero: '',
    //Especificacion: '',
    //PDI: 0.0,
    //SistemaPintura: '',
    //ColorPintura: '

    $("#labelRevisionCliente2").text("" + currentSpoolMaster.RevisionCliente);
    $("#labelRevision2").text(currentSpoolMaster.RevisionSteelgo);
    $("#labelAcero2").text(currentSpoolMaster.Acero);
    $("#labelEspecificacion2").text(currentSpoolMaster.Especificacion);
    $("#labelPDI2").text(currentSpoolMaster.PDI);
    $("#labelSistemaPintura2").text(currentSpoolMaster.SistemaPintura);
    $("#labelColorPintura").text(currentSpoolMaster.ColorPintura);
}

function nombreLoop() {
    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
        iframe: true,
        title:'Busqueda de Loop',
        visible: false, //the window will not appear before its .open method is called
        width: "auto",
        height: "auto",
        modal: true,
        animation: {
            close: false,
            open: false
        }
    }).data("kendoWindow");

    ventanaConfirm.content("<label>Nombre del Loop: </label>" + "<input type='text' style='width:120px' value='Escribe un nombre'/>" +
                "</br></br><center><button class='btn btn-blue' id='yesButton'>Aceptar</button></center>");

    ventanaConfirm.open().center();

    $("#yesButton").click(function () {
        //$("#gridPopUp").data("kendoGrid").dataSource._data[i].ListaDetalleDefectos = listaDetalleDefectos;
        //hayDatosCapturados = true;
        ventanaConfirm.close();
        //$("#windowGridDefectos").data("kendoWindow").close();
    });
    $("#noButton").click(function () {
        ventanaConfirm.close();
        //return false;
    });
}
function suscribirEventoDetallePlaca() {

    $(document).on('click', '.EnlacePorPlaca', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            LlenarGridPopUpDetallePlaca(dataItem);
        }
    });
}

function suscribirEventoDetalleDefectoPorPlaca() {

    $(document).on('click', '.EnlaceDefectoPorPlaca', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#gridPopUp").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            $("#PlacaID").text(dataItem.OrdenTrabajoID + "°" + dataItem.SpoolID + "°" + dataItem.JuntaSpoolID + "°" + dataItem.Ubicacion + "°" + dataItem.Posicion);
            //OrdenTrabajoID+SpoolID+JuntaSpoolID+Ubicacion+Posicion
            LlenarGridPopUpDetalleDefectoPorPlaca(dataItem);
        }
    });
}


function suscribirEventoGuardar() {

    $('#GuardarPlacas').click(function (e) {
        //var ds = $("#gridPopUp").data("kendoGrid").dataSource;

        
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida == idSelect) {
                $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta = EtiquetaSelect;
                $("#grid").data("kendoGrid").dataSource._data[i].Material = ICSelect;//$("#gridPopUp").data("kendoGrid").dataSource._data.length;
                $("#grid").data("kendoGrid").refresh();
                break;
            }
        }
        

        var window = $("#windowGrid");

        $("#windowGrid").data("kendoWindow").close();

        //actualizaGridGeneralPorPlaca();
        //if (actualizaGridGeneralPorPlaca())
        //    $("#windowGrid").data("kendoWindow").close();
    });

    $('#GuardarDefectos').click(function (e) {
        var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
        var window = $("#windowGridDefectos");

        actualizaGridGeneralPorDefectos();//if (actualizaGridGeneralPorDefectos())
        //    $("#windowGridDefectos").data("kendoWindow").close();
    });

    $('#CancelarPlacas').click(function (e) {
        $("#windowGrid").data("kendoWindow").close();
    });

    $('#CancelarDefectos').click(function (e) {
        $("#windowGridDefectos").data("kendoWindow").close();
    });


    //GuardarYNuevo
    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        //alert('1');

        if (infoGridTemp != null)
            if ($("#grid").data("kendoGrid").dataSource._data.length != infoGridTemp.length)
                $("#grid").data("kendoGrid").dataSource._data = infoGridTemp;

        if (validarReglasDeLlenado()) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data, true);
        }
    });

    //Guardar
    $("#Guardar, #btnGuardar, #Guardar1, #btnGuardar1").click(function (e) {
        //alert('2');

        if (infoGridTemp != null)
            if ($("#grid").data("kendoGrid").dataSource._data.length != infoGridTemp.length)
                $("#grid").data("kendoGrid").dataSource._data = infoGridTemp;

        if (validarReglasDeLlenado()) {
            if ($("#Guardar").text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                AjaxGuardarCaptura(ds._data, false);
            } else if ($("#Guardar").text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                disableEnableView(false);
            }
        }
    });

    $('#btnAgregar').click(function (e) {
        //alert('xD');
        //VentanaModalDetallePlaca();

        //var contextMenu = $("#context-menu").kendoContextMenu().data("kendoContextMenu");
        //contextMenu.open();

        var data = [{ NumeroSalida: 'S1', TipoSalidaSelect: '', TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "Item Code" }, { SalidaID: "3", Titulo: "Frontera" }], Etiqueta: '0', Material: '', Spool_ICSelect: '', Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 1, Titulo: 's5-k1113-07-1' }, { ID: 2, Titulo: 's5-k1113-08-1' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }, { ID: 6, Titulo: 'Tubo' }], JuntaSelect: '', Juntas: [{ JuntaID: 1, Junta: 'FW15' }, { JuntaID: 2, Junta: 'FW12' }, { JuntaID: 3, Junta: 'FW10' }], TipoJunta: '', Cedula: '', Acero1: '', Acero2: '', Diametro: '', Nivel: 0, ListaDetalleItemCode: [], TipoCorte1Select: '', TipoCorte1: [{ TipoCorte1ID: "1", Titulo: "Corte 12" }, { TipoCorte1ID: "2", Titulo: "Corte 33" }], TipoCorte2Select: '', TipoCorte2: [{ TipoCorte2ID: "1", Titulo: "Corte 12" }, { TipoCorte2ID: "2", Titulo: "Corte 33" }], Cantidad: 0 }
         , { NumeroSalida: 'S2', TipoSalidaSelect: '', TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "Item Code" }, { SalidaID: "3", Titulo: "Frontera" }], Etiqueta: '0', Material: '', Spool_ICSelect: '', Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 1, Titulo: 's5-k1113-07-1' }, { ID: 2, Titulo: 's5-k1113-08-1' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }, { ID: 6, Titulo: 'Tubo' }], JuntaSelect: '', Juntas: [{ JuntaID: 1, Junta: 'FW15' }, { JuntaID: 2, Junta: 'FW12' }, { JuntaID: 3, Junta: 'FW10' }], TipoJunta: '', Cedula: '', Acero1: '', Acero2: '', Diametro: '', Nivel: 0, ListaDetalleItemCode: [], TipoCorte1Select: '', TipoCorte1: [{ TipoCorte1ID: "1", Titulo: "Corte 12" }, { TipoCorte1ID: "2", Titulo: "Corte 33" }], TipoCorte2Select: '', TipoCorte2: [{ TipoCorte2ID: "1", Titulo: "Corte 122" }, { TipoCorte2ID: "2", Titulo: "Corte 98" }], Cantidad: 0 }
         , { NumeroSalida: 'S3', TipoSalidaSelect: '', TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "Item Code" }, { SalidaID: "3", Titulo: "Frontera" }], Etiqueta: '0', Material: '', Spool_ICSelect: '', Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 2, Titulo: 'TPAQZAAA' }, { ID: 3, Titulo: 'TPAQZBBB' }, { ID: 4, Titulo: 'TPAQZCCC' }, { ID: 5, Titulo: 'Tubo' }], JuntaSelect: '', Juntas: [{ JuntaID: 2, Junta: 'FW12' }, { JuntaID: 3, Junta: 'FW10' }], TipoJunta: '', Cedula: '', Acero1: '', Acero2: '', Diametro: '', Nivel: 0, ListaDetalleItemCode: [], TipoCorte1Select: '', TipoCorte1: [{ TipoCorte1ID: "1", Titulo: "Corte 12" }, { TipoCorte1ID: "2", Titulo: "Corte 33" }], TipoCorte2Select: '', TipoCorte2: [{ TipoCorte2ID: "1", Titulo: "Corte 12" }, { TipoCorte2ID: "2", Titulo: "Corte 87" }], Cantidad: 0 }
         , { NumeroSalida: 'JC1', TipoSalidaSelect: '', TipoSalida: [{ SalidaID: "1", Titulo: "Soporte" }, { SalidaID: "2", Titulo: "Item Code" }], Etiqueta: '0', Material: '', Spool_ICSelect: '', Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 2, Titulo: 'RE-02-20' }, { ID: 3, Titulo: 'GU-01-20' }, { ID: 4, Titulo: 'RE-04-40' }], JuntaSelect: '', Juntas: [{ JuntaID: 5, Junta: 'BQ-09' }, { JuntaID: 6, Junta: 'BQ-10' }], TipoJunta: '', Cedula: '', Acero1: '', Acero2: '', Diametro: '', Nivel: 0, ListaDetalleItemCode: [{ ItemCode: '1EE', D1: '345', D2: '567', Descipcion: 'Des MT 65' }], TipoCorte1Select: '', TipoCorte1: [{ TipoCorte1ID: "1", Titulo: "Corte 12" }, { TipoCorte1ID: "2", Titulo: "Corte 33" }], TipoCorte2Select: '', TipoCorte2: [{ TipoCorte2ID: "1", Titulo: "Corte 12" }, { TipoCorte2ID: "2", Titulo: "Corte 65" }], Cantidad: 0 }
         , { NumeroSalida: 'JC2', TipoSalidaSelect: '', TipoSalida: [{ SalidaID: "1", Titulo: "Soporte" }, { SalidaID: "2", Titulo: "Item Code" }], Etiqueta: '0', Material: '', Spool_ICSelect: '', Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 3, Titulo: 'GU-01-20' }, { ID: 4, Titulo: 'RE-04-40' }], JuntaSelect: '', Juntas: [{ JuntaID: 6, Junta: 'BQ-10' }], TipoJunta: '', Cedula: '', Acero1: '', Acero2: '', Diametro: '', Nivel: 0, ListaDetalleItemCode: [{ ItemCode: '1EE', D1: '345', D2: '567', Descipcion: 'Des MT 65' }], TipoCorte1Select: '', TipoCorte1: [{ TipoCorte1ID: "1", Titulo: "Corte 12" }, { TipoCorte1ID: "2", Titulo: "Corte 33" }], TipoCorte2Select: '', TipoCorte2: [{ TipoCorte2ID: "1", Titulo: "Corte 12" }, { TipoCorte2ID: "2", Titulo: "Corte 876" }], Cantidad: 0 }
        ];

        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        for (var i = 0; i < data.length; i++) {
            ds.add(data[i]);
        }


        //var hacerAjax = false;

        //if ($('input:radio[name=Muestra]:checked').val() == "SinCaptura") {
        //    filtraDatosCapturados($('input:radio[name=Muestra]:checked').val());
        //}
        //else if ($('input:radio[name=Muestra]:checked').val() == "Todos") {
        //    if ((llamadasATodos >= 1) || (infoGridTemp == null)) {
        //        if (hayDatosCapturados) {
        //            //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
        //            //    hacerAjax = true;
        //            //}

        //            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
        //                iframe: true,
        //                title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
        //                visible: false, //the window will not appear before its .open method is called
        //                width: "auto",
        //                height: "auto",
        //                modal: true,
        //                animation: {
        //                    close: false,
        //                    open: false
        //                }
        //            }).data("kendoWindow");

        //            ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
        //                        "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        //            ventanaConfirm.open().center();

        //            $("#yesButton").click(function () {
        //                ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        //                infoGridTemp = null;
        //                llamadasATodos = 0;

        //                hayDatosCapturados = false;
        //                ventanaConfirm.close();

        //            });
        //            $("#noButton").click(function () {
        //                //$('#inputProyecto').data("kendoComboBox").value(previousCurrentItem);
        //                llamadasATodos++;
        //                ventanaConfirm.close();
        //            });

        //        }
        //        else
        //            hacerAjax = true;

        //        if (hacerAjax) {
        //            ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        //            infoGridTemp = null;
        //            llamadasATodos = 0;
        //            hayDatosCapturados = false;
        //        }
        //        //else {
        //        //    llamadasATodos++;
        //        //    filtraDatosCapturados($('input:radio[name=Muestra]:checked').val());
        //        //}
        //    }
        //    else {//Filtra los capturados
        //        filtraDatosCapturados($('input:radio[name=Muestra]:checked').val());
        //        llamadasATodos++;
        //    }
        //}

    });

    $('#btnAgregar2').click(function (e) {
        //alert('xD');
        var data = [{ NumeroSalida: 'S1', TipoSalidaSelect: '', TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "IC" }, { SalidaID: "3", Titulo: "Frontera" }], Materiales: '0', Spool_ICSelect: '', Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 2, Titulo: 's5-k1113-08-1' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }], JuntaSelect: '', Juntas: [{ JuntaID: 1, Junta: 'FW17' }, { JuntaID: 2, Junta: 'FW18' }, { JuntaID: 3, Junta: 'FW19' }], TipoJunta: '', Cedula: '', Acero1: '', Acero2: '', Diametro: '' }];
        $("#grid2").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid2").data("kendoGrid").dataSource;
        for (var i = 0; i < data.length; i++) {
            ds.add(data[i]);
        }
    });

    $('#btnAgregar3').click(function (e) {
        //alert('xD');
        var data = [{ NumeroSalida: 'S1', TipoSalidaSelect: '', TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "IC" }, { SalidaID: "3", Titulo: "Frontera" }], Materiales: '0', Spool_ICSelect: '', Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }], JuntaSelect: '', Juntas: [{ JuntaID: 2, Junta: 'FW18' }, { JuntaID: 3, Junta: 'FW19' }], TipoJunta: '', Cedula: '', Acero1: '', Acero2: '', Diametro: '' }];
        $("#grid3").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid3").data("kendoGrid").dataSource;
        for (var i = 0; i < data.length; i++) {
            ds.add(data[i]);
        }
    });

}

function suscribirEventoProyecto() {
    
    //$('#inputProyecto').kendoComboBox({
    //    dataTextField: "Nombre",
    //    dataValueField: "ProyectoID",
    //    suggest: true,
    //    filter: "contains",
    //    index: 3,
    //    change: function (e) { }
    //});

    //$('#inputProyecto').kendoComboBox({
    //    dataTextField: "Nombre",
    //    dataValueField: "ProyectoID",
    //    suggest: true,
    //    filter: "contains",
    //    index: 3,
    //    change: function (e) {
    //        dataItem = this.dataItem(e.sender.selectedIndex);
    //        if (dataItem != undefined) {
    //            var hacerAjax = false;
    //            if (hayDatosCapturados) {
    //                //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
    //                //    hacerAjax = true;
    //                //    hayDatosCapturados = false;
    //                //}

    //                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
    //                    iframe: true,
    //                    title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
    //                    visible: false, //the window will not appear before its .open method is called
    //                    width: "auto",
    //                    height: "auto",
    //                    modal: true,
    //                    animation: {
    //                        close: false,
    //                        open: false
    //                    }
    //                }).data("kendoWindow");

    //                ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
    //                            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

    //                ventanaConfirm.open().center();

    //                $("#yesButton").click(function () {
    //                    $("#grid").data('kendoGrid').dataSource.data([]);
    //                    AjaxProveedor(dataItem.ProyectoID, dataItem.PatioID);

    //                    $("#inputRequisicion").data("kendoComboBox").value("");
    //                    $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
    //                    $("#inputFuente").data("kendoComboBox").value("");
    //                    $("#inputTurno").data("kendoComboBox").value("");
    //                    hayDatosCapturados = false;
    //                    ventanaConfirm.close();

    //                });
    //                $("#noButton").click(function () {
    //                    $('#inputProyecto').data("kendoComboBox").value(previousCurrentItem);
    //                    ventanaConfirm.close();
    //                });

    //            }
    //            else
    //                hacerAjax = true;

    //            if (hacerAjax) {
    //                $("#grid").data('kendoGrid').dataSource.data([]);
    //                AjaxProveedor(dataItem.ProyectoID, dataItem.PatioID);

    //                $("#inputRequisicion").data("kendoComboBox").value("");
    //                $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
    //                $("#inputFuente").data("kendoComboBox").value("");
    //                $("#inputTurno").data("kendoComboBox").value("");
    //            }
    //            //else
    //            //    $('#inputProyecto').data("kendoComboBox").value(previousCurrentItem);
    //        }
    //    }
    //});

    //$("#inputProyecto").data("kendoComboBox").input.on("focus", function () {
    //    previousCurrentItem = this.value;
    //});

}

function suscribirEventoProveedor() {
    $('#inputProveedor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var hacerAjax = false;
                if (hayDatosCapturados) {
                    //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
                    //    hacerAjax = true;
                    //    hayDatosCapturados = false;
                    //}
                    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                        iframe: true,
                        title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                        visible: false, //the window will not appear before its .open method is called
                        width: "auto",
                        height: "auto",
                        modal: true,
                        animation: {
                            close: false,
                            open: false
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        $("#grid").data('kendoGrid').dataSource.data([]);
                        AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), dataItem.ProveedorID);

                        //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                        $("#inputFuente").data("kendoComboBox").value("");
                        $("#inputTurno").data("kendoComboBox").value("");

                        hayDatosCapturados = false;
                        ventanaConfirm.close();

                    });
                    $("#noButton").click(function () {
                        $('#inputProveedor').data("kendoComboBox").value(previousCurrentItem);
                        ventanaConfirm.close();
                    });

                }
                else
                    hacerAjax = true;

                if (hacerAjax) {
                    $("#grid").data('kendoGrid').dataSource.data([]);
                    AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), dataItem.ProveedorID);

                    //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                    $("#inputFuente").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").value("");
                }
                //else
                //    $('#inputProveedor').data("kendoComboBox").value(previousCurrentItem);

            }
            //dataItem = this.dataItem(e.sender.selectedIndex);
            //if (dataItem != undefined && dataItem.Nombre != "") {
            //    AjaxComboRequisicion($("#inputProveedor").data("kendoComboBox").value());
            //}
            //else {
            //    $("#inputProveedor").data("kendoComboBox").value("");
            //}
            //$("#grid").data('kendoGrid').dataSource.data([]);
            //$("#inputRequisicion").data("kendoComboBox").value("");
            //$("#TipoPrueba").text("");
            //$("#Requisicion").text("");
            //$("#TurnoLaboral").text("");
            //$("#HerramientaPrueba").text("");
        }
    });

    $("#inputProveedor").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });
}

function SuscribirEventoComboPrueba() {

    $('#inputPrueba').kendoNumericTextBox({
        format: "###"
    });

    $('#inputPruebaJuntasCerradas').kendoNumericTextBox({
        format: "###"
    });

    $('#inputPrueba2').kendoNumericTextBox({
        format: "###"
    });

    $('#inputPruebaJuntasCerradas2').kendoNumericTextBox({
        format: "###"
    });

    $('#inputPrueba3').kendoNumericTextBox({
        format: "###"
    });

    $('#inputPruebaJuntasCerradas3').kendoNumericTextBox({
        format: "###"
    });

    //$('inputPrueba[type=text]').blur(function () {
    //    alert('xD');
    //});

    $("#context-menu").kendoContextMenu({
        dataSource:
            [{
                text: "<b>Agregar hijo</b>",
                encoded: false
            }],                              // Allows use of HTML for item text
        select: function (e) {
            //alert(numeroSalidaSelect);

            var listaDetalles = [];
            var itemEncontrado = false;
            //var cont = 0;
            for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {

                

                if (!itemEncontrado) {
                    if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida == numeroSalidaSelect) {
                        listaDetalles[i] = {
                            NumeroSalida: '',
                            TipoSalidaSelect: '',
                            TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "Item Code" }, { SalidaID: "3", Titulo: "Frontera" }],
                            Etiqueta: '0',
                            Material: '',
                            Spool_ICSelect: '',
                            Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 1, Titulo: 's5-k1113-07-1' }, { ID: 2, Titulo: 's5-k1113-08-1' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }],
                            JuntaSelect: '',
                            Juntas: [{ JuntaID: 1, Junta: 'FW15' }, { JuntaID: 2, Junta: 'FW12' }, { JuntaID: 3, Junta: 'FW10' }],
                            TipoJunta: '',
                            Cedula: '',
                            Acero1: '',
                            Acero2: '',
                            Diametro: '',
                            Nivel: 0
                        };
                        listaDetalles[i+1] = {
                            NumeroSalida: '',
                            TipoSalidaSelect: '',
                            TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "Item Code" }, { SalidaID: "3", Titulo: "Frontera" }],
                            Etiqueta: '0',
                            Material: '',
                            Spool_ICSelect: '',
                            Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 1, Titulo: 's5-k1113-07-1' }, { ID: 2, Titulo: 's5-k1113-08-1' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }],
                            JuntaSelect: '',
                            Juntas: [{ JuntaID: 1, Junta: 'FW15' }, { JuntaID: 2, Junta: 'FW12' }, { JuntaID: 3, Junta: 'FW10' }],
                            TipoJunta: '',
                            Cedula: '',
                            Acero1: '',
                            Acero2: '',
                            Diametro: '',
                            Nivel: 0
                        };

                        listaDetalles[i].NumeroSalida = $("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida;
                        listaDetalles[i].TipoSalidaSelect = $("#grid").data("kendoGrid").dataSource._data[i].TipoSalidaSelect;
                        listaDetalles[i].TipoSalida = $("#grid").data("kendoGrid").dataSource._data[i].TipoSalida;
                        listaDetalles[i].Etiqueta = $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta;
                        listaDetalles[i].Material = $("#grid").data("kendoGrid").dataSource._data[i].Material;
                        listaDetalles[i].Spool_ICSelect = $("#grid").data("kendoGrid").dataSource._data[i].Spool_ICSelect;
                        listaDetalles[i].Spool_IC = $("#grid").data("kendoGrid").dataSource._data[i].Spool_IC;
                        listaDetalles[i].JuntaSelect = $("#grid").data("kendoGrid").dataSource._data[i].JuntaSelect;
                        listaDetalles[i].Juntas = $("#grid").data("kendoGrid").dataSource._data[i].Juntas;
                        listaDetalles[i].TipoJunta = $("#grid").data("kendoGrid").dataSource._data[i].TipoJunta;
                        listaDetalles[i].Cedula = $("#grid").data("kendoGrid").dataSource._data[i].Cedula;
                        listaDetalles[i].Acero1 = $("#grid").data("kendoGrid").dataSource._data[i].Acero1;
                        listaDetalles[i].Acero2 = $("#grid").data("kendoGrid").dataSource._data[i].Acero2;
                        listaDetalles[i].Diametro = $("#grid").data("kendoGrid").dataSource._data[i].Diametro;
                        listaDetalles[i].Nivel = $("#grid").data("kendoGrid").dataSource._data[i].Nivel;

                        listaDetalles[i + 1].NumeroSalida = $("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida + '-H' + ($("#grid").data("kendoGrid").dataSource._data[i].Nivel + 1);
                        listaDetalles[i + 1].TipoSalidaSelect = $("#grid").data("kendoGrid").dataSource._data[i].TipoSalidaSelect;
                        listaDetalles[i + 1].TipoSalida = $("#grid").data("kendoGrid").dataSource._data[i].TipoSalida;
                        listaDetalles[i + 1].Etiqueta = $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta;
                        listaDetalles[i + 1].Material = $("#grid").data("kendoGrid").dataSource._data[i].Material;
                        listaDetalles[i + 1].Spool_ICSelect = $("#grid").data("kendoGrid").dataSource._data[i].Spool_ICSelect;
                        listaDetalles[i + 1].Spool_IC = $("#grid").data("kendoGrid").dataSource._data[i].Spool_IC;
                        listaDetalles[i + 1].JuntaSelect = $("#grid").data("kendoGrid").dataSource._data[i].JuntaSelect;
                        listaDetalles[i + 1].Juntas = $("#grid").data("kendoGrid").dataSource._data[i].Juntas;
                        listaDetalles[i + 1].TipoJunta = $("#grid").data("kendoGrid").dataSource._data[i].TipoJunta;
                        listaDetalles[i + 1].Cedula = $("#grid").data("kendoGrid").dataSource._data[i].Cedula;
                        listaDetalles[i + 1].Acero1 = $("#grid").data("kendoGrid").dataSource._data[i].Acero1;
                        listaDetalles[i + 1].Acero2 = $("#grid").data("kendoGrid").dataSource._data[i].Acero2;
                        listaDetalles[i + 1].Diametro = $("#grid").data("kendoGrid").dataSource._data[i].Diametro;
                        listaDetalles[i + 1].Nivel = ($("#grid").data("kendoGrid").dataSource._data[i].Nivel + 1);

                        itemEncontrado = true;
                    }
                    else {
                        listaDetalles[i] = {
                            NumeroSalida: '',
                            TipoSalidaSelect: '',
                            TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "Item Code" }, { SalidaID: "3", Titulo: "Frontera" }],
                            Etiqueta: '0',
                            Material: '',
                            Spool_ICSelect: '',
                            Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 1, Titulo: 's5-k1113-07-1' }, { ID: 2, Titulo: 's5-k1113-08-1' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }],
                            JuntaSelect: '',
                            Juntas: [{ JuntaID: 1, Junta: 'FW15' }, { JuntaID: 2, Junta: 'FW12' }, { JuntaID: 3, Junta: 'FW10' }],
                            TipoJunta: '',
                            Cedula: '',
                            Acero1: '',
                            Acero2: '',
                            Diametro: '',
                            Nivel: 0
                        };

                        listaDetalles[i].NumeroSalida= $("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida;
                        listaDetalles[i].TipoSalidaSelect= $("#grid").data("kendoGrid").dataSource._data[i].TipoSalidaSelect;
                        listaDetalles[i].TipoSalida= $("#grid").data("kendoGrid").dataSource._data[i].TipoSalida;
                        listaDetalles[i].Etiqueta= $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta;
                        listaDetalles[i].Material= $("#grid").data("kendoGrid").dataSource._data[i].Material;
                        listaDetalles[i].Spool_ICSelect= $("#grid").data("kendoGrid").dataSource._data[i].Spool_ICSelect;
                        listaDetalles[i].Spool_IC= $("#grid").data("kendoGrid").dataSource._data[i].Spool_IC;
                        listaDetalles[i].JuntaSelect= $("#grid").data("kendoGrid").dataSource._data[i].JuntaSelect;
                        listaDetalles[i].Juntas= $("#grid").data("kendoGrid").dataSource._data[i].Juntas;
                        listaDetalles[i].TipoJunta= $("#grid").data("kendoGrid").dataSource._data[i].TipoJunta;
                        listaDetalles[i].Cedula= $("#grid").data("kendoGrid").dataSource._data[i].Cedula;
                        listaDetalles[i].Acero1= $("#grid").data("kendoGrid").dataSource._data[i].Acero1;
                        listaDetalles[i].Acero2= $("#grid").data("kendoGrid").dataSource._data[i].Acero2;
                        listaDetalles[i].Diametro= $("#grid").data("kendoGrid").dataSource._data[i].Diametro;
                        listaDetalles[i].Nivel = $("#grid").data("kendoGrid").dataSource._data[i].Nivel;
                    }
                    
                }
                else {
                    listaDetalles[i + 1] = {
                        NumeroSalida: '',
                        TipoSalidaSelect: '',
                        TipoSalida: [{ SalidaID: "1", Titulo: "Spool" }, { SalidaID: "2", Titulo: "Item Code" }, { SalidaID: "3", Titulo: "Frontera" }],
                        Etiqueta: '0',
                        Material: '',
                        Spool_ICSelect: '',
                        Spool_IC: [{ ID: 0, Titulo: 'Sin Definir' }, { ID: 1, Titulo: 's5-k1113-07-1' }, { ID: 2, Titulo: 's5-k1113-08-1' }, { ID: 3, Titulo: 's5-k1113-09-1' }, { ID: 4, Titulo: 's5-k1113-10-1' }, { ID: 5, Titulo: 's5-k1113-01-1' }],
                        JuntaSelect: '',
                        Juntas: [{ JuntaID: 1, Junta: 'FW15' }, { JuntaID: 2, Junta: 'FW12' }, { JuntaID: 3, Junta: 'FW10' }],
                        TipoJunta: '',
                        Cedula: '',
                        Acero1: '',
                        Acero2: '',
                        Diametro: '',
                        Nivel: 0
                    };

                    listaDetalles[i + 1].NumeroSalida = $("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida;
                    listaDetalles[i + 1].TipoSalidaSelect = $("#grid").data("kendoGrid").dataSource._data[i].TipoSalidaSelect;
                    listaDetalles[i + 1].TipoSalida = $("#grid").data("kendoGrid").dataSource._data[i].TipoSalida;
                    listaDetalles[i + 1].Etiqueta = $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta;
                    listaDetalles[i + 1].Material = $("#grid").data("kendoGrid").dataSource._data[i].Material;
                    listaDetalles[i + 1].Spool_ICSelect = $("#grid").data("kendoGrid").dataSource._data[i].Spool_ICSelect;
                    listaDetalles[i + 1].Spool_IC = $("#grid").data("kendoGrid").dataSource._data[i].Spool_IC;
                    listaDetalles[i + 1].JuntaSelect = $("#grid").data("kendoGrid").dataSource._data[i].JuntaSelect;
                    listaDetalles[i + 1].Juntas = $("#grid").data("kendoGrid").dataSource._data[i].Juntas;
                    listaDetalles[i + 1].TipoJunta = $("#grid").data("kendoGrid").dataSource._data[i].TipoJunta;
                    listaDetalles[i + 1].Cedula = $("#grid").data("kendoGrid").dataSource._data[i].Cedula;
                    listaDetalles[i + 1].Acero1 = $("#grid").data("kendoGrid").dataSource._data[i].Acero1;
                    listaDetalles[i + 1].Acero2 = $("#grid").data("kendoGrid").dataSource._data[i].Acero2;
                    listaDetalles[i + 1].Diametro = $("#grid").data("kendoGrid").dataSource._data[i].Diametro;
                    listaDetalles[i + 1].Nivel = $("#grid").data("kendoGrid").dataSource._data[i].Nivel;
                }
                

                
                

                //if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida == idSelect) {
                //    $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta = (i + 1);//EtiquetaSelect;
                //    $("#grid").data("kendoGrid").dataSource._data[i].Material = ICSelect;//$("#gridPopUp").data("kendoGrid").dataSource._data.length;
                //    $("#grid").data("kendoGrid").refresh();
                //    break;
                //}

            }

            $("#grid").data('kendoGrid').dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            for (var i = 0; i < listaDetalles.length; i++) {
                ds.add(listaDetalles[i]);
            }
        }
    });

    $('#inputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    });

    
    $('inputNombreLoop[type=text]').blur(function () {
        alert('Busca');
    });

    $('#inputRevisionCliente').kendoComboBox({
        dataTextField: "Proyecto",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {

        }
    });
    

    //$("#inputPrueba").input.on("focus", function () {
        
    //});

    //$('#inputPrueba').kendoComboBox({
    //    dataTextField: "Nombre",
    //    dataValueField: "TipoPruebaID",
    //    suggest: true,
    //    filter: "contains",
    //    index: 3,
    //    change: function (e) {
    //        dataItem = this.dataItem(e.sender.selectedIndex);
    //        if (dataItem != undefined) {
    //            var hacerAjax = false;
    //            if (hayDatosCapturados) {
    //                //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
    //                //    hacerAjax = true;
    //                //    hayDatosCapturados = false;
    //                //}
    //                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
    //                    iframe: true,
    //                    title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
    //                    visible: false, //the window will not appear before its .open method is called
    //                    width: "auto",
    //                    height: "auto",
    //                    modal: true,
    //                    animation: {
    //                        close: false,
    //                        open: false
    //                    }
    //                }).data("kendoWindow");

    //                ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
    //                            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

    //                ventanaConfirm.open().center();

    //                $("#yesButton").click(function () {
    //                    $("#grid").data('kendoGrid').dataSource.data([]);

    //                    //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
    //                    $("#inputFuente").data("kendoComboBox").value("");
    //                    $("#inputTurno").data("kendoComboBox").value("");

    //                    hayDatosCapturados = false;
    //                    ventanaConfirm.close();

    //                });
    //                $("#noButton").click(function () {
    //                    $('#inputPrueba').data("kendoComboBox").value(previousCurrentItem);
    //                    ventanaConfirm.close();
    //                });

    //            }
    //            else
    //                hacerAjax = true;

    //            if (hacerAjax) {
    //                $("#grid").data('kendoGrid').dataSource.data([]);

    //                //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
    //                $("#inputFuente").data("kendoComboBox").value("");
    //                $("#inputTurno").data("kendoComboBox").value("");
    //            }
    //            //else
    //            //    $('#inputPrueba').data("kendoComboBox").value(previousCurrentItem);
    //        }
    //    }
    //});

    //$("#inputPrueba").data("kendoComboBox").input.on("focus", function () {
    //    previousCurrentItem = this.value;
    //});
};

function suscribirEventoChangeRadioTipo() {

    $('input:radio[name=Muestra]:nth(0)').change(function () {

    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {

    });
}

function suscribirEventoRequisicion() {
    $('#inputRequisicion').kendoComboBox({
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var hacerAjax = false;
                if (hayDatosCapturados) {
                    //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
                    //    hacerAjax = true;
                    //    hayDatosCapturados = false;
                    //}
                    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                        iframe: true,
                        title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                        visible: false, //the window will not appear before its .open method is called
                        width: "auto",
                        height: "auto",
                        modal: true,
                        animation: {
                            close: false,
                            open: false
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        $("#grid").data('kendoGrid').dataSource.data([]);

                        //$("#grid").data('kendoGrid').dataSource.data([]);
                        $("#inputFuente").data("kendoComboBox").value(dataItem.FuenteID);
                        $("#inputTurno").data("kendoComboBox").value(dataItem.TurnoID);
                        $("#inputPrueba").data("kendoComboBox").value(dataItem.TipoPruebaID);

                        hayDatosCapturados = false;
                        ventanaConfirm.close();

                    });
                    $("#noButton").click(function () {
                        $('#inputPrueba').data("kendoComboBox").value(previousCurrentItem);
                        ventanaConfirm.close();
                    });
                }
                else
                    hacerAjax = true;

                if (hacerAjax) {
                    $("#grid").data('kendoGrid').dataSource.data([]);

                    //$("#grid").data('kendoGrid').dataSource.data([]);
                    $("#inputFuente").data("kendoComboBox").value(dataItem.FuenteID);
                    $("#inputTurno").data("kendoComboBox").value(dataItem.TurnoID);
                    $("#inputPrueba").data("kendoComboBox").value(dataItem.TipoPruebaID);
                }
                //else
                //    $('#inputRequisicion').data("kendoComboBox").value(previousCurrentItem);


                //ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
            }

            //if (dataItem != undefined && dataItem.Folio != "") {
            //    AjaxRequisicionDetalle($("#inputRequisicion").data("kendoComboBox").value());
            //}
            //else {
            //    $("#inputRequisicion").data("kendoComboBox").value("");

            //}
            //$("#grid").data('kendoGrid').dataSource.data([]);
            //$("#TipoPrueba").text("");
            //$("#Requisicion").text("");
            //$("#TurnoLaboral").text("");
            //$("#HerramientaPrueba").text("");
        }
    });

    $("#inputRequisicion").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });
}

function suscribirEventoFuente() {
    $('#inputFuente').kendoComboBox({
        dataTextField: "NombreEquipo",
        dataValueField: "EquipoID",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

function suscribirEventTurno() {
    $('#inputTurno').kendoComboBox({
        dataTextField: "Turno",
        dataValueField: "TurnoLaboralID",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

var currentUsuarioProveedor = null;
function suscribirUsuarioVR() {
    $('#inputUsuarioVR').kendoComboBox({
        dataTextField: "Accion",
        dataValueField: "AccionID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                //alert("Resp: " + dataItem.AccionID);
                if (dataItem.AccionID == 2) {
                    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                        iframe: true,
                        title: _dictionary.lblVentanaVRLogin[$("#language").data("kendoDropDownList").value()],
                        visible: false, //the window will not appear before its .open method is called
                        width: "auto",
                        height: "auto",
                        modal: true,
                        animation: {
                            close: false,
                            open: false
                        }
                    }).data("kendoWindow");

                    //ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                    //            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");
                    ventanaConfirm.content('<div id="ventanaConfirm" z-index: inherit">' +
                        '<div class="col-sm-11 col-md-11 col-lg-11">' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblUsuarioVRLogin[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="ProveedorLogin" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<label id=""><span>' + _dictionary.lblContraseniaVRLogin[$("#language").data("kendoDropDownList").value()] + '</span></label>' +
                                '<input id="PasswordLogin" type="password" class="form-control" />' +
                            '</div>' +
                            '<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                                '<center><button class="btn btn-blue" id="yesButton"> Aceptar</button>&nbsp;<button class="btn btn-blue" id="noButton"> Cancelar</button></center>' +
                            '</div>' +
                        '</div>' +
                    '</div>');

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        var User = $('#ProveedorLogin').val();
                        var Pass = $('#PasswordLogin').val();

                        var proveedorID = $('#inputProveedor').data("kendoComboBox").value();
                        var proyectoID = $("#inputProyecto").data("kendoComboBox").value();

                        loadingStart();

                        $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProveedorID: proveedorID, ProyectoID: proyectoID, NombreProveedor: User, Password: Pass }).done(function (data) {
                            if (Error(data)) {
                                //$("#inputProveedor").data("kendoComboBox").dataSource.data(data);

                                if (data.length >= 1) {
                                    //    $("#inputProveedor").data("kendoComboBox").select(1);
                                    //    $("#inputProveedor").data("kendoComboBox").trigger("change");
                                    $('#proveedorContainerDiv').show();

                                    currentUsuarioProveedor = data[0];

                                    $('#lblProveedorVRValue').text(data[0].Nombre);

                                    displayNotify("NotificacionDeficit0006", "", '0');
                                }
                                else {
                                    $('#proveedorContainerDiv').hide();
                                    //$('#usuarioContainerDiv').hide();

                                    //$('#lblUsuarioVRValue').text("");
                                    $('#lblProveedorVRValue').text("");

                                    //$('input[name="Revision"]').prop('checked', false);
                                    currentUsuarioProveedor = null;
                                    $("#inputUsuarioVR").data("kendoComboBox").select(0);
                                    displayNotify("loginLabel0010", "", '2');
                                }
                            }
                            loadingStop();
                            ventanaConfirm.close();
                        });
                    });
                    $("#noButton").click(function () {
                        $('#proveedorContainerDiv').hide();
                        $('#lblProveedorVRValue').text("");

                        currentUsuarioProveedor = null;
                        $("#inputUsuarioVR").data("kendoComboBox").select(0);

                        ventanaConfirm.close();
                    });

                }
                else {
                    $('#proveedorContainerDiv').hide();
                    $('#lblProveedorVRValue').text("");
                    currentUsuarioProveedor = null;
                }
            }
        }
    });

    //var data = [{ AccionID: 1, Accion: 'Sin Presencia' }, { AccionID: 2, Accion: 'Con Presencia' }];
    //$("#inputUsuarioVR").data("kendoComboBox").dataSource.data(data);
    //$("#inputUsuarioVR").data("kendoComboBox").select(0);

}


