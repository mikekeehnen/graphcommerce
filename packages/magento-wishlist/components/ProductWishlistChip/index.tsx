import { SvgImageSimple, iconHeart } from '@graphcommerce/next-ui'
import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  AddProductToWishlistDocument,
  RemoveProductFromWishlistDocument,
} from '@graphcommerce/magento-wishlist'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { GetIsInWishlistsDocument } from '@graphcommerce/magento-wishlist'

// sku is optional in Magento schema
export type ProductWishlistChipProps = {
  sku: string | null | undefined
} & ChipProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    iconHeart: {
      stroke: '#AC2E2E',
      fill: '#FFF',
    },
    iconHeartActive: {
      stroke: '#AC2E2E',
      fill: '#AC2E2E',
    },
  }),
  { name: 'ProductWishlistChip' },
)

export default function ProductWishlistChip(props: ProductWishlistChipProps) {
  const { sku, ...chipProps } = props
  const classes = useStyles()

  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    let wishlist = getWishlistStorage()
    if (wishlist.includes(sku)) {
      setInWishlist(true)
    }
  })

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  // Prevent multiple fetches of wishlist during page render
  const { refetch } = useQuery(GetIsInWishlistsDocument, {
    skip: true,
  })
  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()

    let wishlist = getWishlistStorage()

    if (wishlist.includes(sku)) {
      if (isLoggedIn) {
        // Needs refetch instead of fetch, otherwise add/remove of same item directly fails
        const wishlistQuery = refetch()
        wishlistQuery.then((wishlistData) => {
          let wishlistItemsInSession =
            wishlistData.data?.customer?.wishlists[0]?.items_v2?.items || []

          let item = wishlistItemsInSession.find((element) => element?.product?.sku == sku)
          if (item?.id) {
            removeWishlistItem({ variables: { wishlistItemId: item.id } })
          }
        })
      }

      wishlist = wishlist.filter((itemSku) => itemSku !== sku)
      setInWishlist(false)
    } else {
      if (isLoggedIn && sku) {
        // Persist to db storage when user session is available
        addWishlistItem({ variables: { sku: sku } })
      }

      wishlist.push(sku)
      setInWishlist(true)
    }

    localStorage.wishlist = JSON.stringify(wishlist)
  }

  const getWishlistStorage = () => {
    return localStorage?.wishlist ? JSON.parse(localStorage?.wishlist) : []
  }

  const chip = (
    <Chip
      variant='outlined'
      key={sku}
      onClick={handleClick}
      icon={
        <SvgImageSimple
          src={iconHeart}
          size='small'
          className={inWishlist ? classes.iconHeartActive : classes.iconHeart}
        />
      }
      color='default'
      size='small'
      {...chipProps}
    />
  )

  return chip
}