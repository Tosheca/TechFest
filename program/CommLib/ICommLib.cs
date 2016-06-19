using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommLib
{
    interface ICommLib
    {
        void Pause();

        void PushVertex(int id);
        void PushVertex(int id, Dictionary<string, dynamic> props);

        void Upload();        
    }
}
