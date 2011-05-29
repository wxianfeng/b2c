(function($) {
    $(document).ready(function() {
        // remove shipping option
        $('a.shipping').live('click',
        function(event) {
            event.preventDefault();
            $(this).parent('div.category_group').remove();

        });

        // Selecting product Categories
        $("select.select_category").live('change',
        function(event) {
            var ProductCategoryID = $(this).val();

            // remove all child nodes
            $(this).parent().nextAll('div.category_group').each(function() {
                $(this).remove();
            });

            // category_id will always be the parent product_id until user selects another category
            if (ProductCategoryID.length == 0) {
                var ParentCategoryID = $(this).attr('id').replace(/\D+/, '');
                $('#product_category_id').val(ParentCategoryID);
            }
            else {
                $('#product_category_id').val(ProductCategoryID);
            }
            // $('#product_category_id').val(ProductCategoryID);
            if (ProductCategoryID.length != 0) {

                $.getJSON('/admin/categories/get_category?category_id=' + ProductCategoryID,
                function(data) {

                    // do not show empty select boxes
                    if (! (jQuery.isEmptyObject(data))) {
	
                        // var LastSelect = $('div#select_category');
                        var LastSelect = $('div.category_group').last()[0];

                        // $(LastSelect).append('<div class="category_group"><select id="category_' + ProductCategoryID + '" class="select_category children"><option value="">Select Category</option></select></div>');
                        $('<div class="category_group"><select id="category_' + ProductCategoryID + '" class="select_category children"><option value="">Select a Category</option></select></div>').insertAfter(LastSelect);


                        $.each(data,
                        function(key, val) {
                            $('#category_' + ProductCategoryID).append('<option value="' + key + '">' + val + '</option>');
                        });
                    }
                });

            }

        });

    })
})(jQuery);