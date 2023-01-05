/* eslint eqeqeq: 0 */
/* eslint array-callback-return: "error" */
/* eslint no-use-before-define: ["error", { "functions": false }] */
// @typescript-eslint/no-use-before-define
/* eslint no-nested-ternary: "error" */
/* eslint no-nested-ternary: "error" */
import styles from '@scss/components/form-input-upload.scss';
import Upload from '@svg/upload.svg';
import classNames from 'classnames';
import { map } from 'lodash';
import { useRef, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

export interface InputUploadProps {
  placeholder: string;
  form: UseFormReturn<any>;
  name: any;
  limit?: number;
}
export default function GroupFromInputUpload(props: InputUploadProps) {
  const [limitSize, setLimitSize] = useState(false);
  const [limitFile, setLimitFile] = useState(false);
  const [isData, setIsData] = useState([]);
  const [isFile, setIsFile] = useState(false);
  const inputRef = useRef(null);
  const fileInput = useRef(null);
  const { placeholder, form, name, limit } = props;
  const {
    formState: { errors },
  } = form;
  const hasError: any = errors[name];
  /* eslint array-callback-return: "error" */
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
    reader.onerror = (error) => {
      cb('');
    };
  };
  const MAX_LENGTH = 3;

  const reDefineUploadValue = (files) => {
    let result = [];

    /* eslint array-callback-return: "error" */
    if (Array.from(files).length > MAX_LENGTH) {
      setLimitFile(true);
      result = [];
      setIsData(result);
      setIsFile(!true);
      setLimitSize(!true);
      return result;
    }
    map(Array.from(files), (file: File) => {
      if (file.size > limit) {
        setLimitSize(true);
        result = [];
        setIsData(result);
        setIsFile(!true);
        setLimitFile(!true);
        return result;
      }

      return getBase64(file, (resultImage) => {
        result.push({
          fileType: file.type,
          fileName: file.name,
          fileSize: file.size,
          fileContent: resultImage,
        });
        setIsFile(true);
        setIsData(result);
      });
    });
    return result;
  };
  const resetFileInput = (value) => {
    const filterData = isData.filter((item) => item.fileName !== value.fileName);
    setIsData(filterData);
  };

  const Limit = () => (
    <span className="ibc-form-input__error-text ">Your file upload is larger than 20MB</span>
  );
  const LimitFile = () => (
    <span className="ibc-form-input__error-text ">Cannot upload files more than {MAX_LENGTH}</span>
  );
  /*   jsx-a11y/anchor-has-content */
  const File = () => (
    <ul>
      {map(isData, (item, index) => (
        <li className="file_upload" key={index}>
          {item.fileName}
          <a onClick={() => resetFileInput(item)}>del</a>
        </li>
      ))}
    </ul>
  );
  const ValueValidateSize = () => (limitSize == true ? <Limit /> : null);
  const ValueValidate = () => (limitFile == true ? <LimitFile /> : <ValueValidateSize />);
  return (
    <>
      <style jsx>{styles}</style>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur } }) => (
          <div className="ibc-input-upload">
            <div className="ibc-input-upload_btn">
              <label htmlFor="upload-btn">
                <Upload></Upload>
                Upload File
              </label>
              <input
                type="file"
                className={classNames('ibc-input', { 'ibc-input--error': hasError?.message })}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={(val) => onChange(reDefineUploadValue(val?.target?.files))}
                multiple
                hidden
                id="upload-btn"
                accept=".jpg, .jpeg,.png, .gif, .bmp, .pdf, .txt, .doc, .docx, .xls, .xlsx"
              />
            </div>

            <div className="ibc-input-upload_title">
              <h5>Attach Files</h5>
              <p>
                (*.jpg, *.jpeg, *.png, *.gif, *.bmp, *.pdf, *.txt, *.doc, *.docx, *.xls, *.xlsx,
                20MB/file, limit 3 files)
              </p>

              {isFile ? <File /> : <ValueValidate />}
            </div>
            {hasError?.message && (
              <span className="ibc-form-input__error-text">{hasError?.message}</span>
            )}
          </div>
        )}
      />
    </>
  );
}
