function lengthOfLongestSubstring(s: string): number {
    let longest = 0;
    let i = 0;
    const whereSeen = new Map();
    for (let j = 0; j < s.length; ++j) {
        if (whereSeen.has(s[j])) {
            // repetition occurred!
            for (; i <= whereSeen.get(s[j]); ++i) {
                whereSeen.delete(s[i]);
            }
        }
        whereSeen.set(s[j], j);

        const currentLen = j - i + 1;
        if (currentLen > longest) {
            longest = currentLen;
        }
    }
    return longest;
}
