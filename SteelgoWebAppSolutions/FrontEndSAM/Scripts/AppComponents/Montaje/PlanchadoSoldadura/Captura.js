IniciarCaptura();

function IniciarCaptura() {
    SuscribirEventos();
};

function changeLanguageCall() {
    //CargarGrid();
    document.title = _dictionary.PlanchadoSoldaduraBreadcrumb[$("#language").data("kendoDropDownList").value()];
    
};
