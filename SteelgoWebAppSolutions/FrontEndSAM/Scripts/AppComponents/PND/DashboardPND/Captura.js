IniciarDashboardPND();
function IniciarDashboardPND() {
    SuscribirEventos();
}

function changeLanguageCall() {
    AjaxCargarHeaderDashboard();
    document.title = _dictionary.ServiciosTecnicosDashboardPNDBreadcrumb[$("#language").data("kendoDropDownList").value()];

}