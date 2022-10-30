exports.buildObjectSeparatesColumnsValues = (entity) => {
    let Tcolumns = [];
    let Tvalues = [];
    for (const property in entity) {
        Tcolumns.push(property);
        Tvalues.push(entity[property]);
    }
    let columns = '';
    let values = '';
    for (let i = 0; i < Tcolumns.length; i++) {
        columns += `\`${Tcolumns[i]}\``;
        if (i != Tcolumns.length - 1) {
            columns += ',';
        }
        values += `'${Tvalues[i]}'`;
        if (i != Tvalues.length - 1) {
            values += ',';
        }
    }
    console.log(columns)
    console.log(values)
    return {
        columns: columns,
        values: values
    }
}
exports.ObjectSeparatesColumnsValuesForAdd = (entity) => {
    let Tcolumns = [];
    let Tvalues = [];
    for (const property in entity) {
        Tcolumns.push(property);
        Tvalues.push(entity[property]);
    }
    let columns = '';
    let values = '';
    for (let i = 0; i < Tcolumns.length; i++) {
        columns += `\`${Tcolumns[i]}\``;
        if (i != Tcolumns.length - 1) {
            columns += ',';
        }
        values += `'${Tvalues[i]}'`;
        if (i != Tvalues.length - 1) {
            values += ',';
        }
    }
    return {
        columns: columns,
        values: values
    }
}
exports.ObjectSeparatesColumnsValuesForAddAndPasswordHash = (entity, hash) => {
    let Tcolumns = [];
    let Tvalues = [];
    for (const property in entity) {
        Tcolumns.push(property);
        if(property === 'password'){
            Tvalues.push(hash);
        }else{
            Tvalues.push(entity[property]);
        }
    }
    let columns = '';
    let values = '';
    for (let i = 0; i < Tcolumns.length; i++) {
        columns += `\`${Tcolumns[i]}\``;
        if (i != Tcolumns.length - 1) {
            columns += ',';
        }
        values += `'${Tvalues[i]}'`;
        if (i != Tvalues.length - 1) {
            values += ',';
        }
    }
    return {
        columns: columns,
        values: values
    }
}