function AjaxCargarArea() {
    loadingStart();
    $Area.Area.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Area").data("kendoComboBox").value("");
        $("#Area").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });

}

function AjaxCargarCuadrante(area) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#Cuadrante").data("kendoComboBox").value("");
        $("#Cuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}


function AjaxCargarDatos(area, cuadrante, impreso) {
    loadingStart();
    $Marcado.Marcado.read({ token: Cookies.get("token"), AreaID: area, CuadranteID: cuadrante, Impreso: impreso, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        loadingStop();
    });
}


function AjaxCampoPredeterminadoImpreso() {
    loadingStart();
    $Marcado.Marcado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.Impreso == "1") {
            $('.radioBtnImpreso')[0].checked = true;
            $('.radioBtnImpreso')[1].checked = false;
        }
        else if (data.Impreso == "0") {
            $('.radioBtnImpreso')[0].checked = false;
            $('.radioBtnImpreso')[1].checked = true;
        }
        
        loadingStop();
    });
}


function AjaxGuardarCaptura(arregloCaptura, impreso) {
    Captura = [];
    Captura[0] = { ListaDetalles: "" };
    ListaDetalles = [];

    for (index = 0; index < arregloCaptura.length; index++) {
        ListaDetalles[index] = {
            EmbarqueMarcadoID: "",
            SpoolID: "",
            Impreso: "",
            Etiquetado: "",
            ColorCintaID: ""
        };

        ListaDetalles[index].EmbarqueMarcadoID = arregloCaptura[index].EmbarqueMarcadoID;
        ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
        ListaDetalles[index].Etiquetado = arregloCaptura[index].Etiquetado;
        ListaDetalles[index].ColorCintaID = arregloCaptura[index].ColorCintaID; 

        if (impreso == "0") {
            ListaDetalles[index].Impreso = 0;
        }
        else {
            ListaDetalles[index].Impreso = 1;
        }
         
        if ( arregloCaptura[index].Etiquetado) {
            ListaDetalles[index].Etiquetado = 1;
        }
        else {
            ListaDetalles[index].Etiquetado = 0;
        }

    }

    Captura[0].ListaDetalles = ListaDetalles;

    loadingStart();
    $Marcado.Marcado.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
        loadingStop();
        displayMessage("EmbarqueMarcadoMensajeGuardadoExitoso", "", "0");
        if (impreso == "0") {
            AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val());
        }
    });
}