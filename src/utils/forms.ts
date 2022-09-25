import { FormFieldType, FormType } from '../types/forms'

const createDefaultFormSinglePage = (name: string) => {
  return {
    name,
    title: 'Hello',
    desciption: 'This is a great form',
    fields: [],
    afterSubmit: {
      title: 'Thank you',
      description: '',
      logoEnabled: true,
      logoColor: 'black',
    },
    submitText: 'Submit',
    formType: FormType.singlePage,
    status: 'closed',
    styles: {
      background: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
      fields: {
        title: {
          color: 'black',
          fontSize: '25px',
          fontFamily: 'Montserrat',
        },
        description: {
          color: 'black',
          fontSize: '25px',
          fontFamily: 'Display Fair',
        },
        input: {
          color: 'black',
          fontFamily: 'Montserrat',
        },
        options: {
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          selectedBackground: 'white',
        },
      },
      main: {
        title: {
          color: 'black',
          fontSize: '35px',
          fontFamily: 'Montserrat',
          fontWeight: 400,
        },
        description: {
          color: 'black',
          fontSize: '35px',
          fontFamily: 'Display Fair',
          fontWeight: 400,
        },
        button: {
          background: '#1c5266',
          fontSize: '20px',
          color: 'white',
          fontFamily: 'Montserrat',
          fontWeight: 400,
        },
        container: {
          alignItems: 'start',
        },
      },
      afterSubmit: {
        alignItems: 'center',
      },
      openingScreen: {
        alignItems: 'center',
      },
    },
  }
}

const createDefaultFormSlides = (name: string) => {
  const form = createDefaultFormSinglePage(name)
  const withOpeningScreen = {
    ...form,
    formType: FormType.slides,
    openingScreen: {
      title: 'Form',
      description: 'Fill this form to get started',
      callToAction: 'Start',
    },
  }
  return withOpeningScreen
}

const createEventSignUpFormSinglePage = (name: string): any => {
  const defaultForm = createDefaultFormSinglePage(name)

  const eventSignUpForm = {
    ...defaultForm,
    fields: [
      {
        id: 'Fsw99X4kc6XBf-bW_xYU9',
        title: 'Name',
        required: true,
        type: FormFieldType.textShort,
      },
      {
        id: 'MOAhJf1p-F2PMw2gLAqqt',
        title: 'Email',
        required: true,
        type: FormFieldType.email,
      },
      {
        id: '0YMcNcbvVGfkNmlSpdI6s',
        title: 'Field of studies',
        required: true,
        type: FormFieldType.selectOne,
        options: [
          'Arts, Design & Architecture',
          'Business',
          'Engineering',
          'Science',
          'Other',
        ],
      },
      {
        id: 'xlOBex-ww6NjvW26oFF3L',
        title: 'Any dietary restrictions?',
        required: false,
        type: FormFieldType.textShort,
      },
    ],
  }

  return eventSignUpForm
}

const createEventSignUpFormSlides = (name: string) => {
  const singlePageVersion = createEventSignUpFormSinglePage(name)
  const slidesVersion = {
    ...singlePageVersion,
    formType: FormType.slides,
    openingScreen: {
      title: 'Event sign up',
      description: 'Fill this form sign up for the event',
      callToAction: 'Start',
    },
  }

  return slidesVersion
}

const createFormUtil = (name: string, template: string) => {
  if (template === 'eventSignUp') {
    const form = createEventSignUpFormSlides(name)
    return form
  } else {
    const form = createDefaultFormSlides(name)
    return form
  }
}

interface Answer {
  [key: string]: string
}

const getDataForCSV = (
  form: any,
  answers: Answer[],
  includeSubmitTime?: boolean
) => {
  const titles = includeSubmitTime
    ? ['Submitted at', ...form.fields.map((field: any) => field.title)]
    : form.fields.map((field: any) => field.title)

  const ids = form.fields.map((field: any) => field.id)
  const answersArrayArray = answers.map((answer) => {
    const valuesInRightOrder = ids.map((id: any) => {
      return answer[id] || ''
    })
    if (includeSubmitTime) {
      const date = new Date(answer.submittedAt)
      return [date.toString(), ...valuesInRightOrder]
    } else {
      return valuesInRightOrder
    }
  })
  const data = [titles, ...answersArrayArray]
  return data
}

export {
  createDefaultFormSinglePage,
  createEventSignUpFormSinglePage,
  createEventSignUpFormSlides,
  createFormUtil,
  getDataForCSV,
}
