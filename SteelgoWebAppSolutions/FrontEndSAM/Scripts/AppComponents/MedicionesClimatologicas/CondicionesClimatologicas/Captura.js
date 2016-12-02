function changeLanguageCall() {
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
    document.title = _dictionary.ServiciosTecnicosRequisicionPND[$("#language").data("kendoDropDownList").value()];
};
