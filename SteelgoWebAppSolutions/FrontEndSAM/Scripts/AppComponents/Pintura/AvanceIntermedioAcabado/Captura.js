﻿//var ItemSeleccionado;
//var anteriorlongitudPintores;

IniciarCapturaAvanceIntAcabado();

function IniciarCapturaAvanceIntAcabado() {
  //  asignarProyecto();
    SuscribirEventos();
   // AltaFecha();

}


//function asignarProyecto() {
//    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
//    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
//}

function changeLanguageCall() {
    //AjaxObtenerCuadrante();
    CargarGridCapturaAvanceIntAcabado();
  llenarCombo();

    //setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 1500);
    //setTimeout(function () { AjaxObtenerLote(); }, 2000);
    //setTimeout(function () { AjaxObtenerColor(); }, 2500);
    //setTimeout(function () { AjaxObtenerPintores(); }, 3000);
    //setTimeout(function () { AjaxSistemaPintura(); }, 3500);
    //document.title = _dictionary.menuPinturaCapturaAvanceIntAcabadoTop[$("#language").data("kendoDropDownList").value()];
  //  $("#lblGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
  //  $('#lblGuardarFooter').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    //opcionHabilitarView(false, "FieldSetView")
}

function CargarGridCapturaAvanceIntAcabado() {
    //loadingStart();
    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#lblGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            }
            else {
                this.closeCell();
            }
        },
        autoBind: true,
        change: function () {
            ItemSeleccionado = this.dataSource.view()[this.select().index()];
        },
        dataSource: {
            data: [
                //{
                //    Accion: 1,
                //    Spool: "X001-013",
                //    SistemaPintura: "",
                //    Color: "",
                //    M2: "",
                //    Lote:""
                //}
            ],   
            schema: {
                model: {
                    fields: {
                      Accion: { type: "number", editable: false },
                      Spool: { type: "string", editable: false },
                      M2: { type: "number", editable: false },
                      Lote: { type: "string", editable: true },
                       // FechaPintura: {type:"Date",editable:true},
                       

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
            { field: "FechaPintura", title: _dictionary.columnFechaPintura[$("#language").data("kendoDropDownList").value()], width: "90px", filterable: getKendoGridFilterableDateMaftec(), width: "130px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "ListaDetallePintoresPorSpool", title: _dictionary.columnPintores[$("#language").data("kendoDropDownList").value()], width: "120px", filterable: false, editor: RenderMultiselectPintores, template: "#:TemplatePintoresPorSpool#" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "99px" }
        ]
    });
    CustomisaGrid($("#grid"));
};

function llenarCombo() {
  
    var c = [
     { CuadranteID: 0, Nombre: "" },
       { CuadranteID: 1, Nombre: "CH-4" },
       { CuadranteID: 2, Nombre: "ZPC-E10" },
       { CuadranteID: 3, Nombre: "ZCC-D4" },
];
    var sp = [
        { SistemaPinturaID: 0, Nombre: "" },//Debe coincidir lo que tienes en tu dataTextField de tu combo por eso no te muestra nada 
        { SistemaPinturaID: 1, Nombre: "A1" },
        { SistemaPinturaID: 2, Nombre: "A2" },
        { SistemaPinturaID: 3, Nombre: "18.1" },
    ];

    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrante").data("kendoComboBox").dataSource.data(c);

    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
   $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(sp);

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

    function PlanchaFecha() {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var data = query.filter(filters).data;

        for (var i = 0; i < data.length; i++) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                data[i].FechaPintura = String(endRangeDate.val()).trim();
            }
            else {
                if (data[i].FechaPintura === "" || data[i].FechaPintura === null || data[i].FechaPintura === undefined) {
                    data[i].FechaPintura = String(endRangeDate.val()).trim();
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