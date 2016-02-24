 
var Talleres = new Array();
var SpoolsEnProyeccion = new Array();
var totalProyecciones = 0;

function changeLanguageCall() {
    SuscribirEventos();
    CargarGrid(); 
    AjaxObtenerProyectos();
};

//Funciones para crear elementos 
function CargarGrid() {

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
           
            { field: "TipoProducto", title: _dictionary.GridStackProducto[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "FamiliaAcero", title: _dictionary.GridstackFamilia[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Acero", title: _dictionary.GridstackAcero[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "FibeLine", title: _dictionary.GridstackFibeline[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "CantidadSpools", title: _dictionary.GridstackSpools[$("#language").data("kendoDropDownList").value()], filterable: false, width: "120px" },
            { field: "Peso", title: _dictionary.GridstackKgs[$("#language").data("kendoDropDownList").value()], filterable: false, width: "100px" },
            { field: "Area", title: _dictionary.GridstackM2[$("#language").data("kendoDropDownList").value()], filterable: false, width: "100px" },
            { field: "CantidadJuntas", title: _dictionary.GridstackBoards[$("#language").data("kendoDropDownList").value()], filterable: false, width: "110px" },
            { field: "Peqs", title: _dictionary.GridstackPqs[$("#language").data("kendoDropDownList").value()], filterable: false, width: "100px" }
            ]


        
    });
    
    CustomisaGrid($("#grid"));
}
  
function CalcularValoresProyecciones(crear, tallerID) {
    if (ValidarValoresAntesDeProyectar()) {  
        if (crear) {  
            AgregarContenedorProyecciones(tallerID);  
        }
        else {  
            EditarContenedorProyecciones();  
        }

        ActualizarGrid(true,"");
        SpoolsEnProyeccion = new Array();
    } 
}

function CrearContenedorProyecciones(talleresLista) {
    for (var i = 0; i < talleresLista.length; i++) {
        $("#talleresProyeccion").append("<th width='20px' style='text-align:center;' class='taller-proyecciones-encabezado' taller='" +
                                            talleresLista[i].Taller +
                                            "' tallerID='" +
                                            talleresLista[i].TallerID + "'>" +
                                                talleresLista[i].Taller +
                                        "</th>");
    }
}

function CrearContenedorCapacidad(talleresLista) {
    for (var i = 0; i < talleresLista.length; i++) {
        $("#contenedorTalleresCapacidad").append('<tr>' +
                                                    '<td width="10%">' +
                                                    talleresLista[i].Taller+
                                                    '</td>' +
                                                    '<td width="30%"  id="' + talleresLista[i].TallerID + '-automatico" class="automatico">' +
                                 
                                                    '</td>' +
                                                    '<td width="30%" id="' + talleresLista[i].TallerID + '-automan" class="automan">' +
                                
                                                    '</td>' +
                                                    '<td width="30%" id="' + talleresLista[i].TallerID + '-manual" class="manual">' +
                                 
                                                    '</td>' +
                                                '</tr>');
    }
}

function CrearArregloTalleres(listaTalleres) {

    for (var i = 0; i < listaTalleres.length; i++) {  
        Talleres.push({
            taller: [{
                ID: listaTalleres[i].TallerID, 
                Capacidad: listaTalleres[i].Capacidad,
                Automatico: { 
                    Proyecciones: [{
                        ID: listaTalleres[i].Produccion.ProyeccionID,
                        Nombre: "Produccion",
                        Accion: 1,
                        NumeroSpools: listaTalleres[i].Produccion.CantidadAutomatico * 0.8
                    }]
                },
                Automan: { 
                    Proyecciones: [{
                        ID: listaTalleres[i].Produccion.ProyeccionID,
                        Nombre: "Produccion",
                        Accion: 1,
                        NumeroSpools: listaTalleres[i].Produccion.CantidadAutomatico * 0.2
                    }]
                },
                Manual: { 
                    Proyecciones: [{
                        ID: listaTalleres[i].Produccion.ProyeccionID,
                        Nombre: "Produccion",
                        Accion: 1,
                        NumeroSpools: listaTalleres[i].Produccion.CantidadManual
                    }]
                }
            }]
        });
    }
      
    ActualizarContenedorCapacidad();
}

//Funciones para agregar proyeccion
function AgregarContenedorProyecciones(tallerSeleccionado) {
    var nombre = $("#inputWindowProyeccion").val();
    var totalSpoolsProyeccion = SpoolsEnProyeccion.length;
    var totalJuntasProyeccion = 0;
    var totalPeso = 0;
    var totalArea = 0;
    var totalPeqs = 0;
    var totalAutomatico = 0;
    var totalManual = 0;

    totalProyecciones ++;

    for (var i = 0; i < totalSpoolsProyeccion;i++) { 
        totalJuntasProyeccion += SpoolsEnProyeccion[i].ListaJuntas.length;
        totalPeso += SpoolsEnProyeccion[i].Peso;
        totalArea += SpoolsEnProyeccion[i].Area;

        for (var j = 0; j < SpoolsEnProyeccion[i].ListaJuntas.length; j++) { 
            if (SpoolsEnProyeccion[i].ListaJuntas[j].FabclasID == 1) {
                totalAutomatico += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
            }
            else if (SpoolsEnProyeccion[i].ListaJuntas[j].FabclasID == 2) {
                totalManual += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
            }
            totalPeqs += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
        }
    }

    $("#contenedorProyecciones").append('<tr class="proyeccion" nombre="' + nombre + '" proyeccionid="' + totalProyecciones + '">' +
                                            '<td width="20px"><img src="../../../Content/images/SAMC_Delete.png" proyeccionid="' + totalProyecciones + '" nombreproyeccion="' + nombre + '" style="cursor:pointer" class="eliminarProyeccion"></td>' +
                                            '<td id="DescripcionProyeccion' + (totalProyecciones) + '" tallerSeleccionado="' + tallerSeleccionado + '">' +
                                                '<div class="Cuadro'+ (totalProyecciones) +'">&nbsp;</div>' +
                                                nombre +
                                                ' - Spools:<span class="totalSpools Proyeccion' + (totalProyecciones) + '">' + totalSpoolsProyeccion +
                                                '</span>, Juntas: <span class="totalJuntas Proyeccion' + (totalProyecciones) + '">' + totalJuntasProyeccion +
                                                '</span>, Kg: <span class="totalPeso Proyeccion' + (totalProyecciones) + '">' + totalPeso +
                                                '</span>, M: <span class="totalArea Proyeccion' + (totalProyecciones) + '">' + totalArea +
                                                '</span>, <span class="totalPeqs Proyeccion' + (totalProyecciones) + '">' + totalPeqs + '</span> Peqs' +
                                            '</td>' +
                                             
                                        '</tr>');
     

    $(".taller-proyecciones-encabezado", "#talleresProyeccion").each(function (index, taller) { 
        var nombreTaller = $(taller).attr("taller");
        var tallerID = $(taller).attr("tallerID");
        
        $(".proyeccion[proyeccionid='" + totalProyecciones + "']").append('<td>' +
                                                                            '<input type="radio" name="taller-' + totalProyecciones + '" class="proyeccion" proyeccion="proyeccion' + totalProyecciones + 'Taller" proyeccionid="' + totalProyecciones + '" taller="' + nombreTaller + '" tallerID="' + tallerID + '">' +
                                                                        '</td>');
    });
 
     

    $("input.proyeccion[proyeccion='proyeccion" + totalProyecciones + "Taller'][tallerID='" + tallerSeleccionado + "']").attr({ checked: 'checked' });

    AgregarNuevaProyeccionArregloTaller(totalAutomatico, totalManual, totalProyecciones);
}

function EliminarContenedorProyecciones(proyeccionSeleccionada) {
    $(".proyeccion[proyeccionid='" + proyeccionSeleccionada + "']").remove();
}

function AgregarNuevaProyeccionArregloTaller(totalAutomatico, totalManual, proyeccionID) {
 
    $.each(Talleres, function (index) {
        if (Talleres[index].taller[0].ID == $("#inputTalleresWindow").val()) {
            Talleres[index].taller[0].Automatico.Proyecciones.push({
                ID: proyeccionID,
                Nombre: $("#inputWindowProyeccion").val(),
                Accion: 1,
                NumeroSpools: totalAutomatico * 0.8
            });

            Talleres[index].taller[0].Automan.Proyecciones.push({
                ID: proyeccionID,
                Nombre: $("#inputWindowProyeccion").val(),
                Accion: 1,
                NumeroSpools: totalAutomatico * 0.2
            });

            Talleres[index].taller[0].Manual.Proyecciones.push({
                ID: proyeccionID,
                Nombre: $("#inputWindowProyeccion").val(),
                Accion: 1,
                NumeroSpools: totalManual
            });
        }
    });

    ActualizarContenedorCapacidad();
}
 
//Funciones para utilizar proyeccion existente
function EditarContenedorProyecciones() {
    var proyeccionID = $("#inputProyecciones").val();
    var totalSpoolsProyeccion = SpoolsEnProyeccion.length;
    var totalJuntasProyeccion = 0;
    var totalPeso = 0;
    var totalArea = 0;
    var totalPeqs = 0;
    var totalAutomatico = 0;
    var totalManual = 0;

    for (var i = 0; i < totalSpoolsProyeccion; i++) {
        totalJuntasProyeccion += SpoolsEnProyeccion[i].ListaJuntas.length;
        totalPeso += SpoolsEnProyeccion[i].Peso;
        totalArea += SpoolsEnProyeccion[i].Area;

        for (var j = 0; j < SpoolsEnProyeccion[i].ListaJuntas.length; j++) {
            if (SpoolsEnProyeccion[i].ListaJuntas[j].FabclasID == 1) {
                totalAutomatico += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
            }
            else if (SpoolsEnProyeccion[i].ListaJuntas[j].FabclasID == 2) {
                totalManual += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
            }
            totalPeqs += SpoolsEnProyeccion[i].ListaJuntas[j].Peqs;
        }
    }

    totalSpoolsProyeccion += parseInt($("span.totalSpools.Proyeccion" + proyeccionID + "").text(), 10);
    totalJuntasProyeccion += parseInt($("span.totalJuntas.Proyeccion" + proyeccionID + "").text(), 10);
    totalPeso += parseInt($("span.totalPeso.Proyeccion" + proyeccionID + "").text(), 10);
    totalArea += parseInt($("span.totalArea.Proyeccion" + proyeccionID + "").text(), 10);
    totalPeqs += parseInt($("span.totalPeqs.Proyeccion" + proyeccionID + "").text(), 10);

    $("span.totalSpools.Proyeccion" + proyeccionID + "").text(totalSpoolsProyeccion);
    $("span.totalJuntas.Proyeccion" + proyeccionID + "").text(totalJuntasProyeccion);
    $("span.totalPeso.Proyeccion" + proyeccionID + "").text(totalPeso);
    $("span.totalArea.Proyeccion" + proyeccionID + "").text(totalArea);
    $("span.totalPeqs.Proyeccion" + proyeccionID + "").text(totalPeqs);

    EditarProyeccionArregloTaller(totalAutomatico, totalManual, proyeccionID);
}

function EditarProyeccionArregloTaller(totalAutomatico, totalManual, proyeccionID) { 
    $.each(Talleres, function (index) {
        $.each(Talleres[index].taller[0].Automatico.Proyecciones, function (proyeccion_index, proyeccion) {
            if (proyeccion.ID == $("#inputProyecciones").val()) {
                var automatico = proyeccion.NumeroSpools + (totalAutomatico * 0.8);
                var automan = Talleres[index].taller[0].Automan.Proyecciones[proyeccion_index].NumeroSpools + (totalAutomatico * 0.2);
                var manual = Talleres[index].taller[0].Manual.Proyecciones[proyeccion_index].NumeroSpools + totalManual;

                proyeccion.NumeroSpools = automatico;
                Talleres[index].taller[0].Automan.Proyecciones[proyeccion_index].NumeroSpools = automan;
                Talleres[index].taller[0].Manual.Proyecciones[proyeccion_index].NumeroSpools = manual;
            }
        });
    });

    ActualizarContenedorCapacidad();
}

function ObtenerProyeccionesExistentes() {
    var data = new Array();
     
    $("tr.proyeccion").each(function (index, proyeccion) {
        data.push([{ Proyeccion: $(proyeccion).attr("nombre"), ProyeccionID: $(proyeccion).attr("proyeccionid") }]);
    });
 
    $("#inputProyecciones").data("kendoComboBox").dataSource.data(data[0]);
}

//Funciones generales despues de proyectar
function ActualizarContenedorCapacidad() {
    for (var i = 0; i < Talleres.length; i++) {
        var automatico = Talleres[i].taller[0].Automatico;
        var automan = Talleres[i].taller[0].Automan;
        var manual = Talleres[i].taller[0].Manual;

        ImprimirContenedorCapacidad(Talleres[i].taller[0].ID, "automatico", automatico.Proyecciones, Talleres[i].taller[0].Capacidad)
        ImprimirContenedorCapacidad(Talleres[i].taller[0].ID, "automan", automan.Proyecciones, Talleres[i].taller[0].Capacidad)
        ImprimirContenedorCapacidad(Talleres[i].taller[0].ID, "manual", manual.Proyecciones, Talleres[i].taller[0].Capacidad)
    }
}

function ActualizarGrid(seAgregaProyeccion, nombreProyeccion) {
    var ds = $("#grid").data("kendoGrid").dataSource._data;
    debugger;
    for (var i = 0; i < ds.length; i++) {
        var listaSpool = ds[i].ListaSpools

        for (var j = 0; j < listaSpool.length; j++) {
            if (listaSpool[j].Seleccionado && seAgregaProyeccion) {
                listaSpool[j].Seleccionado = 0;
                listaSpool[j].Proyectado = 1;
                listaSpool[j].Proyeccion = $("#inputWindowProyeccion").val();
            }
            else if (listaSpool[j].Proyeccion == nombreProyeccion && !seAgregaProyeccion) {
                listaSpool[j].Seleccionado = 0;
                listaSpool[j].Proyectado = 0;
                listaSpool[j].Proyeccion = "";
            }
        }
    }

    setTimeout(function () { $("#grid").data("kendoGrid").dataSource.sync() },2000);
    $("#divProyectarWindow").data("kendoWindow").close();
}

function ImprimirContenedorCapacidad(taller, tipo, arregloProyeccionesTaller, capacidad) {
    var arregloDetalle = [];
    listaProyecciones = [];
    arregloDetalle[0] = {
        Capacidad: "",
        Unidad: "",
        ListaProyecciones: ""
    };
    
    for (var i = 0; i < arregloProyeccionesTaller.length; i++) {
        listaProyecciones[i] = {
            ConsecutivoProyeccion: "",
            Cantidad: "",
            ProyeccionID: ""
        }
        listaProyecciones[i].ConsecutivoProyeccion = toString(i);
        listaProyecciones[i].Cantidad = arregloProyeccionesTaller[i].NumeroSpools;
        listaProyecciones[i].ProyeccionID = arregloProyeccionesTaller[i].ID;
    }


    arregloDetalle[0].Capacidad = capacidad;
    arregloDetalle[0].Unidad = "peqs";
    arregloDetalle[0].ListaProyecciones = listaProyecciones;

    var codigoGrafico = crearGrafico(arregloDetalle);

    $("#" + taller + "-" + tipo + "").html(codigoGrafico);
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
                stringGrafico += '<div class="Grafica' + ArregloDetalle[0].ListaProyecciones[j].ProyeccionID + '" style="width:' + ((ArregloDetalle[0].ListaProyecciones[j].Cantidad * 100) / contTotalProyecciones) + '%">&nbsp;</div>';
            }
        }
    }
    else {
        for (var j = 0; j < ArregloDetalle[0].ListaProyecciones.length; j++) {
            if (j == 0) {
                stringGrafico += '<div class="GarficaProduccion" style="width:' + ((ArregloDetalle[0].ListaProyecciones[j].Cantidad * 100) / ArregloDetalle[0].Capacidad) + '%">&nbsp;</div>';
            }
            else {
                stringGrafico += '<div class="Grafica' + ArregloDetalle[0].ListaProyecciones[j].ProyeccionID + '" style="width:' + ((ArregloDetalle[0].ListaProyecciones[j].Cantidad * 100) / ArregloDetalle[0].Capacidad) + '%">&nbsp;</div>';
            }
        }
    }
    stringGrafico += '<div class="GraficaDetalle"> ' + ArregloDetalle[0].Capacidad + '-' + ArregloDetalle[0].Unidad + '-' + Math.round(((contTotalProyecciones * 100) / ArregloDetalle[0].Capacidad)) + '%</div>';
    stringGrafico += '</div>';
    return stringGrafico;
}

function CambiarProyeccionDeTaller(tallerID, proyeccionID) {
    var tallerAnterior = $("#DescripcionProyeccion" + proyeccionID + "").attr("tallerSeleccionado");
    var proyeccionAutomatico;
    var proyeccionAutoman;
    var proyeccionManual;

    for (var i = 0; i < Talleres.length; i++) { 
        if (Talleres[i].taller[0].ID == tallerAnterior) {
            for (var j = 0; j < Talleres[i].taller[0].Automatico.Proyecciones.length ; j++) { 
                if (Talleres[i].taller[0].Automatico.Proyecciones[j].ID == proyeccionID) {
                    proyeccionAutomatico = Talleres[i].taller[0].Automatico.Proyecciones[j];
                    proyeccionAutoman = Talleres[i].taller[0].Automan.Proyecciones[j];
                    proyeccionManual = Talleres[i].taller[0].Manual.Proyecciones[j];

                    Talleres[i].taller[0].Automatico.Proyecciones.splice(j, 1);
                    Talleres[i].taller[0].Automan.Proyecciones.splice(j, 1);
                    Talleres[i].taller[0].Manual.Proyecciones.splice(j, 1);
                }
            }
            break;
        }
    }

    for (var i = 0; i < Talleres.length; i++) {
        if (Talleres[i].taller[0].ID == tallerID) {
            Talleres[i].taller[0].Automatico.Proyecciones.push(proyeccionAutomatico);

            Talleres[i].taller[0].Automan.Proyecciones.push(proyeccionAutoman);

            Talleres[i].taller[0].Manual.Proyecciones.push(proyeccionManual);
        }
    }

    $("#DescripcionProyeccion" + proyeccionID + "").attr("tallerSeleccionado", tallerID);
    ActualizarContenedorCapacidad();
}

function EliminarProyeccion(proyeccionID, nombreProyeccion) {
    for (var i = 0; i < Talleres.length; i++) { 
        for (var j = 0; j < Talleres[i].taller[0].Automatico.Proyecciones.length ; j++) {
            if (Talleres[i].taller[0].Automatico.Proyecciones[j].ID == proyeccionID) { 
                Talleres[i].taller[0].Automatico.Proyecciones.splice(j, 1);
                Talleres[i].taller[0].Automan.Proyecciones.splice(j, 1);
                Talleres[i].taller[0].Manual.Proyecciones.splice(j, 1);
            }
        } 
    }
    
    EliminarContenedorProyecciones(proyeccionID);
    ActualizarContenedorCapacidad();
    ActualizarGrid(false, nombreProyeccion);
}