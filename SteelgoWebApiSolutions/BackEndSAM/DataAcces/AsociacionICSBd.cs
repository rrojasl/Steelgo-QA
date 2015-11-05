using BackEndSAM.Models;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class AsociacionICSBd
    {
        private static readonly object _mutex = new object();
        private static AsociacionICSBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private AsociacionICSBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static AsociacionICSBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AsociacionICSBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtener los item codes a mostrar en el combo
        /// de asociacion ICS - IC
        /// </summary>
        /// <returns></returns>
        public object obtenerListadoItemCodes()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> itemCodes = (from icd in ctx.Sam3_Rel_ItemCode_Diametro
                                                   join ic in ctx.Sam3_ItemCode on icd.ItemCodeID equals ic.ItemCodeID
                                                   where icd.Activo && ic.Activo
                                                   select new ListaCombos
                                                   {
                                                       id = icd.ItemCodeID.ToString(),
                                                       value = ic.Codigo
                                                   }).AsParallel().GroupBy(x => x.value).Select(x => x.First()).ToList();
                    return itemCodes;
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

        /// <summary>
        /// Obtener los diametros para el combo
        /// diametro 1 en asociar Item code steelgo vs item code
        /// </summary>
        /// <param name="itemCode"></param>
        /// <returns></returns>
        public object ObtenerDiametros1(int itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> diametros = (from ricd in ctx.Sam3_Rel_ItemCode_Diametro
                                                   join d in ctx.Sam3_Diametro on ricd.Diametro1ID equals d.DiametroID
                                                   where ricd.Activo && d.Activo && ricd.ItemCodeID == itemCode
                                                   select new ListaCombos
                                                   {
                                                       id = d.DiametroID.ToString(),
                                                       value = d.Valor.ToString()
                                                   }).AsParallel().ToList();

                    return diametros;
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

        public object ObtenerDiametros2(int itemCode, int diametro1ID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> diametros = (from ricd in ctx.Sam3_Rel_ItemCode_Diametro
                                                   join d in ctx.Sam3_Diametro on ricd.Diametro2ID equals d.DiametroID
                                                   where ricd.Activo && d.Activo && ricd.ItemCodeID == itemCode && ricd.Diametro1ID == diametro1ID
                                                   select new ListaCombos
                                                   {
                                                       id = d.DiametroID.ToString(),
                                                       value = d.Valor.ToString()
                                                   }).AsParallel().ToList();
                    return diametros;
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

        /// <summary>
        /// Obtengo la informacion del item code seleccionado en el combo
        /// Pantalla Asociacion ICs
        /// </summary>
        /// <param name="itemCodeID"></param>
        /// <returns></returns>
        public object obtenerInformacionItemCode(int itemCodeID, int diametro1, int diametro2)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int relIC_Diam = (from ricd in ctx.Sam3_Rel_ItemCode_Diametro
                                      where ricd.Activo && ricd.Diametro1ID == diametro1 &&
                                      ricd.Diametro2ID == diametro2 &&
                                      ricd.ItemCodeID == itemCodeID
                                      select ricd.Rel_ItemCode_Diametro_ID).AsParallel().SingleOrDefault();

                    DatosItemCode datosItemCode = new DatosItemCode();

                    datosItemCode.Descripcion = (from ic in ctx.Sam3_ItemCode
                                                 where ic.Activo && ic.ItemCodeID == itemCodeID
                                                 select ic.DescripcionEspanol).AsParallel().SingleOrDefault();

                    datosItemCode.ItemCodeSteelgo = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                     join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                     join icsdiam in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals icsdiam.Rel_ItemCodeSteelgo_Diametro_ID
                                                     where rics.Activo && ics.Activo && icsdiam.Activo
                                                     && rics.Rel_ItemCode_Diametro_ID == relIC_Diam
                                                     select ics.Codigo).AsParallel().SingleOrDefault();

                    datosItemCode.ItemCodeSteelgoID = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                       join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                       join icsdiam in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals icsdiam.Rel_ItemCodeSteelgo_Diametro_ID
                                                       where rics.Activo && ics.Activo && icsdiam.Activo
                                                       && rics.Rel_ItemCode_Diametro_ID == relIC_Diam
                                                       select ics.ItemCodeSteelgoID.ToString()).AsParallel().SingleOrDefault();

                    return datosItemCode;
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

        /// <summary>
        /// Se obtienen los datos del ICS para el Grid
        /// Pantalla Catalogo ICS
        /// </summary>
        /// <returns></returns>
        public object obtenerInformacionICS(string diametro1, string diametro2)
        {
            try
            {
                List<ICSDatosAsociacion> lista = new List<ICSDatosAsociacion>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        lista = (from ics in ctx.Sam3_ItemCodeSteelgo
                                 join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ics.ItemCodeSteelgoID equals rids.ItemCodeSteelgoID
                                 join g in ctx.Sam3_Grupo on ics.GrupoID equals g.GrupoID
                                 join c in ctx.Sam3_Cedula on ics.CedulaID equals c.CedulaID
                                 join d1 in ctx.Sam3_Diametro on rids.Diametro1ID equals d1.DiametroID
                                 join d2 in ctx.Sam3_Diametro on rids.Diametro2ID equals d2.DiametroID
                                 where ics.Activo && g.Activo && c.Activo && d1.Activo && d2.Activo
                                 && d1.DiametroID.ToString() == diametro1 && d2.DiametroID.ToString() == diametro2
                                 select new ICSDatosAsociacion
                                 {
                                     ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString(),
                                     Codigo = ics.Codigo,
                                     Descripcion = ics.DescripcionEspanol,
                                     DescripcionIngles = ics.DescripcionIngles,
                                     DescripcionLarga = ics.DescripcionLargaEspanol,
                                     DescripcionLargaIngles = ics.DescripcionLargaIngles,
                                     Diametro1ID = rids.Diametro1ID.ToString(),
                                     Diametro1 = d1.Valor.ToString(),
                                     Diametro2 = d2.Valor.ToString(),
                                     Diametro2ID = rids.Diametro2ID.ToString(),
                                     Grupo = g.Nombre,
                                     GrupoID = ics.GrupoID.ToString(),
                                     AceroID = ics.FamiliaAceroID.ToString(),
                                     CedulaID = ics.CedulaID.ToString(),
                                     CedulaA = c.CedulaA,
                                     CedulaB = c.CedulaB,
                                     Libra = c.CedulaC,
                                     Inch = c.CedulaIn.ToString(),
                                     MM = c.CedulaMM.ToString(),
                                     Espesor = c.Espesor.ToString(),
                                     Peso = ics.Peso.ToString(),
                                     Area = ics.Area.ToString()
                                 }).AsParallel().ToList();

                        lista.ForEach(x =>
                        {
                            int equiv = (from eq in ctx.Sam3_EquivalenciaFamiliaAcero
                                         where eq.Activo && eq.Sam3_FamiliaAceroID.ToString() == x.AceroID
                                         select eq.Sam2_FamiliaAceroID).AsParallel().SingleOrDefault();

                            x.Acero = (from fa in ctx2.FamiliaAcero
                                       where fa.FamiliaAceroID == equiv
                                       select fa.Nombre).AsParallel().SingleOrDefault();
                        });
                    }
                }

                return lista;
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

        /// <summary>
        /// Crea la relacion entre ItemCode y ItemCode Steelgo
        /// </summary>
        /// <param name="itemCodeID"></param>
        /// <param name="itemCodeSteelgoID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object crearRelacion(string itemCodeID, string itemCodeSteelgoID, string diametro1, string diametro2, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int ic = Convert.ToInt32(itemCodeID);
                    int ics = Convert.ToInt32(itemCodeSteelgoID);

                   

                    int relIC_Diam = (from ricd in ctx.Sam3_Rel_ItemCode_Diametro
                                      where ricd.Activo && ricd.Diametro1ID.ToString() == diametro1 &&
                                      ricd.Diametro2ID.ToString() == diametro2 &&
                                      ricd.ItemCodeID.ToString() == itemCodeID
                                      select ricd.Rel_ItemCode_Diametro_ID).AsParallel().SingleOrDefault();

                    int relICS_Diam = (from ricsd in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro
                                       where ricsd.Activo && ricsd.Diametro1ID.ToString() == diametro1 &&
                                       ricsd.Diametro2ID.ToString() == diametro2 &&
                                       ricsd.ItemCodeSteelgoID.ToString() == itemCodeSteelgoID
                                       select ricsd.Rel_ItemCodeSteelgo_Diametro_ID).AsParallel().SingleOrDefault();

                    bool existe = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                   where rics.Activo && rics.ItemCodeID.ToString() == itemCodeID ||
                                   (rics.Rel_ItemCode_Diametro_ID == relIC_Diam || rics.Rel_ItemCodeSteelgo_Diametro_ID == relICS_Diam)
                                   select rics.ItemCodeID).Any();

                    if (existe) //update
                    {
                        Sam3_Rel_ItemCode_ItemCodeSteelgo relacion = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.Rel_ItemCode_Diametro_ID == relIC_Diam &&
                            x.Activo).AsParallel().SingleOrDefault();

                        relacion.Rel_ItemCodeSteelgo_Diametro_ID = relICS_Diam;
                        relacion.ItemCodeSteelgoID = ics;
                        relacion.ItemCodeID = ic;
                        relacion.Activo = true;
                        relacion.UsuarioModificacion = usuario.UsuarioID;
                        relacion.FechaModificacion = DateTime.Now;

                        ctx.SaveChanges();
                    }
                    else //insert
                    {
                        Sam3_Rel_ItemCode_ItemCodeSteelgo relacion = new Sam3_Rel_ItemCode_ItemCodeSteelgo();

                        relacion.Rel_ItemCode_Diametro_ID = relIC_Diam;
                        relacion.Rel_ItemCodeSteelgo_Diametro_ID = relICS_Diam;
                        relacion.ItemCodeID = ic;
                        relacion.ItemCodeSteelgoID = ics;
                        relacion.Activo = true;
                        relacion.FechaModificacion = DateTime.Now;
                        relacion.UsuarioModificacion = usuario.UsuarioID;

                        ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Add(relacion);

                        ctx.SaveChanges();
                    }

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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
    }
}