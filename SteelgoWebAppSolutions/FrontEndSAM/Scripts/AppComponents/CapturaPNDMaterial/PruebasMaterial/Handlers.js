function SuscribirEventos()
{
    SuscribirEventoComboPrueba();
    suscribirEventoChangeRadio();
    SuscribirEventoComboItemCode();
    SuscribirEventoComboColadas();
    SuscribirEventoNumeroUnico();
    SuscribirEventoNUA();
    SuscribirEventoSpool();
    SuscribirEventoEtiqueta();
    suscribirEventoChangeRadioTipoCara();
}

function SuscribirEventoComboPrueba() {
    $('#inputPrueba').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");

            }
        }
    });

};

function SuscribirEventoComboItemCode() {
    $('#inputItemCode').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");

            }
        }
    });

};

function SuscribirEventoComboColadas() {
    $('#inputColadas').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");

            }
        }
    });

};

function SuscribirEventoNumeroUnico() {
    $('#inputNumeroUnico').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");

            }
        }
    });

};

function SuscribirEventoNUA() {
    $('#inputNUA').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");

            }
        }
    });

};

function SuscribirEventoSpool() {
    $('#InputID').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");

            }
        }
    });

};
function SuscribirEventoEtiqueta() {
    $('#inputItemEtiqueta').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebasID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
            }
            else {
                $("#inputPrueba").data("kendoComboBox").value("");

            }
        }
    });

};

function suscribirEventoChangeRadio() {

    $('input:radio[name=Filtro]:nth(0)').change(function () {
            FiltroMostrar(0);
    });
    $('input:radio[name=Filtro]:nth(1)').change(function () {
            FiltroMostrar(1);
    });
    $('input:radio[name=Filtro]:nth(2)').change(function () {

        FiltroMostrar(2);
    });

}

function FiltroMostrar(tipo) {

    if (tipo==0) {
        $("#FiltroColada").css('display', 'block');
        $("#FiltroNumeroUnico").css('display', 'none');
        $("#FiltroNumeroAsignado").css('display', 'none');
    }
    else if (tipo==1) {
        $("#FiltroColada").css('display', 'none');
        $("#FiltroNumeroUnico").css('display', 'block');
        $("#FiltroNumeroAsignado").css('display', 'none');
    }
    else if (tipo == 2) {
        $("#FiltroColada").css('display', 'none');
        $("#FiltroNumeroUnico").css('display', 'none');
        $("#FiltroNumeroAsignado").css('display', 'block');
    }
}

function suscribirEventoChangeRadioTipoCara()
{
    $('input:radio[name=TipoCaptura]:nth(0)').change(function () {
        FiltroTipoCara(0);
    });
    $('input:radio[name=TipoCaptura]:nth(1)').change(function () {
        FiltroTipoCara(1);
    });

}

function FiltroTipoCara(tipo)
{
    if (tipo == 0) {
        $("#gridIzquierda").css('display', 'block');
        $("#gridDerecha").css('display', 'none');
        
       
    }
    else if (tipo == 1) {
        $("#gridIzquierda").css('display', 'block');
        $("#gridDerecha").css('display', 'block');
    }
}