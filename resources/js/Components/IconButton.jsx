export default function IconButton({
  className = '',
  disabled,
  children,
  color = 'bg-gray-800',
  ...props
}) {
  return (
      <button
          {...props}
          className={
              `inline-flex items-center p-2 ${color} border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                  disabled && 'opacity-25'
              } ` + className
          }
          disabled={disabled}
      >
          {children}
      </button>
  );
}
