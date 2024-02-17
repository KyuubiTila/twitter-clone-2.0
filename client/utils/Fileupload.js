import React from 'react';

function FileUpload({ field, form, setImageSrc }) {
  const handleChange = (e) => {
    const file = e.currentTarget.files[0];

    if (!file) {
      // Reset image preview if no file is selected
      setImageSrc(null);
      form.setFieldValue(field.name, null);
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      setImageSrc(event.target.result); // Update image preview
    };
    reader.readAsDataURL(file);
    form.setFieldValue(field.name, file);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} className="form-control" />
      {/* Image preview */}
      {field.value && (
        <div>
          <img
            src={URL.createObjectURL(field.value)}
            alt="Uploaded file"
            className="max-w-xs h-auto"
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
