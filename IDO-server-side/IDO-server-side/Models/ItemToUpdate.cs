namespace IDO_server_side.Models
{
    public class ItemToUpdate
    {
        public int id { get; set; }
        public string fieldToUpdate { get; set; }
        public string newContent { get; set; }
        public ItemToUpdate(int id, string fieldToUpdate, string newContent)
        {
            this.id = id;
            this.fieldToUpdate = fieldToUpdate;
            this.newContent = newContent;
        }
    }
}
