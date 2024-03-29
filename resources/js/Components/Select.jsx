import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiChevronUpDown } from "react-icons/hi2";

export default function Select({
  width = 'w-48',
  data,
  selected,
  onChange
}) {

  return (
    <div className={`block ${width} h-full`}>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className="relative w-full cursor-default rounded-md bg-white
              py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none border border-gray-300
              focus-visible:ring-offset-orange-300 sm:text-sm"
            >
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-3 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}