var Proyecciones = { "Proyeccion": [] }
var SpoolsEnProyeccion = new Array();
var proyeccionActual;

function changeLanguageCall() {
    SuscribirEventos();
    CargarGridStack();
    
    AjaxObtenerProyectos();
};
 
function CargarGridStack() {

    var options = {
        cell_height: 80,
        vertical_margin: 10
    };

    $('.grid-stack').gridstack(options);

    $("#grid").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true,  
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        TipoProducto: { type: "string", editable: false },
                        FamiliaAcero: { type: "string", editable: false },
                        Acero: { type: "string", editable: false },
                        FibeLine: { type: "string", editable: false },
                        CantidadSpools: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        Area: { type: "number", editable: false },
                        CantidadJuntas: { type: "number", editable: false },
                        Peqs: { type: "number", editable: false }
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
        detailTemplate: kendo.template($("#templateGridNivelDos").html()),
        detailInit: RenderGridNivelDos,
        columns: [
            { field: "TipoProducto", title: "Producto", filterable: true },
            { field: "FamiliaAcero", title: "Familia", filterable: true },
            { field: "Acero", title: "Acero", filterable: true },
            { field: "FibeLine", title: "Fibeline", filterable: true },
            { field: "CantidadSpools", title: "Spools", filterable: false, width: "120px" },
            { field: "Peso", title: "Kgs", filterable: false, width: "100px" },
            { field: "Area", title: "M2", filterable: false, width: "100px" },
            { field: "CantidadJuntas", title: "Juntas", filterable: false, width: "110px" },
            { field: "Peqs", title: "Peqs", filterable: false, width: "100px" }

        ]
    });
    
    //ActualizarContenedorCapacidad(); 
}
 

function CalcularValoresProyecciones(crear) {
    if (ValidarValoresAntesDeProyectar()) {  
        if (crear) { 
            AgregarNuevaProyeccion();
            AgregarContenedorProyecciones();
            $("input.proyeccionTaller[taller='A']").attr('checked', 'checked');
            ActualizarContenedorCapacidad("A",SpoolsEnProyeccion[0].Tipo); 
        }
        else {
            debugger;
            EditarProyeccion();
            EditarContenedorProyecciones(); 
            ActualizarContenedorCapacidad($("input.proyeccion" + $("#inputProyecciones").val() + "Taller:checked").attr("taller"), SpoolsEnProyeccion[0].Tipo);
        }

        ActualizarGrid();
        SpoolsEnProyeccion = new Array();
    } 
}

//Funciones para agregar proyeccion
function AgregarNuevaProyeccion() {
    Proyecciones.Proyeccion.push({
        ID: 0,
        Accion: 1,
        NumeroSpools: 5
    });

    Proyecciones.Proyeccion.push({
        ID: (Proyecciones.Proyeccion.length),
        Accion: 1,
        NumeroSpools: SpoolsEnProyeccion.length
         
    }); 
}
 
function AgregarContenedorProyecciones() { 
    var nombre = $("#inputWindowProyeccion").val();
    var totalProyecciones = $("tr.proyeccion").length;
    var totalSpoolsProyeccion = SpoolsEnProyeccion.length;
    var totalJuntasProyeccion = 0;
    var totalPeso = 0;
    var totalArea = 0;
    var totalPeqs = 0;
     
    for (var i = 0; i < totalSpoolsProyeccion;i++) { 
        totalJuntasProyeccion += SpoolsEnProyeccion[i].ListaJuntas.length;
        totalPeso += SpoolsEnProyeccion[i].Peso;
        totalArea += SpoolsEnProyeccion[i].Area;

        for (var j = 0; j < SpoolsEnProyeccion[i].ListaJuntas.length; j++) {
            totalPeqs += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
        }
    }

    $("#contenedorProyecciones").append('<tr class="proyeccion" nombre="' + nombre + '" proyeccionid="' + (totalProyecciones + 1) + '">' +
                                            '<td width="20px"><img src="../../../Content/images/SAMC_Delete.png"></td>' +
                                            '<td>' +
                                                '<div class="Cuadro'+ (totalProyecciones+1) +'">&nbsp;</div>' +
                                                nombre +
                                                ' - Spools:<span class="totalSpools Proyeccion' + (totalProyecciones + 1) + '">' + totalSpoolsProyeccion +
                                                '</span>, Juntas: <span class="totalJuntas Proyeccion' + (totalProyecciones + 1) + '">' + totalJuntasProyeccion +
                                                '</span>, Kg: <span class="totalPeso Proyeccion' + (totalProyecciones + 1) + '">' + totalPeso +
                                                '</span>, M: <span class="totalArea Proyeccion' + (totalProyecciones + 1) + '">' + totalArea +
                                                '</span>, <span class="totalPeqs Proyeccion' + (totalProyecciones + 1) + '">' + totalPeqs + '</span> Peqs' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio" class="proyeccion' + (totalProyecciones + 1) + 'Taller" taller="A">' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio" class="proyeccion' + (totalProyecciones + 1) + 'Taller" taller="B">' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio" class="proyeccion' + (totalProyecciones + 1) + 'Taller" taller="C">' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio" class="proyeccion' + (totalProyecciones + 1) + 'Taller" taller="D">' +
                                            '</td>' +
                                        '</tr>');     
}

//Funciones para utilizar proyeccion existente
function EditarProyeccion() { 
    $.each(Proyecciones.Proyeccion, function (index) { 
        if (Proyecciones.Proyeccion[index] == $("#inputProyecciones").val()) {
            Proyecciones.Proyeccion[index].NueroSpools = SpoolsEnProyeccion.length;
        } 
    });
}

function EditarContenedorProyecciones() {
    var proyeccion = $("#inputProyecciones").val();
    var totalSpoolsProyeccion = SpoolsEnProyeccion.length;
    var totalJuntasProyeccion = 0;
    var totalPeso = 0;
    var totalArea = 0;
    var totalPeqs = 0;

    for (var i = 0; i < totalSpoolsProyeccion; i++) {
        totalJuntasProyeccion += SpoolsEnProyeccion[i].ListaJuntas.length;
        totalPeso += SpoolsEnProyeccion[i].Peso;
        totalArea += SpoolsEnProyeccion[i].Area;

        for (var j = 0; j < SpoolsEnProyeccion[i].ListaJuntas.length; j++) {
            totalPeqs += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
        }
    }

    totalSpoolsProyeccion += parseInt($("span.totalSpools.Proyeccion" + proyeccion + "").text(), 10);
    totalJuntasProyeccion += parseInt($("span.totalJuntas.Proyeccion" + proyeccion + "").text(), 10);
    totalPeso += parseInt($("span.totalPeso.Proyeccion" + proyeccion + "").text(), 10);
    totalArea += parseInt($("span.totalArea.Proyeccion" + proyeccion + "").text(), 10);
    totalPeqs += parseInt($("span.totalPeqs.Proyeccion" + proyeccion + "").text(), 10);

    $("span.totalSpools.Proyeccion" + proyeccion + "").text(totalSpoolsProyeccion);
    $("span.totalJuntas.Proyeccion" + proyeccion + "").text(totalJuntasProyeccion);
    $("span.totalPeso.Proyeccion" + proyeccion + "").text(totalPeso);
    $("span.totalArea.Proyeccion" + proyeccion + "").text(totalArea);
    $("span.totalPeqs.Proyeccion" + proyeccion + "").text(totalPeqs);
}

function ObtenerProyeccionesExistentes() {
    var data = new Array();
     
    $("tr.proyeccion").each(function (index, proyeccion) {
        data.push([{ Proyeccion: $(proyeccion).attr("nombre"), ProyeccionID: $(proyeccion).attr("proyeccionid") }]);
          
    });
 
    $("#inputProyecciones").data("kendoComboBox").dataSource.data(data[0]);
}

//Funciones generales despues de proyectar
function ActualizarGrid() {
    var ds = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < ds.length; i++) {
        var listaSpool = ds[i].ListaSpools

        for (var j = 0; j < listaSpool.length; j++) {
            if (listaSpool[j].Seleccionado) {
                listaSpool[j].Proyectado = 1;
                listaSpool[j].Proyeccion = $("#inputWindowProyeccion").val();
            }
        }
    }

    $("#grid").data("kendoGrid").dataSource.sync();
    $("#divProyectarWindow").data("kendoWindow").close();
}

function ActualizarContenedorCapacidad(taller, tipo) {
    var arregloDetalle = [];
    listaProyecciones = [];
    arregloDetalle[0] = {
        Capacidad: "",
        Unidad: "",
        ListaProyecciones: ""
    };
    
    for (var i = 0; i < Proyecciones.Proyeccion.length; i++) {
        listaProyecciones[i] = {
            ConsecutivoProyeccion: "",
            Cantidad: ""
        }
        listaProyecciones[i].ConsecutivoProyeccion = toString(i);
        listaProyecciones[i].Cantidad = Proyecciones.Proyeccion[i].NumeroSpools;
    }


    arregloDetalle[0].Capacidad = 5;
    arregloDetalle[0].Unidad = "peqs";
    arregloDetalle[0].ListaProyecciones = listaProyecciones;

    var acheteemeele = crearGrafico(arregloDetalle);

    $("#taller" + taller + "-" + tipo + "").html(acheteemeele);
}

function ValidarValoresAntesDeProyectar() { 
    var correcto = true;
    var familiaAcero = -1;

    var ds = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < ds.length; i++) {
        var listaSpool = ds[i].ListaSpools

        if (listaSpool.length == 0) {
            correcto = false;
            alert("seleccione un spool");
        }

        for (var j = 0; j < listaSpool.length; j++) {
            if (listaSpool[j].Seleccionado && familiaAcero == -1) {
                familiaAcero = ds[i].FamiliaID;
                SpoolsEnProyeccion.push(listaSpool[j]);
            }
            else if (listaSpool[j].Seleccionado && familiaAcero > -1 && familiaAcero == ds[i].FamiliaID) {
                SpoolsEnProyeccion.push(listaSpool[j]);
            }
            else if (listaSpool[j].Seleccionado && familiaAcero > -1 && familiaAcero != ds[i].FamiliaID) {
                correcto = false;
                alert("dif familias"); 
            }
        } 
    }
     
    return correcto
}
 
function crearGrafico(ArregloDetalle) {

    var contTotalProyecciones = 0;
    for (var i = 0; i < ArregloDetalle[0].ListaProyecciones.length; i++) {
        contTotalProyecciones += ArregloDetalle[0].ListaProyecciones[i].Cantidad;
    }

    var stringGrafico = '<div class="GraficaPadre">';
    if (contTotalProyecciones > ArregloDetalle[0].Capacidad) {
        for (var j = 0; j < ArregloDetalle[0].ListaProyecciones.length; j++) {
            if (j == 0) {
                stringGrafico += '<div class="GarficaProduccion" style="width:' + ((ArregloDetalle[0].ListaProyecciones[j].Cantidad * 100) / contTotalProyecciones) + '%">&nbsp;</div>';
            }
            else {
                stringGrafico += '<div class="Grafica' + j + '" style="width:' + ((ArregloDetalle[0].ListaProyecciones[j].Cantidad * 100) / contTotalProyecciones) + '%">&nbsp;</div>';
            }
        }
    }
    else {
        for (var j = 0; j < ArregloDetalle[0].ListaProyecciones.length; j++) {
            if (j == 0) {
                stringGrafico += '<div class="GarficaProduccion" style="width:' + ((ArregloDetalle[0].ListaProyecciones[j].Cantidad * 100) / ArregloDetalle[0].Capacidad) + '%">&nbsp;</div>';
            }
            else {
                stringGrafico += '<div class="Grafica' + j + '" style="width:' + ((ArregloDetalle[0].ListaProyecciones[j].Cantidad * 100) / ArregloDetalle[0].Capacidad) + '%">&nbsp;</div>';
            }
        }
    }
    stringGrafico += '<div class="GraficaDetalle"> ' + ArregloDetalle[0].Capacidad + '-' + ArregloDetalle[0].Unidad + '-' + Math.round(((contTotalProyecciones * 100) / ArregloDetalle[0].Capacidad)) + '%</div>';
    stringGrafico += '</div>';
    return stringGrafico;
}
