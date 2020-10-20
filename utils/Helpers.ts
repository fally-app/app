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
