function queryBuilder(rules){
    if(!rules || rules.length == 0) return{};
    const query = [];
    let currentGroup = [];

    for(let i =0; i<rules.length; i++){
        const {field, operator, value, logic} = rules[i];
        let mongoOp;
        switch(operator){
            case '>' : mongoOp = '$gt'; break; 
            case '<' : mongoOp = '$lt'; break; 
            case '=' : mongoOp = '$eq'; break; 
            case '>=' : mongoOp = '$gte'; break; 
            case '>=' : mongoOp = '$lte'; break;
            default: throw new Error('Incorrect operator : ', operator); 
        }

        const condition = {[field] : { [mongoOp]: Number(value) }};

        if(i==0){
            currentGroup.push(condition);
        } else if(logic === 'AND'){
            currentGroup.push(condition);
        } else if(logic === 'OR') {
            if(currentGroup.length) {
                query.push({$and : currentGroup});
                currentGroup = [condition];
            }
        }
    }

    if(currentGroup.length){
        query.push({$and : currentGroup});
    }

    return query.length === 1 ? query[0] : {$or : query};
}

export default queryBuilder;