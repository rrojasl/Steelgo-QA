var CampoMuestra = 29;

function AjaxPruebas() {
    ..read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoMuestra }).done(function (data) {
        $("#inputPrueba").data("kendoDropDownList").value("");
        $("#inputPrueba").data("kendoDropDownList").dataSource.data(data);
      
        AjaxProveedor();
    });
};

function AjaxProveedor() {
    
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token") , idPrueba:  $("#inputPrueba").val() }).done(function (data) {
            $("#inputProveedor").data("kendoDropDownList").value("");
            $("#inputProveedor").data("kendoDropDownList").dataSource.data(data);
            AjaxCargarRequisicionAsignacion();
        });
       
        AjaxCargarCamposPredeterminados();
    
}

function AjaxCargarRequisicionAsignacion() {
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), mostrar: "Todos" }).done(function (data) {
         $("#grid").data("kendoGrid").dataSource.data(data);
       
    });
}

function AjaxCargarCamposPredeterminados() {
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoMuestra }).done(function (data) {
        
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', true);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', false);
            $("#styleSinCaptura").addClass("active");
            $("#styleTodos").removeClass("active");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
            $("#styleTodos").addClass("active");
            $("#styleSinCaptura").removeClass("active");
        }
    });

}

