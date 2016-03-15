
function AjaxCamposPRedeterminados() {
    $('input:radio[name=Filtro]:nth(0)').attr('checked', true).trigger("change");
    $('input:radio[name=TipoCaptura]:nth(0)').attr('checked', true).trigger("change");
}