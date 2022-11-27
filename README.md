# Тестовое задание Soft Project 
## Стек
- React
- TypeScript
- Redux Toolkit
- React Router
- Axios
- Ant Design

Развернутое приложение можно посмотреть тут: https://test-assignments-sp.vercel.app/

# Docs (заметки по проекту)
## Структура проекта
### Redux 
Настройка **store** и логика взаимодействия с ним, хранится в следующих папках `src/app`, `src/features` (подробнее [Learn Modern Redux](https://www.learnwithjason.dev/let-s-learn-modern-redux) )
### React UI 
#### `src/pages`
Основные страницы (routes) приложения.
#### `src/components`
Отдельные части приложения.
Компоненты для `src/pages/PostsPage/PostsPage.tsx` имеют след структуру:
Список всех статей `../PostList/` => элемент этого списка `../PostItem/`
Страница отдельной статьи `../Post/`
Тоже относиться  и к `src/pages/AlbumsPage/AlbumsPage.tsx`
#### `src/assets`
Хранятся медиа-файлы приложения  
## CSS
Для стилизации использовал обычный **SCCS**. 
В данном проекте, к сожалению не придерживался методологий по типу [БЭМ](https://ru.bem.info/methodology/css/) и спец "настроек" по типу [CSS Modules](https://github.com/css-modules/css-modules) или [StyledComponents](https://styled-components.com/) так как использовал стили больше для набросков и небольших элементов - основой стилизации была библиотека [Ant Design](https://ant.design/)

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.


# Getting Started

This project was bootstrapped with [Vite](https://vitejs.dev/)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173/) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<!-- ### `npm test`
add information if you make tests -->

