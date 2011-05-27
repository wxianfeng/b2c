class Category < ActiveRecord::Base
  has_ancestry
  has_many :products
  has_many :children , :foreign_key => "ancestry" , :class_name=> "Category" , :dependent => :destroy

  validates :name , :presence => true  , :uniqueness => true

  before_save :cache_ancestry

  before_validation :set_full_category_path, :on => :create

  def cache_ancestry
    self.names_depth_cache = path.map(&:name).join('/')
  end

  def to_label
    full_path
  end

  private

    def set_full_category_path
      if parent
        self.full_path = "#{parent.full_path} >> #{name}"
      else
        self.full_path = name
      end
    end

end
