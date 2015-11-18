function SuscribirEventos() {
    SuscribirEventoAgregarRequisitoNuevo();
   
};


function ActivarRefrescarGrid(idBoton)
{
    tabActivo(idBoton);
    AjaxAccionesListado(idBoton);
}

function SuscribirEventoAgregarRequisitoNuevo()
{
    
    $('#btnAgregarRequisicion').click(function (e) {
        document.location.target = "_blank";
        document.location.href = "/serviciostecnicos/generarrequisicion?id=" + 0;
    });
}





