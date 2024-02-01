import IconButton from '@/Components/IconButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

export default function Dashboard({ auth, posts }) {
    const cols = [
        "title", "description", "author", "actions"
    ]
    let pagesNav = []

    for (let i = 1; i <= posts.last_page; i++) {
        pagesNav.push(
            <li>
                <a 
                    key={i}
                    href="#"
                    class={`flex items-center justify-center px-3 h-8 
                        ${i === posts.current_page ? "text-blue-600 hover:text-blue-700 bg-blue-50" : "text-gray-500 hover:text-gray-700 bg-gray-50"} border border-gray-300 
                        hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white
                    `}
                >
                    {i}
                </a>
            </li>
        )
    }

    console.log(posts);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                <div className='"relative bg-white overflow-x-auto shadow-md rounded-md sm:rounded-lg"'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                {cols.map(col => (
                                    <th key={col} scope="col" className="px-6 py-3">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.data.map(post => (
                                <tr key={post.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {post.title}
                                    </th>
                                    <td className='px-6 py-4'>
                                        {post.description}
                                    </td>
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
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between py-4 px-6" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{posts.from}-{posts.to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{posts.total}</span>
                        </span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Prev
                                </a>
                            </li>
                            {pagesNav.map(pageNav => pageNav)}
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
