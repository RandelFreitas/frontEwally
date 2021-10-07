Front-End BackOffice

Principais tecnologias utilizadas:
- React: Lib frontEnd;
- Next js: Framework de geração de páginas no servidor;
- TypeScript: Linguagem tipada sob javascript;

Dependências de Produção:
- Formik: Lib de manipulação de formulários;
- Yup: Lib de mensagens de erro (validação do formulário);
- Axios: Lib de conexão com a api;
- Material ui: Lib de designer;
- Js-cookie: Lib de manipulação de cookies;

Dependências de Desenvolvimento:
- Eslint: Lib clean code;
- TypeScript: Linguagem tipada;

Estrutura básica de pastas:
-- src
  -- assets
  -- components
    -- screen
  -- pages
    -- app
      -- investor
        -- index.tsx
        -- modal
          -- index.tsx
    -- _app.tsx
    -- _document.tsx
    -- index.tsx
  -- services
    -- useInvestors.tsx
  -- utils
    -- api.ts

Motivação

	Com o rápido crescimento da SUNNE, os esforços de desenvolvimento se concentraram em construir a aplicação de gerenciamento que os usuários(investidores / clientes) utilizam, portanto até a construção do mvp BackOffice(frontEnd) o gerenciamento de clientes, usinas, investidores e demais entidades são realizados por desenvolvedores através de JSON(Postman) diretamente a API. Com o crescimento do volume de dados e a constante necessidade de manutenção nessa base de dados, está se tornando inviável a sua manipulação exclusiva por desenvolvedores, portanto construir uma interface que ajude na comunicação com o backEnd será de grande importância pois a responsabilidade de manter as entidades atualizadas pode ser então, repassado a administração, deixando o trabalho mais prático e rápido e liberando assim os desenvolvedores para outras atividade de programação.
 
	
Introdução

Toda a aplicação foi desenvolvida desde o início utilizando o framework Next Js, dessa forma a estrutura de rotas é baseada em pastas, sendo iniciada no index.tsx dentro da pasta src. Como é uma aplicação de gerenciamento interno da SUNNE, essa primeira página encontra-se o login(‘/’) do sistema. Após a autenticação a página inicial é de gerenciamento de investidores(‘/app/investor’).

Investidores(/src/investors)

Market Place(/src/marketPlace)

Usinas(/src/powerPlant)

Investidores(/src/investors)
