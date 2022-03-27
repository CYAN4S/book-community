import Head from 'next/head'
import { authService } from '../firebaseConfig'
import { useRouter } from 'next/router';

export default function Book_home() {
    const router = useRouter();
    function onLogOutClick() {
        authService.signOut();
        router.push("/");
    }
    return (
        <div>
            <Head>
                <title>Home pages</title>
            </Head>
            <div>
                <h1>Welcome!</h1>
                <h2>오늘은 3월 6일 입니다!</h2>
                <button onClick={onLogOutClick}> Logout </button>
            </div>
        </div>
    )

}