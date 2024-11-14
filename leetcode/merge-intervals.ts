function merge(intervals: number[][]): number[][] {
    // sort by the interval start
    intervals.sort((a, b) => a[0] - b[0]);
    const mergedIntervals = [];
    let last = intervals[0];
    for (let i = 1; i < intervals.length; ++i) {
        const [start, end] = intervals[i];
        if (start <= last[1]) {
            if (end > last[1]) {
                last[1] = end;
            }
        } else {
            mergedIntervals.push(last);
            last = [start, end];
        }
    }
    mergedIntervals.push(last);
    return mergedIntervals;
}
