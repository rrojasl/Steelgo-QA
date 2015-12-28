using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;


namespace DatabaseManager.Sam3
{
    public class ObjetosSQL
    {
        /// <summary>
        /// Cadena Coneccion a la BD
        /// </summary>
        /// <returns></returns>
        protected SqlConnection Conexion()
        {
            return new SqlConnection(ConfigurationManager.ConnectionStrings["SqlServer"].ConnectionString);
        }
        /// <summary>
        /// Retorna un DatatTable con la información de BD
        /// </summary>
        /// <param name="Stord">Stord a ejecutar</param>
        /// <param name="Parametros">Parametros que requiere el stord</param>
        /// <returns>Objeto DatatTable con la coleccion de datos</returns>
        public DataTable Tabla(string Stord, string[,] Parametros = null)
        {

            DataTable dt = new DataTable();
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.Connection.Open();
                        da.Fill(dt);
                        cmd.Connection.Close();
                    }
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }
                return dt;
            }

        }
        /// <summary>
        /// Retorna un coleccion de Tablas con la información de BD
        /// </summary>
        /// <param name="Stord">nombre del stord a ejecutar</param>
        /// <param name="Parametros">Parametros que requiere el stord</param>
        /// <returns>Coleccion de tablas</returns>
        public DataSet Coleccion(string Stord, string[,] Parametros = null)
        {
            DataSet ds = new DataSet();
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.Connection.Open();
                        da.Fill(ds);
                        cmd.Connection.Close();
                    }
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }
                return ds;
            }


        }
        /// <summary>
        /// Retorna un coleccion de Tablas con la información de BD
        /// </summary>
        /// <param name="Stord">Nombre del Stord a ejecutar</param>
        /// <param name="TablaSube">objeto DataTable que envía al stord</param>
        /// <param name="NombreTabla">nombre del parametro de tabla</param>
        /// <param name="Parametros">Parametros que requiere el stord</param>
        /// <returns>Coleccion de tablas</returns>
        public DataSet Coleccion(string Stord, DataTable TablaSube, String NombreTabla, string[,] Parametros = null)
        {
            DataSet ds = new DataSet();
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.Parameters.Add(new SqlParameter(NombreTabla, TablaSube));
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.Connection.Open();
                        da.Fill(ds);
                        cmd.Connection.Close();
                    }
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }
                return ds;
            }


        }
        /// <summary>
        /// Ejecuta un stord en la BD
        /// </summary>
        /// <param name="Stord">Nombre del Stord a ejecutar</param>
        /// <param name="Parametros">Parametros que requiere el stord</param>
        /// <returns>True si se ejecuto el stord, Exception: error</returns>
        public bool Ejecuta(string Stord, string[,] Parametros = null)
        {
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    cmd.CommandTimeout = 0;
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery();
                    cmd.Connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }
            }
        }
        /// <summary>
        /// Ejecuta un stord en la BD
        /// </summary>
        /// <param name="Stord">Nombre del Stord a ejecutar</param>
        /// <param name="TablaSube">objeto DataTable que envía al stord</param>
        /// <param name="NombreTabla">nombre del parametro de tabla</param>
        /// <param name="Parametros">Parametros que requiere el stord</param>
        /// <returns>Objeto DatatTable con la coleccion de datos</returns>
        public bool Ejecuta(string Stord, DataTable TablaSube, String NombreTabla, string[,] Parametros = null)
        {
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.Parameters.Add(new SqlParameter(NombreTabla, TablaSube));
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    cmd.CommandTimeout = 0;
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery();
                    cmd.Connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }
            }
        }
        /// <summary>
        /// Ejecuta un stord en la BD
        /// </summary>
        /// <param name="Stord">Nombre del Stord a ejecutar</param>
        /// <param name="TablaSube">objeto DataTable que envía al stord</param>
        /// <param name="NombreTabla">nombre del parametro de tabla</param>
        /// <param name="Parametros">Parametros que requiere el stord</param>
        /// <returns>Objeto DatatTable con la coleccion de datos</returns>
        public bool Ejecuta(string Stord, DataTable TablaSube, String NombreTabla, DataTable TablaSube1, String NombreTabla1, string[,] Parametros = null)
        {
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.Parameters.Add(new SqlParameter(NombreTabla1, TablaSube1));
                cmd.Parameters.Add(new SqlParameter(NombreTabla, TablaSube));
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    cmd.CommandTimeout = 0;
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery();
                    cmd.Connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }

            }
        }

        /// <summary>
        /// Ejecuta un stord en la BD
        /// </summary>
        /// <param name="Stord">Nombre del Stord a ejecutar</param>
        /// <param name="TablaSube">objeto DataTable que envía al stord</param>
        /// <param name="NombreTabla">nombre del parametro de tabla</param>
        /// <param name="Parametros">Parametros que requiere el stord</param>
        /// <returns>Objeto DatatTable con la coleccion de datos</returns>
        public bool Ejecuta(string Stord, DataTable TablaSube, String NombreTabla, DataTable TablaSube1, String NombreTabla1, DataTable TablaSube2, String NombreTabla2, string[,] Parametros = null)
        {

            DataTable dt = new DataTable();
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.Parameters.Add(new SqlParameter(NombreTabla2, TablaSube2));
                cmd.Parameters.Add(new SqlParameter(NombreTabla1, TablaSube1));
                cmd.Parameters.Add(new SqlParameter(NombreTabla, TablaSube));
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    cmd.CommandTimeout = 0;
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery();
                    cmd.Connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }
            }
        }
    }
}