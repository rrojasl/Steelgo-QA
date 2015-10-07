using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam2;
using System.Transactions;

namespace BackEndSAM.DataAcces
{
    /// <summary>
    /// operaciones sobre la entidad ItemCode
    /// </summary>
    public class ItemCodeBd
    {
        private static readonly object _mutex = new object();
        private static ItemCodeBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ItemCodeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ItemCodeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ItemCodeBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtiene los item codes para el combo del grid de materiales
        /// Que no tengan orden de Recepcion ni Numeros unicos
        /// </summary>
        /// <param name="tipoPackingListID">tipo Packing List: 1 Tubo, 2 Accesorio</param>
        /// <returns>lista de item codes</returns>
        public object ObtenerItemCode(int tipoPackingListID)
        {
            try
            {
                List<BackEndSAM.Models.ItemCode> IC = new List<BackEndSAM.Models.ItemCode>();
                List<BackEndSAM.Models.ItemCode> itemCodeS2 = new List<BackEndSAM.Models.ItemCode>();

                using (SamContext ctx = new SamContext())
                {
                    IC.Add(new BackEndSAM.Models.ItemCode { ItemCodeID = "-1", Codigo = "Agregar Nuevo" });
                    IC.Add(new BackEndSAM.Models.ItemCode { ItemCodeID = "0", Codigo = "Bulto" });

                    //List<ItemCode> itemCode = (from ic in ctx.Sam3_ItemCode
                    //                           where ic.Activo && ic.TipoMaterialID == tipoPackingListID
                    //                           && !ctx.Sam3_NumeroUnico.Where(c => c.ItemCodeID == ic.ItemCodeID && c.Activo && ic.Activo).Any()
                    //                           && !ctx.Sam3_Rel_OrdenRecepcion_ItemCode.Where(c => c.ItemCodeID == ic.ItemCodeID && c.Activo && ic.Activo).Any()
                    //                           select new ItemCode
                    //                           {
                    //                               ItemCodeID = ic.ItemCodeID.ToString(),
                    //                               Codigo = ic.Codigo
                    //                           }).AsParallel().ToList();

                    //IC.AddRange(itemCode);
                }

                using (DatabaseManager.Sam2.Sam2Context ctx2 = new DatabaseManager.Sam2.Sam2Context())
                {
                    itemCodeS2 = (from ic in ctx2.ItemCode
                                  where ic.TipoMaterialID == tipoPackingListID
                                  select new BackEndSAM.Models.ItemCode
                                  {
                                      ItemCodeID = ic.ItemCodeID.ToString(),
                                      Codigo = ic.Codigo
                                  }).AsParallel().ToList();
                }

                using (SamContext ctx = new SamContext())
                {
                    //si tienen orden de recepcion
                    List<string> conOR = (from eq in ctx.Sam3_EquivalenciaItemCode
                                          join or in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on eq.Sam3_ItemCodeID equals or.ItemCodeID
                                          join nu in ctx.Sam3_NumeroUnico on eq.Sam3_ItemCodeID equals nu.ItemCodeID
                                          where eq.Activo && or.Activo && nu.Activo
                                          select eq.Sam2_ItemCodeID.ToString()).AsParallel().Distinct().ToList();

                    itemCodeS2 = itemCodeS2.Where(x => !conOR.Contains(x.ItemCodeID)).AsParallel().Distinct().ToList();
                }
                IC.AddRange(itemCodeS2);

                return IC;
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Guardar nnuevo Item Code
        /// </summary>
        /// <param name="DatosItemCode">datos capturados por el usuario en el modal</param>
        /// <param name="usuario">usuario registrado</param>
        /// <returns>status exito o error</returns>
        public object GuardarItemCodePopUp(ItemCodeJson DatosItemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var sam3_tran = ctx.Database.BeginTransaction())
                    {
                        using (Sam2Context ctx2 = new Sam2Context())
                        {
                            using (var sam2_tran = ctx2.Database.BeginTransaction())
                            {
                                //Inserta en Sam 2
                                DatabaseManager.Sam2.ItemCode itemS2 = new DatabaseManager.Sam2.ItemCode();
                                itemS2.ProyectoID = DatosItemCode.ProyectoID;
                                itemS2.TipoMaterialID = DatosItemCode.TipoPackingList;
                                itemS2.Codigo = DatosItemCode.ItemCode;
                                itemS2.ItemCodeCliente = DatosItemCode.ItemCodeCliente;
                                itemS2.DescripcionEspanol = DatosItemCode.Descripcion;
                                itemS2.DescripcionIngles = DatosItemCode.DescripcionIngles;
                                //itemS2.UsuarioModifica = Guid.Parse("42AF3D10-B17A-4776-BD9A-96E9D0F0DCF6");
                                itemS2.FechaModificacion = DateTime.Now;
                                //nuevoIC.VersionRegistro
                                itemS2.Peso = DatosItemCode.Peso;
                                itemS2.DescripcionInterna = DatosItemCode.DescripcionInterna;
                                itemS2.Diametro1 = DatosItemCode.Diametro1;
                                itemS2.Diametro2 = DatosItemCode.Diametro2;
                                itemS2.FamiliaAceroID = DatosItemCode.FamiliaID;

                                ctx2.ItemCode.Add(itemS2);
                                ctx2.SaveChanges();

                                //Inserta en Sam 3
                                Sam3_ItemCode itemS3 = new Sam3_ItemCode();
                                itemS3.ProyectoID = DatosItemCode.ProyectoID;//
                                itemS3.TipoMaterialID = DatosItemCode.TipoPackingList;//
                                itemS3.Codigo = DatosItemCode.ItemCode;//
                                itemS3.ItemCodeCliente = DatosItemCode.ItemCodeCliente;
                                itemS3.DescripcionEspanol = DatosItemCode.Descripcion;//
                                //itemS3.DescripcionIngles = DatosItemCode.Descripcion;
                                //itemS3.DescripcionInterna = DatosItemCode.Descripcion;
                                //itemS3.Peso = DatosItemCode.Peso;
                                //itemS3.Diametro1 = DatosItemCode.Diametro1;
                                //itemS3.Diametro2 = DatosItemCode.Diametro2;
                                itemS3.FamiliaAceroID = DatosItemCode.FamiliaID;//
                                itemS3.Activo = true;
                                itemS3.UsuarioModificacion = usuario.UsuarioID;
                                itemS3.FechaModificacion = DateTime.Now;
                                //itemS3.Cantidad = DatosItemCode.Cantidad;
                                //itemS3.MM = DatosItemCode.MM;
                                itemS3.ColadaID = DatosItemCode.ColadaID;//
                                itemS3.TipoUsoID = Convert.ToInt32(DatosItemCode.TipoUsoID) == -1 ? 1 : Convert.ToInt32(DatosItemCode.TipoUsoID);
                                ctx.Sam3_ItemCode.Add(itemS3);
                                ctx.SaveChanges();

                                //Inserta en equivalencia
                                Sam3_EquivalenciaItemCode equiv = new Sam3_EquivalenciaItemCode();
                                equiv.Sam2_ItemCodeID = itemS2.ItemCodeID;
                                equiv.Sam3_ItemCodeID = itemS3.ItemCodeID;
                                equiv.Activo = true;
                                equiv.UsuarioModificacion = usuario.UsuarioID;
                                equiv.FechaModificacion = DateTime.Now;

                                ctx.Sam3_EquivalenciaItemCode.Add(equiv);
                                ctx.SaveChanges();

                                sam2_tran.Commit();
                            } //tran sam2
                        } //ctx Sam 2
                        sam3_tran.Commit();
                    } //tran sam3
                     TransactionalInformation result = new TransactionalInformation();
                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;

                        return result;
                } //ctx sam 3
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Obtener el detalle de un item code al seleccionarlo en el grid
        /// </summary>
        /// <param name="itemCode">item code seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>objeto con la informacion del item code</returns>
        public object ObtenerDetalleItemCode(string itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ItemCodeJson detalle = (from r in ctx.Sam3_ItemCode
                                            where r.Activo && r.Codigo == itemCode
                                            select new ItemCodeJson
                                            {
                                                ItemCodeID = r.ItemCodeID,
                                                ItemCode = r.Codigo,
                                                ColadaNombre = (from c in ctx.Sam3_Colada where c.ColadaID == r.ColadaID && c.Activo select c.NumeroColada).FirstOrDefault(),
                                                Cantidad = r.Cantidad,
                                                MM = r.MM
                                            }).AsParallel().SingleOrDefault();
                    return detalle;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public List<ListadoIncidencias> ListadoIncidencias(int clienteID, int proyectoID, List<int> proyectos, List<int> patios, List<int> incidenciaIDs,
            DateTime fechaInicial, DateTime fechaFinal)
        {
            try
            {
                List<ListadoIncidencias> listado;
                using (SamContext ctx = new SamContext())
                {

                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}