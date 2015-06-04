using DatabaseManager.Sam3;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Messaging;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace LoggerDaemon
{
    public partial class DaemonService : ServiceBase
    {
        public DaemonService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            try
            {
                var reader = new AppSettingsReader();
                var stringSetting = reader.GetValue("Sam.QuequeBitacora", typeof(string));
                Console.WriteLine("String setting: " + stringSetting);

                MessageQueue mq = new MessageQueue("FormatName:Direct=OS:DF-APP-SQL-03\\Private$\\bitacora");  
                mq.Formatter = new XmlMessageFormatter(new Type[] { typeof(System.String) });

                bool x = mq.CanRead;
               
             
                foreach (System.Messaging.Message message in mq.GetAllMessages())
                {
                    message.Formatter = new XmlMessageFormatter(new Type[] { typeof(Sam3_Notificacion) });
                    Sam3_Notificacion p = (Sam3_Notificacion)message.Body;
                    var mensaje1 = new UTF8Encoding(true).GetBytes(p.Activo + " " + p.TipoNotificacionID + " " + p.UsuarioIDEmisor);
                  
                }

                //mq.Purge();
               

            }
            catch (Exception ex)
            {
                var texto = new UTF8Encoding(true).GetBytes("ex: " + ex.Message);
              
            }

        }

        protected override void OnStop()
        {
        }
    }
}
