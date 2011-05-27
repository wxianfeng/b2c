(function($) {
    $(document).ready(function() {
	    // Selecting product Categories
        $("select.select_category").live('change',
        function(event) {

            var ProductCategoryID = $(this).val();

            // remove all child nodes
            $(this).nextAll().each(function() {
                if ($(this).hasClass('children')) {
                    $(this).remove();
                }
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
            $.getJSON('/admin/categories/get_category?category_id=' + ProductCategoryID,
            function(data) {

                // do not show empty select boxes
                if (! (jQuery.isEmptyObject(data))) {

                    var LastSelect = $('div#select_category');

                    $(LastSelect).append('<select id="category_' + ProductCategoryID + '" class="select_category children" multiple="multiple"><option value="">Select Category</option></select>');

                    $.each(data,
                    function(key, val) {
                        $('#category_' + ProductCategoryID).append('<option value="' + key + '">' + val + '</option>');
                    });
                }
            });


        });

    })
})(jQuery);