using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;

namespace BackEndSAM.DataAcces
{
    public class PermisoAduana
    {
        /// <summary>
        /// Método para obtener los datos del aviso de llegada correspondientes al folio
        /// para enviarlos por correo
        /// </summary>
        /// <param name="folio">Folio seleccionado</param>
        /// <returns>Lista de Formato Permiso aduana</returns>
        public List<FormatoPermisoAduana> ObtenerDatosAvisoLlegada(int folio)
        {
            List<FormatoPermisoAduana> listaAvisoLlegada = new List<FormatoPermisoAduana>();
            using (SamContext ctx = new SamContext())
            {
                listaAvisoLlegada = (from x in ctx.Sam3_FolioAvisoLlegada
                                     join p in ctx.Sam3_Proveedor on x.ProveedorID equals p.ProveedorID
                                     join ch in ctx.Sam3_Chofer on x.ChoferID equals ch.ChoferID
                                     join tr in ctx.Sam3_Transportista on x.TransportistaID equals tr.TransportistaID
                                     join ca in ctx.Sam3_Camion on x.CamionID equals ca.CamionID
                                     where (x.FolioAvisoLlegadaID == folio)
                                     select new FormatoPermisoAduana
                                     {
                                         FechaRecepcion = x.FechaRecepcion,
                                         NombreProveedor = p.Nombre,
                                         NombreChofer = ch.Nombre,
                                         NombreTransportista = tr.Nombre,
                                         PlacasCamion = ca.Placas
                                     }).ToList();
            }
            return listaAvisoLlegada;
        }

        /// <summary>
        /// Método para obtener las planas correspondientes al folio
        /// </summary>
        /// <param name="folio">Folio seleccionado</param>
        /// <returns>Lista de Planas</returns>
        public List<string> ObtenerPlanas(int folio)
        {
            List<string> listaPlana = new List<string>();
            using (SamContext ctx = new SamContext())
            {
                listaPlana = (from avPlana in ctx.Sam3_Rel_AvisoLlegada_Plana
                              join plana in ctx.Sam3_Plana on avPlana.PlanaID equals plana.PlanaID
                              where (avPlana.FolioAvisoLlegadaID == folio)
                              select plana.Placas).ToList();
            }
            return listaPlana;
        }

        /// <summary>
        /// Método para obtener los proyectos correspondientes al folio
        /// </summary>
        /// <param name="folio">Folio seleccionado</param>
        /// <returns>Lista de Proyectos</returns>
        public List<string> ObtenerProyectos(int folio)
        {
            List<string> listaProyecto = new List<string>();
            using (SamContext ctx = new SamContext())
            {
                listaProyecto = (from avProy in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                 join proy in ctx.Sam3_Proyecto on avProy.ProyectoID equals proy.ProyectoID
                                 where (avProy.FolioAvisoLlegadaID == folio)
                                 select proy.Nombre).ToList();
            }
            return listaProyecto;
        }

        /// <summary>
        /// Método que envia correo con el Formato de Permiso de Aduana
        /// </summary>
        /// <param name="listaAvisoLlegada">Lista con los datos del aviso llegada correspondiente al folio</param>
        /// <param name="planas">Lista con las planas correspondientes al folio</param>
        /// <param name="proyectos">Lista con los proyectos correspondientes al folio</param>
        public void EnviarCorreo(List<FormatoPermisoAduana> listaAvisoLlegada, List<string> planas, List<string> proyectos)
        {
            try
            {
                string listadoProyectos = string.Join(", ", proyectos);
                string fechaRecepcion = listaAvisoLlegada[0].FechaRecepcion.ToString().Substring(0, 9);
                DateTime nuevaFecha = DateTime.Parse(fechaRecepcion);
                StringBuilder body = new StringBuilder();
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.office365.com");
                mail.From = new MailAddress("daniela.zertuche@definityfirst.com");
                mail.To.Add("daniela.zertuche@definityfirst.com");
                mail.Subject = "Nuevo Permiso de Aduana";
                mail.IsBodyHtml = true;

                //HTML para las planas
                for (int i = 0; i < planas.Count; i++)
                {
                    body.AppendFormat("Plataforma: " + planas[i] + "<br />"
                                         + "Unidad: " + /*Unidad correspondiente a la plana*/ i + "<br />"
                                         + "Modelo: " + /*Modelo correspondiente a la plana*/ i + "<br />");
                }

                //HTML del mensaje
                mail.Body = "Buen Dia Capit&aacute;n<br />"
                            + "Solicito permiso de acceso para la siguiente unidad para los d&iacute;as " + String.Format("{0:dd/MM/yyyy}", nuevaFecha.AddDays(-2))
                            + " al " + String.Format("{0:dd/MM/yyyy}", nuevaFecha.AddDays(2))
                            + ", que estar&aacute;  ingresando a las instalaciones de Steelgo.<br /> <br />"
                            + " Cliente: " + listaAvisoLlegada[0].NombreProveedor + "<br />"
                            + "Proyecto: " + listadoProyectos + "<br />"
                            + "Operador: " + listaAvisoLlegada[0].NombreChofer + "<br />"
                            + "L&iacute;nea Transportista: " + listaAvisoLlegada[0].NombreTransportista + "<br />"
                            + "Placas: " + listaAvisoLlegada[0].PlacasCamion + "<br />"
                            + body;

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("user", "password");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
            }
        }

       /// <summary>
       /// Insertar permiso de aduana en base de datos
       /// </summary>
       /// <param name="folio">Folio seleccionado por el usuario</param>
       /// <param name="usuario">Usuario Actual</param>
       /// <returns></returns>
        public object InsertarPermisoADuana(int folio, Sam3_Usuario usuario)
        {
            using (SamContext ctx = new SamContext())
            {
                Sam3_PermisoAduana permisoAduana = new Sam3_PermisoAduana();
                permisoAduana.FolioAvisoLlegadaID = folio;
                permisoAduana.Estatus = "Creado";
                permisoAduana.Activo = true;
                permisoAduana.UsuarioModificacion = usuario.UsuarioID;
                permisoAduana.FechaModificacion = DateTime.Now;
                permisoAduana.PermisoAutorizado = false;
                permisoAduana.PermisoTramite = true;
                permisoAduana.NumeroPermiso = null;
                permisoAduana.FechaGeneracion = DateTime.Now;
                permisoAduana.FechaAutorización = null;

                ctx.Sam3_PermisoAduana.Add(permisoAduana);
                ctx.SaveChanges();

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("Ok");
                result.ReturnMessage.Add(permisoAduana.PermisoAduanaID.ToString());
                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                return result;
            }
        }
    }
}