class BaseEditor{
    constructor(params){
        this.name = params.name;
        this.isbn_product = params.isbn_product;
        this.isbn_country = params.isbn_country;
        this.isbn_editor = params.isbn_editor; 
    }
}

module.exports = BaseEditor;