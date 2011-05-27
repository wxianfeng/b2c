class Category < ActiveRecord::Base
  has_ancestry
  has_many :products

  validates :name , :presence => true  , :uniqueness => true

  before_save :cache_ancestry

  before_validation :set_full_category_path, :on => :create

  def cache_ancestry
    self.names_depth_cache = path.map(&:name).join('/')
  end

  def to_label
    full_path
  end


  def parents(include_self=false)
    ps = include_self == true ? [self] : []
    s = self.parent
    while s.present?
      ps << s
      s = s.parent
    end
    ps
  end

  def self.first_category
    Category.where("parent_id IS NULL")
  end

  ##
  # {:a=>[:a1,:a2],:b=>[:b1,:b2]}
  def self.all_categories
    acs = {}
    Category.where("public = 1").find_each do |c|
      acs.update(c.name => c.childrens.map(&:name))
    end
    acs
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
