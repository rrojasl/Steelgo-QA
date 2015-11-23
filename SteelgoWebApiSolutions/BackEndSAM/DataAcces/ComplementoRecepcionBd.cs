using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam3;
using DatabaseManager.Sam2;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Transactions;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces
{
    public class ComplementoRecepcionBd
    {
        private static readonly object _mutex = new object();
        private static ComplementoRecepcionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ComplementoRecepcionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ComplementoRecepcionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ComplementoRecepcionBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListado(int folioCuantificacionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ItemCodeComplemento> listado = new List<ItemCodeComplemento>();
                    //Agregamos items con relacion con Folio Cuantificacion
                    listado.AddRange((from fc in ctx.Sam3_FolioCuantificacion
                                      join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                      join rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB on rfi.Rel_FolioCuantificacion_ItemCode_ID equals rel.Rel_FolioCuantificacion_ItemCode_ID
                                      join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                      join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on rfi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                      join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                      join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                      where fc.Activo && rfi.Activo && it.Activo && nu.Activo && rel.Activo && rid.Activo && d1.Activo && d2.Activo
                                      && fc.FolioCuantificacionID == folioCuantificacionID
                                      // && !it.TieneComplementoRecepcion
                                      select new ItemCodeComplemento
                                      {
                                          NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                          NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                          ItemCode = it.Codigo,
                                          NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                          Descripcion = it.DescripcionEspanol,
                                          Cedula = (from rfii in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                    join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rfii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                    join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                    join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                    join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                    join ced in ctx.Sam3_Cedula on ics.CedulaID equals ced.CedulaID
                                                    join d in ctx.Sam3_Diametro on ced.DiametroID equals d.DiametroID
                                                    where riit.Activo && rids.Activo && ics.Activo && ced.Activo
                                                    && rid.Rel_ItemCode_Diametro_ID == rdi.Rel_ItemCode_Diametro_ID
                                                    //&& rfii.Rel_FolioCuantificacion_ItemCode_ID == rfi.Rel_FolioCuantificacion_ItemCode_ID
                                                    select d.Valor.ToString() + "-" + ced.CedulaA + "-" + ced.CedulaB + "-" + ced.CedulaC).FirstOrDefault(),
                                          TipoAcero = (from rfii in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                       join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rfii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                       join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                       join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                       join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                       join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                                                       where riit.Activo && rids.Activo && ics.Activo && fa.Activo
                                                       && rid.Rel_ItemCode_Diametro_ID == rdi.Rel_ItemCode_Diametro_ID
                                                       //&& rfii.Rel_FolioCuantificacion_ItemCode_ID == rfi.Rel_FolioCuantificacion_ItemCode_ID
                                                       select fa.Nombre).FirstOrDefault(),
                                          ItemCodeSteelgoID = (from rfii in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                               join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rfii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                               join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                               join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                               join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                               join ced in ctx.Sam3_Cedula on ics.CedulaID equals ced.CedulaID
                                                               join d in ctx.Sam3_Diametro on ced.DiametroID equals d.DiametroID
                                                               where riit.Activo && rids.Activo && ics.Activo && ced.Activo
                                                               && rid.Rel_ItemCode_Diametro_ID == rdi.Rel_ItemCode_Diametro_ID
                                                               select ics.ItemCodeSteelgoID).FirstOrDefault(),
                                          D1 = d1.Valor.ToString(),
                                          D2 = d2.Valor.ToString(),
                                          ItemCodeID = it.ItemCodeID,
                                          ProyectoID = it.ProyectoID,
                                          Cantidad = rfi.Cantidad,
                                          MM = rfi.MM.ToString(),
                                          Colada = nu.Sam3_Colada.NumeroColada,
                                          EstatusDocumental =  nu.EstatusDocumental,
                                          EstatusFisico = nu.EstatusFisico,
                                          TipoUso = nu.Sam3_TipoUso.Nombre,
                                          RelFCID = rel.Rel_FolioCuantificacion_ItemCode_ID.ToString(),
                                          RelNUFCBID = rel.Rel_NumeroUnico_RelFC_RelB_ID.ToString(),
                                          ColadaOriginal = nu.Sam3_Colada.NumeroColada,
                                          TieneComplementoRecepcion = it.TieneComplementoRecepcion ? "Si" : "No"
                                      }).AsParallel().Distinct().ToList());

                    //agregar items en bulto
                    listado.AddRange((from fc in ctx.Sam3_FolioCuantificacion
                                      join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                      join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                      join rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB on rbi.Rel_Bulto_ItemCode_ID equals rel.Rel_Bulto_ItemCode_ID
                                      join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                      join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on rbi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                      join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                      join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                      where fc.Activo && b.Activo && rbi.Activo && it.Activo && nu.Activo && rel.Activo && rid.Activo && d1.Activo && d2.Activo
                                      && fc.FolioCuantificacionID == folioCuantificacionID
                                      //&& !it.TieneComplementoRecepcion
                                      select new ItemCodeComplemento
                                      {
                                          NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                          NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                          ItemCode = it.Codigo,
                                          NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                          Descripcion = it.DescripcionEspanol,
                                          Cedula = (from rbii in ctx.Sam3_Rel_Bulto_ItemCode
                                                    join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rbii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                    join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                    join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                    join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                    join ced in ctx.Sam3_Cedula on ics.CedulaID equals ced.CedulaID
                                                    join d in ctx.Sam3_Diametro on ced.DiametroID equals d.DiametroID
                                                    where riit.Activo && rids.Activo && ics.Activo && ced.Activo
                                                    && rid.Rel_ItemCode_Diametro_ID == rbii.Rel_ItemCode_Diametro_ID
                                                    select d.Valor.ToString() + "-" + ced.CedulaA + "-" + ced.CedulaB + "-" + ced.CedulaC).FirstOrDefault(),
                                          TipoAcero = (from rbii in ctx.Sam3_Rel_Bulto_ItemCode
                                                       join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rbii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                       join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                       join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                       join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                       join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                                                       where riit.Activo && rids.Activo && ics.Activo && fa.Activo
                                                       && rid.Rel_ItemCode_Diametro_ID == rbii.Rel_ItemCode_Diametro_ID
                                                       select fa.Nombre).FirstOrDefault(),
                                          ItemCodeSteelgoID = (from rbii in ctx.Sam3_Rel_Bulto_ItemCode
                                                               join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rbii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                               join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                               join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                               join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                               join ced in ctx.Sam3_Cedula on ics.CedulaID equals ced.CedulaID
                                                               join d in ctx.Sam3_Diametro on ced.DiametroID equals d.DiametroID
                                                               where riit.Activo && rids.Activo && ics.Activo && ced.Activo
                                                               && rid.Rel_ItemCode_Diametro_ID == rbii.Rel_ItemCode_Diametro_ID
                                                               select ics.ItemCodeSteelgoID).FirstOrDefault(),
                                          D1 = d1.Valor.ToString(),
                                          D2 = d2.Valor.ToString(),
                                          ItemCodeID = it.ItemCodeID,
                                          ProyectoID = it.ProyectoID,
                                          Cantidad = rbi.Cantidad,
                                          MM = rbi.MM.ToString(),
                                          Colada = nu.Sam3_Colada.NumeroColada,
                                          EstatusDocumental = nu.EstatusDocumental,
                                          EstatusFisico = nu.EstatusFisico,
                                          TipoUso = nu.Sam3_TipoUso.Nombre,
                                          RelNUFCBID = rel.Rel_NumeroUnico_RelFC_RelB_ID.ToString(),
                                          RelBID = rel.Rel_Bulto_ItemCode_ID.ToString(),
                                          ColadaOriginal = nu.Sam3_Colada.NumeroColada,
                                          TieneComplementoRecepcion = it.TieneComplementoRecepcion ? "Si" : "No"
                                      }
                        ).AsParallel().Distinct().ToList());

                    foreach (ItemCodeComplemento item in listado)
                    {
                        int numeroDigitos = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == item.ProyectoID)
                            .Select(x => x.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                        string formato = "D" + numeroDigitos.ToString();

                        string[] elementos = item.NumeroUnico.Split('-').ToArray();

                        int temp = Convert.ToInt32(elementos[1]);

                        item.NumeroUnico = elementos[0] + "-" + temp.ToString(formato);

                        item.Cedula = item.ItemCodeSteelgoID == 1 ? "" : item.Cedula;

                        item.TipoAcero = item.ItemCodeSteelgoID == 1 ? "" : item.TipoAcero;
                    }

                    listado = listado.OrderBy(x => x.NumeroUnico).ToList();

                    List<object> lstReturn = new List<object>();
                    string Estatus = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == folioCuantificacionID)
                        .Select(x => x.Estatus).SingleOrDefault();

                    lstReturn.Add(Estatus);
                    lstReturn.Add(listado);

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(lstReturn);
#endif

                    return lstReturn;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        private ItemCodeComplemento ObtenerPropiedadesJson(int relFCID = 0, int RelBID = 0, int RelNUFCBID = 0)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ItemCodeComplemento item = new ItemCodeComplemento();
                    //Agregamos items con relacion con Folio Cuantificacion
                    if (relFCID > 0)
                    {
                        item = (from rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB
                                join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on rel.Rel_FolioCuantificacion_ItemCode_ID equals rfi.Rel_FolioCuantificacion_ItemCode_ID
                                join rid in ctx.Sam3_Rel_ItemCode_Diametro on rfi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                join it in ctx.Sam3_ItemCode on rid.ItemCodeID equals it.ItemCodeID
                                join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                where it.Activo && nu.Activo && rel.Activo && rfi.Activo && rid.Activo
                                && rel.Rel_NumeroUnico_RelFC_RelB_ID == RelNUFCBID
                                select new ItemCodeComplemento
                                {
                                    NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                    NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                    ItemCode = it.Codigo,
                                    NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                    Descripcion = it.DescripcionEspanol,
                                    Cedula = (from rfii in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                              join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rfii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                              join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                              join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                              join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                              join ced in ctx.Sam3_Cedula on ics.CedulaID equals ced.CedulaID
                                              join d in ctx.Sam3_Diametro on ced.DiametroID equals d.DiametroID
                                              where riit.Activo && rids.Activo && ics.Activo && ced.Activo
                                              && rfii.Rel_FolioCuantificacion_ItemCode_ID == rfi.Rel_FolioCuantificacion_ItemCode_ID
                                              select d.Valor.ToString() + "-" + ced.CedulaA + "-" + ced.CedulaB + "-" + ced.CedulaC).FirstOrDefault(),
                                    TipoAcero = (from rfii in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                 join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rfii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                 join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                 join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                 join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                 join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                                                 where riit.Activo && rids.Activo && ics.Activo && fa.Activo
                                                 && rfii.Rel_FolioCuantificacion_ItemCode_ID == rfi.Rel_FolioCuantificacion_ItemCode_ID
                                                 select fa.Nombre).FirstOrDefault(),
                                    D1 = d1.Valor.ToString(),
                                    D2 = d2.Valor.ToString(),
                                    ItemCodeID = it.ItemCodeID,
                                    ProyectoID = it.ProyectoID,
                                    Cantidad = rfi.Cantidad,
                                    MM = rfi.MM.ToString(),
                                    Colada = (from c in ctx.Sam3_Colada
                                              where c.ColadaID == rfi.ColadaID
                                              select c.NumeroColada).FirstOrDefault(),
                                    EstatusDocumental = nu.EstatusDocumental,
                                    EstatusFisico = nu.EstatusFisico,
                                    TipoUso = (from tu in ctx.Sam3_TipoUso
                                               where tu.Activo && tu.TipoUsoID == nu.TipoUsoID
                                               select tu.Nombre).FirstOrDefault(),
                                    ColadaID = rfi.ColadaID,
                                    RelFCID = rfi.Rel_FolioCuantificacion_ItemCode_ID.ToString(),
                                    RelNUFCBID = rel.Rel_NumeroUnico_RelFC_RelB_ID.ToString(),
                                    Titulo = "",
                                    DescripcionIncidencia = "",
                                    ColadaOriginal = (from c in ctx.Sam3_Colada
                                                      where c.ColadaID == rfi.ColadaID
                                                      select c.NumeroColada).FirstOrDefault(),
                                }).AsParallel().SingleOrDefault();
                    }

                    if (RelBID > 0)
                    {
                        item = (from rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB
                                join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                join rbi in ctx.Sam3_Rel_Bulto_ItemCode on rel.Rel_Bulto_ItemCode_ID equals rbi.Rel_Bulto_ItemCode_ID
                                join rid in ctx.Sam3_Rel_ItemCode_Diametro on rbi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                join it in ctx.Sam3_ItemCode on rid.ItemCodeID equals it.ItemCodeID
                                join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                where it.Activo && nu.Activo && rel.Activo && rbi.Activo && rid.Activo
                                && rel.Rel_NumeroUnico_RelFC_RelB_ID == RelNUFCBID
                                select new ItemCodeComplemento
                                {
                                    NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                    NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                    ItemCode = it.Codigo,
                                    NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                    Descripcion = it.DescripcionEspanol,
                                    Cedula = (from rbii in ctx.Sam3_Rel_Bulto_ItemCode
                                              join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rbii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                              join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                              join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                              join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                              join ced in ctx.Sam3_Cedula on ics.CedulaID equals ced.CedulaID
                                              join d in ctx.Sam3_Diametro on ced.DiametroID equals d.DiametroID
                                              where riit.Activo && rids.Activo && ics.Activo && ced.Activo
                                              && rbii.Rel_Bulto_ItemCode_ID == rbi.Rel_Bulto_ItemCode_ID
                                              select d.Valor.ToString() + "-" + ced.CedulaA + "-" + ced.CedulaB + "-" + ced.CedulaC).FirstOrDefault(),
                                    TipoAcero = (from rbii in ctx.Sam3_Rel_Bulto_ItemCode
                                                 join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rbii.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                 join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rdi.Rel_ItemCode_Diametro_ID equals riit.Rel_ItemCode_Diametro_ID
                                                 join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on riit.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                 join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                 join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                                                 where riit.Activo && rids.Activo && ics.Activo && fa.Activo
                                                 && rbii.Rel_Bulto_ItemCode_ID == rbi.Rel_Bulto_ItemCode_ID
                                                 select fa.Nombre).FirstOrDefault(),
                                    D1 = d1.Valor.ToString(),
                                    D2 = d2.Valor.ToString(),
                                    ItemCodeID = it.ItemCodeID,
                                    ProyectoID = it.ProyectoID,
                                    Cantidad = rbi.Cantidad,
                                    MM = rbi.MM.ToString(),
                                    Colada = (from c in ctx.Sam3_Colada
                                              where c.ColadaID == rbi.ColadaID
                                              select c.NumeroColada).FirstOrDefault(),
                                    EstatusDocumental = nu.EstatusDocumental,
                                    EstatusFisico = nu.EstatusFisico,
                                    TipoUso = (from tu in ctx.Sam3_TipoUso 
                                               where tu.Activo && tu.TipoUsoID == nu.TipoUsoID
                                               select tu.Nombre).FirstOrDefault(),
                                    ColadaID = rbi.ColadaID,
                                    RelBID = rbi.Rel_Bulto_ItemCode_ID.ToString(),
                                    RelNUFCBID = rel.Rel_NumeroUnico_RelFC_RelB_ID.ToString(),
                                    Titulo = "",
                                    DescripcionIncidencia = "",
                                    ColadaOriginal = (from c in ctx.Sam3_Colada
                                                      where c.ColadaID == rbi.ColadaID
                                                      select c.NumeroColada).FirstOrDefault(),
                                }).AsParallel().SingleOrDefault();
                    }

                    if (item == null)
                    {
                        throw new Exception("Error al obtener las propiedades del Número único");
                    }


                    int numeroDigitos = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == item.ProyectoID)
                        .Select(x => x.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                    string formato = "D" + numeroDigitos.ToString();

                    string[] elementos = item.NumeroUnico.Split('-').ToArray();

                    int temp = Convert.ToInt32(elementos[1]);

                    item.NumeroUnico = elementos[0] + "-" + temp.ToString(formato);

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(item);
#endif

                    return item;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return null;
            }
        }

        public object GuardarComplemento(int tipoGuardadoID, ItemCodeComplemento itemCodeJson, Sam3_Usuario usuario)
        {
            try
            {
                int relFcId = itemCodeJson.RelFCID != null && itemCodeJson.RelFCID != "" ? Convert.ToInt32(itemCodeJson.RelFCID) : 0;
                int relBId = itemCodeJson.RelBID != null && itemCodeJson.RelBID != "" ? Convert.ToInt32(itemCodeJson.RelBID) : 0;
                int relNuId = itemCodeJson.RelNUFCBID != null && itemCodeJson.RelNUFCBID != "" ? Convert.ToInt32(itemCodeJson.RelNUFCBID) : 0;

                TransactionalInformation result = new TransactionalInformation();
                    using (SamContext ctx = new SamContext())
                    {
                        using (var ctx_tran = ctx.Database.BeginTransaction())
                        {
                            using (Sam2Context ctx2 = new Sam2Context())
                            {
                                using (var ctx2_tran = ctx2.Database.BeginTransaction())
                                {
                                    Sam3_ItemCode actualizaItem = ctx.Sam3_ItemCode
                                                .Where(x => x.ItemCodeID == itemCodeJson.ItemCodeID && x.Activo).SingleOrDefault();

                                    string[] elementos = itemCodeJson.NumeroUnico.Split('-').ToArray();
                                    int temp = Convert.ToInt32(elementos[1]);
                                    string prefijo = elementos[0];

                                    Sam3_NumeroUnico actualizaNU = ctx.Sam3_NumeroUnico
                                        .Where(x => x.NumeroUnicoID.ToString() == itemCodeJson.NumeroUnicoID).SingleOrDefault();

                                    int coladaID = (from c in ctx.Sam3_Colada
                                                    where c.NumeroColada == itemCodeJson.Colada
                                                    && c.ProyectoID == itemCodeJson.ProyectoID
                                                    select c.ColadaID).AsParallel().SingleOrDefault();

                                    if (itemCodeJson.Titulo != "" && itemCodeJson.Titulo != null)
                                    {
                                        Sam3_Incidencia incidencia = new Sam3_Incidencia();
                                        incidencia.Activo = true;
                                        incidencia.ClasificacionID = (from c in ctx.Sam3_ClasificacionIncidencia
                                                                      where c.Activo && c.Nombre == "Materiales"
                                                                      select c.ClasificacionIncidenciaID).AsParallel().SingleOrDefault();
                                        incidencia.Descripcion = itemCodeJson.DescripcionIncidencia;
                                        incidencia.Estatus = "Abierta";
                                        incidencia.FechaCreacion = DateTime.Now;
                                        incidencia.FechaModificacion = DateTime.Now;
                                        incidencia.TipoIncidenciaID = (from tp in ctx.Sam3_TipoIncidencia
                                                                       where tp.Activo && tp.Nombre == "Número único"
                                                                       select tp.TipoIncidenciaID).AsParallel().SingleOrDefault();
                                        incidencia.Titulo = itemCodeJson.Titulo;
                                        incidencia.UsuarioID = usuario.UsuarioID;
                                        incidencia.Version = 1;

                                        ctx.Sam3_Incidencia.Add(incidencia);
                                        ctx.SaveChanges();


                                        Sam3_Rel_Incidencia_NumeroUnico nuevaRelIncidencia = new Sam3_Rel_Incidencia_NumeroUnico();
                                        nuevaRelIncidencia.Activo = true;
                                        nuevaRelIncidencia.FechaModificacion = DateTime.Now;
                                        nuevaRelIncidencia.IncidenciaID = incidencia.IncidenciaID;
                                        nuevaRelIncidencia.NumeroUnicoID = actualizaNU.NumeroUnicoID;
                                        nuevaRelIncidencia.UsuarioModificacion = usuario.UsuarioID;

                                        ctx.Sam3_Rel_Incidencia_NumeroUnico.Add(nuevaRelIncidencia);
                                        ctx.SaveChanges();
                                    }

                                    switch (tipoGuardadoID)
                                    {
                                        case 1: // Guardado Parcial

                                            //Actualizo el numero Unico
                                            if (actualizaNU != null)
                                            {
                                                actualizaNU.NumeroUnicoCliente = itemCodeJson.NumeroUnicoCliente;
                                                actualizaNU.FechaModificacion = DateTime.Now;
                                                actualizaNU.UsuarioModificacion = usuario.UsuarioID;
                                                actualizaNU.ColadaID = coladaID;
                                                actualizaNU.EstatusFisico = itemCodeJson.EstatusFisico;
                                                actualizaNU.EstatusDocumental = itemCodeJson.EstatusDocumental;
                                                actualizaNU.TipoUsoID = itemCodeJson.TipoUso != "" && itemCodeJson.TipoUso != null ?
                                                    (from tp in ctx.Sam3_TipoUso
                                                     where tp.Activo && tp.Nombre == itemCodeJson.TipoUso
                                                     select tp.TipoUsoID).SingleOrDefault() : 1;

                                                #region Actualizar MM
                                                //Actuaalizar MM
                                                int milimetros = itemCodeJson.MM != null && itemCodeJson.MM != "" ? Convert.ToInt32(itemCodeJson.MM) : 0;
                                                int cantidadRecibida = ctx.Sam3_NumeroUnicoInventario
                                                    .Where(x => x.NumeroUnicoID == actualizaNU.NumeroUnicoID).Select(x => x.CantidadRecibida).AsParallel().SingleOrDefault();
                                                int inventarioCongelado = 0;

                                                //si los milimetros son mayores a 0 y si son diferentes del inventario recibido en cuantificacion
                                                if (milimetros > 0 && milimetros != cantidadRecibida )
                                                {
                                                    if (actualizaNU.Sam3_ItemCode.TipoMaterialID == 1) // tubo
                                                    {
                                                        bool aumento = cantidadRecibida < milimetros;
                                                        int tipoMovimeintoID = 0;
                                                        if (inventarioCongelado == 0) // si el numerounico no tiene congelado
                                                        {
                                     
                                                            #region actualizar Sam3
                                                            actualizaNU.Sam3_NumeroUnicoInventario.CantidadRecibida = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.InventarioBuenEstado = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.InventarioFisico = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.InventarioDisponibleCruce = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.UsuarioModificacion = usuario.UsuarioID;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.FechaModificacion = DateTime.Now;

                                                            Sam3_NumeroUnicoSegmento segmento = actualizaNU.Sam3_NumeroUnicoSegmento.Where(x => x.Segmento == "A").SingleOrDefault();
                                                            segmento.InventarioBuenEstado = milimetros;
                                                            segmento.InventarioDisponibleCruce = milimetros;
                                                            segmento.InventarioFisico = milimetros;
                                                            segmento.FechaModificacion = DateTime.Now;
                                                            segmento.UsuarioModificacion = usuario.UsuarioID;

                                                            Sam3_NumeroUnicoMovimiento movimiento = new Sam3_NumeroUnicoMovimiento();
                                                            movimiento.Activo = true;
                                                            movimiento.Estatus = "A";
                                                            movimiento.FechaModificacion = DateTime.Now;
                                                            movimiento.FechaMovimiento = DateTime.Now;
                                                            movimiento.NumeroUnicoID = actualizaNU.NumeroUnicoID;
                                                            movimiento.ProyectoID = actualizaNU.ProyectoID;
                                                            movimiento.Referencia = "Complemento de recepcion";
                                                            movimiento.Segmento = "A";
                                                            movimiento.UsuarioModificacion = usuario.UsuarioID;

                                                            if (aumento)
                                                            {
                                                                int diferencia = milimetros - cantidadRecibida;
                                                                movimiento.Cantidad = diferencia;
                                                                movimiento.TipoMovimientoID = (from tp in ctx.Sam3_TipoMovimiento
                                                                                               where tp.Activo
                                                                                               && tp.Nombre == "Aumento de Inventario por Actualización MM"
                                                                                               select tp.TipoMovimientoID).AsParallel().SingleOrDefault();
                                                            }
                                                            else
                                                            {
                                                                int diferencia = cantidadRecibida - milimetros;
                                                                movimiento.Cantidad = diferencia;
                                                                movimiento.TipoMovimientoID = (from tp in ctx.Sam3_TipoMovimiento
                                                                                               where tp.Activo
                                                                                               && tp.Nombre == "Reducción de Inventario por Actualización MM"
                                                                                               select tp.TipoMovimientoID).AsParallel().SingleOrDefault();
                                                            }

                                                            ctx.Sam3_NumeroUnicoMovimiento.Add(movimiento);
                                                            ctx.SaveChanges();
                                                            #endregion

                                                            #region Actualizar Sam2
                                                            int numeroUnicoIDSam2 = (from eq in ctx.Sam3_EquivalenciaNumeroUnico
                                                                                     where eq.Activo && eq.Sam3_NumeroUnicoID == actualizaNU.NumeroUnicoID
                                                                                     select eq.Sam2_NumeroUnicoID).AsParallel().SingleOrDefault();

                                                            NumeroUnico sam2_numeroUnico = ctx2.NumeroUnico.Where(x => x.NumeroUnicoID == numeroUnicoIDSam2).AsParallel().SingleOrDefault();

                                                            sam2_numeroUnico.NumeroUnicoInventario.InventarioBuenEstado = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.InventarioDisponibleCruce = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.InventarioFisico = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.CantidadRecibida = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.FechaModificacion = DateTime.Now;

                                                            NumeroUnicoSegmento segmentoSam2 = sam2_numeroUnico.NumeroUnicoSegmento.Where(x => x.Segmento == "A")
                                                                .SingleOrDefault();
                                                            segmentoSam2.InventarioBuenEstado = milimetros;
                                                            segmentoSam2.InventarioDisponibleCruce = milimetros;
                                                            segmentoSam2.InventarioFisico = milimetros;
                                                            segmentoSam2.FechaModificacion = DateTime.Now;
                                                            ctx2.SaveChanges();
                                                            #endregion

                                                        }
                                                        else
                                                        {
                                                            throw new Exception("El Número Único ya cuenta con congelados, no se puede actualizar el inventario por este medio");
                                                        }

                                                        #region ActualizarRelacion IT

                                                        if (relBId > 0)
                                                        {
                                                            Sam3_Rel_Bulto_ItemCode relBulto = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.Rel_Bulto_ItemCode_ID == relBId)
                                                                .AsParallel().SingleOrDefault();
                                                            relBulto.MM = milimetros;
                                                            relBulto.FechaModificacion = DateTime.Now;
                                                            relBulto.UsuarioModificacion = usuario.UsuarioID;
                                                        }

                                                        if (relFcId > 0)
                                                        {
                                                            Sam3_Rel_FolioCuantificacion_ItemCode relitemCode = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                                .Where(x => x.Rel_FolioCuantificacion_ItemCode_ID == relFcId).AsParallel().SingleOrDefault();
                                                            relitemCode.MM = milimetros;
                                                            relitemCode.FechaModificacion = DateTime.Now;
                                                            relitemCode.UsuarioModificacion = usuario.UsuarioID;
                                                        }

                                                        ctx.SaveChanges();

                                                        #endregion
                                                    }
                                                }
                                                #endregion
                                            }
                                            else
                                            {
                                                throw new Exception(string.Format("Error al actualizar el número único {}", itemCodeJson.NumeroUnico));
                                            }

                                            if (actualizaItem != null)
                                            {
                                                actualizaItem.TieneComplementoRecepcion = false;
                                                actualizaItem.FechaModificacion = DateTime.Now;
                                                actualizaItem.UsuarioModificacion = usuario.UsuarioID;
                                            }
                                            else
                                            {
                                                throw new Exception(string.Format("Error al actualizar La informacion del ItemCode {}", itemCodeJson.ItemCode));
                                            }

                                            if (!ctx.Sam3_Rel_Itemcode_Colada.Where(x => x.ColadaID == coladaID && x.ItemCodeID == actualizaItem.ItemCodeID).Any())
                                            {
                                                Sam3_Rel_Itemcode_Colada nuevarel = new Sam3_Rel_Itemcode_Colada();
                                                nuevarel.Activo = true;
                                                nuevarel.ColadaID = coladaID;
                                                nuevarel.FechaModificacion = DateTime.Now;
                                                nuevarel.ItemCodeID = actualizaItem.ItemCodeID;
                                                nuevarel.UsuarioModificacion = usuario.UsuarioID;

                                                ctx.Sam3_Rel_Itemcode_Colada.Add(nuevarel);
                                                ctx.SaveChanges();
                                            }

                                            ctx.SaveChanges();
                                            itemCodeJson.TieneError = false;

                                            break;
                                        case 2: // Guardar y terminar

                                            //Actualizo el numero Unico
                                            if (actualizaNU != null)
                                            {
                                                actualizaNU.NumeroUnicoCliente = itemCodeJson.NumeroUnicoCliente;
                                                actualizaNU.FechaModificacion = DateTime.Now;
                                                actualizaNU.UsuarioModificacion = usuario.UsuarioID;
                                                actualizaNU.ColadaID = coladaID;
                                                actualizaNU.EstatusFisico = itemCodeJson.EstatusFisico;
                                                actualizaNU.EstatusDocumental = itemCodeJson.EstatusDocumental;
                                                actualizaNU.TipoUsoID = itemCodeJson.TipoUso != "" && itemCodeJson.TipoUso != null ?
                                                    (from tp in ctx.Sam3_TipoUso
                                                     where tp.Activo && tp.Nombre == itemCodeJson.TipoUso
                                                     select tp.TipoUsoID).SingleOrDefault() : 1;

                                                #region Actualizar MM
                                                //Actuaalizar MM
                                                int milimetros = itemCodeJson.MM != null && itemCodeJson.MM != "" ? Convert.ToInt32(itemCodeJson.MM) : 0;
                                                int cantidadRecibida = ctx.Sam3_NumeroUnicoInventario
                                                    .Where(x => x.NumeroUnicoID == actualizaNU.NumeroUnicoID).Select(x => x.CantidadRecibida).AsParallel().SingleOrDefault();
                                                int inventarioCongelado = 0;

                                                //si los milimetros son mayores a 0 y si son diferentes del inventario recibido en cuantificacion
                                                if (milimetros > 0 && milimetros != cantidadRecibida)
                                                {
                                                    if (actualizaNU.Sam3_ItemCode.TipoMaterialID == 1) // tubo
                                                    {
                                                        bool aumento = cantidadRecibida < milimetros;
                                                        int tipoMovimeintoID = 0;
                                                        if (inventarioCongelado == 0) // si el numerounico no tiene congelado
                                                        {

                                                            #region actualizar Sam3
                                                            actualizaNU.Sam3_NumeroUnicoInventario.CantidadRecibida = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.InventarioBuenEstado = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.InventarioFisico = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.InventarioDisponibleCruce = milimetros;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.UsuarioModificacion = usuario.UsuarioID;
                                                            actualizaNU.Sam3_NumeroUnicoInventario.FechaModificacion = DateTime.Now;

                                                            Sam3_NumeroUnicoSegmento segmento = actualizaNU.Sam3_NumeroUnicoSegmento.Where(x => x.Segmento == "A").SingleOrDefault();
                                                            segmento.InventarioBuenEstado = milimetros;
                                                            segmento.InventarioDisponibleCruce = milimetros;
                                                            segmento.InventarioFisico = milimetros;
                                                            segmento.FechaModificacion = DateTime.Now;
                                                            segmento.UsuarioModificacion = usuario.UsuarioID;

                                                            Sam3_NumeroUnicoMovimiento movimiento = new Sam3_NumeroUnicoMovimiento();
                                                            movimiento.Activo = true;
                                                            movimiento.Estatus = "A";
                                                            movimiento.FechaModificacion = DateTime.Now;
                                                            movimiento.FechaMovimiento = DateTime.Now;
                                                            movimiento.NumeroUnicoID = actualizaNU.NumeroUnicoID;
                                                            movimiento.ProyectoID = actualizaNU.ProyectoID;
                                                            movimiento.Referencia = "Complemento de recepcion";
                                                            movimiento.Segmento = "A";
                                                            movimiento.UsuarioModificacion = usuario.UsuarioID;

                                                            if (aumento)
                                                            {
                                                                int diferencia = milimetros - cantidadRecibida;
                                                                movimiento.Cantidad = diferencia;
                                                                movimiento.TipoMovimientoID = (from tp in ctx.Sam3_TipoMovimiento
                                                                                               where tp.Activo
                                                                                               && tp.Nombre == "Aumento de Inventario por Actualización MM"
                                                                                               select tp.TipoMovimientoID).AsParallel().SingleOrDefault();
                                                            }
                                                            else
                                                            {
                                                                int diferencia = cantidadRecibida - milimetros;
                                                                movimiento.Cantidad = diferencia;
                                                                movimiento.TipoMovimientoID = (from tp in ctx.Sam3_TipoMovimiento
                                                                                               where tp.Activo
                                                                                               && tp.Nombre == "Reducción de Inventario por Actualización MM"
                                                                                               select tp.TipoMovimientoID).AsParallel().SingleOrDefault();
                                                            }

                                                            ctx.Sam3_NumeroUnicoMovimiento.Add(movimiento);
                                                            ctx.SaveChanges();
                                                            #endregion

                                                            #region Actualizar Sam2
                                                            int numeroUnicoIDSam2 = (from eq in ctx.Sam3_EquivalenciaNumeroUnico
                                                                                     where eq.Activo && eq.Sam3_NumeroUnicoID == actualizaNU.NumeroUnicoID
                                                                                     select eq.Sam2_NumeroUnicoID).AsParallel().SingleOrDefault();

                                                            NumeroUnico sam2_numeroUnico = ctx2.NumeroUnico.Where(x => x.NumeroUnicoID == numeroUnicoIDSam2).AsParallel().SingleOrDefault();

                                                            sam2_numeroUnico.NumeroUnicoInventario.InventarioBuenEstado = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.InventarioDisponibleCruce = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.InventarioFisico = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.CantidadRecibida = milimetros;
                                                            sam2_numeroUnico.NumeroUnicoInventario.FechaModificacion = DateTime.Now;

                                                            NumeroUnicoSegmento segmentoSam2 = sam2_numeroUnico.NumeroUnicoSegmento.Where(x => x.Segmento == "A")
                                                                .SingleOrDefault();
                                                            segmentoSam2.InventarioBuenEstado = milimetros;
                                                            segmentoSam2.InventarioDisponibleCruce = milimetros;
                                                            segmentoSam2.InventarioFisico = milimetros;
                                                            segmentoSam2.FechaModificacion = DateTime.Now;

                                                            ctx2.SaveChanges();
                                                            #endregion

                                                        }
                                                        else
                                                        {
                                                            throw new Exception("El Número Único ya cuenta con congelados, no se puede actualizar el inventario por este medio");
                                                        }

                                                        #region ActualizarRelacion IT

                                                        if (relBId > 0)
                                                        {
                                                            Sam3_Rel_Bulto_ItemCode relBulto = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.Rel_Bulto_ItemCode_ID == relBId)
                                                                .AsParallel().SingleOrDefault();
                                                            relBulto.MM = milimetros;
                                                            relBulto.FechaModificacion = DateTime.Now;
                                                            relBulto.UsuarioModificacion = usuario.UsuarioID;
                                                        }

                                                        if (relFcId > 0)
                                                        {
                                                            Sam3_Rel_FolioCuantificacion_ItemCode relitemCode = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                                .Where(x => x.Rel_FolioCuantificacion_ItemCode_ID == relFcId).AsParallel().SingleOrDefault();
                                                            relitemCode.MM = milimetros;
                                                            relitemCode.FechaModificacion = DateTime.Now;
                                                            relitemCode.UsuarioModificacion = usuario.UsuarioID;
                                                        }

                                                        ctx.SaveChanges();

                                                        #endregion
                                                    }
                                                }
                                                #endregion
                                            }
                                            else
                                            {
                                                throw new Exception(string.Format("Error al actualizar el número único {}", itemCodeJson.NumeroUnico));
                                            }

                                            if (actualizaItem != null)
                                            {
                                                if (itemCodeJson.MM == "" || itemCodeJson.Colada == "" || itemCodeJson.EstatusFisico == ""
                                                    || itemCodeJson.EstatusDocumental == "" || itemCodeJson.TipoUso == "")
                                                {
                                                    throw new Exception(string.Format("Datos Incompletos"));
                                                }

                                                actualizaItem.TieneComplementoRecepcion = true;
                                                actualizaItem.FechaModificacion = DateTime.Now;
                                                actualizaItem.UsuarioModificacion = usuario.UsuarioID;
                                            }
                                            else
                                            {
                                                throw new Exception(string.Format("Error al actualizar La informacion del ItemCode {}", itemCodeJson.ItemCode));
                                            }

                                            ctx.SaveChanges();

                                            if (!ctx.Sam3_Rel_Itemcode_Colada.Where(x => x.ColadaID == coladaID && x.ItemCodeID == actualizaItem.ItemCodeID).Any())
                                            {
                                                Sam3_Rel_Itemcode_Colada nuevarel = new Sam3_Rel_Itemcode_Colada();
                                                nuevarel.Activo = true;
                                                nuevarel.ColadaID = coladaID;
                                                nuevarel.FechaModificacion = DateTime.Now;
                                                nuevarel.ItemCodeID = actualizaItem.ItemCodeID;
                                                nuevarel.UsuarioModificacion = usuario.UsuarioID;

                                                ctx.Sam3_Rel_Itemcode_Colada.Add(nuevarel);
                                                ctx.SaveChanges();
                                            }

                                            itemCodeJson.TieneError = false;

                                            break;
                                        default:

                                            result.ReturnMessage.Add("No se encontro el tipo de guardado");
                                            result.ReturnCode = 500;
                                            result.ReturnStatus = false;
                                            result.IsAuthenicated = true;

                                            return result;
                                    } // Fin switch
                                    ctx_tran.Commit();  
                                    ctx2_tran.Commit();
                                } // tran sam2
                            } // sam2
                        } // tran sam3
                    }// fin using SAM

                    itemCodeJson = ObtenerPropiedadesJson(relFcId, relBId, relNuId);
                    return itemCodeJson;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                itemCodeJson.TieneError = true;
                return itemCodeJson;
            }
        }
    }
}