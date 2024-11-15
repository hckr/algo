/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
    if (root === null) {
        return "";
    }
    return `${root.val}(${serialize(root.left)},${serialize(root.right)})`;
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    if (data === "") {
        return null;
    }
    let i = 0,
        j = 0;
    for (; data[j] !== "("; ++j);
    const value = data.substring(i, j);
    j += 1;
    i = j;
    let parensLevel = 0;
    for (; data[j] !== "," || parensLevel > 0; ++j) {
        if (data[j] === "(") {
            parensLevel += 1;
        }
        if (data[j] === ")") {
            parensLevel -= 1;
        }
    }
    const left = data.substring(i, j);
    const right = data.substring(j + 1, data.length - 1);
    return new TreeNode(+value, deserialize(left), deserialize(right));
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
