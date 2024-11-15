function ladderLength(
    beginWord: string,
    endWord: string,
    wordList: string[]
): number {
    const edges = prepareAdjacencyList(wordList, beginWord);
    const queue: [string, number][] = [[beginWord, 0]]; // BFS
    const visited = new Set();
    let shortestPathLen = Infinity;

    while (queue.length > 0) {
        let [node, pathLen] = queue.shift()!;
        pathLen += 1;
        if (node == endWord) {
            if (pathLen < shortestPathLen) {
                shortestPathLen = pathLen;
            }
            continue;
        }
        if (visited.has(node)) {
            continue;
        }
        visited.add(node);
        for (const n of edges[node]) {
            queue.push([n, pathLen]);
        }
    }

    return isFinite(shortestPathLen) ? shortestPathLen : 0;
}

/**
 *  Words are adjacent if they differ only by a single letter.
 *  Assuming the array doesn't contain duplicates.
 */
function prepareAdjacencyList(words: string[], beginWord: string) {
    const edges: { [e: string]: string[] } = {};
    for (const a of words) {
        edges[a] = [];
        for (const b of words) {
            if (areAdjacent(a, b)) {
                edges[a].push(b);
            }
        }
    }
    if (!(beginWord in edges)) {
        edges[beginWord] = [];
        for (const b of words) {
            if (areAdjacent(beginWord, b)) {
                edges[beginWord].push(b);
            }
        }
    }
    return edges;
}

/**
 * Assuming a.length === b.length && a.length >= 1
 */
function areAdjacent(a: string, b: string) {
    let diffs = 0;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            if (++diffs > 1) {
                return false;
            }
        }
    }
    return diffs === 1;
}

console.log(
    ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);
