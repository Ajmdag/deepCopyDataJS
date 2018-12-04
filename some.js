const copier = value => {

    // функция, определяющая тип аргумента, принимаемого функцией (объект, массив или нечто иное)
    const checkObjOrArr = val => {
        if (Array.isArray(val)) {
            return 'array'
        } else if (val instanceof Object) {
            return 'object'
        } else {
            return 'else'
        }
    }

    // результирующая переменная
    let resultValue

    if (checkObjOrArr(value) === 'array') {
        resultValue = []
        value.forEach((item, index) => {
            if (checkObjOrArr(item) === 'else') {
                resultValue[index] = item
            } else {
                resultValue[index] = copier(item)
            }
        })
    }

    if (checkObjOrArr(value) === 'object') {
        resultValue = {};

        Object.keys(value).forEach(key => {
            Object.values(value).forEach(objectValue => {
                Object.assign(resultValue, { [key]: objectValue })
            })
        })
    }

    return resultValue
}

const arr = [1, [2, [2, { wow: 'string' }, 99], 3, 4], 5, 6]

console.log(copier(arr))
