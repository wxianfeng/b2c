module CustomFormtastic
  def self.included(klass)
    Formtastic::SemanticFormBuilder.send(:include, CustomFormtastic::InstanceMethods)
  end

  module  InstanceMethods

    def calendar_input(method, options)
      # don't want to use #{method}_before_type_cast; want to get the value after it has been formatted
      options[:value] ||= @object.send(method) #.try(:to_s, :mdy)
      required_field = options.delete(:required)
      options[:class] = "datepicker"
      
      label(method, options.delete(:label), :required => required_field) + text_field(method, options)
    end
    
    def time_picker_input(method, options)
      options[:value] ||= @object.send(method)
      required_field = options.delete(:required)
      options[:class] = "timepicker"
      
      label(method, options.delete(:label), :required => required_field) + text_field(method, options)
      
    end
    
    def currency_input(method, options)
      options[:size]  = 15
      if @object.new_record?
        options[:value] ||= 0.99 #sets the default price for a ticket if its a new object
      else
        options[:value] ||= @object.send(method).to_s
      end
      label(method, options.delete(:label), options.slice(:required)) + text_field(method, options)
    end

    def cancel_link(location = nil, options = {})
      options[:class]="cancel"
      location ||= template.request.referer
      template.content_tag(:li, template.link_to('Cancel', location, :class => "cancel_link"), :class => "cancel")
    end
  end
end
