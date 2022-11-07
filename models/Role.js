class BaseRole{
    constructor(params){
        this.name = params.name; 
    }
}

export class Role extends BaseRole{
  constructor(params){
    super(params);
    this.id = params.id;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
  }
}
module.exports = Role;
