using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EasyhisInteractiveCore
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                JObject data;
                while ((data = Read()) != null)
                {
                    var processed = ProcessMessage(data);
                    Write(processed);
                    if (processed == "exit")
                    {
                        return;
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);              
            }            
        }
        public static string ProcessMessage(JObject data)
        {
            var message = data["Code"].Value<string>();
            switch (message)
            {
                case "ReadCard":
                    return JsonConvert.SerializeObject(new ReadCradResult()
                    {
                        Name = "李祁",
                        Sex="男",
                        Birthday = "1997-09-06",
                        CardId = "41132709848987",
                        Address = "浙江省杭州市西湖区"
                    }).ToString();                  
                case "ReadMac":
                    return "01-09-MD-0A-CC";
                case "exit":
                    return "exit";
                default:
                    return "echo: " + message;
            }
        }

        public static JObject Read()
        {
            var stdin = Console.OpenStandardInput();
            var length = 0;

            var lengthBytes = new byte[4];
            stdin.Read(lengthBytes, 0, 4);
            length = BitConverter.ToInt32(lengthBytes, 0);

            var buffer = new char[length];
            using (var reader = new StreamReader(stdin))
            {
                while (reader.Peek() >= 0)
                {
                    reader.Read(buffer, 0, buffer.Length);
                }
            }

            return (JObject)JsonConvert.DeserializeObject<JObject>(new string(buffer));
        }

        public static void Write(JToken data)
        {
            var json = JObject.Parse(data.ToString());
            // json["data"] = data;           

            var bytes = System.Text.Encoding.UTF8.GetBytes(json.ToString(Formatting.None));

            var stdout = Console.OpenStandardOutput();
            stdout.WriteByte((byte)((bytes.Length >> 0) & 0xFF));
            stdout.WriteByte((byte)((bytes.Length >> 8) & 0xFF));
            stdout.WriteByte((byte)((bytes.Length >> 16) & 0xFF));
            stdout.WriteByte((byte)((bytes.Length >> 24) & 0xFF));
            stdout.Write(bytes, 0, bytes.Length);
            stdout.Flush();
        }


    }
}
