import React, { useState } from 'react'; // React və useState funksiyasını daxil edirik
import { Link, useNavigate } from 'react-router-dom'; // React Router-dan Link və navigate funksiyalarını istifadə edirik
import google from '../assets/img/gmail.svg'; // Google şəkli
import facebook from '../assets/img/face.svg'; // Facebook şəkli
import { initializeApp } from 'firebase/app'; // Firebase-i başlatmaq üçün lazım olan funksiya
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'; // Firebase autentifikasiya funksiyaları
import { getAnalytics } from 'firebase/analytics'; // Firebase Analytics üçün funksiya

// Firebase konfiqurasiyası
const firebaseConfig = {
    apiKey: "AIzaSyAqsWZ5_ri2DBim6cgtMn2ir9w8t3XXa-8",
    authDomain: "fact-checking-asisstant.firebaseapp.com",
    projectId: "fact-checking-asisstant",
    storageBucket: "fact-checking-asisstant.firebasestorage.app",
    messagingSenderId: "543735020388",
    appId: "1:543735020388:web:dc0521ea65838e9f271871",
    measurementId: "G-BLQXDLD0PP"
};

// Firebase-i başlatmaq
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Firebase Analytics-i başlatmaq
const auth = getAuth(app); // Firebase autentifikasiya obyektini əldə edirik

const Login = () => {
    const [email, setEmail] = useState(''); // E-mail üçün state
    const [password, setPassword] = useState(''); // Parol üçün state
    const [error, setError] = useState(''); // Xətalar üçün state
    const navigate = useNavigate(); // Yönləndirmə üçün navigate funksiyası

    // Daxil olma funksiyası
    const handleLogin = async (e) => {
        e.preventDefault(); // Formanın təkrardan yüklənməsinin qarşısını alır
        setError(''); // Xətaları sıfırlayırıq

        // E-mail və parol boş olmamalıdır
        if (!email || !password) {
            setError('Zəhmət olmasa e-poçtunuzu və parolunuzu daxil edin.');
            return;
        }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users'); // İstifadəçiləri JSONPlaceholder API-dən alırıq
            const users = await response.json(); // JSON formatında istifadəçi məlumatlarını alırıq
            const user = users.find((user) => user.email === email); // E-poçt ilə istifadəçini tapırıq

            // İstifadəçi tapıldısa, onu localStorage-a qeyd edirik və uğurlu daxil olma bildirişi göstəririk
            if (user) {
                localStorage.setItem('authToken', `fake-token-for-${user.email}`);
                alert('Daxil olma uğurlu oldu!');
                navigate('/textinput'); // Daxil olma uğurlu olduqda axtarış səhifəsinə yönləndiririk
            } else {
                throw new Error('İstifadəçi tapılmadı. E-poçtunuzu yoxlayın.');
            }
        } catch (err) {
            setError(err.message); // Xətanı göstəririk
        }
    };

    // Google ilə daxil olma funksiyası
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider(); // Google provider-ni yaradıq
        try {
            const result = await signInWithPopup(auth, provider); // Google ilə daxil olma prosesi
            alert('Google ilə daxil oldunuz!'); // Uğurlu daxil olma bildirişi
            navigate('/textinput'); // Daxil olduqdan sonra axtarış səhifəsinə yönləndiririk
        } catch (error) {
            setError(error.message); // Xətanı göstəririk
        }
    };

    // Facebook ilə daxil olma funksiyası
    const handleFacebookSignIn = async () => {
        const provider = new FacebookAuthProvider(); // Facebook provider-ni yaradıq
        try {
            const result = await signInWithPopup(auth, provider); // Facebook ilə daxil olma prosesi
            alert('Facebook ilə daxil oldunuz!'); // Uğurlu daxil olma bildirişi
            navigate('/textinput'); // Daxil olduqdan sonra axtarış səhifəsinə yönləndiririk
        } catch (error) {
            setError(error.message); // Xətanı göstəririk
        }
    };

    return (
        <div className='w-full max-w-lg mx-auto pt-10 pb-16 px-4 flex items-center justify-center mt-[130px]'>
            <div className='flex flex-col items-center justify-center w-[361px]'>
                <div className="w-full">
                    <h1 className="text-center text-black text-2xl sm:text-3xl font-semibold font-montserrat leading-normal mb-4">Xoş gəlmişsiniz</h1>

                    <form onSubmit={handleLogin} className="w-full">
                        {/* E-mail */}
                        <div className='grid grid-rows gap-2 mb-3'>
                            <label className="text-black text-sm font-medium font-montserrat">E-mail</label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='email'
                                    placeholder='E-poçtunuzu bura daxil edin'
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // E-maili state-ə qeyd edirik
                                    required
                                />
                            </div>
                        </div>

                        {/* Parol */}
                        <div className='grid grid-rows gap-2'>
                            <label className="text-black text-sm font-medium font-montserrat">Parol</label>
                            <div className="w-full px-3 py-2 rounded-md border border-gray-300">
                                <input
                                    type='password'
                                    placeholder='************'
                                    className="w-full text-sm font-medium font-['Inter'] leading-normal focus:outline-none focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Parolu state-ə qeyd edirik
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm my-2">{error}</p>} {/* Xətanı göstəririk */}
                        <Link to='/forgetpassword'><p className='font-medium text-base leading-normal my-6 text-center font-montserrat'>Parolu unutmusan?</p></Link>

                        {/* Daxil ol düyməsi */}
                        <button
                            type="submit"
                            className='py-[19px] w-full bg-blue text-white rounded-[24px] text-base leading-[19px] font-semibold font-montserrat mb-[43px]'
                        >
                            Daxil ol
                        </button>
                    </form>
                </div>

                <div className='flex items-center justify-center w-full mb-6'>
                    <p className="flex-grow h-px bg-gray-300"></p>
                    <p className='font-medium text-sm leading-5 mx-2'>Digər hesablar ilə daxil olun</p>
                    <p className="flex-grow h-px bg-gray-300"></p>
                </div>

                <div className='flex items-center justify-center gap-4'>
                    <a
                        className='flex items-center justify-center'
                        href="#"
                        onClick={handleGoogleSignIn} // Google ilə daxil olma funksiyasını çağırırıq
                    >
                        <img className='size-[48px]' src={google} alt="google" />
                    </a>
                    <a
                        className='flex items-center justify-center'
                        href="#"
                        onClick={handleFacebookSignIn} // Facebook ilə daxil olma funksiyasını çağırırıq
                    >
                        <img className='size-[48px]' src={facebook} alt="facebook" />
                    </a>
                </div>

                <p className="mt-6 text-center">Hesabınız yoxdur? <Link to='/registration' className='text-[#7B7DCF]'>Qeydiyyatdan keçin</Link></p>
            </div>
        </div>
    );
};

export default Login;
