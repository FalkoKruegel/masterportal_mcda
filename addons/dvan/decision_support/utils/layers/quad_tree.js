
/**
 * quad node for quad tree
 */
class QuadNode {
    x;
    y;
    value;
    child1;
    child2;
    child3;
    child4;

    /**
     * constructor
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {any} value value for given coordinate
     */
    constructor (x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.child1 = null;
        this.child2 = null;
        this.child3 = null;
        this.child4 = null;
    }
}

/**
 * simple quad tree as grid-layer feature-store
 */
class QuadTree {
    root;

    /**
     * constructor
     */
    constructor () {
        this.root = null;
    }

    /**
     * returns the value of a given x,y coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {any} value of the coordinate
     */
    get (x, y) {
        let focus = this.root;

        if (focus === null) {
            return null;
        }
        while (true) {
            if (Math.abs(x - focus.x) < 0.00001 && Math.abs(y - focus.y) < 0.00001) {
                return focus.value;
            }
            if (x >= focus.x && y >= focus.y) {
                if (focus.child1 === null) {
                    break;
                }
                else {
                    focus = focus.child1;
                    continue;
                }
            }
            if (x < focus.x && y >= focus.y) {
                if (focus.child2 === null) {
                    break;
                }
                else {
                    focus = focus.child2;
                    continue;
                }
            }
            if (x < focus.x && y < focus.y) {
                if (focus.child3 === null) {
                    break;
                }
                else {
                    focus = focus.child3;
                    continue;
                }
            }
            if (x >= focus.x && y < focus.y) {
                if (focus.child4 === null) {
                    break;
                }
                else {
                    focus = focus.child4;
                    continue;
                }
            }
        }
        return null;
    }

    /**
     * inserts a element into the quadtree
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {any} value value of the element
     * @return {void}
     */
    insert (x, y, value) {
        if (this.root === null) {
            this.root = new QuadNode(x, y, value);
        }
        else {
            let focus = this.root;

            while (true) {
                if (x === focus.x && y === focus.y) {
                    focus.value = value;
                    break;
                }
                if (x >= focus.x && y >= focus.y) {
                    if (focus.child1 === null) {
                        focus.child1 = new QuadNode(x, y, value);
                        break;
                    }
                    else {
                        focus = focus.child1;
                        continue;
                    }
                }
                if (x < focus.x && y >= focus.y) {
                    if (focus.child2 === null) {
                        focus.child2 = new QuadNode(x, y, value);
                        break;
                    }
                    else {
                        focus = focus.child2;
                        continue;
                    }
                }
                if (x < focus.x && y < focus.y) {
                    if (focus.child3 === null) {
                        focus.child3 = new QuadNode(x, y, value);
                        break;
                    }
                    else {
                        focus = focus.child3;
                        continue;
                    }
                }
                if (x >= focus.x && y < focus.y) {
                    if (focus.child4 === null) {
                        focus.child4 = new QuadNode(x, y, value);
                        break;
                    }
                    else {
                        focus = focus.child4;
                        continue;
                    }
                }
            }
        }
    }

    /**
     * @yields {any} all quad-nodes
     * @returns {void}
     */
    *getAllNodes () {
        yield* this.traverse(this.root);
    }

    /**
     * recursively traverses quad-nodes
     * @param {QuadNode} node current node
     * @yields {any} child nodes
     * @returns {void}
     */
    *traverse (node) {
        if (node !== null) {
            yield {x: node.x, y: node.y, value: node.value};
            yield* this.traverse(node.child1);
            yield* this.traverse(node.child2);
            yield* this.traverse(node.child3);
            yield* this.traverse(node.child4);
        }
    }
}

export {QuadTree};
