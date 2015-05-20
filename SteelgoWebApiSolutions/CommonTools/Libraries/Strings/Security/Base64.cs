using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonTools.Libraries.Strings.Security
{
    public class Base64Security
    {
        public string Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public string Decode(string base64EncodedData)
        {
            string returnString = "";
            if (base64EncodedData[base64EncodedData.Length-1] != '=')
            {
                base64EncodedData = base64EncodedData + '=';
            }
            try
            {
                var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
                returnString = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
            }
            catch (Exception ex) { 
                
            }
            return returnString; 
        }
    }
}
