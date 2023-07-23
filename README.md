## CounterStrike Inventory Viewer (cs-wrapper)
- Este projeto tem o objetivo de facilitar a visualização do inventário do CounterStrike de qualquer usuário a partir do URL do perfil.

## Frameworks Utilizados:
- <a href="https://nextjs.org/">Next.js</a> - v13
- <a href="https://tailwindcss.com/">Tailwind CSS</a> (Estilização do site)
- <a href="https://fkhadra.github.io/react-toastify/">React-Toastify</a> (Notificações de maneira simplificada)
- <a href="https://momentjs.com/">Moment.js</a> (Conversão de timestamp/data/tempo)
- <a href="https://heroicons.com/">Heroicons</a> (Importação de icones simplificados)

## Features:
- Carregar inventário & informações de usuários a partir do URL do perfil.
- Copiar URL permanente da steam.
- Carregar stickers colados no item.
- Checar StatTrak, Tradelock e outras informações dos itens.
- Inspecionar itens no jogo.

## Observações:
- Devido ao endpoint da API da steam que retornava o inventário dos usuários ter sido removido, foi necessário utilizar o endpoint que o próprio site da steam utiliza ao carregar um inventário (o que constantemente ocasiona em rate-limit), a princípio a ideia era carregar e tratar todas as informações no server, porém devido a essa limitação da steam, o request que carrega o inventário foi jogado para o componente do inventário no client e é feito localmente na maquina do usuário a cada carregamento da página. <s>(Porque na verdade a steam não quer que esse tipo de projeto exista)</s>

## Exemplos:
![Exemplo](https://media.discordapp.net/attachments/1132549314330239037/1132549370097696860/steamviewer2.png?width=1381&height=701)