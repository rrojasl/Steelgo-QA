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
                        if (options.model.Nombre.indexOf('RT') < 0) {
                            options.model.ListaTurnoLaboral = obtenerTurnoLaboralProveedor(options.model, dataItem.ProveedorID);
                        }
                        else {
                            options.model.ListaHerramientaPrueba = obtenerHerramientaPruebaProveedor(options.model, dataItem.ProveedorID);
                        }
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

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    options.model.Capacidad = "";
                    options.model.JuntasAsignadas = "";
                    options.model.JuntasAsignadasOriginal = 0;
                }
                //options.model.Proveedor = ObtenerDescCorrectaProveedor(options.model.ListaProveedor, options.model.ProveedorID);

            },
            dataBound: function () {
                $(this.items()).each(function (index, item) {
                    var model = options.model.ListaProveedor[index];
                    $(item).attr("title", "" + replaceAll(model.Capacidad, '°', '\n') + "");
                });
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

function obtenerTurnoLaboralProveedor(model, ProveedorID) {
    var lista = model.ListaTurnoLaboralTotal;
    var listaFinalTurnoLaboral = [];
    listaFinalTurnoLaboral[0] = { TurnoLaboralID: "", ProveedorID: "", Turno: "", HerramientaDePruebaID: "", TipoPruebaID: "" };
    var cont = 1;
    listaFinalTurnoLaboral[0].TurnoLaboralID = 0;
    listaFinalTurnoLaboral[0].ProveedorID = 0;
    listaFinalTurnoLaboral[0].Turno = "";
    listaFinalTurnoLaboral[0].HerramientaDePruebaID = 0;
    listaFinalTurnoLaboral[0].TipoPruebaID = 0;

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ProveedorID == ProveedorID && lista[i].HerramientaDePruebaID == 0 && model.TipoPruebaID == lista[i].TipoPruebaID) {
            listaFinalTurnoLaboral[cont] = lista[i];
            cont++;
        }
    }

    return listaFinalTurnoLaboral;
}


function obtenerHerramientaPruebaProveedor(model, ProveedorID) {
    var lista = model.ListaHerramientaPruebaTotal;
    var listaFinalherramientaPrueba = [];
    listaFinalherramientaPrueba[0] = { HerramientadePruebaID: "", HerramientadePrueba: "", DescHerramientaPrueba: "", Modelo: "", ProveedorID: "" };
    var cont = 1;
    listaFinalherramientaPrueba[0].HerramientadePruebaID = 0;
    listaFinalherramientaPrueba[0].ProveedorID = 0;
    listaFinalherramientaPrueba[0].HerramientadePrueba = "";
    listaFinalherramientaPrueba[0].DescHerramientaPrueba = 0;
    listaFinalherramientaPrueba[0].Modelo = "";

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ProveedorID == ProveedorID) {
            listaFinalherramientaPrueba[cont] = lista[i];
            cont++;
        }
    }

    return listaFinalherramientaPrueba;
}



function RenderComboBoxHerramientaPrueba(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="HerramientadePrueba" data-value-field="HerramientadePruebaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaHerramientaPrueba,
            template: "<i class=\"fa fa-#=data.HerramientadePrueba.toLowerCase()#\"></i> #=data.HerramientadePrueba#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined && dataItem.HerramientadePrueba != "") {
                    options.model.HerramientadePruebaID = dataItem.HerramientadePruebaID;
                    options.model.HerramientadePrueba = dataItem.HerramientadePrueba;

                    var JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                    setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);
                    setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, options.model.HerramientadePruebaOriginalID);
                }
                else {

                    options.model.HerramientadePruebaID = 0;
                    options.model.HerramientadePrueba = "";
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
            dataBound: function () {
                $(this.items()).each(function (index, item) {
                    var model = options.model.ListaHerramientaPrueba[index];
                    $(item).attr("title", "" + model.DescHerramientaPrueba + ' ' + model.Modelo + "");

                });
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



function RenderComboBoxTurnoLaboral(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Turno" data-value-field="TurnoLaboralID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTurnoLaboral,
            template: "<i class=\"fa fa-#=data.Turno.toLowerCase()#\"></i> #=data.Turno#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined) {
                    if (dataItem.Turno != "") {

                        options.model.TurnoLaboral = dataItem.Turno;
                        options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                        options.model.Capacidad = dataItem.Capacidad;
                        var JuntasAsignadasFinal = dataItem.JuntasAsignadas;
                        JuntasAsignadasFinal = parseInt(JuntasAsignadasFinal) + parseInt(options.model.CantidadJuntas);
                        setListadojuntasAsignadar(options.model.ProveedorID, options.model.TurnoLaboralID, JuntasAsignadasFinal);

                        setJuntasAsignatdas(JuntasAsignadasFinal, options.model.ProveedorID, options.model.TurnoLaboralID, options.model.HerramientadePruebaID);

                        JuntasAsignadasFinal = parseInt(options.model.JuntasAsignadasOriginal) - parseInt(options.model.CantidadJuntas);
                        setListadojuntasAsignadar(options.model.ProveedorOriginalID, options.model.TurnoLaboralOriginalID, JuntasAsignadasFinal);


                        options.model.JuntasAsignadas = parseInt(dataItem.JuntasAsignadas);



                        options.model.TurnoLaboralOriginalID = dataItem.TurnoLaboralID;
                        options.model.ProveedorOriginalID = dataItem.ProveedorID;
                        options.model.HerramientadePruebaOriginalID = dataItem.HerramientaDePruebaID;
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