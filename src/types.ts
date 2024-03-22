import React from 'react'
import { EditableProps } from 'slate-react/dist/components/editable'
import { Descendant, Element, Text } from 'slate'

export type ChildrenProps = {
  children: Descendant[]
}

export type ElementProps = {
  element: Element
}

export type LeafProps = {
  leaf: Text
}

export type SlatePresentationContextProps = {
  renderElement: EditableProps['renderElement']
  renderLeaf: EditableProps['renderLeaf']
  LeafWrapper: React.ComponentType | keyof JSX.IntrinsicElements
}

export type SlateReactPresentationProps = {
  value?: Descendant[]
  renderElement?: EditableProps['renderElement']
  renderLeaf?: EditableProps['renderLeaf']
  LeafWrapper?: React.ComponentType | keyof JSX.IntrinsicElements
}
