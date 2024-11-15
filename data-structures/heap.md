# Heap

A heap is a (binary) tree data structure which adheres to the heap property which is (for min-heap) that every parent is smaller (or larger for max-heap) than its children.

It can be implemented using an array in which the first (0-th) element would be a root, then two of its children, then two of the first child's children and so on. It's confusing at first, but makes sense when one realizes that all "slots" are filled, there are no gaps, and thus for given `i`-th node (counted from top to bottom, left to right when looking at the tree structure, or using a breadth-first / level-order traversal), its children's indexes are `2 * i + 1` and `2 * i + 2`. Looking the other way, for given `j`-th node, its parent has the index `Math.floor((j-1) / 2)`.

           ( 5 )
          /     \
        (6)     (5)
       /  \     /  |
     (7)  (6)  (5)  *nothing here, end of the array*

     --->  heap = [5, 6, 5, 7, 6, 5]

    children(heap[2]) --> 2 * 2 + 1 = heap[5] -> 5; 2 * 2 + 2 = heap[6] -> nil


When adding a new element, it can be inserted as the last one and then a series of comparisons and swaps is done to make sure the heap property is restored. Similarly, when the root is removed, it can be replaced with the last element and the same checks and comparisons have to be done, but going downwards.

Interface of the heap is:
 * add
 * poll (or pop/extract): remove and return element
 * peek (or top): return the root element
