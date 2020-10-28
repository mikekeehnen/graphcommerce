// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const MoneyFragmentDoc: DocumentNode<MoneyFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Money' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Money' } },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currency' },
            arguments: [],
            directives: [],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'value' }, arguments: [], directives: [] },
        ],
      },
    },
  ],
}
export type MoneyFragment = Pick<Types.Money, 'currency' | 'value'>