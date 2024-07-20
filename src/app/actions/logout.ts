'use server';

import { signOut } from '../../../auth';

export default async function logout() {
    try {
        await signOut();
        console.log('saiu birrll');

    } catch (e) {
        throw e;
    }
}