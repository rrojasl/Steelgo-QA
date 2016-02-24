function AjaxObtenerProyectos() {
    $EmisionOT.EmisionOT.read({ token: Cookies.get("token"), idCatalogo: 1 }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").value("");
  
        if (data.length > 0) {  
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
        }  
         
        loadingStop();
    });
} 

function AjaxMostrarSpoolsDeProyecto() {
    $EmisionOT.EmisionOT.read({ token: Cookies.get("token"), idProyecto: 1, idPatio: 1 }).done(function (data) {
      
        //Nivel 1
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;

        for (var i = 0; i < data.length; i++) { 
            ds.add(data[i]); 
        }
         
        loadingStop();
    });
}

function AjaxObtenerTalleresPorPatio() { 
    $EmisionOT.EmisionOT.read({ token: Cookies.get("token"), talleres: "taller", idPatio: $("#inputPatio").val() }).done(function (data) {  
        CrearContenedorProyecciones(data);
        CrearContenedorCapacidad(data);
        CrearArregloTalleres(data);

        $("#inputTalleresWindow").data("kendoComboBox").value("");
        $("#inputTalleresWindow").data("kendoComboBox").dataSource.data(data);

        loadingStop();
    });
}