'use client';

import { Asset, Order, OrderType } from "@/models";
import { socket } from "@/socket-io";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export function OrderForm(props: { asset: Asset, walletId: string, type: OrderType }) {
  const color = props.type == OrderType.BUY ? "text-blue-500" : "text-red-500";
  const changeType = props.type == OrderType.BUY ? "compra" : "venda";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    socket.connect();
    const createOrder: Order = await socket.emitWithAck("orders/create", data);
    toast(`Ordem de ${changeType} de ${createOrder} ações de ${props.asset.symbol} criada com sucesso`, { type: "success", position: "top-right" });
  }



  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="assetId" defaultValue={props.asset._id} />
      <input type="hidden" name="walletId" defaultValue={props.walletId} />
      <input type="hidden" name="type" defaultValue={props.type} />

      <div>
        <div className="mb-2">
          <Label htmlFor="shares" value="Quantidade" className={color} />
        </div>
        <TextInput id="shares" name="shares" required type="number" min={1} step={1} defaultValue={1} color={props.type == OrderType.BUY ? "info" : "failure"}></TextInput>
        <br />
        <div className="mb-2">
          <Label htmlFor="price" value="Preço R$" className={color} />
        </div>
        <TextInput id="price" name="price" required type="number" min={1} step={1} defaultValue={1} color={props.type == OrderType.BUY ? "info" : "failure"}></TextInput>
        <br />
        <Button type="submit" color={props.type == OrderType.BUY ? "blue" : "failure"}>Confirmar {changeType}</Button>
      </div>
    </form>
  )

}



