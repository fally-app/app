import jwt from 'jsonwebtoken'

import User, { IUser } from '../models/User'

export function codeGenerator(person: string): string {
    let code = ''
    let mainString
    const AcademicYear = '2020'
    const randomAlphaLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (person == 'family') mainString = 'FAM'
    if (person == 'user') mainString = 'ADVENTIST'
    code += mainString
    for (let i = 0; i < 3; i++) {
        code += randomAlphaLetters.charAt(
            Math.floor(Math.random() * randomAlphaLetters.length)
        )
    }
    code += AcademicYear

    return code
}

export const createToken = ({ _id }: { _id: string }): string =>
    jwt.sign({ _id }, process.env.JWT_SECRET)

export const getUserFromToken = async (token: string): Promise<IUser> => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        return await User.findById((<IUser>user).id)
    } catch (error) {
        return null
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCurrentWeekInTheYear = () => {
    let d = new Date()
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))

    //@typescript-eslint/no-inferrable-types
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(
        ((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
    )
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo]
    // return weekNo
}
