import { AnimatePresence } from 'framer-motion'
import type { AppPropsType } from 'next/dist/next-server/lib/utils'
import type { NextRouter } from 'next/router'
import React, { useRef } from 'react'
import Page from './Page'
import { pageContext, pageRouterContext } from './PageContext'
import type { PageComponent, PageItem } from './types'
import { createRouterProxy } from './utils'

function findPlainIdx(items: PageItem[]) {
  return items.reduce((acc, item, i) => (typeof item.overlayGroup === 'string' ? acc : i), -1)
}

type PagesProps = AppPropsType<NextRouter> & {
  Component: PageComponent
  fallback?: React.ReactNode
  fallbackKey?: string
}

const NoopLayout: React.FC = ({ children }) => <>{children}</>

export default function FramerNextPages(props: PagesProps) {
  const { router, Component, pageProps, fallback, fallbackKey } = props

  const items = useRef<PageItem[]>([])
  const idx = Number(global.window?.history.state?.idx ?? 0)
  const prevHistory = useRef<number>(-1)
  const direction = idx > prevHistory.current ? 1 : -1
  prevHistory.current = idx

  /** We never need to render anything beyong the current idx and we can safely omit everything */
  items.current = items.current.slice(0, idx)

  /** Add the current page to the items */
  const proxy = createRouterProxy(router)
  const activeItem: PageItem = {
    children: <Component {...pageProps} />,
    routerProxy: proxy,
    SharedComponent: Component.pageOptions?.SharedComponent,
    sharedProps: Component.pageOptions?.sharedProps,
    sharedPageProps: pageProps,
    sharedKey: Component.pageOptions?.sharedKey?.(proxy) ?? proxy.pathname,
    overlayGroup: Component.pageOptions?.overlayGroup,
    historyIdx: idx,
  }
  items.current.push(activeItem)

  let renderItems = items.current

  /** We need to render back to the last item that isn't an overlay. */
  const plainIdx = findPlainIdx(items.current)

  /** If we don't have a plain component we add a fallback to the beginning of an item */
  if (plainIdx === -1 && fallback) {
    if (!fallbackKey) {
      throw Error('When defining a fallback you should also provide a fallbackKey')
    }
    const fbItem: PageItem = {
      children: fallback,
      routerProxy: createRouterProxy(router),
      sharedKey: fallbackKey,
      historyIdx: -1,
    }

    renderItems = [fbItem, ...renderItems]
  }

  if (plainIdx > -1) renderItems = items.current.slice(plainIdx)

  /**
   * Cleanup the `renderItems`:
   *
   * - A key can only occur once in AnimatePresence, therfor we remove duplicates and maintain the
   *   last one as that one has the most recent props.
   * - We remove all overlays that aren't of the same overlay type
   */
  const seen = new Set<string>()
  renderItems = renderItems
    .reverse()
    .filter((item) => {
      if (seen.has(item.sharedKey)) return false
      seen.add(item.sharedKey)

      if (
        typeof activeItem.overlayGroup === 'string' &&
        typeof item.overlayGroup === 'string' &&
        activeItem.overlayGroup !== item.overlayGroup
      ) {
        return false
      }
      return true
    })
    .reverse()

  return (
    <AnimatePresence initial={false}>
      {renderItems.map((item, itemIdx) => {
        const {
          children,
          historyIdx,
          sharedKey,
          SharedComponent = NoopLayout,
          sharedProps,
          sharedPageProps,
          routerProxy,
        } = item
        const active = itemIdx === renderItems.length - 1
        const depth = itemIdx - (renderItems.length - 1)
        return (
          <pageContext.Provider key={sharedKey} value={{ depth, active, direction }}>
            <Page active={active} historyIdx={historyIdx}>
              <pageRouterContext.Provider value={routerProxy}>
                <SharedComponent {...sharedPageProps} {...sharedProps}>
                  {children}
                </SharedComponent>
              </pageRouterContext.Provider>
            </Page>
          </pageContext.Provider>
        )
      })}
    </AnimatePresence>
  )
}