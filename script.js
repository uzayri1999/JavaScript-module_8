// ПОЛУЧЕНИЕ ДОСТУПА ПО СЕЛЕКТОРУ
const btn = document.querySelector('.btn');
const loader = document.getElementById('loader');
const divImages = document.querySelector('.div-images');
const link = 'https://dog.ceo/api/breeds/image/random/';


/* 
ЧУТЬ ПОМЕНЯЛ КОД ЧТОБЫ ЮЗЕР МОГ САМ ВЫБИРАТЬ КОЛИЧЕСТВО КАРТИНОК, ВЫВОДЯЩИХСЯ НА СТРАНИЦУ
ДУМАЮ ЭТО ПРИКОЛЬНО
ДЛЯ ВВОДА ИСПОЛЬЗОВАЛ prompt(). БЫЛ ВАРИАНТ ИСПОЛЬЗОВАТЬ input, 
НО ПОЧЕМУ-ТО ОСТАНОВИЛСЯ НА ЭТОМ ВЫБОРЕ, ХОТЯ ЭТО НЕМНОГО И НЕУДОБНО, МНЕ ПОНРАВИЛОСЬ ТО ЧТО ПОЛУЧИЛОСЬ ))
*/

const number = prompt('Введите число картинок, которые вы хотели бы увидеть\nМинимум: 5\nМаксимум: 50');
const url = link + number;

// ФУНКЦИЯ ВЫВОДИТ МАССИВ С ЗАДАННЫМ ЮЗЕРОМ КОЛИЧЕСТВОМ ЭЛЕМЕНТОВ В ВИДЕ ССЫЛОК НА КАРТИНКИ
async function createArray () {
    try {
        const response = await fetch(url);
        if (!response.ok || number < 5 || number > 50) {
            throw new Error('Ошибка при загрузке изображений или введено число не из заданного диапозона!');
        } else {
            const data = await response.json();
            const images = data.message;
        
        btnClick(images);
        };
    } catch (err) {
        alert(err);
        console.error(err.message);
    } finally {
        console.log('Процесс загрузки изображений завершен!');
    };
};

// ФУНКЦИЯ, ГДЕ СОЗДАЕТСЯ НОВЫЕ img ТЕГИ В РАЗМЕТКЕ
function btnClick (arr) {
    arr.forEach(elem => {
        const image = document.createElement('img');
        image.src = elem;
        image.style.cssText = 'width: 100%; max-height: 264px; object-fit: cover; border-radius: 4%';
        divImages.appendChild(image);
    });
};

// ДЕЙСТВИЯ ПРИ КЛИКЕ НА КНОПКУ
btn.addEventListener('click', () => {
    loader.style.display = 'flex';
    btn.disabled = true; // отключение кнопки после нажатия для предотвращения дальнейщих добавлений ссылок
    setTimeout(() => {
        createArray();
        loader.style.display = 'none';
    }, 2000)
});