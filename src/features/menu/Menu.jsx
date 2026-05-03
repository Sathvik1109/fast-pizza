import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from '../menu/MenuItem';

const Menu = () => {
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul className="divide-y divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const menu = await getMenu();
  // console.log(menu);
  return menu;
};

export default Menu;
