module My
  module ProductsHelper
    def display_color_box(color)
      ("<div class='color_palette' style='background-color:#{color.value};></div>").html_safe
    end
  end
  
  def display_my_sidebar
    render :partial => "layouts/sidebars/my_sidebar"
  end
  
  def display_product_category(category_id)
    # category = Category.find_by_id(category_id)
  end
end