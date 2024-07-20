import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import logout from '../actions/logout';

export default async function Content() {
    const session = await auth()
    let user = undefined

    if (session) {
        user = session.user
    } else {
        redirect('/')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 space-y-6 bg-white rounded shadow-md text-black">
                <h2 className="text-2xl font-bold text-black">Bem-vindo, {user?.name}!</h2>
                <p>Este é o seu conteúdo protegido.</p>
                <form action={logout}>
                    <button type="submit" className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Sair
                    </button>
                </form>
            </div>
        </div>
    );
}