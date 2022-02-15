import { SxProps, Theme } from '@mui/material'
import { LiteralUnion } from 'type-fest'

type BaseElementTypes =
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'paragraph'
  | 'numbered-list'
  | 'bulleted-list'
  | 'block-quote'
  | 'paragraph'
  | 'list-item'
  | 'list-item-child'
  | 'table'
  | 'table_head'
  | 'table_header_cell'
  | 'table_body'
  | 'table_row'
  | 'table_cell'
  | 'code'

type SimpleElement = {
  children: ElementOrTextNode[]
  type: LiteralUnion<BaseElementTypes, string>
}

export type TextNode = {
  text: string
  bold?: true
  italic?: true
  underlined?: true
  [key: string]: unknown
}

type LinkElement = {
  type: 'link'
  children: ElementOrTextNode[]
  href: string
}

type ImageElement = {
  type: 'image'
  children: ElementOrTextNode[]
  src: string
  title: string
  width: number
  height: number
  mimeType: string
}

type VideoElement = {
  type: 'image'
  children: ElementOrTextNode[]
  src: string
  title: string
  width: number
  height: number
  mimeType: string
}

type IframeElement = {
  type: 'iframe'
  children: ElementOrTextNode[]
  src: string
}

export type ElementNode = SimpleElement | LinkElement | ImageElement | VideoElement | IframeElement
export type ElementOrTextNode = ElementNode | TextNode

type RendererBase = { sx?: SxProps<Theme>; children?: React.ReactNode }
type Renderer<P extends ElementNode> = (
  props: Omit<P, 'children'> & RendererBase,
) => React.ReactElement | null

export type Renderers = {
  [k in BaseElementTypes]: Renderer<SimpleElement>
} & {
  link: Renderer<LinkElement>
  image: Renderer<ImageElement>
  video: Renderer<VideoElement>
  iframe: Renderer<IframeElement>
}

export type SxRenderer = {
  [k in keyof Renderers | 'all']?: SxProps<Theme>
}

export type AdditionalProps = { renderers: Renderers; sxRenderer: SxRenderer }