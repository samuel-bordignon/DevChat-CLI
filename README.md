# DevChat-CLI
Essa feature tem como função refatorar o aplicativo de chat LAN DevChat para modularizar a CLI, aprimorar a descoberta de rede e o gerenciamento de salas, e introduzir uma separação mais clara entre a lógica do servidor e do cliente. As alterações melhoram a manutenção, adicionam novos recursos e atualizam a estrutura do código para melhor escalabilidade.

Refatoração da CLI e Modularização de Comandos:

Introduzida uma nova função createCLI em src/cli/createCLI.ts para centralizar a configuração da CLI, substituindo as definições de comando embutidas em src/index.ts e permitindo o registro modular de comandos para host, join e find.

Os comandos da CLI foram refatorados em arquivos separados: host.ts, join.ts e find.ts, cada um usando o Commander para análise de argumentos e tratamento de ações.

Aprimoramentos na Descoberta de Rede e Listagem de Salas:

Descoberta de salas aprimorada com a definição de um tipo RoomInfo e melhoria no tratamento de erros em findRooms, agora localizado em src/network/findRooms.ts (renomeado de src/service/findRooms.ts).

Lógica de descoberta UDP atualizada para responder com detalhes da sala e melhoria na classificação e exibição de salas públicas/privadas na CLI.

Reformulação da Arquitetura do Servidor e do Cliente:

Nova lógica de servidor introduzida em src/network/startHost.ts, utilizando as classes Room e User para gerenciamento de usuários, autenticação e transmissão de mensagens.

Implementações legadas de cliente/servidor substituídas por novos arquivos: src/network/startClient.ts para tratamento de WebSocket no lado do cliente e entrada de terminal, e src/network/startDiscovery.ts para descoberta de salas baseada em UDP.

Arquivos de serviço antigos foram removidos e o tratamento de prompts foi substituído pela nova classe TerminalInput (renomeada de PromptManager) em src/utils/terminalInput.ts.

Aprimoramentos no Gerenciamento de Salas e Usuários:

Adicionadas novas classes Room e User em src/core/Room.ts e src/core/User.ts para encapsular autenticação de usuário, gerenciamento de apelidos, validação de chave de sala e transmissão de mensagens.

Formatação de mensagens e notificações do sistema aprimoradas para eventos de entrada/saída e tratamento de erros.

Aprimoramentos de Utilitários:

Adicionado um novo utilitário waitForMessage para lidar com o recebimento assíncrono de mensagens WebSocket, melhorando a confiabilidade do handshake.

Utilitários de entrada de terminal aprimorados com gerenciamento de apelidos, prompts de perguntas e limpeza de linhas aprimorada.

Essas mudanças, em conjunto, modernizam a base de código, melhoram a experiência do usuário e preparam o terreno para futuras adições de recursos.
