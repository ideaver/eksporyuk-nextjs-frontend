import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import { AsyncPaginate } from "react-select-async-paginate";
import useInformationViewModel, {
  useMentorsDropdown,
} from "./Information-view-model";

const ClassInformation = ({}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const {
    inputClassName,
    setInputClassName,
    inputClassDescription,
    setInputClassDescription,
    inputIntroVideo,
    setInputIntroVideo,
    inputClassAuthor,
    setInputClassAuthor,
  } = useInformationViewModel();

  const { loadOptions } = useMentorsDropdown();

  return (
    <KTCard className="">
      <KTCardBody>
        <h3 className="mb-5">Informasi Kelas</h3>
        <h5 className="required">Nama Kelas</h5>
        <TextField
          props={{
            value: inputClassName,
            onChange: setInputClassName,
          }}
        />
        <h5 className="mt-5">Deskrpsi Kelas</h5>
        <div
          className=""
          style={{
            height: 177,
          }}
        >
          <ReactQuill
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["clean"],
              ],
            }}
            value={inputClassDescription}
            onChange={setInputClassDescription}
            style={{
              height: "70%",
            }}
          />
        </div>
        <h5 className="mt-5">Intro Video</h5>
        <TextField
          props={{
            value: inputIntroVideo,
            onChange: setInputIntroVideo,
          }}
        />
        <h5 className="text-muted mt-3">Video harus berasal dari Youtube</h5>
        <h5 className="required mt-5">Author</h5>
        <TextField
          props={{
            value: inputClassAuthor,
            onChange: setInputClassAuthor,
          }}
        />
        <h5 className="text-muted mt-3">Pembuat materi kelas</h5>
        <h5 className="required mt-5">Mentor</h5>
        {/* TODO Create Selected Mentor */}
        <AsyncPaginate
          isSearchable={true}
          loadOptions={loadOptions}
          
        ></AsyncPaginate>
      </KTCardBody>
    </KTCard>
  );
};

export default ClassInformation;
