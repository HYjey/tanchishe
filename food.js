let Food = (function (n) {
    let foods = []
    return function (liveSpace,num = null, lx=0, ly=0,size=20) {
        if (num == null) {
            for (let i = 0; i < n; i++) {
                let tempfood = document.createElement("div")
                liveSpace.appendChild(tempfood)
                tempfood.className = "food"
                tempfood.style.width = size + "px"
                tempfood.style.height = size + "px"
                tempfood.style.left = Math.floor(Math.random() * (liveSpace.clientWidth-tempfood.clientWidth)) + "px"
                tempfood.style.top = Math.floor(Math.random() * (liveSpace.clientHeight-tempfood.clientHeight)) + "px"
                tempfood.x0 = tempfood.offsetLeft + tempfood.clientWidth / 2
                tempfood.y0 = tempfood.offsetTop + tempfood.clientHeight / 2
                foods.push(tempfood)
                this.el = foods
                this.foodsNum = n
            }
        } else {
            foods[num].style.left = lx + "px"
            foods[num].style.top = ly + "px"
            foods[num].style.width = size + "px"
            foods[num].style.height = size + "px"
            foods[num].x0 = foods[num].offsetLeft + foods[num].clientWidth / 2
            foods[num].y0 = foods[num].offsetTop + foods[num].clientHeight / 2
        }
    }
}(10))
Food.prototype.beEat = function (x0, y0, callback) {
    let count = 0
    for (let i = 0; i < this.foodsNum; i++) {
        if (Math.abs(x0 - this.el[i].x0) <= this.el[i].clientWidth && Math.abs(y0 - this.el[i].y0) <= this.el[i].clientHeight) {
            callback(i)
            count++;
        }
    }
    return count
}