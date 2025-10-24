import { SpinnerButton } from "../buttons/SpinnerButton"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "../Dropzone"
import { useState } from "react"
import { DatePicker } from "../date-picker"



const ImportTracklistForm = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)

    const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };


    const handleSubmit = () => {
        console.log("Hello")
    }

    return  (

        <div>
            <div className="text-center lg:mt-[7rem]">
                <h1 className="lg:text-4xl tracking-tight font-bold">Import Tracklist</h1>
                <p className="text-center text-primary/80 lg:mx-[30rem] lg:mt-2">Give your tracklist a name, optionally a description, and a date. After uploading your file, we will begin processing your tracklist.</p>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        {/* tracklist name */}
                        <Field>
                            <FieldLabel>Tracklist name</FieldLabel>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                placeholder="Tracklist name"
                                className=""
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field>

                        {/* tracklist description */}
                        <Field>
                            <FieldLabel>Tracklist description</FieldLabel>
                            <Input
                                type="text"
                                id="description"
                                value={description}
                                placeholder="Tracklist description"
                                className=""
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>

                            {/* date picker */}
    <Field>
        <DatePicker />

    </Field>


        {/* file dropzone */}
        <Field>
        <Dropzone
      maxSize={1024 * 1024 * 10}
      minSize={1024}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
    </Field>


          <Field>
            <SpinnerButton isLoading={false} loadingText="Please wait" children={"Import Tracklist"} />
          </Field>


                    </FieldGroup>

                </form>
            </div>

        </div>
    )
}

export default ImportTracklistForm