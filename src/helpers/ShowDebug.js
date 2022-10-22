class ShowDebug{
    showObject(objectName,object){
        console.log(`\n\n
############################################################
🛑 DEBUG LOG 🛑 \n
❓ ${objectName} ❓`);
        console.table(object);
    }
}
const sDeb = new ShowDebug();
module.exports = sDeb;