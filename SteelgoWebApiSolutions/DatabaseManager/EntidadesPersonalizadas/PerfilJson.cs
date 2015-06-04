using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseManager.EntidadesPersonalizadas
{
    public class PerfilJson
    {
        public Layout layout { get; set; }
        public Login login { get; set; }

        public PerfilJson()
        {
            layout.properties = new List<object>();
            login.properties = new List<Properties>();
        }
    }

    public class Layout
    {
        public bool create { get; set; }
        public bool list { get; set; }
        public bool detail { get; set; }
        public bool destroy { get; set; }
        public List<object> properties { get; set; }
    }

    public class Properties 
    {
        public string propertyName { get; set; }
        public bool visible { get; set; }
        public bool editable { get; set; }
        public bool required { get; set; }
    }

    public class Login
    {
        public bool create { get; set; }
        public bool list { get; set; }
        public bool detail { get; set; }
        public bool destroy { get; set; }
        public List<Properties> properties { get; set; }
    }

    public class sideMenu
    {
        public bool visible { get; set; }
        public bool editable { get; set; }
        public List<MainMenuElement> elements { get; set; }
    }

    public class contextMenu
    {
        public bool visible { get; set; }
        public bool editable { get; set; }
        public List<ContextMenuElement> elements { get; set; }
    }

    public class MainMenuElement
    {
        public int idPadre { get; set; }
        public string texto { get; set; }
        public string liga { get; set; }
    }

    public class ContextMenuElement
    {
        public string texto { get; set; }
        public string liga { get; set; }
    }

}
