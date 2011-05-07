class Upload::Picture < Asset::Asset
  has_attached_file :data,
                    :url  => "/uploads/pictures/:id/:style_:basename.:extension",
                    :path => ":rails_root/public/uploads/pictures/:id/:style_:basename.:extension",
	                  :styles => { :medium => '575>', :thumb => '100x100' }
end