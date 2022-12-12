import styles from '@scss/components/form-input-upload.scss';
import Upload from '@svg/upload.svg';
import classNames from 'classnames';
import { Controller, UseFormReturn } from 'react-hook-form';

export interface InputUploadProps {
  placeholder: string;
  form: UseFormReturn<any>;
  name: any;
  limit?: number;
}
export default function GroupFromInputUpload(props: InputUploadProps) {
  const { placeholder, form, name, limit } = props;
  const {
    formState: { errors },
  } = form;
  const hasError: any = errors[name];
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
    reader.onerror = () => {
      cb('');
    };
  };
  const reDefineUploadValue = (files) =>
    Array.from(files)?.map((file: File) => {
      let result = [];
      if (file.size > limit) {
        alert('File is too big!');
        result = [];
        return result;
      }
      return getBase64(file, (resultImage) => {
        result.push({
          fileType: file.type,
          fileName: file.name,
          fileSize: file.size,
          fileContent: resultImage,
        });
      });
    });

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
              />
            </div>

            <div className="ibc-input-upload_title">
              <h5>Attach Files</h5>
              <p>
                (*.jpg, *.jpeg, *.png, *.gif, *.bmp, *.pdf, *.txt, *.doc, *.docx, *.xls, *.xlsx,
                20MB/file, limit 3 files)
              </p>
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
