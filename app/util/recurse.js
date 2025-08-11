// This function goes through the settings array
//      and reformats it in a way that can be put into
//      a checkbox tree
export const edit = (node, label) => {
    let flag = false;
    let tmp = {
        name: label,
        children: [],
        checked: flag,
    };

    if (typeof node == 'boolean') {
        tmp.checked = node;
        return tmp;
    }

    if ('checked' in node) {
        flag = node.checked;
    }

    let keys = Object.keys(node);
    for (let key of keys) {
        let child = edit(node[key], key);
        if (child) tmp.children.push(child);
    }
    return tmp;
};

export const initializeChecked = (node, checked) => {
    const stack = [node];

    // Find the node we want to update
    while (stack.length > 0) {
        const node = stack.pop();

        checked = {
            ...checked,
            [node.name]: node.checked,
        };

        for (let child of node.children) {
            stack.push(child);
        }
    }

    return checked;
};

export const updateDescendants = (
    node,
    checkedLabel,
    value,
    checked,
    clientName
) => {
    const stack = [node];

    // Find the node we want to update
    while (stack.length > 0) {
        // Peek
        if (stack[stack.length - 1].name == checkedLabel) break;

        const node = stack.pop();

        for (let child of node.children) {
            stack.push(child);
        }
    }

    const newStack = [stack.pop()];

    // Update that node and all of its children
    while (newStack.length > 0) {
        const node = newStack.pop();

        checked = {
            ...checked,
            [node.name]: value,
        };

        node.checked = value;

        for (let child of node.children) {
            newStack.push(child);
        }
    }

    return checked;
};

export const wrapperFunction = (node, updatedChecked, clientName) => {
    const updateParentsFromChildren = (node, prev, updatedChecked) => {
        if (!node.children || node.children.length == 0) {
            return prev[node.name] || false;
        }

        const verifiedNodeChildren = node.children.map((child) =>
            updateParentsFromChildren(child, prev, updatedChecked)
        );
        const allVerified = verifiedNodeChildren.every(Boolean);

        updatedChecked[node.name] = allVerified;
        node.checked = allVerified;

        return allVerified;
    };

    let updatedChecked2 = { ...updatedChecked };
    for (let child of node.children) {
        updateParentsFromChildren(child, updatedChecked, updatedChecked2);
    }
    return updatedChecked2;
};
