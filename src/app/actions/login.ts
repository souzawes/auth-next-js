'use server'

import { signIn } from "../../../auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation";

export default async function login(formData: FormData) {

    const rawFormData = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const email = rawFormData.email
    const password = rawFormData.password

    try {
        await signIn('credentials', { email, password });
    } catch (e) {
        if (e instanceof AuthError) {
            if (e.type === 'CredentialsSignin') {
                e.message = 'Credenciais inválidas'
                throw e
            }
            if (e.type === 'CallbackRouteError') {
                e.message = 'Ocorreu algum erro'
                throw e
            }
        }
    }

    redirect('/content')

}