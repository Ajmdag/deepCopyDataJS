const copier = value => {

    // функция, определяющая тип аргумента, принимаемого функцией (объект, массив или нечто иное)
    const checkObjOrArr = val => {
        if (Array.isArray(val)) {
            return 'array'
        } else if (val === Object(val)) {
            return 'object'
        } else {
            return 'else'
        }
    }

    // результирующая переменная
    let resultValue

    // Если переданное значение массив - копируем содержимое массива
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

    // Если переданное значение объект - копируем содержимое объекта
    if (checkObjOrArr(value) === 'object') {
        resultValue = {}
        Object.keys(value).forEach(key => {
            if (checkObjOrArr(value[key]) === 'else') {
                Object.assign(resultValue, { [key]: value[key] })
            } else {
                Object.assign(resultValue, { [key]: copier(value[key]) })
            }
        })
    }

    return resultValue === undefined ? value : resultValue
}

// Тесты ниже

const arr = [1, 'string', 2, [3, 5, { yes: 'another', not: { thing: 'different', but: true } }]]

const obj = {
    wow: 'string',
    ar: [1, 2, '6?'],
    few: [4, 5, 'nothing']
}
console.log(copier(obj))
console.log(copier(arr))

console.log(copier('string'))
console.log(copier(444))
console.log(copier(false))
console.log(copier(null))
console.log(copier(undefined))
