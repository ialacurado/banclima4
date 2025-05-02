@echo off
echo GitHub Repository Uploader
echo ========================

REM Verificar se o git está instalado
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git não foi encontrado. Por favor, instale o Git e adicione-o ao PATH.
    pause
    exit /b 1
)

set /p FOLDER="Entre com o caminho da pasta para upload: "
if not exist "%FOLDER%" (
    echo Pasta não encontrada: %FOLDER%
    pause
    exit /b 1
)

set /p REPO_NAME="Entre com o nome do novo repositório: "
set /p DESCRIPTION="Entre com a descrição do repositório (opcional): "
set /p PRIVATE="Tornar o repositório privado? (s/n): "

set USERNAME=ialacurado
echo Usando conta GitHub: https://github.com/%USERNAME%

echo.
echo Verifique se você já criou o repositório:
echo 1. Acesse https://github.com/new
echo 2. Crie um repositório chamado "%REPO_NAME%"
echo 3. NÃO inicialize com README, .gitignore ou licença
echo 4. Pressione qualquer tecla quando terminar para continuar com o upload
echo.
pause

REM Mudar para o diretório do projeto
cd /d "%FOLDER%"

echo.
echo Inicializando repositório Git...
if exist .git (
    echo Diretório .git já existe. Deseja reinicializá-lo? (s/n)
    set /p REINIT=
    if /i "%REINIT%"=="s" (
        rmdir /s /q .git
        git init
    )
) else (
    git init
)

echo.
echo Configurando credenciais locais...
set /p GIT_EMAIL="Entre com seu email do GitHub (ou pressione Enter para usar global): "
if not "%GIT_EMAIL%"=="" (
    git config --local user.email "%GIT_EMAIL%"
)

set /p GIT_NAME="Entre com seu nome de usuário GitHub (ou pressione Enter para usar global): "
if not "%GIT_NAME%"=="" (
    git config --local user.name "%GIT_NAME%"
)

echo.
echo Adicionando arquivos ao repositório...
git add .

echo.
echo Realizando commit dos arquivos...
git commit -m "Initial commit"
if %ERRORLEVEL% NEQ 0 (
    echo Erro ao realizar commit. Verifique se há arquivos para adicionar.
    pause
    exit /b 1
)

echo.
echo Configurando repositório remoto...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git

echo.
echo Preparando para enviar ao GitHub...
git branch -M main

echo.
echo Enviando para GitHub...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Erro ocorreu durante o push. Tentando método alternativo...
    echo.
    echo Por favor, acesse: https://github.com/%USERNAME%/%REPO_NAME%
    echo Clique no botão "Code", depois copie a URL HTTPS
    set /p REPO_URL="Cole a URL do repositório aqui: "
    
    echo.
    echo Atualizando URL remota e tentando novamente...
    git remote set-url origin %REPO_URL%
    git push -u origin main
    
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Falha persistente no push. Verifique suas credenciais e conexão.
        echo URL: https://github.com/%USERNAME%/%REPO_NAME%
    ) else (
        echo.
        echo Push bem-sucedido usando método alternativo!
    )
) else (
    echo.
    echo Push bem-sucedido!
)

echo.
echo Processo concluído.
echo Seu repositório está em: https://github.com/%USERNAME%/%REPO_NAME%
pause