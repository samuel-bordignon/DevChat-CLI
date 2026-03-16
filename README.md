# 💬 DevChat-CLI - Manual de Instalação e Uso

> Um chat em tempo real feito para desenvolvedores, rodando diretamente no terminal. Conversa com outros devs sem sair do ambiente de código. Nada de abrir Discord, navegador ou apps pesados — só o terminal.

---

## 📋 Sumário
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Compilação](#compilação)
4. [Como Usar](#como-usar)
5. [Erros Comuns e Soluções](#erros-comuns-e-soluções)
6. [Exemplos Práticos](#exemplos-práticos)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

Antes de instalar o DevChat CLI, verifique se você tem:

- **Node.js** versão 18 ou superior
- **npm** ou **yarn** instalado
- Acesso a uma **rede local (LAN)** para comunicação entre máquinas (opcional para testes locais)
- Terminal com suporte a cores (a maioria tem)

### Verificar instalação do Node.js

```bash
node --version
npm --version
```

Se não tiver Node.js instalado, faça o download em: https://nodejs.org/

---

## 📦 Instalação

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/samuel-bordignon/DevChat-CLI.git
cd DevChat-CLI
```

### Passo 2: Instalar Dependências

```bash
npm install
```

Isso instalará:
- `ws` - WebSocket para comunicação em tempo real
- `commander` - Framework para CLI
- `@types/node` e `@types/ws` - Tipos TypeScript
- `typescript` - Compilador TypeScript

**Tempo esperado**: 30 segundos a 2 minutos

### Passo 3: Verificar Instalação

```bash
npm list
```

Você deve ver:
```
devchat-cli@1.0.0
├── @types/node@25.2.3
├── @types/ws@8.18.1
├── commander@14.0.3
└── ws@8.19.0
```

---

## 🔨 Compilação

O DevChat CLI é escrito em **TypeScript** e precisa ser compilado para JavaScript antes de usar.

### Compilar o Projeto

```bash
npm run build
```

Isso gera a pasta `dist/` com os arquivos compilados.

**Tempo esperado**: 5 a 10 segundos

### Verificar Compilação

```bash
ls dist/
```

Você deve ver:
```
dist/
├── index.js
├── cli/
├── core/
├── network/
└── utils/
```

---

## 🚀 Como Usar

O DevChat CLI funciona com **3 comandos principais**:

### 1️⃣ Comando: `host` - Criar uma Sala

**Sintaxe**:
```bash
node dist/index.js host <nome-da-sala> [opções]
```

**Opções**:
- `--port, -p <numero>` - Porta do servidor (padrão: 3000)
- `--key, -k <senha>` - Proteger sala com senha (opcional)

**Exemplos**:

Sala pública na porta padrão:
```bash
node dist/index.js host "Desenvolvimento"
```

Sala pública em porta diferente:
```bash
node dist/index.js host "Design" --port 3001
```

Sala privada com senha:
```bash
node dist/index.js host "Secreto" --port 3002 --key "senha123"
```

**Saída esperada**:
```
✅ Criando sala "Desenvolvimento" na porta 3000

🌍 Sala aberta em ws://localhost:3000
➡️ Outros entram com: devchat join 192.168.1.10 --port 3000 --nick <nome>
```

---

### 2️⃣ Comando: `find` - Buscar Salas Ativas

**Sintaxe**:
```bash
node dist/index.js find
```

**Sem opções** - procura salas em toda a rede local

**Saída esperada** (quando há salas ativas):
```
🔍 Procurando salas...

🌍 Salas encontradas:

[1] Nome da sala: Desenvolvimento, Porta: 3000 (🌍 pública)
[2] Nome da sala: Secreto, Porta: 3002 (🔒 privada)
```

**Saída quando nenhuma sala está ativa**:
```
🔍 Procurando salas...

❌ Nenhuma sala encontrada.
```

---

### 3️⃣ Comando: `join` - Entrar em uma Sala

**Sintaxe**:
```bash
node dist/index.js join <ip-do-host> [opções]
```

**Opções obrigatórias**:
- `<ip-do-host>` - IP do computador com o servidor

**Opções recomendadas**:
- `--port, -p <numero>` - Porta do servidor
- `--nick, -n <nome>` - Seu nome de usuário
- `--key, -k <senha>` - Senha (se sala for privada)

**Exemplos**:

Entrar em sala pública (localhost - mesmo computador):
```bash
node dist/index.js join 127.0.0.1 --port 3000 --nick "João"
```

Entrar em sala pública (outro computador na rede):
```bash
node dist/index.js join 192.168.1.10 --port 3000 --nick "Maria"
```

Entrar em sala privada (com senha):
```bash
node dist/index.js join 192.168.1.10 --port 3002 --nick "Admin" --key "senha123"
```

**Saída esperada** (sucesso):
```
✅ Conectado ao DevChat! ✅
[João]:
```

Agora você pode digitar mensagens e pressionar Enter!

---

## 💬 Usando o Chat

### Enviando Mensagens

Depois de conectado, o prompt mostra seu nome:

```
[seu_nick]:
```

Simplesmente **digite a mensagem** e pressione **Enter**:

```
[João]: Oi pessoal!
(Maria): Oi João!
[João]:
```

### Saindo do Chat

Pressione **Ctrl+C** no terminal para desconectar:

```bash
^C
❌ Sala encerrada ❌
```

---

## ❌ Erros Comuns e Soluções

### Erro 1: `Error: EADDRINUSE: address already in use :::3000`

**O que significa**: A porta 3000 já está sendo usada por outro programa

**Solução**:

```bash
# Use uma porta diferente
node dist/index.js host "MinhaSala" --port 3001
```

**Alternativas**:
- Fechar o programa na porta 3000
- Verificar qual programa usa a porta 3000

---

### Erro 2: `fatal: detected dubious ownership in repository`

**O que significa**: Problema de permissões do Git no WSL

**Solução** (já corrigida, mas caso volte):

```bash
git config --global --add safe.directory '//wsl.localhost/Ubuntu/home/seu_usuario/DevChat-CLI'
```

---

### Erro 3: `❌ Senha incorreta`

**O que significa**: Você digitou a senha errada ao entrar

**Solução**:

1. Confirme a senha com o criador da sala
2. Tente novamente com a senha correta:

```bash
node dist/index.js join 192.168.1.10 --port 3000 --nick "Nome" --key "senha_correta"
```

---

### Erro 4: `Nome de usuário já presente na sala`

**O que significa**: Seu nickname (--nick) já está sendo usado na sala

**Solução**:

Use um nome diferente:

```bash
# Ao invés de:
node dist/index.js join 192.168.1.10 --port 3000 --nick "João"

# Use:
node dist/index.js join 192.168.1.10 --port 3000 --nick "João_Dev"
```

---

### Erro 5: `Nenhuma sala encontrada`

**O que significa**: Nenhum servidor DevChat está ativo na rede

**Solução**:

1. Certifique-se que há um `host` ativo:

```bash
# Terminal 1 - criar sala
node dist/index.js host "Sala"

# Terminal 2 - buscar (em outro terminal)
node dist/index.js find
```

2. Se estiver em redes diferentes (Wi-Fi e Ethernet), pode não funcionar
3. Se estiver atrás de um firewall, verifique se a porta está aberta

---

### Erro 6: `Mensagem inválida recebida`

**O que significa**: Problema na formatação das mensagens

**Solução**:

Geralmente se resolve reiniciando:

```bash
# Ctrl+C para sair
# Reconecte:
node dist/index.js join 192.168.1.10 --port 3000 --nick "Nome"
```

---

### Erro 7: `Sala encerrada` na conexão

**O que significa**: O servidor foi desligado ou a conexão caiu

**Solução**:

1. Verifique se o servidor ainda está rodando
2. Reconecte:

```bash
node dist/index.js join 192.168.1.10 --port 3000 --nick "Nome"
```

3. Se continuar, o servidor pode ter sido desligado. Peça ao administrador para reiniciar

---

## 📚 Exemplos Práticos

### Cenário 1: Chat Local (Mesmo Computador)

**Terminal 1 - Criar sala**:
```bash
npm run build
node dist/index.js host "Dev-Local" --port 3000
```

**Terminal 2 - Entrar na sala**:
```bash
node dist/index.js join 127.0.0.1 --port 3000 --nick "User1"
```

**Terminal 3 - Outro usuário** (opcional):
```bash
node dist/index.js join 127.0.0.1 --port 3000 --nick "User2"
```

**Esperado**: Mensagens aparecem em todos os terminais

---

### Cenário 2: Chat em Equipe (Rede Local)

**Máquina A (Host)**:
```bash
npm run build
node dist/index.js host "Projeto-X" --port 3000
```

**Máquina B (Cliente 1)**:
```bash
node dist/index.js find
# Vê a sala "Projeto-X"

node dist/index.js join 192.168.1.100 --port 3000 --nick "Alice"
```

**Máquina C (Cliente 2)**:
```bash
node dist/index.js join 192.168.1.100 --port 3000 --nick "Bob"
```

**Resultado**:
```
# Host vê:
(SISTEM): Alice entrou na sala
(SISTEM): Bob entrou na sala
(Alice): Olá!
(Bob): Oi Alice!

# Alice e Bob conversam em tempo real
```

---

### Cenário 3: Sala Privada (Protegida com Senha)

**Terminal 1 - Criar sala privada**:
```bash
node dist/index.js host "Secreto" --port 3001 --key "senha123"
```

**Terminal 2 - Tentar sem senha** (falha):
```bash
node dist/index.js join 127.0.0.1 --port 3001 --nick "Hacker"
# ❌ Senha incorreta
```

**Terminal 2 - Entrar com senha correta** (sucesso):
```bash
node dist/index.js join 127.0.0.1 --port 3001 --nick "Admin" --key "senha123"
# ✅ Conectado ao DevChat! ✅
```

---

### Cenário 4: Múltiplas Salas Simultâneas

**Terminal 1 - Sala do Projeto A**:
```bash
node dist/index.js host "Projeto-A" --port 3000
```

**Terminal 2 - Sala do Projeto B**:
```bash
node dist/index.js host "Projeto-B" --port 3001
```

**Terminal 3 - Entrar em Projeto A**:
```bash
node dist/index.js join 127.0.0.1 --port 3000 --nick "Dev1"
```

**Terminal 4 - Entrar em Projeto B**:
```bash
node dist/index.js join 127.0.0.1 --port 3001 --nick "Dev2"
```

**Resultado**: Duas salas independentes rodando simultaneamente

---

## 🔍 Troubleshooting

### TCP vs UDP - Entendendo as Portas

- **Porta TCP** (ex: 3000) - Usada para chat em tempo real (WebSocket)
- **Porta UDP** (4000) - Usada para descoberta de salas (automático)

Certifique-se que ambas estão abertas no firewall se houver problemas de conectividade.

---

### Checar Status de Conexão

Se algo estiver errado, try:

```bash
# Verificar se a porta está aberta
netstat -tuln | grep 3000

# Se ver algo como:
# tcp  0  0  :::3000  :::*  LISTEN
# Significa que o servidor está ativo em :3000
```

---

### Resetar Tudo

Se tudo quebrar, faça:

```bash
# 1. Remover node_modules e dist
rm -rf node_modules dist

# 2. Reinstalar
npm install

# 3. Recompilar
npm run build

# 4. Tentar novamente
node dist/index.js host "Teste"
```

---

### Ativar Modo Debug (Avançado)

Se quiser ver logs completos, adicione antes do comando:

```bash
DEBUG=* node dist/index.js host "Teste"
```

---

## 📝 Cheat Sheet - Comandos Rápidos

```bash
# Compilar
npm run build

# Criar sala
node dist/index.js host "Nome"
node dist/index.js host "Nome" --port 3001
node dist/index.js host "Nome" --port 3001 --key "senha"

# Buscar salas
node dist/index.js find

# Entrar em sala
node dist/index.js join 127.0.0.1 --port 3000 --nick "Nome"
node dist/index.js join 192.168.1.10 --port 3000 --nick "Nome" --key "senha"

# Sair (em qualquer terminal)
Ctrl+C
```

---

## 📂 Estrutura do Projeto Compilado

```
dist/
├── index.js              # Ponto de entrada
├── cli/
│   ├── createCLI.js      # Configuração CLI
│   └── commands/
│       ├── host.js       # Comando host
│       ├── join.js       # Comando join
│       └── find.js       # Comando find
├── core/
│   ├── Room.js           # Gerenciador de salas
│   └── User.js           # Gerenciador de usuários
├── network/
│   ├── startHost.js      # Servidor WebSocket
│   ├── startClient.js    # Cliente WebSocket
│   ├── startDiscovery.js # Discovery UDP
│   └── findRooms.js      # Busca de salas
└── utils/
    ├── messageFormater.js
    ├── network.js
    ├── terminalInput.js
    └── waitForMessage.js
```

---

## ✅ Verificação Final

Depois de instalar, execute este teste rápido:

```bash
# Terminal 1
npm run build
node dist/index.js host "TesteRapido" --port 3000

# Terminal 2 (ou máquina diferente)
node dist/index.js find

# Se tudo correr bem, você deve ver:
# 🌍 Salas encontradas:
# [1] Nome da sala: TesteRapido, Porta: 3000 (🌍 pública)
```

✅ Se chegou aqui, **parabéns! DevChat CLI está funcionando!**

---

## 📞 Suporte

Para problemas não listados:

1. Verifique a porta do servidor está correta
2. Confirme que está na mesma rede local
3. Verifique se o firewall não está bloqueando
4. Abra uma issue no GitHub: https://github.com/samuel-bordignon/DevChat-CLI/issues

---

**DevChat CLI v1.0.0** | Manual de Uso | Março 2026
