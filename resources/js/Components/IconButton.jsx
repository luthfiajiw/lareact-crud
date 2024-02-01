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
              `inline-flex items-center p-2 ${color} border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest focus:outline-none transition ease-in-out duration-150 ${
                  disabled && 'opacity-25'
              } ` + className
          }
          disabled={disabled}
      >
          {children}
      </button>
  );
}
