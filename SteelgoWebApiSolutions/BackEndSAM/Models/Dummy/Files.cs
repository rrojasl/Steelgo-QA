using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class Files
    {
        public int id { get; set; }
        public string Archivo { get; set; }
        public string status { get; set; }


        public Files(int _id, string _Archivo, string _status){
            this.id = _id;
            this.Archivo = _Archivo;
            this.status=_status;
        }
    }
}