using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Quobject.SocketIoClientDotNet.Client;
using Socket = Quobject.SocketIoClientDotNet.Client.Socket;
using System.Threading;
using Newtonsoft.Json.Linq;
using Quobject.SocketIoClientDotNet.Client;

namespace CommLib
{
    public class Step
    {
        public int id;
        public Dictionary<string, dynamic> props = new Dictionary<string, dynamic>();

        public Step(int id)
        {
            this.id = id;
        }
    }
    public class Edge
    {
        public int from;
        public int to;
        public int weight;

    }

    public class Node
    {
        public int id;
        public uint level;
        public bool used = false;
        //public Dictionary<string, dynamic> props;
        public List<Edge> children;
    }

    public class Graph
    {
        List<Edge> edge { get; set; }
    }

    public class SocketIOCommLib : ICommLib
    {
        Socket sock;
        List<int> vertecies = new List<int>();
        //        Thread main;



        public SocketIOCommLib()
        {
            sock = IO.Socket("http://78.83.31.94:3000");
            sock.Open();

            var task = On(Socket.EVENT_CONNECT);
            task.Wait();
            Console.WriteLine("Conected");
            //          main = Thread.CurrentThread;
        }

        public void open(string programId)
        {
            var obj = new JObject();
            obj.Add("id", programId);
            obj.Add("program", true);

            Console.WriteLine("Opening");

            var res = Emit("open", obj);
            res.Wait();
            Console.WriteLine("id: {0}", res.Result);
        }

        public void Pause()
        {
            // main.Suspend();
        }

        public void PushVertex(int id)
        {
            vertecies.Add(id);
        }

        public void PushVertex(int id, Dictionary<string, dynamic> props)
        {
            vertecies.Add(id);
        }

        private Task<object> Emit(string ev, JToken data)
        {
            return Task.Run(() =>
            {
                var t = new TaskCompletionSource<object>();

                sock.Emit(ev, res => t.TrySetResult(res), data);

                return t.Task;
            });
        }

        private Task<object> Emit(string ev)
        {
            return Task.Run(() =>
            {
                var t = new TaskCompletionSource<object>();

                sock.Emit(ev, res =>
                {
                    //Console.WriteLine(res);
                    t.TrySetResult(res);
                }, new JObject());

                return t.Task;
            });
        }

        private Task<object> On(string ev)
        {
            return Task.Run(() =>
            {
                var r = new TaskCompletionSource<object>();

                sock.On(ev, (data) =>
                {
                    r.SetResult(data);
                    sock.Off(ev);
                });

                return r.Task;
            });
        }

        public Node[] getGraph(int type)// 1 - edge list, 2 - adj list
        {
            //sock.Emit()
            var obj = new JObject();
            obj.Add("type", type);
            var task = Emit("getGraph", obj);
            //Console.WriteLine(res);
            task.Wait();
            obj = (JObject)task.Result;

            var res = Newtonsoft.Json.JsonConvert.DeserializeObject<Node[]>(((JArray)obj.GetValue("vertices")).ToString());

            return res;
        }

        public void Story(List<Step> story)
        {
            var arr = new JArray();
            story.ForEach(step =>
            {
                var obj = new JObject();

                obj.Add("id", step.id);

                var props = new JObject();
                foreach (var kvp in step.props)
                {
                    props.Add(kvp.Key, kvp.Value);
                }

                obj.Add("props", props);
                arr.Add(obj);
            });


            var task = Emit("story", arr);
            task.Wait();
            Console.WriteLine(task.Result);
        }

        public void Upload()
        {
            var obj = new JObject();
            obj.Add("array", new JArray(vertecies.ToArray()));
            sock.Emit("graphOrder", obj);

        }
    }
}
