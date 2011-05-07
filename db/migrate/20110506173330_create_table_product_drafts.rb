class CreateTableProductDrafts < ActiveRecord::Migration
  def self.up
    ##
    # product_drafts just for assoite product with pictures
    create_table :product_drafts , :options => "auto_increment = 20000" do |t|      
    end
  end

  def self.down
    drop_table :product_drafts
  end
end
