//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam2
{
    using System;
    using System.Collections.Generic;
    
    public partial class JuntaReporteDiarioSoldadura
    {
        public int JuntaSoldaduraID { get; set; }
        public Nullable<int> ReporteDiarioSoldaduraID { get; set; }
    
        public virtual ReporteDiarioSoldadura ReporteDiarioSoldadura { get; set; }
    }
}
