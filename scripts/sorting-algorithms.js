"use strict";
class sortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
    }

    // BUBBLE SORT
    BubbleSort = async () => {
        for (let i = 0; i < this.size - 1; ++i) {
            for (let j = 0; j < this.size - i - 1; ++j) {
                await this.help.mark(j);
                await this.help.mark(j + 1);
                if (await this.help.compare(j, j + 1)) {
                    await this.help.swap(j, j + 1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
            }
            this.list[this.size - i - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
        
        document.getElementById('time').innerHTML = "O(n^2)";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
        // document.querySelector("footer").style.visibility = "visible";
    }

    // INSERTION SORT
    InsertionSort = async () => {
        for (let i = 0; i < this.size - 1; ++i) {
            let j = i;
            while (j >= 0 && await this.help.compare(j, j + 1)) {
                await this.help.mark(j);
                await this.help.mark(j + 1);
                await this.help.pause();
                await this.help.swap(j, j + 1);
                await this.help.unmark(j);
                await this.help.unmark(j + 1);
                j -= 1;
            }
        }
        for (let counter = 0; counter < this.size; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
        document.getElementById('time').innerHTML = "O(n^2)";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
        // document.querySelector("footer").style.visibility = "visible";
    }

    // SELECTION SORT
    SelectionSort = async () => {
        for (let i = 0; i < this.size; ++i) {
            let minIndex = i;
            for (let j = i; j < this.size; ++j) {
                await this.help.markSpl(minIndex);
                await this.help.mark(j);
                if (await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.help.unmark(j);
                await this.help.markSpl(minIndex);
            }
            await this.help.mark(minIndex);
            await this.help.mark(i);
            await this.help.pause();
            await this.help.swap(minIndex, i);
            await this.help.unmark(minIndex);
            this.list[i].setAttribute("class", "cell done");
        }
        document.getElementById('time').innerHTML = "O(n^2)";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
        // document.querySelector("footer").style.visibility = "visible";
    }

    // MERGE SORT
    MergeSort = async () => {
        await this.MergeDivider(0, this.size - 1);
        for (let counter = 0; counter < this.size; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
        document.getElementById('time').innerHTML = "O(nlog(n))";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
        // document.querySelector("footer").style.visibility = "visible";
    }

    MergeDivider = async (start, end) => {
        if (start < end) {
            let mid = start + Math.floor((end - start) / 2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid + 1, end);
            await this.Merge(start, mid, end);
        }
    }

    Merge = async (start, mid, end) => {
        let newList = new Array();
        let frontcounter = start;
        let midcounter = mid + 1;

        while (frontcounter <= mid && midcounter <= end) {
            let fvalue = Number(this.list[frontcounter].getAttribute("value"));
            let svalue = Number(this.list[midcounter].getAttribute("value"));
            if (fvalue >= svalue) {
                newList.push(svalue);
                ++midcounter;
            }
            else {
                newList.push(fvalue);
                ++frontcounter;
            }
        }
        while (frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("value")));
            ++frontcounter;
        }
        while (midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("value")));
            ++midcounter;
        }

        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell current");
        }
        for (let c = start, point = 0; c <= end && point < newList.length;
            ++c, ++point) {
            await this.help.pause();
            this.list[c].setAttribute("value", newList[point]);
            this.list[c].style.height = `${3.5 * newList[point]}px`;
        }
        for (let c = start; c <= end; ++c) {
            this.list[c].setAttribute("class", "cell");
        }
    }

    // QUICK SORT
    QuickSort = async () => {
        await this.QuickDivider(0, this.size - 1);
        for (let c = 0; c < this.size; ++c) {
            this.list[c].setAttribute("class", "cell done");
        }
        document.getElementById('time').innerHTML = "O(nlog(n))";
        document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
        // document.querySelector("footer").style.visibility = "visible";
    }

    QuickDivider = async (start, end) => {
        if (start < end) {
            let pivot = await this.Partition(start, end);
            await this.QuickDivider(start, pivot - 1);
            await this.QuickDivider(pivot + 1, end);
        }
    }

    Partition = async (start, end) => {
        let pivot = this.list[end].getAttribute("value");
        let prev_index = start - 1;

        await this.help.markSpl(end);
        for (let c = start; c < end; ++c) {
            let currValue = Number(this.list[c].getAttribute("value"));
            await this.help.mark(c);
            if (currValue < pivot) {
                prev_index += 1;
                await this.help.mark(prev_index);
                await this.help.swap(c, prev_index);
                await this.help.unmark(prev_index);
            }
            await this.help.unmark(c);
        }
        await this.help.swap(prev_index + 1, end);
        await this.help.unmark(end);
        return prev_index + 1;
    }
    // HEAP SORT
    // HEAP SORT
// HEAP SORT (Descending Order)
HeapSort = async () => {
    // Build Min Heap
    for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) {
        await this.heapify(this.size, i);
    }

    // Extract elements one by one
    for (let i = this.size - 1; i > 0; i--) {
        await this.help.swap(0, i); // Move min element to the end
        await this.heapify(i, 0); // Restore heap property
        this.list[i].setAttribute("class", "cell done");
    }
    this.list[0].setAttribute("class", "cell done");

    document.getElementById('time').innerHTML = "O(nlog(n))";
    document.querySelector(".footer > p:nth-child(1)").style.visibility = "visible";
}

// Min Heapify (for descending order)
heapify = async (n, i) => {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && await this.help.compare(left, smallest)) {
        smallest = left;
    }
    if (right < n && await this.help.compare(right, smallest)) {
        smallest = right;
    }
    if (smallest !== i) {
        await this.help.swap(i, smallest);
        await this.heapify(n, smallest);
    }
}

    // RADIX SORT
    RadixSort = async () => {
        let max = Math.max(...[...this.list].map(el => Number(el.getAttribute("value"))));
        let exp = 1;
        while (Math.floor(max / exp) > 0) {
            await this.countingSort(exp);
            exp *= 10;
        }
        for (let counter = 0; counter < this.size; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
        document.getElementById('time').innerHTML = "O(nk)";
    }

    countingSort = async (exp) => {
        let list = this.list;
        let n = list.length;
        let output = new Array(n);
        let count = new Array(10).fill(0);
        for (let i = 0; i < n; i++) {
            let value = Number(list[i].getAttribute("value"));
            count[Math.floor(value / exp) % 10]++;
        }
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        for (let i = n - 1; i >= 0; i--) {
            let value = Number(list[i].getAttribute("value"));
            let pos = count[Math.floor(value / exp) % 10] - 1;
            output[pos] = value;
            count[Math.floor(value / exp) % 10]--;
        }
        for (let i = 0; i < n; i++) {
            list[i].setAttribute("value", output[i]);
            list[i].style.height = `${3.8 * output[i]}px`;
            await this.help.pause();
        }
    }
};