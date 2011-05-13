describe("About Category",function(){
    // Category.all_categories.to_json => "{\"xx\":[\"xx1\"],\"xx1\":[\"xx1_1\"],\"xx1_1\":[]}"
    var json = JSON.parse("{\"xx\":[\"xx1\"],\"xx1\":[\"xx1_1\"],\"xx1_1\":[]}")
    expect(typeof(json)).toEqual(object);
    expect(json["xx"]).toEqual("xx1");    
})