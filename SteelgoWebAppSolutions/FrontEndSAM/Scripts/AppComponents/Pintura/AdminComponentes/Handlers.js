﻿function suscribirEventos() {
    suscribirEventoGuardar();
};

function suscribirEventoGuardar() {
    $("#Guardar,#btnGuardar, #GuardarPie, #btnGuardarPie").click(function () {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (ds._data.length>0)
            {
                if (!ValidarValoresRepetidos(ds._data) && !ValoresBlanco(ds._data))
                    alert("exito");
                    //ajaxGuardarCaptura(ds._data, 0);
                else
                {
                    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                        iframe: true,
                        title: _dictionary.TituloPopUpError[$("#language").data("kendoDropDownList").value()],
                        visible: false, //the window will not appear before its .open method is called
                        width: "auto",
                        height: "auto",
                        modal: true,
                        actions: [],
                        animation: {
                            close: false,
                            open: false
                        }
                    }).data("kendoWindow");

                    ventanaConfirm.content(_dictionary.MensajeConfirmacionGuardadoGeneral[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        loadingStart();

                        ArregloGuardado = [];
                        var indice = 0;
                        for (var i = 0; i < ds._data.length; i++) {
                            if (ds._data[i].RowOk == true) {
                                ArregloGuardado[indice] = ds._data[i];
                                indice++;
                            }
                        }

                        if (ArregloGuardado.length > 0) {
                            alert("exito");
                            //ajaxGuardarCaptura(ds._data, 0);
                        }
                        else {
                            loadingStop();
                            displayNotify("AdverteciaExcepcionGuardado", "", '1');
                        }

                        ventanaConfirm.close();
                    });

                    $("#noButton").click(function () {
                        ventanaConfirm.close();
                    });

                }
            }
            else
            {
                displayNotify("AdverteciaExcepcionGuardado", "", '2');
            }
        }
        else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false, "FieldSetView")
        }
    });

    $("#btnGuardarYNuevoPie,#btnGuardarYNuevo").click(function () {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!ValidarValoresRepetidos(ds._data))
                alert("exito");
               // ajaxGuardarCaptura(ds._data, 1);
            else {
                displayNotify("AdverteciaExcepcionGuardado", "", '2');
            }
        }
    });
};


function eliminarCaptura(e) {
    e.preventDefault();
    if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var dataSource = $("#grid").data("kendoGrid").dataSource;

        if (dataItem.Accion == 0 || dataItem.Accion == undefined)
            dataSource.remove(dataItem);
        else
            dataItem.Accion = 3;
        dataSource.sync();
    }
};

function limpiarCaptura(e) {
    e.preventDefault();

    if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        itemToClean.Componente = "";
        itemToClean.Lote = "";
        itemToClean.Cantidad = 0;
        itemToClean.Unidad = "";
        if (itemToClean.Accion == 2)
            itemToClean.Accion = 4;

        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();
    }
};