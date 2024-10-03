'use client';
import { TextField, Button, Callout } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issuecreaterschema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof issuecreaterschema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(issuecreaterschema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: IssueForm) => {
    setSubmitting(true);
    try {
      await axios.post('/api/issues', data);
      reset();  // Reset the form fields
      router.push('/issues');
    } catch (error: unknown) {
      setSubmitting(false);
      handleAxiosError(error);
    }
  };

  const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 400) {
        setError('Bad request. Please check your input.');
      } else if (status === 404) {
        setError('Resource not found.');
      } else {
        setError(error.response?.data?.message || 'An error occurred');
      }
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred');
    }
  };

  // Use useEffect to check for navigator only in the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(navigator.userAgent);
    }
  }, []);

  return (
    <div className='max-w-xl'>
      {error && 
        <Callout.Root color='red' className='mb-6'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }

      <form 
        className='space-y-4' 
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        
        <Button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit New Issue'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
