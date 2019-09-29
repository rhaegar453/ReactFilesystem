class File {
    constructor({name}){
        this.name=name;
        this.dateCreated=new Date();
        this.dateUpdated=new Date();
    }
    updateName(name){
        this.name=name;
        this.dateUpdated=new Date();
    }
}


module.exports=File;