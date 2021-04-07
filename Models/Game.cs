using System.Collections;
using System.Collections.Generic;

namespace ToDoApi.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Publisher { get; set; }
        public string Developer { get; set; }
        public string ReleaseDate { get; set; }
        public string Engine { get; set; }
        public ICollection<Genre>  Genres { get; set; }
        public ICollection<Mode> Modes { get; set; }
        public int Float { get; set; }
    }
}