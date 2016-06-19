using System;
using System.Threading.Tasks;
using CommLib;
using System.Collections.Generic;

namespace WebSocketTest
{


    class Program
    {
        static void Main(string[] args)
        {

            var comm = new SocketIOCommLib();
            comm.open("5766a5716ca3d6716bfe617e");


            var res = comm.getGraph(2);
            List<Step> story = bfs(res);
            story.ForEach(step => Console.WriteLine("step id: {0}", step.id));
            comm.Story(story);
            //  comm.

            Console.WriteLine(res);
            Console.ReadLine();
        }

        static List<Step> dfs(Node[] graph)
        {
            List<Step> res = new List<Step>();
            Stack<Node> s = new Stack<Node>();
            graph[0].level = 1;
            s.Push(graph[0]);
            while (s.Count > 0)
            {
                var el = s.Pop();
                el.used = true;
                int id = el.id;
                Step step = new Step(id);
                res.Add(step);
                if (el.children != null)
                {

                    foreach (var child in el.children)
                    {
                        int to = child.to;
                        var c = graph[to - 1];
                        if (c.used != true)
                        {
                            s.Push(c);
                        }
                    }
                }
            }
            return res;
        }

        static List<Step> bfs(Node[] graph)
        {
            List<Step> res = new List<Step>();
            Queue<Node> s = new Queue<Node>();
            graph[0].level = 1;
            s.Enqueue(graph[0]);
            while (s.Count > 0)
            {
                var el = s.Dequeue();
                el.used = true;
                int id = el.id;
                Step step = new Step(id);
                step.props.Add("level", el.level);
                res.Add(step);
                foreach (var child in el.children)
                {
                    int to = child.to;
                    var c = graph[to - 1];
                    if (c.used != true)
                    {
                        Console.WriteLine("id: {0}", c.id);
                        c.used = true;
                        uint lvl = el.level;
                        c.level = lvl + 1;
                        s.Enqueue(c);
                    }
                }
            }
            return res;
        }
    }
}
