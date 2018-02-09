using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyhisInteractiveCore
{
    public class Result
    {
        public string TradeType { get;set; }

        public string Code { get; set; }

        public string Msg { get; set; }

        public Result() {           
            this.Code = "0";
            this.Msg = "s_ok";
        }
    }
}
