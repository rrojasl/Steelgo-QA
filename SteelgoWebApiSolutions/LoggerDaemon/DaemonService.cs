using DatabaseManager.Sam3;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Messaging;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace LoggerDaemon
{
    public partial class DaemonService : ServiceBase
    {
        int detener = 0;

        public DaemonService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            detener = 0;

          
                LoggerDaemonLibrary.ReadPruebas();
                //LoggerDaemonLibrary.ReadMessagesNotificaciones();
                //LoggerDaemonLibrary.ReadMessagesBitacora();
            
        }


        protected override void OnStop()
        {
            detener = 1;
        }       
    }
}
