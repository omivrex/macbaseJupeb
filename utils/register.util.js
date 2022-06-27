 export const validateEmail = email => {
    if (email?.includes('.com') && email?.includes('@')) {
        const validChars = new RegExp(/[abcdefghijklmnopqrstuvwxyz1234567890]/)
        const emailName = email.slice(0, email.indexOf('@'))
        const emailProvider = email.slice(email.indexOf('@')+1, email.indexOf('.com'))
        if (emailName.search(validChars) !== -1 && emailProvider.search(validChars) !== -1) {
          return true
        }
    }
    return false
}

export const validatePswd = pswd => pswd?.length >= 8

export const validatePhone = phone => {
    const validPrifixsInNigeria = [new RegExp(/\b23470/), new RegExp(/\b23480/), new RegExp(/\b23481/), new RegExp(/\b23490/), new RegExp(/\b23491/)]
    const validPhoneChars = new RegExp(/[1234567890]/)
    if (validPrifixsInNigeria.filter(prefix=> phone?.search(prefix) !== 0).length === 0) {
        if (phone.search(validPhoneChars) !== -1) {
            return true
        }  
    }
    return false
}