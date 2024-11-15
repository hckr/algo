import { createMinHeap, createMaxHeap } from "../data-structures/heap";

class MedianFinder {
    private minHeap = createMinHeap<number>();
    private maxHeap = createMaxHeap<number>();

    addNum(num: number): void {
        if (this.minHeap.isEmpty() && this.maxHeap.isEmpty()) {
            this.minHeap.add(num);
            return;
        }

        if (num > this.minHeap.peek()!) {
            this.minHeap.add(num);
        } else {
            this.maxHeap.add(num);
        }

        // rebalance:

        if (this.minHeap.size() - this.maxHeap.size() > 1) {
            this.maxHeap.add(this.minHeap.poll()!);
        } else if (this.maxHeap.size() - this.minHeap.size() > 1) {
            this.minHeap.add(this.maxHeap.poll()!);
        }
    }

    findMedian(): number | null {
        if (this.minHeap.size() > this.maxHeap.size()) {
            return this.minHeap.peek();
        } else if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek();
        } else {
            if (this.maxHeap.isEmpty() || this.minHeap.isEmpty()) {
                return null;
            }
            return (this.minHeap.peek()! + this.maxHeap.peek()!) / 2;
        }
    }
}

const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian());
mf.addNum(3);
console.log(mf.findMedian());
