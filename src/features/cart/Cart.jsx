import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import CartItem from '../cart/CartItem';

function Cart() {
  const cart = useSelector((state) => state.cart.cart);

  const username = useSelector((state) => state.user.username);

  return (
    <div className="px-4 py-3">
      <LinkButton
        to="/menu"
        className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
      >
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary">Clear Cart</Button>
      </div>
    </div>
  );
}

export default Cart;
