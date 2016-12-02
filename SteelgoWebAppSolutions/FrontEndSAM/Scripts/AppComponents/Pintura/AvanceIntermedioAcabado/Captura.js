//var ItemSeleccionado;
//var anteriorlongitudPintores;
var endRangeDate;
IniciarCapturaAvanceIntAcabado();

function IniciarCapturaAvanceIntAcabado() {
  //  asignarProyecto();
    SuscribirEventos();
   // AltaFecha();

}


function PlanchaFecha() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    endRangeDate=$("#inputFechaCapturaAvanceIntAcabado").kendoDatePicker();
    if (endRangeDate != "") {
        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                //data[i].FechaArmado = String(endRangeDate.val()).trim();
                data[i].FechaPintura = new Date(ObtenerDato(endRangeDate.val(), 1), ObtenerDato(endRangeDate.val(), 2), ObtenerDato(endRangeDate.val(), 3));//año, mes, dia
            }
            else {
                if (data[i].FechaPintura === "" || data[i].FechaPintura === null || data[i].FechaPintura === undefined) {
                    //data[i].FechaArmado = String(endRangeDate.val()).trim();
                    data[i].FechaPintura = new Date(ObtenerDato(endRangeDate.val(), 1), ObtenerDato(endRangeDate.val(), 2), ObtenerDato(endRangeDate.val(), 3));//año, mes, dia
                }
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

//function asignarProyecto() {
//    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
//    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
//}

function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura == 'es-MX')
                return fecha.split('/')[1] - 1
            else
                return fecha.split('/')[0] - 1
            break;
        case 3://dia
            if (cultura == 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}

function changeLanguageCall() {
    CargarGridCapturaAvanceIntAcabado();
    llenarCombo();
    $('input:radio[name=Proceso]:nth(0)').trigger("click");
}

function CargarGridCapturaAvanceIntAcabado() {
    //loadingStart();
    $("#grid").kendoGrid({
        edit: function (e) {
            //if ($('#lblGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            //}
            //else {
            //    this.closeCell();
            //}
        },
        autoBind: true,
        change: function () {
            ItemSeleccionado = this.dataSource.view()[this.select().index()];
        },
        dataSource: {
            schema: {
                model: {
                    fields: {
                      Accion: { type: "number", editable: false },
                      Spool: { type: "string", editable: false },
                      M2: { type: "number", editable: false },
                      Lote: { type: "string", editable: false },
                      FechaPintura: {type:"Date",editable:true}
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: getGridFilterableMaftec(),
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Spool", title: "Spool", filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "M2", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" } },
            { field: "Lote", title: _dictionary.columnLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px", editor: RenderComboBoxLote },
            { field: "FechaPintura", editor: RenderDatePicker, title: _dictionary.columnFechaPintura[$("#language").data("kendoDropDownList").value()], width: "90px", filterable: getKendoGridFilterableDateMaftec(), width: "130px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "ListaDetallePintoresPorSpool", title: _dictionary.columnPintores[$("#language").data("kendoDropDownList").value()], width: "120px", filterable: false, editor: RenderMultiselectPintores, template: "#:TemplatePintoresPorSpool#" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "99px" }
        ]
    });
    CustomisaGrid($("#grid"));
};

function llenarCombo() {
  
    

    var z = [
        { ZonaID: 0, Nombre: "" },//Debe coincidir lo que tienes en tu dataTextField de tu combo por eso no te muestra nada 
        { ZonaID: 1, Nombre: "Zona 1" },
        { ZonaID: 2, Nombre: "Zona 2" },
        { ZonaID: 3, Nombre: "Zona 3" },
    ];

   $("#inputZona").data("kendoComboBox").dataSource.data([]);
   $("#inputZona").data("kendoComboBox").dataSource.data(z);


}



function PlanchaPintor(detallePintoresSeleccionados, pintoresSeleccionados) {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
   var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === _dictionary.CapturaTodos[$("#language").data("kendoDropDownList").value()]) {
            if (detallePintoresSeleccionados != undefined) {
               data[i].ListaDetallePintoresPorSpool = detallePintoresSeleccionados;
                data[i].TemplatePintoresPorSpool = $("#language").data("kendoDropDownList").value() == "es-MX" ? "Existen " + data[i].ListaDetallePintoresPorSpool.length + " pintores" : "There are " + data[i].ListaDetallePintoresPorSpool.length + " painters";
            }
        }
        else {
            if ((data[i].ListaDetallePintoresPorSpool === "" || data[i].ListaDetallePintoresPorSpool === null || data[i].ListaDetallePintoresPorSpool === undefined || data[i].ListaDetallePintoresPorSpool.length == 0) && detallePintoresSeleccionados != undefined) {
               data[i].ListaDetallePintoresPorSpool = detallePintoresSeleccionados;
              data[i].TemplatePintoresPorSpool = $("#language").data("kendoDropDownList").value() == "es-MX" ? "Existen " + data[i].ListaDetallePintoresPorSpool.length + " pintores" : "There are " + data[i].ListaDetallePintoresPorSpool.length + " painters";
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}

    function PlanchaComponenteComposicion() {
       var dataSource = $("#grid").data("kendoGrid").dataSource;
       var filters = dataSource.filter();
       var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

      for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].ComponenteID = $("#inputPinturaComponenteComposicion").val();
                data[i].Componente = $("#inputPinturaComponenteComposicion").data("kendoComboBox").text();
                data[i].SistemaPinturaID = $("#inputSistemaPintura").val();
                data[i].SistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").text();
            }
            else {
                if (data[i].Componente === "" || data[i].Componente === null || data[i].Componente === undefined) {
                    data[i].ComponenteID = $("#inputPinturaComponenteComposicion").val();
                    data[i].Componente = $("#inputPinturaComponenteComposicion").data("kendoComboBox").text();
                    data[i].SistemaPinturaID = $("#inputSistemaPintura").val();
                    data[i].SistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").text();
                }
            }
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }

    function PlanchaSistemaPintura() {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

       for (var i = 0; i < data.length; i++) {
           if ($('input:radio[name=LLena]:checked').val() === "Todos") {
               data[i].SistemaPinturaID = $("#inputSistemaPintura").val();
               data[i].ComponenteID = $("#inputPinturaComponenteComposicion").val();
              data[i].Componente = $("#inputPinturaComponenteComposicion").data("kendoComboBox").text();
              data[i].SistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").text();
              data[i].ListaPinturaComponenteCompEspecifica = $("#inputPinturaComponenteComposicion").data("kendoComboBox").dataSource._data;
         }
           else {
              if (data[i].SistemaPintura === "" || data[i].SistemaPintura === null || data[i].SistemaPintura === undefined) {
               data[i].SistemaPinturaID = $("#inputSistemaPintura").val();
                data[i].SistemaPintura = $("#inputSistemaPintura").data("kendoComboBox").text();
   
               data[i].ComponenteID = $("#inputPinturaComponenteComposicion").val();
                   data[i].Componente = $("#inputPinturaComponenteComposicion").data("kendoComboBox").text();
              }
         }
        }
       $("#grid").data("kendoGrid").dataSource.sync();
    }

    function PlanchaLote() {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() == "Todos") {
                data[i].LoteID = $("#inputLote").val();
                data[i].Lote = $("#inputLote").data("kendoComboBox").text();
            }
            else {
                if (data[i].Lote === "" || data[i].Lote === null || data[i].Lote === undefined) {
                    data[i].LoteID = $("#inputLote").val();
                    data[i].Lote = $("#inputLote").data("kendoComboBox").text();
                }
            }
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }

    function PlanchaColor() {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].ColorID = $("#inputColor").val();
                data[i].Color = $("#inputColor").data("kendoComboBox").text();
            }
            else {
                if (data[i].Color === "" || data[i].Color === null || data[i].Color === undefined) {
                    data[i].ColorID = $("#inputColor").val();
                    data[i].Color = $("#inputColor").data("kendoComboBox").text();
                }
            }
        }
        $("#grid").data("kendoGrid").dataSource.sync();
    }

    

    function AltaFecha() {

        endRangeDate = $("#inputFechaCapturaAvanceIntAcabado").kendoDatePicker({
              max: new Date(),
       });

        endRangeDate.on("keydown", function (e) {
            if (e.keyCode == 13) {
                //PlanchaFecha();
           }
        });

    }

    function eliminarCaptura(e) {
        e.preventDefault();
        if ($('#lblGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

            var filterValue = $(e.currentTarget).val();
           var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
           var spoolIDRegistro = dataItem.SpoolID;


           windowTemplate = kendo.template($("#windowTemplate").html());

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

            ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                       "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

         ventanaConfirm.open().center();

           $("#yesButton").click(function () {
                var dataSource = $("#grid").data("kendoGrid").dataSource;
               dataItem.Accion = 3;

               if (dataItem.PinturaSpoolID === 0)
              { dataSource.remove(dataItem); }

                dataSource.sync();
                ventanaConfirm.close();
            });
           $("#noButton").click(function () {
               ventanaConfirm.close();
          });
        }
    }

    function AgregarEstiloError($grid) {
       //Agregar error en fila
       $("tr", $grid).each(function (index) {
          var $row = $(this);
            $row.css("background-color", "");
           $("td", $(this)).each(function (index) {
                if ($(this).text() == "" || $(this).text() == "0" || $(this).text().indexOf("No") >= 0 || $(this).text().indexOf("Existen 0") >= 0) {
                    $row.css("background-color", "#ffcccc");
               }
            });
        });
    }