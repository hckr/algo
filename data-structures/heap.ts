/**
 * Can `first` be a parent of `second`?
 * */
type HeapCompare<T> = (first: T, second: T) => boolean;

export function createMinHeap<T>(): Heap<T> {
    return new Heap<T>((a, b) => a < b);
}

export function createMaxHeap<T>(): Heap<T> {
    return new Heap<T>((a, b) => a > b);
}

class Heap<T> {
    private elements: T[] = [];

    private compare: HeapCompare<T> = () => {
        throw new Error("not implemented");
    };

    constructor(compare: HeapCompare<T>) {
        this.compare = compare;
    }

    size() {
        return this.elements.length;
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    add(elem: T) {
        this.elements.push(elem);

        let elemInd = this.elements.length - 1;
        let parentInd;

        while ((parentInd = this.parentInd(elemInd)) !== null) {
            if (this.compare(elem, this.elements[parentInd])) {
                this.swapInds(elemInd, parentInd);
                elemInd = parentInd;
            } else {
                break;
            }
        }
    }

    peek(): T | null {
        if (this.elements.length > 0) {
            return this.elements[0];
        }
        return null;
    }

    poll(): T | null {
        if (this.elements.length === 0) {
            return null; // no elements
        }
        let lastElement = this.elements.pop()!;
        if (this.elements.length === 0) {
            return lastElement; // only root
        }
        let prevRoot = this.elements[0];

        this.elements[0] = lastElement;
        let elemInd = 0;

        while (1) {
            const childrenInds = this.childrenInds(elemInd);
            if (childrenInds.length === 0) {
                break;
            }
            let childToSwapInd = childrenInds[0];
            if (childrenInds.length == 2) {
                if (
                    this.compare(
                        this.elements[childrenInds[1]],
                        this.elements[childrenInds[0]]
                    )
                ) {
                    childToSwapInd = childrenInds[1];
                }
            }
            if (
                this.compare(
                    this.elements[childToSwapInd],
                    this.elements[elemInd]
                )
            ) {
                this.swapInds(childToSwapInd, elemInd);
                elemInd = childToSwapInd;
            } else {
                break;
            }
        }

        return prevRoot;
    }

    private swapInds(a: number, b: number) {
        const tmp = this.elements[a];
        this.elements[a] = this.elements[b];
        this.elements[b] = tmp;
    }

    private parentInd(elemInd: number): number | null {
        if (elemInd === 0) {
            return null;
        }
        return Math.floor((elemInd - 1) / 2);
    }

    private childrenInds(elemInd: number) {
        return [elemInd * 2 + 1, elemInd * 2 + 2].filter(
            (x) => x < this.elements.length
        );
    }

    // ---

    print(width = 30) {
        // only for debugging ;)
        let itemsPerLine = 1;
        let i = 0;
        let lines: string[] = [];
        while (i < this.elements.length) {
            const xsInLine = itemsPerLine + 2;
            lines.push(
                `x${this.elements
                    .slice(i, i + itemsPerLine)
                    .join("x")}x`.replace(
                    /x/g,
                    " ".repeat(Math.floor((width - itemsPerLine) / xsInLine))
                )
            );
            i += itemsPerLine;
            itemsPerLine *= 2;
        }
        lines.forEach((l) => console.log(l.replace(/x/g, " ")));
    }
}
