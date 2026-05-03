// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from '../order/OrderItem';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  // console.log(fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="mb-2 text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-1 rounded-full bg-stone-300 px-3 py-1">
          {priority && (
            <span className="font-semibold tracking-wide text-red-500 uppercase">
              Priority{' '}
            </span>
          )}
          <span className="tracking-wide text-green-600 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => (
          <OrderItem
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
            isLoadingIngredients={fetcher.state === 'loading'}
            item={item}
            key={item.pizzaId}
          />
        ))}
      </ul>

      <div className="space-y-2 rounded-lg bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order;
};

export default Order;
