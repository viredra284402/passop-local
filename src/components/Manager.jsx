import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const inputRef = useRef();
    const imgRef = useRef();

    useEffect(() => {
        let passwords = localStorage.getItem("password");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast('🦄 Copied to clipboard!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    const showPassword = () => {

        if (inputRef.current.type === "password") {
            inputRef.current.type = "text";
            imgRef.current.src = "icons/eye.svg";
        } else {
            inputRef.current.type = "password";
            imgRef.current.src = "icons/eye-slash.svg";
        }
    };

    const savePassword = () => {
        const newPasswordEntry = { ...form, id: uuidv4() };
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {


            setPasswordArray([...passwordArray, newPasswordEntry]);
            localStorage.setItem("password", JSON.stringify([...passwordArray, newPasswordEntry]));

            setForm({
                site: '',
                username: '',
                password: ''
            });

            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast("Error: Passwored not saved")
        }
    };

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id);
        let confi = confirm("Do you really want to delete this password?")
        if (confi) {
            const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswordArray);
            localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
            toast('🦄 Password Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        setForm(passwordArray.filter(i => i.id === id)[0]);
        const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
        setPasswordArray(updatedPasswordArray);
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="container mx-auto p-4">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
                <div className="flex flex-col items-center mx-auto border-[1px] border-black rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-8 p-6 w-full max-w-4xl">
                    <h1 className='text-4xl font-bold text-center'>
                        <span className='text-green-700'>&lt;</span>
                        Pass
                        <span className='text-green-700'>OP/&gt;</span>
                    </h1>
                    <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                    <div className="text-white flex w-full flex-col p-4 space-y-4">
                        <input value={form.site} onChange={handleChange} className="p-2 w-full rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-800" type="text" placeholder="Enter website URL" name='site' />
                        <div className="flex flex-col md:flex-row w-full justify-between gap-4 space-x-0 md:space-x-4">
                            <input value={form.username} onChange={handleChange} className="flex-1 p-2 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500" type="text" placeholder="Enter Username" name='username' />
                            <div className="relative">
                                <input ref={inputRef} value={form.password} onChange={handleChange} className="flex-1 p-2 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500" type="password" placeholder="Enter Password" name='password' />
                                <span className='absolute right-3 top-[10px] cursor-pointer' onClick={showPassword}>
                                    <img ref={imgRef} width={22} src="icons/eye-slash.svg" alt="Toggle visibility" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={savePassword} className="text-md font-bold flex justify-center items-center gap-2 w-fit px-4 py-1 bg-green-600 text-black border-[1px] border-black rounded-md shadow-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300">
                        <script src="https://cdn.lordicon.com/lordicon.js"></script>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwordwords w-full max-w-4xl mx-auto">
                    <h2 className='text-center font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center text-lg font-semibold text-green-600 py-4'>
                        Opps, no password to show
                    </div>}
                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto  rounded-md ">
                            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-md">
                                <thead className='bg-green-700 text-white'>
                                    <tr>
                                        <th className='py-3 px-2 md:px-4 text-xs md:text-sm'>Site</th>
                                        <th className='py-3 px-2 md:px-4 text-xs md:text-sm'>Username</th>
                                        <th className='py-3 px-2 md:px-4 text-xs md:text-sm'>Password</th>
                                        <th className='py-3 px-2 md:px-4 text-xs md:text-sm'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 divide-y divide-gray-200'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index} className="divide-x divide-gray-200">
                                            <td className='py-2 px-2 md:px-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    <a href={item.site} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline text-xs md:text-sm'>
                                                        {item.site}
                                                    </a>
                                                    <button className='ml-2 p-1 md:p-2' onClick={() => copyText(item.site)}>
                                                        <img className='w-4 md:w-5' src="icons/copy.svg" alt="copy icon" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='py-2 px-2 md:px-4 whitespace-nowrap'>
                                                <div className='flex items-center text-xs md:text-sm'>
                                                    {item.username}
                                                    <button className='ml-2 p-1 md:p-2' onClick={() => copyText(item.username)}>
                                                        <img className='w-4 md:w-5' src="icons/copy.svg" alt="copy icon" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='py-2 px-2 md:px-4 whitespace-nowrap'>
                                                <div className='flex items-center text-xs md:text-sm'>
                                                    {item.password}
                                                    <button className='ml-2 p-1 md:p-2' onClick={() => copyText(item.password)}>
                                                        <img className='w-4 md:w-5' src="icons/copy.svg" alt="copy icon" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='py-2 px-2 md:px-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    <button className='p-1 md:p-2' onClick={() => editPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px", md: { width: "23px", height: "23px" } }}>
                                                        </lord-icon>
                                                    </button>
                                                    <button className='p-1 md:p-2' onClick={() => deletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px", md: { width: "23px", height: "23px" } }}>
                                                        </lord-icon>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
