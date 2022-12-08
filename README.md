<p align="center">
<a href="https://amplication.com/#gh-light-mode-only">
<img width="300" src="https://raw.githubusercontent.com/amplication/amplication/master/light.svg#gh-light-mode-only">
</a>
<a href="https://amplication.com/#gh-dark-mode-only">
<img width="300" src="https://raw.githubusercontent.com/amplication/amplication/master/dark.svg#gh-dark-mode-only">
</a>
</p>

![1  Amplication main](https://user-images.githubusercontent.com/53312820/190913686-02c7deb1-da2f-41b8-aa31-065e00f6155c.png)

# Getting Started


### System Requirements

:bulb: Before you begin, make sure you have the following installed:

- [Node.js v16 or above](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/desktop/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

Follow these simple instructions to set up a local development environment.

1. Clone the repository and install dependencies:

  ```bash
  git clone https://github.com/exon-consultoria/frontend-cilex.git
  cd frontend-cliex
  yarn
  ```

2. Config Docker

  ```bash
  docker-compose up
  ```

3. Criar um usuário admin.

4. Logar com o usuário.

5. Criar empresa.

6. Criar relacionamento Usuario - Empresa

7. Criar módulos

```json
{
	"title": "Parâmetros Gerais",
	"description": "Defina os parâmetros do sistema",
	"url": "/generalParams",
	"classIcon": "bi bi-globe",
	"isActive": "true"
},

{
	"title": "Trabalhos",
	"description": "Gerencie seus trabalhos",
	"url": "/work",
	"classIcon": "bi bi-gear",
	"isActive": "true",
},

{
	"title": "Pessoas",
	"description": "Gerencie as pessoas",
	"url": "/people",
	"classIcon": "bi bi-person",
	"isActive": "true"
},

{
	"title": "Empresas",
	"description": "Registre suas empresas",
	"url": "/company",
	"classIcon": "bi bi-building",
	"isActive": "true"
},

{
	"title": "Cargos e Funções",
	"description": "Adicione novos cargos",
	"url": "/role",
	"classIcon": "bi bi-wrench",
	"isActive": "true"
},

{
	"title": "Usuários",
	"description": "Gerencie usuários pendentes e ativos",
	"url": "/menu/users",
	"classIcon": "bi bi-person-circle",
	"isActive": "true"
},

{
	"title": "Grupo de Usuários",
	"description": "Gerencia grupos de usuários e suas permissões",
	"url": "/group",
	"classIcon": "bi bi-people",
	"isActive": "true"
},

{
	"title": "Módulos",
	"description": "Gerencie seus módulos disponíveis",
	"url": "/",
	"classIcon": "bi bi-box",
	"isActive": "true"
},

{
	"title": "Estoque",
	"description": "Monitore seus produtos",
	"url": "/inventory",
	"classIcon": "bi bi-truck",
	"isActive": "true"
},
 
{
	"title": "Pet",
	"description": "Gerencie as informações dos pets",
	"url": "/pet",
	"classIcon": "fas fa-dog",
	"isActive": "true"
},

{
	"title": "Agenda",
	"description": "Gerencie sua agenda de serviços",
	"url": "/schedule",
	"classIcon": "bi bi-calendar",
	"isActive": "true"
},
  
```

8. Criar relacionamento Empresa - Módulo
