# https://gist.github.com/876650
# http://diminishing.org/extending-formtastic-with-a-sprinkle-of-jquery

##
# Usage:
#   <%= semantic_form_for @product  do |f| %>
#      <%= f.input :color , :as=>:color_picker %>
#   <% end %>
#
class ColorPickerFormBuilder <  Formtastic::SemanticFormBuilder
  def color_picker_input(method, options={})
    
    default_colors = [ "#C0C0C0", "#FF6347", "#FFA500", "#FFFF00", "#7FFF00", "#00BFFF", "#C71585" ].freeze
    
    selected_color = @object.send(method)
    
    options[:available] ||= default_colors
    sanitized_object_name ||= @object_name.gsub(/\]\[|[^-a-zA-Z0-9:.]/, "_").sub(/_$/, "")
    sanitized_method_name ||= method.to_s.sub(/\?$/,"")
    c_picker = "<input type=\"hidden\" id=\"id_#{sanitized_object_name}_#{sanitized_method_name}\" name=\"#{@object_name.to_s}[#{method.to_s}]\"/>"
    c_picker << "<script type=\"text/javascript\">"
    c_picker <<   "$('#id_#{sanitized_object_name}_#{sanitized_method_name}').crayonbox("
    c_picker <<     "{" 
    c_picker <<       "colors: new Array(#{options[:available].to_s.gsub(/^\[|\]$/, "")})"
    c_picker <<       ",selected: '#{selected_color}'" if selected_color 
    c_picker <<     "}"
    c_picker <<   "); "
    c_picker << "</script>"
    c_picker.html_safe
  end
end