using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyhisInteractiveCore
{
    public class ReadCradResult
    {

        public Result Result {
            get; set;
        }

        public ReadCradResult() {
            this.Result = new Result();
            this.Result.TradeType = "ReadCard";
        }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public string Sex { get; set; }

        /// <summary>
        /// 生日
        /// </summary>
        public string Birthday { get; set; }

        /// <summary>
        /// 身份证号
        /// </summary>
        public string CardId { get; set; }


        /// <summary>
        /// 户籍地址
        /// </summary>
        public string Address { get; set; }
    }
}
