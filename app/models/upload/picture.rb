class Upload::Picture < Upload::Asset  
  has_attached_file :data,
    :url  => "/assets/pictures/:id/:style_:basename.:extension",
    :path => ":rails_root/public/assets/pictures/:id/:style_:basename.:extension",
    :styles => { :medium => '575>', :thumb => '100x100' }
                  
  def url_medium
    url(:medium)
  end
  
  def url_thumb
    url(:thumb)
  end
end