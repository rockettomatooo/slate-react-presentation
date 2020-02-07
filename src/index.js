import React from 'react';

const SlatePresentationContext = React.createContext(null);

function useSlatePresentation() {
    return React.useContext(SlatePresentationContext);
}

function isText(value) {
    // TODO: maybe use 'is-plain-object' instead of instanceof Object
    return value instanceof Object && typeof value.text === 'string';
}
function isElement(value) {
    // TODO: maybe use 'is-plain-object' instead of instanceof Object
    return value instanceof Object && Array.isArray(value.children);
}

function Element({ element = { children: [] } }) {
    const { renderElement } = useSlatePresentation();

    return <React.Fragment>{renderElement({ attributes: {}, children: <Children children={element.children} />, element })}</React.Fragment>;
}

function Leaf({ leaf = { text: '' } }) {
    const { renderLeaf } = useSlatePresentation();

    return <React.Fragment>{renderLeaf({ attributes: {}, children: <span>{leaf.text}</span>, leaf, text: leaf.text })}</React.Fragment>;
}

function Children({ children = [] }) {
    return (
        <React.Fragment>
            {children.map((child, i) => {
                if (isElement(child)) {
                    return <Element key={i} element={child} />;
                } else {
                    return <Leaf key={i} leaf={child} />;
                }
            })}
        </React.Fragment>
    );
}

export function SlateReactPresentation({ value = [], renderElement = props => <DefaultElement {...props} />, renderLeaf = props => <DefaultLeaf {...props} /> }) {
    return (
        <SlatePresentationContext.Provider value={{ renderElement, renderLeaf }}>
            <Children children={value} />
        </SlatePresentationContext.Provider>
    );
}

function DefaultElement({ children, element }) {
    return <div>{children}</div>;
}
function DefaultLeaf({ children, leaf }) {
    return <span>{children}</span>;
}