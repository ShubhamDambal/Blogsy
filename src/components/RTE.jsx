import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      {/*This is from react-hook-form and it is responsible to forward it's ref/control to its parent*/}
      <Controller 
        name={name || "content"}
        control={control}  //passes control to parent
        render={({field: {onChange}}) => (  //render condition(onChange) & what to render(Editor)

          <Editor 
            apiKey="z7u6bjx3lt7uk4gc42zc23t7g2bg4xdgc2xnf0k8viv7ooyi"
            initialValue={defaultValue}
            init={{  //editor has features after initialization
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}  //apply changes
          />

        )}
      />
    </div>
  ) 
}

export default RTE