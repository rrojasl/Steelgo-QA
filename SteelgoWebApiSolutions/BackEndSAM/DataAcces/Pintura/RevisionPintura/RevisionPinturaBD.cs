using BackEndSAM.Models.Pintura.PinturaGeneral;
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
                        Version =int.Parse( row["Version"].ToString())
                    });
                }
                return listaRevisionSpool;
            }

          
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


    }
}