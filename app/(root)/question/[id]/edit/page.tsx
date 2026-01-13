import { auth } from '@/auth';
import QuestionForm from '@/components/forms/QuestionForm'
import ROUTES from '@/constant/route';
import { getQuestion } from '@/lib/actions/question.action';
import { RouteParams } from '@/Types/global';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

const EditQuestion = async({ params }: RouteParams) => {
    const {id } = await params;
    if(!id) return notFound();

  const session = await auth();
  if(!session) return redirect('/signin')
    const {data:question, success} = await getQuestion({questionId:[id]});
    if(!success || !question) return notFound();
    
    // Compare author._id since author is populated with {_id, name, image}
    if(question?.author?._id?.toString() !== session?.user?.id){
        return redirect(ROUTES.QUESTION(id));
    }
  return (
    <>
   <main>
    <QuestionForm question={question} isEdit/>
   </main>
    </>
    
  )
}

export default EditQuestion
