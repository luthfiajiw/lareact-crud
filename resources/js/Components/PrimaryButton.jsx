import { CgSpinner } from 'react-icons/cg';

export default function PrimaryButton({className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {disabled && (
                <CgSpinner
                    className="animate-spin text-white mr-2"
                    size={16}
                />
            )}
            {children}
        </button>
    );
}
