module My
  module ProductsHelper
    def display_color_box(color)
      ("<div class='color_palette' style='background-color:#{color.value};></div>").html_safe
    end
  end
  
  def display_my_sidebar
    render :partial => "layouts/sidebars/my_sidebar"
  end
end