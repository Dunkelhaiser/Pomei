interface Node {
    id?: string;
    type: string;
    children?: NodeChild[];
}

interface NodeChild {
    text?: string;
    children?: NodeChild[];
}

export const extractRichText = (json: string | null) => {
    try {
        const nodes: Node[] = JSON.parse(json?.length ? json : "[]") as {
            id: string;
            type: string;
            children: { text: string }[];
        }[];
        let textString = "";

        const traverse = (node: Node): void => {
            if (node.children) {
                node.children.forEach((child) => {
                    if (child.text) {
                        textString += ` ${child.text}`;
                    }
                    if (child.children) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        traverse(child);
                    }
                });
            }
        };

        nodes.forEach((node) => traverse(node));

        return textString;
    } catch {
        return json;
    }
};
