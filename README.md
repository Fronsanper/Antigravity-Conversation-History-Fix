# Antigravity Conversation History Fix — By Fronsanper

**Version 1.0.0**

> A community-oriented toolkit for applying and reverting Antigravity fixes through a guided visual setup wizard, without requiring users to understand every technical detail.

## English (US)

### What this project does

This project provides a guided setup wizard around the existing Antigravity patch engines, making it easier to apply, review, and revert supported fixes.

Included fixes:

- **Auto-Run Fix:** restores automatic execution for the Antigravity “Always Proceed” terminal policy when the installed version matches the tested range.
- **Link Approval Fix:** optionally bypasses the external-link confirmation step.

The second feature is optional because removing a confirmation dialog changes a security-related user interaction.

> **Unofficial project:** this software is not affiliated with or endorsed by Google or the Antigravity team.

### Windows support

**Windows is supported.** The wizard can automatically detect the common Windows Antigravity installation location under:

```text
%LOCALAPPDATA%\Programs\Antigravity
```

The project also includes:

- `Start-Antigravity-History-Fix.cmd`;
- `start-antigravity-history-fix.ps1`;
- `start-antigravity-history-fix.sh`.

The `.cmd` launcher is intended to be the simplest option for Windows users and can also be used as the target of a desktop shortcut.

### Requirements

- Node.js **16 or newer**.
- A supported Antigravity installation.
- Permission to modify the Antigravity installation files.
- Antigravity should be closed before applying or reverting patches when possible.

The patch engine checks Antigravity versions before applying the fixes. It does not blindly patch unsupported versions unless a user explicitly uses the underlying CLI's force behavior where available.

### Quick start

1. Install Node.js 16+.
2. Extract the project ZIP.
3. On Windows, double-click `Start-Antigravity-History-Fix.cmd`.
4. The wizard opens in your default browser.
5. Choose PT-BR or EN-US.
6. Read the explanation and terms.
7. Select the desired fixes.
8. Apply the changes.
9. Restart Antigravity.

Technical users can also run:

```bash
npm install
npm run wizard
```

Or use the CLI:

```bash
node cli.js --help
node cli.js auto-run
node cli.js auto-run --check
node cli.js auto-run --revert
```

### Uninstall / revert

Use the **Uninstall / revert** area of the wizard to restore available `.ba-backup` files. This removes the patch changes without removing Antigravity itself.

Uninstalling the wizard package is separate: simply delete this project folder after reverting the changes.

### Languages

The wizard supports:

- PT-BR;
- EN-US.

User-facing wizard text is loaded from the locale files so the interface can be maintained in both languages without changing the patch engine.

### Project layout

```text
.
├─ fixes/                 # Working patch engines
├─ src/                   # Extension integration
├─ wizard/                # Visual local setup wizard
├─ locales/               # PT-BR and EN-US strings
├─ Start-Antigravity-History-Fix.cmd
├─ start-antigravity-history-fix.ps1
├─ start-antigravity-history-fix.sh
├─ cli.js
├─ package.json
├─ LICENSE
├─ LEGAL.md
└─ CHANGES.md
```

### For beginners

The safest path is the graphical wizard. It explains what each step does and creates backups before patching.

You do not need to edit source code to use the project.

### For advanced users

The patch engines use structural matching against minified Antigravity bundles instead of depending only on local variable names. Version checks prevent normal application on unsupported versions, and each patch can be reverted.

### Development

```bash
npm install
npm run build
npm run wizard
```

### Distribution

This project is licensed under **AGPL-3.0-or-later**. Preserve the license and required legal notices when redistributing modified versions.

### Contributing

Bug reports, compatibility reports, and pull requests are welcome. When contributing a patch, prefer structural matching, explicit version checks, and reversible changes.

**By Fronsanper**

---

# Correção do Histórico do Antigravity — Feito por Fronsanper

**Versão 1.0.0**

> Uma ferramenta voltada para a comunidade que permite aplicar e reverter correções do Antigravity por meio de um assistente visual, sem exigir que o usuário compreenda todos os detalhes técnicos.

## Português (Brasil)

### O que este projeto faz

Este projeto fornece um assistente de configuração guiado em torno dos mecanismos de patch existentes do Antigravity, facilitando a aplicação, revisão e reversão das correções compatíveis.

Correções incluídas:

- **Correção de Auto-Run:** restaura a execução automática da política de terminal “Always Proceed” do Antigravity quando a versão instalada corresponde ao intervalo testado.
- **Correção de aprovação de links:** permite opcionalmente ignorar a confirmação de links externos.

O segundo recurso é opcional porque remover uma confirmação altera uma interação relacionada à segurança.

> **Projeto não oficial:** este software não possui vínculo nem é endossado pelo Google ou pela equipe do Antigravity.

### Suporte ao Windows

**Windows é suportado.** O assistente pode detectar automaticamente o local comum de instalação do Antigravity no Windows:

```text
%LOCALAPPDATA%\Programs\Antigravity
```

O projeto também inclui:

- `Start-Antigravity-History-Fix.cmd`;
- `start-antigravity-history-fix.ps1`;
- `start-antigravity-history-fix.sh`.

O lançador `.cmd` foi pensado como a opção mais simples para usuários do Windows e também pode ser usado como destino de um atalho na área de trabalho.

### Requisitos

- Node.js **16 ou mais recente**.
- Uma instalação compatível do Antigravity.
- Permissão para modificar os arquivos da instalação do Antigravity.
- O Antigravity deve ser fechado antes de aplicar ou reverter os patches, quando possível.

O mecanismo de patch verifica as versões do Antigravity antes de aplicar as correções. Ele não aplica patches indiscriminadamente em versões não suportadas, a menos que o usuário utilize explicitamente o comportamento de força da CLI subjacente, quando disponível.

### Início rápido

1. Instale o Node.js 16+.
2. Extraia o ZIP do projeto.
3. No Windows, dê dois cliques em `Start-Antigravity-History-Fix.cmd`.
4. O assistente será aberto no navegador padrão.
5. Escolha PT-BR ou EN-US.
6. Leia a explicação e os termos.
7. Selecione as correções desejadas.
8. Aplique as alterações.
9. Reinicie o Antigravity.

Usuários avançados também podem executar:

```bash
npm install
npm run wizard
```

Ou utilizar a CLI:

```bash
node cli.js --help
node cli.js auto-run
node cli.js auto-run --check
node cli.js auto-run --revert
```

### Desinstalação / reversão

Use a área **Desinstalar / reverter** do assistente para restaurar os arquivos `.ba-backup` disponíveis. Isso remove as alterações dos patches sem remover o próprio Antigravity.

A desinstalação do pacote do assistente é separada: basta excluir a pasta deste projeto depois de reverter as alterações.

### Idiomas

O assistente oferece suporte a:

- PT-BR;
- EN-US.

Os textos exibidos pelo assistente são carregados a partir dos arquivos de idioma, permitindo manter a interface nos dois idiomas sem alterar o mecanismo de patch.

### Estrutura do projeto

```text
.
├─ fixes/                 # Mecanismos dos patches
├─ src/                   # Integração com extensões
├─ wizard/                # Assistente visual local
├─ locales/               # Textos PT-BR e EN-US
├─ Start-Antigravity-History-Fix.cmd
├─ start-antigravity-history-fix.ps1
├─ start-antigravity-history-fix.sh
├─ cli.js
├─ package.json
├─ LICENSE
├─ LEGAL.md
└─ CHANGES.md
```

### Para iniciantes

O caminho mais seguro é utilizar o assistente gráfico. Ele explica o que cada etapa faz e cria backups antes de aplicar os patches.

Você não precisa editar o código-fonte para utilizar o projeto.

### Para usuários avançados

Os mecanismos de patch utilizam correspondência estrutural nos bundles minificados do Antigravity, em vez de depender apenas de nomes de variáveis locais. As verificações de versão impedem a aplicação normal em versões não suportadas, e cada patch pode ser revertido.

### Desenvolvimento

```bash
npm install
npm run build
npm run wizard
```

### Distribuição

Este projeto é licenciado sob **AGPL-3.0-or-later**. Preserve a licença e os avisos legais necessários ao redistribuir versões modificadas.

### Contribuição

Relatórios de bugs, informações de compatibilidade e pull requests são bem-vindos. Ao contribuir com um patch, prefira correspondência estrutural, verificações explícitas de versão e alterações reversíveis.

**Feito por Fronsanper**
