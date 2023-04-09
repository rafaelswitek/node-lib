import chalk from 'chalk'
import fs from 'fs'
import pegaArquivo from "./index.js"

const caminho = process.argv

function imprimeLista(resultado, identificador = '') {
    console.log(
        chalk.yellow('Lista de links'),
        chalk.black.bgGreen(identificador),
        resultado
    )
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.red('Arquivo ou diretorio não existe'))
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2])
        imprimeLista(resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeArquivo) => {
            const resultado = await pegaArquivo(`${caminho}/${nomeArquivo}`)
            imprimeLista(resultado, nomeArquivo)
        })
    }
}

processaTexto(caminho)
