"use client";

import { Button, TableCell, TableRow } from "flowbite-react";
import { AssetShow } from "../components/AssetShow";
import Link from "next/link";
import { WalletAsset } from "../models";
import { useAssetStore } from "../store";
import { useShallow } from "zustand/react/shallow";

export function TableWalletAssetRow(props: {
  walletAsset: WalletAsset;
  walletId: string;
}) {
  const { walletAsset, walletId } = props;

  const assetFound = useAssetStore(
    useShallow((state) => //Me permite não olhar a instancia como um todo, dessa forma eu não afeto todas as ações após uma mudança, aumentando eficiência. Só renderizo um componente que foi realmente atualizado
      state.assets.find((a) => a.symbol === walletAsset.asset.symbol)
    )
  );

  const asset = assetFound || walletAsset.asset;

  return (
    <TableRow>
      <TableCell>
        <AssetShow asset={asset} />
      </TableCell>
      <TableCell>R$ {asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
      <TableCell>
        <Button
          className="w-fit"
          color="light"
          as={Link}
          href={`/assets/${asset.symbol}?walletId=${walletId}`}
        >
          Comprar/vender
        </Button>
      </TableCell>
    </TableRow>
  );
}
