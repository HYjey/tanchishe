function deepClone(arr = undefined, spaceM = new Map()) {
    if (typeof (arr) == "object") {
        //区分递归中的arr是数组还是对象
        //用展开运算符先浅克隆一波
        let newArray = Array.isArray(arr) ? [...arr] : { ...arr };
        //代码A部分开始，用Map阻止循环引用的克隆，防止栈溢出。
        //其中key值保存的是arr，value值保存的是newArray，查看到map中已经有存储过的arr时，return终止进一步的for in循环
        if (spaceM.get(arr)) {
            return spaceM.get(arr);
        }
        spaceM.set(arr, newArray)
        //代码A部分结束
        for (const index in arr) {
            if (typeof (arr[index]) == "object") {//发现有引用对象，进行递归deepClone克隆
                newArray[index] = deepClone(arr[index], spaceM)
            }
        }
        return newArray
    } else {
        return arr
    }
}



let sigleEle = function (fn) {
    let _sigleEle = null
    return function (...args) {
        if (_sigleEle) {
            fn.call(_sigleEle, ...args)
            return _sigleEle
        }
        _sigleEle = new fn(...args)
        return _sigleEle
        // fn.call(this, ...args)
        // _sigleEle = this
    }
}