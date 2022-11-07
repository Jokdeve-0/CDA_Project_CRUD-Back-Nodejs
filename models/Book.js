class BaseBook{
    constructor(params){
        this.uuid = params.uuid;
        this.isbn_article = params.isbn_article;
        this.title = params.title; 
        this.authors = params.authors; 
        this.metadata = params.metadata; 
        this.nav = params.nav; 
        this.editor_id = params.editor_id; 
    }
}


class Book extends BaseBook{
    constructor(params){
        super(params);
        this.id = params.id;
        this.created_at = params.created_at;
        this.updated_at = params.updated_at;
    }
}
module.exports = Book;