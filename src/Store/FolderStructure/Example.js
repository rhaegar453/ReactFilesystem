const Folder=require('./Folder');

let fd=new Folder({name:'Root', root:true})


// fd.addFileToChild({name:'First', pathArr:['0']})
fd.addFolderToChild({name:'Shiv',pathArr:[]});
fd.addFolderToChild({name:'Sachin',pathArr:[]});
fd.addFolderToChild({name:'Sheela',pathArr:[]});


fd.addFolderToChild({name:'Dinesh', pathArr:['1']})

console.log(fd);