using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagesManager.Utils
{
    public class Configuration
    {

        public static string QuequeMensajes
        {
            get
            {
                return ConfigurationManager.AppSettings["Sam.QuequeMensajes"];
            }
        }
    }
}
