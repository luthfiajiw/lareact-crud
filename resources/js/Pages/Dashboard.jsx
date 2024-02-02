import IconButton from '@/Components/IconButton';
import Select from '@/Components/Select';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { MdOutlineEdit, MdDeleteOutline, MdAdd, MdSearch } from "react-icons/md";
import { useState } from 'react';

export default function Dashboard({ auth, posts }) {
    const { props } = usePage()
    const [perPage, setPerPage] = useState({
        value: props.posts.per_page,
        label: `${props.posts.per_page}`
    })
    const cols = [
        "no", "title", "author", "actions"
    ]

    function handlePerPage(data) {
        setPerPage(data)
        router.get(
            route().current(),
            {
                perPage: data.value,
                page: props.posts.current_page,
            },
            {
                preserveScroll: true,
                preserveState: true
            }
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <div className='flex flex-row items-center justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
                    <PrimaryButton
                        onClick={() => {}}
                    >
                        <div className='flex flex-row items-center space-x-2.5'>
                            <MdAdd size={16} />
                            <span>Add Post</span>
                        </div>
                    </PrimaryButton>
                </div>
            )}
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                <div className='relative bg-white overflow-auto shadow-md rounded-md sm:rounded-lg'>
                    <div className='flex flex-row justify-between items-center px-4 my-4'>
                        <div className='flex flex-row w- items-center space-x-2'>
                            <p>Show</p>
                            <Select
                                width='w-20'
                                selected={perPage}
                                onChange={handlePerPage}
                                data={[
                                    {
                                        value: 10,
                                        label: "10",
                                    },
                                    {
                                        value: 20,
                                        label: "20",
                                    },
                                    {
                                        value: 30,
                                        label: "30",
                                    },
                                ]}
                            />
                        </div>
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative w-[400px]">
                            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                <MdSearch />
                            </div>
                            <TextInput 
                                type="search"
                                className="ps-10 block w-full"
                                placeholder="Search for items"
                            />
                        </div>
                    </div>
                    <div className='block max-h-[500px] overflow-y-auto'>
                        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0'>
                                <tr>
                                    {cols.map(col => (
                                        <th key={col} scope="col" className="px-6 py-3">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='max-h-[500px] overflow-y-auto'>
                                {posts && posts.data.map((post, index) => (
                                    <tr key={post.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                        <td className='pl-6 py-4'>
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {post.title}
                                        </th>
                                        <td className='px-6 py-4'>
                                            {post.user.name}
                                        </td>
                                        <td className='flex flex-row items-center space-x-2 px-6 py-4'>
                                            <IconButton
                                                children={<MdOutlineEdit size={16} />}
                                            />
                                            <IconButton
                                                color='bg-red-500'
                                                children={<MdDeleteOutline size={16} />}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between py-4 px-6" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{posts.from}-{posts.to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{posts.total}</span>
                        </span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            {posts.links.map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        href={link.url}
                                        className={`flex items-center justify-center px-3 h-8 
                                            ${link.active ? "text-blue-600 hover:text-blue-700 bg-blue-50" : "text-gray-500 hover:text-gray-700 bg-gray-50"} border border-gray-300 
                                            hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white
                                        `}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label
                                            }}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
