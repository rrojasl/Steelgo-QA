using BackEndSAM.DataAcces.Pintura.SistemaPinturaAplicable;
using BackEndSAM.Models.Pintura.PinturaGeneral;
using BackEndSAM.Models.Pintura.SistemaPinturaAplicable;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.RevisionPintura
{
    public class RevisionPinturaBD
    {
        private static readonly object _mutex = new Object();
        private static RevisionPinturaBD _instance;

        public static RevisionPinturaBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new RevisionPinturaBD();
                    }
                }
                return _instance;
            }
        }

        
        public object GetRechazos(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                   
                    List<Sam3_Pintura_Get_Rechazos_Result> lista = ctx.Sam3_Pintura_Get_Rechazos(lenguaje).ToList();

                    List<TiposRechazo> listaRechazos = new List<TiposRechazo>();

                    if (lista.Count > 0)
                        listaRechazos.Add(new TiposRechazo());

                    foreach (var item in lista)
                    {
                        TiposRechazo tipoRechazo = new TiposRechazo
                        {
                            Rechazo = item.Rechazo,
                            TipoRechazoID = item.TipoRechazoID
                        };
                        listaRechazos.Add(tipoRechazo);
                    }
                        
                    
                    return listaRechazos;
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

        public object GuardarSpoolRevision(DataTable dtCaptura,int usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.ToString() } };

                    _SQL.Ejecuta(Stords.GUARDARCAPTURAREVISIONPINTURA, dtCaptura, "@Captura", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;
                    return result;
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

        public List<PinturaRevision> ActualizaDatos(DataTable dtActualizar,string lenguaje)
        {

            using (SamContext ctx = new SamContext())
            {
                ObjetosSQL _SQL = new ObjetosSQL();

                string[,] parametro = { { "@lenguaje", lenguaje } };

                DataTable dtCaptura =  _SQL.EjecutaDataAdapter(Stords.ACTUALIZARCAPTURAREVISIONPINTURA, dtActualizar, "@SpoolCapturados", parametro);

                List<PinturaRevision> listaRevisionSpool = new List<PinturaRevision>();

                List<TiposRechazo> listaRechazos = (List<TiposRechazo>)RevisionPinturaBD.Instance.GetRechazos(lenguaje);

                foreach (DataRow row in dtCaptura.Rows)
                {
                    listaRevisionSpool.Add(new PinturaRevision
                    {
                        Accion = 1,
                        SpoolID =int.Parse( row["SpoolID"].ToString()),
                        NombreSpool = row["NombreSpool"].ToString(),
                        NumeroControl = row["NumeroControl"].ToString(),
                        SistemaPintura = row["SistemaPintura"].ToString(),
                        Color = row["Color"].ToString(),
                        Area = decimal.Parse(row["Area"].ToString()),
                        GenerarRevision = false,
                        Comentario = row["Comentario"].ToString(),
                        Version =int.Parse( row["Version"].ToString()),
                        ListaMotivosRechazo= listaRechazos,
                        SistemaPinturaID =int.Parse(row["SistemaPinturaID"].ToString()),
                        NoPintable =bool.Parse(row["NoPintable"].ToString()),
                        SistemaPinturaColorID= row["SistemaPinturaColorID"].ToString()=="" ? 0: int.Parse(row["SistemaPinturaColorID"].ToString()),
                        ListadoSistemaPinturaPorProyecto = GetSistemaPinturaPorProyecto(ctx.Sam3_SPA_Get_SistemaPintura(int.Parse(row["ProyectoID"].ToString())).ToList()),
                        ListaColorPintura = (List<ColorPintura>)SistemaPinturaAplicableBD.Instance.ObtieneListadoColorPintura(int.Parse(row["SistemaPinturaID"].ToString()), lenguaje)
                    });
                }
                return listaRevisionSpool;
            }

          
        }

        public List<Models.Pintura.SistemaPintura.SistemaPintura> GetSistemaPinturaPorProyecto(List<Sam3_SPA_Get_SistemaPintura_Result> listaSistemaPinturaProyecto)
        {
            List<Models.Pintura.SistemaPintura.SistemaPintura> listadoSistemaPintura = new List<Models.Pintura.SistemaPintura.SistemaPintura>();

            if(listaSistemaPinturaProyecto.Count>0)
                listadoSistemaPintura.Add(new Models.Pintura.SistemaPintura.SistemaPintura());

            foreach (Sam3_SPA_Get_SistemaPintura_Result item in listaSistemaPinturaProyecto)
            {
                Models.Pintura.SistemaPintura.SistemaPintura sistemaPintura = new Models.Pintura.SistemaPintura.SistemaPintura
                {
                    NombreSistemaPintura = item.Nombre,
                    SistemaPinturaID = item.SistemaPinturaID
                };
                listadoSistemaPintura.Add(sistemaPintura);
            }

            return listadoSistemaPintura;
        }

        public List<T> ConvertTo<T>(DataTable datatable) where T : new()
        {
            List<T> Temp = new List<T>();
            try
            {
                List<string> columnsNames = new List<string>();
                foreach (DataColumn DataColumn in datatable.Columns)
                    columnsNames.Add(DataColumn.ColumnName);
                Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObject<T>(row, columnsNames));
                return Temp;
            }
            catch
            {
                return Temp;
            }

        }
        public T getObject<T>(DataRow row, List<string> columnsName) where T : new()
        {
            T obj = new T();
            try
            {
                string columnname = "";
                string value = "";
                PropertyInfo[] Properties;
                Properties = typeof(T).GetProperties();
                foreach (PropertyInfo objProperty in Properties)
                {
                    columnname = columnsName.Find(name => name.ToLower() == objProperty.Name.ToLower());
                    if (!string.IsNullOrEmpty(columnname))
                    {
                        value = row[columnname].ToString();
                        if (!string.IsNullOrEmpty(value))
                        {
                            if (Nullable.GetUnderlyingType(objProperty.PropertyType) != null)
                            {
                                value = row[columnname].ToString().Replace("$", "").Replace(",", "");
                                objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(Nullable.GetUnderlyingType(objProperty.PropertyType).ToString())), null);
                            }
                            else
                            {
                                value = row[columnname].ToString().Replace("%", "");
                                objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(objProperty.PropertyType.ToString())), null);
                            }
                        }
                    }
                }
                return obj;
            }
            catch
            {
                return obj;
            }
        }

        public object ObtenerSpoolConSP(int proyectoID, string dato, int tipoBusqueda, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<PinturaRevision> listaRevisionSpool = new List<PinturaRevision>();
                    List<Sam3_Pintura_Get_Revision_Result> result = ctx.Sam3_Pintura_Get_Revision(proyectoID, dato, tipoBusqueda, lenguaje).ToList();
                    List<TiposRechazo> listaRechazos = (List<TiposRechazo>)RevisionPinturaBD.Instance.GetRechazos(lenguaje);

                    foreach (Sam3_Pintura_Get_Revision_Result item in result)
                    {
                        listaRevisionSpool.Add(new PinturaRevision
                        {
                            Accion = 1,
                            SpoolID = item.SpoolID,
                            NombreSpool = item.NombreSpool,
                            NumeroControl = item.NumeroControl,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SistemaPintura = item.SistemaPintura,
                            ListadoSistemaPinturaPorProyecto = GetSistemaPinturaPorProyecto(ctx.Sam3_SPA_Get_SistemaPintura(proyectoID).ToList()),
                            Color = item.Color,
                            Area = item.Area,
                            GenerarRevision = false,
                            Comentario = item.Comentario,
                            Version = item.Version,
                            ListaMotivosRechazo = listaRechazos,
                            NoPintable=item.NoPintable,
                            SistemaPinturaColorID=item.SistemaPinturaColorID,
                            ListaColorPintura = (List<ColorPintura>)SistemaPinturaAplicableBD.Instance.ObtieneListadoColorPintura(item.SistemaPinturaID.GetValueOrDefault(), lenguaje)
                        });
                    }
                    return listaRevisionSpool;
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


        public object ObtenerCantidadSpoolConSP(int proyectoID, string dato, int tipoBusqueda)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<PinturaRevision> listaRevisionSpool = new List<PinturaRevision>();
                    int cantidadDatos= ctx.Sam3_Pintura_Get_CountRevision(proyectoID, dato, tipoBusqueda);
                    return cantidadDatos;

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

    }
}