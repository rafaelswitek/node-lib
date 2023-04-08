import fs from 'fs'
import chalk from 'chalk'

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretorio'))
}

async function pegaArquivo(caminhoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
        const links = extraiLinks(texto)
        // const color = chalk.green(links)
        console.log(links)
    } catch (erro) {
        trataErro(erro)
    }
}

pegaArquivo('./arquivos/texto.md')