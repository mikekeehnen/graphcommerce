import React from 'react'
import clsx from 'clsx'
import RichText from 'components/RichText'
import TriangleBg, { TriangleBgProps } from 'components/TriangleBg'
import { Container } from '@material-ui/core'
import { useHeaderSpacing } from 'components/Header'
import useRowQuoteStyles from './useRowQuoteStyles'

export type RowQuoteProps = GQLRowQuoteFragment & {
  triangleBgProps?: Partial<TriangleBgProps>
}

const RowQuote: React.FC<RowQuoteProps> = (props) => {
  const { triangleBgProps, clientName, clientTitle, clientQuote, functionalities } = props
  const headerSpacing = useHeaderSpacing()
  const classes = useRowQuoteStyles()

  return (
    <TriangleBg color='primary' gradient {...triangleBgProps}>
      <Container
        className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom, classes.root)}
      >
        <div className={classes.shadowBox}>
          {clientQuote}
          <div className={classes.clientInfo}>
            <strong>{clientName}</strong>
            <br />
            <span>{clientTitle}</span>
          </div>
        </div>
        <div>
          <RichText {...functionalities} classes={{ ul: classes.list, h4: classes.listTitle }} />
        </div>
      </Container>
    </TriangleBg>
  )
}

export default RowQuote