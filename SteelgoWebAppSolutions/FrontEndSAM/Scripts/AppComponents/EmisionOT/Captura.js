$(document).ready(function () {
//    CargarSplitterKendo();
    //    CargarGridStackTable();
    CargarGridStack();

});

function CargarSplitterKendo() {
    $("#gridStack").append('<div id="vertical">' +
                            '<div id="top-pane">' +
                                '<div id="horizontal" style="height: 100%; width: 100%;">' +
                                    '<div id="left-pane">' +
                                        '<div class="pane-content">' +
                                            '<div style="color:#ffffff;position: absolute; bottom: 0; width:100%" class="header-grid text-center">Totalizado de las proyecciones</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div id="rigth-pane">' +
                                        '<div class="pane-content">' +
                                            '<div style="color:#ffffff" class="header-grid text-center">Capacidad</div>' +
                                        '</div>' +
                                    '</div>' + 
                                '</div>' +
                            '</div>' +
                            '<div id="middle-pane">' +
                                '<div class="pane-content">' +
                                    '<div style="color:#ffffff" class="header-grid text-center">Taller</div>' +
                                '</div>' +
                            '</div>');

    $("#vertical").kendoSplitter({
        orientation: "vertical",
        panes: [
            { collapsible: false },
            { collapsible: false }
        ]
    });

    $("#horizontal").kendoSplitter({
        panes: [
            { collapsible: true },
            { collapsible: false },
            { collapsible: true }
        ]
    });
}

function CargarGridStackTable() { 
     
    $("#gridStack").append('<div class="grid-stack" style="font-size:10px;">' +
                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="6" data-gs-height="4">' +
                                    '<div class="grid-stack-item-content border-shadow" id="gridProyecciones">' +
                                        '<div style="color:#ffffff; font-size:14px;position: relative; bottom: 0; width:100%" class="header-grid text-center">Totalizado de las proyecciones</div>' +
                                        '<table class="table table-condensed" style="border-collapse:collapse;">' + 
                                            '<thead>' +
                                                '<tr><th>&nbsp;</th>' +
                                                    '<th>Familia</th>' +
                                                    '<th>Acero</th>' +
                                                    '<th>Fablines</th>' +
                                                    '<th>Spools</th>' +
                                                    '<th>Kgs</th>' +
                                                    '<th>M2</th>' +
                                                    '<th>Juntas</th>' +
                                                    '<th>Peqs</th>' +
                                                '</tr>' +
                                            '</thead>' +

                                            '<tbody>' +
                                              '<tr data-toggle="collapse" data-target="#Familia001" class="accordion-toggle" id="ContenedorFamilia001">' +
                                                '<td>' +
                                                    '<span class="glyphicon glyphicon-plus acordeon-status" aria-hidden="true"></span>' +
                                                '</td>' +
                                                '<td>CS</td>' +
                                                '<td>a16</td>' +
                                                '<td>Auto 6-24</td>' +
                                                '<td id="TotalSpoolsFamilia001"></td>' +
                                                '<td id="TotalKgsFamilia001"></td>' +
                                                '<td id="TotalM2Familia001"></td>' +
                                                '<td id="TotalJuntasFamilia001"></td> ' +
                                                '<td id="TotalPeqsFamilia001"></td> ' +
                                              '</tr>' +
                                              '<tr>' +
                                                '<td colspan="12" class="hiddenRow nivel2-Familia001"><div class="accordian-body collapse" id="Familia001"> ' +
                                                  '<table class="table table-striped">' +
                                                    '<thead>' + 
                                                      '<tr>' +
                                                        '<th></th>' +
                                                        '<th>Nombre Spool</th>' +
                                                        '<th>Dibujo</th>' +
                                                        '<th>Diametro</th>' +
                                                        '<th>Kgs</th>' +
                                                        '<th>M2</th>' +
                                                        '<th>Juntas</th>' +
                                                        '<th>Peqs</th>' +
                                                      '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>' +

                                                        //Spool001
                                                      '<tr data-toggle="collapse" data-target="#Familia001-DetallesSpool001" class="accordion-toggle spool nivel2-Familia001" id="ContenedorSpool001">' +
                                                        '<td>' +
                                                            '<span class="glyphicon glyphicon-plus acordeon-status" aria-hidden="true"></span>' +
                                                        '</td>' +
                                                        '<td>' +
                                                          '<div class="checkbox" style="margin-top: 0px;">' +
                                                              '<label><input type="checkbox" value=""></label>' +
                                                            '</div>' +
                                                        '</td>' +
                                                        '<td>Spool001</td>' +
                                                        '<td>A</td>' +
                                                        '<td> </td>' +
                                                        '<td class="Kgs Familia001 Spool001">12 </td>' +
                                                        '<td class="M2 Familia001 Spool001">0.5</td>' + 
                                                        '<td id="TotalJuntasFamilia001Spool001"></td> ' +
                                                        '<td id="TotalPeqsFamilia001Spool001"></td> ' + 
                                                      '</tr> ' +

                                                        //Juntas de Spool
                                                      '<tr>' +
                                                      '<td colspan="12" class="hiddenRow nivel3-Familia001" id="Spool001"><div class="accordian-body collapse" id="Familia001-DetallesSpool001"> ' + 
                                                        '<table class="table table-striped">' +
                                                          '<thead>' +
                                                              '<tr>' +
                                                                  '<th/><th/>' +
                                                                  '<th>Fabcase</th>' +
                                                                  '<th>Tipo</th>' +
                                                                  '<th>Junta</th>' + 
                                                                  '<th>Peqs</th>' +
                                                              '</tr>' +
                                                          '</thead>' +
                                                          '<tbody>' +
                                                            '<tr class=" junta Familia001 Spool001">' +
                                                              '<td/><td/>' +
                                                              '<td>1</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' + 
                                                              '<td class="Peqs Familia001 Spool001">15</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool001">' +
                                                              '<td/><td/>' +
                                                              '<td>2</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>BW</td>' + 
                                                              '<td class="Peqs Familia001 Spool001">1</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool001">' +
                                                              '<td/><td/>' +
                                                              '<td>3</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' + 
                                                              '<td class="Peqs Familia001 Spool001">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool001">' +
                                                              '<td/><td/>' +
                                                              '<td>4</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' + 
                                                              '<td class="Peqs Familia001 Spool001">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool001">' +
                                                              '<td/><td/>' +
                                                              '<td>5</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>SW</td>' + 
                                                              '<td class="Peqs Familia001 Spool001">10</td>' +
                                                            '</tr>' +
                                                          '</tbody>' +
     	                                                  '</table>' +
                                                        '</td>' +
                                                      '</tr> ' +

                                                        //Spool002
                                                       '<tr data-toggle="collapse" data-target="#Familia001-DetallesSpool002" class="accordion-toggle spool nivel2-Familia001" id="ContenedorSpool002" disabled>' +
                                                        '<td>' +
                                                            '<span class="glyphicon glyphicon-plus acordeon-status" aria-hidden="true"></span>' +
                                                        '</td>' +
                                                        '<td class="text-center">' +
                                                          '<span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="cursor:pointer"></span>' +
                                                          '<label style="padding:5px;color:#006E2E"> Proyección 1</label>' +
                                                        '</td>' +
                                                        '<td>Spool002</td>' +
                                                        '<td>A</td>' +
                                                        '<td> </td>' +
                                                        '<td class="Kgs Familia001 Spool002">1</td>' +
                                                        '<td class="M2 Familia001 Spool002">0.5</td>' +
                                                        '<td id="TotalJuntasFamilia001Spool002"></td> ' +
                                                        '<td id="TotalPeqsFamilia001Spool002"></td> ' +
                                                      '</tr> ' +

                                                        //Juntas de Spool
                                                      '<tr>' +
                                                      '<td colspan="12" class="hiddenRow nivel3-Familia001" id="Spool002"><div class="accordian-body collapse" id="Familia001-DetallesSpool002"> ' +
                                                        '<table class="table table-striped">' +
                                                          '<thead>' +
                                                              '<tr>' +
                                                              '<th></th>' +
                                                              '<th>Fablines</th>' +
                                                              '<th>Spools</th>' +
                                                              '<th>Peqs</th>' +
                                                              '</tr>' +
                                                          '</thead>' +
                                                          '<tbody>' +
                                                            '<tr class=" junta Familia001 Spool002">' +
                                                              '<td>1</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool002">1</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool002">' +
                                                              '<td>2</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>BW</td>' +
                                                              '<td class="Peqs Familia001 Spool002">1</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool002">' +
                                                              '<td>3</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool002">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool002">' +
                                                              '<td>4</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool002">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool002">' +
                                                              '<td>5</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>SW</td>' +
                                                              '<td class="Peqs Familia001 Spool002">10</td>' +
                                                            '</tr>' +
                                                          '</tbody>' +
     	                                                  '</table>' +
                                                        '</td>' +
                                                      '</tr> ' +
                                                        //Spool003
                                                      '<tr data-toggle="collapse" data-target="#Familia001-DetallesSpool003" class="accordion-toggle spool nivel2-Familia001" id="ContenedorSpool003">' +
                                                        '<td>' +
                                                            '<span class="glyphicon glyphicon-plus acordeon-status" aria-hidden="true"></span>' +
                                                        '</td>' +
                                                        '<td>' +
                                                          '<div class="checkbox" style="margin-top: 0px;">' +
                                                            '<label><input type="checkbox" value=""></label>' +
                                                          '</div>' +
                                                        '</td>' +
                                                        '<td>Spool003</td>' +
                                                        '<td>A</td>' +
                                                        '<td> </td>' +
                                                        '<td class="Kgs Familia001 Spool003"> 2 </td>' +
                                                        '<td class="M2 Familia001 Spool003">0.5</td>' +
                                                        '<td id="TotalJuntasFamilia001Spool003"></td> ' +
                                                        '<td id="TotalPeqsFamilia001Spool003"></td> ' +
                                                      '</tr> ' +

                                                        //Juntas de Spool
                                                      '<tr>' +
                                                      '<td colspan="12" class="hiddenRow nivel3-Familia001" id="Spool003"><div class="accordian-body collapse" id="Familia001-DetallesSpool003"> ' +
                                                        '<table class="table table-striped">' +
                                                          '<thead>' +
                                                              '<tr>' +
                                                              '<th></th>' +
                                                              '<th>Fablines</th>' +
                                                              '<th>Spools</th>' +
                                                              '<th>Peqs</th>' +
                                                              '</tr>' +
                                                          '</thead>' +
                                                          '<tbody>' +
                                                            '<tr class=" junta Familia001 Spool003">' +
                                                              '<td>1</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool003">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool003">' +
                                                              '<td>2</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>BW</td>' +
                                                              '<td class="Peqs Familia001 Spool003">1</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool003">' +
                                                              '<td>3</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool003">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool003">' +
                                                              '<td>4</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool003">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool003">' +
                                                              '<td>5</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>SW</td>' +
                                                              '<td class="Peqs Familia001 Spool003">10</td>' +
                                                            '</tr>' +
                                                          '</tbody>' +
     	                                                  '</table>' +
                                                        '</td>' +
                                                      '</tr> ' +
                                                        //Spool004
                                                       '<tr data-toggle="collapse" data-target="#Familia001-DetallesSpool004" class="accordion-toggle spool nivel2-Familia001" id="ContenedorSpool004">' +
                                                        '<td>' +
                                                            '<span class="glyphicon glyphicon-plus acordeon-status" aria-hidden="true"></span>' +
                                                        '</td>' +
                                                        '<td>' +
                                                          '<div class="checkbox" style="margin-top: 0px;">' +
                                                              '<label><input type="checkbox" value=""></label>' +
                                                          '</div>' +
                                                        '</td>' +
                                                        '<td>Spool004</td>' +
                                                        '<td>A</td>' +
                                                        '<td> </td>' +
                                                        '<td class="Kgs Familia001 Spool004">12 </td>' +
                                                        '<td class="M2 Familia001 Spool004">0.5</td>' +
                                                        '<td id="TotalJuntasFamilia001Spool004"></td> ' +
                                                        '<td id="TotalPeqsFamilia001Spool004"></td> ' +
                                                      '</tr> ' +

                                                        //Juntas de Spool
                                                      '<tr>' +
                                                      '<td colspan="12" class="hiddenRow nivel3-Familia001" id="Spool004"><div class="accordian-body collapse" id="Familia001-DetallesSpool004"> ' +
                                                        '<table class="table table-striped">' +
                                                          '<thead>' +
                                                              '<tr>' +
                                                              '<th></th>' +
                                                              '<th>Fablines</th>' +
                                                              '<th>Spools</th>' +
                                                              '<th>Peqs</th>' +
                                                              '</tr>' +
                                                          '</thead>' +
                                                          '<tbody>' +
                                                            '<tr class=" junta Familia001 Spool004">' +
                                                              '<td>1</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool004">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool004">' +
                                                              '<td>2</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>BW</td>' +
                                                              '<td class="Peqs Familia001 Spool004">1</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool004">' +
                                                              '<td>3</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool004">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool004">' +
                                                              '<td>4</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>TW</td>' +
                                                              '<td class="Peqs Familia001 Spool004">5</td>' +
                                                            '</tr>' +
                                                            '<tr class=" junta Familia001 Spool004">' +
                                                              '<td>5</td>' +
                                                              '<td>Auto 6-24</td>' +
                                                              '<td>SW</td>' +
                                                              '<td class="Peqs Familia001 Spool004">10</td>' +
                                                            '</tr>' +
                                                          '</tbody>' +
     	                                                  '</table>' +
                                                        '</td>' +
                                                      '</tr> ' +
                                                    '</tbody>' +
     	                                            '</table>' +
                                                '</td>' +
                                              '</tr> ' +

                                              //Familia002
                                                      '<tr data-toggle="collapse" data-target="#Familia002" class="accordion-toggle" id="ContenedorFamilia002">' + 
                                                        '<td>' +
                                                            '<span class="glyphicon glyphicon-plus acordeon-status" aria-hidden="true"></span>' +
                                                        '</td>' +
                                                        '<td>CS</td>' +
                                                        '<td>a16</td>' +
                                                        '<td>Auto 6-24</td>' +
                                                        '<td id="TotalSpoolsFamilia002"></td>' +
                                                        '<td id="TotalKgsFamilia002"></td>' +
                                                        '<td id="TotalM2Familia002"></td>' +
                                                        '<td id="TotalJuntasFamilia002"></td> ' +
                                                        '<td id="TotalPeqsFamilia002"></td> ' +
                                                      '</tr>' +
                                                      '<tr>' +
                                                        '<td colspan="12" class="hiddenRow nivel2-Familia002"><div class="accordian-body collapse" id="Familia002"> ' +
                                                          '<table class="table table-striped">' +
                                                            '<thead>' +
                                                              '<tr>' +
                                                                '<th>Acciones</th>' +
                                                                '<th>Nombre Spool</th>' +
                                                                '<th>Dibujo</th>' +
                                                                '<th>Diametro</th>' +
                                                                '<th>Kgs</th>' +
                                                                '<th>M2</th>' +
                                                                '<th>Juntas</th>' +
                                                                '<th>Peqs</th>' +
                                                              '</tr>' +
                                                            '</thead>' +
                                                            '<tbody>' +

                                                                //Spool001
                                                              '<tr data-toggle="collapse" data-target="#Familia002-DetallesSpool001" class="accordion-toggle spool nivel2-Familia002" id="ContenedorSpool001">' +
                                                                '<td>' +
                                                                    '<span class="glyphicon glyphicon-plus acordeon-status" aria-hidden="true"></span>' +
                                                                '</td>' +
                                                                '<td>' +
                                                                  '<div class="checkbox" style="margin-top: 0px;">' +
                                                                    '<label><input type="checkbox" value=""></label>' +
                                                                  '</div>' +
                                                                '</td>' +
                                                                '<td>Spool001</td>' +
                                                                '<td>A</td>' +
                                                                '<td> </td>' +
                                                                '<td class="Kgs Familia002 Spool001">12 </td>' +
                                                                '<td class="M2 Familia002 Spool001">0.5</td>' +
                                                                '<td id="TotalJuntasFamilia002Spool001"></td> ' +
                                                                '<td id="TotalPeqsFamilia002Spool001"></td> ' +
                                                              '</tr> ' +

                                                                //Juntas de Spool
                                                              '<tr>' +
                                                              '<td colspan="12" class="hiddenRow nivel3-Familia002" id="Spool001"><div class="accordian-body collapse" id="Familia002-DetallesSpool001"> ' +
                                                                '<table class="table table-striped">' +
                                                                  '<thead>' +
                                                                      '<tr>' +
                                                                      '<th></th>' +
                                                                      '<th>Fablines</th>' +
                                                                      '<th>Spools</th>' +
                                                                      '<th>Peqs</th>' +
                                                                      '</tr>' +
                                                                  '</thead>' +
                                                                  '<tbody>' +
                                                                    '<tr class=" junta Familia002 Spool001">' +
                                                                      '<td>3</td>' +
                                                                      '<td>Auto 6-24</td>' +
                                                                      '<td>TW</td>' +
                                                                      '<td class="Peqs Familia002 Spool001">5</td>' +
                                                                    '</tr>' +        
                                                                    '<tr class=" junta Familia002 Spool001">' +
                                                                      '<td>3</td>' +
                                                                      '<td>Auto 6-24</td>' +
                                                                      '<td>TW</td>' +
                                                                      '<td class="Peqs Familia002 Spool001">5</td>' +
                                                                    '</tr>' +
                                                                    '<tr class=" junta Familia002 Spool001">' +
                                                                      '<td>3</td>' +
                                                                      '<td>Auto 6-24</td>' +
                                                                      '<td>TW</td>' +
                                                                      '<td class="Peqs Familia002 Spool001">5</td>' +
                                                                    '</tr>' +
                                                                  '</tbody>' +
     	                                                          '</table>' +
                                                                '</td>' +
                                                              '</tr> ' +
 
                                                            '</tbody>' +
     	                                                    '</table>' +
                                                        '</td>' +
                                                      '</tr> ' +

                                                    '</tbody>' +
     	                                            '</table>' +
                                                '</td>' +
                                              '</tr> ' +
                                            '</tbody>' +
                                        '</table>' +
                                        '<div style="color:#ffffff; font-size:14px;position: relative; bottom: 0; width:100%" class="text-center">' +
                                            '<button id="Proyectar" onclick="javascript:void(0);" type="button" class="btn btn-primary" style="padding:10px;"><span id="">Proyectar</span></button>' +
                                        '</div>' +
                                    '</div>' + 
                                '</div>' +

                                '<div class="grid-stack-item" data-gs-x="6" data-gs-y="0" data-gs-width="6" data-gs-height="4">' +
                                        '<div class="grid-stack-item-content border-shadow" style="" id="gridCapacidad">' +
                                            '<div style="color:#ffffff; font-size:14px;" class="header-grid text-center">Capacidad</div>' +
    ' <table class="table table-condensed" style="border-collapse:collapse;">  <thead>  <tr>  <th>Taller</th>  <th>Auto</th>  <th>Auto-Man</th>  <th>Man</th>  </tr>  </thead>  <tbody>  <tr>  <td width="10%">  A  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:10%">  &nbsp;  </div>  <div class="Grafica1" style="width:20%">  &nbsp;  </div>  <div class="Grafica2" style="width:50%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:30%">  &nbsp;  </div>  <div class="Grafica1" style="width:10%">  &nbsp;  </div>  <div class="Grafica2" style="width:10%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:50%">  &nbsp;  </div>  <div class="Grafica1" style="width:30%">  &nbsp;  </div>  <div class="Grafica2" style="width:10%">  &nbsp;  </div>  </div>  </td>  </tr>  <tr>  <td width="10%">  B  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:10%">  &nbsp;  </div>  <div class="Grafica3" style="width:20%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:30%">  &nbsp;  </div>  <div class="Grafica3" style="width:10%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:50%">  &nbsp;  </div>  <div class="Grafica3" style="width:30%">  &nbsp;  </div>  </div>  </td>  </tr>  <tr>  <td width="10%">  C  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:20%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:10%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:30%">  &nbsp;  </div>  </div>  </td>  </tr>  <tr>  <td width="10%">  D  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:5%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:5%">  &nbsp;  </div>  </div>  </td>  <td width="30%">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:70%">  &nbsp;  </div>  </div>  </td>  </tr>  <tr>  <td width="10%">  Despacho  </td>  <td colspan="3">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:30%">  &nbsp;  </div>  <div class="Grafica1" style="width:10%">  &nbsp;  </div>  <div class="Grafica2" style="width:10%">  &nbsp;  </div>  <div class="Grafica3" style="width:10%">  &nbsp;  </div>  </div>  </td>  </tr>  <tr>  <td width="10%">  Corte  </td>  <td colspan="3">  <div class="GraficaPadre">  <div class="GarficaProduccion" style="width:20%">  &nbsp;  </div>  <div class="Grafica1" style="width:15%">  &nbsp;  </div>  <div class="Grafica2" style="width:20%">  &nbsp;  </div>  <div class="Grafica3" style="width:5%">  &nbsp;  </div>  </div>  </td>  </tr>  </tbody>  </table>' +
                                        '</div>' +
                                '</div>' +

                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="7" data-gs-width="12" data-gs-height="2">' +
                                        '<div class="grid-stack-item-content border-shadow" id="gridTalleres">' + 
' <div class="grid-stack-item-content border-shadow" id="gridCapacidad"> <div style="color:#ffffff" class="header-grid text-center">Proyecciones</div> <table class="table table-condensed" style="border-collapse:collapse;"> <thead> <tr> <th width="20px">&nbsp;</th> <th width="20%">&nbsp;</th> <th style="text-align:center;">A</th> <th style="text-align:center;">B</th> <th style="text-align:center;">C</th> <th style="text-align:center;">D</th> </tr> </thead> <tbody> <tr> <td width="20px"><img src="~/Content/images/SAMC_Delete.png" /></td> <td width="20%" > <div class="Cuadro1">&nbsp;</div> Proyeccion 1 </td> <td style="text-align:center;"> <input type="radio" checked /> </td> <td> <input type="radio" /> </td> <td> <input type="radio" /> </td> <td> <input type="radio" /> </td> </tr> <tr> <td width="20px"><img src="~/Content/images/SAMC_Delete.png" /></td> <td> <div class="Cuadro2">&nbsp;</div> Proyeccion 2 </td> <td> <input type="radio" checked /> </td> <td> <input type="radio" /> </td> <td> <input type="radio" /> </td> <td> <input type="radio" /> </td> </tr> <tr> <td width="20px"><img src="~/Content/images/SAMC_Delete.png" /></td> <td> <div class="Cuadro3">&nbsp;</div> Proyeccion 3 </td> <td> <input type="radio" /> </td> <td> <input type="radio" checked/> </td> <td> <input type="radio" /> </td> <td> <input type="radio" /> </td> </tr> </tbody> </table> </div>' +
                                      
                                '</div>' +
                            '</div>' +

'<form id="divNuevoMedioTransporte" style="display:none">     <div class="row">' +
        '<div class="container" style="padding:15px;">' +
            '<div class="form-group col-xs-9 col-sm-9 col-md-9 col-lg-9"  style="display:none">' +
                '<label id="labelNuevoMedioTransporte"></label>' +
                '<input id="inputMedioTransporte" class="form-control" type="text" />' +
            '</div>' +
'<div>¿Deseas crear una proyección o proyectar en una existente?</div>' +
        '<div class="buttonSave col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style="padding:15px;">' +
            '<button class="btn btn-primary" type="button" id="btnGuardarCrearMedioTransporte"><span id="">Crear</span></button>' +
            '<button class="btn btn-primary" type="button" id="btnCerrarVentanaCrearMedioTransporte"><span id="">Existente</span></button>' +
            '<button class="btn btn-primary" type="button" id="btnCerrarVentanaCrearMedioTransporte" style="display:none"><span id="">Proyectar</span></button>' +
        '</div>' +
    '</div>' +
'</form>' +
                            '<span style="color:"#ffffff">.</span>');

    var options = {
        cell_height: 80,
        vertical_margin: 10
    };

    $('.grid-stack').gridstack(options);

    $("#grid").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true,
        //dataSource: {
        //    schema: {
        //        model: {
        //            fields: {
        //                Familia: { type: "string", editable: false },
        //                Acero: { type: "string", editable: false },
        //                Fibelines: { type: "string", editable: false },
        //                Spools: { type: "string", editable: false },
        //                Kgs: { type: "string", editable: false },
        //                M2: { type: "string", editable: false },
        //                Juntas: { type: "string", editable: false },
        //                Peqs: { type: "string", editable: false }
        //            }
        //        }
        //    },
        //    filter: {
        //        logic: "or",
        //        filters: [
        //          { field: "Accion", operator: "eq", value: 1 },
        //          { field: "Accion", operator: "eq", value: 2 }
        //        ]
        //    },
        //    pageSize: 20,
        //    serverPaging: false,
        //    serverFiltering: false,
        //    serverSorting: false
        //}, 
        dataSource: [
            { Familia: "CS", Acero: "A16", Fibelines: "Auto 6-24", Spools: "", Kgs: "", M2: "", Juntas: "", Peqs: "" },
            { Familia: "CS", Acero: "A16", Fibelines: "Auto 6-24", Spools: "", Kgs: "", M2: "", Juntas: "", Peqs: "" },

        ],
        navigatable: true,
        filterable: {
            extra: false
        },
        editable: true,
        autoHeight: true,
        sortable: true, 
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Familia", title: "aa", filterable: true },
            { field: "Acero", title: "sd", filterable: true },
            { field: "Fibelines", title: "aa", filterable: true },
            { field: "Spools", title: "sd", filterable: true },
            { field: "Kgs", title: "aa", filterable: true },
            { field: "M2", title: "sd", filterable: true },
            { field: "Juntas", title: "aa", filterable: true },
            { field: "Peqs", title: "sd", filterable: true }
             
        ]
    });

//Familia001
    $(".nivel2-Familia001").hide();
    $(".nivel3-Familia001").hide();

    $("#ContenedorFamilia001").click(function () {
        $(".nivel2-Familia001").toggle();
    });

    $(".nivel2-Familia001#ContenedorSpool001").click(function () {
        $(".nivel3-Familia001#Spool001").toggle();
    });
    $(".nivel2-Familia001#ContenedorSpool002").click(function () {
        $(".nivel3-Familia001#Spool002").toggle();
    });
    $(".nivel2-Familia001#ContenedorSpool003").click(function () {
        $(".nivel3-Familia001#Spool003").toggle();
    });
    $(".nivel2-Familia001#ContenedorSpool004").click(function () {
        $(".nivel3-Familia001#Spool004").toggle();
    });
  
    //Familia002
    $(".nivel2-Familia002").hide();
    $(".nivel3-Familia002").hide();

    $("#ContenedorFamilia002").click(function () { 
        $(".nivel2-Familia002").toggle();
    });

    $(".nivel2-Familia002#ContenedorSpool001").click(function () {
        $(".nivel3-Familia002#Spool001").toggle();
    });
 
    $("#Proyectar").click(function () {
        $("#divNuevoMedioTransporte").kendoWindow({
            modal: true,
            // title:,
            resizable: false,
            visible: true,
            width: "auto",
            minWidth: "20%",

            position: {
                top: "1%",
                left: "1%"
            },
            actions: [
                "Close"
            ],
        }).data("kendoWindow");
        $("#divNuevoMedioTransporte").data("kendoWindow").title("Proyectar");
        $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
    });


    CrearContenedorProyecciones();
    CrearContenedorCapacidad();
    CrearContenedorTalleres();
    CalcularValoresProyecciones();
}

function CargarGridStack() {

    var options = {
        cell_height: 80,
        vertical_margin: 10
    };

    $('.grid-stack').gridstack(options);

    $("#grid").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true, 
        dataSource: [
            { Producto: "Set", Familia: "CS", Acero: "A16", Fibelines: "Auto 6-24", Spools: "4", Kgs: "109.3", M2: "76", Juntas: "16", Peqs: "64" },
            { Producto: "Fabricable", Familia: "CS", Acero: "A16", Fibelines: "Auto 6-24", Spools: "4", Kgs: "109.3", M2: "76", Juntas: "16", Peqs: "64" },

        ],
        navigatable: true,
        filterable: {
            extra: false
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        detailTemplate: kendo.template($("#templateGridNivelDos").html()),
        detailInit: RenderGridNivelDos,
        columns: [
            { field: "Producto", title: "Producto", filterable: true },
            { field: "Familia", title: "Familia", filterable: true },
            { field: "Acero", title: "Acero", filterable: true },
            { field: "Fibelines", title: "Fibeline", filterable: true },
            { field: "Spools", title: "Spools", filterable: false, width:"120px" },
            { field: "Kgs", title: "Kgs", filterable: false, width: "100px" },
            { field: "M2", title: "M2", filterable: false, width: "100px" },
            { field: "Juntas", title: "Juntas", filterable: false, width: "110px" },
            { field: "Peqs", title: "Peqs", filterable: false, width: "100px" }

        ]
    });
  
    $("#Proyectar").click(function () {
        $("#divNuevoMedioTransporte").kendoWindow({
            modal: true,
            // title:,
            resizable: false,
            visible: true,
            width: "auto",
            minWidth: "20%",

            position: {
                top: "1%",
                left: "1%"
            },
            actions: [
                "Close"
            ],
        }).data("kendoWindow");
        $("#divNuevoMedioTransporte").data("kendoWindow").title("Proyectar");
        $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
    });


    CrearContenedorProyecciones();
    CrearContenedorCapacidad();
    CrearContenedorTalleres();
    CalcularValoresProyecciones();
}

function CrearContenedorProyecciones() {
     
}

function CrearContenedorCapacidad() {

}

function CrearContenedorTalleres() {

}

function CalcularValoresProyecciones() { 
  
  
}