class Node {
    constructor(name, isFile = false) {
        this.name = name.toLowerCase();
        this.isFile = isFile;
        this.children = {};
        this.parent = null; // Reference to the parent node
    }
}

class FileSystem {
    constructor() {
        this.root = new Node("");
    }

    toString(node) {
        const pathParts = [];
        let currentNode = node;

        while (currentNode !== null) {
            pathParts.unshift(currentNode.name);
            currentNode = currentNode.parent;
        }

        const absolutePath = pathParts.join('\\');
        return absolutePath.charAt(0) === '\\' ? absolutePath.slice(1) : absolutePath;
    }

    addPath(path, isFile) {
        const lowercasePath = path.toLowerCase();
        const parts = path.split("\\");
        let currentNode = this.root;

        for (const [index, part] of parts.entries()) {
            const isLastPart = index === parts.length - 1;
            const lowercasePart = part.toLowerCase();

            if (!currentNode.children[lowercasePart]) {
                currentNode.children[lowercasePart] = new Node(part, isLastPart ? isFile : false);
                currentNode.children[lowercasePart].parent = currentNode;
            }
            currentNode = currentNode.children[lowercasePart];
        }
    }

    findNode(path) {
        const normalizedPath = path.endsWith("\\") ? path.slice(0, -1) : path;
        const parts = normalizedPath.split("\\");
        let currentNode = this.root;

        for (const part of parts) {
            const lowercasePart = part.toLowerCase();

            if (!currentNode.children[lowercasePart]) {
                return null;
            }
            currentNode = currentNode.children[lowercasePart];
        }

        return currentNode;
    }
}

// Example usage
const fs = new FileSystem();

fs.addPath('C:\\WINDOWS', false);
fs.addPath('C:\\WINDOWS\\SYSTEM32', false)
fs.addPath('C:\\WINDOWS\\SYSTEM32\\cmd.exe', true)

export { fs }