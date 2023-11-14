import React from 'react'
import { isElement } from './utils'
import {
  ChildrenProps,
  ElementProps,
  LeafProps,
  SlatePresentationContextProps,
  SlateReactPresentationProps,
} from './types'
import { RenderElementProps, RenderLeafProps } from 'slate-react/dist/components/editable'

const SlatePresentationContext = React.createContext<SlatePresentationContextProps | null>(null)

function useSlatePresentation() {
  return React.useContext(SlatePresentationContext) as SlatePresentationContextProps
}

function Element({ element = { children: [] } }: ElementProps) {
  const { renderElement } = useSlatePresentation()

  return (
    <React.Fragment>
      {renderElement?.({ attributes: {} as any, children: <Children children={element.children} />, element })}
    </React.Fragment>
  )
}

function Leaf({ leaf = { text: '' } }: LeafProps) {
  const { renderLeaf, LeafWrapper } = useSlatePresentation()

  return (
    <React.Fragment>
      {renderLeaf?.({ attributes: {} as any, children: <LeafWrapper>{leaf.text}</LeafWrapper>, leaf, text: leaf })}
    </React.Fragment>
  )
}

function Children({ children = [] }: ChildrenProps) {
  return (
    <React.Fragment>
      {children.map((child, i) => {
        if (isElement(child)) {
          return <Element key={i} element={child} />
        } else {
          return <Leaf key={i} leaf={child} />
        }
      })}
    </React.Fragment>
  )
}

export function SlateReactPresentation(props: SlateReactPresentationProps) {
  const {
    value = [],
    renderElement = (props) => <DefaultElement {...props} />,
    renderLeaf = (props) => <DefaultLeaf {...props} />,
    LeafWrapper = 'span',
  } = props

  return (
    <SlatePresentationContext.Provider value={{ renderElement, renderLeaf, LeafWrapper }}>
      <Children children={value} />
    </SlatePresentationContext.Provider>
  )
}

function DefaultElement({ children }: RenderElementProps) {
  return <div>{children}</div>
}
function DefaultLeaf({ children }: RenderLeafProps) {
  return <span>{children}</span>
}
