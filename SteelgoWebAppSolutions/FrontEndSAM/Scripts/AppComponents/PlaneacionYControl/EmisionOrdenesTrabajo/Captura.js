var Proyecciones = new Array();

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
            { field: "TipoProducto", title: "Spools", filterable: true },
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
    
    ContenedorCapacidad();
     
  
}

function CalcularValoresProyecciones() {
    var spools, juntas, peso, area, peqs;
     
    if (ValidarValoresAntesDeProyectar()) {
        ContenedorProyecciones();
    } 
}

function ContenedorProyecciones() {
    debugger;
    var totalProyecciones = $("tr.proyeccion").length;
    
    $("#contenedorProyecciones").append('<tr class="proyeccion">' +
                                            '<td width="20px"><img src="../../../Content/images/SAMC_Delete.png"></td>' +
                                            '<td>' +
                                                '<div class="Cuadro'+ (totalProyecciones++) +'">&nbsp;</div>' +
                                                $("#inputWindowProyeccion").val() + ' - Spools:5, Juntas: 45, Kg:128, M:1234, 14 Peqs' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio" checked="">' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio">' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio">' +
                                            '</td>' +
                                            '<td>' +
                                                '<input type="radio">' +
                                            '</td>' +
                                        '</tr>');
}

function ValidarValoresAntesDeProyectar() {
    debugger;
    var correcto = true;
    var ds = $("#grid").data("kendoGrid").dataSource._data;

    return correcto
}

function ContenedorCapacidad() {

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

//...............................PRUEBA------------------------------------------

arregloDetalle = [];
listaProyecciones = [];
arregloDetalle[0] = {
    Capacidad: "",
    Unidad: "",
    ListaProyecciones: ""
};


for (var i = 0; i < 3; i++) {
    listaProyecciones[i] = {
        ConsecutivoProyeccion: "",
        Cantidad: ""
    }
    listaProyecciones[i].ConsecutivoProyeccion = toString(i);
    listaProyecciones[i].Cantidad = (i + 1) * 9;
}


arregloDetalle[0].Capacidad = 5;
arregloDetalle[0].Unidad = "peqs";
arregloDetalle[0].ListaProyecciones = listaProyecciones;

var acheteemeele = crearGrafico(arregloDetalle);
$("#prueba").html(acheteemeele); // SE LE PUSO EL NOMBRE A UNO DE LOS DIVS QUE ESTAN EN LA VISTA  XD


//...............................PRUEBA------------------------------------------