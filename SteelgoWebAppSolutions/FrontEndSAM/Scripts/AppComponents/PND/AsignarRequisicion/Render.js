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


                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                        setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);
                        setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, options.model.HerramientadePruebaOriginalID);

                    }
                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";

                    if (options.model.Accion == 4)
                        options.model.Accion = 2;

                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                    setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);
                    setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, options.model.HerramientadePruebaOriginalID);
                    options.model.JuntasAsignadasOriginal = 0;
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
                else {
                    options.model.ProveedorID = 0;
                    options.model.Proveedor = "";
                    options.model.ListaTurnoLaboral = [];
                    options.model.TipoPruebaProveedorID = 0;

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.JuntasAsignadasOriginal = 0;
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
    listaFinalTurnoLaboral[0] = { TurnoLaboralID: "",  Nombre: "", TipoPruebaProveedorID: "", CapacidadTurnoProveedorID: "", CapacidadTurnoEquipoID: "" };
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
        if (lista[i].TipoPruebaProveedorID == TipoPruebaProveedorID ) {
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
                    options.model.EquipoID = dataItem.EquipoID;
                    options.model.Equipo = dataItem.Nombre;
                    options.model.ProveedorEquipoID = dataItem.ProveedorEquipoID ;
                    options.model.ListaTurnoLaboral = obtenerTurnoLaboralEquipo(options.model, dataItem.ProveedorEquipoID);

                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                    setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);
                    setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, options.model.HerramientadePruebaOriginalID);
                }
                else {
                    options.model.ProveedorEquipoID = 0
                    options.model.EquipoID = 0;
                    options.model.Equipo = "";
                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.JuntasAsignadasOriginal = 0;
                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                    setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);
                    setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, options.model.HerramientadePruebaOriginalID);

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

                        options.model.TurnoLaboral = dataItem.Nombre;
                        options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                        options.model.Capacidad = dataItem.Capacidad;

                        if (!options.model.RequiereEquipo) {
                            options.model.CapacidadTurnoProveedorID = dataItem.CapacidadTurnoProveedorID;
                        }
                        else {
                            options.model.CapacidadTurnoEquipoID = dataItem.CapacidadTurnoEquipoID;
                        }



                        var JuntasAsignadasFinal = dataItem.JuntasAsignadas;
                        JuntasAsignadasFinal = parseInt(JuntasAsignadasFinal) + parseInt(options.model.CantidadJuntas);
                        setListadojuntasAsignadar(options.model.ProveedorID, options.model.TurnoLaboralID, JuntasAsignadasFinal);

                        setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorID, options.model.TurnoLaboralID, options.model.HerramientadePruebaID);

                        JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                        setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);


                        options.model.JuntasAsignadas = parseInt(dataItem.JuntasAsignadas);



                        options.model.TurnoLaboralOriginalID = dataItem.TurnoLaboralID;
                        options.model.ProveedorOriginalID = dataItem.ProveedorID;
                        options.model.EquipoOriginalID = dataItem.EquipoID;
                        options.model.JuntasAsignadasOriginal = dataItem.JuntasAsignadas;
                    }
                    else {

                        var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                        setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);

                        setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, options.model.HerramientadePruebaOriginalID);
                        options.model.TurnoLaboralID = 0;
                        options.model.TurnoLaboralOriginalID = 0;
                        options.model.ProveedorOriginalID = 0;
                        options.model.TurnoLaboral = "";
                        options.model.Capacidad = "";
                        options.model.JuntasAsignadas = "";
                        options.model.JuntasAsignadasOriginal = 0;
                    }
                }
                else {
                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    var JuntasAsignadasFinal = parseInt(JuntasAsignadasMayor(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, 0)) - parseInt(options.model.CantidadJuntas);
                    setJuntasAsignadas(JuntasAsignadasFinal);
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