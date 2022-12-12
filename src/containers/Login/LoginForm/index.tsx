import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { GroupFromInput } from '@components/compound';

interface LoginFormProps {
  onSubmit: (value: any) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup.object().shape({
    username: yup.string().required('please enter username'),
    password: yup.string().required('please enter password'),
  });
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    onSubmit(values);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <h1>Login form</h1>
      <GroupFromInput placeholder="username" form={form} name="username" />
      <GroupFromInput placeholder="password" form={form} name="password" />
      <button onClick={form.handleSubmit(handleSubmit)}>Click</button>
    </form>
  );
}
