import jwt from 'jsonwebtoken'

import User, { IUser } from '../models/User'

export function codeGenerator(person: string): string {
    let code = ''
    let mainString
    const AcdemicYear = '2020'
    const randomAlphaLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (person == 'family') mainString = 'FAM'
    if (person == 'user') mainString = 'ADVENTIST'
    code += mainString
    for (let i = 0; i < 3; i++) {
        code += randomAlphaLetters.charAt(
            Math.floor(Math.random() * randomAlphaLetters.length)
        )
    }
    code += AcdemicYear

    return code
}

export const createToken = ({ id }: { id: string }): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

export const getUserFromToken = async (token: string): Promise<IUser> => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        return await User.findById((<IUser>user).id)
    } catch (error) {
        return null
    }
}
