# Slate Presentation

This is a small package that lets you render a [slate.js](https://github.com/ianstormtaylor/slate) document without the overhead of the actual editor.

## Install
Install with yarn:
```
yarn add slate-react-presentation
```
or install with npm:
```
npm install --save slate-react-presentation
```

## Usage

To use this package, simply pass your slate.js document as the `value` along with your `renderElement` and `renderLeaf` functions. Instead of rewriting them, you can also reuse the render functions from your actual editor - this package *should* be 100% compatible with slate.js.

```js
import React, { useCallback } from 'react';
import { SlateReactPresentation } from 'slate-react-presentation';

export function MyDisplayComponent({ document }) {
    const renderElement = useCallback(({ attributes, children, element }) => {
        switch(element.type) {
            case 'h1':
                return <h1 {...attributes}>{children}</h1>
            
            // ...

            default:
                return <p {...attributes}>{children}</p>
        }
    }, []);

    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        if(leaf.bold) {
            children = <b>{children}</b>
        }

        // ...

        return <span {...attributes}>{children}</span>
    }, []);


    return (
        <SlateReactPresentation 
            value={document} // [{ type: 'h1' children: [ ... ]}, ...]
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            />
    )
}
```
