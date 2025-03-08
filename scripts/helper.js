"use strict";

class Helper {
    constructor(time, list = []) {
        this.time = parseInt(400 / time);
        this.list = list;
    }

    mark = async (index) => {
        this.list[index].classList.add("current");
    };

    markSpl = async (index) => {
        this.list[index].classList.add("min");
    };

    unmark = async (index) => {
        this.list[index].classList.remove("current", "min");
    };

    pause = async () => {
        return new Promise(resolve => setTimeout(resolve, this.time));
    };

    compare = async (index1, index2, order = "asc") => {
        await this.pause();
        let value1 = Number(this.list[index1].getAttribute("value"));
        let value2 = Number(this.list[index2].getAttribute("value"));
        return order === "asc" ? value1 > value2 : value1 < value2;
    };

    swap = async (index1, index2) => {
        await this.pause();
        let [value1, value2] = [
            this.list[index1].getAttribute("value"),
            this.list[index2].getAttribute("value")
        ];
        
        [this.list[index1].style.height, this.list[index2].style.height] = 
            [`${3.8 * value2}px`, `${3.8 * value1}px`];

        this.list[index1].setAttribute("value", value2);
        this.list[index2].setAttribute("value", value1);
    };

    done = async (index) => {
        this.list[index].classList.add("done");
    };

    resetAll = () => {
        this.list.forEach(cell => cell.className = "cell");
    };
}
