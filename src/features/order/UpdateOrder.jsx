import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();
  return <Button type="primary">Make Priority</Button>;
};

export default UpdateOrder;
