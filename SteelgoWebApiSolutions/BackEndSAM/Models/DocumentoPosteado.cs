using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class DocumentoPosteado
    {
        public string fileName { get; set; }
        public string contentType { get; set; }
        public int size { get; set; }
        public string path { get; set; }
        public Guid docGuid { get; set; }
        public int folioAvisoLlegadaID { get; set; }
        public int userId { get; set; }
    }
}