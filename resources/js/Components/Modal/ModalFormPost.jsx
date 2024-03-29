import { router, useForm } from "@inertiajs/react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import Modal from "../Modal";
import { useEffect, useRef } from "react";
import TextareaInput from "../TextareaInput";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";

export default function ModalFormPost({ show, edit = {} }) {
  const titleInput = useRef()
  const descInput = useRef()
  const {
    data,
    errors,
    setData,
    processing,
    post,
    put
  } = useForm({
    title: edit.title,
    description: edit.description,
  })

  function onSubmit(e) {
    e.preventDefault()

    if (edit.title) {
      put(
        route('dashboard.update', {id: edit.id}),
        {
          only: ['openForm', 'errors'],
          onSuccess: () => {
            router.get(
              route('dashboard'),
              undefined,
              {
                replace: true
              }
            )
          }
        }
      )
    } else {
      post(
        route('dashboard.store'),
        {
          only: ['openForm', 'errors'],
          onSuccess: () => {
            router.get(
              route('dashboard'),
              undefined,
              {
                replace: true
              }
            )
          }
        },
      )
    }
  }

  function onClose() {
    window.history.back()
  }

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={onSubmit} className="p-6">
        <h2 className="text-lg font-medium text-gray-900">
          {edit.title ? "Edit" : "Add New"} Post
        </h2>

        <div className="mt-6">
          <InputLabel htmlFor="title" value="Title" />
          <TextInput
            id="title"
            type="text"
            name="title"
            ref={titleInput}
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="mt-1 block w-full"
            isFocused
          />
          <InputError message={errors.title} className="mt-2" />

          <InputLabel htmlFor="description" value="Description" className="mt-4"/>
          <TextareaInput
            id="description"
            name="description"
            className="block w-full"
            ref={descInput}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            placeholder = "Write post description here..."
          />
          <InputError message={errors.description} className="mt-2" />
        </div>

        <div className="mt-6 flex justify-end">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

          <PrimaryButton className="ms-3" disabled={processing}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  )
}