import { string } from 'yup';

const schema = string().required().url();

const app = () => {
  console.log('privet');
};

export default app;
