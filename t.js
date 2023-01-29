var arr = [
    {
        text : 't',
        object : '{}',
        num : '1'
    },
    {
        text : 'e',
        object : '[]',
        num : '2'
    }
]

var obj = arr.map(e => {
    const {num , ...withoutNum} = e;
    return withoutNum;
})
console.log(obj)