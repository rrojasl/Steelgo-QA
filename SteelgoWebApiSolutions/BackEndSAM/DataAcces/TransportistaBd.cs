﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class TransportistaBd
    {
        private static readonly object _mutex = new object();
        private static TransportistaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private TransportistaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static TransportistaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TransportistaBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoTransportistas()
        {
            try
            {
                List<Transportista> lstTransportista;
                using (SamContext ctx = new SamContext())
                {
                    lstTransportista = (from t in ctx.Sam3_Transportista
                                        where t.Activo
                                        select new Transportista
                                        {
                                            Nombre = t.Nombre,
                                            TransportistaID = t.TransportistaID.ToString()
                                        }).AsParallel().ToList();
                }
                return lstTransportista;
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

        public object InsertarTransportista(Sam3_Transportista nuevoRegistro, string payload)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    nuevoRegistro.UsuarioModificacion = usuario.UsuarioID;
                    nuevoRegistro.FechaModificacion = DateTime.Now;

                    ctx.Sam3_Transportista.Add(nuevoRegistro);

                    ctx.SaveChanges();

                    return new Transportista { Nombre = nuevoRegistro.Nombre, TransportistaID = nuevoRegistro.TransportistaID.ToString() };
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

        public object ActualizarTransportista(Sam3_Transportista cambios, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Transportista registroEnBd = ctx.Sam3_Transportista.Where(x => x.TransportistaID == cambios.TransportistaID)
                        .AsParallel().SingleOrDefault();

                    registroEnBd.Activo = registroEnBd.Activo != null && cambios.Activo != registroEnBd.Activo ?
                        cambios.Activo : registroEnBd.Activo;
                    registroEnBd.ContactoID = cambios.ContactoID != null && cambios.ContactoID != registroEnBd.ContactoID ? 
                        cambios.ContactoID : registroEnBd.ContactoID;
                    registroEnBd.Descripcion = cambios.Descripcion != null && cambios.Descripcion != registroEnBd.Descripcion ?
                        cambios.Descripcion : registroEnBd.Descripcion;
                    registroEnBd.Direccion = cambios.Direccion != null && cambios.Direccion != registroEnBd.Direccion ?
                        cambios.Direccion : registroEnBd.Direccion;
                    registroEnBd.Nombre = cambios.Nombre != null && cambios.Nombre != registroEnBd.Nombre ?
                        cambios.Nombre : registroEnBd.Nombre;
                    registroEnBd.Telefono = cambios.Telefono != null && cambios.Telefono != registroEnBd.Telefono ?
                        cambios.Telefono : registroEnBd.Telefono;
                    registroEnBd.TransportistaID = cambios.TransportistaID != null && cambios.TransportistaID != registroEnBd.TransportistaID ?
                        cambios.TransportistaID : registroEnBd.TransportistaID;
                    registroEnBd.UsuarioModificacion = usuario.UsuarioID;
                    registroEnBd.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

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
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;

            }
        }

        public object EliminarTransportista(int transportistaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Transportista registroEnBd = ctx.Sam3_Transportista.Where(x => x.TransportistaID == transportistaID)
                        .AsParallel().SingleOrDefault();

                    registroEnBd.Activo = false;
                    registroEnBd.UsuarioModificacion = usuario.UsuarioID;
                    registroEnBd.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

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