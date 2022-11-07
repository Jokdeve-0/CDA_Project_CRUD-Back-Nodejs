class BaseEditor{
    constructor(params){
        this.name = params.name;
        this.isbn_product = params.isbn_product;
        this.isbn_country = params.isbn_country;
        this.isbn_editor = params.isbn_editor; 
    }
}


class Editor extends BaseEditor{
    constructor(params){
        super(params);
        this.id = params.id;
        this.created_at = params.created_at;
        this.updated_at = params.updated_at;
    }
}
module.exports = Editor;