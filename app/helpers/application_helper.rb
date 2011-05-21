module ApplicationHelper
  def title(page_title, show_title = true)
    @show_title = show_title
    content_for(:title) { page_title.to_s }
  end

  def show_title?
    @show_title
  end
  
  def error_messages_for obj
    html = ''
    if obj.errors.any?      
      html << %Q{<div class="errorExplanation">}
      html << %Q(<ul>)
      obj.errors.each { |attr,msg|
        html << %Q(<li> #{msg}</li>)
      }
      html << %Q{</ul>}
      html << %Q{</div>}
    end
    raw html
  end
end
