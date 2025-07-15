import PropTypes from 'prop-types';
import classNames from 'classnames';

import './create-edit-task.scss';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { fieldTypes } from './task-consts';
import { apiPath } from '../../utils/api-calls';
import {
  Button,
  ComposedModal,
  DatePicker,
  DatePickerInput,
  FileUploader,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextArea,
  TextInput,
} from '@carbon/react';

const blockClass = `create-edit-task`;

const scaleImage = (image, maxWidth) => {
  let scaleImage = 1;
  if (image.width > maxWidth) {
    scaleImage = maxWidth / image.width;

    const canvas = document.createElement('canvas');
    canvas.width = image.width * scaleImage;
    canvas.height = image.height * scaleImage;
    const context = canvas.getContext('2d');
    context.scale(scaleImage, scaleImage);
    context.drawImage(image, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.9);
  } else {
    return image.src;
  }
};

const imageToType = (base64) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const result = {
        originalFilename: base64.name,
        type: fieldTypes.image,
        value: scaleImage(image, 1280),
      };

      resolve(result);
    };

    image.onerror = () => {
      reject(image.error);
    };

    image.src = base64;
  });
};

const readImage = (blob) => {
  if (!blob.name) {
    return null;
  }

  const fp = new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = async () => {
      resolve(fr.result);
    };

    fr.onerror = () => {
      reject(fr.error);
    };

    fr.readAsDataURL(blob);
  });

  return fp;
};

export const CreateEditTask = forwardRef(
  ({ className, heading, onSubmit, open, task, taskFields, ...rest }, ref) => {
    const localRef = useRef(null);
    const dialogRef = ref || localRef;
    const formRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const handleSubmit = async (ev) => {
      if (onSubmit) {
        ev.preventDefault();
        const formData = new FormData(formRef.current);
        const formProps = Object.fromEntries(formData);

        // convert to date type
        formProps.due = {
          type: fieldTypes.date,
          value: formProps.due,
        };

        if (formProps.image) {
          const image = await readImage(formProps.image, dialogRef);

          if (!image) {
            delete formProps.image;
          } else {
            const imageType = await imageToType(image);
            formProps.image = imageType;
          }
        }

        const cancel = onSubmit(formProps);
        if (typeof cancel === 'undefined' || !cancel) {
          formRef.current.reset();
        }
      }
    };

    useEffect(() => {
      if (task?.image?.value) {
        setImgSrc(`${apiPath}/${task.image.value}`);
      } else {
        setImgSrc(null);
      }
    }, [task]);

    const handleCancel = () => {
      const imgPath = task?.image?.value
        ? `${apiPath}/${task?.image?.value}`
        : null;
      setImgSrc(imgPath);
    };

    const handleRemoveImage = () => {
      dialogRef.current.querySelector('input[type="file"]').files =
        new DataTransfer().files; // hacky replace Files array

      setImgSrc(null);
    };

    const handleImageChange = async (ev) => {
      const image64 = await readImage(ev.target.files[0]);
      setImgSrc(image64);
      setTimeout(() => {
        // After image added scroll into view
        dialogRef.current
          .querySelector('#image')
          .scrollIntoView({ behavior: 'smooth' });
      }, 1);
    };

    return (
      <ComposedModal
        open={open}
        onClose={handleCancel}
        className={classNames(blockClass, className)}
        ref={dialogRef}
        {...rest}
      >
        <ModalHeader title={heading}></ModalHeader>
        <ModalBody key={window.crypto.randomUUID()}>
          <form
            className={`${blockClass}__form`}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <fieldset className={`${blockClass}__form-inputs`}>
              {taskFields.map(({ name, label, type, required }) => {
                let inputElement;
                const inputAttrs = {
                  className: `${blockClass}__input`,
                  name,
                  id: name,
                  // defaultValue: task?.[name] ?? '',
                };
                const labelRequired = required ? `${label} (required)` : label;

                switch (type) {
                  case fieldTypes.textarea:
                    inputElement = (
                      <TextArea
                        {...inputAttrs}
                        rows={4}
                        aria-labelledby={`label-${name}`}
                        defaultValue={task?.[name]}
                        labelText={labelRequired}
                      ></TextArea>
                    );
                    break;
                  case fieldTypes.date: {
                    const defaultDate =
                      task?.[name]?.value ?? new Date().toISOString();

                    inputElement = (
                      <DatePicker
                        key={name}
                        datePickerType='single'
                        // dateFormat='d/m/Y'
                        value={new Date(defaultDate)}
                        locale='uk'
                      >
                        <DatePickerInput
                          {...inputAttrs}
                          labelText={labelRequired}
                        ></DatePickerInput>
                      </DatePicker>
                    );
                    break;
                  }
                  case fieldTypes.image:
                    inputElement = (
                      <div className={`${blockClass}__image-selector`}>
                        <div className={`${blockClass}__image-controls`}>
                          <FileUploader
                            {...inputAttrs}
                            key={name}
                            labelTitle={label}
                            buttonLabel='Select image'
                            accept={['.jpg', '.jpeg', '.png']}
                            defaultValue={task?.[name]?.originalFilename ?? ''}
                            onChange={handleImageChange}
                            filenameStatus='edit'
                            labelDescription=''
                          />
                          {type === fieldTypes.image && imgSrc ? (
                            <Button
                              kind='secondary'
                              size='md'
                              onClick={handleRemoveImage}
                              className={`${blockClass}__image-remove`}
                            >
                              Remove
                            </Button>
                          ) : null}
                        </div>
                        {type === fieldTypes.image && imgSrc ? (
                          <img
                            className={`${blockClass}__image`}
                            src={imgSrc}
                            alt='Task image'
                          />
                        ) : null}
                      </div>
                    );
                    break;
                  default:
                    inputElement = (
                      <TextInput
                        {...inputAttrs}
                        type='text'
                        aria-labelledby={`label-${name}`}
                        defaultValue={task?.[name]}
                        labelText={labelRequired}
                      />
                    );
                }
                return (
                  <div className={`${blockClass}__form-field`} key={name}>
                    {inputElement}
                  </div>
                );
              })}
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter
          primaryButtonText='Confirm'
          secondaryButtonText='Cancel'
          onRequestSubmit={handleSubmit}
          onRequestClose={handleCancel}
        ></ModalFooter>
      </ComposedModal>
    );
  },
);

CreateEditTask.displayName = 'CreateEditTask';

CreateEditTask.propTypes = {
  heading: PropTypes.string,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    due: PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string,
    }),
    notes: PropTypes.string,
    results: PropTypes.string,
    image: PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string,
    }),
  }),
  taskFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.oneOf(Object.values(fieldTypes)),
      required: PropTypes.bool,
    }),
  ),
};

export default CreateEditTask;
