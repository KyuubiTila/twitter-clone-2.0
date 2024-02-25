'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Image as ImageIcon, SendHorizonal, SmilePlus } from 'lucide-react';
import * as Yup from 'yup';
import { useComment } from '@/stores/comment';

const CreateCommentCard = ({
  commentModalOpen,
  handleCloseCommentModal,
  id,
}) => {
  const { addComment } = useComment();
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('You must input a tweet'),
  });

  return (
    <Formik
      initialValues={{ content: '' }}
      onSubmit={(data, { resetForm }) => {
        resetForm();
        console.log(data.content);
        console.log(id);
        addComment({ content: data.content, articleId: id });
        commentModalOpen ? handleCloseCommentModal() : '';
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <div
            className={`flex items-center px-3 py-2 my-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${
              errors.content && touched.content
                ? 'border border-red-500'
                : 'border border-gray-300'
            }`}
          >
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <ImageIcon />
              <span className="sr-only">Upload image</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <SmilePlus />
              <span className="sr-only">Add emoji</span>
            </button>
            <Field
              as="textarea"
              name="content"
              className="block mx-4 p-2.5 w-full h-20 text-sm text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Share your comment..."
            />
            <span className="text-red-500">
              <ErrorMessage name="content" component="span" />
            </span>

            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <SendHorizonal />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCommentCard;
