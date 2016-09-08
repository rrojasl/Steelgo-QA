function RenderComboBoxProveedor(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="ProveedorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaProveedor,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined) {
                    options.model.ProveedorID = dataItem.ProveedorID;
                    options.model.Proveedor = dataItem.Nombre;
                    options.model.ListaTurnoLaboral = [];
                    if (dataItem.Nombre != "") {
                        if (!options.model.RequiereEquipo) {
                            options.model.ListaTurnoLaboral = obtenerTurnoLaboralProveedor(options.model, dataItem.TipoPruebaProveedorID);
                        }
                        else {
                            options.model.ListaEquipos = obtenerProveedorEquipo(options.model, dataItem.TipoPruebaProveedorID);
                        }
                        options.model.TipoPruebaProveedorID = dataItem.TipoPruebaProveedorID;


                    }

                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                    if (!options.model.RequiereEquipo) {
                        setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                        options.model.CapacidadTurnoProveedorID = 0;
                        options.model.CapacidadTurnoProveedorOriginalID = 0;
                    }
                    else {
                        setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoEquipo(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                        options.model.CapacidadTurnoEquipoID = 0;
                        options.model.CapacidadTurnoEquipoOriginalID = 0;
                    }


                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.ListaElementosAsignadosTurno = [];

                    if (options.model.Accion == 4)
                        options.model.Accion = 2;

                    
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
                else {

                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                    if (!options.model.RequiereEquipo) {
                        setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                        options.model.CapacidadTurnoProveedorID = 0;
                        options.model.CapacidadTurnoProveedorOriginalID = 0;
                    }
                    else {
                        setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoEquipo(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                        options.model.CapacidadTurnoEquipoID = 0;
                        options.model.CapacidadTurnoEquipoOriginalID = 0;
                    }


                    options.model.ProveedorID = 0;
                    options.model.Proveedor = "";
                    options.model.ListaTurnoLaboral = [];
                    options.model.TipoPruebaProveedorID = 0;

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.JuntasAsignadasOriginal = 0;
                    options.model.ListaElementosAsignadosTurno = [];
                }
                //options.model.Proveedor = ObtenerDescCorrectaProveedor(options.model.ListaProveedor, options.model.ProveedorID);

            }

        }
      );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
};

function obtenerTurnoLaboralProveedor(model, TipoPruebaProveedorID) {
    var lista = model.ListaTurnoLaboralTotal;
    var listaFinalTurnoLaboral = [];
    listaFinalTurnoLaboral[0] = { TurnoLaboralID: "", Nombre: "", TipoPruebaProveedorID: "", CapacidadTurnoProveedorID: "", CapacidadTurnoEquipoID: "" };
    var cont = 1;
    listaFinalTurnoLaboral[0].TurnoLaboralID = 0;
    listaFinalTurnoLaboral[0].TipoPruebaProveedorID = 0;
    listaFinalTurnoLaboral[0].Nombre = "";
    listaFinalTurnoLaboral[0].CapacidadTurnoProveedorID = 0;
    listaFinalTurnoLaboral[0].CapacidadTurnoEquipoID = 0;

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].TipoPruebaProveedorID == TipoPruebaProveedorID && lista[i].CapacidadTurnoEquipoID == 0) {
            listaFinalTurnoLaboral[cont] = lista[i];
            cont++;
        }
    }

    return listaFinalTurnoLaboral;
}


function obtenerProveedorEquipo(model, TipoPruebaProveedorID) {
    var lista = model.ListaEquiposTotal;
    var listaFinalEquipo = [];
    listaFinalEquipo[0] = { EquipoID: "", Nombre: "", ProveedorEquipoID: "", ProveedorTipoPruebaProveedorIDID: "" };
    var cont = 1;
    listaFinalEquipo[0].EquipoID = 0;
    listaFinalEquipo[0].ProveedorEquipoID = 0;
    listaFinalEquipo[0].Nombre = "";
    listaFinalEquipo[0].TipoPruebaProveedorID = 0;

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].TipoPruebaProveedorID == TipoPruebaProveedorID) {
            listaFinalEquipo[cont] = lista[i];
            cont++;
        }
    }

    return listaFinalEquipo;
}


function obtenerTurnoLaboralEquipo(model, ProveedorEquipoID) {
    var lista = model.ListaTurnoLaboralTotal;
    var listaFinalTurnoLaboral = [];
    listaFinalTurnoLaboral[0] = { TurnoLaboralID: "", Nombre: "", TipoPruebaProveedorID: "", CapacidadTurnoProveedorID: "", CapacidadTurnoEquipoID: "" };
    var cont = 1;
    listaFinalTurnoLaboral[0].TurnoLaboralID = 0;
    listaFinalTurnoLaboral[0].TipoPruebaProveedorID = 0;
    listaFinalTurnoLaboral[0].Nombre = "";
    listaFinalTurnoLaboral[0].CapacidadTurnoProveedorID = 0;
    listaFinalTurnoLaboral[0].CapacidadTurnoEquipoID = 0;

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ProveedorEquipoID == ProveedorEquipoID) {
            listaFinalTurnoLaboral[cont] = lista[i];
            cont++;
        }
    }

    return listaFinalTurnoLaboral;
}

function RenderComboBoxHerramientaPrueba(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="EquipoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaEquipos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined && dataItem.Nombre != "") {

                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                    if (!options.model.RequiereEquipo) {
                        setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                        options.model.CapacidadTurnoProveedorID = 0;
                        options.model.CapacidadTurnoProveedorOriginalID = 0;
                    }
                    else {
                        setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoEquipo(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                        options.model.CapacidadTurnoEquipoID = 0;
                        options.model.CapacidadTurnoEquipoOriginalID = 0;
                    }

                    options.model.EquipoID = dataItem.EquipoID;
                    options.model.Equipo = dataItem.Nombre;
                    options.model.ProveedorEquipoID = dataItem.ProveedorEquipoID;
                    options.model.ListaTurnoLaboral = obtenerTurnoLaboralEquipo(options.model, dataItem.ProveedorEquipoID);
                    options.model.ListaElementosAsignadosTurno = [];
                    
                }
                else {

                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                    if (!options.model.RequiereEquipo) {
                        setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                        options.model.CapacidadTurnoProveedorID = 0;
                        options.model.CapacidadTurnoProveedorOriginalID = 0;
                    }
                    else {
                        setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoEquipo(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                        options.model.CapacidadTurnoEquipoID = 0;
                        options.model.CapacidadTurnoEquipoOriginalID = 0;
                    }

                    options.model.ProveedorEquipoID = 0
                    options.model.EquipoID = 0;
                    options.model.Equipo = "";
                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.JuntasAsignadasOriginal = 0;
                    options.model.ListaElementosAsignadosTurno = [];
                    $("#grid").data("kendoGrid").dataSource.sync();
                }

            },
        }
      );

    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
};



function RenderComboBoxTurnoLaboral(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="TurnoLaboralID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTurnoLaboral,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined) {
                    if (dataItem.Nombre != "") {
                        loadingStart();
                        options.model.TurnoLaboral = dataItem.Nombre;
                        options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                        options.model.Capacidad = dataItem.Capacidad;

                        var JuntasAsignadasFinal = parseInt(dataItem.JuntasAsignadas) + parseInt(options.model.CantidadJuntas);

                        if (!options.model.RequiereEquipo) {
                            options.model.CapacidadTurnoProveedorID = dataItem.CapacidadTurnoProveedorID;
                            options.model.CapacidadTurnoProveedorOriginalID = dataItem.CapacidadTurnoProveedorID;

                            setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorID, JuntasAsignadasFinal);
                            setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, dataItem.CapacidadTurnoProveedorID);
                            generarListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, dataItem.CapacidadTurnoProveedorID);
                        }
                        else {
                            options.model.CapacidadTurnoEquipoID = dataItem.CapacidadTurnoEquipoID;
                            options.model.CapacidadTurnoEquipoOriginalID = dataItem.CapacidadTurnoEquipoID;
                            setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoID, JuntasAsignadasFinal);
                            setJuntasAsignatdasCapacidadTurnoEquipo(options.model.ListaElementosRequisicion, dataItem.CapacidadTurnoEquipoID);
                            generarListadoCorrectoAsignacionEquipo(options.model.ListaElementosAsignadosTurno, dataItem.CapacidadTurnoEquipoID, 1);
                        }
                        
                        options.model.JuntasAsignadas = parseInt(JuntasAsignadasFinal);

                        options.model.TurnoLaboralOriginalID = dataItem.TurnoLaboralID;
                        options.model.ProveedorOriginalID = dataItem.ProveedorID;
                        options.model.EquipoOriginalID = dataItem.EquipoID;
                        options.model.JuntasAsignadasOriginal = JuntasAsignadasFinal;
                        loadingStop();
                    }
                    else {
                        loadingStart();
                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                        if (!options.model.RequiereEquipo) {
                            setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                            setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                            removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                            options.model.CapacidadTurnoProveedorID = 0;
                            options.model.CapacidadTurnoProveedorOriginalID = 0;
                        }
                        else {
                            setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                            setJuntasAsignatdasCapacidadTurnoEquipo(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                            removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                            options.model.CapacidadTurnoEquipoID = 0;
                            options.model.CapacidadTurnoEquipoOriginalID = 0;
                        }
                        

                        options.model.TurnoLaboralID = 0;
                        options.model.TurnoLaboralOriginalID = 0;
                        options.model.ProveedorOriginalID = 0;
                        options.model.TurnoLaboral = "";
                        options.model.Capacidad = "";
                        options.model.JuntasAsignadas = "";
                        options.model.JuntasAsignadasOriginal = 0;
                        options.model.ListaElementosAsignadosTurno = [];
                        loadingStop();
                    }
                }
                else {
                    loadingStart();
                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                    if (!options.model.RequiereEquipo) {
                        setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, options.model.CapacidadTurnoProveedorOriginalID);
                        removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                        options.model.CapacidadTurnoProveedorID = 0;
                        options.model.CapacidadTurnoProveedorOriginalID = 0;
                    }
                    else {
                        setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdasCapacidadTurnoEquipo(JuntasAsignadasFinal, options.model.CapacidadTurnoEquipoOriginalID);
                        removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                        options.model.CapacidadTurnoEquipoID = 0;
                        options.model.CapacidadTurnoEquipoOriginalID = 0;
                    }

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.ListaElementosAsignadosTurno = [];
                    loadingStop();
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        }
      );

    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
};



function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}