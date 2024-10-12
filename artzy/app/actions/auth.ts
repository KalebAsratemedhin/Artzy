'use server'

export async function signup(formData: FormData){

    const rawFormData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        address: formData.get('address'),
        phoneNumber: formData.get('phoneNumber'),
      }

    console.log('formData signup', rawFormData)

}


export async function signin(formData: FormData){

    const rawFormData = {
        email: formData.get('email'),
        password: formData.get('password'),
      }

    console.log('formData signup', rawFormData)

}

