using Microsoft.EntityFrameworkCore;
using ToDoApi.Models;


namespace ToDoApi.Data
{
    public class GamesContext : DbContext
    {

        public GamesContext(DbContextOptions<GamesContext> options) : base(options)
        {
        }
        
        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Mode> Modes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>().ToTable("Game");
            modelBuilder.Entity<Genre>().ToTable("Genre");
            modelBuilder.Entity<Mode>().ToTable("Mode");
        }
        
    }
}