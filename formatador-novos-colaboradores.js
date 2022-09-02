import { readFile, writeFile } from 'fs'
let htmlTextFinal = ''
let htmlTextImages = ''
let htmlTextInfos = ''

const writeHtml = () => writeFile('conteudo-final.html', htmlTextFinal.trim(), error => error ? new Error(error) : console.log('Script executado com sucesso! Verifique o arquivo conteudo-final.html :)\n'))
const readCsv = formatText => readFile('novos-colaboradores-csv.csv', 'utf-8', (error, text) => error ? new Error(error) : formatText(text))
const createPhoto = (firstName, lastName) => `<td width="150"><img style="width: 120px; height: 160px; display: block; margin-left: auto; margin-right: auto; border-radius: 10%; border: 1px solid; border-color: #ab9b6a;" src="https://arquivos.essentialnutrition.com.br/images/novos-colaboradores/${firstName}${lastName}.jpg" alt="" /></td>`
const createPersonDescription = (firstName, lastName, sector, local) => `<td width="150"><p style="text-align: center; font-family: arial, sans-serif; color: #1a1a1a; font-size: 12px; line-height: 18px; margin-bottom: 30px;"><b>${firstName} ${lastName}<br /></b>${sector}<br/>${local}</p></td>`
const formatText = text => {
    const objectPerson = text.split(',,\r\n').map(person => person.split(',').filter(el => el !== ''))
    const createImgRows = () => objectPerson.map((el, index) => {
        const [person] = el
        const firstName = person.split(' ').shift()
        const lastName = person.split(' ').pop()
        if (index === 0) htmlTextImages += '<tr>'
        htmlTextImages += createPhoto(firstName, lastName)
        if ((index + 1) % 4 === 0) htmlTextImages += '</tr>|<tr>'
        if (index === objectPerson.length - 1) htmlTextImages += '</tr>'
        return htmlTextImages
    })

    const createDescriptionRows = () => objectPerson.map((el, index) => {
        const [person, sector, local] = el
        const firstName = person.split(' ').shift()
        const lastName = person.split(' ').pop()
        if (index === 0) htmlTextInfos += '<tr>'
        htmlTextInfos += createPersonDescription(firstName, lastName, sector, local)
        if ((index + 1) % 4 === 0) htmlTextInfos += '</tr>|<tr>'
        if (index === objectPerson.length - 1) htmlTextInfos += '</tr>'
        return htmlTextInfos
    })

    const matchRows = () => {
        createImgRows()
        createDescriptionRows()
        const imageRows = htmlTextImages.split('|')
        const descriptionRows = htmlTextInfos.split('|')
        const numberOfRows = imageRows.length === descriptionRows.length ? imageRows.length : new Error('Image rows lenght is diferent of description rows lenght.')
        for (let i = 1; i < numberOfRows; i++) { htmlTextFinal += imageRows[i] + descriptionRows[i] }
    }
    matchRows()
    writeHtml()
}
readCsv(formatText)
