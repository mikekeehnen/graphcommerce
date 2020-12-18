// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '../../generated/types'

import { AssetFragment, AssetFragmentDoc } from '../Asset/Asset.gql'
import { PageLinkFragment, PageLinkFragmentDoc } from '../PageLink/PageLink.gql'

export const RowHeroBannerFragmentDoc: DocumentNode<RowHeroBannerFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RowHeroBanner' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RowHeroBanner' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Asset' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'copy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'raw' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pageLinks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PageLink' } }],
            },
          },
        ],
      },
    },
    ...AssetFragmentDoc.definitions,
    ...PageLinkFragmentDoc.definitions,
  ],
}
export type RowHeroBannerFragment = {
  asset: AssetFragment
  copy: Pick<Types.RichText, 'raw'>
  pageLinks: Array<PageLinkFragment>
}