const fs = require('fs').promises;
const path = require('path');

async function readLayoutFiles(layoutDir) {
    const layouts = {};
    
    // Lê todos os diretórios dentro de layouts
    const directories = await fs.readdir(layoutDir);
    
    for (const dir of directories) {
        const dirPath = path.join(layoutDir, dir);
        const stat = await fs.stat(dirPath);
        
        if (stat.isDirectory()) {
            // Lê todos os arquivos dentro do diretório do layout
            const files = await fs.readdir(dirPath);
            layouts[dir] = {};
            
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const content = await fs.readFile(filePath, 'utf-8');
                layouts[dir][path.parse(file).name] = content;
            }
        }
    }
    
    return layouts;
}

async function processLayoutRecursive(content, partials, processedIncludes = new Set()) {
    let processedContent = content;
    const includeRegex = /<!--\s*include:\s*(\w+)\s*-->/g;
    
    let match;
    let hasChanges = false;
    
    while ((match = includeRegex.exec(content)) !== null) {
        const [fullMatch, partialName] = match;
        
        // Evita loops infinitos checando se já processamos este include
        if (processedIncludes.has(partialName)) {
            console.warn(`Aviso: Include circular detectado para "${partialName}"`);
            continue;
        }
        
        if (partials[partialName]) {
            processedIncludes.add(partialName);
            
            // Processa recursivamente o conteúdo do partial antes de incluí-lo
            const processedPartial = await processLayoutRecursive(
                partials[partialName],
                partials,
                new Set(processedIncludes)
            );
            
            processedContent = processedContent.replace(fullMatch, processedPartial);
            hasChanges = true;
        } else {
            console.warn(`Aviso: Partial "${partialName}" não encontrado`);
        }
    }
    
    // Se houve mudanças, processa novamente para garantir que não há mais includes
    if (hasChanges) {
        return processLayoutRecursive(processedContent, partials, processedIncludes);
    }
    
    return processedContent;
}

async function compileLayouts() {
    try {
        // Cria o diretório dist se não existir
        await fs.mkdir('dist').catch(() => {});
        
        // Lê todos os layouts e seus arquivos
        const layouts = await readLayoutFiles('layouts');
        
        // Processa cada layout
        for (const [layoutName, files] of Object.entries(layouts)) {
            if (!files.index) {
                console.warn(`Aviso: Layout "${layoutName}" não possui arquivo index.html`);
                continue;
            }
            
            // Processa o arquivo index com seus partials recursivamente
            let compiledContent = await processLayoutRecursive(files.index, files);
            
            // Salva o arquivo compilado
            const outputPath = path.join('dist', `${layoutName}.html`);
            await fs.writeFile(outputPath, compiledContent);
            
            console.log(`Layout ${layoutName} compilado com sucesso para ${outputPath}`);
        }
        
    } catch (error) {
        console.error('Erro ao compilar layouts:', error);
    }
}

// Executa a compilação
compileLayouts();