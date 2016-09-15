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
                editado = true;
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
                    if (options.model.TurnoLaboral != "") {
                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                        if (!options.model.RequiereEquipo) {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                                setJuntasAsignatdasCapacidadTurnoProveedor(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoProveedorOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                                options.model.CapacidadTurnoProveedorID = 0;
                                options.model.CapacidadTurnoProveedorOriginalID = 0;
                            }
                        }
                        else {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                                setJuntasAsignatdasCapacidadTurnoEquipo(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoEquipoOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                                options.model.CapacidadTurnoEquipoID = 0;
                                options.model.CapacidadTurnoEquipoOriginalID = 0;
                            }
                        }
                    }

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Equipo = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.ListaElementosAsignadosTurno = [];

                    if (options.model.Accion == 4)
                        options.model.Accion = 2;


                    $("#grid").data("kendoGrid").dataSource.sync();

                }
                else {

                    if (options.model.TurnoLaboral != "") {
                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                        if (!options.model.RequiereEquipo) {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                                setJuntasAsignatdasCapacidadTurnoProveedor(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoProveedorOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                                options.model.CapacidadTurnoProveedorID = 0;
                                options.model.CapacidadTurnoProveedorOriginalID = 0;
                            }
                        }
                        else {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                                setJuntasAsignatdasCapacidadTurnoEquipo(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoEquipoOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                                options.model.CapacidadTurnoEquipoID = 0;
                                options.model.CapacidadTurnoEquipoOriginalID = 0;
                            }
                        }
                    }


                    options.model.ProveedorID = 0;
                    options.model.Proveedor = "";
                    options.model.ListaTurnoLaboral = [];
                    options.model.TipoPruebaProveedorID = 0;

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Equipo = "";
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

    $('<input required data-text-field="Nombre" data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaEquipos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                editado = true;
                if (dataItem != undefined && dataItem.Nombre != "") {
                    if (options.model.TurnoLaboral != "") {
                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                        if (!options.model.RequiereEquipo) {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                                setJuntasAsignatdasCapacidadTurnoProveedor(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoProveedorOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                                options.model.CapacidadTurnoProveedorID = 0;
                                options.model.CapacidadTurnoProveedorOriginalID = 0;
                            }



                        }
                        else {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                                setJuntasAsignatdasCapacidadTurnoEquipo(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoEquipoOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                                options.model.CapacidadTurnoEquipoID = 0;
                                options.model.CapacidadTurnoEquipoOriginalID = 0;
                            }

                        }
                    }


                    options.model.Equipo = dataItem.Nombre;
                    options.model.ProveedorEquipoID = dataItem.ProveedorEquipoID;
                    options.model.ListaTurnoLaboral = obtenerTurnoLaboralEquipo(options.model, dataItem.ProveedorEquipoID);
                    options.model.ListaElementosAsignadosTurno = [];

                }
                else {
                    if (options.model.TurnoLaboral != "") {
                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                        if (!options.model.RequiereEquipo) {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                                setJuntasAsignatdasCapacidadTurnoProveedor(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoProveedorOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);

                                options.model.CapacidadTurnoProveedorID = 0;
                                options.model.CapacidadTurnoProveedorOriginalID = 0;
                            }


                        }
                        else {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                                setJuntasAsignatdasCapacidadTurnoEquipo(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoEquipoOriginalID);
                                setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
                                options.model.CapacidadTurnoEquipoID = 0;
                                options.model.CapacidadTurnoEquipoOriginalID = 0;
                            }

                        }
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

    $('<input required data-text-field="Nombre" data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTurnoLaboral,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                editado = true;
                if (dataItem != undefined) {
                    if (dataItem.Nombre != "") {
                        loadingStart();


                        var JuntasAsignadasFinal = parseInt(dataItem.JuntasAsignadas) + parseInt(options.model.CantidadJuntas);

                        if (!options.model.RequiereEquipo) {
                            if (options.model.TurnoLaboral != "") {
                                //removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                                setJuntasAsignatdasCapacidadTurnoProveedor(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoProveedorOriginalID);
                            }
                            //options.model.ListaElementosAsignadosTurno = [];
                            //options.model.ListaElementosAsignadosTurno = dataItem.ListaElementosAsignadosTurno;
                            options.model.CapacidadTurnoProveedorID = dataItem.CapacidadTurnoProveedorID;

                            options.model.CapacidadTurnoProveedorOriginalID = dataItem.CapacidadTurnoProveedorID;
                            //setListadojuntasAsignadasCapacidadTurnoProveedor(dataItem.CapacidadTurnoProveedorID, JuntasAsignadasFinal);
                            setJuntasAsignatdasCapacidadTurnoProveedor(JuntasAsignadasFinal, dataItem.CapacidadTurnoProveedorID);
                            //generaListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, dataItem.CapacidadTurnoProveedorID);
                        }
                        else {
                            if (options.model.TurnoLaboral != "") {
                                removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                                setJuntasAsignatdasCapacidadTurnoEquipo(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoEquipoOriginalID);
                            }

                            options.model.ListaElementosAsignadosTurno = [];
                            options.model.ListaElementosAsignadosTurno = dataItem.ListaElementosAsignadosTurno;


                            options.model.CapacidadTurnoEquipoID = dataItem.CapacidadTurnoEquipoID;
                            options.model.CapacidadTurnoEquipoOriginalID = dataItem.CapacidadTurnoEquipoID;
                            setListadojuntasAsignadasCapacidadTurnoEquipo(dataItem.CapacidadTurnoEquipoID, JuntasAsignadasFinal);
                            setJuntasAsignatdasCapacidadTurnoEquipo(JuntasAsignadasFinal, dataItem.CapacidadTurnoEquipoID);
                            generarListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, dataItem.CapacidadTurnoEquipoID);

                        }

                        options.model.TurnoLaboral = dataItem.Nombre;
                        options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                        options.model.Capacidad = dataItem.Capacidad;
                        options.model.JuntasAsignadas = parseInt(JuntasAsignadasFinal);
                        options.model.JuntasAsignadasOriginal = parseInt(JuntasAsignadasFinal);
                        loadingStop();
                    }
                    else {
                        loadingStart();
                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);

                        if (!options.model.RequiereEquipo) {
                            removerListadoCorrectoAsignacionProveedor(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoProveedorOriginalID);
                            setJuntasAsignatdasCapacidadTurnoProveedor(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoProveedorOriginalID);
                            setListadojuntasAsignadasCapacidadTurnoProveedor(options.model.CapacidadTurnoProveedorOriginalID, JuntasAsignadasFinal);
                            options.model.CapacidadTurnoProveedorID = 0;
                            options.model.CapacidadTurnoProveedorOriginalID = 0;
                        }
                        else {

                            removerListadoCorrectoAsignacionEquipo(options.model.ListaElementosRequisicion, options.model.CapacidadTurnoEquipoOriginalID);
                            setJuntasAsignatdasCapacidadTurnoEquipo(parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas), options.model.CapacidadTurnoEquipoOriginalID);
                            setListadojuntasAsignadasCapacidadTurnoEquipo(options.model.CapacidadTurnoEquipoOriginalID, JuntasAsignadasFinal);
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