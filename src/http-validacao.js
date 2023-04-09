import chalk from "chalk"

function extraiLinks(arrLinks) {
    return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checaStatus(listaUrls) {
    const arrStatus = await Promise.all(
        listaUrls.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )
    return arrStatus
}

function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado'
    } else {
        return 'ocorreu um erro'
    }
}

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks)
    const status = await checaStatus(links)

    return listaDeLinks.map((obj, index) => ({
        ...obj,
        status: status[index]
    }))
}