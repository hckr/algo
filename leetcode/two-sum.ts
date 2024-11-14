function twoSum(nums: number[], target: number): number[] {
    const seenNumberToIndex: { [num: number]: number } = {};
    for (let i = 0; i < nums.length; ++i) {
        const other = target - nums[i];
        if (other in seenNumberToIndex) {
            return [seenNumberToIndex[other], i];
        }
        seenNumberToIndex[nums[i]] = i;
    }
    return [];
}
