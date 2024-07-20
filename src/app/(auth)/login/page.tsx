
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import FormLogin from '@/components/FormLogin';

export default async function LoginPage() {

    const session = await auth()

    if (session) {
        return redirect('/content')
    }

    return (
        <FormLogin />
    );
}
